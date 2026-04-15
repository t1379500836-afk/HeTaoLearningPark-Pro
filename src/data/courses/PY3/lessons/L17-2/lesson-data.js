/**
 * PY3 课程 L17-2: 姿态大师
 *
 * 核心知识点:
 * 1. getAttitude获取设备姿态
 * 2. 七种姿态识别
 * 3. 姿态控制游戏
 */

export const vocabData = [
  { word: 'attitude', pronunciation: "['aetitu:d]", partOfSpeech: 'n.', meaning: '姿态；态度', level: 'easy', example: 'Get the device attitude.', exampleTranslation: '获取设备姿态。', note: 'getAttitude()' },
  { word: 'pose', pronunciation: '[pouz]', partOfSpeech: 'n./v.', meaning: '姿势；摆姿势', level: 'easy', example: 'Hold the pose.', exampleTranslation: '保持姿势。', note: '' },
  { word: 'beat', pronunciation: '[bi:t]', partOfSpeech: 'v./n.', meaning: '击打；节拍', level: 'medium', example: 'Follow the beat.', exampleTranslation: '跟上节拍。', note: '' },
  { word: 'angle', pronunciation: "['aengl]", partOfSpeech: 'n.', meaning: '角度；视角', level: 'medium', example: 'The angle is 30 degrees.', exampleTranslation: '角度是30度。', note: '' },
  { word: 'orientation', pronunciation: "[,o:rian'teijan]", partOfSpeech: 'n.', meaning: '方向；取向', level: 'hard', example: 'Check the orientation.', exampleTranslation: '检查方向。', note: '' }
]

export const knowledgePoints = [
  {
    id: 'kp-1', title: '获取设备姿态', emoji: '📱', gradeLevel: '3-4', summary: '用getAttitude()获取设备方向',
    easy: {
      story: '想用平板电脑的倾斜来控制游戏吗？getAttitude()能知道平板是朝上、朝下还是倾斜！',
      concept: 'getAttitude()返回设备当前的姿态名称。有7种姿态：震动、箭头朝上、箭头朝下、向左倾斜、向右倾斜、屏幕朝上、屏幕朝下。',
      syntax: "# 获取姿态\nattitude = getAttitude()\nprint(f'当前姿态: {attitude}')",
      example: { title: '获取姿态', code: "def update():\n    attitude = getAttitude()\n    print(attitude)", output: '显示当前姿态名称', explanation: 'getAttitude()返回姿态字符串。' },
      practice: [{ question: 'getAttitude()返回什么？', answer: '姿态名称（字符串）' }, { question: '有多少种姿态？', answer: '7种' }]
    },
    medium: {
      story: '不同姿态可以触发不同事件！平板朝上角色站住，朝下角色趴下，向左倾斜角色左移！',
      concept: '用姿态控制游戏：判断姿态名称，执行对应操作。',
      syntax: "# 姿态控制\nattitude = getAttitude()\n\nif attitude == '箭头朝上':\n    player.stand()\nelif attitude == '箭头朝下':\n    player.crouch()\nelif attitude == '向左倾斜':\n    player.move_left()",
      example: { title: '姿态控制移动', code: "def update():\n    a = getAttitude()\n    \n    if a == '向左倾斜':\n        player.x -= 5\n    elif a == '向右倾斜':\n        player.x += 5", output: '倾斜平板控制角色移动', explanation: '姿态名称匹配控制方向。' },
      practice: [{ question: '如何判断向左倾斜？', answer: "if getAttitude() == '向左倾斜':" }, { question: '姿态控制适合什么设备？', answer: '平板、手机等带陀螺仪的设备' }]
    },
    hard: {
      story: '姿态组合控制！快速切换姿态触发特殊技能，保持某个姿态触发持续效果！',
      concept: '记录姿态历史、检测姿态变化、组合多种姿态判断。',
      syntax: "# 姿态变化检测\nprev_attitude = ''\n\ndef update():\n    global prev_attitude\n    current = getAttitude()\n    \n    if current != prev_attitude:\n        print(f'姿态变化: {prev_attitude} -> {current}')\n        on_attitude_change(current)\n    \n    prev_attitude = current",
      example: { title: '姿态变化', code: "prev = ''\n\ndef on_attitude_change(new_attitude):\n    if new_attitude == '箭头朝上':\n        player.jump()\n\ndef update():\n    global prev\n    current = getAttitude()\n    if current != prev:\n        on_attitude_change(current)\n        prev = current", output: '姿态变化时触发动作', explanation: '检测变化才触发，避免重复。' },
      practice: [{ question: '为什么要检测姿态变化？', answer: '避免同一姿态持续触发' }, { question: '如何记录之前的姿态？', answer: '用全局变量保存' }]
    }
  },
  {
    id: 'kp-2', title: '七种姿态识别', emoji: '🧭', gradeLevel: '3-4', summary: '理解所有姿态类型',
    easy: {
      story: '智慧核心有7种姿态：震动、箭头朝上、箭头朝下、向左倾斜、向右倾斜、屏幕朝上、屏幕朝下！',
      concept: '7种姿态覆盖了设备的各种方向状态：正面朝上、朝下、四个方向倾斜、以及震动。',
      syntax: "# 7种姿态\n# 1. 震动 - 设备在晃动\n# 2. 箭头朝上 - 设备上端朝上\n# 3. 箭头朝下 - 设备上端朝下\n# 4. 向左倾斜 - 设备向左斜\n# 5. 向右倾斜 - 设备向右斜\n# 6. 屏幕朝上 - 屏幕面朝上\n# 7. 屏幕朝下 - 屏幕面朝下",
      example: { title: '打印所有姿态', code: "def update():\n    a = getAttitude()\n    print(f'姿态: {a}')", output: '显示当前姿态', explanation: '不同方向显示不同姿态名。' },
      practice: [{ question: '平板平放屏幕朝上是什么姿态？', answer: '屏幕朝上' }, { question: '平板左右晃动是什么姿态？', answer: '震动' }]
    },
    medium: {
      story: '不同姿态可以设计成不同的游戏操作！向左倾斜=左转，向右倾斜=右转，震动=攻击！',
      concept: '将姿态映射到游戏操作，创造体感游戏体验。',
      syntax: "# 姿态映射\naction = {\n    '向左倾斜': 'left',\n    '向右倾斜': 'right',\n    '箭头朝上': 'up',\n    '箭头朝下': 'down',\n    '震动': 'attack'\n}\n\nattitude = getAttitude()\nif attitude in action:\n    do_action(action[attitude])",
      example: { title: '姿态映射', code: "def update():\n    a = getAttitude()\n    \n    if a == '向左倾斜':\n        car.turn_left()\n    elif a == '向右倾斜':\n        car.turn_right()\n    elif a == '震动':\n        car.boost()", output: '姿态控制赛车', explanation: '不同姿态执行不同游戏操作。' },
      practice: [{ question: '如何用姿态控制攻击？', answer: "if getAttitude() == '震动': attack()" }, { question: '姿态映射的好处？', answer: '让游戏更直观有趣' }]
    },
    hard: {
      story: '姿态检测需要注意！有时设备可能在临界位置，姿态会快速切换，需要稳定处理！',
      concept: '姿态检测可能不稳定，用防抖逻辑处理：连续检测到相同姿态才确认。',
      syntax: "# 姿态防抖\nattitude_count = {}\nstable_attitude = ''\n\ndef get_stable_attitude():\n    global attitude_count, stable_attitude\n    \n    current = getAttitude()\n    attitude_count[current] = attitude_count.get(current, 0) + 1\n    \n    # 连续3次相同才确认\n    if attitude_count.get(current, 0) >= 3:\n        stable_attitude = current\n        attitude_count = {}  # 重置\n    \n    return stable_attitude",
      example: { title: '稳定姿态', code: "count = 0\nprev = ''\n\ndef update():\n    global count, prev\n    current = getAttitude()\n    \n    if current == prev:\n        count += 1\n    else:\n        count = 1\n        prev = current\n    \n    if count >= 3:\n        handle_attitude(current)", output: '连续3次相同才响应', explanation: '防抖避免误触发。' },
      practice: [{ question: '为什么要防抖？', answer: '姿态检测可能不稳定' }, { question: '防抖如何实现？', answer: '连续检测多次相同才确认' }]
    }
  }
]

export const exercises = [
  { id: 'ex-1', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '姿态获取', question: 'getAttitude()返回什么？', options: ['数字', '姿态名称', '角度值', '布尔值'], answer: 1, explanation: '返回姿态名称字符串。', hint: '名称如"箭头朝上"' },
  { id: 'ex-2', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '姿态数量', question: '智慧核心有几种姿态？', options: ['3种', '5种', '7种', '10种'], answer: 2, explanation: '有7种姿态。', hint: '震动、上下左右、屏幕朝上下' },
  { id: 'ex-3', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '姿态判断', question: '如何判断设备向左倾斜？', options: ["if getAttitude('left'):", "if getAttitude() == '向左倾斜':", "if attitude == left:", "if isLeft():"], answer: 1, explanation: '获取姿态并与字符串比较。', hint: '姿态是中文字符串' },
  { id: 'ex-4', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '姿态控制', question: '平板屏幕朝下应该是什么姿态？', options: ['震动', '箭头朝上', '屏幕朝下', '向左倾斜'], answer: 2, explanation: '屏幕朝下是独立的姿态类型。', hint: '屏幕朝向' },
  { id: 'ex-5', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '防抖处理', question: '姿态防抖的目的是什么？', options: ['让姿态更准确', '避免快速切换误触发', '提高检测速度', '减少代码'], answer: 1, explanation: '防抖避免姿态在临界位置频繁切换。', hint: '稳定性' },
  { id: 'ex-6', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '姿态变化', question: '如何检测姿态从A变成B？', options: ['只检测当前姿态', '记录之前姿态，比较是否变化', '用两个函数', '不需要检测'], answer: 1, explanation: '用变量记录之前姿态，比较当前是否不同。', hint: 'prev和current比较' }
]

export const lessonMeta = {
  id: 'L17-2', title: '姿态大师', subtitle: '学会用设备姿态控制游戏', difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: ['掌握getAttitude()获取姿态', '理解7种姿态类型', '能用姿态控制游戏'],
  prerequisites: ['Python条件判断', '字符串比较']
}

export const typingWords = {
  easy: ['pose', 'tilt', 'left', 'right'],
  medium: ['attitude', 'screen', 'shake', 'arrow', 'beat', 'angle'],
  hard: ['orientation', 'detect', 'stable', 'change']
}

export const typingTemplates = {
  easy: ['getAttitude()', "if a == '向左倾斜':", 'attitude = getAttitude()'],
  medium: ["if getAttitude() == '屏幕朝上':\n    player.stand()", "elif attitude == '震动':\n    player.attack()"],
  hard: ['if current != prev:\n    on_change(current)\n    prev = current', 'if count >= 3:\n    handle(stable)']
}

export const L17_2_data = { meta: lessonMeta, vocab: vocabData, knowledgePoints, exercises, typingWords, typingTemplates }
export default L17_2_data
