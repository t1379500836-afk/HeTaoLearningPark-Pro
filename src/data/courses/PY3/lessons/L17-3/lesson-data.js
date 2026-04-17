/**
 * PY3 课程 L17-3: 泡泡龙游戏
 *
 * 核心知识点:
 * 1. 角色跳跃与平台控制
 * 2. 泡泡生成与碰撞
 * 3. 游戏胜负判断
 */

export const vocabData = [
  { word: 'board', pronunciation: '[bo:rd]', partOfSpeech: 'n./v.', meaning: '板；木板；上船', level: 'easy', example: 'Jump on the board.', exampleTranslation: '跳到板上。', note: '', source: 'ocr' },
  { word: 'bubble', pronunciation: "['b<bl]", partOfSpeech: 'n./v.', meaning: '气泡；泡泡', level: 'easy', example: 'Blow bubbles.', exampleTranslation: '吹泡泡。', note: '', source: 'ocr' },
  { word: 'bounce', pronunciation: '[bauns]', partOfSpeech: 'v./n.', meaning: '弹跳；反弹', level: 'medium', example: 'The ball bounces.', exampleTranslation: '球弹起来了。', note: '', source: 'extended' },
  { word: 'win', pronunciation: '[win]', partOfSpeech: 'v./n.', meaning: '赢；获胜', level: 'medium', example: 'You win!', exampleTranslation: '你赢了！', note: '', source: 'extended' },
  { word: 'lose', pronunciation: '[lu:z]', partOfSpeech: 'v.', meaning: '输；失败', level: 'hard', example: 'Do not lose hope.', exampleTranslation: '不要失去希望。', note: '', source: 'extended' }
]

export const knowledgePoints = [
  {
    id: 'kp-1', title: '角色跳跃与平台控制', emoji: '🦘', gradeLevel: '3-4', summary: '让角色站在移动平台上跳跃',
    easy: {
      story: '咪噜站在平台上，平台左右移动！咪噜可以跳起来打泡泡！',
      concept: '平台角色用智慧核心控制左右移动。角色站在平台上，跳跃到上方打泡泡。',
      syntax: "# 平台控制\ndef update():\n    # 平台左右移动\n    if keyboard.left:\n        platform.x -= 5\n    if keyboard.right:\n        platform.x += 5",
      example: { title: '移动平台', code: "def update():\n    if keyboard.left and platform.left > 0:\n        platform.x -= 5\n    if keyboard.right and platform.right < WIDTH:\n        platform.x += 5", output: '用方向键控制平台移动', explanation: '键盘控制平台左右移动。' },
      practice: [{ question: '如何让平台左移？', answer: 'platform.x -= 5' }, { question: '为什么要检查边界？', answer: '不让平台超出屏幕' }]
    },
    medium: {
      story: '咪噜可以从平台弹起！碰到屏幕边缘会反弹，碰到平台也会反弹！',
      concept: '角色跳跃后碰到边界会反弹。物理效果：速度反向、位置限制。',
      syntax: "# 反弹效果\nif character.left < 0:\n    character.left = 0\n    velocity_x = -velocity_x  # 反弹\n\nif character.right > WIDTH:\n    character.right = WIDTH\n    velocity_x = -velocity_x",
      example: { title: '边界反弹', code: "vx = 3\n\ndef update():\n    global vx\n    player.x += vx\n    \n    if player.left < 0:\n        player.left = 0\n        vx = -vx\n    if player.right > WIDTH:\n        player.right = WIDTH\n        vx = -vx", output: '角色在屏幕内来回弹', explanation: '碰到边界速度反向。' },
      practice: [{ question: '反弹的核心是什么？', answer: '速度取反' }, { question: '为什么反弹前要限制位置？', answer: '防止超出边界' }]
    },
    hard: {
      story: '完整的平台跳跃系统！角色从平台弹起，随机左右方向，落到平台上方继续弹起！',
      concept: '完整系统包括：平台移动、角色弹起、边界反弹、平台碰撞检测。',
      syntax: "# 完整系统\nvy = 0\ngame_over = False\n\ndef on_jump():\n    global vy\n    vy = -10  # 向上跳\n\ndef update():\n    global vy\n    \n    # 重力\n    vy += 0.5\n    player.y += vy\n    \n    # 边界\n    if player.top < 0:\n        player.top = 0\n        vy = -vy\n    \n    # 平台碰撞\n    if player.colliderect(platform) and vy > 0:\n        player.bottom = platform.top\n        vy = -10  # 弹起",
      example: { title: '弹跳系统', code: "vy = 0\n\ndef update():\n    global vy\n    vy += 0.5\n    player.y += vy\n    \n    if player.colliderect(platform) and vy > 0:\n        player.bottom = platform.top\n        vy = -8  # 弹起", output: '角色在平台上弹跳', explanation: '碰到平台向上弹。' },
      practice: [{ question: '为什么检查vy > 0？', answer: '只在下落时检测碰撞' }, { question: 'vy += 0.5是什么效果？', answer: '重力效果，加速下落' }]
    }
  },
  {
    id: 'kp-2', title: '泡泡生成与碰撞', emoji: '🫧', gradeLevel: '3-4', summary: '生成泡泡并检测碰撞',
    easy: {
      story: '泡泡从顶部出现！咪噜碰到泡泡，泡泡就消失，得分！',
      concept: '泡泡是Actor对象，用列表管理。碰撞检测用colliderect()，碰到后从列表删除。',
      syntax: "# 泡泡列表\nbubbles = []\n\n# 生成泡泡\nbubble = Actor('bubble')\nbubble.pos = (random.randint(50, 750), random.randint(50, 200))\nbubbles.append(bubble)\n\n# 碰撞检测\nfor bubble in bubbles:\n    if player.colliderect(bubble):\n        bubbles.remove(bubble)",
      example: { title: '泡泡碰撞', code: "def update():\n    for bubble in bubbles[:]:\n        if player.colliderect(bubble):\n            bubbles.remove(bubble)\n            score += 10", output: '碰到泡泡得分', explanation: '遍历副本安全删除。' },
      practice: [{ question: '为什么用bubbles[:]遍历？', answer: '创建副本，安全删除' }, { question: '泡泡用什么管理？', answer: '列表' }]
    },
    medium: {
      story: '泡泡有不同排列！可以是一排、一列、还是随机分布！打完所有泡泡就胜利！',
      concept: '泡泡可以用循环批量生成，排列成不同形状。计数泡泡数量，为0时胜利。',
      syntax: "# 批量生成泡泡\nfor row in range(3):\n    for col in range(8):\n        bubble = Actor('bubble')\n        x = 100 + col * 80\n        y = 50 + row * 60\n        bubble.pos = (x, y)\n        bubbles.append(bubble)",
      example: { title: '排列泡泡', code: "bubbles = []\n\nfor i in range(5):\n    for j in range(10):\n        b = Actor('bubble')\n        b.pos = (40 + j * 75, 40 + i * 50)\n        bubbles.append(b)", output: '5行10列泡泡', explanation: '双重循环排列。' },
      practice: [{ question: '如何让泡泡排列更紧密？', answer: '减少间距' }, { question: '如何生成随机位置？', answer: '用random.randint()' }]
    },
    hard: {
      story: '高级泡泡系统！不同颜色泡泡、泡泡会移动、泡泡会分裂！',
      concept: '泡泡可以添加自定义属性：颜色、速度、类型等。在update中更新泡泡状态。',
      syntax: "# 高级泡泡\nfor bubble in bubbles:\n    # 泡泡移动\n    bubble.y += bubble.speed\n    \n    # 泡泡左右飘动\n    bubble.x += math.sin(bubble.y / 20) * 2\n    \n    # 超出边界重置\n    if bubble.top > HEIGHT:\n        bubble.y = -50",
      example: { title: '移动泡泡', code: "import math\n\ndef update():\n    for bubble in bubbles:\n        bubble.y += 1\n        bubble.x += math.sin(time.time()) * 2", output: '泡泡下落并左右飘', explanation: 'sin函数让泡泡飘动。' },
      practice: [{ question: '如何让泡泡左右飘？', answer: '用sin函数改变x坐标' }, { question: '泡泡下落怎么实现？', answer: 'bubble.y += 速度' }]
    }
  },
  {
    id: 'kp-3', title: '游戏胜负判断', emoji: '🏆', gradeLevel: '3-4', summary: '判断游戏胜利或失败',
    easy: {
      story: '打完所有泡泡就赢！咪噜掉出屏幕就输！简单的规则让游戏更有趣！',
      concept: '胜利条件：泡泡列表为空。失败条件：角色掉出屏幕底部。',
      syntax: "# 胜负判断\nif len(bubbles) == 0:\n    print('胜利！')\n    state = 'win'\n\nif player.top > HEIGHT:\n    print('失败！')\n    state = 'lose'",
      example: { title: '胜负检测', code: "def update():\n    if len(bubbles) == 0:\n        state = 'win'\n    \n    if player.top > HEIGHT:\n        state = 'lose'", output: '检测胜利或失败', explanation: '用状态变量记录结果。' },
      practice: [{ question: '如何判断胜利？', answer: 'len(bubbles) == 0' }, { question: '如何判断失败？', answer: 'player.top > HEIGHT' }]
    },
    medium: {
      story: '游戏结束时显示画面！胜利显示"恭喜"，失败显示"再试一次"！',
      concept: '用状态变量控制显示不同画面。state可以是playing、win、lose。',
      syntax: "# 状态控制\nstate = 'playing'\n\ndef draw():\n    if state == 'playing':\n        draw_game()\n    elif state == 'win':\n        screen.draw.text('恭喜！', center=(400, 300))\n    elif state == 'lose':\n        screen.draw.text('再试一次', center=(400, 300))",
      example: { title: '结束画面', code: "state = 'playing'\n\ndef draw():\n    if state == 'win':\n        screen.draw.text('胜利！', (350, 280), fontsize=60)\n    elif state == 'lose':\n        screen.draw.text('游戏结束', (320, 280), fontsize=60)", output: '根据状态显示文字', explanation: 'draw根据state显示内容。' },
      practice: [{ question: '用什么变量控制状态？', answer: 'state变量' }, { question: '游戏有几种状态？', answer: 'playing、win、lose' }]
    },
    hard: {
      story: '完整的游戏流程！开始界面 -> 游戏中 -> 胜利/失败 -> 重新开始！',
      concept: '完整游戏状态机：init -> playing -> win/lose -> 可以重玩。',
      syntax: "# 完整状态机\nstate = 'init'\n\ndef on_mouse_down(pos):\n    global state\n    if state == 'init':\n        state = 'playing'\n    elif state in ['win', 'lose']:\n        if restart_button.collidepoint(pos):\n            reset_game()\n            state = 'playing'\n\ndef reset_game():\n    global bubbles, player\n    bubbles = create_bubbles()\n    player.pos = (400, 500)",
      example: { title: '状态机', code: "state = 'start'\n\ndef draw():\n    if state == 'start':\n        screen.draw.text('点击开始', (340, 300))\n    elif state == 'playing':\n        draw_game()\n    elif state == 'win':\n        screen.draw.text('胜利！点击重玩', (300, 300))", output: '完整游戏流程', explanation: '状态控制所有流程。' },
      practice: [{ question: '如何重新开始游戏？', answer: '重置所有变量，state改为playing' }, { question: '状态机的好处？', answer: '流程清晰，易于控制' }]
    }
  }
]

export const exercises = [
  { id: 'ex-1', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '碰撞检测', question: '检测泡泡碰撞用什么方法？', options: ['colliderect()', 'collide()', 'hit()', 'touch()'], answer: 0, explanation: 'colliderect()检测两个角色是否碰撞。', hint: '角色碰撞方法' },
  { id: 'ex-2', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '胜利条件', question: '如何判断打完所有泡泡？', options: ['if bubbles == 0', 'if len(bubbles) == 0', 'if bubbles is empty', 'if no bubbles'], answer: 1, explanation: 'len(bubbles)获取列表长度。', hint: '列表长度为0' },
  { id: 'ex-3', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '反弹实现', question: '角色碰到左边界如何反弹？', options: ['player.x = 0', 'vx = -vx', 'player.stop()', 'vx = 0'], answer: 1, explanation: '速度取反实现反弹效果。', hint: '速度反向' },
  { id: 'ex-4', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '批量生成', question: '如何生成3行8列的泡泡？', options: ['用24个append', '双重循环', '只能一个一个生成', '用函数自动生成'], answer: 1, explanation: '双重循环可以批量生成。', hint: 'row和col循环' },
  { id: 'ex-5', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '状态机', question: '游戏状态机需要哪些状态？', options: ['只要playing', 'init/playing/end', 'start/playing/win/lose', '任意状态'], answer: 2, explanation: '完整的游戏需要开始、游戏中、胜利、失败状态。', hint: '完整流程' },
  { id: 'ex-6', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '重力系统', question: 'vy += 0.5的效果是什么？', options: ['匀速下落', '加速下落', '减速上升', '停止'], answer: 1, explanation: '每次增加0.5，速度越来越快，模拟重力加速。', hint: '重力效果' }
]

export const lessonMeta = {
  id: 'L17-3', title: '泡泡龙游戏', subtitle: '学会平台跳跃和泡泡碰撞', difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: ['掌握角色弹跳和平台控制', '学会泡泡生成和碰撞', '能实现游戏胜负判断'],
  prerequisites: ['Pygame Zero基础', '列表操作', '碰撞检测']
}

export const typingWords = {
  easy: ['board', 'jump', 'bubble', 'bounce'],
  medium: ['platform', 'collide', 'remove', 'score', 'win'],
  hard: ['velocity', 'gravity', 'restart', 'state', 'lose']
}

export const typingTemplates = {
  easy: ['player.colliderect(bubble)', 'bubbles.remove(bubble)', 'if len(bubbles) == 0:', 'platform.x += 5'],
  medium: ['for row in range(3):\n    for col in range(8):', 'if player.top > HEIGHT:\n    state = "lose"', 'if state == "win":\n    screen.draw.text("胜利!")'],
  hard: ['vy += 0.5\nplayer.y += vy', 'if player.colliderect(platform) and vy > 0:\n    vy = -8']
}

export const L17_3_data = { meta: lessonMeta, vocab: vocabData, knowledgePoints, exercises, typingWords, typingTemplates }
export default L17_3_data
