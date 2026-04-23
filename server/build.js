import { execSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import Cdn20180510 from '@alicloud/cdn20180510'
import * as OpenApi from '@alicloud/openapi-client'

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

    // 构建成功后刷新 CDN
    await purgeCDN()

    // 清理超过1天的旧构建产物
    const assetsDir = resolve(buildCwd, 'dist/assets')
    if (existsSync(assetsDir)) {
      try {
        execSync(`find ${assetsDir} -type f -mtime +1 -delete`)
        console.log('旧构建产物清理完成')
      } catch (cleanupErr) {
        console.error('清理旧构建产物失败:', cleanupErr.message)
      }
    }
  } catch (err) {
    console.error('前端构建失败:', err.message)
  }
}

async function purgeCDN() {
  const accessKeyId = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID
  const accessKeySecret = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET
  const cdnDomain = process.env.CDN_DOMAIN

  if (!accessKeyId || !accessKeySecret || !cdnDomain) {
    console.log('CDN 配置未设置，跳过刷新')
    return
  }

  try {
    const config = new OpenApi.Config({
      accessKeyId,
      accessKeySecret,
      endpoint: 'cdn.aliyuncs.com'
    })

    const client = new Cdn20180510.default(config)
    const request = new Cdn20180510.RefreshObjectCachesRequest({
      objectPath: `${cdnDomain}/index.html\n${cdnDomain}/admin/index.html`,
      objectType: 'File'
    })

    const response = await client.refreshObjectCaches(request)
    console.log('CDN 刷新成功:', response.body.requestId)
  } catch (err) {
    console.error('CDN 刷新失败:', err.message)
  }
}

export { PROJECT_ROOT }
