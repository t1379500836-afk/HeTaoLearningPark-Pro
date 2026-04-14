/**
 * 教师口令配置文件
 *
 * 口令是"身份标识"而非"秘密"
 * 其他组老师即使知道口令，因为显示的不是自己名字，也不会拿给学生用
 *
 * 加密方式：Base64 编码（简单混淆，防肉眼查看）
 */

// 解密函数
const decrypt = (str) => {
  try {
    // Node.js 的 Buffer.toString('base64') 产生 UTF-8 编码
    // 浏览器 atob() 解码后用 TextDecoder 正确处理中文
    const binaryString = atob(str)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return new TextDecoder('utf-8').decode(bytes)
  } catch {
    return null
  }
}

// 教师配置（口令已加密）
// 添加新教师步骤：
// 在 Node.js 中执行：Buffer.from('口令').toString('base64')
// 然后在下方数组中添加 { key: '加密值', name: '教师名称' }
const encryptedTeachers = [
  { key: '6Lef5oiQ6ICB5biI5LiA6LW35aSN5Lmg5ZKv', name: '成宇轩老师' },
  { key: '5ZCJ56Wl6ICB5biI5oiR5p2l5ZWm', name: '吉祥老师' },
  { key: '6KeB6aOO6ICB5biI5oiR5p2l5ZWm', name: '见风老师' },
  { key: '5p2l5ZKv5p2l5ZKv', name: '何桃老师' },
  { key: '5LiH5L+K6ICM5LiN5piv6Zuq5Liw', name: '万俊老师' },
  { key: '5ZC05pWM5rKh5pyJ5p2O55Sx', name: '腾辉老师' },
  { key: '5a6d6LSd5pyA5qOS', name: '小梁老师' },
  { key: '5riF5am36ICB5biINjY2', name: '清婷老师' },
  { key: '5YiY6ICB5biI5oiR5p2l5ZWm', name: '刘言老师' },
  { key: '5bCP6Zm26ICB5biI55qE54ix5b6SNjY2', name: '小陶老师' },
  { key: '5bCP546L6ICB5biINjY2', name: '王劲乔老师' },
  { key: '6a2P6ICB5biI44CQ56CB44CR5LiK6LWi', name: '魏杰老师' },
  { key: '5bCP6a2P6ICB5biI5oiR5p2l5ZWm', name: '魏玉芳老师' },
  { key: '5Z2a5oyB5bCx5piv6IOc5Yip', name: '徐奥成老师' },
  { key: '54+N5oWn6ICB5biI5L2g5pyA54mb', name: '杨珍慧老师' },
  { key: '5Y2D5Y2D6ICB5biI5oiR5p2l5ZWm', name: '张千老师' },
  { key: '5oyJ5pe25a6M6K++', name: '燕子老师' },
  { key: '5ZKV5ZKV5ZiO5ZiO', name: '悦悦老师' },
]

// 解密后的教师映射表
const teachersMap = {}
encryptedTeachers.forEach(teacher => {
  const decryptedKey = decrypt(teacher.key)
  if (decryptedKey) {
    teachersMap[decryptedKey] = teacher.name
  }
})

/**
 * 验证口令
 * @param {string} inputKey - 用户输入的口令
 * @returns {object} - { valid: boolean, teacherName: string|null }
 */
export const validateKey = (inputKey) => {
  const teacherName = teachersMap[inputKey]
  if (teacherName) {
    return { valid: true, teacherName }
  }
  return { valid: false, teacherName: null }
}

/**
 * 获取所有教师列表（仅用于调试，生产环境可删除）
 * @returns {Array} - 教师列表
 */
export const getAllTeachers = () => {
  return encryptedTeachers.map(t => ({
    name: t.name,
    key: decrypt(t.key)
  }))
}

export default {
  validateKey,
  getAllTeachers
}
