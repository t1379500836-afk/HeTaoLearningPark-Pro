/**
 * 消息数据配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

const messagesData = {
    'admin': {
      teacherName: '管理员',
      teacherMessages: [

      ]
    },
    '小陶老师的爱徒666': {
      teacherName: '小陶老师',
      teacherMessages: [
        { id: 30, title: '11', content: '1111', createdAt: '2026-04-20T19:29:22.000Z' }
      ]
    },
    '跟成老师一起复习咯': {
      teacherName: '成宇轩老师',
      teacherMessages: [

      ]
    },
    '吉祥老师我来啦': {
      teacherName: '吉祥老师',
      teacherMessages: [

      ]
    },
    '见风老师我来啦': {
      teacherName: '见风老师',
      teacherMessages: [

      ]
    },
    '来咯来咯': {
      teacherName: '何桃老师',
      teacherMessages: [

      ]
    },
    '万俊而不是雪丰': {
      teacherName: '万俊老师',
      teacherMessages: [

      ]
    },
    '吴敌没有李由': {
      teacherName: '腾辉老师',
      teacherMessages: [

      ]
    },
    '宝贝最棒': {
      teacherName: '小梁老师',
      teacherMessages: [

      ]
    },
    '清婷老师666': {
      teacherName: '清婷老师',
      teacherMessages: [

      ]
    },
    '刘老师我来啦': {
      teacherName: '刘言老师',
      teacherMessages: [

      ]
    },
    '小王老师666': {
      teacherName: '王劲乔老师',
      teacherMessages: [

      ]
    },
    '魏老师【码】上赢': {
      teacherName: '魏杰老师',
      teacherMessages: [

      ]
    },
    '小魏老师我来啦': {
      teacherName: '魏玉芳老师',
      teacherMessages: [

      ]
    },
    '坚持就是胜利': {
      teacherName: '徐奥成老师',
      teacherMessages: [

      ]
    },
    '珍慧老师你最牛': {
      teacherName: '杨珍慧老师',
      teacherMessages: [

      ]
    },
    '千千老师我来啦': {
      teacherName: '张千老师',
      teacherMessages: [

      ]
    },
    '按时完课': {
      teacherName: '燕子老师',
      teacherMessages: [

      ]
    },
    '咕咕嘎嘎': {
      teacherName: '悦悦老师',
      teacherMessages: [

      ]
    },
    '苏苏老师我来啦': {
      teacherName: '苏苏老师',
      teacherMessages: [

      ]
    },
    '测试': {
      teacherName: '测试老师',
      teacherMessages: [

      ]
    }
}

export const getMessages = (teacherKey) => messagesData[teacherKey] || { teacherMessages: [] }

export const getTeacherInfo = (teacherKey) => {
  const data = messagesData[teacherKey]
  return data ? { teacherName: data.teacherName || '' } : { teacherName: '' }
}

export const getLatestTeacherMessage = (teacherKey) => {
  const data = messagesData[teacherKey]
  return data?.teacherMessages?.[0] || null
}

export default { getMessages, getLatestTeacherMessage }
