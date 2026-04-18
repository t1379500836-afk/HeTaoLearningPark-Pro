/**
 * 消息数据配置文件
 * 由后端服务自动生成，请勿手动编辑
 */

const messagesData = {
    'admin': {
      teacherName: '管理员',
      teacherMessages: [
        { id: 22, title: '未完课名单', content: '1\n1\n1\n1\n1\n\n1\n1\n1\n1\n1\n\n1', createdAt: '2026-04-18T20:52:26.000Z' },
        { id: 20, title: '😊', content: '🌈🎵', createdAt: '2026-04-18T17:43:49.000Z' },
        { id: 5, title: '', content: '2\n小陶老师\n4月19日 01:19\n1\n小陶老师\n4月19日 01:19\nhello~', createdAt: '2026-04-18T17:20:23.000Z' }
      ]
    },
    '小陶老师': {
      teacherName: '小陶老师',
      teacherMessages: [
        { id: 24, title: '1111', content: '11111111', createdAt: '2026-04-18T21:05:42.000Z' },
        { id: 23, title: '未完课名单如下。。。。。。。。。', content: '1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n11\n1\n\n\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n11\n1\n\n\n1\n1\n1\n1\n1\n1', createdAt: '2026-04-18T20:53:34.000Z' }
      ]
    },
    '测试1': {
      teacherName: '测试1老师',
      teacherMessages: [

      ]
    },
    'key-zhangsan': {
      teacherName: '张老师',
      teacherMessages: [

      ]
    },
    'key-lisi': {
      teacherName: '李老师',
      teacherMessages: [

      ]
    },
    'key-wangwu': {
      teacherName: '王老师',
      teacherMessages: [

      ]
    },
    'key-zhaoliu': {
      teacherName: '赵老师',
      teacherMessages: [

      ]
    },
    'key-sunqi': {
      teacherName: '孙老师',
      teacherMessages: [

      ]
    },
    'key-zhouba': {
      teacherName: '周老师',
      teacherMessages: [

      ]
    },
    'key-wujiu': {
      teacherName: '吴老师',
      teacherMessages: [

      ]
    },
    'key-zhengshi': {
      teacherName: '郑老师',
      teacherMessages: [

      ]
    },
    'key-chen11': {
      teacherName: '陈老师',
      teacherMessages: [

      ]
    },
    'key-huang12': {
      teacherName: '黄老师',
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
