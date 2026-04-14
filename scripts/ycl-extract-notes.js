/**
 * YCL 备考笔记 & 赛考题库 结构化提取脚本
 *
 * 从 pdf-parse 提取的原始文本中，按知识点结构化提取：
 * - 备考笔记：考点讲解、示例代码、易错点、真题练习及解析、课后练习题
 * - 赛考题库：选择题（单选/多选）、编程题
 *
 * 输出格式：JSON，便于后续生成 theory.js 和 sets/*.js
 *
 * 用法：node scripts/ycl-extract-notes.js [level]
 *   level: 4 | 5 | 6 | all (默认 all)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const tempDir = path.join(rootDir, 'src/data/courses/YCL/temp-extracted')
const outputDir = tempDir // 输出到同目录

// 知识点映射表（每个 level 的考点名称关键词 → kp-id）
// 匹配逻辑：考点名包含 key 则匹配
const KP_MAP = {
  4: {
    '输出命令': 'kp-4-1',
    'print()': 'kp-4-1',
    '输入命令': 'kp-4-2',
    'input()': 'kp-4-2',
    '转整数命令': 'kp-4-3',
    '转整命令': 'kp-4-3',
    'int()': 'kp-4-3',
    '简单数学运算': 'kp-4-4',
    '算术运算': 'kp-4-4',
    '简单计算': 'kp-4-4',
    '字符串拼接': 'kp-4-5',
    '字符串': 'kp-4-9',       // 仅"字符串"不包含"拼接"时
    'if-else': 'kp-4-6',
    '双分支': 'kp-4-6',
    'for循环基础': 'kp-4-7',
    'for循环': 'kp-4-7',
    '变量的修改': 'kp-4-8',
    '变量修改': 'kp-4-8',
    'if语句': 'kp-4-10',
    '单分支': 'kp-4-10',
    '比较数大小': 'kp-4-11',
    '比较运算': 'kp-4-11',
    '数字范围': 'kp-4-11',
    '分支应用': 'kp-4-12',
    '综合应用': 'kp-4-12'
  },
  5: {
    '字符串和列表的索引': 'kp-5-1',
    '索引': 'kp-5-1',
    '统计命令': 'kp-5-2',
    '列表的统计': 'kp-5-2',
    'while循环': 'kp-5-3',
    'while 循环': 'kp-5-3',
    '字符串分割': 'kp-5-4',
    'split': 'kp-5-4',
    '修改列表元素': 'kp-5-5',
    '列表修改': 'kp-5-5',
    '列表的增删改': 'kp-5-5',
    'for循环嵌套': 'kp-5-6',
    'for 循环嵌套': 'kp-5-6',
    '循环嵌套': 'kp-5-6',
    'break、continue': 'kp-5-7',
    '循环控制语句': 'kp-5-7',
    '数据类型转换': 'kp-5-8',
    '枚举法': 'kp-5-9',
    '列表的遍历': 'kp-5-10',
    '遍历': 'kp-5-10',
    '排序命令': 'kp-5-11',
    '列表的排序': 'kp-5-11',
    'print()进阶': 'kp-5-12',
    'print()的高级': 'kp-5-12',
    'print进阶': 'kp-5-12',
    '列表生成式': 'kp-5-13',
    '集合': 'kp-5-14',
    '字典': 'kp-5-15'
  },
  6: {
    '函数的创建和调用': 'kp-6-1',
    '函数': 'kp-6-1',
    'Pygame基础': 'kp-6-2',
    'Pygame事件监听': 'kp-6-3',
    'pygame事件监听': 'kp-6-3',
    '简单递推': 'kp-6-4',
    '递推': 'kp-6-4',
    '模拟表达式': 'kp-6-5',
    '循环模拟': 'kp-6-6',
    '带列表的模拟': 'kp-6-7',
    '斐波那契数列': 'kp-6-8',
    '顺序模拟': 'kp-6-5'
  }
}

/**
 * 清理文本中的特殊字符和 PDF 提取噪音
 */
function cleanText(text) {
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // 控制字符
    .replace(/\u0001/g, '')                          // PDF 特殊字符
    .replace(/^[ \t]+/gm, (m) => m.replace(/ {2,}/g, '  ')) // 规范化空格
    .trim()
}

/**
 * 按考点分割原始文本（Part I: 备考笔记部分）
 * 策略：PDF 有目录和正文两部分，目录部分考点名后面紧跟换行（无实质内容），
 * 正文部分考点名后面紧跟 ✅ 等标识符。我们跳过目录，只提取正文考点。
 */
function splitByKnowledgePoints(text, level) {
  const sections = []
  // 匹配 "考点N：名称" 格式
  const kpRegex = /考点\s*(\d+)\s*[：:]\s*(.+)/g

  let kpMatches = []
  let match

  // 收集所有考点位置
  while ((match = kpRegex.exec(text)) !== null) {
    kpMatches.push({
      index: match.index,
      number: parseInt(match[1]),
      name: match[2].trim().replace(/\s+/g, ''),
      fullMatch: match[0],
      endIndex: match.index + match[0].length
    })
  }

  // 如果没有找到考点，返回空
  if (kpMatches.length === 0) return sections

  // 区分目录和正文：目录部分考点名后没有 ✅ 或大量文字；
  // 正文部分考点名后通常紧跟 ✅ 或备考建议等实质内容。
  // 策略：只保留考点后有实质内容的（后续文本长度 > 200 字符，或包含特定标记）
  const contentSections = []
  for (let i = 0; i < kpMatches.length; i++) {
    const kp = kpMatches[i]
    const nextStart = i + 1 < kpMatches.length ? kpMatches[i + 1].index : text.length
    const sectionText = text.substring(kp.index, nextStart)

    // 正文考点特征：包含 "需掌握"、"备考建议"、"真题练习"、"课后练习"、"✅" 等
    const hasContent = sectionText.includes('需掌握') ||
                       sectionText.includes('备考建议') ||
                       sectionText.includes('真题练习') ||
                       sectionText.includes('课后练习') ||
                       sectionText.includes('✅') ||
                       sectionText.includes('考查方式') ||
                       sectionText.length > 500

    if (hasContent) {
      // 匹配 kp-id
      const kpName = kp.name
      const kpMap = KP_MAP[level] || {}
      let kpId = null
      for (const [key, id] of Object.entries(kpMap)) {
        if (kpName.includes(key) || key.includes(kpName)) {
          kpId = id
          break
        }
      }

      contentSections.push({
        kpId,
        number: kp.number,
        name: kpName,
        rawText: sectionText
      })
    }
  }

  return contentSections
}

/**
 * 从考点文本中提取结构化内容
 */
function parseKnowledgePointSection(section, level) {
  const text = section.rawText
  const result = {
    kpId: section.kpId,
    name: section.name,
    number: section.number,
    reviewLocation: '',
    examTypes: { objective: '', coding: '' },
    keyPoints: [],
    codeExamples: [],
    examQuestions: [],
    examAnalysis: [],
    practiceQuestions: []
  }

  const lines = text.split('\n').map(l => l.trim())

  // 提取复习位置
  const reviewMatch = text.match(/复习位置[：:]\s*(L[\d]+-[\d]+)/)
  if (reviewMatch) result.reviewLocation = reviewMatch[1]

  // 提取考查方式
  if (text.includes('选择题-考查方式')) result.examTypes.objective = 'objective'
  if (text.includes('编程题-考查方式')) result.examTypes.coding = 'coding'

  // 提取需掌握内容（知识点要点）
  const masterRegex = /需掌握[：:]?\s*([\s\S]*?)(?=真题练习|课后练习|$)/
  const masterMatch = text.match(masterRegex)
  if (masterMatch) {
    const masterText = masterMatch[1]
    // 提取编号要点
    const pointRegex = /\d+\.\s*(.+)/g
    let pMatch
    while ((pMatch = pointRegex.exec(masterText)) !== null) {
      const point = cleanText(pMatch[1])
      if (point && point.length > 3 && !point.startsWith('示例') && !point.startsWith('注意')) {
        result.keyPoints.push(point)
      }
    }
  }

  // 提取代码块
  const codeBlockRegex = /代码块\s*\n([\s\S]*?)(?=\n\s*\n|\n[A-Z][.、]|[^\s\u4e00-\u9fff]|\n真题|\n课后|\n解析|\n备考|\n考点|\n✅|\n📌|\n🔍|\n🎒|\n💡)/g
  let codeMatch
  while ((codeMatch = codeBlockRegex.exec(text)) !== null) {
    const code = cleanText(codeMatch[1])
    if (code && code.length > 5) {
      result.codeExamples.push(code)
    }
  }

  // 提取真题练习（选择题）
  result.examQuestions = extractExamQuestions(text)
  result.examAnalysis = extractExamAnalysis(text)
  result.practiceQuestions = extractPracticeQuestions(text)

  return result
}

/**
 * 提取真题练习的选择题
 */
function extractExamQuestions(text) {
  const questions = []

  // 找到"真题练习"到"真题解析"之间的内容
  const examSectionRegex = /真题练习[\s\S]*?(?=真题解析|课后练习题|$)/
  const examSectionMatch = text.match(examSectionRegex)
  if (!examSectionMatch) return questions

  const examText = examSectionMatch[0]

  // 提取选择题
  const questionRegex = /(?:想要|已知|运行|执行|下列|以下|在|关于|以下哪个)([\s\S]*?)(?=A[.、．]\s)/g
  const optionRegex = /([A-D])[.、．]\s*(.+)/g
  const answerRegex = /选\s*([A-D])/g

  // 更简单的方式：按选项分组提取
  const blocks = examText.split(/(?=(?:想要|已知|运行|执行|下列|以下|编程题|【题目))/)
    .filter(b => b.trim().length > 10)

  for (const block of blocks) {
    // 检查是否是选择题
    const options = []
    let optMatch
    const optRegex = /([A-D])[.、．]\s*(.+)/g
    while ((optMatch = optRegex.exec(block)) !== null) {
      options.push({
        label: optMatch[1],
        text: cleanText(optMatch[2])
      })
    }

    if (options.length >= 2) {
      // 提取题干（A选项之前的内容）
      const aIndex = block.search(/[A-D][.、．]/)
      const questionText = cleanText(block.substring(0, aIndex > 0 ? aIndex : block.length))
        .replace(/^[\s\S]*?(?=想要|已知|运行|执行|下列|以下)/, '')
        .trim()

      // 判断是否多选
      const isMulti = block.includes('多选')

      // 提取答案
      let answer = ''
      const ansMatch = block.match(/选\s*([A-D]+)/)
      if (ansMatch) answer = ansMatch[1]

      questions.push({
        type: isMulti ? 'multiple-choice' : 'single-choice',
        question: questionText,
        options: options,
        answer: answer,
        isMulti: isMulti
      })
    }

    // 提取编程题
    if (block.includes('编程题') || block.includes('【题目描述】')) {
      const descMatch = block.match(/【题目描述】([\s\S]*?)(?=【输入描述】|【输出描述】|$)/)
      const inputMatch = block.match(/【输入描述】([\s\S]*?)(?=【输出描述】|【输入样例】|$)/)
      const outputMatch = block.match(/【输出描述】([\s\S]*?)(?=【输入样例】|【输出样例】|$)/)
      const inputSampleMatch = block.match(/【输入样例】([\s\S]*?)(?=【输出样例】|$)/)
      const outputSampleMatch = block.match(/【输出样例】([\s\S]*?)(?=第|代码块|解析|$)/)

      if (descMatch) {
        questions.push({
          type: 'coding',
          question: cleanText(descMatch[1]),
          inputDesc: inputMatch ? cleanText(inputMatch[1]) : '',
          outputDesc: outputMatch ? cleanText(outputMatch[1]) : '',
          inputSample: inputSampleMatch ? cleanText(inputSampleMatch[1]) : '',
          outputSample: outputSampleMatch ? cleanText(outputSampleMatch[1]) : ''
        })
      }
    }
  }

  return questions
}

/**
 * 提取真题解析
 */
function extractExamAnalysis(text) {
  const analyses = []

  const analysisRegex = /第\s*(\d+)\s*题[：:]\s*([\s\S]*?)(?=第\s*\d+\s*题|课后练习题|考点|\n$|$)/g
  let match
  while ((match = analysisRegex.exec(text)) !== null) {
    analyses.push({
      questionNumber: parseInt(match[1]),
      analysis: cleanText(match[2])
    })
  }

  return analyses
}

/**
 * 提取课后练习题
 */
function extractPracticeQuestions(text) {
  const questions = []

  const practiceRegex = /课后练习题[\s\S]*$/
  const practiceMatch = text.match(practiceRegex)
  if (!practiceMatch) return questions

  const practiceText = practiceMatch[0]

  // 按 "数字." 分割题目
  const qBlocks = practiceText.split(/(?=^\d+[.、．])/m)
    .filter(b => b.trim().length > 10)
    .slice(1) // 去掉 "课后练习题" 标题

  for (const block of qBlocks) {
    const cleanedBlock = cleanText(block)

    // 检查是否是选择题
    const options = []
    const optRegex = /([A-D])[.、．]\s*(.+)/g
    let optMatch
    while ((optMatch = optRegex.exec(block)) !== null) {
      options.push({
        label: optMatch[1],
        text: cleanText(optMatch[2])
      })
    }

    const isMulti = block.includes('多选')

    if (options.length >= 2) {
      const aIndex = block.search(/[A-D][.、．]/)
      const questionText = cleanText(block.substring(0, aIndex > 0 ? aIndex : block.length))
        .replace(/^\d+[.、．]\s*/, '')
        .trim()

      // 提取答案
      let answer = ''
      const ansMatch = block.match(/[答选]\s*([A-D]+)/)
      if (ansMatch) answer = ansMatch[1]

      questions.push({
        type: isMulti ? 'multiple-choice' : 'single-choice',
        question: questionText,
        options: options,
        answer: answer,
        isMulti: isMulti
      })
    } else if (block.includes('编程题') || block.includes('【题目描述】')) {
      const descMatch = block.match(/【题目描述】([\s\S]*?)(?=【输入描述】|【输出描述】|$)/)
      const inputMatch = block.match(/【输入描述】([\s\S]*?)(?=【输出描述】|【输入样例】|$)/)
      const outputMatch = block.match(/【输出描述】([\s\S]*?)(?=【输入样例】|【输出样例】|$)/)
      const inputSampleMatch = block.match(/【输入样例】([\s\S]*?)(?=【输出样例】|$)/)
      const outputSampleMatch = block.match(/【输出样例】([\s\S]*?)(?=答案|解析|$)/)

      if (descMatch) {
        questions.push({
          type: 'coding',
          question: cleanText(descMatch[1]),
          inputDesc: inputMatch ? cleanText(inputMatch[1]) : '',
          outputDesc: outputMatch ? cleanText(outputMatch[1]) : '',
          inputSample: inputSampleMatch ? cleanText(inputSampleMatch[1]) : '',
          outputSample: outputSampleMatch ? cleanText(outputSampleMatch[1]) : ''
        })
      }
    }
  }

  return questions
}

/**
 * 从 Part II 赛考题库部分提取题目
 * PDF格式：每个知识点分类下有 "题目N" 格式的题目，后面跟着 "答案&解析"
 */
function extractExamBank(text) {
  const questions = []

  // 找到 Part II 的起始位置（处理各种空格变体）
  const part2Patterns = [
    /Part\u0001*I\u0001*I[：:\u0001-]/,
    /Part\u0001*II[：:\u0001-]/,
    /赛考题库\u0001*-\u0001*选做练习/,
    /赛考题库/
  ]

  let lastPart2Start = -1
  for (const pattern of part2Patterns) {
    const regex = new RegExp(pattern.source, 'g')
    let m
    while ((m = regex.exec(text)) !== null) {
      // 必须在文本后半部分（跳过目录中的引用）
      if (m.index > text.length * 0.3 && m.index > lastPart2Start) {
        lastPart2Start = m.index
      }
    }
  }

  if (lastPart2Start === -1) return questions

  const part2Text = text.substring(lastPart2Start)

  // 按 "题目N" 分割
  const topicRegex = /题目\s*(\d+)\s*/g
  const topicMatches = []

  let tm
  while ((tm = topicRegex.exec(part2Text)) !== null) {
    topicMatches.push({
      index: tm.index,
      number: parseInt(tm[1])
    })
  }

  // 按 "题目N" 分割成块
  for (let i = 0; i < topicMatches.length; i++) {
    const start = topicMatches[i].index
    const end = i + 1 < topicMatches.length ? topicMatches[i + 1].index : part2Text.length
    const block = part2Text.substring(start, end)
    const num = topicMatches[i].number

    const q = parseExamBankBlock(block, num)
    if (q) questions.push(q)
  }

  return questions
}

/**
 * 解析赛考题库中的单个题目块
 */
function parseExamBankBlock(block, number) {
  const lines = block.split('\n').map(l => l.trim()).filter(l => l)

  // 提取答案
  let answer = ''
  const ansMatch = block.match(/答案[：:]\s*([A-D]+)/)
  if (ansMatch) answer = ansMatch[1]

  // 提取解析
  let analysis = ''
  const analysisMatch = block.match(/解析[：:]\s*([\s\S]*?)(?=题目\s*\d|$)/)
  if (analysisMatch) analysis = cleanText(analysisMatch[1])

  // 检测是否多选
  const isMulti = block.includes('多选') || block.includes('【多选】')

  // 检测是否编程题
  const isCoding = block.includes('编程') || block.includes('程序') ||
                   block.includes('【题目描述】') || block.includes('代码块')

  // 提取选项
  const options = []
  const optRegex = /^([A-D])[.、．:：]\s*(.+)/gm
  let optMatch
  while ((optMatch = optRegex.exec(block)) !== null) {
    options.push({
      label: optMatch[1],
      text: cleanText(optMatch[2])
    })
  }

  // 如果有4个选项，则是选择题
  if (options.length >= 2 && !isCoding) {
    // 提取题干（A选项之前的内容，去掉"题目N"标题）
    const aIndex = block.search(/[A-D][.、．]/)
    let questionText = ''
    if (aIndex > 0) {
      questionText = cleanText(block.substring(0, aIndex))
        .replace(/^题目\s*\d+\s*/, '')
        .replace(/^代码块[\s\S]*?\n/, '') // 去掉代码块
        .trim()
    }

    return {
      number,
      type: isMulti ? 'multiple-choice' : 'single-choice',
      question: questionText,
      options,
      answer,
      analysis,
      isMulti
    }
  }

  // 编程题
  if (isCoding) {
    const descMatch = block.match(/【题目描述】([\s\S]*?)(?=【输入描述】|【输出描述】|$)/)
    const inputMatch = block.match(/【输入描述】([\s\S]*?)(?=【输出描述】|【输入样例】|$)/)
    const outputMatch = block.match(/【输出描述】([\s\S]*?)(?=【输入样例】|【输出样例】|$)/)
    const inputSampleMatch = block.match(/【输入样例】([\s\S]*?)(?=【输出样例】|答案|$)/)
    const outputSampleMatch = block.match(/【输出样例】([\s\S]*?)(?=答案|解析|题目|$)/)

    // 提取题干（去掉标题和代码块标记）
    let questionText = ''
    if (descMatch) {
      questionText = cleanText(descMatch[1])
    } else {
      // 没有【题目描述】标记时，取"题目N"后到选项或答案之间的内容
      const qStart = block.indexOf('\n', block.indexOf('题目'))
      const qEnd = block.indexOf('答案')
      if (qStart > 0 && qEnd > qStart) {
        questionText = cleanText(block.substring(qStart, qEnd))
          .replace(/代码块\s*/g, '')
          .trim()
      }
    }

    return {
      number,
      type: 'coding',
      question: questionText,
      answer: '', // 编程题通常没有固定答案
      analysis,
      inputDesc: inputMatch ? cleanText(inputMatch[1]) : '',
      outputDesc: outputMatch ? cleanText(outputMatch[1]) : '',
      inputSample: inputSampleMatch ? cleanText(inputSampleMatch[1]) : '',
      outputSample: outputSampleMatch ? cleanText(outputSampleMatch[1]) : ''
    }
  }

  return null
}

/**
 * 按讲次分组知识点
 */
function groupByLecture(sections) {
  const lectures = []
  let currentLecture = null

  for (const section of sections) {
    // 检测是否是新讲次的开头（第一考点通常紧跟在讲次标题后）
    // 这里简化处理：按考点编号重置来分组
    if (section.number === 1 || !currentLecture) {
      currentLecture = {
        knowledgePoints: []
      }
      lectures.push(currentLecture)
    }
    currentLecture.knowledgePoints.push(section)
  }

  return lectures
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2)
  const levelArg = args[0] || 'all'
  const levels = levelArg === 'all' ? [4, 5, 6] : [parseInt(levelArg)].filter(n => [4, 5, 6].includes(n))

  if (levels.length === 0) {
    console.error('请指定有效的级别: 4, 5, 6 或 all')
    process.exit(1)
  }

  console.log('=== YCL 备考笔记结构化提取 ===\n')

  for (const level of levels) {
    const rawFile = path.join(tempDir, `level${level}-raw.txt`)
    if (!fs.existsSync(rawFile)) {
      console.log(`跳过 ${level} 级：原始文本文件不存在`)
      console.log(`请先运行: node scripts/extract-pdf.js ${level}`)
      continue
    }

    console.log(`\n${'='.repeat(60)}`)
    console.log(`处理 ${level} 级`)
    console.log('='.repeat(60))

    const rawText = fs.readFileSync(rawFile, 'utf-8')

    // 按考点分割
    const sections = splitByKnowledgePoints(rawText, level)
    console.log(`\n找到 ${sections.length} 个考点`)

    // 解析每个考点
    const parsedSections = []
    for (const section of sections) {
      const parsed = parseKnowledgePointSection(section, level)
      parsedSections.push(parsed)
    }

    // 提取赛考题库
    const examBankQuestions = extractExamBank(rawText)

    // 按讲次分组
    const lectures = groupByLecture(parsedSections)

    // 统计
    let totalExamQ = 0
    let totalPracticeQ = 0
    let totalCodeExamples = 0
    let totalKeyPoints = 0

    for (const s of parsedSections) {
      totalExamQ += s.examQuestions.length
      totalPracticeQ += s.practiceQuestions.length
      totalCodeExamples += s.codeExamples.length
      totalKeyPoints += s.keyPoints.length
    }

    console.log(`\n统计信息:`)
    console.log(`  - 讲次: ${lectures.length}`)
    console.log(`  - 考点: ${parsedSections.length}`)
    console.log(`  - 知识要点: ${totalKeyPoints}`)
    console.log(`  - 代码示例: ${totalCodeExamples}`)
    console.log(`  - 真题练习: ${totalExamQ}`)
    console.log(`  - 课后练习: ${totalPracticeQ}`)
    console.log(`  - 赛考题库: ${examBankQuestions.length}`)

    // 输出每个考点摘要
    console.log(`\n考点详情:`)
    for (const s of parsedSections) {
      const kpLabel = s.kpId || '未匹配'
      console.log(`  [${kpLabel}] ${s.name}`)
      console.log(`    要点: ${s.keyPoints.length}, 代码: ${s.codeExamples.length}, 真题: ${s.examQuestions.length}, 练习: ${s.practiceQuestions.length}`)
    }

    // 保存结果
    const output = {
      level,
      extractedAt: new Date().toISOString(),
      source: `level${level}-raw.txt`,
      summary: {
        lectureCount: lectures.length,
        knowledgePointCount: parsedSections.length,
        totalKeyPoints,
        totalCodeExamples,
        totalExamQuestions: totalExamQ,
        totalPracticeQuestions: totalPracticeQ,
        examBankQuestions: examBankQuestions.length
      },
      lectures: lectures.map((l, i) => ({
        lectureIndex: i,
        knowledgePoints: l.knowledgePoints
      })),
      examBank: examBankQuestions
    }

    const outputPath = path.join(outputDir, `level${level}-structured.json`)
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8')
    console.log(`\n已保存: ${outputPath}`)
  }

  console.log('\n\n提取完成!')
}

main().catch(console.error)
