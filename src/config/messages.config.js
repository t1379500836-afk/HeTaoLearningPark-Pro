/**
 * 消息数据配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

const messagesData = {
    1: {
      teacherKey: 'admin',
      teacherName: '管理员',
      teacherMessages: [

      ]
    },
    2: {
      teacherKey: '小陶老师的爱徒666',
      teacherName: '小陶老师',
      teacherMessages: [
        { id: 4, title: '22', content: '222', createdAt: '2026-04-22T02:12:33' },
        { id: 3, title: '111', content: '111', createdAt: '2026-04-22T02:11:29' }
      ]
    },
    3: {
      teacherKey: '跟成老师一起复习咯',
      teacherName: '成宇轩老师',
      teacherMessages: [

      ]
    },
    4: {
      teacherKey: '吉祥老师我来啦',
      teacherName: '吉祥老师',
      teacherMessages: [

      ]
    },
    5: {
      teacherKey: '见风老师我来啦',
      teacherName: '见风老师',
      teacherMessages: [

      ]
    },
    6: {
      teacherKey: '来咯来咯',
      teacherName: '何桃老师',
      teacherMessages: [

      ]
    },
    7: {
      teacherKey: '万俊而不是雪丰',
      teacherName: '万俊老师',
      teacherMessages: [

      ]
    },
    8: {
      teacherKey: '吴敌没有李由',
      teacherName: '腾辉老师',
      teacherMessages: [

      ]
    },
    9: {
      teacherKey: '宝贝最棒',
      teacherName: '小梁老师',
      teacherMessages: [

      ]
    },
    10: {
      teacherKey: '清婷老师666',
      teacherName: '清婷老师',
      teacherMessages: [

      ]
    },
    11: {
      teacherKey: '刘老师我来啦',
      teacherName: '刘言老师',
      teacherMessages: [

      ]
    },
    12: {
      teacherKey: '小王老师666',
      teacherName: '王劲乔老师',
      teacherMessages: [

      ]
    },
    13: {
      teacherKey: '魏老师【码】上赢',
      teacherName: '魏杰老师',
      teacherMessages: [

      ]
    },
    14: {
      teacherKey: '小魏老师我来啦',
      teacherName: '魏玉芳老师',
      teacherMessages: [

      ]
    },
    15: {
      teacherKey: '坚持就是胜利',
      teacherName: '徐奥成老师',
      teacherMessages: [

      ]
    },
    16: {
      teacherKey: '珍慧老师你最牛',
      teacherName: '杨珍慧老师',
      teacherMessages: [

      ]
    },
    17: {
      teacherKey: '千千老师我来啦',
      teacherName: '张千老师',
      teacherMessages: [

      ]
    },
    18: {
      teacherKey: '按时完课',
      teacherName: '燕子老师',
      teacherMessages: [

      ]
    },
    19: {
      teacherKey: '咕咕嘎嘎',
      teacherName: '悦悦老师',
      teacherMessages: [

      ]
    },
    20: {
      teacherKey: '苏苏老师我来啦',
      teacherName: '苏苏老师',
      teacherMessages: [

      ]
    },
    21: {
      teacherKey: '测试',
      teacherName: '测试老师',
      teacherMessages: [

      ]
    }
}

export const getMessages = (teacherId) => messagesData[teacherId] || { teacherMessages: [] }

export const getTeacherInfo = (teacherId) => {
  const data = messagesData[teacherId]
  return data ? { teacherName: data.teacherName || '', teacherKey: data.teacherKey || '' } : { teacherName: '', teacherKey: '' }
}

export const getLatestTeacherMessage = (teacherId) => {
  const data = messagesData[teacherId]
  return data?.teacherMessages?.[0] || null
}

export default { getMessages, getLatestTeacherMessage }
