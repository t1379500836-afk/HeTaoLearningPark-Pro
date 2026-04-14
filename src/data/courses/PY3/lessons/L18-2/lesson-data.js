/**
 * PY3 课程 L18-2: 双人合作游戏
 *
 * 核心知识点:
 * 1. 双角色控制
 * 2. 开关与门机关
 * 3. 合作通关策略
 */

export const vocabData = [
  { word: 'fire', pronunciation: "['faiar]", partOfSpeech: 'n./v.', meaning: '火；开火', level: 'easy', example: 'Fire!', exampleTranslation: '开火！', note: '' },
  { word: 'ice', pronunciation: '[ais]', partOfSpeech: 'n./v.', meaning: '冰；冰冻', level: 'easy', example: 'Ice is cold.', exampleTranslation: '冰是冷的。', note: '' },
  { word: 'stone', pronunciation: '[stoun]', partOfSpeech: 'n./v.', meaning: '石头；石块', level: 'medium', example: 'Throw the stone.', exampleTranslation: '扔石头。', note: '' },
  { word: 'switch', pronunciation: '[switj]', partOfSpeech: 'n./v.', meaning: '开关；转换', level: 'medium', example: 'Turn on the switch.', exampleTranslation: '打开开关。', note: '' },
  { word: 'cooperate', pronunciation: "[kou'apareit]", partOfSpeech: 'v.', meaning: '合作；协作', level: 'hard', example: 'Cooperate with each other.', exampleTranslation: '互相合作。', note: '' }
]

export const knowledgePoints = [
  {
    id: 'kp-1', title: '双角色控制', emoji: '👥', gradeLevel: '3-4', summary: '用不同方式控制两个角色',
    easy: {
      story: '火火和冰冰两个角色！一个用智慧核心控制，一个用键盘控制！',
      concept: '两个角色需要不同的控制方式。火火用智慧核心姿态控制，冰冰用键盘控制。',
      syntax: "# 双角色控制\ndef update():\n    # 火火 - 智慧核心\n    pose = getAttitude()\n    if pose == '向左倾斜':\n        fire.x -= 5\n    \n    # 冰冰 - 键盘\n    if keyboard.left:\n        ice.x -= 5",
      example: { title: '双控制', code: "def update():\n    # 火火用姿态\n    pose = getAttitude()\n    if pose == '箭头朝上':\n        fire.jump()\n    \n    # 冰冰用键盘\n    if keyboard.space:\n        ice.jump()", output: '两种方式控制两个角色', explanation: '不同输入控制不同角色。' },
      practice: [{ question: '为什么要用两种控制方式？', answer: '区分两个玩家' }, { question: '火火用什么控制？', answer: '智慧核心姿态' }]
    },
    medium: {
      story: '两个角色需要配合！火火不能碰水，冰冰不能碰火，需要互相帮助！',
      concept: '不同角色有不同特性，需要避开不同的危险。',
      syntax: "# 角色特性\ndef update():\n    # 火火碰水受伤\n    for water in waters:\n        if fire.colliderect(water):\n            fire.hurt()\n    \n    # 冰冰碰火受伤\n    for fire_trap in fire_traps:\n        if ice.colliderect(fire_trap):\n            ice.hurt()",
      example: { title: '角色特性', code: "def update():\n    # 火火怕水\n    if fire.colliderect(water):\n        print('火火被水浇灭！')\n    \n    # 冰冰怕火\n    if ice.colliderect(lava):\n        print('冰冰被融化！')", output: '不同角色碰到危险物伤害', explanation: '角色和障碍物匹配。' },
      practice: [{ question: '火火怕什么？', answer: '水' }, { question: '冰冰怕什么？', answer: '火' }]
    },
    hard: {
      story: '双人合作！一个角色按开关，另一个角色进门！需要配合！',
      concept: '合作需要角色分工：一个触发开关，一个进门。用全局变量记录开关状态。',
      syntax: "# 合作机制\ndef update():\n    # 火火按开关\n    for sw in switches:\n        if fire.colliderect(sw):\n            sw.activate()\n            door.open()\n    \n    # 冰冰进门\n    if ice.colliderect(door) and door.is_open:\n        level_complete()",
      example: { title: '合作', code: "door_open = False\n\ndef update():\n    global door_open\n    \n    # 任何人按开关开门\n    if fire.colliderect(switch) or ice.colliderect(switch):\n        door_open = True\n    \n    # 冰冰先进门\n    if ice.colliderect(door) and door_open:\n        print('冰冰先过关！')", output: '一个按开关，一个进门', explanation: '合作需要分工。' },
      practice: [{ question: '合作游戏的要点？', answer: '分工配合' }, { question: '开关有什么用？', answer: '开门或触发机关' }]
    }
  },
  {
    id: 'kp-2', title: '开关与门机关', emoji: '🚪', gradeLevel: '3-4', summary: '用开关控制门的开关状态',
    easy: {
      story: '踩到开关，门就打开！离开开关，门可能关上也可能保持打开！',
      concept: '开关是机关触发器。踩住开关时触发事件（开门），离开后根据设计决定是否重置。',
      syntax: "# 开关检测\nif player.colliderect(switch):\n    door.image = 'door_open'\n    door.is_open = True\nelse:\n    door.image = 'door_closed'\n    door.is_open = False",
      example: { title: '开关门', code: "def update():\n    if fire.colliderect(switch):\n        door.image = 'open_door'\n    else:\n        door.image = 'closed_door'", output: '踩开关开门，离开关门', explanation: '开关状态实时控制门。' },
      practice: [{ question: '开关的作用？', answer: '触发机关' }, { question: '踩住开关门会怎样？', answer: '门打开' }]
    },
    medium: {
      story: '门的状态用变量记录！is_open记录门是否打开，碰撞时检查这个变量！',
      concept: '用布尔变量记录门的状态。只有门打开时角色才能通过。',
      syntax: "# 门状态\ndoor_open = False\n\ndef update():\n    global door_open\n    \n    if fire.colliderect(switch):\n        door_open = True\n    \n    if ice.colliderect(door) and door_open:\n        print('进门成功！')",
      example: { title: '状态控制', code: "door_open = False\n\ndef update():\n    global door_open\n    if fire.colliderect(switch):\n        door_open = True\n    \n    # 冰冰进门\n    if ice.colliderect(door) and door_open:\n        print('通关！')", output: '状态判断通过', explanation: '布尔变量控制门的通过条件。' },
      practice: [{ question: '用什么记录门状态？', answer: '布尔变量' }, { question: '进门条件？', answer: '门打开时' }]
    },
    hard: {
      story: '多个开关控制多个门！压力板开关、按钮开关、限时开关等不同类型！',
      concept: '多种开关类型：压力板（踩住生效）、按钮（按一次永久生效）、限时开关（几秒后关闭）。',
      syntax: "# 多种开关\ndef update():\n    # 压力板 - 必须踩住\n    if player.colliderect(pressure_plate):\n        door1.open()\n    else:\n        door1.close()\n    \n    # 按钮 - 永久生效\n    if player.colliderect(button):\n        button_pressed = True\n    if button_pressed:\n        door2.open()\n    \n    # 限时开关\n    if player.colliderect(timer_switch):\n        timer = 180  # 3秒",
      example: { title: '开关类型', code: "timer = 0\n\ndef update():\n    global timer\n    if timer > 0:\n        timer -= 1\n        door.open()\n    else:\n        door.close()\n    \n    if player.colliderect(switch):\n        timer = 180  # 3秒后关", output: '限时开门', explanation: '计时器控制开关持续时间。' },
      practice: [{ question: '压力板特点？', answer: '必须踩住才生效' }, { question: '限时开关怎么实现？', answer: '用计时器倒计时' }]
    }
  },
  {
    id: 'kp-3', title: '合作通关策略', emoji: '🤝', gradeLevel: '3-4', summary: '设计需要双人配合的通关方式',
    easy: {
      story: '一个人按开关，另一个人进门！需要两个人配合才能过关！',
      concept: '合作游戏需要两人配合。设计任务让不同角色做不同事情。',
      syntax: "# 合作设计\n# 任务1：火火按开关\n# 任务2：冰冰进门\n\nif fire.colliderect(switch):\n    door_open = True\n\nif ice.colliderect(door) and door_open:\n    level_complete()",
      example: { title: '分工合作', code: "door_open = False\n\ndef update():\n    global door_open\n    \n    # 火火负责按开关\n    if fire.colliderect(switch):\n        door_open = True\n    \n    # 冰冰负责进门\n    if ice.colliderect(door) and door_open:\n        print('过关！')", output: '分工完成', explanation: '不同角色做不同任务。' },
      practice: [{ question: '合作游戏需要什么？', answer: '两人配合' }, { question: '谁按开关谁进门？', answer: '可以分配' }]
    },
    medium: {
      story: '有些地方只有火火能去，有些地方只有冰冰能去！利用角色特性分配任务！',
      concept: '角色特性决定任务分配。火火不怕火能过岩浆，冰冰不怕水能过水池。',
      syntax: "# 角色特性分工\n# 火火过岩浆区\nif fire.colliderect(lava):\n    pass  # 不受伤\n\n# 冰冰过水池区\nif ice.colliderect(water):\n    pass  # 不受伤",
      example: { title: '特性分工', code: "def update():\n    # 火火走岩浆路\n    for lava in lavas:\n        if fire.colliderect(lava):\n            pass  # 火火安全\n        if ice.colliderect(lava):\n            ice.hurt()\n    \n    # 冰冰走水路\n    for water in waters:\n        if ice.colliderect(water):\n            pass  # 冰冰安全\n        if fire.colliderect(water):\n            fire.hurt()", output: '角色走对应路线', explanation: '不同角色走不同路线。' },
      practice: [{ question: '火火能过什么？', answer: '岩浆' }, { question: '冰冰能过什么？', answer: '水池' }]
    },
    hard: {
      story: '复杂关卡需要多次配合！按开关1开路，按开关2开门，最后一起过关！',
      concept: '多步骤合作：设计多个需要配合的环节，每步都需要两人协调。',
      syntax: "# 多步骤合作\nstep = 1\n\ndef update():\n    global step\n    \n    if step == 1:\n        # 第一步：开桥\n        if fire.colliderect(bridge_switch):\n            bridge.open()\n            step = 2\n    \n    elif step == 2:\n        # 第二步：过桥开门\n        if ice.colliderect(door_switch):\n            door.open()\n            step = 3\n    \n    elif step == 3:\n        # 第三步：一起过关\n        if fire.colliderect(exit) and ice.colliderect(exit):\n            level_complete()",
      example: { title: '多步骤', code: "step = 1\nbridge_open = False\ndoor_open = False\n\ndef update():\n    global step, bridge_open, door_open\n    \n    if fire.colliderect(switch1):\n        bridge_open = True\n    \n    if bridge_open and ice.colliderect(switch2):\n        door_open = True\n    \n    if door_open and fire.colliderect(door):\n        print('通关！')", output: '多步合作', explanation: '步骤式合作设计。' },
      practice: [{ question: '多步骤合作的要点？', answer: '顺序执行，环环相扣' }, { question: '最后一步通常是？', answer: '两人都到达终点' }]
    }
  }
]

export const exercises = [
  { id: 'ex-1', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '角色区分', question: '如何区分两个玩家？', options: ['用不同颜色', '用不同控制方式', '用不同名字', '无法区分'], answer: 1, explanation: '用不同的输入方式区分玩家。', hint: '控制方式不同' },
  { id: 'ex-2', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '角色特性', question: '火火角色怕什么？', options: ['石头', '冰', '水', '火'], answer: 2, explanation: '火怕水，水火不容。', hint: '水火不容' },
  { id: 'ex-3', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '开关作用', question: '开关在游戏中的作用？', options: ['装饰', '触发机关', '加分', '无用'], answer: 1, explanation: '开关触发门等机关。', hint: '机关控制' },
  { id: 'ex-4', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '合作策略', question: '合作游戏的通关策略？', options: ['各自为战', '分工配合', '抢资源', '比赛'], answer: 1, explanation: '合作需要分工配合。', hint: '合作二字' },
  { id: 'ex-5', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '双控制', question: '火火用什么方式控制？', options: ['键盘', '智慧核心姿态', '鼠标', '声音'], answer: 1, explanation: '火火用智慧核心姿态控制。', hint: '回顾课程内容' },
  { id: 'ex-6', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '机关设计', question: '谁应该按开关？', options: ['随便谁', '离开关近的', '不需要按的', '需要门的'], answer: 3, explanation: '需要进门的角色应该让另一人按开关。', hint: '合作分工' }
]

export const lessonMeta = {
  id: 'L18-2', title: '双人合作游戏', subtitle: '学会双角色控制和合作', difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: ['掌握双角色不同控制方式', '理解角色特性和机关', '能设计合作通关策略'],
  prerequisites: ['L18-1 关卡切换', '智慧核心基础', 'Pygame Zero碰撞']
}

export const typingWords = {
  easy: ['fire', 'ice', 'door', 'open'],
  medium: ['switch', 'stone', 'water', 'trap'],
  hard: ['cooperate', 'together', 'partner', 'strategy']
}

export const typingTemplates = {
  easy: ['fire.colliderect(switch)', 'ice.colliderect(door)', 'door.is_open = True', 'if door_open:'],
  medium: ['if fire.colliderect(water):\n    fire.hurt()', 'if ice.colliderect(lava):\n    ice.hurt()', 'global door_open\ndoor_open = True'],
  hard: ['def update():\n    if fire.colliderect(switch):\n        door.open()\n    if ice.colliderect(door):\n        level_complete()']
}

export const L18_2_data = { meta: lessonMeta, vocab: vocabData, knowledgePoints, exercises, typingWords, typingTemplates }
export default L18_2_data
