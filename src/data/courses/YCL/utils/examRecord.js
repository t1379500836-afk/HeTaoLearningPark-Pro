/**
 * YCL 考试记录存储工具
 *
 * 使用 localStorage 持久化存储用户的考试记录
 * 支持保存答题数据、得分、答题时间等信息
 */

const STORAGE_KEY = 'ycl_exam_records'
const DRAFT_KEY = 'ycl_exam_draft'

/**
 * 获取所有考试记录
 * @returns {Object} { level4: { setId: record }, level5: {...}, level6: {...} }
 */
export function getAllRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch (e) {
    console.error('读取考试记录失败:', e)
    return {}
  }
}

/**
 * 获取某个等级的所有记录
 * @param {string} level - 等级标识 (level4, level5, level6)
 * @returns {Object} { setId: record }
 */
export function getLevelRecords(level) {
  const all = getAllRecords()
  return all[level] || {}
}

/**
 * 获取某套试卷的记录
 * @param {string} level - 等级标识
 * @param {string} setId - 试卷标识
 * @returns {Object|null} 考试记录或null
 */
export function getSetRecord(level, setId) {
  const levelRecords = getLevelRecords(level)
  return levelRecords[setId] || null
}

/**
 * 保存考试记录
 * @param {string} level - 等级标识
 * @param {string} setId - 试卷标识
 * @param {Object} record - 考试记录
 * @param {string} record.setName - 试卷名称
 * @param {number} record.score - 得分
 * @param {number} record.totalScore - 总分
 * @param {number} record.correctCount - 正确题数
 * @param {number} record.totalCount - 总题数
 * @param {number} record.duration - 答题时长（秒）
 * @param {string} record.submitTime - 提交时间
 * @param {Array} record.questions - 题目及答题数据
 */
export function saveRecord(level, setId, record) {
  try {
    const all = getAllRecords()
    if (!all[level]) {
      all[level] = {}
    }
    all[level][setId] = {
      ...record,
      updateTime: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return true
  } catch (e) {
    console.error('保存考试记录失败:', e)
    return false
  }
}

/**
 * 删除某套试卷的记录
 * @param {string} level - 等级标识
 * @param {string} setId - 试卷标识
 */
export function deleteRecord(level, setId) {
  try {
    const all = getAllRecords()
    if (all[level] && all[level][setId]) {
      delete all[level][setId]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    }
    return true
  } catch (e) {
    console.error('删除考试记录失败:', e)
    return false
  }
}

/**
 * 清空某等级的所有记录
 * @param {string} level - 等级标识
 */
export function clearLevelRecords(level) {
  try {
    const all = getAllRecords()
    if (all[level]) {
      delete all[level]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    }
    return true
  } catch (e) {
    console.error('清空等级记录失败:', e)
    return false
  }
}

/**
 * 清空所有记录
 */
export function clearAllRecords() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    console.error('清空所有记录失败:', e)
    return false
  }
}

/**
 * 检查是否有某套试卷的记录
 * @param {string} level - 等级标识
 * @param {string} setId - 试卷标识
 * @returns {boolean}
 */
export function hasRecord(level, setId) {
  return getSetRecord(level, setId) !== null
}

// ============ 草稿相关函数 ============

/**
 * 获取草稿
 * @param {string} level - 等级标识
 * @param {string} setId - 试卷标识
 * @returns {Object|null} 草稿数据或null
 */
export function getDraft(level, setId) {
  try {
    const data = localStorage.getItem(DRAFT_KEY)
    if (!data) return null
    const drafts = JSON.parse(data)
    return drafts[level]?.[setId] || null
  } catch (e) {
    console.error('读取草稿失败:', e)
    return null
  }
}

/**
 * 保存草稿
 * @param {string} level - 等级标识
 * @param {string} setId - 试卷标识
 * @param {Object} draft - 草稿数据
 * @param {number} draft.remainingTime - 剩余时间（秒）
 * @param {number} draft.currentIndex - 当前题目索引
 * @param {number} draft.startTime - 考试开始时间戳
 * @param {Object} draft.answers - 答题数据
 */
export function saveDraft(level, setId, draft) {
  try {
    const data = localStorage.getItem(DRAFT_KEY)
    const drafts = data ? JSON.parse(data) : {}
    if (!drafts[level]) {
      drafts[level] = {}
    }
    drafts[level][setId] = {
      ...draft,
      updateTime: new Date().toISOString()
    }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts))
    return true
  } catch (e) {
    console.error('保存草稿失败:', e)
    return false
  }
}

/**
 * 删除草稿
 * @param {string} level - 等级标识
 * @param {string} setId - 试卷标识
 */
export function deleteDraft(level, setId) {
  try {
    const data = localStorage.getItem(DRAFT_KEY)
    if (!data) return true
    const drafts = JSON.parse(data)
    if (drafts[level]?.[setId]) {
      delete drafts[level][setId]
      localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts))
    }
    return true
  } catch (e) {
    console.error('删除草稿失败:', e)
    return false
  }
}

/**
 * 检查是否有草稿
 * @param {string} level - 等级标识
 * @param {string} setId - 试卷标识
 * @returns {boolean}
 */
export function hasDraft(level, setId) {
  return getDraft(level, setId) !== null
}

/**
 * 格式化时长显示
 * @param {number} seconds - 秒数
 * @returns {string} 格式化的时长
 */
export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}分${secs}秒`
}

/**
 * 格式化时间显示
 * @param {string} isoString - ISO时间字符串
 * @returns {string} 格式化的时间
 */
export function formatTime(isoString) {
  const date = new Date(isoString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${month}月${day}日 ${hour}:${minute}`
}

export default {
  getAllRecords,
  getLevelRecords,
  getSetRecord,
  saveRecord,
  deleteRecord,
  clearLevelRecords,
  clearAllRecords,
  hasRecord,
  formatDuration,
  formatTime,
  // 草稿相关
  getDraft,
  saveDraft,
  deleteDraft,
  hasDraft
}
