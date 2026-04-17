/**
 * PY3 课程 L17-4: 激流勇进
 *
 * 核心知识点:
 * 1. 无限背景滚动
 * 2. 障碍物与金币生成
 * 3. 完整的游戏系统
 */

export const vocabData = [
  { word: 'boat', pronunciation: '[bout]', partOfSpeech: 'n./v.', meaning: '船；小船', level: 'easy', example: 'Drive the boat.', exampleTranslation: '驾驶小船。', note: '', source: 'ocr' },
  { word: 'coin', pronunciation: '[koin]', partOfSpeech: 'n./v.', meaning: '硬币；金币', level: 'easy', example: 'Collect coins.', exampleTranslation: '收集金币。', note: '', source: 'ocr' },
  { word: 'fish', pronunciation: '[fij]', partOfSpeech: 'n./v.', meaning: '鱼；钓鱼', level: 'medium', example: 'Catch the fish.', exampleTranslation: '抓鱼。', note: '', source: 'ocr' },
  { word: 'obstacle', pronunciation: "['abstakl]", partOfSpeech: 'n.', meaning: '障碍物；障碍', level: 'medium', example: 'Avoid obstacles.', exampleTranslation: '避开障碍物。', note: '', source: 'extended' },
  { word: 'scroll', pronunciation: '[skroul]', partOfSpeech: 'v./n.', meaning: '滚动；卷轴', level: 'hard', example: 'Background scroll.', exampleTranslation: '背景滚动。', note: '', source: 'extended' }
]

export const knowledgePoints = [
  {
    id: 'kp-1', title: '无限背景滚动', emoji: '🌊', gradeLevel: '3-4', summary: '创建无限循环的背景效果',
    easy: {
      story: '想让快艇感觉在前进吗？让背景向下移动，就像快艇在向上冲！',
      concept: '背景向下移动让角色看起来在前进。两个背景拼接，循环重复实现无限滚动。',
      syntax: "# 背景移动\nbg1.y += 3\nbg2.y += 3\n\n# 背景循环\nif bg1.top > HEIGHT:\n    bg1.y = -HEIGHT\nif bg2.top > HEIGHT:\n    bg2.y = -HEIGHT",
      example: { title: '背景滚动', code: "def update():\n    bg1.y += 5\n    bg2.y += 5\n    \n    if bg1.top > HEIGHT:\n        bg1.y = bg2.top - HEIGHT\n    if bg2.top > HEIGHT:\n        bg2.y = bg1.top - HEIGHT", output: '背景无限循环滚动', explanation: '两个背景交替循环。' },
      practice: [{ question: '如何让背景向下移动？', answer: 'bg.y += 速度' }, { question: '为什么要两个背景？', answer: '拼接循环，无缝滚动' }]
    },
    medium: {
      story: '背景滚动时，快艇看起来在前进！快艇本身不动，是背景在动，产生前进效果！',
      concept: '相对运动原理：角色不动，背景动，产生角色移动的视觉效果。',
      syntax: "# 相对运动\n# 快艇位置固定\nboat.pos = (400, 500)\n\n# 背景移动产生前进感\nbg1.y += 5\nbg2.y += 5\n\n# 快艇左右移动（智慧核心）\nboat.x = 智慧核心控制的位置",
      example: { title: '相对运动', code: "boat.pos = (400, 450)  # 固定\n\ndef update():\n    # 背景滚动\n    bg.y += 3\n    if bg.top > HEIGHT:\n        bg.y = 0", output: '快艇看起来在前进', explanation: '背景动，角色不动，产生移动感。' },
      practice: [{ question: '为什么快艇位置固定？', answer: '背景移动产生前进效果' }, { question: '如何控制速度？', answer: '改变背景移动速度' }]
    },
    hard: {
      story: '多层背景视差效果！远处的慢，近处的快，创造3D深度感！',
      concept: '视差滚动：多层背景以不同速度移动。远层慢，近层快，增加立体感。',
      syntax: "# 视差滚动\nbg_far.y += 1    # 远景慢\nbg_mid.y += 3    # 中景中\nbg_near.y += 5   # 近景快\n\n# 各层独立循环\nif bg_far.top > HEIGHT:\n    bg_far.y = -HEIGHT",
      example: { title: '视差效果', code: "def update():\n    bg_sky.y += 1   # 天空最慢\n    bg_water.y += 4  # 水面较快\n    bg_waves.y += 6  # 波浪最快", output: '三层背景不同速度', explanation: '视差创造深度感。' },
      practice: [{ question: '什么是视差滚动？', answer: '不同层不同速度' }, { question: '远景应该快还是慢？', answer: '慢（远处看不太出来）' }]
    }
  },
  {
    id: 'kp-2', title: '障碍物与金币生成', emoji: '💰', gradeLevel: '3-4', summary: '随机生成障碍物和收集品',
    easy: {
      story: '河里有金币可以收集！碰到金币得分，快艇前进更快！',
      concept: '金币随机生成在河道中。碰撞检测判断是否收集，收集后增加分数和金币数。',
      syntax: "# 金币列表\ncoins = []\n\n# 生成金币\ncoin = Actor('coin')\ncoin.pos = (random.randint(100, 700), -50)\ncoins.append(coin)\n\n# 收集金币\nfor coin in coins:\n    if boat.colliderect(coin):\n        coins.remove(coin)\n        score += 10",
      example: { title: '金币收集', code: "coins = []\n\ndef spawn_coin():\n    coin = Actor('coin')\n    coin.x = random.randint(50, 750)\n    coin.y = -30\n    coins.append(coin)\n\ndef update():\n    for c in coins[:]:\n        c.y += 3\n        if boat.colliderect(c):\n            coins.remove(c)\n            score += 10", output: '收集金币得分', explanation: '金币下落，碰撞收集。' },
      practice: [{ question: '金币如何移动？', answer: '金币y坐标增加' }, { question: '收集金币后做什么？', answer: '从列表删除，加分' }]
    },
    medium: {
      story: '河里还有障碍物！碰到障碍物游戏结束！要小心避开！',
      concept: '障碍物和金币类似，但碰撞后游戏结束。障碍物可以用岩石、漩涡等。',
      syntax: "# 障碍物\nobstacles = []\n\n# 生成障碍物\nob = Actor('rock')\nob.pos = (random.randint(100, 700), -50)\nobstacles.append(ob)\n\n# 碰撞检测\nfor ob in obstacles:\n    if boat.colliderect(ob):\n        state = 'game_over'",
      example: { title: '障碍物', code: "rocks = []\n\ndef update():\n    for rock in rocks[:]:\n        rock.y += 3\n        \n        # 碰到障碍物结束\n        if boat.colliderect(rock):\n            state = 'lose'\n        \n        # 超出屏幕移除\n        if rock.top > HEIGHT:\n            rocks.remove(rock)", output: '碰到岩石游戏结束', explanation: '障碍物碰撞导致失败。' },
      practice: [{ question: '障碍物碰撞后？', answer: '游戏结束' }, { question: '如何区分金币和障碍物？', answer: '不同图片、不同碰撞结果' }]
    },
    hard: {
      story: '还有鱼儿可以捕！捕到鱼获得金币，增加收益！',
      concept: '多种收集物：金币、鱼、宝箱等，价值不同。随机生成，控制概率。',
      syntax: "# 多种生成\nimport random\n\ndef spawn_item():\n    r = random.random()\n    \n    if r < 0.5:  # 50%金币\n        item = Actor('coin')\n        item.value = 10\n    elif r < 0.8:  # 30%鱼\n        item = Actor('fish')\n        item.value = 20\n    else:  # 20%宝箱\n        item = Actor('chest')\n        item.value = 50\n    \n    items.append(item)",
      example: { title: '随机生成', code: "def spawn():\n    r = random.random()\n    \n    if r < 0.4:\n        item = Actor('coin')\n        score_value = 10\n    elif r < 0.7:\n        item = Actor('fish')\n        score_value = 30\n    else:\n        item = Actor('rock')\n        score_value = -1  # 障碍", output: '随机生成不同物品', explanation: '概率控制生成类型。' },
      practice: [{ question: '如何控制生成概率？', answer: '用random.random()和if判断' }, { question: '50%概率怎么写？', answer: 'if random.random() < 0.5' }]
    }
  },
  {
    id: 'kp-3', title: '完整游戏系统', emoji: '🎮', gradeLevel: '3-4', summary: '整合所有功能完成游戏',
    easy: {
      story: '完整游戏包括：分数、金币数、游戏时间、结束画面！',
      concept: '游戏需要：分数变量、金币统计、计时、游戏状态、结束画面。',
      syntax: "# 游戏变量\nscore = 0\ncoins = 0\ntime = 0\nstate = 'playing'\n\ndef draw():\n    screen.draw.text(f'分数: {score}', (10, 10))\n    screen.draw.text(f'金币: {coins}', (10, 40))",
      example: { title: '游戏UI', code: "score = 0\ngold = 0\n\ndef draw():\n    # 游戏中显示UI\n    screen.draw.text(f'Score: {score}', (10, 10))\n    screen.draw.text(f'Gold: {gold}', (10, 35))", output: '显示分数和金币', explanation: 'draw显示游戏数据。' },
      practice: [{ question: '游戏需要哪些变量？', answer: '分数、金币、状态等' }, { question: '如何显示游戏数据？', answer: '用screen.draw.text()' }]
    },
    medium: {
      story: '游戏结束后显示结算画面！显示获得的金币数量，可以重新开始！',
      concept: '结束画面显示最终分数和金币，提供重玩按钮。',
      syntax: "# 结算画面\ndef draw():\n    if state == 'game_over':\n        screen.draw.text('游戏结束', (350, 200))\n        screen.draw.text(f'分数: {score}', (360, 260))\n        screen.draw.text(f'金币: {gold}', (360, 300))\n        screen.draw.text('点击重玩', (350, 360))",
      example: { title: '结算画面', code: "def draw():\n    if state == 'lose':\n        screen.draw.text('GAME OVER', (330, 200), fontsize=50)\n        screen.draw.text(f'Score: {score}', (350, 280))\n        screen.draw.text(f'Coins: {gold}', (350, 320))", output: '显示结束信息', explanation: '状态判断显示不同画面。' },
      practice: [{ question: '结算画面显示什么？', answer: '分数、金币、重玩提示' }, { question: '如何重玩？', answer: '点击或按键重置游戏' }]
    },
    hard: {
      story: '完整的游戏循环！开始 -> 游戏中 -> 结束 -> 重玩 -> 开始！',
      concept: '完整流程：初始化 -> 主循环 -> 结束处理 -> 重置 -> 再开始。',
      syntax: "# 完整流程\nstate = 'start'\n\ndef reset_game():\n    global score, gold, state\n    score = 0\n    gold = 0\n    state = 'playing'\n    # 重置所有游戏对象\n    boat.pos = (400, 500)\n    items.clear()\n    rocks.clear()\n\ndef on_mouse_down():\n    if state == 'start':\n        state = 'playing'\n    elif state == 'game_over':\n        reset_game()",
      example: { title: '游戏循环', code: "state = 'menu'\n\ndef reset():\n    global score, state\n    score = 0\n    state = 'playing'\n    boat.pos = (400, 450)\n    items.clear()\n\ndef on_key_down(key):\n    if key == keys.SPACE:\n        if state == 'menu' or state == 'over':\n            reset()", output: '完整游戏流程', explanation: '状态机控制流程。' },
      practice: [{ question: '重置游戏要做什么？', answer: '清零变量、重置位置、清空列表' }, { question: '为什么需要reset函数？', answer: '方便重玩时初始化' }]
    }
  }
]

export const exercises = [
  { id: 'ex-1', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '背景滚动', question: '背景向下移动怎么写？', options: ['bg.y -= 5', 'bg.y += 5', 'bg.x += 5', 'bg.x -= 5'], answer: 1, explanation: 'y增加表示向下移动。', hint: 'y向下增加' },
  { id: 'ex-2', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '金币收集', question: '收集金币后应该做什么？', options: ['什么都不做', '删除金币，加分', '金币消失', '游戏结束'], answer: 1, explanation: '收集后删除金币并增加分数。', hint: '删除和加分' },
  { id: 'ex-3', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '视差效果', question: '视差滚动是什么？', options: ['背景不移动', '所有层速度相同', '不同层不同速度', '只有一层背景'], answer: 2, explanation: '视差是多层背景不同速度移动。', hint: '多层不同速' },
  { id: 'ex-4', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '随机生成', question: '50%概率生成金币怎么写？', options: ['if random == 0.5:', 'if random.random() < 0.5:', 'if random.random() == 0.5:', 'if random() = 0.5:'], answer: 1, explanation: 'random.random()<0.5是50%概率。', hint: '小于0.5是50%' },
  { id: 'ex-5', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '游戏循环', question: '游戏重置需要做什么？', options: ['只重置分数', '只重置位置', '重置所有游戏变量', '不需要重置'], answer: 2, explanation: '重置所有：分数、位置、列表、状态。', hint: '全面重置' },
  { id: 'ex-6', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '相对运动', question: '为什么角色位置固定但看起来在移动？', options: ['角色真的在移动', '背景在移动', '屏幕在移动', '眼睛错觉'], answer: 1, explanation: '背景移动产生角色前进的视觉效果。', hint: '背景动产生效果' }
]

export const lessonMeta = {
  id: 'L17-4', title: '激流勇进', subtitle: '学会背景滚动和完整游戏', difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: ['掌握无限背景滚动', '学会障碍物和金币生成', '能实现完整游戏系统'],
  prerequisites: ['Pygame Zero基础', '列表操作', '随机数']
}

export const typingWords = {
  easy: ['boat', 'coin', 'fish', 'rock'],
  medium: ['obstacle', 'scroll', 'spawn', 'collect'],
  hard: ['parallax', 'velocity', 'reset', 'generate']
}

export const typingTemplates = {
  easy: ['bg.y += 5', 'boat.colliderect(coin)', 'score += 10', 'coins.remove(coin)'],
  medium: ['if random.random() < 0.5:\n    spawn_coin()', 'if bg.top > HEIGHT:\n    bg.y = -HEIGHT'],
  hard: ['def reset_game():\n    score = 0\n    coins.clear()', 'bg_far.y += 1\nbg_mid.y += 3\nbg_near.y += 5']
}

export const L17_4_data = { meta: lessonMeta, vocab: vocabData, knowledgePoints, exercises, typingWords, typingTemplates }
export default L17_4_data
