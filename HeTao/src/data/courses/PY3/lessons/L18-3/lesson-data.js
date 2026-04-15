/**
 * PY3 课程 L18-3: 射击游戏设计
 *
 * 核心知识点:
 * 1. 射击与碰撞
 * 2. 齿轮机关
 * 3. 门与通关
 */

export const vocabData = [
  { word: 'door', pronunciation: '[do:r]', partOfSpeech: 'n.', meaning: '门；门口', level: 'easy', example: 'Open the door.', exampleTranslation: '开门。', note: '' },
  { word: 'gear', pronunciation: '[gir]', partOfSpeech: 'n./v.', meaning: '齿轮；换挡', level: 'easy', example: 'The gear is turning.', exampleTranslation: '齿轮在转动。', note: '' },
  { word: 'shoot', pronunciation: '[ju:t]', partOfSpeech: 'v./n.', meaning: '射击；拍摄', level: 'medium', example: 'Shoot the ball.', exampleTranslation: '射球。', note: '' },
  { word: 'ball', pronunciation: '[bo:l]', partOfSpeech: 'n./v.', meaning: '球；球状物', level: 'medium', example: 'Throw the ball.', exampleTranslation: '扔球。', note: '' },
  { word: 'target', pronunciation: "['ta:rgit]", partOfSpeech: 'n./v.', meaning: '目标；靶子', level: 'hard', example: 'Hit the target.', exampleTranslation: '击中目标。', note: '' }
]

export const knowledgePoints = [
  {
    id: 'kp-1', title: '射击与碰撞', emoji: '🎯', gradeLevel: '3-4', summary: '实现射击和碰撞检测',
    easy: {
      story: '发射子弹击中目标！子弹从角色位置飞出，碰到目标就消失！',
      concept: '射击：按空格创建子弹角色，设置初始位置在角色处。子弹用列表管理，每帧移动。',
      syntax: "# 射击系统\nbullets = []\n\ndef on_key_down(key):\n    if key == keys.SPACE:\n        b = Actor('bullet')\n        b.pos = player.pos\n        bullets.append(b)\n\ndef update():\n    for b in bullets:\n        b.y -= 10",
      example: { title: '射击系统', code: "bullets = []\n\ndef on_key_down(key):\n    if key == keys.SPACE:\n        b = Actor('bullet')\n        b.pos = player.pos\n        bullets.append(b)\n\ndef update():\n    for b in bullets:\n        b.y -= 8", output: '空格发射子弹', explanation: '按键创建子弹，更新移动。' },
      practice: [{ question: '子弹应该从哪里发射？', answer: '角色当前位置' }, { question: '子弹如何移动？', answer: '每帧更新位置坐标' }]
    },
    medium: {
      story: '击中目标得分！用碰撞检测判断子弹是否击中目标！',
      concept: '碰撞检测：用colliderect()判断子弹和目标是否重叠。重叠时删除双方，增加分数。',
      syntax: "# 碰撞检测\nfor b in bullets[:]:\n    for t in targets[:]:\n        if b.colliderect(t):\n            bullets.remove(b)\n            targets.remove(t)\n            score += 10\n            break",
      example: { title: '击中检测', code: "def update():\n    for b in bullets[:]:\n        b.y -= 10\n        for t in targets[:]:\n            if b.colliderect(t):\n                bullets.remove(b)\n                targets.remove(t)\n                score += 10\n                break", output: '击中目标得分', explanation: '双层循环检测每颗子弹和每个目标。' },
      practice: [{ question: 'colliderect()返回什么？', answer: 'True/False' }, { question: '为什么用bullets[:]遍历？', answer: '创建副本，安全删除' }]
    },
    hard: {
      story: '高级射击！多种子弹类型、子弹数量限制、射击冷却时间等！',
      concept: '进阶射击：多种子弹类型、子弹数量限制、射击冷却时间等。',
      syntax: "# 高级射击\nbullet_types = ['normal', 'fire', 'ice']\nmax_bullets = 10\nshoot_cooldown = 0\n\ndef shoot():\n    global shoot_cooldown\n    if len(bullets) < max_bullets and shoot_cooldown <= 0:\n        bullet = Actor(random.choice(bullet_types))\n        bullet.pos = player.pos\n        bullets.append(bullet)\n        shoot_cooldown = 10",
      example: { title: '射击冷却', code: "cooldown = 0\n\ndef on_key_down(key):\n    global cooldown\n    if key == keys.SPACE and cooldown <= 0:\n        shoot()\n        cooldown = 15\n\ndef update():\n    global cooldown\n    if cooldown > 0:\n        cooldown -= 1", output: '射击需要冷却', explanation: '冷却时间控制射击频率。' },
      practice: [{ question: '为什么需要射击冷却？', answer: '控制射击频率' }, { question: '如何限制子弹数量？', answer: 'len(bullets) < max_bullets' }]
    }
  },
  {
    id: 'kp-2', title: '齿轮机关', emoji: '⚙️', gradeLevel: '3-4', summary: '设计旋转齿轮障碍物',
    easy: {
      story: '齿轮在不停转动！碰到齿轮会受伤，需要小心避开！',
      concept: '齿轮是旋转障碍物。用animate()让齿轮旋转，碰撞检测判断是否碰到。',
      syntax: "# 齿轮旋转\ngear = Actor('gear')\ngear.pos = (400, 300)\n\nanimate(gear, on_finished=None, duration=2, angle=360, repeat=True)",
      example: { title: '旋转齿轮', code: "gear = Actor('gear', pos=(400, 300))\n\ndef update():\n    gear.angle += 3  # 每帧转3度\n    \n    if player.colliderect(gear):\n        player.hurt()", output: '齿轮旋转，碰到受伤', explanation: 'angle属性控制旋转角度。' },
      practice: [{ question: '齿轮如何旋转？', answer: '改变angle属性' }, { question: '碰到齿轮会怎样？', answer: '受伤或游戏结束' }]
    },
    medium: {
      story: '齿轮可以移动！左右移动或上下移动，增加躲避难度！',
      concept: '移动齿轮：齿轮沿固定路径移动，形成移动障碍。需要判断路径和速度。',
      syntax: "# 移动齿轮\ngear_vx = 3\n\ndef update():\n    global gear_vx\n    gear.x += gear_vx\n    gear.angle += 5\n    \n    # 边界反弹\n    if gear.left < 0 or gear.right > WIDTH:\n        gear_vx = -gear_vx",
      example: { title: '移动齿轮', code: "gear_x_speed = 3\n\ndef update():\n    global gear_x_speed\n    gear.x += gear_x_speed\n    gear.angle += 5\n    \n    if gear.left < 100:\n        gear_x_speed = 3\n    if gear.right > 700:\n        gear_x_speed = -3", output: '齿轮左右移动旋转', explanation: 'x坐标改变实现移动。' },
      practice: [{ question: '齿轮怎么移动？', answer: '改变x或y坐标' }, { question: '边界反弹怎么实现？', answer: '速度取反' }]
    },
    hard: {
      story: '多个齿轮组成机关！齿轮阵列、齿轮通道、组合障碍！',
      concept: '多齿轮系统：用列表管理多个齿轮，每个齿轮有独立的移动轨迹。',
      syntax: "# 多齿轮系统\ngears = []\n\nfor i in range(5):\n    g = Actor('gear')\n    g.x = 100 + i * 150\n    g.y = 300\n    g.speed = random.choice([-3, 3])\n    gears.append(g)\n\ndef update():\n    for g in gears:\n        g.x += g.speed\n        g.angle += 5\n        \n        if g.left < 0 or g.right > WIDTH:\n            g.speed = -g.speed",
      example: { title: '齿轮阵列', code: "gears = []\n\nfor i in range(3):\n    g = Actor('gear', pos=(200 + i * 200, 300))\n    g.speed = 2 + i\n    gears.append(g)\n\ndef update():\n    for g in gears:\n        g.y = 300 + math.sin(g.angle * 0.02) * 100\n        g.angle += g.speed", output: '齿轮上下波动', explanation: '用sin函数实现波动。' },
      practice: [{ question: '多个齿轮怎么管理？', answer: '用列表' }, { question: '波动效果怎么实现？', answer: '用sin函数' }]
    }
  },
  {
    id: 'kp-3', title: '门与通关', emoji: '🚪', gradeLevel: '3-4', summary: '设计通关门和胜利条件',
    easy: {
      story: '到达门口就过关！门是通关的标志，碰到门触发胜利！',
      concept: '门是关卡终点。角色碰到门且满足条件时，关卡完成。',
      syntax: "# 通关检测\nif player.colliderect(door):\n    print('恭喜过关！')\n    level_complete()",
      example: { title: '简单通关', code: "def update():\n    if player.colliderect(door):\n        screen.draw.text('过关！', (350, 300))", output: '碰到门显示过关', explanation: '碰撞触发胜利。' },
      practice: [{ question: '门的作用？', answer: '标记终点' }, { question: '碰到门会怎样？', answer: '触发过关' }]
    },
    medium: {
      story: '有时需要收集钥匙才能开门！钥匙在关卡某处，找到才能过关！',
      concept: '条件通关：需要满足条件（收集钥匙、消灭敌人、收集金币）才能开门。',
      syntax: "# 条件通关\nhas_key = False\n\ndef update():\n    # 收集钥匙\n    if player.colliderect(key):\n        has_key = True\n        key.hide()\n    \n    # 有钥匙才能开门\n    if player.colliderect(door) and has_key:\n        level_complete()",
      example: { title: '钥匙开门', code: "has_key = False\n\ndef update():\n    global has_key\n    \n    if player.colliderect(key) and not has_key:\n        has_key = True\n        key.image = 'key_collected'\n    \n    if player.colliderect(door):\n        if has_key:\n            print('过关！')\n        else:\n            print('需要钥匙！')", output: '有钥匙才能过关', explanation: '条件判断控制通关。' },
      practice: [{ question: '没有钥匙会怎样？', answer: '无法过关' }, { question: '怎么记录有没有钥匙？', answer: '布尔变量' }]
    },
    hard: {
      story: '多条件通关！收集所有金币、消灭所有敌人、找到钥匙，然后才能过关！',
      concept: '复合条件：多个条件必须同时满足。用and连接多个条件。',
      syntax: "# 多条件通关\nall_coins_collected = len(coins) == 0\nall_enemies_defeated = len(enemies) == 0\nhas_key = key_collected\n\nif player.colliderect(door):\n    if all_coins_collected and all_enemies_defeated and has_key:\n        level_complete()\n    else:\n        show_message('还有任务未完成！')",
      example: { title: '多条件', code: "def update():\n    if player.colliderect(door):\n        if len(coins) == 0 and len(enemies) == 0:\n            print('完美通关！')\n        elif len(coins) == 0:\n            print('还有敌人！')\n        else:\n            print('还有金币！')", output: '检查所有条件', explanation: '多条件and连接。' },
      practice: [{ question: '多条件用什么连接？', answer: 'and' }, { question: '金币收集完怎么判断？', answer: 'len(coins) == 0' }]
    }
  }
]

export const exercises = [
  { id: 'ex-1', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '子弹创建', question: '子弹应该创建在哪里？', options: ['屏幕中央', '角色位置', '屏幕顶部', '随机位置'], answer: 1, explanation: '子弹从角色位置发射。', hint: '从玩家射出' },
  { id: 'ex-2', level: 'easy', levelLabel: '基础', levelEmoji: '🟢', type: 'multiple-choice', mathConcept: '碰撞检测', question: '子弹击中目标用什么检测？', options: ['colliderect()', 'distance()', 'hit()', 'touch()'], answer: 0, explanation: 'colliderect()检测碰撞。', hint: '角色碰撞方法' },
  { id: 'ex-3', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '遍历删除', question: '为什么用bullets[:]遍历？', options: ['更快', '节省内存', '安全删除', '代码简洁'], answer: 2, explanation: '副本遍历，可以安全删除元素。', hint: '遍历时删除会出错' },
  { id: 'ex-4', level: 'medium', levelLabel: '进阶', levelEmoji: '🟡', type: 'multiple-choice', mathConcept: '射击冷却', question: '射击冷却的作用？', options: ['让游戏更难', '控制射击频率', '让代码更短', '增加子弹'], answer: 1, explanation: '冷却防止连续射击太频繁。', hint: '频率控制' },
  { id: 'ex-5', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '子弹管理', question: '如何限制屏幕上的子弹数量？', options: ['不需要限制', 'if len(bullets) < max:', '用计时器', '用变量'], answer: 1, explanation: '判断当前子弹数是否小于最大值。', hint: '列表长度判断' },
  { id: 'ex-6', level: 'hard', levelLabel: '挑战', levelEmoji: '🔴', type: 'multiple-choice', mathConcept: '效果设计', question: '击中后应该做什么？', options: ['什么都不做', '删除子弹和目标，可能加效果', '只删除子弹', '只删除目标'], answer: 1, explanation: '删除双方，可以加爆炸效果和分数。', hint: '完整处理' }
]

export const lessonMeta = {
  id: 'L18-3', title: '射击游戏设计', subtitle: '学会射击和碰撞系统', difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: ['掌握射击系统实现', '学会碰撞检测删除', '能设计子弹管理'],
  prerequisites: ['Pygame Zero角色', '列表操作', '碰撞检测']
}

export const typingWords = {
  easy: ['shoot', 'ball', 'door', 'gear'],
  medium: ['bullet', 'target', 'collide', 'remove'],
  hard: ['cooldown', 'explode', 'upgrade', 'limited']
}

export const typingTemplates = {
  easy: ['b = Actor("bullet")', 'b.pos = player.pos', 'bullets.append(b)', 'b.y -= 10'],
  medium: ['if b.colliderect(t):\n    bullets.remove(b)', 'for b in bullets[:]:\n    b.y -= 8'],
  hard: ['if len(bullets) < max_bullets:\n    shoot()', 'if cooldown > 0:\n    cooldown -= 1']
}

export const L18_3_data = { meta: lessonMeta, vocab: vocabData, knowledgePoints, exercises, typingWords, typingTemplates }
export default L18_3_data
