/**
 * PDF内容提取脚本
 *
 * 用于从YCL备考笔记PDF中提取题目内容
 * 用法：node scripts/extract-pdf.js [level]
 * level: 4 | 5 | 6 | all
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// PDF文件路径
const pdfPaths = {
  4: path.join(rootDir, 'src/data/courses/YCL/四级/YCL四级备考笔记 & 赛考题库.pdf'),
  5: path.join(rootDir, 'src/data/courses/YCL/五级/YCL五级备考笔记&赛考题库.pdf'),
  6: path.join(rootDir, 'src/data/courses/YCL/六级/YCL六级备考笔记 & 赛考题库.pdf')
}

// 输出目录
const outputDir = path.join(rootDir, 'src/data/courses/YCL/temp-extracted')

// 动态导入pdf-parse（CommonJS模块）
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

async function loadPdfParse() {
  // 使用require加载CommonJS模块
  return require('pdf-parse')
}

/**
 * 提取单个PDF文件内容
 */
async function extractPdf(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`文件不存在: ${filePath}`)
    return null
  }

  const dataBuffer = fs.readFileSync(filePath)
  const pdfParse = await loadPdfParse()

  try {
    const data = await pdfParse(dataBuffer)
    return {
      text: data.text,
      pages: data.numpages,
      info: data.info
    }
  } catch (error) {
    console.error(`解析PDF失败: ${error.message}`)
    return null
  }
}

/**
 * 解析题目内容
 */
function parseQuestions(text, level) {
  const questions = {
    singleChoice: [],
    multipleChoice: [],
    coding: []
  }

  // 按行分割文本
  const lines = text.split('\n').map(l => l.trim()).filter(l => l)

  // 当前题目缓存
  let currentQuestion = null
  let questionType = null

  // 题目匹配正则
  const singleChoiceRegex = /^(\d+)[.、．]\s*(.*)/
  const multipleChoiceRegex = /^(\d+)[.、．]\s*【?多选】?\s*(.*)/i
  const codingRegex = /^(\d+)[.、．]\s*【?编程|程序|代码】?\s*(.*)/i
  const optionRegex = /^[A-Da-d][.、．:：]\s*(.*)/
  const answerRegex = /【?答案】?[：:]\s*([A-Da-d]+)/i
  const analysisRegex = /【?解析|分析】?[：:]\s*(.*)/i

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // 检测新题目
    const singleMatch = line.match(singleChoiceRegex)
    const multiMatch = line.match(multipleChoiceRegex)
    const codingMatch = line.match(codingRegex)

    if (singleMatch && !multiMatch && !codingMatch) {
      // 保存上一题
      if (currentQuestion) {
        questions[questionType].push(currentQuestion)
      }
      // 开始新题
      questionType = 'singleChoice'
      currentQuestion = {
        id: `q-${level}-${singleMatch[1]}`,
        number: parseInt(singleMatch[1]),
        question: singleMatch[2],
        options: [],
        answer: null,
        analysis: ''
      }
      continue
    }

    if (multiMatch) {
      if (currentQuestion) {
        questions[questionType].push(currentQuestion)
      }
      questionType = 'multipleChoice'
      currentQuestion = {
        id: `q-${level}-${multiMatch[1]}`,
        number: parseInt(multiMatch[1]),
        question: multiMatch[2],
        options: [],
        answer: [],
        analysis: ''
      }
      continue
    }

    if (codingMatch) {
      if (currentQuestion) {
        questions[questionType].push(currentQuestion)
      }
      questionType = 'coding'
      currentQuestion = {
        id: `q-${level}-${codingMatch[1]}`,
        number: parseInt(codingMatch[1]),
        question: codingMatch[2],
        testCases: [],
        answer: '',
        analysis: ''
      }
      continue
    }

    // 解析选项
    if (currentQuestion && questionType !== 'coding') {
      const optionMatch = line.match(optionRegex)
      if (optionMatch) {
        currentQuestion.options.push(optionMatch[1])
        continue
      }
    }

    // 解析答案
    if (currentQuestion) {
      const answerMatch = line.match(answerRegex)
      if (answerMatch) {
        if (questionType === 'multipleChoice') {
          currentQuestion.answer = answerMatch[1].toUpperCase().split('')
        } else {
          currentQuestion.answer = answerMatch[1].toUpperCase()
        }
        continue
      }

      // 解析解析
      const analysisMatch = line.match(analysisRegex)
      if (analysisMatch) {
        currentQuestion.analysis = analysisMatch[1]
        continue
      }
    }
  }

  // 保存最后一题
  if (currentQuestion) {
    questions[questionType].push(currentQuestion)
  }

  return questions
}

/**
 * 主提取函数
 */
async function main() {
  const args = process.argv.slice(2)
  const level = args[0] || 'all'

  console.log('=== YCL PDF 内容提取工具 ===\n')

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const levelsToProcess = level === 'all' ? [4, 5, 6] : [parseInt(level)]

  for (const lvl of levelsToProcess) {
    console.log(`\n处理四级 ${lvl}...`)
    console.log(`PDF路径: ${pdfPaths[lvl]}`)

    const result = await extractPdf(pdfPaths[lvl])

    if (!result) {
      console.log(`跳过四级 ${lvl}`)
      continue
    }

    console.log(`页数: ${result.pages}`)
    console.log(`文本长度: ${result.text.length} 字符`)

    // 保存原始文本
    const textOutputPath = path.join(outputDir, `level${lvl}-raw.txt`)
    fs.writeFileSync(textOutputPath, result.text, 'utf-8')
    console.log(`原始文本已保存: ${textOutputPath}`)

    // 解析题目
    const questions = parseQuestions(result.text, lvl)
    console.log(`解析结果:`)
    console.log(`  - 单选题: ${questions.singleChoice.length} 题`)
    console.log(`  - 多选题: ${questions.multipleChoice.length} 题`)
    console.log(`  - 编程题: ${questions.coding.length} 题`)

    // 保存解析结果
    const jsonOutputPath = path.join(outputDir, `level${lvl}-questions.json`)
    fs.writeFileSync(jsonOutputPath, JSON.stringify(questions, null, 2), 'utf-8')
    console.log(`题目数据已保存: ${jsonOutputPath}`)

    // 输出前500字符预览
    console.log(`\n内容预览:\n${result.text.substring(0, 500)}...\n`)
  }

  console.log('\n提取完成!')
}

main().catch(console.error)
