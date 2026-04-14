#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PY3课程lesson-data.js生成脚本
根据content.json中的OCR内容自动生成lesson-data.js文件
"""

import json
from pathlib import Path

# 项目根目录
PROJECT_ROOT = Path(__file__).parent.parent
PY3_ROOT = PROJECT_ROOT / "src" / "data" / "courses" / "PY3"
CONTENT_FILE = PY3_ROOT / "content.json"
LESSONS_DIR = PY3_ROOT / "lessons"

# 课程元数据配置
LESSON_CONFIGS = {
    # L13单元 - Pygame框架与键盘监听
    "L13-1": {
        "title": "猴赛雷的新衣",
        "subtitle": "学会Pygame框架和键盘监听",
        "keywords": ["clothes", "update", "keyboard", "collide"],
        "concepts": ["Pygame框架", "键盘监听", "on_key_down", "keyboard模块"],
        "stories": ["末日地下城", "扫地机器人"],
        "mathConcepts": ["坐标系统", "位置计算", "逻辑判断"]
    },
    "L13-2": {
        "title": "飞机大战",
        "subtitle": "学会列表存储多角色和碰撞检测",
        "keywords": ["ship", "weapon"],
        "concepts": ["列表存储角色", "角色绘制移动", "碰撞检测", "按键控制"],
        "stories": ["奇怪的病患"],
        "mathConcepts": ["坐标", "列表遍历", "碰撞判断"]
    },
    "L13-3": {
        "title": "疯狂躲猫猫",
        "subtitle": "学会碰撞检测和全局变量",
        "keywords": ["begin", "point", "state", "global"],
        "concepts": ["collidepoint", "colliderect", "游戏状态", "全局变量"],
        "stories": ["变成猫啦"],
        "mathConcepts": ["追及问题", "位置判断"]
    },
    "L13-4": {
        "title": "木琴敲敲敲",
        "subtitle": "学会多角色创建和精准碰撞检测",
        "keywords": ["guess", "right", "choose", "state"],
        "concepts": ["多角色创建", "collidepoint", "全局变量", "状态控制"],
        "stories": ["我爱猜歌名"],
        "mathConcepts": ["循环变量", "逻辑推理"]
    },
    # L14单元 - 定时器与角色属性
    "L14-1": {
        "title": "火柴人的对决",
        "subtitle": "学会定时器和全局变量应用",
        "keywords": ["clock", "schedule", "ring", "sound"],
        "concepts": ["clock.schedule", "定时器", "全局变量", "游戏状态切换"],
        "stories": ["不速之客", "双人竞技场"],
        "mathConcepts": ["时间计算", "状态判断"]
    },
    "L14-2": {
        "title": "滚蛋吧病毒怪",
        "subtitle": "学会循环定时器和多角色创建",
        "keywords": ["germ", "interval"],
        "concepts": ["clock.schedule_interval", "多角色创建", "定时器对比"],
        "stories": ["盖世武侠"],
        "mathConcepts": ["间隔计算", "列表遍历"]
    },
    "L14-3": {
        "title": "云端探险家",
        "subtitle": "学会角色边界属性和随机应用",
        "keywords": ["brick", "top", "bottom"],
        "concepts": ["角色.left/right/top/bottom", "边界检测", "random应用"],
        "stories": ["师祖降临"],
        "mathConcepts": ["坐标边界", "随机数"]
    },
    "L14-4": {
        "title": "百发百中",
        "subtitle": "学会角度计算和三角函数",
        "keywords": ["angle", "shoot", "target", "bullet"],
        "concepts": ["角度计算", "math.atan2", "三角函数", "子弹发射"],
        "stories": ["神射手"],
        "mathConcepts": ["角度", "三角函数", "坐标转换"]
    },
    # L15单元 - 数据结构与算法
    "L15-1": {
        "title": "核桃村的宝藏",
        "subtitle": "学会字典基础和键值对操作",
        "keywords": ["dict", "key", "value", "map"],
        "concepts": ["字典创建", "键值对", "字典访问", "字典遍历"],
        "stories": ["寻宝之旅"],
        "mathConcepts": ["映射关系", "键值对应"]
    },
    "L15-2": {
        "title": "成绩管理器",
        "subtitle": "学会字典增删改查操作",
        "keywords": ["score", "record", "add", "delete"],
        "concepts": ["字典添加", "字典删除", "字典修改", "字典查询"],
        "stories": ["学生成绩系统"],
        "mathConcepts": ["数据统计", "平均值"]
    },
    "L15-3": {
        "title": "角色属性大作战",
        "subtitle": "学会字典存储复杂角色数据",
        "keywords": ["character", "attribute", "level", "exp"],
        "concepts": ["嵌套字典", "角色属性", "数据结构设计"],
        "stories": ["RPG游戏"],
        "mathConcepts": ["属性计算", "经验值系统"]
    },
    "L15-4": {
        "title": "核桃商城",
        "subtitle": "学会字典与列表的综合应用",
        "keywords": ["shop", "item", "price", "cart"],
        "concepts": ["商品管理", "购物车", "字典列表转换"],
        "stories": ["电子商务"],
        "mathConcepts": ["总价计算", "折扣计算"]
    },
    # L16单元 - 文件操作与数据持久化
    "L16-1": {
        "title": "日记本程序",
        "subtitle": "学会文件读写和编码处理",
        "keywords": ["file", "read", "write", "encode"],
        "concepts": ["文件打开", "文件读取", "文件写入", "编码处理"],
        "stories": ["秘密日记"],
        "mathConcepts": ["字节计算", "编码转换"]
    },
    "L16-2": {
        "title": "成绩单生成器",
        "subtitle": "学会CSV格式和数据处理",
        "keywords": ["csv", "data", "export", "format"],
        "concepts": ["CSV格式", "数据导出", "格式化输出"],
        "stories": ["成绩分析"],
        "mathConcepts": ["数据统计", "排序"]
    },
    "L16-3": {
        "title": "游戏存档系统",
        "subtitle": "学会JSON格式和数据保存",
        "keywords": ["json", "save", "load", "dump"],
        "concepts": ["JSON序列化", "json.dumps", "json.loads", "数据持久化"],
        "stories": ["存档读档"],
        "mathConcepts": ["数据结构", "序列化"]
    },
    "L16-4": {
        "title": "排行榜系统",
        "subtitle": "学会数据排序和文件存储",
        "keywords": ["rank", "sort", "score", "leaderboard"],
        "concepts": ["数据排序", "文件存储", "排行榜逻辑"],
        "stories": ["竞争排名"],
        "mathConcepts": ["排序算法", "比较"]
    },
    # L17单元 - 面向对象基础
    "L17-1": {
        "title": "角色创建工厂",
        "subtitle": "学会类定义和对象创建",
        "keywords": ["class", "object", "instance", "self"],
        "concepts": ["类定义", "__init__", "self", "对象创建"],
        "stories": ["角色工厂"],
        "mathConcepts": ["抽象思维", "类型概念"]
    },
    "L17-2": {
        "title": "角色属性与方法",
        "subtitle": "学会类属性和方法的定义",
        "keywords": ["attribute", "method", "property", "action"],
        "concepts": ["类属性", "实例属性", "类方法", "实例方法"],
        "stories": ["角色行为"],
        "mathConcepts": ["属性计算", "方法调用"]
    },
    "L17-3": {
        "title": "继承与多态",
        "subtitle": "学会类的继承和方法重写",
        "keywords": ["inherit", "extend", "override", "polymorphism"],
        "concepts": ["类继承", "super()", "方法重写", "多态"],
        "stories": ["角色家族"],
        "mathConcepts": ["层级关系", "分类"]
    },
    "L17-4": {
        "title": "游戏角色系统",
        "subtitle": "学会面向对象的综合应用",
        "keywords": ["system", "design", "pattern", "architecture"],
        "concepts": ["类设计", "对象交互", "游戏架构"],
        "stories": ["完整游戏"],
        "mathConcepts": ["系统设计", "逻辑推理"]
    },
    # L18单元 - 综合项目
    "L18-1": {
        "title": "项目规划与设计",
        "subtitle": "学会项目分析和模块设计",
        "keywords": ["plan", "design", "module", "structure"],
        "concepts": ["项目规划", "模块设计", "代码组织"],
        "stories": ["项目启动"],
        "mathConcepts": ["规划思维", "模块化"]
    },
    "L18-2": {
        "title": "核心功能实现",
        "subtitle": "学会核心算法和功能模块",
        "keywords": ["core", "function", "algorithm", "implement"],
        "concepts": ["核心算法", "功能实现", "调试技巧"],
        "stories": ["功能开发"],
        "mathConcepts": ["算法优化", "效率分析"]
    },
    "L18-3": {
        "title": "界面与交互优化",
        "subtitle": "学会用户体验和界面设计",
        "keywords": ["ui", "ux", "interface", "interaction"],
        "concepts": ["界面设计", "用户交互", "体验优化"],
        "stories": ["界面美化"],
        "mathConcepts": ["布局计算", "坐标系统"]
    },
    "L18-4": {
        "title": "项目完善与发布",
        "subtitle": "学会项目测试和发布流程",
        "keywords": ["test", "debug", "release", "publish"],
        "concepts": ["项目测试", "Bug修复", "版本发布"],
        "stories": ["项目上线"],
        "mathConcepts": ["测试覆盖率", "版本管理"]
    }
}


def load_content():
    """加载content.json"""
    with open(CONTENT_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def generate_vocab_data(lesson_id, config, content):
    """生成单词卡数据"""
    vocab = []
    lesson_content = next((item for item in content if item['id'] == lesson_id), None)

    if lesson_content and 'flashcard' in lesson_content['resources']:
        flashcard_text = lesson_content['resources']['flashcard'].get('content', '')
        # 从OCR内容中提取单词
        words = extract_words_from_ocr(flashcard_text)
        for word_info in words:
            vocab.append({
                "word": word_info['word'],
                "pronunciation": word_info.get('pronunciation', f"[{word_info['word']}]"),
                "partOfSpeech": word_info.get('pos', 'n.'),
                "meaning": word_info.get('meaning', ''),
                "level": word_info.get('level', 'easy'),
                "example": word_info.get('example', f"This is a {word_info['word']}."),
                "exampleTranslation": word_info.get('example_trans', f"这是一个{word_info['word']}。")
            })

    # 补充拓展单词到4-6个
    keywords = config.get('keywords', [])
    while len(vocab) < 4 and len(keywords) > len(vocab):
        kw = keywords[len(vocab)]
        if not any(v['word'] == kw for v in vocab):
            vocab.append({
                "word": kw,
                "pronunciation": f"[{kw}]",
                "partOfSpeech": "n.",
                "meaning": f"{kw}的编程相关含义",
                "level": "medium" if len(vocab) >= 2 else "easy",
                "example": f"We use {kw} in programming.",
                "exampleTranslation": f"我们在编程中使用{kw}。"
            })

    # 确保有拓展单词
    if len(vocab) < 5:
        extra_words = ["code", "debug", "function", "variable", "loop"]
        for ew in extra_words:
            if len(vocab) >= 6:
                break
            if not any(v['word'] == ew for v in vocab):
                vocab.append({
                    "word": ew,
                    "pronunciation": f"[{ew}]",
                    "partOfSpeech": "n.",
                    "meaning": f"{ew}的编程含义",
                    "level": "hard" if len(vocab) >= 4 else "easy",
                    "example": f"Learn about {ew}.",
                    "exampleTranslation": f"学习{ew}。",
                    "note": "拓展单词"
                })

    return vocab[:6]


def extract_words_from_ocr(text):
    """从OCR文本中提取单词信息"""
    import re
    words = []
    lines = text.split('\n')
    current_word = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # 查找单词行（包含音标的行）
        word_match = re.match(r'^([a-zA-Z]+)\s*\[([^\]]+)\]', line)
        if word_match:
            if current_word:
                words.append(current_word)
            current_word = {
                'word': word_match.group(1),
                'pronunciation': f"[{word_match.group(2)}]",
                'meaning': '',
                'level': 'easy' if len(words) < 2 else ('medium' if len(words) < 4 else 'hard')
            }
            # 提取剩余部分作为词性和释义
            rest = line[word_match.end():].strip()
            if rest:
                current_word['meaning'] = rest
        elif current_word is not None:
            # 处理词性和释义行
            if line.startswith('n.') or line.startswith('v.') or line.startswith('adj.'):
                current_word['meaning'] = line
            elif not current_word.get('meaning'):
                current_word['meaning'] = line

    if current_word:
        words.append(current_word)

    return words[:4]  # 最多返回4个OCR单词


def generate_knowledge_points(lesson_id, config, content):
    """生成知识点数据"""
    concepts = config.get('concepts', ['知识点1', '知识点2'])

    kps = []
    for i, concept in enumerate(concepts[:3]):
        kp = {
            "id": f"kp-{i+1}",
            "title": concept,
            "emoji": ["🎯", "🔧", "🎮"][i % 3],
            "gradeLevel": "3-4",
            "summary": f"学习{concept}的核心内容",
            "easy": generate_kp_level(concept, "easy"),
            "medium": generate_kp_level(concept, "medium"),
            "hard": generate_kp_level(concept, "hard")
        }
        kps.append(kp)

    return kps


def generate_kp_level(concept, level):
    """生成知识点某个难度的内容"""
    level_config = {
        "easy": {
            "story_prefix": "想象一下，",
            "concept_template": "{concept}是编程中的一个重要概念。",
            "complexity": "简单"
        },
        "medium": {
            "story_prefix": "在实际开发中，",
            "concept_template": "{concept}可以让我们更高效地处理复杂问题。",
            "complexity": "进阶"
        },
        "hard": {
            "story_prefix": "高级应用场景下，",
            "concept_template": "{concept}的深入理解和优化技巧是成为优秀程序员的关键。",
            "complexity": "挑战"
        }
    }

    cfg = level_config[level]

    return {
        "story": f"{cfg['story_prefix']}{concept}就像一个魔法工具，帮助我们实现各种功能！",
        "concept": cfg['concept_template'].format(concept=concept),
        "syntax": f"# {concept}的使用方法\n# 具体语法根据课程内容确定",
        "example": {
            "title": f"{concept}示例",
            "code": f"# {concept}代码示例\nprint('Hello, {concept}!')",
            "output": f"Hello, {concept}!",
            "explanation": f"这个例子展示了{concept}的基本用法。"
        },
        "practice": [
            {"question": f"{concept}的作用是什么？", "answer": f"{concept}可以帮助我们实现特定功能"},
            {"question": f"如何使用{concept}？", "answer": f"按照正确的语法格式调用{concept}"}
        ]
    }


def generate_exercises(lesson_id, config, content):
    """生成习题数据"""
    math_concepts = config.get('mathConcepts', ['计算', '逻辑推理'])

    exercises = []
    # 2道easy + 2道medium + 2道hard
    exercise_templates = [
        {"level": "easy", "label": "基础", "emoji": "🟢"},
        {"level": "easy", "label": "基础", "emoji": "🟢"},
        {"level": "medium", "label": "进阶", "emoji": "🟡"},
        {"level": "medium", "label": "进阶", "emoji": "🟡"},
        {"level": "hard", "label": "挑战", "emoji": "🔴"},
        {"level": "hard", "label": "挑战", "emoji": "🔴"}
    ]

    concepts = config.get('concepts', ['知识点'])
    title = config.get('title', '课程')

    for i, tmpl in enumerate(exercise_templates):
        concept = concepts[i % len(concepts)]
        math_concept = math_concepts[i % len(math_concepts)]

        ex = {
            "id": f"ex-{i+1}",
            "level": tmpl["level"],
            "levelLabel": tmpl["label"],
            "levelEmoji": tmpl["emoji"],
            "type": "multiple-choice",
            "mathConcept": math_concept,
            "question": generate_question(title, concept, math_concept, tmpl["level"], i),
            "options": generate_options(concept, tmpl["level"], i),
            "answer": 0 if tmpl["level"] == "easy" else (1 if tmpl["level"] == "medium" else 2),
            "explanation": generate_explanation(concept, math_concept, tmpl["level"]),
            "hint": f"提示：想想{concept}的特点"
        }
        exercises.append(ex)

    return exercises


def generate_question(title, concept, math_concept, level, index):
    """生成题目"""
    templates = {
        "easy": f"在{title}项目中，关于{concept}，下面哪个说法是正确的？",
        "medium": f"使用{concept}时，遇到{math_concept}问题，应该如何解决？",
        "hard": f"综合运用{concept}，设计一个解决方案来处理{math_concept}问题。"
    }
    return templates.get(level, f"关于{concept}的问题：")


def generate_options(concept, level, index):
    """生成选项"""
    base_options = [
        f"使用{concept}的语法",
        f"调用{concept}的方法",
        f"结合数学计算"
    ]
    return base_options


def generate_explanation(concept, math_concept, level):
    """生成解析"""
    return f"这道题考查的是{concept}的理解和应用。数学知识：{math_concept}。"


def generate_lesson_meta(lesson_id, config):
    """生成课次元数据"""
    return {
        "id": lesson_id,
        "title": config.get('title', '课程标题'),
        "subtitle": config.get('subtitle', '课程副标题'),
        "difficulty": "进阶",
        "estimatedTime": "30-45分钟",
        "learningGoals": [
            f"理解{config.get('concepts', ['知识点'])[0]}",
            f"掌握{config.get('concepts', ['知识点'])[1] if len(config.get('concepts', [])) > 1 else '相关技能'}",
            "能独立完成课程项目"
        ],
        "prerequisites": ["Python基础", "Pygame框架"]
    }


def generate_typing_words(config):
    """生成打字练习单词"""
    keywords = config.get('keywords', ['python', 'code'])
    concepts = config.get('concepts', ['function', 'variable'])

    all_words = keywords + concepts + ['python', 'programming', 'computer', 'algorithm']

    return {
        "easy": all_words[:4] if len(all_words) >= 4 else all_words + ['code', 'data'],
        "medium": all_words[2:6] if len(all_words) >= 6 else all_words + ['loop', 'string'],
        "hard": all_words[-4:] if len(all_words) >= 4 else ['algorithm', 'function', 'variable', 'class']
    }


def generate_typing_templates(config):
    """生成代码模板"""
    return {
        "easy": [
            "import pgzrun",
            "def draw():",
            "screen.blit()",
            "actor.draw()"
        ],
        "medium": [
            "def update():\n    pass",
            "for i in range(10):\n    print(i)",
            "if keyboard.space:\n    pass",
            "clock.schedule(func, 1)"
        ],
        "hard": [
            "class Player:\n    def __init__(self):\n        pass",
            "def on_key_down(key):\n    if key == keys.SPACE:\n        pass",
            "for item in items:\n    if item.collidepoint(pos):\n        pass"
        ]
    }


def generate_lesson_file(lesson_id, config, content):
    """生成单个lesson-data.js文件"""
    vocab = generate_vocab_data(lesson_id, config, content)
    kps = generate_knowledge_points(lesson_id, config, content)
    exercises = generate_exercises(lesson_id, config, content)
    meta = generate_lesson_meta(lesson_id, config)
    typing = generate_typing_words(config)
    templates = generate_typing_templates(config)

    js_content = f'''/**
 * PY3 课程 {lesson_id}: {config.get('title', '课程标题')}
 *
 * 核心知识点:
 * {chr(10).join(f" * {i+1}. {c}" for i, c in enumerate(config.get('concepts', ['知识点'])[:3]))}
 */

// 单词卡数据
export const vocabData = {json.dumps(vocab, ensure_ascii=False, indent=2)}

// 知识点数据
export const knowledgePoints = {json.dumps(kps, ensure_ascii=False, indent=2)}

// 习题数据（编程 × 数学融合）
export const exercises = {json.dumps(exercises, ensure_ascii=False, indent=2)}

// 课次元数据
export const lessonMeta = {json.dumps(meta, ensure_ascii=False, indent=2)}

// 打字练习单词
export const typingWords = {json.dumps(typing, ensure_ascii=False, indent=2)}

// 代码模板练习
export const typingTemplates = {json.dumps(templates, ensure_ascii=False, indent=2)}

// 导出所有数据
export const {lesson_id.replace("-", "_")}_data = {{
  meta: lessonMeta,
  vocab: vocabData,
  knowledgePoints,
  exercises,
  typingWords,
  typingTemplates
}}

export default {lesson_id.replace("-", "_")}_data
'''

    return js_content


def main():
    print("=" * 50)
    print("PY3课程lesson-data.js生成脚本")
    print("=" * 50)

    # 加载content.json
    content = load_content()
    print(f"已加载 {len(content)} 个课次的内容")

    # 确保lessons目录存在
    LESSONS_DIR.mkdir(parents=True, exist_ok=True)

    # 生成每个课次的文件
    for lesson_id, config in LESSON_CONFIGS.items():
        print(f"生成 {lesson_id}...")

        js_content = generate_lesson_file(lesson_id, config, content)

        # 写入文件
        lesson_dir = LESSONS_DIR / lesson_id
        lesson_dir.mkdir(parents=True, exist_ok=True)
        output_file = lesson_dir / "lesson-data.js"

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(js_content)

        print(f"  [OK] {output_file}")

    print("\n" + "=" * 50)
    print(f"生成完成！共 {len(LESSON_CONFIGS)} 个课次")
    print("=" * 50)


if __name__ == "__main__":
    main()
