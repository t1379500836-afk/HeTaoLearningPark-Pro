/**
 * 教师口令配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

const teachers = [
  { key: 'admin', name: '管理员' },
  { key: '小陶老师的爱徒666', name: '小陶老师' },
  { key: '跟成老师一起复习咯', name: '成宇轩老师' },
  { key: '吉祥老师我来啦', name: '吉祥老师' },
  { key: '见风老师我来啦', name: '见风老师' },
  { key: '来咯来咯', name: '何桃老师' },
  { key: '万俊而不是雪丰', name: '万俊老师' },
  { key: '吴敌没有李由', name: '腾辉老师' },
  { key: '宝贝最棒', name: '小梁老师' },
  { key: '清婷老师666', name: '清婷老师' },
  { key: '刘老师我来啦', name: '刘言老师' },
  { key: '小王老师666', name: '王劲乔老师' },
  { key: '魏老师【码】上赢', name: '魏杰老师' },
  { key: '小魏老师我来啦', name: '魏玉芳老师' },
  { key: '坚持就是胜利', name: '徐奥成老师' },
  { key: '珍慧老师你最牛', name: '杨珍慧老师' },
  { key: '千千老师我来啦', name: '张千老师' },
  { key: '按时完课', name: '燕子老师' },
  { key: '咕咕嘎嘎', name: '悦悦老师' },
  { key: '苏苏老师我来啦', name: '苏苏老师' },
  { key: '测试', name: '测试老师' }
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
