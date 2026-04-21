/**
 * 教师口令配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

const teachers = [
  { id: 1, key: 'admin', name: '管理员' },
  { id: 2, key: '小陶老师的爱徒666', name: '小陶老师' },
  { id: 3, key: '跟成老师一起复习咯', name: '成宇轩老师' },
  { id: 4, key: '吉祥老师我来啦', name: '吉祥老师' },
  { id: 5, key: '见风老师我来啦', name: '见风老师' },
  { id: 6, key: '来咯来咯', name: '何桃老师' },
  { id: 7, key: '万俊而不是雪丰', name: '万俊老师' },
  { id: 8, key: '吴敌没有李由', name: '腾辉老师' },
  { id: 9, key: '宝贝最棒', name: '小梁老师' },
  { id: 10, key: '清婷老师666', name: '清婷老师' },
  { id: 11, key: '刘老师我来啦', name: '刘言老师' },
  { id: 12, key: '小王老师666', name: '王劲乔老师' },
  { id: 13, key: '魏老师【码】上赢', name: '魏杰老师' },
  { id: 14, key: '小魏老师我来啦', name: '魏玉芳老师' },
  { id: 15, key: '坚持就是胜利', name: '徐奥成老师' },
  { id: 16, key: '珍慧老师你最牛', name: '杨珍慧老师' },
  { id: 17, key: '千千老师我来啦', name: '张千老师' },
  { id: 18, key: '按时完课', name: '燕子老师' },
  { id: 19, key: '咕咕嘎嘎', name: '悦悦老师' },
  { id: 20, key: '苏苏老师我来啦', name: '苏苏老师' }
]

const teachersMap = {}
teachers.forEach(teacher => {
  teachersMap[teacher.key] = teacher
})

export const validateKey = (inputKey) => {
  const teacher = teachersMap[inputKey]
  return teacher
    ? { valid: true, teacherId: teacher.id, teacherName: teacher.name }
    : { valid: false, teacherId: null, teacherName: null }
}

export default { validateKey }
