/**
 * OCR提取YCL考情分析图片内容
 */
const Tesseract = require('tesseract.js')
const path = require('path')
const fs = require('fs')

const imagesDir = path.join(__dirname, '../src/data/courses/YCL')

const images = [
  { level: 'level4', file: '四级/YCL四级考情分析.png' },
  { level: 'level5', file: '五级/YCL五级考情分析.png' },
  { level: 'level6', file: '六级/YCL六级考情分析.png' }
]

async function ocrImage(imagePath, level) {
  console.log(`\n正在处理: ${level} - ${imagePath}`)
  console.log('=' .repeat(60))

  try {
    const result = await Tesseract.recognize(imagePath, 'chi_sim+eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          process.stdout.write(`\r进度: ${Math.round(m.progress * 100)}%`)
        }
      }
    })

    console.log('\n\n识别结果:')
    console.log('-'.repeat(60))
    console.log(result.data.text)
    console.log('-'.repeat(60))

    // 保存结果到文件
    const outputPath = path.join(__dirname, `${level}-ocr-result.txt`)
    fs.writeFileSync(outputPath, result.data.text, 'utf-8')
    console.log(`已保存到: ${outputPath}`)

    return result.data.text
  } catch (error) {
    console.error(`处理失败: ${error.message}`)
    return null
  }
}

async function main() {
  console.log('开始OCR提取YCL考情分析图片...\n')

  for (const img of images) {
    const fullPath = path.join(imagesDir, img.file)
    if (fs.existsSync(fullPath)) {
      await ocrImage(fullPath, img.level)
    } else {
      console.log(`文件不存在: ${fullPath}`)
    }
  }

  console.log('\n\n所有图片处理完成!')
}

main().catch(console.error)
