/**
 * YCL题目解析和套卷生成脚本
 *
 * 解析从PDF提取的文本，生成练习套卷数据文件
 */

const fs = require('fs');
const path = require('path');

// 输入输出路径
const inputDir = path.join(__dirname);
const outputDir = path.join(__dirname, '../src/data/courses/YCL');

// 知识点映射
const knowledgePointMap = {
  4: {
    'print()': 'kp-4-1',
    '输出': 'kp-4-1',
    'input()': 'kp-4-2',
    '输入': 'kp-4-2',
    'int()': 'kp-4-3',
    '转整数': 'kp-4-3',
    '变量': 'kp-4-4',
    '计算': 'kp-4-5',
    '数学运算': 'kp-4-5',
    '字符串拼接': 'kp-4-6',
    '字符串': 'kp-4-7',
    'for循环': 'kp-4-8',
    'for 循环': 'kp-4-8',
    'if-else': 'kp-4-9',
    '分支': 'kp-4-10',
    'if语句': 'kp-4-10',
    '比较': 'kp-4-11'
  },
  5: {
    '索引': 'kp-5-1',
    'split()': 'kp-5-2',
    '字符串分割': 'kp-5-2',
    '列表': 'kp-5-3',
    '字典': 'kp-5-4',
    '集合': 'kp-5-5',
    'while循环': 'kp-5-6',
    'while 循环': 'kp-5-6',
    'break': 'kp-5-7',
    'continue': 'kp-5-7',
    '随机数': 'kp-5-8',
    'random': 'kp-5-8'
  },
  6: {
    '函数': 'kp-6-1',
    'Pygame': 'kp-6-2',
    '递推': 'kp-6-3',
    '递归': 'kp-6-4',
    '模拟算法': 'kp-6-5',
    '排序': 'kp-6-6'
  }
};

/**
 * 解析单选题
 */
function parseSingleChoice(lines, startIndex, level) {
  const questions = [];
  let i = startIndex;
  let currentQ = null;
  let qNumber = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // 检测题目开始 - 匹配 "题目X" 或 "第X题" 或 数字开头
    const titleMatch = line.match(/^(?:题目|第)\s*(\d+)/);
    const numMatch = line.match(/^(\d+)[.、．]/);

    if (titleMatch || (numMatch && !line.includes('【多选】'))) {
      // 保存上一题
      if (currentQ && currentQ.question && currentQ.options.length >= 2) {
        questions.push(currentQ);
      }

      qNumber++;
      const questionText = titleMatch ? line : line;

      currentQ = {
        id: `q-${level}-single-${qNumber}`,
        type: 'single-choice',
        knowledgePoint: detectKnowledgePoint(line, level),
        score: 2,
        difficulty: qNumber <= 5 ? 'easy' : (qNumber <= 10 ? 'medium' : 'hard'),
        question: '',
        code: null,
        options: [],
        answer: null,
        explanation: '',
        theoryRef: null
      };

      // 继续读取题目内容
      i++;
      let questionLines = [];
      let inCode = false;
      let codeLines = [];

      while (i < lines.length) {
        const nextLine = lines[i].trim();

        // 检测选项开始
        if (/^[A-Da-d][.、．:：]/.test(nextLine)) {
          break;
        }

        // 检测代码块
        if (nextLine.includes('=') || nextLine.includes('print') || nextLine.includes('for') || nextLine.includes('if')) {
          if (!inCode) inCode = true;
          codeLines.push(nextLine);
        } else if (inCode && /^\d/.test(nextLine)) {
          // 代码行号，跳过
        } else if (nextLine && !nextLine.startsWith('答案') && !nextLine.startsWith('解析')) {
          questionLines.push(nextLine);
        }

        i++;
      }

      currentQ.question = questionLines.join(' ');
      if (codeLines.length > 0) {
        currentQ.code = codeLines.join('\n');
      }

      // 读取选项
      while (i < lines.length) {
        const optLine = lines[i].trim();
        const optMatch = optLine.match(/^([A-Da-d])[.、．:：]\s*(.+)/);

        if (optMatch) {
          currentQ.options.push(optMatch[2].trim());
          i++;
        } else if (/^(?:答案|解析)/.test(optLine) || /^(?:题目|第)\s*\d+/.test(optLine) || /^\d+[.、．]/.test(optLine)) {
          break;
        } else {
          i++;
        }
      }

      continue;
    }

    // 检测答案
    if (currentQ && line.startsWith('答案')) {
      const answerMatch = line.match(/答案[：:]\s*([A-Da-d])/);
      if (answerMatch) {
        currentQ.answer = ['A', 'B', 'C', 'D'].indexOf(answerMatch[1].toUpperCase());
      }
    }

    // 检测解析
    if (currentQ && line.startsWith('解析')) {
      currentQ.explanation = line.replace(/^解析[：:]?\s*/, '');
    }

    i++;
  }

  // 保存最后一题
  if (currentQ && currentQ.question && currentQ.options.length >= 2) {
    questions.push(currentQ);
  }

  return { questions, endIndex: i };
}

/**
 * 解析多选题
 */
function parseMultipleChoice(lines, startIndex, level) {
  const questions = [];
  let i = startIndex;
  let currentQ = null;
  let qNumber = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // 检测多选题
    if (line.includes('【多选】') || line.includes('[多选]')) {
      // 保存上一题
      if (currentQ && currentQ.question && currentQ.options.length >= 2) {
        questions.push(currentQ);
      }

      qNumber++;
      currentQ = {
        id: `q-${level}-multi-${qNumber}`,
        type: 'multiple-choice',
        knowledgePoint: detectKnowledgePoint(line, level),
        score: 3,
        difficulty: qNumber <= 2 ? 'easy' : 'medium',
        question: line.replace(/【多选】|\[多选\]/g, '').replace(/^\d+[.、．]\s*/, ''),
        code: null,
        options: [],
        answer: [],
        partialAnswer: [],
        explanation: ''
      };

      i++;

      // 读取选项
      while (i < lines.length) {
        const optLine = lines[i].trim();
        const optMatch = optLine.match(/^([A-Da-d])[.、．:：]\s*(.+)/);

        if (optMatch) {
          currentQ.options.push(optMatch[2].trim());
          i++;
        } else if (/^(?:答案|解析)/.test(optLine)) {
          break;
        } else {
          i++;
        }
      }

      continue;
    }

    // 检测答案
    if (currentQ && line.startsWith('答案')) {
      const answerMatch = line.match(/答案[：:]\s*([A-Da-d]+)/);
      if (answerMatch) {
        currentQ.answer = answerMatch[1].toUpperCase().split('').map(c => ['A', 'B', 'C', 'D'].indexOf(c));
      }
    }

    // 检测解析
    if (currentQ && line.startsWith('解析')) {
      currentQ.explanation = line.replace(/^解析[：:]?\s*/, '');
    }

    i++;
  }

  // 保存最后一题
  if (currentQ && currentQ.question && currentQ.options.length >= 2) {
    questions.push(currentQ);
  }

  return { questions, endIndex: i };
}

/**
 * 解析编程题
 */
function parseCodingQuestions(lines, startIndex, level) {
  const questions = [];
  let i = startIndex;
  let currentQ = null;
  let qNumber = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // 检测编程题
    if (line.includes('编程题') || line.includes('【题目描述】') || line.includes('[题目描述]')) {
      // 保存上一题
      if (currentQ && currentQ.question) {
        questions.push(currentQ);
      }

      qNumber++;
      currentQ = {
        id: `q-${level}-coding-${qNumber}`,
        type: 'coding',
        knowledgePoint: detectKnowledgePoint(line, level),
        score: qNumber === 1 ? 10 : (qNumber === 2 ? 10 : (qNumber === 3 ? 15 : 20)),
        difficulty: qNumber <= 2 ? 'easy' : (qNumber === 3 ? 'medium' : 'hard'),
        question: '',
        codeTemplate: '# 请在下方编写代码\n',
        testCases: [],
        scoringRules: {
          fullScore: qNumber === 1 ? 10 : (qNumber === 2 ? 10 : (qNumber === 3 ? 15 : 20)),
          partialScores: []
        },
        referenceAnswer: '',
        explanation: ''
      };

      i++;

      // 读取题目描述
      let descLines = [];
      let inputDesc = [];
      let outputDesc = [];
      let sampleInput = [];
      let sampleOutput = [];
      let refCode = [];
      let section = 'description';

      while (i < lines.length) {
        const nextLine = lines[i].trim();

        if (nextLine.includes('【输入描述】') || nextLine.includes('[输入描述]')) {
          section = 'input';
          i++;
          continue;
        }
        if (nextLine.includes('【输出描述】') || nextLine.includes('[输出描述]')) {
          section = 'output';
          i++;
          continue;
        }
        if (nextLine.includes('【输入样例') || nextLine.includes('[输入样例')) {
          section = 'sampleInput';
          i++;
          continue;
        }
        if (nextLine.includes('【输出样例') || nextLine.includes('[输出样例')) {
          section = 'sampleOutput';
          i++;
          continue;
        }
        if (nextLine.includes('参考代码') || nextLine.includes('讲解视频')) {
          section = 'code';
          i++;
          continue;
        }
        if (nextLine.includes('编程题') || nextLine.includes('【题目描述】')) {
          break;
        }

        if (nextLine) {
          switch (section) {
            case 'description':
              descLines.push(nextLine);
              break;
            case 'input':
              inputDesc.push(nextLine);
              break;
            case 'output':
              outputDesc.push(nextLine);
              break;
            case 'sampleInput':
              sampleInput.push(nextLine);
              break;
            case 'sampleOutput':
              sampleOutput.push(nextLine);
              break;
            case 'code':
              if (nextLine.startsWith('def ') || nextLine.includes('=') || nextLine.startsWith('for') || nextLine.startsWith('if') || nextLine.startsWith('print')) {
                refCode.push(nextLine);
              }
              break;
          }
        }

        i++;
      }

      currentQ.question = descLines.join('\n');
      currentQ.referenceAnswer = refCode.join('\n');

      // 构建测试用例
      if (sampleInput.length > 0 && sampleOutput.length > 0) {
        currentQ.testCases.push({
          input: sampleInput[0] || '',
          expectedOutput: sampleOutput[0] || ''
        });
      }

      continue;
    }

    i++;
  }

  // 保存最后一题
  if (currentQ && currentQ.question) {
    questions.push(currentQ);
  }

  return { questions, endIndex: i };
}

/**
 * 检测知识点
 */
function detectKnowledgePoint(text, level) {
  const map = knowledgePointMap[level] || {};

  for (const [keyword, kpId] of Object.entries(map)) {
    if (text.includes(keyword)) {
      return kpId;
    }
  }

  return `kp-${level}-general`;
}

/**
 * 解析单个级别的PDF文本
 */
function parseLevelText(level) {
  const inputPath = path.join(inputDir, `level${level}-extracted.txt`);

  if (!fs.existsSync(inputPath)) {
    console.log(`文件不存在: ${inputPath}`);
    return null;
  }

  const text = fs.readFileSync(inputPath, 'utf-8');
  const lines = text.split('\n');

  console.log(`\n解析四级 ${level}...`);
  console.log(`总行数: ${lines.length}`);

  const result = {
    singleChoice: [],
    multipleChoice: [],
    coding: []
  };

  // 查找全真模拟卷部分
  let mockExamStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('全真模拟卷') || lines[i].includes('模拟卷')) {
      mockExamStart = i;
      break;
    }
  }

  // 如果找到模拟卷，优先从那里解析
  if (mockExamStart >= 0) {
    console.log(`找到模拟卷起始位置: 第 ${mockExamStart} 行`);

    // 解析模拟卷中的单选题
    const singleResult = parseSingleChoice(lines, mockExamStart, level);
    result.singleChoice = singleResult.questions;

    // 解析模拟卷中的多选题
    const multiResult = parseMultipleChoice(lines, mockExamStart, level);
    result.multipleChoice = multiResult.questions;

    // 解析模拟卷中的编程题
    const codingResult = parseCodingQuestions(lines, mockExamStart, level);
    result.coding = codingResult.questions;
  }

  // 如果模拟卷解析不足，从赛考题库解析
  let practiceStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('赛考题库') || lines[i].includes('Part II') || lines[i].includes('Part�II')) {
      practiceStart = i;
      break;
    }
  }

  if (practiceStart >= 0 && (result.singleChoice.length < 15 || result.coding.length < 4)) {
    console.log(`从赛考题库补充题目，起始位置: 第 ${practiceStart} 行`);

    const singleResult = parseSingleChoice(lines, practiceStart, level);
    const multiResult = parseMultipleChoice(lines, practiceStart, level);
    const codingResult = parseCodingQuestions(lines, practiceStart, level);

    // 补充不足的题目
    if (result.singleChoice.length < 15) {
      result.singleChoice = [...result.singleChoice, ...singleResult.questions].slice(0, 15);
    }
    if (result.multipleChoice.length < 5) {
      result.multipleChoice = [...result.multipleChoice, ...multiResult.questions].slice(0, 5);
    }
    if (result.coding.length < 4) {
      result.coding = [...result.coding, ...codingResult.questions].slice(0, 4);
    }
  }

  console.log(`解析结果: 单选 ${result.singleChoice.length} 题, 多选 ${result.multipleChoice.length} 题, 编程 ${result.coding.length} 题`);

  return result;
}

/**
 * 生成套卷数据
 */
function generatePracticeSet(level, questions, setNumber) {
  const setName = ['基础练习（一）', '基础练习（二）', '基础练习（三）', '进阶练习', '提升练习'][setNumber - 1] || `练习${setNumber}`;
  const difficulty = setNumber <= 3 ? 'basic' : (setNumber === 4 ? 'advanced' : 'expert');

  // 从题库中选择题目
  const singleChoice = questions.singleChoice.slice(0, 15).map((q, i) => ({
    ...q,
    id: `q-${level}-${setNumber}-single-${i + 1}`,
    score: 2
  }));

  const multipleChoice = questions.multipleChoice.slice(0, 5).map((q, i) => ({
    ...q,
    id: `q-${level}-${setNumber}-multi-${i + 1}`,
    score: 3
  }));

  const coding = questions.coding.slice(0, 4).map((q, i) => ({
    ...q,
    id: `q-${level}-${setNumber}-coding-${i + 1}`,
    score: [10, 10, 15, 20][i]
  }));

  const practiceSet = {
    meta: {
      id: `level${level}-${difficulty === 'basic' ? 'basic-' + setNumber : difficulty}`,
      level: `level${level}`,
      difficulty: difficulty,
      name: `四级${setName}`,
      description: `四级${difficulty === 'basic' ? '基础' : (difficulty === 'advanced' ? '进阶' : '提升')}练习`,
      duration: 90,
      totalScore: 100,
      createdAt: new Date().toISOString().split('T')[0],
      version: '1.0'
    },
    questions: [...singleChoice, ...multipleChoice, ...coding],
    distribution: {
      byType: {
        'single-choice': { count: singleChoice.length, totalScore: singleChoice.length * 2 },
        'multiple-choice': { count: multipleChoice.length, totalScore: multipleChoice.length * 3 },
        'coding': { count: coding.length, totalScore: coding.reduce((sum, q) => sum + q.score, 0) }
      },
      byDifficulty: {
        'easy': [...singleChoice, ...multipleChoice, ...coding].filter(q => q.difficulty === 'easy').length,
        'medium': [...singleChoice, ...multipleChoice, ...coding].filter(q => q.difficulty === 'medium').length,
        'hard': [...singleChoice, ...multipleChoice, ...coding].filter(q => q.difficulty === 'hard').length
      }
    }
  };

  return practiceSet;
}

/**
 * 主函数
 */
function main() {
  console.log('=== YCL 题目解析和套卷生成 ===\n');

  for (const level of [4, 5, 6]) {
    const questions = parseLevelText(level);

    if (!questions) continue;

    // 生成一套基础练习
    const practiceSet = generatePracticeSet(level, questions, 1);

    // 保存套卷数据
    const outputPath = path.join(outputDir, `level${level}/sets/basic-1.js`);

    // 生成JS文件内容
    const fileContent = `/**
 * YCL四级 ${practiceSet.meta.name}
 *
 * 由脚本自动生成，时间: ${practiceSet.meta.createdAt}
 * 题目数量: 单选 ${practiceSet.distribution.byType['single-choice'].count} 题,
 *           多选 ${practiceSet.distribution.byType['multiple-choice'].count} 题,
 *           编程 ${practiceSet.distribution.byType['coding'].count} 题
 */

export const practiceSet = ${JSON.stringify(practiceSet, null, 2)};

export default practiceSet;
`;

    // 确保目录存在
    const setDir = path.dirname(outputPath);
    if (!fs.existsSync(setDir)) {
      fs.mkdirSync(setDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    console.log(`套卷已保存: ${outputPath}`);

    // 保存解析结果JSON（供检查）
    const jsonPath = path.join(inputDir, `level${level}-parsed.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(questions, null, 2), 'utf-8');
    console.log(`解析结果已保存: ${jsonPath}`);
  }

  console.log('\n生成完成!');
}

main();
