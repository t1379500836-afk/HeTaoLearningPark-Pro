# 上线前待恢复项

以下三处为测试便利而临时修改，部署上线前需逐一恢复。

## 1. 心跳间隔：1 秒 → 3 分钟

**文件：** `src/composables/useDauTracker.js` 第 6 行

```diff
- const THREE_MINUTES = 1 * 1000 // 测试：1秒，正式改为 3 * 60 * 1000
+ const THREE_MINUTES = 3 * 60 * 1000
```

## 2. UUID 存储：sessionStorage → localStorage

**文件：** `src/composables/useDauTracker.js` `getOrCreateUUID()` 函数

```diff
  function getOrCreateUUID() {
-   // 测试：用 sessionStorage，关闭浏览器即清除。正式改回 localStorage
-   let uuid = sessionStorage.getItem(STORAGE_KEY)
    if (!uuid) {
      uuid = crypto.randomUUID()
-     sessionStorage.setItem(STORAGE_KEY, uuid)
+   let uuid = localStorage.getItem(STORAGE_KEY)
+   if (!uuid) {
+     uuid = crypto.randomUUID()
+     localStorage.setItem(STORAGE_KEY, uuid)
    }
    return uuid
  }
```

## 3. 恢复 IP 频率限制

**文件：** `server/routes/stats.js` 第 37 行

```diff
- // POST /api/stats/heartbeat — 学生端匿名上报（测试阶段暂时关闭频率限制）
- router.post('/heartbeat', async (req, res) => {
+ // POST /api/stats/heartbeat — 学生端匿名上报
+ router.post('/heartbeat', checkRateLimit, async (req, res) => {
```

## 附：调试日志（可选清理）

`src/composables/useDauTracker.js` 中有三处 `console.log` / `console.error` 调试日志，上线时可删除。
