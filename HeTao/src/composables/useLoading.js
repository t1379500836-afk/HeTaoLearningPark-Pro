/**
 * useLoading - 全局加载状态管理
 *
 * 用于控制页面切换时的全局 loading 动画
 */

import { ref } from 'vue'

// 全局 loading 状态（单例模式）
const isLoading = ref(false)
const loadingText = ref('加载中...')

// 页面就绪状态
const pageReady = ref(false)
let readyTimer = null
let timeoutTimer = null

// 时间配置
const DEFAULT_DELAY = 500    // 默认延迟隐藏时间
const TIMEOUT = 5000         // 超时保护时间

/**
 * 显示全局 loading
 * @param {string} text - loading 提示文字
 */
export function showLoading(text = '加载中...') {
  loadingText.value = text
  isLoading.value = true
  pageReady.value = false

  // 清除之前的定时器
  if (readyTimer) clearTimeout(readyTimer)
  if (timeoutTimer) clearTimeout(timeoutTimer)

  // 设置超时保护
  timeoutTimer = setTimeout(() => {
    hideLoading()
  }, TIMEOUT)
}

/**
 * 隐藏全局 loading
 */
export function hideLoading() {
  if (readyTimer) clearTimeout(readyTimer)
  if (timeoutTimer) clearTimeout(timeoutTimer)
  isLoading.value = false
}

/**
 * 通知页面已准备好（由页面组件调用）
 */
export function notifyPageReady() {
  pageReady.value = true
  hideLoading()
}

/**
 * 开始等待页面就绪
 * - 如果页面调用 notifyPageReady()，立即隐藏
 * - 否则在 DEFAULT_DELAY 后自动隐藏
 */
export function waitForPageReady() {
  // 如果页面已经准备好，直接隐藏
  if (pageReady.value) {
    hideLoading()
    return
  }

  // 否则设置默认延迟
  readyTimer = setTimeout(() => {
    hideLoading()
  }, DEFAULT_DELAY)
}

/**
 * 获取 loading 状态的 composable
 */
export function useLoading() {
  return {
    isLoading,
    loadingText,
    showLoading,
    hideLoading
  }
}

export default useLoading
