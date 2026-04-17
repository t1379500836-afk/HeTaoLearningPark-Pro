/**
 * PY1 课程 L4-2: 智能门铃和语音留言
 *
 * 核心知识点:
 * 1. playSound() - 播放音效
 * 2. isPressed() 和 isTouched() - 检测按钮和触摸
 * 3. print() 和 printPos() - 屏幕打印
 * 4. record() 和 playRecord() - 录音与播放
 */

// 单词卡数据 - OCR 提取 + 拓展词汇
export const vocabData = [
  // OCR 提取的单词
  {
    word: 'show',
    pronunciation: '[ʃəʊ]',
    partOfSpeech: 'v.',
    meaning: '展示；显示；演出；放映',
    level: 'easy',
    example: 'Show me your homework.',
    exampleTranslation: '给我看你的作业。',
    note: 'show and tell 展示与分享',
    source: 'ocr'
  },
  {
    word: 'sound',
    pronunciation: '[saʊnd]',
    partOfSpeech: 'n./v.',
    meaning: '声音；响声；听起来；似乎',
    level: 'easy',
    example: 'The bell sounds nice.',
    exampleTranslation: '这个铃声听起来很好听。',
    note: 'sound effect 音效',
    source: 'ocr'
  },
  {
    word: 'play',
    pronunciation: '[pleɪ]',
    partOfSpeech: 'v./n.',
    meaning: '玩；播放；演奏；游戏；比赛',
    level: 'easy',
    example: 'Play the music.',
    exampleTranslation: '播放音乐。',
    note: 'play button 播放按钮',
    source: 'ocr'
  },
  {
    word: 'record',
    pronunciation: '[rɪˈkɔːd]',
    partOfSpeech: 'v./n.',
    meaning: '录制；录音；记录；唱片',
    level: 'medium',
    example: 'Press the button to record.',
    exampleTranslation: '按下按钮来录制。',
    note: '作动词时读[rɪˈkɔːd]，作名词时读[ˈrekɔːd]',
    source: 'ocr'
  },
  // 拓展单词
  {
    word: 'press',
    pronunciation: '[pres]',
    partOfSpeech: 'v.',
    meaning: '按；压；敦促',
    level: 'medium',
    example: 'Press the button.',
    exampleTranslation: '按下按钮。',
    note: 'press conference 新闻发布会',
    source: 'extended'
  },
  {
    word: 'button',
    pronunciation: "['bʌtn]",
    partOfSpeech: 'n.',
    meaning: '按钮；纽扣',
    level: 'hard',
    example: 'Click the button.',
    exampleTranslation: '点击按钮。',
    note: 'push button 按钮开关',
    source: 'extended'
  }
]

// 知识点数据
export const knowledgePoints = [
  {
    id: 'kp-1',
    title: '播放声音 - playSound()',
    emoji: '🔊',
    gradeLevel: '1-2',
    summary: '播放指定名称的音效文件',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个智能门铃！当客人来时，它会播放"叮咚"的声音。playSound()命令就像这个门铃，你可以让它播放各种有趣的声音！',
      concept: 'playSound()是一个播放音效的函数。括号中填写音效的名称（字符串），程序就会播放对应的声音文件。这常用于制作音效、背景音乐、提示音等。',
      syntax: 'playSound("音效名称")',
      example: {
        title: '播放门铃声',
        code: 'playSound("dingdong")\nprint("有客人来了！")',
        output: '（播放dingdong音效）\n有客人来了！',
        explanation: 'playSound("dingdong")会播放名为"dingdong"的音效文件，然后打印提示信息。'
      },
      practice: [
        {
          question: 'playSound()括号里填什么？',
          answer: '音效的名称（字符串）'
        },
        {
          question: 'playSound("hello")会做什么？',
          answer: '播放名为"hello"的音效'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '音效进阶！你可以把不同的音效用在不同的场景中：按键音、成功音、失败音、背景音乐...通过组合多个音效，可以制作出丰富的多媒体效果！',
      concept: 'playSound()是异步函数（不阻塞程序继续执行）。常用的音效类型：①提示音（beep、ding）②音乐（melody、song）③音效（click、pop）④语音（hello、welcome）。',
      syntax: '# 播放单个音效\nplaySound("ding")\n\n# 播放多个音效\nplaySound("hello")\nplaySound("welcome")\n\n# 配合事件\nif 条件:\n    playSound("alert")',
      example: {
        title: '门铃系统',
        code: 'while True:\n    if isPressed("doorbell"):\n        playSound("dingdong")\n        print("欢迎光临！")',
        output: '（当按下门铃按钮时）\n（播放dingdong音效）\n欢迎光临！',
        explanation: '程序持续检测门铃按钮，当被按下时播放"叮咚"声并打印欢迎信息。'
      },
      practice: [
        {
          question: 'playSound()是同步还是异步函数？',
          answer: '异步函数（不会阻塞程序继续执行）'
        },
        {
          question: '如何播放多个音效？',
          answer: '写多行playSound()命令，每个播放一个音效'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '音效大师模式！你可以用playSound()制作音乐游戏、语音助手、交互式故事...通过精心设计音效的时机和组合，让程序变得生动有趣！',
      concept: 'playSound()的高级应用：①游戏音效系统（背景音乐+事件音效）②语音反馈（播报结果、提示信息）③节奏游戏（根据音乐按键）④语音交互（问答系统）。音效文件通常放在项目的sounds目录。',
      syntax: '# 音效系统模式\nsounds = {\n    "start": "intro.mp3",\n    "win": "victory.wav",\n    "lose": "fail.wav"\n}\n\n# 条件音效\nif score > 100:\n    playSound("win")\nelse:\n    playSound("lose")\n\n# 循环音效\nwhile True:\n    playSound("tick")\n    sleep(1)',
      example: {
        title: '音乐节奏游戏',
        code: 'import time\n\nwhile True:\n    for note in ["do", "re", "mi", "fa", "sol"]:\n        playSound(note)\n        time.sleep(0.5)\n        if isPressed("stop"):\n            break',
        output: '（依次播放do re mi fa sol音效）',
        explanation: '这个程序依次播放音阶，每个音效间隔0.5秒。按下stop按钮会中断播放。'
      },
      practice: [
        {
          question: '如何实现条件音效？',
          answer: '用if语句判断条件，根据不同情况播放不同音效'
        },
        {
          question: '音效文件通常放在什么目录？',
          answer: '项目的sounds或audio目录'
        }
      ]
    }
  },

  {
    id: 'kp-2',
    title: '检测输入 - isPressed()和isTouched()',
    emoji: '👆',
    gradeLevel: '1-2',
    summary: '检测按钮是否被按下或触摸传感器是否被触发',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象智能门铃有一个按钮！当有人按按钮时，门铃就知道"有人来了"。isPressed()就像这个按钮的探测器，它会告诉你"按钮被按下了（True）"或"没被按（False）"。',
      concept: 'isPressed()是一个检测按钮状态的函数，返回布尔值（True或False）。括号中填写按钮的名称，如果按钮被按下返回True，否则返回False。常用于制作交互式程序。',
      syntax: 'isPressed("按钮名称")  # 返回True或False',
      example: {
        title: '检测按钮',
        code: 'if isPressed("buttonA"):\n    print("按钮A被按下了！")\nelse:\n    print("按钮A没被按")',
        output: '按钮A被按下了！  # 当按钮被按下时\n按钮A没被按      # 当按钮没被按时',
        explanation: 'isPressed("buttonA")检测buttonA是否被按下，返回True则执行if后的代码。'
      },
      practice: [
        {
          question: 'isPressed()返回什么类型的数据？',
          answer: '布尔值（True或False）'
        },
        {
          question: 'isPressed("ok")为True表示什么？',
          answer: '名为"ok"的按钮被按下了'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '检测进阶！除了按钮，还有触摸传感器！isTouched()可以检测触摸板是否被触摸。你可以用它们制作各种交互设备：触摸灯、智能开关、游戏控制器...',
      concept: 'isPressed()检测物理按钮，isTouched()检测触摸传感器。两者都返回布尔值。配合if语句和while循环，可以实现持续检测和响应输入。',
      syntax: '# 检测按钮\nif isPressed("start"):\n    开始游戏\n\n# 检测触摸\nif isTouched("sensor1"):\n    打开灯光\n\n# 持续检测\nwhile True:\n    if isPressed("quit"):\n        break',
      example: {
        title: '触摸灯',
        code: 'while True:\n    if isTouched("touch_pad"):\n        print("灯亮了！")\n    else:\n        print("灯灭了")',
        output: '灯灭了  # 未触摸时\n灯亮了！  # 触摸时',
        explanation: '程序持续检测触摸板，被触摸时打印"灯亮了"，否则打印"灯灭了"。'
      },
      practice: [
        {
          question: 'isPressed()和isTouched()有什么区别？',
          answer: 'isPressed()检测物理按钮，isTouched()检测触摸传感器'
        },
        {
          question: '如何实现持续检测输入？',
          answer: '用while True循环配合if isPressed()/isTouched()'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '输入检测大师模式！你可以用多个传感器制作复杂的交互系统：密码锁（多个按钮组合）、手势识别（多个触摸点）、游戏控制器（方向键+动作键）...',
      concept: '高级输入检测模式：①多输入组合（检测多个按钮/传感器）②长按检测（持续按压）③双击检测（短时间内两次按下）④手势识别（触摸序列）。核心是用布尔运算组合多个输入。',
      syntax: '# 多按钮组合\nif isPressed("up") and isPressed("left"):\n    斜向移动\n\n# 密码检测\ncode = ""\nwhile True:\n    if isPressed("1"):\n        code = code + "1"\n    if isPressed("confirm"):\n        if code == "1234":\n            解锁()\n\n# 长按检测\nif isPressed("button"):\n    time.sleep(1)\n    if isPressed("button"):\n        长按触发',
      example: {
        title: '四位密码锁',
        code: 'password = ""\n\nwhile True:\n    if isPressed("btn1"):\n        password = password + "1"\n    if isPressed("btn2"):\n        password = password + "2"\n    if isPressed("ok"):\n        if password == "1221":\n            print("密码正确！")\n        else:\n            print("密码错误！")',
        output: '（输入密码1221后按ok）\n密码正确！',
        explanation: '每次按btn1加"1"，按btn2加"2"。按ok时检查密码是否为"1221"。'
      },
      practice: [
        {
          question: '如何实现密码输入？',
          answer: '用变量累积按键，最后与正确密码比较'
        },
        {
          question: '如何检测多个按钮同时被按下？',
          answer: '用and运算：isPressed("A") and isPressed("B")'
        }
      ]
    }
  },

  {
    id: 'kp-3',
    title: '屏幕打印 - print()和printPos()',
    emoji: '📺',
    gradeLevel: '1-2',
    summary: '在屏幕上显示文字信息',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一块魔法屏幕！你写什么，它就显示什么。print()命令就是这样，你让它打印"欢迎"，屏幕上就出现"欢迎"！',
      concept: 'print()函数可以在屏幕上显示文字。默认在屏幕左上角显示。你可以打印文字、数字、变量的值等。这是调试程序和显示信息最常用的方法。',
      syntax: 'print("要显示的文字")\nprint(变量名)',
      example: {
        title: '显示欢迎信息',
        code: 'print("欢迎回家！")\nprint("今日天气：晴")\n\nname = "小明"\nprint(name)',
        output: '欢迎回家！\n今日天气：晴\n小明',
        explanation: 'print()在屏幕上依次显示括号中的内容。文字用引号，变量直接写名字。'
      },
      practice: [
        {
          question: 'print()括号里可以放什么？',
          answer: '文字（用引号）、数字、变量等'
        },
        {
          question: 'print()默认在屏幕哪里显示？',
          answer: '屏幕左上角'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '打印进阶！如果你想在屏幕的特定位置显示文字，比如右下角显示时间，中间显示标题，就可以用printPos()！它可以改变打印的位置！',
      concept: 'print()在默认位置（左上角）打印，printPos()可以在指定位置打印。printPos()需要两个参数：x坐标（水平位置）和y坐标（垂直位置）。坐标从(0,0)开始，向右x增加，向下y增加。',
      syntax: '# 默认位置打印\nprint("左上角")\n\n# 指定位置打印\nprintPos(x, y, "文字")\nprintPos(10, 20, "中间")\nprintPos(100, 100, "右下角")',
      example: {
        title: '状态显示',
        code: 'printPos(0, 0, "===智能家居===")\nprintPos(0, 20, "温度: 25度")\nprintPos(0, 40, "湿度: 60%")\nprintPos(0, 60, "状态: 正常")',
        output: '===智能家居===\n温度: 25度\n湿度: 60%\n状态: 正常',
        explanation: 'printPos(x,y,text)在坐标(x,y)处打印文字。y坐标每行增加20像素，实现分行显示。'
      },
      practice: [
        {
          question: 'printPos()需要几个参数？',
          answer: '3个参数：x坐标、y坐标、要打印的文字'
        },
        {
          question: '坐标(0,0)在屏幕哪里？',
          answer: '屏幕左上角'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '打印大师模式！你可以用print()和printPos()制作仪表盘、记分牌、进度条、动态菜单...通过精心设计布局和动态更新，让界面清晰美观！',
      concept: '高级打印应用：①动态更新（用while循环刷新显示）②格式化输出（对齐、美化）③表格显示（行列对齐）④动画效果（位置变化）。配合清屏命令可以实现完全自定义的界面。',
      syntax: '# 动态更新\nwhile True:\n    printPos(0, 0, "时间: " + str(当前时间))\n    清屏并重新打印\n\n# 格式化输出\nprint(name + " " + score)\n\n# 进度条\nprogress = "=" * 完成百分比\nprint("[" + progress + "]")\n\n# 表格\nprint("姓名" + " " + "分数")\nfor student in students:\n    print(student.name + " " + student.score)',
      example: {
        title: '实时仪表盘',
        code: 'import time\n\nwhile True:\n    # 清屏\n    print("\\n" * 50)\n    \n    # 显示标题\n    printPos(0, 0, "===智能门铃===")\n    \n    # 显示状态\n    if isTouched("sensor"):\n        printPos(0, 20, "状态: 有人！")\n    else:\n        printPos(0, 20, "状态: 等待...")\n    \n    time.sleep(0.5)',
        output: '===智能门铃===\n状态: 有人！',
        explanation: '程序每0.5秒刷新一次显示，检测到触摸时显示"有人！"，否则显示"等待..."。'
      },
      practice: [
        {
          question: '如何实现动态更新显示？',
          answer: '用while循环定期清屏并重新打印'
        },
        {
          question: '如何让变量和文字拼接在一起输出？',
          answer: '用 + 号拼接，如 "分数: " + str(score)'
        }
      ]
    }
  },

  {
    id: 'kp-4',
    title: '录音与播放 - record()和playRecord()',
    emoji: '🎙️',
    gradeLevel: '1-2',
    summary: '录制声音并播放录制的声音',

    // 🟢 基础版（1-2年级）
    easy: {
      story: '想象你有一个留言机！你说的话会被录下来，然后可以再播放出来听。record()就像录音按钮，playRecord()就像播放按钮！',
      concept: 'record()函数开始录音，把声音保存起来。playRecord()函数播放刚才录制的声音。这可以用来制作语音留言、语音备忘录等。',
      syntax: '# 开始录音\nrecord()\n\n# 播放录音\nplayRecord()',
      example: {
        title: '语音留言',
        code: 'print("请留言...")\nrecord()\nprint("录音完成！")\nprint("播放留言...")\nplayRecord()',
        output: '请留言...\n（开始录音...）\n录音完成！\n播放留言...\n（播放录音）',
        explanation: 'record()开始录制声音，playRecord()播放刚才录制的内容。'
      },
      practice: [
        {
          question: 'record()的作用是什么？',
          answer: '开始录音，录制声音'
        },
        {
          question: 'playRecord()播放什么声音？',
          answer: '播放刚才用record()录制的声音'
        }
      ]
    },

    // 🟡 进阶版（3-4年级）
    medium: {
      story: '录音进阶！你可以把录音功能做成一个完整的语音留言系统：按按钮开始录音，再按按钮停止，然后自动播放留言！就像智能门铃的留言功能一样！',
      concept: '完整的语音留言流程：①等待用户触发②开始录音③录制指定时长或直到用户停止④保存录音⑤播放录音。常用于智能门铃、语音助手、录音笔等。',
      syntax: '# 语音留言模式\nwhile True:\n    if isPressed("record"):\n        print("开始录音...")\n        record()\n        sleep(5)  # 录5秒\n        print("播放录音...")\n        playRecord()',
      example: {
        title: '智能门铃留言',
        code: 'while True:\n    if isPressed("doorbell"):\n        playSound("dingdong")\n        print("请留言...")\n        record()\n        sleep(3)\n        print("留言已保存！")\n        playRecord()',
        output: '（按门铃后）\n（播放叮咚声）\n请留言...\n（录音3秒）\n留言已保存！\n（播放录音）',
        explanation: '按下门铃后播放叮咚声，提示留言，录制3秒，然后自动播放录音。'
      },
      practice: [
        {
          question: '如何控制录音时长？',
          answer: '用sleep()函数，如sleep(5)录5秒'
        },
        {
          question: '智能门铃的留言流程是什么？',
          answer: '检测门铃→播放铃声→提示留言→录音→播放录音'
        }
      ]
    },

    // 🔴 挑战版（5-6年级）
    hard: {
      story: '录音大师模式！你可以制作语音日记、声音备忘录、语音识别系统...甚至可以保存多段录音，按时间顺序播放，就像一个真正的录音机！',
      concept: '高级录音应用：①多段录音（用列表存储）②语音识别（转文字）③声音分析（音量、频率）④压缩存储（减小文件大小）。录音通常保存为WAV或MP3格式。',
      syntax: '# 多段录音\nrecordings = []\n\nwhile True:\n    if isPressed("rec"):\n        record()\n        recordings.append(最新录音)\n    if isPressed("play"):\n        for rec in recordings:\n            playRecord(rec)\n\n# 语音日记\nimport datetime\ndate = datetime.now()\nrecord("diary_" + str(date) + ".wav")',
      example: {
        title: '语音备忘录',
        code: 'memos = []  # 存储录音\n\nwhile True:\n    print("1.录音 2.播放 3.退出")\n    choice = input("选择:")\n    \n    if choice == "1":\n        print("录音中...")\n        record()\n        memos.append("录音")\n        print("已保存！")\n    elif choice == "2":\n        for memo in memos:\n            playRecord(memo)\n    elif choice == "3":\n        break',
        output: '1.录音 2.播放 3.退出\n选择:1\n录音中...\n已保存！\n选择:2\n（播放所有录音）',
        explanation: '程序可以录制多段备忘录并存储在列表中，选择播放时会依次播放所有录音。'
      },
      practice: [
        {
          question: '如何存储多段录音？',
          answer: '用列表存储，每次录音后append到列表'
        },
        {
          question: '录音通常保存为什么格式？',
          answer: 'WAV或MP3格式'
        }
      ]
    }
  }
]

// 习题数据
export const exercises = [
  // 🟢 基础题（1-2年级）
  {
    id: 'ex-1',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '函数基础',
    question: '下面哪个命令可以播放音效？\n\nA. print("ding")\nB. playSound("ding")\nC. showSound("ding")\nD. sound("ding")',
    options: [
      'A. print("ding")',
      'B. playSound("ding")',
      'C. showSound("ding")',
      'D. sound("ding")'
    ],
    answer: 1,
    explanation: 'playSound()是播放音效的命令，括号中填写音效名称。',
    hint: 'play是播放的意思'
  },
  {
    id: 'ex-2',
    level: 'easy',
    levelLabel: '基础',
    levelEmoji: '🟢',
    type: 'multiple-choice',
    mathConcept: '布尔值判断',
    question: 'isPressed("button")被按下时返回什么？\n\nA. "pressed"\nB. 1\nC. True\nD. False',
    options: [
      'A. "pressed"',
      'B. 1',
      'C. True',
      'D. False'
    ],
    answer: 2,
    explanation: 'isPressed()检测按钮是否被按下，被按下时返回True，没被按时返回False。',
    hint: '返回布尔值'
  },

  // 🟡 进阶题（3-4年级）
  {
    id: 'ex-3',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '函数参数',
    question: 'printPos(10, 20, "你好")会在什么位置打印？\n\nA. 坐标(10,10)\nB. 坐标(10,20)\nC. 坐标(20,10)\nD. 屏幕中心',
    options: [
      'A. 坐标(10,10)',
      'B. 坐标(10,20)',
      'C. 坐标(20,10)',
      'D. 屏幕中心'
    ],
    answer: 1,
    explanation: 'printPos(x, y, text)的第一个参数是x坐标，第二个是y坐标。所以是在(10,20)位置打印。\n\n数学知识：平面直角坐标系中(x,y)表示横坐标x、纵坐标y。',
    hint: '第一个数是x，第二个数是y'
  },
  {
    id: 'ex-4',
    level: 'medium',
    levelLabel: '进阶',
    levelEmoji: '🟡',
    type: 'multiple-choice',
    mathConcept: '程序逻辑',
    question: '执行下面的代码，会发生什么？\n\n```python\nwhile True:\n    if isPressed("quit"):\n        break\n    print("运行中...")\n```\n\nA. 只打印一次"运行中..."\nB. 无限打印"运行中..."\nC. 按quit后停止\nD. 程序报错',
    options: [
      'A. 只打印一次"运行中..."',
      'B. 无限打印"运行中..."',
      'C. 按quit后停止',
      'D. 程序报错'
    ],
    answer: 2,
    explanation: '程序进入while True无限循环，不断打印"运行中..."。当检测到quit按钮被按下时，break语句执行，循环退出。',
    hint: 'while True需要break才能退出'
  },

  // 🔴 挑战题（5-6年级）
  {
    id: 'ex-5',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '逻辑运算',
    question: '下面哪个条件检测"按钮A和按钮B同时被按下"？\n\nA. isPressed("A") or isPressed("B")\nB. isPressed("A") and isPressed("B")\nC. isPressed("A") + isPressed("B")\nD. isPressed("AB")',
    options: [
      'A. isPressed("A") or isPressed("B")',
      'B. isPressed("A") and isPressed("B")',
      'C. isPressed("A") + isPressed("B")',
      'D. isPressed("AB")'
    ],
    answer: 1,
    explanation: 'and运算要求两个条件都为True。isPressed("A") and isPressed("B")表示A和B都被按下。\n\n数学知识：逻辑与运算，A∧B表示A和B同时成立。',
    hint: 'and表示"并且"'
  },
  {
    id: 'ex-6',
    level: 'hard',
    levelLabel: '挑战',
    levelEmoji: '🔴',
    type: 'multiple-choice',
    mathConcept: '程序设计',
    question: '如何实现"按下按钮录音3秒，然后自动播放"？\n\nA. record() + sleep(3) + playRecord()\nB. playRecord() + record()\nC. record() + playRecord() + sleep(3)\nD. sleep(3) + record() + playRecord()',
    options: [
      'A. record() + sleep(3) + playRecord()',
      'B. playRecord() + record()',
      'C. record() + playRecord() + sleep(3)',
      'D. sleep(3) + record() + playRecord()'
    ],
    answer: 0,
    explanation: '正确顺序是：record()开始录音，sleep(3)等待3秒（录制3秒），playRecord()播放录音。',
    hint: '先录音，等3秒，再播放'
  }
]

// 课次元数据
export const lessonMeta = {
  id: 'L4-2',
  title: '智能门铃和语音留言',
  subtitle: '学会音效播放、输入检测和录音功能',
  difficulty: '入门',
  estimatedTime: '30-40分钟',
  learningGoals: [
    '掌握playSound()播放音效',
    '学会使用isPressed()和isTouched()检测输入',
    '理解print()和printPos()屏幕显示',
    '了解record()和playRecord()录音与播放'
  ],
  prerequisites: [
    'Python 基础语法',
    'while循环基础',
    'if条件判断',
    '布尔值概念'
  ]
}

// 打字练习单词（按难度分组）
export const typingWords = {
  easy: ['play', 'sound', 'show', 'touch'],
  medium: ['press', 'button', 'record', 'display'],
  hard: ['position', 'coordinate', 'interaction', 'microphone']
}

// 代码模板练习（按难度分组）
export const typingTemplates = {
  easy: [
    'playSound("ding")',
    'print("欢迎!")',
    'if isPressed("ok"):',
    'record()',
    'playRecord()',
    'printPos(0, 0, "标题")'
  ],
  medium: [
    'while True:\n    if isPressed("quit"):\n        break',
    'if isPressed("doorbell"):\n    playSound("dingdong")',
    'printPos(10, 20, "状态: 正常")',
    'record()\nsleep(3)\nplayRecord()',
    'if isTouched("sensor"):\n    print("触发!")',
    'print("温度: " + str(temp) + "度")'
  ],
  hard: [
    'while True:\n    if isPressed("A") and isPressed("B"):\n        print("组合触发!")',
    'for i in range(5):\n    playSound("note" + str(i))\n    sleep(0.5)',
    'printPos(0, 0, "===仪表盘===")\nprintPos(0, 20, "分数: " + str(score))',
    'memos = []\nwhile True:\n    if isPressed("rec"):\n        record()\n        memos.append("新录音")',
    'while True:\n    x, y = get_touch_position()\n    printPos(x, y, "触摸")',
    'import time\nwhile True:\n    print("\\n" * 50)\n    printPos(0, 0, "时间: " + str(time.now()))'
  ]
}

// 导出所有数据
export const L4_2_data = {
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}

export default L4_2_data
