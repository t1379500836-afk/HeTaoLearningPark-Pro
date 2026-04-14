#!/usr/bin/env node
/**
 * 课程内容验证脚本
 * 用法: node scripts/verify-lesson.cjs <lesson-data.js路径>
 */

const lessonPath = process.argv[2] || './src/data/courses/PY1/lessons/L1-1/lesson-data.js';

// 解析路径获取课次ID
const path = require('path');
const lessonId = path.basename(path.dirname(lessonPath));

try {
  // 清除缓存以获取最新内容
  delete require.cache[require.resolve(path.resolve(lessonPath))];
  const data = require(path.resolve(lessonPath));

  console.log(`\n${'='.repeat(40)}`);
  console.log(`   ${data.meta?.id || lessonId} 课程验证报告`);
  console.log(`${'='.repeat(40)}\n`);

  let hasErrors = false;

  // ========== 内容数量检查 ==========
  console.log('【内容数量检查】');
  const vocabCount = data.vocabData?.length || 0;
  const kpCount = data.knowledgePoints?.length || 0;
  const exCount = data.exercises?.length || 0;
  const easyCount = data.exercises?.filter(e => e.level === 'easy').length || 0;
  const mediumCount = data.exercises?.filter(e => e.level === 'medium').length || 0;
  const hardCount = data.exercises?.filter(e => e.level === 'hard').length || 0;

  // 单词卡检查
  if (vocabCount >= 3 && vocabCount <= 5) {
    console.log(`  ✓ 单词卡: ${vocabCount}个`);
  } else {
    console.log(`  ✗ 单词卡: ${vocabCount}个 (要求: 3-5个)`);
    hasErrors = true;
  }

  // 知识点检查
  if (kpCount >= 2 && kpCount <= 4) {
    console.log(`  ✓ 知识点: ${kpCount}个`);
  } else {
    console.log(`  ✗ 知识点: ${kpCount}个 (要求: 2-4个)`);
    hasErrors = true;
  }

  // 习题总数检查
  if (exCount >= 6) {
    console.log(`  ✓ 习题总数: ${exCount}道`);
  } else {
    console.log(`  ✗ 习题总数: ${exCount}道 (要求: ≥6道)`);
    hasErrors = true;
  }

  // 难度分布检查
  if (easyCount >= 2) {
    console.log(`  ✓ 🟢 easy: ${easyCount}道`);
  } else {
    console.log(`  ✗ 🟢 easy: ${easyCount}道 (要求: ≥2道)`);
    hasErrors = true;
  }

  if (mediumCount >= 2) {
    console.log(`  ✓ 🟡 medium: ${mediumCount}道`);
  } else {
    console.log(`  ✗ 🟡 medium: ${mediumCount}道 (要求: ≥2道)`);
    hasErrors = true;
  }

  if (hardCount >= 2) {
    console.log(`  ✓ 🔴 hard: ${hardCount}道`);
  } else {
    console.log(`  ✗ 🔴 hard: ${hardCount}道 (要求: ≥2道)`);
    hasErrors = true;
  }

  // ========== 习题ID唯一性检查 ==========
  console.log('\n【习题ID唯一性检查】');
  const ids = data.exercises?.map(e => e.id) || [];
  const uniqueIds = new Set(ids);
  const duplicateIds = [];

  ids.forEach((id, i) => {
    if (ids.indexOf(id) !== i) {
      duplicateIds.push({ id, index: i + 1 });
    }
  });

  if (duplicateIds.length === 0) {
    console.log('  ✓ 所有习题ID唯一');
  } else {
    console.log('  ✗ 存在重复的习题ID:');
    duplicateIds.forEach(({ id, index }) => {
      console.log(`    - ${id} 重复出现在第 ${index} 题`);
    });
    hasErrors = true;
  }

  // ========== 必填字段检查 ==========
  console.log('\n【必填字段检查】');
  const missingFields = [];
  const issues = [];

  data.exercises?.forEach((ex, i) => {
    const exLabel = ex.id || `习题${i + 1}`;

    // 检查必需字段
    if (!ex.id) missingFields.push(`${exLabel}: id`);
    if (!ex.level) missingFields.push(`${exLabel}: level`);
    if (!ex.levelLabel) missingFields.push(`${exLabel}: levelLabel`);
    if (!ex.levelEmoji) missingFields.push(`${exLabel}: levelEmoji`);
    if (!ex.type) missingFields.push(`${exLabel}: type`);
    if (!ex.mathConcept) missingFields.push(`${exLabel}: mathConcept`);
    if (!ex.question) missingFields.push(`${exLabel}: question`);
    if (!ex.options || ex.options.length === 0) missingFields.push(`${exLabel}: options`);
    if (ex.answer === undefined || ex.answer === null) missingFields.push(`${exLabel}: answer`);
    if (!ex.explanation) missingFields.push(`${exLabel}: explanation`);

    // 检查特殊问题
    if (ex.question && (ex.question.includes("'") || ex.question.includes('"'))) {
      if (!ex.question.startsWith('"') || !ex.question.endsWith('"')) {
        issues.push(`${exLabel}: question 包含引号，建议使用双引号包裹`);
      }
    }
  });

  if (missingFields.length === 0) {
    console.log('  ✓ 所有习题必填字段完整');
  } else {
    console.log('  ✗ 缺少以下必填字段:');
    missingFields.forEach(f => console.log(`    - ${f}`));
    hasErrors = true;
  }

  if (issues.length > 0) {
    console.log('\n  ⚠ 发现以下潜在问题:');
    issues.forEach(issue => console.log(`    - ${issue}`));
  }

  // ========== 知识点三梯度检查 ==========
  console.log('\n【知识点三梯度检查】');
  let kpComplete = true;
  data.knowledgePoints?.forEach((kp, i) => {
    const kpLabel = kp.id || `知识点${i + 1}`;
    if (!kp.easy || !kp.medium || !kp.hard) {
      console.log(`  ✗ ${kpLabel} 缺少完整的三个难度版本`);
      kpComplete = false;
      hasErrors = true;
    }
  });
  if (kpComplete) {
    console.log('  ✓ 所有知识点包含三梯度版本');
  }

  // ========== 结果总结 ==========
  console.log(`\n${'='.repeat(40)}`);
  if (hasErrors) {
    console.log('   ❌ 验证失败 - 请修复上述问题');
    console.log('='.repeat(40));
    process.exit(1);
  } else {
    console.log('   ✅ 验证通过 - 内容符合开发标准');
    console.log('='.repeat(40));
    process.exit(0);
  }

} catch (err) {
  console.error('\n❌ 语法错误或文件无法加载:');
  console.error(`   ${err.message}\n`);

  // 提供更详细的错误信息
  if (err.message.includes('Unexpected') || err.message.includes('token')) {
    console.error('💡 常见原因:');
    console.error('   - question 字段包含单引号，需要用双引号包裹');
    console.error('   - 中文引号 ' + "''" + ' 或 ' + '""' + ' 导致语法错误');
    console.error('   - 检查是否使用了连续的单引号\n');
  }

  process.exit(1);
}
