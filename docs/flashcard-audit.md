# 单词卡核对报告

> 核对日期：2026-04-18
> 核对范围：PY1/PY2/PY3 全部课程
> 核对方法：对比 `HeTaoLearningPark` 项目 content.json 中的 flashcard OCR 文本与 `HeTaoLearningPark-Pro` 项目 lesson-data.js 中的 vocabData

## 核对结果总览

| 阶段 | 总课次 | 有单词卡资源 | 无单词卡资源 | 数据一致 | 有缺失/分类错误 |
|------|--------|-------------|-------------|---------|----------------|
| PY1  | 24     | 24          | 0           | 24      | 0              |
| PY2  | 24     | 24          | 0           | 20      | 4              |
| PY3  | 24     | 20          | 4           | 20      | 0              |

## 有实际缺失的课程（OCR 单词未录入 vocabData）

### L8-2 龙王传说

- **content.json OCR 单词**：`set, add, in, score`
- **lesson-data.js 当前**：OCR: `set, add` / 拓展: `type, convert, unique`
- **缺失**：`in`、`score`
- **修复方案**：补充 `in`、`score` 为 OCR 单词，保留 `type`、`unique` 为拓展（共 6 词）

### L8-3 奇怪的面试者

- **content.json OCR 单词**：`line, sensor, wait, time`
- **lesson-data.js 当前**：OCR: `line, sensor, wait` / 拓展: `power, infrared`
- **缺失**：`time`
- **修复方案**：补充 `time` 为 OCR 单词，保留 `power`、`infrared` 为拓展（共 6 词）

## OCR/拓展分类不准确的课程（单词都在，但标注有误）

### L7-3 列表排序忍无可忍

- **content.json OCR 单词**：`sum, sort, player, record`
- **lesson-data.js 当前**：OCR: `sum` / 拓展: `sort, player, record, algorithm`
- **问题**：`sort`、`player`、`record` 应为 OCR 单词，被标为拓展
- **修复方案**：将 `sort`、`player`、`record` 修正为 OCR，保留 `algorithm` 为拓展（共 5 词）

### L7-4 智能遥控车重建百兽洞

- **content.json OCR 单词**：`initial, power, claw, detect`
- **lesson-data.js 当前**：OCR: `initial` / 拓展: `power, claw, detect, initialize`
- **问题**：`power`、`claw`、`detect` 应为 OCR 单词，被标为拓展
- **修复方案**：将 `power`、`claw`、`detect` 修正为 OCR，保留 `initialize` 为拓展（共 5 词）

## 无单词卡资源的课程（content.json 无 flashcard 条目）

| 课程 | lesson-data.js 说明 | 状态 |
|------|-------------------|------|
| L13-4 木琴敲敲敲 | 根据课程内容 + 拓展词汇 | 正常 |
| L14-2 自动发球机 | 复用L14-1 + 拓展词汇 | 正常 |
| L15-4 人脸识别进阶 | 拓展词汇（无OCR单词） | 正常 |
| L16-4 颜色识别物流车 | 拓展词汇（无OCR单词） | 正常 |

## 修复状态

| 课程 | 修复内容 | 状态 |
|------|---------|------|
| L7-3 | OCR 分类修正 + source 字段 | 已修复 |
| L7-4 | OCR 分类修正 + source 字段 | 已修复 |
| L8-2 | 补充 `in`、`score` + source 字段 | 已修复 |
| L8-3 | 补充 `time` + source 字段 | 已修复 |
