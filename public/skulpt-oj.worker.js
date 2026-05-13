/**
 * Skulpt OJ Worker — 批量判题 Web Worker
 *
 * Main → Worker:
 *   { type: 'run', code, testCases: [{ input, expectedOutput, score }] }
 *   { type: 'stop' }
 *
 * Worker → Main:
 *   { type: 'ready' }
 *   { type: 'result', index, passed, actualOutput, error }
 *   { type: 'done', earnedScore, totalScore, status }
 *   { type: 'error', message }
 */

const SKULPT_CDNS = [
  { core: 'https://unpkg.com/skulpt@1.2.0/dist/skulpt.min.js', stdlib: 'https://unpkg.com/skulpt@1.2.0/dist/skulpt-stdlib.js' },
  { core: 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js', stdlib: 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js' },
  { core: 'https://cdnjs.cloudflare.com/ajax/libs/skulpt/1.2.0/skulpt.min.js', stdlib: 'https://cdnjs.cloudflare.com/ajax/libs/skulpt/1.2.0/skulpt-stdlib.js' }
]

const MAX_EXEC_TIME = 5000 // 5秒单题超时

let skulptLoaded = false
let skulptLoadFailed = false
let shouldStop = false

function loadSkulpt() {
  if (skulptLoaded || skulptLoadFailed) return
  for (const cdn of SKULPT_CDNS) {
    try {
      if (typeof Sk === 'undefined') importScripts(cdn.core)
      if (typeof Sk.builtinFiles === 'undefined') {
        importScripts(cdn.stdlib)
        const start = Date.now()
        while (typeof Sk.builtinFiles === 'undefined' && Date.now() - start < 3000) {}
        if (typeof Sk.builtinFiles === 'undefined') throw new Error('stdlib init timeout')
      }
      skulptLoaded = true
      self.postMessage({ type: 'ready' })
      return
    } catch (e) {
      console.warn('[OJ Worker] CDN failed:', cdn.core, e.message)
      if (typeof Sk !== 'undefined') { try { delete self.Sk } catch (_) {} }
    }
  }
  skulptLoadFailed = true
  self.postMessage({ type: 'error', message: 'Python 环境加载失败，请刷新页面重试' })
}

loadSkulpt()

self.onmessage = function (e) {
  const { type, code, testCases, input } = e.data

  if (type === 'run') {
    if (skulptLoadFailed) { self.postMessage({ type: 'error', message: 'Python 环境加载失败' }); return }
    if (!skulptLoaded) return
    runAllTestCases(code, testCases)
  } else if (type === 'stop') {
    shouldStop = true
    if (typeof Sk !== 'undefined') Sk.execStart = 0
  }
}

async function runAllTestCases(code, testCases) {
  shouldStop = false
  let earnedScore = 0
  let totalScore = 0
  let passedCount = 0

  for (let i = 0; i < testCases.length; i++) {
    if (shouldStop) break

    const tc = testCases[i]
    const tcScore = Number(tc.score) || 0
    totalScore += tcScore

    const result = await runSingleTestCase(code, tc.input, tc.expectedOutput, tcScore)
    earnedScore += result.earnedScore
    if (result.passed) passedCount++

    self.postMessage({
      type: 'result',
      index: i,
      passed: result.passed,
      actualOutput: result.actualOutput,
      error: result.error
    })
  }

  const finalScore = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : 0
  const finalStatus = passedCount === testCases.length && testCases.length > 0 ? 'passed' : 'failed'
  self.postMessage({ type: 'done', earnedScore, totalScore, status: finalStatus, score: finalScore })
}

async function runSingleTestCase(code, input, expectedOutput, score) {
  let actualOutput = ''
  let error = ''
  let passed = false
  let earnedScore = 0

  const inputLines = (input || '').split('\n')
  let lineIndex = 0

  try {
    const outBuffer = []
    function outf(text) { outBuffer.push(text) }
    function builtinRead(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) throw "File not found: '" + x + "'"
      return Sk.builtinFiles['files'][x]
    }

    Sk.configure({
      output: outf,
      read: builtinRead,
      inputfun: () => {
        const line = inputLines[lineIndex] || ''
        lineIndex++
        return line
      },
      inputfunTakesPrompt: false,
      execLimit: MAX_EXEC_TIME,
      yieldLimit: 50,
      killableWhile: true,
      killableFor: true
    })

    await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true))
    actualOutput = outBuffer.join('').replace(/\r\n/g, '\n').trim()

  } catch (err) {
    error = err.toString() || String(err)
    // 超时错误特殊处理
    if (error.includes('TimeLimitError')) error = '程序运行时间超过限制'
  }

  const expected = (expectedOutput || '').replace(/\r\n/g, '\n').trim()
  // 特殊标记校验：随机数题目
  if (!error && expected.startsWith('__RANDOM_')) {
    passed = validateRandomOutput(actualOutput, expected)
  } else {
    passed = !error && actualOutput === expected
  }
  if (passed) earnedScore = score

  return { actualOutput, error, passed, earnedScore }
}

function validateRandomOutput(actual, expected) {
  const num = Number(actual)
  if (isNaN(num) || actual.trim() !== String(num)) return false

  // __RANDOM_INT__1-10__  随机整数范围
  const intMatch = expected.match(/^__RANDOM_INT__(\d+)-(\d+)__$/)
  if (intMatch) {
    const [_, min, max] = intMatch.map(Number)
    return num >= min && num <= max
  }

  // __RANDOM_SUM__5-500__  随机整数求和范围 (n个随机数之和)
  const sumMatch = expected.match(/^__RANDOM_SUM__(\d+)-(\d+)__$/)
  if (sumMatch) {
    const [_, min, max] = sumMatch.map(Number)
    return num >= min && num <= max
  }

  // __RANDOM_CHOICE__[10,20,30]__  随机选择列表中的元素
  const choiceMatch = expected.match(/^__RANDOM_CHOICE__\[(.*)\]__$/)
  if (choiceMatch) {
    const items = choiceMatch[1].split(',')
    return items.includes(actual.trim())
  }

  // __RANDOM_SAMPLE__ABC123__4__  从字符集中随机选n个字符组成验证码
  const sampleMatch = expected.match(/^__RANDOM_SAMPLE__(.+)__(\d+)__$/)
  if (sampleMatch) {
    const [_, pool, n] = sampleMatch
    const actualTrim = actual.trim()
    if (actualTrim.length !== Number(n)) return false
    const poolSet = new Set(pool.split(''))
    for (const ch of actualTrim) {
      if (!poolSet.has(ch)) return false
    }
    return true
  }

  return false
}