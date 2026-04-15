/**
 * PY3 课程 L18-4: 布尔值与条件
 *
 * 核心知识点:
 * 1. True和False布尔值
 * 2. 条件表达式
 * 3. 布尔运算
 */

export const vocabData = [
  { word: 'in', pronunciation: '[in]', partOfSpeech: 'prep./adv.', meaning: '在...里面；进入', level: 'easy', example: 'Is it in the box?', exampleTranslation: '它在盒子里吗？', note: '' },
  { word: 'true', pronunciation: '[tru:]', partOfSpeech: 'adj./n.', meaning: '真；真实的', level: 'easy', example: 'Is it true?', exampleTranslation: '是真的吗？', note: '布尔值True' },
  { word: 'false', pronunciation: '[fo:ls]', partOfSpeech: 'adj.', meaning: '假；错误的', level: 'medium', example: 'The answer is false.', exampleTranslation: '答案是错的。', note: '布尔值False' },
  { word: 'check', pronunciation: '[tfek]', partOfSpeech: 'v./n.', meaning: '检查；核对', level: 'medium', example: 'Check the answer.', exampleTranslation: '检查答案。', note: '' },
  { word: 'boolean', pronunciation: "['bu:lian]", partOfSpeech: 'n./adj.', meaning: '布尔值；布尔的', level: 'hard', example: 'Boolean type.', exampleTranslation: '布尔类型。', note: '' }
]

export const knowledgePoints = [
  {
    id: 'kp-1', title: 'True和False布尔值', emoji: '✅', gradeLevel: '3-4', summary: '理解布尔类型的两个值',
    easy: {
      story: 'True和False是布尔类型的两个值！True表示真/对/是，False表示假/错/否！',
      concept: '布尔类型只有两个值：True和False。它们用于表示是/否、对/错、开/关等二元状态。',
      syntax: "# 布尔值\nis_alive = True\nis_game_over = False\n\nif is_alive:\n    print('角色还活着')",
      example: { title: '布尔变量', code: "playing = True\ngame_over = False\n\nif playing:\n    print('游戏进行中')\n\nif game_over:\n    print('游戏结束')", output: '显示游戏进行中', explanation: 'True条件成立，False不成立。' },
      practice: [{ question: 'True表示什么？', answer: '真/对/是' }, { question: 'False条件成立吗？', answer: '不成立' }]
    },
    medium: {
      story: '比较运算的结果是布尔值！5大于3得到True，2等于3得到False！',
      concept: '比较运算（大于、小于、等于、不等于等）返回布尔值。这些值可以直接用于条件判断。',
      syntax: "# 比较返回布尔值\nresult = 5 > 3  # True\nresult = 2 == 3  # False\nresult = 'a' in 'abc'  # True\n\n# 直接判断\nif 5 > 3:\n    print('5大于3')",
      example: { title: '比较结果', code: "print(5 > 3)   # True\nprint(2 == 3)  # False\nprint(1 != 2)  # True\nprint('a' in 'cat')  # True", output: 'True False True True', explanation: '比较运算返回布尔值。' },
      practice: [{ question: '5等于5的结果？', answer: 'True' }, { question: "'a' in 'bat'的结果？", answer: 'True' }]
    },
    hard: {
      story: '函数可以返回布尔值！is_even(x)判断是否偶数，返回True或False！',
      concept: '自定义函数可以返回布尔值，让代码更清晰。is_开头表示判断函数。',
      syntax: "# 返回布尔值的函数\ndef is_even(n):\n    return n % 2 == 0\n\ndef is_positive(n):\n    return n > 0\n\n# 使用\nif is_even(4):\n    print('4是偶数')",
      example: { title: '布尔函数', code: "def is_adult(age):\n    return age >= 18\n\nif is_adult(20):\n    print('成年人')\nelse:\n    print('未成年')", output: '成年人', explanation: '函数返回布尔值用于判断。' },
      practice: [{ question: '如何写判断函数？', answer: '返回比较表达式的结果' }, { question: 'is_开头表示什么？', answer: '这是一个判断函数' }]
    }
  },
  {
    id: 'kp-2', title: '条件表达式', emoji: '❓', gradeLevel: '3-4', summary: '用布尔值做条件判断',
    easy: {
      story: 'if后面跟布尔表达式！表达式为True就执行，为False就跳过！',
      concept: 'if语句的条件必须是布尔表达式。表达式的值为True时执行if内的代码。',
      syntax: "# if条件\nif True:\n    print('这会执行')\n\nif False:\n    print('这不会执行')\n\n# 通常用表达式\nif score > 60:\n    print('及格')",
      example: { title: 'if判断', code: "score = 85\n\nif score >= 60:\n    print('及格！')\nelse:\n    print('不及格')", output: '及格！', explanation: '85大于等于60为True，执行if分支。' },
      practice: [{ question: 'if后面需要什么？', answer: '布尔表达式' }, { question: '布尔表达式为True会怎样？', answer: '执行if内代码' }]
    },
    medium: {
      story: 'elif可以判断多个条件！从上到下检查，遇到True就执行并停止！',
      concept: 'if-elif-else链：依次检查条件，执行第一个为True的分支，后面的不再检查。',
      syntax: "# 多条件判断\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'D'",
      example: { title: '等级判断', code: "score = 85\n\nif score >= 90:\n    print('优秀')\nelif score >= 60:\n    print('及格')\nelse:\n    print('不及格')", output: '及格', explanation: '85不满足大于等于90，但满足大于等于60。' },
      practice: [{ question: 'elif的执行顺序？', answer: '从上到下，第一个True执行' }, { question: '多个条件都为True会怎样？', answer: '只执行第一个' }]
    },
    hard: {
      story: '三元运算符！一行代码完成条件判断：值1 if 条件 else 值2！',
      concept: '三元运算符是简写形式：result = value_if_true if condition else value_if_false。适合简单的条件赋值。',
      syntax: "# 三元运算符\ngrade = 'pass' if score >= 60 else 'fail'\nstatus = 'adult' if age >= 18 else 'minor'\nmax_val = a if a > b else b",
      example: { title: '三元运算符', code: "score = 75\nresult = '及格' if score >= 60 else '不及格'\nprint(result)\n\n# 比较两数取大\na, b = 10, 20\nmax_val = a if a > b else b\nprint(max_val)", output: '及格 20', explanation: '一行完成条件赋值。' },
      practice: [{ question: '三元运算符的格式？', answer: '值1 if 条件 else 值2' }, { question: '什么时候用三元？', answer: '简单条件赋值时' }]
    }
  },
  {
    id: 'kp-3', title: '布尔运算', emoji: '🔧', gradeLevel: '3-4', summary: '用and/or/not组合布尔值',
    easy: {
      story: 'not可以取反！not True等于False，not False等于True。就像否定！',
      concept: 'not运算符：取反布尔值。not True为False，not False为True。',
      syntax: "# not运算\nprint(not True)   # False\nprint(not False)  # True\n\n# 常见用法\nif not game_over:\n    print('游戏继续')",
      example: { title: 'not取反', code: "is_raining = False\n\nif not is_raining:\n    print('出去玩耍！')\n\nis_hungry = True\nif is_hungry:\n    print('吃饭')\nelse:\n    print('不饿')", output: '出去玩耍！吃饭', explanation: 'not取反布尔值。' },
      practice: [{ question: 'not True等于什么？', answer: 'False' }, { question: 'not False等于什么？', answer: 'True' }]
    },
    medium: {
      story: 'and和or组合多个条件！and要全部True，or只要一个True！',
      concept: 'and: 全部True才True。or: 一个True就True。用于组合多个条件。',
      syntax: "# and和or\nif a > 0 and b > 0:  # 都大于0\nif a > 0 or b > 0:   # 有一个大于0\n\n# 常见应用\nif score >= 60 and score <= 100:\n    print('有效分数')",
      example: { title: '组合条件', code: "age = 20\nhas_ticket = True\n\nif age >= 18 and has_ticket:\n    print('可以入场')\n\nis_weekend = True\nis_holiday = False\nif is_weekend or is_holiday:\n    print('休息日')", output: '可以入场 休息日', explanation: 'and和or组合条件。' },
      practice: [{ question: 'True and False等于什么？', answer: 'False' }, { question: 'True or False等于什么？', answer: 'True' }]
    },
    hard: {
      story: '复杂布尔表达式！用括号明确优先级，让逻辑更清晰！',
      concept: '复杂条件用括号分组。and优先级高于or，括号可以改变优先级。',
      syntax: "# 复杂表达式\nif (a > 0 or b > 0) and c > 0:\n    # a或b大于0，且c大于0\n\nif is_vip or (score > 80 and days > 10):\n    # VIP或者（高分且活跃）",
      example: { title: '复杂条件', code: "is_member = True\nscore = 85\nlevel = 3\n\nif is_member and (score > 80 or level > 2):\n    print('获得奖励')", output: '获得奖励', explanation: '括号改变优先级。' },
      practice: [{ question: 'and和or谁优先级高？', answer: 'and' }, { question: '如何改变优先级？', answer: '用括号' }]
    }
  }
]

export const exercises = [
  { id: 'ex-1', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '布尔值', question: 'True和False是什么类型？', options: ['数字', '字符串', '布尔类型', '列表'], answer: 2, explanation: 'True和False是布尔类型的值。', hint: 'bool类型' },
  { id: 'ex-2', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '比较结果', question: '5大于3的结果是什么？', options: ['5', '3', 'True', 'False'], answer: 2, explanation: '5大于3成立，返回True。', hint: '比较返回布尔值' },
  { id: 'ex-3', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: 'not运算', question: 'not False等于什么？', options: ['False', 'True', 'None', 'Error'], answer: 1, explanation: 'not取反，False变True。', hint: 'not取反' },
  { id: 'ex-4', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: 'and运算', question: 'True and False等于什么？', options: ['True', 'False', 'None', 'Error'], answer: 1, explanation: 'and需要两边都True。', hint: '有一个False就False' },
  { id: 'ex-5', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '三元运算', question: "'pass' if 60 > 50 else 'fail' 的结果是？", options: ["'pass'", "'fail'", 'True', 'False'], answer: 0, explanation: '60大于50为True，返回pass。', hint: '条件为真取第一个值' },
  { id: 'ex-6', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '复杂条件', question: 'True or False and False等于什么？（and优先）', options: ['True', 'False', 'None', 'Error'], answer: 0, explanation: 'False and False等于False，True or False等于True。', hint: 'and先算' }
]

export const lessonMeta = {
  id: 'L18-4', title: '布尔值与条件', subtitle: '掌握布尔类型和条件判断', difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: ['理解True和False布尔值', '掌握比较运算和布尔运算', '能用布尔值进行条件判断'],
  prerequisites: ['Python条件语句', '比较运算符', '基础逻辑']
}

export const typingWords = {
  easy: ['true', 'false', 'bool', 'if', 'in'],
  medium: ['check', 'equal', 'compare', 'return'],
  hard: ['boolean', 'condition', 'expression', 'operator']
}

export const typingTemplates = {
  easy: ['if True:', 'if False:', 'result = 5 > 3', 'if is_alive:'],
  medium: ['if score >= 60:\n    print("pass")', 'if not game_over:\n    play()', 'if a and b:\n    pass'],
  hard: ['grade = "A" if score >= 90 else "B"', 'if (a or b) and c:\n    pass']
}

export const L18_4_data = { meta: lessonMeta, vocab: vocabData, knowledgePoints, exercises, typingWords, typingTemplates }
export default L18_4_data
