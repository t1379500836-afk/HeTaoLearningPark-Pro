import { execSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = resolve(__dirname, '..')

// 学生端源码路径：优先使用 user/src（服务器），否则使用 src（本地）
async function getUserSrcPath() {
  const { existsSync } = await import('fs')
  const userPath = resolve(PROJECT_ROOT, 'user/src')
  const srcPath = resolve(PROJECT_ROOT, 'src')
  return existsSync(userPath) ? userPath : srcPath
}

let needsBuild = false

// 每 10 分钟检查一次，有变更才构建
setInterval(() => {
  if (!needsBuild) return
  needsBuild = false
  runBuild()
}, 10 * 60 * 1000)

export function scheduleBuild() {
  needsBuild = true
}

export async function runBuild() {
  try {
    const { existsSync } = await import('fs')
    const userSrcPath = await getUserSrcPath()
    if (!existsSync(userSrcPath)) {
      console.log('未检测到项目源码，跳过前端构建')
      return
    }
    // 根据路径判断构建目录
    const buildCwd = userSrcPath.includes('user/src')
      ? resolve(PROJECT_ROOT, 'user')
      : PROJECT_ROOT
    console.log('开始构建前端...')
    execSync('npm run build', { cwd: buildCwd, stdio: 'inherit' })
    console.log('前端构建完成')
  } catch (err) {
    console.error('前端构建失败:', err.message)
  }
}

export { PROJECT_ROOT }
