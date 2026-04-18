import { execSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = resolve(__dirname, '..')

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
    if (!existsSync(resolve(PROJECT_ROOT, 'src'))) {
      console.log('未检测到项目源码，跳过前端构建')
      return
    }
    console.log('开始构建前端...')
    execSync('npm run build', { cwd: PROJECT_ROOT, stdio: 'inherit' })
    console.log('前端构建完成')
  } catch (err) {
    console.error('前端构建失败:', err.message)
  }
}

export { PROJECT_ROOT }
