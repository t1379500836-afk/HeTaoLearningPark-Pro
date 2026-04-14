/**
 * PY3 课程 L18-1: 闯关游戏设计
 *
 * 核心知识点:
 * 1. 姿态与按键控制
 * 2. 全局变量关卡切换
 * 3. 闯关游戏串联
 */

export const vocabData = [
  { word: 'raft', pronunciation: '[raeft]', partOfSpeech: 'n./v.', meaning: '木筏；橡皮艇', level: 'easy', example: 'Ride the raft.', exampleTranslation: '乘坐木筏。', note: '' },
  { word: 'water', pronunciation: "['wo:tar]", partOfSpeech: 'n./v.', meaning: '水；浇水', level: 'easy', example: 'Drink water.', exampleTranslation: '喝水。', note: '' },
  { word: 'hammer', pronunciation: "['haemar]", partOfSpeech: 'n./v.', meaning: '锤子；敲打', level: 'medium', example: 'Use the hammer.', exampleTranslation: '使用锤子。', note: '' },
  { word: 'level', pronunciation: "['levl]", partOfSpeech: 'n./v.', meaning: '等级；水平', level: 'medium', example: 'Next level!', exampleTranslation: '下一关！', note: '' },
  { word: 'stage', pronunciation: "[steid3]", partOfSpeech: 'n.', meaning: '舞台；阶段', level: 'hard', example: 'Final stage.', exampleTranslation: '最后阶段。', note: '' }
]

export const knowledgePoints = [
  {
    id: 'kp-1', title: '姿态与按键控制', emoji: '🎮', gradeLevel: '3-4', summary: '用姿态和按键控制角色',
    easy: {
      story: '智慧核心可以检测姿态和按键！getAttitude()获取姿态，getKey()获取按键状态！',
      concept: 'getAttitude()返回设备姿态名称，如"箭头朝上"、"向左倾斜"等。姿态是中文的。',
      syntax: "# 获取姿态\npose = getAttitude()\n\nif pose == '箭头朝下':\n    raft.y += 8",
      example: { title: '姿态控制', code: "def update():\n    pose = getAttitude()\n    if pose == '箭头朝下':\n        raft.y += 8", output: '向下倾斜时木筏下移', explanation: '姿态名称是中文。' },
      practice: [{ question: '如何获取姿态？', answer: 'getAttitude()' }, { question: '姿态名称是什么语言？', answer: '中文' }]
    },
    medium: {
      story: 'getKey()获取按键状态！可以知道哪个键被按下了！',
      concept: 'getKey()返回当前按下的键。返回格式如"D按下"、"空格按下"等。',
      syntax: "# 获取按键\nk = getKey()\nif k == 'D按下':\n    hammer.image = '锤子击打'",
      example: { title: '按键检测', code: "def update():\n    k = getKey()\n    if k == 'D按下':\n        hammer.image = 'hammer_hit'", output: 'D键按下时切换图片', explanation: 'getKey返回按键状态。' },
      practice: [{ question: 'getKey()返回什么？', answer: '按键状态字符串' }, { question: '如何判断D键按下？', answer: "if getKey() == 'D按下':" }]
    },
    hard: {
      story: '姿态和按键结合！姿态控制方向，按键触发动作！',
      concept: '姿态控制移动方向，按键触发攻击等动作。两种输入方式配合使用。',
      syntax: "# 组合控制\ndef update():\n    pose = getAttitude()\n    key = getKey()\n    \n    # 姿态控制移动\n    if pose == '向左倾斜':\n        player.x -= 5\n    \n    # 按键控制攻击\n    if key == '空格按下':\n        player.attack()",
      example: { title: '双控制', code: "def update():\n    pose = getAttitude()\n    if pose == '箭头朝下':\n        raft.y += 5\n    \n    key = getKey()\n    if key == 'D按下':\n        hammer.hit()", output: '姿态移动，按键攻击', explanation: '两种输入配合。' },
      practice: [{ question: '如何组合两种控制？', answer: '分别获取，分别判断' }, { question: '姿态适合控制什么？', answer: '移动方向' }]
    }
  },
  {
    id: 'kp-2', title: '全局变量关卡切换', emoji: '🔄', gradeLevel: '3-4', summary: '用全局变量管理游戏关卡',
    easy: {
      story: '闯关游戏需要多个关卡！用全局变量level记录当前是第几关！',
      concept: '全局变量level记录关卡数。通过判断level显示不同关卡内容。',
      syntax: "# 关卡变量\nlevel = 1  # 全局变量\n\ndef draw():\n    if level == 1:\n        draw_level_1()\n    elif level == 2:\n        draw_level_2()",
      example: { title: '关卡判断', code: "level = 1\n\ndef draw():\n    if level == 1:\n        screen.draw.text('第一关', (350, 300))\n    elif level == 2:\n        screen.draw.text('第二关', (350, 300))", output: '根据level显示不同内容', explanation: 'level控制关卡。' },
      practice: [{ question: '用什么变量记录关卡？', answer: '全局变量level' }, { question: '如何显示不同关卡？', answer: 'if判断level值' }]
    },
    medium: {
      story: '关卡切换需要用global声明！函数内修改全局变量必须加global！',
      concept: '在函数内修改全局变量需要用global关键字声明。否则会创建同名局部变量。',
      syntax: "# 修改全局变量\nlevel = 1\n\ndef next_level():\n    global level  # 必须声明\n    level += 1",
      example: { title: 'global声明', code: "level = 1\n\ndef complete_level():\n    global level\n    level += 1\n    print(f'进入第{level}关')", output: '关卡数+1', explanation: 'global声明才能修改全局变量。' },
      practice: [{ question: '函数内修改全局变量需要什么？', answer: 'global声明' }, { question: '不加global会怎样？', answer: '创建局部变量，全局不变' }]
    },
    hard: {
      story: '数据在关卡间保留！分数、金币、生命等数据跨关卡保存！',
      concept: '有些数据跨关卡保留（分数、金币），有些重置（敌人、位置）。用全局变量管理这些数据。',
      syntax: "# 跨关卡数据\nscore = 0       # 保留\nlives = 3       # 保留\ncurrent_level = 1\n\ndef start_level(n):\n    global current_level\n    current_level = n\n    # 敌人位置重置\n    enemies.clear()\n    spawn_enemies()",
      example: { title: '数据管理', code: "score = 0\n\ndef next_level():\n    global level\n    level += 1\n    # 分数保留，位置重置\n    player.pos = (400, 300)\n    enemies.clear()", output: '分数保留，其他重置', explanation: '重要数据保留。' },
      practice: [{ question: '什么数据应该保留？', answer: '分数、金币等' }, { question: '什么数据应该重置？', answer: '角色位置、敌人等' }]
    }
  },
  {
    id: 'kp-3', title: '闯关游戏串联', emoji: '🎯', gradeLevel: '3-4', summary: '将多个关卡串联成完整游戏',
    easy: {
      story: '闯关游戏就是多个小游戏的串联！通过关卡变量切换，像翻书一样！',
      concept: '每个关卡是一个独立场景，用关卡变量控制显示哪个场景。',
      syntax: "# 关卡串联\nlevel = 1\n\ndef draw():\n    if level == 1:\n        draw_level_1()\n    elif level == 2:\n        draw_level_2()\n    elif level == 3:\n        draw_level_3()",
      example: { title: '关卡显示', code: "level = 1\n\ndef draw():\n    if level == 1:\n        bg1.draw()\n    elif level == 2:\n        bg2.draw()", output: '显示当前关卡背景', explanation: 'level控制显示内容。' },
      practice: [{ question: '如何切换关卡？', answer: '修改level变量' }, { question: '每个关卡有什么？', answer: '独立的场景和逻辑' }]
    },
    medium: {
      story: '关卡结束触发切换！通关条件：收集所有金币、到达终点、消灭敌人等！',
      concept: '每关有结束条件，满足后切换到下一关。用函数封装切换逻辑。',
      syntax: "# 关卡结束\ndef update():\n    # 第一关结束条件\n    if level == 1 and len(coins) == 0:\n        next_level()\n    \n    # 第二关结束条件\n    if level == 2 and player.x > WIDTH:\n        next_level()",
      example: { title: '结束条件', code: "def update():\n    if level == 1:\n        if len(coins) == 0:\n            next_level()\n    elif level == 2:\n        if boss.hp <= 0:\n            next_level()", output: '条件满足切换关卡', explanation: '每关有不同结束条件。' },
      practice: [{ question: '第一关结束条件可能是什么？', answer: '收集所有金币' }, { question: '如何触发切换？', answer: '调用next_level()函数' }]
    },
    hard: {
      story: '完整闯关流程！开始 -> 第1关 -> 第2关 -> ... -> 通关！还有暂停、重玩等功能！',
      concept: '完整游戏包括：开始界面、多个关卡、通关界面、失败处理、重玩功能。',
      syntax: "# 完整流程\nmax_level = 5\nstate = 'menu'\n\ndef update():\n    if state == 'playing':\n        if level_complete():\n            if level < max_level:\n                level += 1\n                init_level()\n            else:\n                state = 'win'\n        if game_over():\n            state = 'lose'",
      example: { title: '完整流程', code: "max_level = 3\nstate = 'menu'\n\ndef update():\n    if state == 'playing':\n        if level_complete():\n            if level < max_level:\n                level += 1\n            else:\n                state = 'win'", output: '通关或继续', explanation: '检查是否最后一关。' },
      practice: [{ question: '通关后做什么？', answer: '显示通关画面' }, { question: '如何重玩？', answer: '重置level和state' }]
    }
  }
]

export const exercises = [
  { id: 'ex-1', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '姿态获取', question: 'getAttitude()返回什么？', options: ['数字', '姿态名称', '角度值', '布尔值'], answer: 1, explanation: '返回姿态名称字符串。', hint: '如箭头朝上' },
  { id: 'ex-2', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: 'global声明', question: '函数内修改全局变量level需要什么？', options: ['不需要任何声明', 'global level', 'self level', 'var level'], answer: 1, explanation: '修改全局变量需要global声明。', hint: 'global关键字' },
  { id: 'ex-3', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '按键检测', question: 'getKey()的返回格式是？', options: ['数字', '布尔值', '"D按下"等字符串', '键码'], answer: 2, explanation: '返回如"D按下"、"空格按下"等字符串。', hint: '中文描述' },
  { id: 'ex-4', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '关卡切换', question: '如何切换到下一关？', options: ['level = level + 1', '需要global level后+1', 'next()函数', '以上都需要global'], answer: 3, explanation: '函数内切换需要声明global并+1。', hint: '声明+修改' },
  { id: 'ex-5', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '数据保留', question: '什么数据应该保留到下一关？', options: ['角色位置', '敌人列表', '分数', '关卡地图'], answer: 2, explanation: '分数是跨关卡的，应该保留。', hint: '跨关卡的数据' },
  { id: 'ex-6', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '闯关设计', question: '闯关游戏的关卡设计原则？', options: ['难度递进', '难度相同', '随机难度', '越来越简单'], answer: 0, explanation: '关卡难度应该递进，逐步学习。', hint: '教学原则' }
]

export const lessonMeta = {
  id: 'L18-1', title: '闯关游戏设计', subtitle: '学会关卡切换和串联', difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: ['掌握姿态和按键控制', '学会全局变量关卡切换', '能设计闯关游戏'],
  prerequisites: ['Python全局变量', '条件判断', 'Pygame Zero基础']
}

export const typingWords = {
  easy: ['level', 'stage', 'water', 'raft'],
  medium: ['hammer', 'switch', 'control', 'global'],
  hard: ['attitude', 'complete', 'progress', 'advance']
}

export const typingTemplates = {
  easy: ['getAttitude()', 'getKey()', 'level = 1', 'if level == 2:'],
  medium: ['global level\nlevel += 1', "if pose == '箭头朝下':\n    raft.y += 8", "if k == 'D按下':\n    hammer.hit()"],
  hard: ['def next_level():\n    global level\n    level += 1\n    init_level(level)', 'if level < max_level:\n    level += 1\nelse:\n    state = "win"']
}

export const L18_1_data = { meta: lessonMeta, vocab: vocabData, knowledgePoints, exercises, typingWords, typingTemplates }
export default L18_1_data
