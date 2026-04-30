const SKULPT_CDNS = [
  {
    core: 'https://unpkg.com/skulpt@1.2.0/dist/skulpt.min.js',
    stdlib: 'https://unpkg.com/skulpt@1.2.0/dist/skulpt-stdlib.js'
  },
  {
    core: 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js',
    stdlib: 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js'
  },
  {
    core: 'https://cdnjs.cloudflare.com/ajax/libs/skulpt/1.2.0/skulpt.min.js',
    stdlib: 'https://cdnjs.cloudflare.com/ajax/libs/skulpt/1.2.0/skulpt-stdlib.js'
  }
]

const MAX_OUTPUT_LENGTH = 5000
const MAX_EXEC_TIME = 10000

let skulptLoaded = false
let skulptLoadFailed = false
let pendingInputResolve = null
let shouldStop = false
let outputLength = 0
let timeLimitErrorShown = false
let elapsedBeforePause = 0
let outputBuffer = ''
let flushTimer = null

function loadSkulpt() {
  if (skulptLoaded || skulptLoadFailed) return
  for (const cdn of SKULPT_CDNS) {
    try {
      if (typeof Sk === 'undefined') {
        importScripts(cdn.core)
      }
      if (typeof Sk.builtinFiles === 'undefined') {
        importScripts(cdn.stdlib)
        const start = Date.now()
        while (typeof Sk.builtinFiles === 'undefined' && Date.now() - start < 3000) {
        }
        if (typeof Sk.builtinFiles === 'undefined') {
          throw new Error('标准库初始化失败')
        }
      }
      skulptLoaded = true
      self.postMessage({ type: 'ready' })
      return
    } catch (e) {
      console.warn('Skulpt CDN 加载失败:', e.message)
      if (typeof Sk !== 'undefined' && !skulptLoaded) {
        try { delete self.Sk } catch (_) {}
      }
    }
  }
  skulptLoadFailed = true
  self.postMessage({ type: 'error', message: 'Python 环境加载失败，请检查网络连接后刷新页面重试' })
}

loadSkulpt()

function flushOutput() {
  if (outputBuffer) {
    self.postMessage({ type: 'output', text: outputBuffer })
    outputBuffer = ''
  }
  flushTimer = null
}

self.onmessage = function(e) {
  const { type, code, input } = e.data

  if (type === 'run') {
    if (skulptLoadFailed) {
      self.postMessage({ type: 'error', message: 'Python 环境加载失败，无法运行代码' })
      return
    }
    if (!skulptLoaded) return
    runPython(code)
  } else if (type === 'input') {
    if (pendingInputResolve) {
      Sk.execStart = Date.now() - elapsedBeforePause
      pendingInputResolve(input)
      pendingInputResolve = null
    }
  } else if (type === 'stop') {
    shouldStop = true
    if (typeof Sk !== 'undefined') Sk.execStart = 0
    if (pendingInputResolve) {
      pendingInputResolve('')
      pendingInputResolve = null
    }
  }
}

function runPython(code) {
  shouldStop = false
  outputLength = 0
  timeLimitErrorShown = false
  pendingInputResolve = null
  elapsedBeforePause = 0
  outputBuffer = ''
  if (flushTimer) { clearTimeout(flushTimer); flushTimer = null }

  function outf(text) {
    if (shouldStop) return
    if (text.includes('TimeLimitError')) {
      if (timeLimitErrorShown) return
      timeLimitErrorShown = true
    }
    outputLength += text.length
    if (outputLength > MAX_OUTPUT_LENGTH) {
      flushOutput()
      self.postMessage({ type: 'output', text: '\n[输出过长，已截断]' })
      self.postMessage({ type: 'error', message: '输出内容过多，已自动停止。' })
      shouldStop = true
      if (typeof Sk !== 'undefined') Sk.execStart = 0
      return
    }
    outputBuffer += text
    if (!flushTimer) {
      flushTimer = setTimeout(flushOutput, 30)
    }
  }
  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
      throw "File not found: '" + x + "'"
    }
    return Sk.builtinFiles['files'][x]
  }

  Sk.configure({
    output: outf,
    read: builtinRead,
    inputfun: (prompt) => {
      elapsedBeforePause = Date.now() - Sk.execStart
      flushOutput()
      return new Promise((resolve) => {
        pendingInputResolve = resolve
        self.postMessage({ type: 'input', prompt: prompt || '> ' })
      })
    },
    inputfunTakesPrompt: true,
    execLimit: MAX_EXEC_TIME,
    yieldLimit: 50,
    killableWhile: true,
    killableFor: true
  })

  Sk.misceval.asyncToPromise(function() {
    return Sk.importMainWithBody('<stdin>', false, code, true)
  }).then(() => {
    flushOutput()
    self.postMessage({ type: 'done' })
  }).catch((err) => {
    flushOutput()
    if (shouldStop) {
      self.postMessage({ type: 'done' })
      return
    }
    const msg = err.toString() || String(err)
    if (msg.includes('TimeLimitError')) {
      self.postMessage({ type: 'error', message: '程序运行时间超过限制，已自动停止。' })
    } else {
      self.postMessage({ type: 'error', message: msg })
    }
  })
}
