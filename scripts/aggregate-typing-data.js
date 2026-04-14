/**
 * 聚合所有 PY2 课次的打字练习数据
 *
 * 用法: node scripts/aggregate-typing-data.js
 *
 * 从所有 lesson-data.js 文件中提取:
 * - typingWords: 单词数据
 * - typingTemplates: 代码模板数据
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const lessonsBasePath = join(__dirname, '../src/data/courses/PY2/lessons')

// 所有课次列表 (L7-L12)
const lessonIds = [
  'L7-1', 'L7-2', 'L7-3', 'L7-4',
  'L8-1', 'L8-2', 'L8-3', 'L8-4',
  'L9-1', 'L9-2', 'L9-3', 'L9-4',
  'L10-1', 'L10-2', 'L10-3',
  'L11-1', 'L11-2', 'L11-4',
  'L12-1', 'L12-2', 'L12-3', 'L12-4'
]

// 难度级别
const difficulties = ['easy', 'medium', 'hard']

// 聚合结果
const allTypingWords = { easy: [], medium: [], hard: [] }
const allTypingTemplates = { easy: [], medium: [], hard: [] }

/**
 * 从文件内容中提取 typingWords 和 typingTemplates
 * 使用更可靠的正则表达式，避免匹配到注释
 */
function extractTypingData(fileContent) {
  // 提取 typingWords 对象
  const typingWordsMatch = fileContent.match(/export const typingWords = \{[\s\S]*?\n\};?\s*\n\/\//)
  // 提取 typingTemplates 对象
  const typingTemplatesMatch = fileContent.match(/export const typingTemplates = \{[\s\S]*?\n\};?\s*\n\/\//)

  if (!typingWordsMatch || !typingTemplatesMatch) {
    return { typingWords: null, typingTemplates: null }
  }

  const typingWords = { easy: [], medium: [], hard: [] }
  const typingTemplates = { easy: [], medium: [], hard: [] }

  // 解析 typingWords - 支持单行和多行格式
  const wordsContent = typingWordsMatch[0]
  for (const diff of difficulties) {
    // 匹配 difficulty: [ ... ] 支持单行和多行
    const pattern = new RegExp(`${diff}:\\s*\\[([\\s\\S]*?)\\](?=\\s*(?:,|}))`)
    const match = wordsContent.match(pattern)
    if (match) {
      // 提取所有引号包裹的字符串
      const strings = match[1].match(/'([^'\\]*(\\.[^'\\]*)*)'/g) || []
      typingWords[diff] = strings.map(s => s.slice(1, -1).replace(/\\'/g, "'"))
    }
  }

  // 解析 typingTemplates
  const templatesContent = typingTemplatesMatch[0]
  for (const diff of difficulties) {
    const pattern = new RegExp(`${diff}:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`, 's')
    const match = templatesContent.match(pattern)
    if (match) {
      const arrayContent = match[1]
      // 提取所有引号包裹的字符串（包括多行字符串）
      const strings = []
      let current = ''
      let inString = false
      let stringChar = ''
      let escapeNext = false

      for (let i = 0; i < arrayContent.length; i++) {
        const char = arrayContent[i]

        if (escapeNext) {
          if (inString) current += char
          escapeNext = false
          continue
        }

        if (char === '\\') {
          if (inString) {
            current += char
            escapeNext = true
          }
          continue
        }

        if ((char === '"' || char === "'") && !inString) {
          inString = true
          stringChar = char
          current = ''
          continue
        }

        if (char === stringChar && inString) {
          inString = false
          // 只有当字符串非空且不是注释时才添加
          const trimmed = current.trim()
          if (trimmed && !trimmed.startsWith('//')) {
            strings.push(trimmed)
          }
          current = ''
          continue
        }

        if (inString) {
          current += char
        }
      }

      // 处理转义的换行符 \n
      typingTemplates[diff] = strings.map(s => {
        // 只处理作为换行符的 \n，保留其他内容
        return s.replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"')
      })
    }
  }

  return { typingWords, typingTemplates }
}

// 主处理函数
function main() {
  console.log('开始聚合 PY2 打字练习数据...\n')

  for (const lessonId of lessonIds) {
    const filePath = join(lessonsBasePath, lessonId, 'lesson-data.js')

    try {
      const content = readFileSync(filePath, 'utf-8')
      const { typingWords, typingTemplates } = extractTypingData(content)

      if (typingWords) {
        console.log(`✓ ${lessonId}: 找到 typingWords`)
        for (const diff of difficulties) {
          if (typingWords[diff] && typingWords[diff].length > 0) {
            allTypingWords[diff].push(...typingWords[diff])
          }
        }
      } else {
        console.log(`⚠ ${lessonId}: 未找到 typingWords`)
      }

      if (typingTemplates) {
        console.log(`✓ ${lessonId}: 找到 typingTemplates`)
        for (const diff of difficulties) {
          if (typingTemplates[diff] && typingTemplates[diff].length > 0) {
            allTypingTemplates[diff].push(...typingTemplates[diff])
          }
        }
      } else {
        console.log(`⚠ ${lessonId}: 未找到 typingTemplates`)
      }

    } catch (e) {
      console.log(`✗ ${lessonId}: 读取失败 - ${e.message}`)
    }
  }

  // 去重
  const uniqueWords = {
    easy: [...new Set(allTypingWords.easy)],
    medium: [...new Set(allTypingWords.medium)],
    hard: [...new Set(allTypingWords.hard)]
  }

  const uniqueTemplates = {
    easy: [...new Set(allTypingTemplates.easy)],
    medium: [...new Set(allTypingTemplates.medium)],
    hard: [...new Set(allTypingTemplates.hard)]
  }

  // 输出统计
  console.log('\n=== 统计结果 ===')
  console.log('单词数量:')
  for (const diff of difficulties) {
    console.log(`  ${diff}: ${uniqueWords[diff].length} 个唯一单词`)
  }

  console.log('\n代码模板数量:')
  for (const diff of difficulties) {
    console.log(`  ${diff}: ${uniqueTemplates[diff].length} 个唯一模板`)
  }

  // 生成 typing-words-pool.js
  const wordsPoolContent = `/**
 * PY2 阶段单词池（聚合自所有课程）
 *
 * 自动生成于: ${new Date().toISOString()}
 * 包含 L7-L12 所有课次的 typingWords
 */

export const typingWordsPool = {
  easy: ${JSON.stringify(uniqueWords.easy, null, 2)},
  medium: ${JSON.stringify(uniqueWords.medium, null, 2)},
  hard: ${JSON.stringify(uniqueWords.hard, null, 2)}
}

/**
 * 随机抽取单词
 * @param {number} count - 抽取数量
 * @param {string} difficulty - 难度: 'all' | 'easy' | 'medium' | 'hard'
 * @returns {string[]} 随机抽取的单词列表
 */
export function getRandomWords(count = 8, difficulty = 'all') {
  let pool = []

  if (difficulty === 'all') {
    pool = [
      ...typingWordsPool.easy,
      ...typingWordsPool.medium,
      ...typingWordsPool.hard
    ]
  } else {
    pool = typingWordsPool[difficulty] || []
  }

  // Fisher-Yates 洗牌算法
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export default typingWordsPool
`

  const wordsPoolPath = join(__dirname, '../src/data/courses/PY2/typing-words-pool.js')
  writeFileSync(wordsPoolPath, wordsPoolContent, 'utf-8')
  console.log(`\n✓ 已生成: ${wordsPoolPath}`)

  // 生成更新后的 typing-templates-pool.js
  // 生成代码模板池（转义换行符为 \n）
  const escapeForJS = (str) => {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '')
  }

  const templatesPoolContent = `/**
 * PY2 阶段代码模板池（聚合自所有课程）
 *
 * 自动生成于: ${new Date().toISOString()}
 * 包含 L7-L12 所有课次的 typingTemplates
 * 缩进使用4个空格（Python PEP 8标准）
 */

export const typingTemplatesPool = {
  easy: [
${uniqueTemplates.easy.map(t => `    '${escapeForJS(t)}'`).join(',\n')}
  ],
  medium: [
${uniqueTemplates.medium.map(t => `    '${escapeForJS(t)}'`).join(',\n')}
  ],
  hard: [
${uniqueTemplates.hard.map(t => `    '${escapeForJS(t)}'`).join(',\n')}
  ]
}

/**
 * 随机抽取代码模板
 * @param {number} count - 抽取数量
 * @param {string} difficulty - 难度: 'all' | 'easy' | 'medium' | 'hard'
 * @returns {string[]} 随机抽取的模板列表
 */
export function getRandomTemplates(count = 5, difficulty = 'all') {
  let pool = []

  if (difficulty === 'all') {
    pool = [
      ...typingTemplatesPool.easy,
      ...typingTemplatesPool.medium,
      ...typingTemplatesPool.hard
    ]
  } else {
    pool = typingTemplatesPool[difficulty] || []
  }

  // Fisher-Yates 洗牌算法
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export default typingTemplatesPool
`

  const templatesPoolPath = join(__dirname, '../src/data/courses/PY2/typing-templates-pool.js')
  writeFileSync(templatesPoolPath, templatesPoolContent, 'utf-8')
  console.log(`✓ 已生成: ${templatesPoolPath}`)

  console.log('\n聚合完成!')
}

main()
