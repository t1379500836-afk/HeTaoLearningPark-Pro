/**
 * PY3 课程 L15-4: 人脸识别进阶
 *
 * 核心知识点:
 * 1. 记录与检测人脸信息
 * 2. 拍照与照片管理
 * 3. 权限判断与门禁升级
 */

// 单词卡数据 - 拓展词汇（无OCR单词）
export const vocabData = [
  {
    word: 'record',
    pronunciation: "[ri'ko:rd]",
    partOfSpeech: 'v./n.',
    meaning: '记录；录音；录制',
    level: 'easy',
    example: 'Record the face information.',
    exampleTranslation: '记录人脸信息。',
    note: 'recordFace()记录人脸'
  },
  {
    word: 'photo',
    pronunciation: "['foutou]",
    partOfSpeech: 'n.',
    meaning: '照片；相片',
    level: 'easy',
    example: 'Take a photo.',
    exampleTranslation: '拍一张照片。',
    note: 'takePhoto()拍照'
  },
  {
    word: 'mark',
    pronunciation: '[ma:rk]',
    partOfSpeech: 'v./n.',
    meaning: '标记；做记号；分数',
    level: 'medium',
    example: 'Mark the face with a frame.',
    exampleTranslation: '用框标记人脸。',
    note: 'markFace()标记人脸'
  },
  {
    word: 'list',
    pronunciation: '[list]',
    partOfSpeech: 'n./v.',
    meaning: '列表；清单；列出',
    level: 'medium',
    example: 'Get the face list.',
    exampleTranslation: '获取人脸列表。',
    note: 'getFaceList()获取人脸信息'
  },
  {
    word: 'permission',
    pronunciation: "[par'mijan]",
    partOfSpeech: 'n.',
    meaning: '许可；权限；允许',
    level: 'hard',
    example: 'Check the permission.',
    exampleTranslation: '检查权限。',
    note: ''
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '记录与检测人脸信息',
    emoji: '📝',
    gradeLevel: '3-4',
    summary: 'recordFace记录人脸，getFaceList获取信息',

    easy: {
      story: '想让人脸门禁认识你？需要先记录你的人脸信息！recordFace()就是"录入人脸"的功能！',
      concept: 'recordFace()函数记录当前检测到的人脸信息。记录后，系统就能"记住"这张脸，用于后续的身份验证。',
      syntax: "# 记录人脸\nif isFace():\n    recordFace()  # 记录当前人脸\n    print('人脸已记录！')",
      example: {
        title: '记录人脸',
        code: "def on_key_down(key):\n    if key == keys.R:  # 按R键记录\n        if isFace():\n            recordFace()\n            print('人脸已记录！')\n        else:\n            print('请先对着摄像头')",
        output: '按R键记录当前人脸',
        explanation: 'recordFace()记录人脸信息到系统中。'
      },
      practice: [
        {
          question: 'recordFace()的作用是什么？',
          answer: '记录当前检测到的人脸信息'
        },
        {
          question: '记录人脸前需要先检测到人脸吗？',
          answer: '是的，用isFace()检测'
        }
      ]
    },

    medium: {
      story: 'markFace()不仅能检测人脸，还能同时画框！它结合了isFace()和drawFrame()的功能！',
      concept: 'markFace()函数检测人脸并在周围画框，相当于isFace()检测 + drawFrame()画框的组合。返回检测结果。',
      syntax: "# 标记人脸（检测+画框）\nif markFace():\n    print('检测到人脸并画框')\n\n# 等价于：\nif isFace():\n    drawFrame()",
      example: {
        title: '标记人脸',
        code: "def update():\n    # markFace = 检测 + 画框\n    if markFace():\n        print('人脸已标记')\n    else:\n        print('未检测到人脸')",
        output: '检测到人脸时自动画框',
        explanation: 'markFace()同时完成检测和标记两个功能。'
      },
      practice: [
        {
          question: 'markFace()等价于哪两个函数组合？',
          answer: 'isFace() + drawFrame()'
        },
        {
          question: 'markFace()返回什么？',
          answer: '布尔值（是否检测到人脸）'
        }
      ]
    },

    hard: {
      story: 'getFaceList()可以获取画面中所有人脸的信息！有多个人时，返回多个人的数据列表！',
      concept: 'getFaceList()返回一个列表，包含画面中所有人脸的信息。每个人脸有位置、大小等属性。可以用于多人检测。',
      syntax: "# 获取人脸列表\nface_list = getFaceList()\n\n# 检查人数\nnum_faces = len(face_list)\nprint(f'检测到{num_faces}个人')\n\n# 遍历每个人脸\nfor face in face_list:\n    print(face)  # 每个人脸的信息",
      example: {
        title: '获取人脸信息',
        code: "def update():\n    face_list = getFaceList()\n    \n    if len(face_list) > 0:\n        print(f'检测到{len(face_list)}个人')\n        \n        # 获取第一个人的信息\n        first_face = face_list[0]\n        print(f'位置: {first_face}')\n    else:\n        print('没有人脸')",
        output: '显示检测到的人数和人脸信息',
        explanation: 'getFaceList()返回所有人脸的列表。'
      },
      practice: [
        {
          question: 'getFaceList()返回什么类型？',
          answer: '列表（包含所有人脸信息）'
        },
        {
          question: 'len(getFaceList())表示什么？',
          answer: '检测到的人数'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '拍照与照片管理',
    emoji: '📸',
    gradeLevel: '3-4',
    summary: 'takePhoto拍照，showPhoto显示照片',

    easy: {
      story: '门禁系统需要拍照留存！takePhoto()就像按下相机快门，拍下当前画面！',
      concept: 'takePhoto()函数拍摄当前摄像头画面，保存为照片。可以用于访客记录、安全监控等场景。',
      syntax: "# 拍照\ntakePhoto()  # 拍摄当前画面\nprint('照片已保存！')",
      example: {
        title: '拍照功能',
        code: "def on_key_down(key):\n    if key == keys.SPACE:  # 按空格拍照\n        takePhoto()\n        print('咔嚓！照片已保存')",
        output: '按空格键拍摄照片',
        explanation: 'takePhoto()拍摄并保存当前画面。'
      },
      practice: [
        {
          question: 'takePhoto()的作用是什么？',
          answer: '拍摄当前摄像头画面'
        },
        {
          question: '拍的照片保存在哪里？',
          answer: '由系统自动保存'
        }
      ]
    },

    medium: {
      story: 'showPhoto()可以查看拍摄的照片！还可以用nextPhoto()切换照片，exitPhoto()退出查看！',
      concept: 'showPhoto()显示最近拍摄的照片。nextPhoto()切换到下一张，exitPhoto()退出照片查看模式回到摄像头画面。',
      syntax: "# 照片管理\ntakePhoto()     # 拍照\nshowPhoto()     # 显示照片\nnextPhoto()     # 下一张\nexitPhoto()     # 退出照片模式",
      example: {
        title: '照片查看',
        code: "def on_key_down(key):\n    if key == keys.SPACE:\n        takePhoto()  # 拍照\n    elif key == keys.V:\n        showPhoto()  # 查看照片\n    elif key == keys.RIGHT:\n        nextPhoto()  # 下一张\n    elif key == keys.ESCAPE:\n        exitPhoto()  # 退出查看",
        output: '用键盘控制拍照和查看照片',
        explanation: '不同按键控制不同的照片操作。'
      },
      practice: [
        {
          question: 'showPhoto()的作用是什么？',
          answer: '显示拍摄的照片'
        },
        {
          question: '如何切换到下一张照片？',
          answer: '调用nextPhoto()'
        }
      ]
    },

    hard: {
      story: '完整的访客系统！检测到人脸 -> 拍照记录 -> 显示欢迎信息 -> 保存访问日志！',
      concept: '拍照功能可以与门禁系统结合：检测到访客时自动拍照，记录访问时间，生成访问日志。',
      syntax: "# 访客记录系统\nimport time\n\ndef log_visitor():\n    takePhoto()  # 拍照\n    timestamp = time.time()\n    # 记录日志\n    print(f'访客记录: {timestamp}')",
      example: {
        title: '访客拍照记录',
        code: "import time\n\nvisitor_count = 0\nlast_photo_time = 0\n\ndef update():\n    global visitor_count, last_photo_time\n    \n    if isFace():\n        current_time = time.time()\n        \n        # 距离上次拍照超过5秒\n        if current_time - last_photo_time > 5:\n            takePhoto()\n            visitor_count += 1\n            last_photo_time = current_time\n            print(f'访客#{visitor_count}已记录')\n        \n        drawFrame()",
        output: '检测到访客5秒后自动拍照记录',
        explanation: '用时间间隔控制拍照频率，避免重复拍照。'
      },
      practice: [
        {
          question: '为什么要控制拍照间隔？',
          answer: '避免同一个人被重复拍照'
        },
        {
          question: '访客记录应该包含什么信息？',
          answer: '照片、时间、可能的身份信息'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '权限判断与门禁升级',
    emoji: '🔐',
    gradeLevel: '3-4',
    summary: '判断人脸权限，实现安全门禁',

    easy: {
      story: '门禁系统需要判断"这个人能不能进入"！检查人脸是否在已注册列表中，有权限就开门！',
      concept: '权限判断的核心：检查当前人脸是否在已注册的人脸数据库中。如果存在，说明有权限；否则拒绝访问。',
      syntax: "# 权限判断\nface_list = getFaceList()\n\nif len(face_list) > 0:\n    # 有人脸，检查权限\n    if has_permission():\n        open_door()\n    else:\n        deny_access()",
      example: {
        title: '简单权限判断',
        code: "def check_access():\n    if isFace():\n        # 这里应该检查人脸是否已注册\n        # 简化版：检测到人脸就允许\n        return True\n    return False\n\ndef update():\n    if check_access():\n        showPic('access_granted')\n    else:\n        showPic('access_denied')",
        output: '检测到人脸时允许访问',
        explanation: '权限判断是门禁的核心功能。'
      },
      practice: [
        {
          question: '权限判断需要检查什么？',
          answer: '人脸是否在已注册列表中'
        },
        {
          question: '没有权限应该怎么做？',
          answer: '拒绝访问，显示提示'
        }
      ]
    },

    medium: {
      story: '用列表长度判断是否有权限！如果getFaceList()返回的列表长度大于0，说明检测到了已注册的人脸！',
      concept: '在核桃编程的AI模块中，getFaceList()返回的是已注册人脸的检测结果。len() > 0表示检测到有权限的人。',
      syntax: "# 用len()判断权限\nface_list = getFaceList()\n\nif len(face_list) > 0:\n    print('有权限！')\n    open_door()\nelse:\n    print('无权限！')\n    deny_access()",
      example: {
        title: '列表长度判断',
        code: "def update():\n    face_list = getFaceList()\n    \n    if len(face_list) > 0:\n        # 检测到已注册的人脸\n        showPic('welcome_back')\n        playSound('access_granted')\n        markFace()  # 标记人脸\n    else:\n        # 未检测到或有权限\n        if isFace():\n            showPic('not_registered')\n        else:\n            showPic('scan')",
        output: '根据人脸权限显示不同信息',
        explanation: 'len(getFaceList())判断是否检测到有权限的人脸。'
      },
      practice: [
        {
          question: 'len(getFaceList()) > 0 表示什么？',
          answer: '检测到有权限的人脸'
        },
        {
          question: 'isFace()为True但len(getFaceList())为0说明什么？',
          answer: '检测到人脸但未注册'
        }
      ]
    },

    hard: {
      story: '完整的门禁升级系统！包括：人脸注册、权限验证、访问日志、多重安全检查！',
      concept: '企业级门禁系统：1.人脸注册功能 2.实时权限验证 3.访问日志记录 4.异常报警 5.多因素认证。',
      syntax: "# 完整门禁系统\nregistered = []  # 已注册用户\naccess_log = []  # 访问日志\n\ndef register_face(name):\n    if isFace():\n        recordFace()\n        registered.append(name)\n        print(f'{name} 已注册')\n\ndef check_access():\n    face_list = getFaceList()\n    return len(face_list) > 0\n\ndef log_access(granted):\n    log = {\n        'time': time.time(),\n        'granted': granted\n    }\n    access_log.append(log)",
      example: {
        title: '完整门禁系统',
        code: "import time\n\nstate = 'scanning'\nlast_check = 0\n\ndef update():\n    global state, last_check\n    \n    if state == 'scanning':\n        if isFace():\n            state = 'checking'\n            last_check = time.time()\n    \n    elif state == 'checking':\n        face_list = getFaceList()\n        \n        if time.time() - last_check > 1:  # 检查1秒\n            if len(face_list) > 0:\n                state = 'granted'\n                takePhoto()  # 拍照记录\n                playSound('access_granted')\n            else:\n                state = 'denied'\n                playSound('access_denied')\n    \n    elif state == 'granted':\n        showPic('welcome')\n    \n    elif state == 'denied':\n        showPic('denied')",
        output: '完整的扫描-检查-判断流程',
        explanation: '用状态机实现完整的门禁流程控制。'
      },
      practice: [
        {
          question: '企业级门禁需要哪些功能？',
          answer: '人脸注册、权限验证、日志记录、异常报警'
        },
        {
          question: '为什么要用状态机？',
          answer: '清晰控制门禁的各个阶段'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  // 🟢 基础题
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '函数功能',
    question: 'recordFace()的作用是什么？',
    options: [
      '删除人脸记录',
      '记录人脸信息',
      '检测人脸',
      '画人脸框'
    ],
    answer: 1,
    explanation: 'recordFace()记录当前检测到的人脸信息到系统中。',
    hint: 'record是"记录"的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '拍照函数',
    question: 'takePhoto()的作用是什么？',
    options: [
      '显示照片',
      '删除照片',
      '拍摄照片',
      '切换照片'
    ],
    answer: 2,
    explanation: 'takePhoto()拍摄当前摄像头画面并保存。',
    hint: 'take photo = 拍照片'
  },

  // 🟡 进阶题
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '函数组合',
    question: 'markFace()等价于哪两个函数的组合？',
    options: [
      'takePhoto() + showPhoto()',
      'isFace() + drawFrame()',
      'recordFace() + getFaceList()',
      'showPic() + playSound()'
    ],
    answer: 1,
    explanation: 'markFace()检测人脸并画框，等价于isFace()检测 + drawFrame()画框。',
    hint: 'mark = 检测 + 标记'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '权限判断',
    question: 'len(getFaceList()) > 0 表示什么？',
    options: [
      '摄像头正常工作',
      '检测到有权限的人脸',
      '画面很亮',
      '人脸很大'
    ],
    answer: 1,
    explanation: 'getFaceList()返回已注册人脸的检测结果，长度大于0说明检测到了有权限的人。',
    hint: 'getFaceList返回的是已注册人脸'
  },

  // 🔴 挑战题
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '照片管理',
    question: '以下照片操作函数的顺序哪个是正确的？',
    options: [
      'showPhoto() -> takePhoto() -> exitPhoto()',
      'takePhoto() -> showPhoto() -> exitPhoto()',
      'exitPhoto() -> takePhoto() -> showPhoto()',
      'showPhoto() -> exitPhoto() -> takePhoto()'
    ],
    answer: 1,
    explanation: '正确顺序：先拍照takePhoto()，然后查看showPhoto()，最后退出exitPhoto()。',
    hint: '先拍照才能看，看完要退出'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '综合应用',
    question: 'isFace()返回True但len(getFaceList())为0，说明什么？',
    options: [
      '系统出错了',
      '检测到人脸但未注册',
      '没有人脸',
      '有多个人脸'
    ],
    answer: 1,
    explanation: 'isFace()检测到画面中有人脸，但getFaceList()返回空列表，说明这个人没有注册过。',
    hint: '有人但不认识'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L15-4',
  title: '人脸识别进阶',
  subtitle: '学会人脸记录和权限判断',
  difficulty: '进阶',
  estimatedTime: '30-45分钟',
  learningGoals: [
    '掌握recordFace和getFaceList的使用',
    '学会拍照和照片管理功能',
    '能实现权限判断逻辑',
    '能完成门禁系统升级'
  ],
  prerequisites: [
    'L15-2 人脸检测基础',
    'L15-3 门禁系统逻辑',
    '列表和条件判断'
  ]
}

// 打字练习单词（按难度分组，纯英文）
export const typingWords = {
  easy: ['photo', 'record', 'take', 'mark'],
  medium: ['camera', 'register', 'access', 'check', 'list'],
  hard: ['permission', 'captured', 'identity', 'verified']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'recordFace()',
    'takePhoto()',
    'showPhoto()',
    'exitPhoto()'
  ],
  medium: [
    'if markFace():\n    print("face detected")',
    'face_list = getFaceList()\nif len(face_list) > 0:',
    'if isFace():\n    recordFace()\n    print("registered")',
    'nextPhoto()  # next photo'
  ],
  hard: [
    'def check_permission():\n    face_list = getFaceList()\n    return len(face_list) > 0',
    'if state == "scanning":\n    if isFace():\n        state = "checking"\nelif state == "checking":\n    if len(getFaceList()) > 0:\n        state = "granted"'
  ]
}

// 导出所有数据
export const L15_4_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L15_4_data
