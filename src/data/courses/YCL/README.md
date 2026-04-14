# YCL 青少年人工智能编程水平测试 - 试卷开发规范

本文档规范 YCL 四级、五级、六级的试卷开发流程和质量标准。

---

## 📋 目录

- [开发流程](#-开发流程)
- [考情分析驱动](#-考情分析驱动)
- [试卷结构规范](#-试卷结构规范)
- [知识点覆盖要求](#-知识点覆盖要求)
- [审查清单](#-审查清单)
- [distribution 统计规范](#️-distribution-统计规范)
- [常见错误](#️-常见错误)
- [审查脚本](#-审查脚本)
- [修复记录](#-修复记录)
- [文件结构](#-文件结构)

---

## 🚀 开发流程

```
1. 阅读考情分析 → 2. 设计试卷结构 → 3. 编写题目 → 4. 审查验证 → 5. 更新统计
```

### 核心原则

1. **考情分析驱动**：严格按照 `exam-analysis.js` 中的必考知识点出题
2. **完整覆盖**：每套试卷必须覆盖所有必考知识点
3. **审查必做**：出完试卷必须进行审查
4. **统计准确**：distribution 数据必须与实际题目一致

---

## 📊 考情分析驱动

### 必考知识点来源

考情分析配置文件：`config/exam-analysis.js`

每个等级的必考知识点定义在 `knowledgePoints` 数组中，重点关注：

```javascript
{
  id: 'kp-4-6',
  name: 'if-else',
  examStatus: {
    objective: '必考',    // 客观题（选择题）必考
    coding: '必考'        // 编程题必考  ← 关键！
  },
  scoreRange: [12, 14],  // 分值范围
  importance: 5          // 重要程度（5最高）
}
```

### 必考知识点识别标准

| examStatus | 含义 |
|------------|------|
| `objective: '必考'` | 选择题必须包含 |
| `coding: '必考'` | 编程题必须包含 |
| `coding: '有概率'` | 编程题可选 |

### 获取必考知识点

```javascript
// 从 exam-analysis.js 中筛选
const requiredPoints = knowledgePoints.filter(
  kp => kp.examStatus.coding === '必考'
)
```

---

## 📝 试卷结构规范

### 标准结构

每套试卷固定结构：

| 题型 | 题数 | 分值 | 小计 |
|------|------|------|------|
| 单选题 | 15题 | 每题2分 | 30分 |
| 多选题 | 5题 | 每题3分 | 15分 |
| 编程题 | 4题 | 10+10+15+20 | 55分 |
| **总计** | **24题** | | **100分** |

考试时长：90分钟

### 编程题设计规范

每套试卷的4道编程题应覆盖所有必考知识点：

| 题号 | 分值 | 建议考查点 |
|------|------|------------|
| 第1题 | 10分 | 简单计算（数学运算 + input/int） |
| 第2题 | 10分 | 字符串处理（字符串拼接） |
| 第3题 | 15分 | 条件判断（if-else） |
| 第4题 | 20分 | 循环结构（for循环） |

---

## ✅ 知识点覆盖要求

### 四级必考知识点

根据 `level4/exam-analysis.js`，以下知识点编程题必考：

| 编号 | 知识点 | 分值范围 |
|------|--------|----------|
| kp-4-1 | 输出命令 print() | 8-10分 |
| kp-4-2 | 输入命令 input() | 6-8分 |
| kp-4-3 | 转整命令 int() | 8-12分 |
| kp-4-4 | 简单数学运算 | 12-15分 |
| kp-4-5 | 字符串拼接 | 12-14分 |
| kp-4-6 | if-else 条件判断 | 12-14分 |
| kp-4-7 | for循环基础 | 12-16分 |

### 覆盖检查表

每套试卷完成后，填写此检查表：

| 必考知识点 | 选择题 | 编程题 | 分值合计 | 达标 |
|-----------|--------|--------|----------|------|
| kp-4-1 | ☐ | ☐ | ___ | ☐ |
| kp-4-2 | ☐ | ☐ | ___ | ☐ |
| kp-4-3 | ☐ | ☐ | ___ | ☐ |
| kp-4-4 | ☐ | ☐ | ___ | ☐ |
| kp-4-5 | ☐ | ☐ | ___ | ☐ |
| kp-4-6 | ☐ | ☐ | ___ | ☐ |
| kp-4-7 | ☐ | ☐ | ___ | ☐ |

**要求**：每个必考知识点在编程题中至少出现1次。

---

## 🔍 审查清单

### 出题后必查项目

#### 1. 知识点覆盖审查

- [ ] 所有必考知识点是否都有编程题覆盖？
- [ ] 编程题是否包含：数学运算、字符串拼接、if-else、for循环？
- [ ] 是否有遗漏的必考知识点？

#### 2. distribution 统计审查

- [ ] `byKnowledgePoint` 中每个知识点的 `count` 是否正确？
- [ ] `byKnowledgePoint` 中每个知识点的 `totalScore` 是否正确？
- [ ] `byType` 中的统计数据是否正确？
- [ ] `byDifficulty` 中的统计数据是否正确？

#### 3. 题目内容审查

- [ ] 单选题的 `answer` 索引是否正确（从0开始）？
- [ ] 多选题的 `answer` 数组是否正确？
- [ ] 编程题的 `testCases` 预期输出是否正确？
- [ ] 代码示例是否能正常运行？

#### 4. 分值一致性审查

- [ ] 所有单选题都是2分？
- [ ] 所有编程题分值加起来是55分？
- [ ] 整套卷总分是100分？

### 审查命令

```bash
# 统计知识点出现次数
grep -c "knowledgePoint: 'kp-4-" src/data/courses/YCL/level4/sets/basic-1.js

# 验证分值总和
node -e "
const set = require('./src/data/courses/YCL/level4/sets/basic-1.js').practiceSet;
let total = 0;
set.questions.forEach(q => total += q.score);
console.log('总分:', total);
"
```

---

## 📈 distribution 统计规范

### 统计结构

```javascript
distribution: {
  byType: {
    'single-choice': { count: 15, totalScore: 30 },
    'multiple-choice': { count: 5, totalScore: 15 },
    'coding': { count: 4, totalScore: 55 }
  },
  byKnowledgePoint: {
    'kp-4-1': { count: 2, totalScore: 5 },
    'kp-4-2': { count: 2, totalScore: 5 },
    // ... 每个知识点的统计
  },
  byDifficulty: {
    'easy': 8,
    'medium': 10,
    'hard': 6
  }
}
```

### 统计计算方法

**知识点统计**：
1. 遍历所有题目
2. 按 `knowledgePoint` 字段分组
3. 统计每组的题目数量和分值总和

```javascript
// 计算示例
const kpStats = {};
questions.forEach(q => {
  const kp = q.knowledgePoint;
  if (!kpStats[kp]) {
    kpStats[kp] = { count: 0, totalScore: 0 };
  }
  kpStats[kp].count++;
  kpStats[kp].totalScore += q.score;
});
```

### 验证方法

1. **手动验证**：使用 grep 统计知识点出现次数，与 distribution 对比
2. **脚本验证**：编写脚本自动计算并对比

```bash
# 统计 kp-4-4 出现次数
grep -c "knowledgePoint: 'kp-4-4'" basic-1.js
# 输出应该等于 distribution.byKnowledgePoint['kp-4-4'].count
```

---

## ⚠️ 常见错误

### 错误1：编程题缺少必考知识点

**问题描述**：某套试卷的编程题没有 if-else 类型的题目。

**原因**：出题时没有对照考情分析。

**解决方案**：使用知识点覆盖检查表，确保每个必考点都有编程题。

### 错误2：distribution 统计不准确

**问题描述**：distribution 中 `kp-4-6: { count: 2, totalScore: 17 }`，但实际只有1题15分。

**原因**：修改题目后没有同步更新 distribution。

**解决方案**：
1. 修改题目后立即更新 distribution
2. 使用脚本自动计算验证

### 错误3：题目编号和知识点不匹配

**问题描述**：第2题的 `knowledgePoint` 是 `kp-4-3`，但题目内容是字符串拼接（应该是 `kp-4-5`）。

**原因**：复制粘贴后忘记修改。

**解决方案**：修改题目内容时同步修改 `knowledgePoint` 字段。

### 错误4：编程题知识点覆盖不完整（2026-04-05 发现）

**问题描述**：四级部分试卷的编程题没有严格按照标准结构覆盖4个核心必考知识点。

**实际案例**：
- basic-1、basic-2 原本缺少 if-else 编程题
- advanced、expert 原本缺少数学运算和字符串拼接编程题

**原因**：出题时没有严格按照"编程题设计规范"的4题结构出题。

**标准编程题结构**（必须严格遵守）：

| 题号 | 分值 | 必考知识点 | 内容类型 |
|------|------|-----------|----------|
| Q1 | 10分 | kp-4-4 | 简单数学运算 |
| Q2 | 10分 | kp-4-5 | 字符串拼接 |
| Q3 | 15分 | kp-4-6 | if-else 条件判断 |
| Q4 | 20分 | kp-4-7 | for 循环 |

**解决方案**：
1. 每套试卷出题完成后，必须对照上表检查编程题覆盖
2. 使用 grep 命令快速验证：
   ```bash
   # 检查编程题知识点
   grep -A 2 "type: 'coding'" basic-1.js | grep knowledgePoint
   ```

### 错误5：distribution 分值计算错误（2026-04-05 发现）

**问题描述**：distribution 中 `byKnowledgePoint` 的 totalScore 与实际题目分值不符。

**实际案例**：
- basic-1: kp-4-4 显示11分，实际应为17分
- basic-1: kp-4-5 显示12分，实际应为16分
- advanced: kp-4-4 count 显示5题，实际应为6题

**原因**：
1. 修改题目后没有更新 distribution
2. 手动统计时遗漏题目或计算错误

**验证命令**：
```bash
# 统计某知识点的题目数
grep -c "knowledgePoint: 'kp-4-4'" basic-1.js

# 统计某知识点的总分值（需手动计算）
grep -B 1 "knowledgePoint: 'kp-4-4'" basic-1.js | grep "score:"
```

**解决方案**：
1. 修改任何题目后，必须重新计算并更新 distribution
2. 使用审查脚本自动验证（见下方）

---

## 🔧 审查脚本

### 快速验证脚本

将以下脚本保存为 `scripts/verify-distribution.js`：

```javascript
// 验证试卷 distribution 统计是否准确
const fs = require('fs');
const path = require('path');

const files = [
  'src/data/courses/YCL/level4/sets/basic-1.js',
  'src/data/courses/YCL/level4/sets/basic-2.js',
  'src/data/courses/YCL/level4/sets/basic-3.js',
  'src/data/courses/YCL/level4/sets/advanced.js',
  'src/data/courses/YCL/level4/sets/expert.js'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');

  // 提取所有知识点和分数
  const kpMatches = content.matchAll(/knowledgePoint: '(kp-4-\d+)'.*?score: (\d+)/gs);
  const kpStats = {};

  for (const match of kpMatches) {
    const kp = match[1];
    const score = parseInt(match[2]);
    if (!kpStats[kp]) kpStats[kp] = { count: 0, totalScore: 0 };
    kpStats[kp].count++;
    kpStats[kp].totalScore += score;
  }

  // 提取 distribution 中的统计
  const distMatch = content.match(/byKnowledgePoint:\s*\{([^}]+)\}/s);
  if (distMatch) {
    console.log(`\n=== ${path.basename(file)} ===`);
    console.log('实际统计:', JSON.stringify(kpStats, null, 2));
  }
});
```

### 编程题覆盖检查

```bash
# 检查编程题是否覆盖4个核心知识点
for file in basic-1 basic-2 basic-3 advanced expert; do
  echo "=== $file.js 编程题知识点 ==="
  grep -A 3 "type: 'coding'" $file.js | grep -E "(knowledgePoint|score)"
done
```

---

## 📋 修复记录

### 2026-04-05 四级试卷修复

**发现问题**：
1. basic-1、basic-2 编程题缺少 if-else（kp-4-6）题目
2. advanced、expert 编程题缺少数学运算（kp-4-4）和字符串拼接（kp-4-5）题目
3. 多套试卷的 distribution 统计数据不准确

**修复内容**：

| 试卷 | 编程题修复 | distribution 修复 |
|------|-----------|------------------|
| basic-1 | Q2→字符串拼接, Q3→if-else | kp-4-4: 11→17分, kp-4-5: 12→16分 |
| basic-2 | Q2→字符串拼接, Q3→if-else | kp-4-4: 5→6题, easy: 8→9, hard: 7→5 |
| basic-3 | Q2→字符串拼接 | kp-4-4: 3→4题, 11→17分 |
| advanced | Q1→数学运算, Q2→字符串拼接, Q3→if-else, Q4→for循环 | kp-4-4: 5→6题, kp-4-7: 29→27分 |
| expert | Q1→数学运算, Q2→字符串拼接, Q3→if-else, Q4→for循环 | ✅ 已正确 |

**修复后验证**：
- 所有5套试卷编程题都覆盖4个核心必考知识点
- distribution 统计与实际题目一致
- 总分均为100分

---

## 📚 文件结构

```
YCL/
├── config/
│   ├── exam-info.js       # 考试信息配置
│   ├── theory.js          # 理论讲解配置
│   └── knowledge-points.js # 知识点配置
├── level4/
│   ├── exam-analysis.js   # 四级考情分析 ⭐
│   ├── sets/
│   │   ├── basic-1.js     # 基础卷(一)
│   │   ├── basic-2.js     # 基础卷(二)
│   │   ├── basic-3.js     # 基础卷(三)
│   │   ├── advanced.js    # 提高卷
│   │   └── expert.js      # 冲刺卷
│   └── index.js
├── level5/
│   ├── exam-analysis.js   # 五级考情分析 ⭐
│   └── sets/
├── level6/
│   ├── exam-analysis.js   # 六级考情分析 ⭐
│   └── sets/
└── README.md              # 本文档
```

---

## 🔄 修改试卷流程

当需要修改试卷时：

1. **修改题目内容**
2. **同步修改 `knowledgePoint` 字段**（如果知识点变化）
3. **重新计算 distribution 统计**
4. **运行审查清单**
5. **提交前再次验证**

### 示例：修改编程题

```javascript
// 修改前：数学运算题
{
  id: 'q-4-1-coding-2',
  knowledgePoint: 'kp-4-4',  // 数学运算
  question: '仓库有50个篮球，借走n个...',
  // ...
}

// 修改后：字符串拼接题
{
  id: 'q-4-1-coding-2',
  knowledgePoint: 'kp-4-5',  // ← 记得修改！
  question: '输入兴趣班名称，输出"小明参加了___兴趣班"...',
  // ...
}
```

修改后必须更新 distribution：
- `kp-4-4` 的 count 减1，totalScore 减10
- `kp-4-5` 的 count 加1，totalScore 加10

---

## 📝 总结

### 出题核心原则

1. **考情分析是纲**：严格按照 exam-analysis.js 出题
2. **覆盖所有必考**：每个必考知识点都要有编程题
3. **审查必须执行**：出完题必须检查覆盖和统计
4. **统计必须准确**：distribution 要与实际题目一致

### 开发检查口诀

```
一读考情看必考，
二设结构定分值，
三写题目对知识点，
四查覆盖审统计，
五验总分确无误。
```
