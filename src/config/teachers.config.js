/**
 * 教师口令配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

const teachers = [
  { key: 'admin', name: '管理员' },
  { key: '小陶老师', name: '小陶老师' },
  { key: '测试1', name: '测试1老师' }
]

const teachersMap = {}
teachers.forEach(teacher => {
  teachersMap[teacher.key] = teacher.name
})

export const validateKey = (inputKey) => {
  const teacherName = teachersMap[inputKey]
  return teacherName
    ? { valid: true, teacherName }
    : { valid: false, teacherName: null }
}

export default { validateKey }
