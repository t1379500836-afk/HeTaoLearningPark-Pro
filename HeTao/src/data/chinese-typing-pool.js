/**
 * 中文打字练习资料库
 * 包含古诗词和成语俗语，与课程内容无关
 */

// 按难度分级的古诗词
export const poemsByDifficulty = {
  easy: [
    // 五言绝句（简单）
    { title: '静夜思', author: '李白', content: '床前明月光，疑是地上霜。', lines: ['床前明月光', '疑是地上霜'] },
    { title: '春晓', author: '孟浩然', content: '春眠不觉晓，处处闻啼鸟。', lines: ['春眠不觉晓', '处处闻啼鸟'] },
    { title: '登鹳雀楼', author: '王之涣', content: '白日依山尽，黄河入海流。', lines: ['白日依山尽', '黄河入海流'] },
    { title: '江雪', author: '柳宗元', content: '千山鸟飞绝，万径人踪灭。', lines: ['千山鸟飞绝', '万径人踪灭'] },
    { title: '寻隐者不遇', author: '贾岛', content: '松下问童子，言师采药去。', lines: ['松下问童子', '言师采药去'] },
    { title: '鹿柴', author: '王维', content: '空山不见人，但闻人语响。', lines: ['空山不见人', '但闻人语响'] },
    { title: '相思', author: '王维', content: '红豆生南国，春来发几枝。', lines: ['红豆生南国', '春来发几枝'] },
    { title: '杂诗', author: '王维', content: '君自故乡来，应知故乡事。', lines: ['君自故乡来', '应知故乡事'] },
  ],
  medium: [
    // 七言绝句（中等）
    { title: '早发白帝城', author: '李白', content: '朝辞白帝彩云间，千里江陵一日还。', lines: ['朝辞白帝彩云间', '千里江陵一日还'] },
    { title: '望庐山瀑布', author: '李白', content: '飞流直下三千尺，疑是银河落九天。', lines: ['飞流直下三千尺', '疑是银河落九天'] },
    { title: '赠汪伦', author: '李白', content: '桃花潭水深千尺，不及汪伦送我情。', lines: ['桃花潭水深千尺', '不及汪伦送我情'] },
    { title: '绝句', author: '杜甫', content: '两个黄鹂鸣翠柳，一行白鹭上青天。', lines: ['两个黄鹂鸣翠柳', '一行白鹭上青天'] },
    { title: '春夜喜雨', author: '杜甫', content: '好雨知时节，当春乃发生。', lines: ['好雨知时节', '当春乃发生'] },
    { title: '游子吟', author: '孟郊', content: '谁言寸草心，报得三春晖。', lines: ['谁言寸草心', '报得三春晖'] },
    { title: '泊船瓜洲', author: '王安石', content: '春风又绿江南岸，明月何时照我还。', lines: ['春风又绿江南岸', '明月何时照我还'] },
    { title: '题西林壁', author: '苏轼', content: '不识庐山真面目，只缘身在此山中。', lines: ['不识庐山真面目', '只缘身在此山中'] },
  ],
  hard: [
    // 长诗和较复杂诗句（困难）
    { title: '将进酒', author: '李白', content: '君不见黄河之水天上来，奔流到海不复回。', lines: ['君不见黄河之水天上来', '奔流到海不复回'] },
    { title: '水调歌头', author: '苏轼', content: '明月几时有，把酒问青天。', lines: ['明月几时有', '把酒问青天'] },
    { title: '念奴娇', author: '苏轼', content: '大江东去，浪淘尽，千古风流人物。', lines: ['大江东去', '浪淘尽', '千古风流人物'] },
    { title: '虞美人', author: '李煜', content: '春花秋月何时了，往事知多少。', lines: ['春花秋月何时了', '往事知多少'] },
    { title: '声声慢', author: '李清照', content: '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。', lines: ['寻寻觅觅', '冷冷清清', '凄凄惨惨戚戚'] },
    { title: '满江红', author: '岳飞', content: '三十功名尘与土，八千里路云和月。', lines: ['三十功名尘与土', '八千里路云和月'] },
  ]
}

// 按难度分级的成语俗语
export const idiomsByDifficulty = {
  easy: [
    // 四字成语（简单常用）
    '一马当先',
    '一心一意',
    '三心二意',
    '五湖四海',
    '七上八下',
    '十全十美',
    '千军万马',
    '万紫千红',
    '画龙点睛',
    '守株待兔',
    '亡羊补牢',
    '井底之蛙',
    '狐假虎威',
    '刻舟求剑',
    '掩耳盗铃',
    '拔苗助长',
    '对牛弹琴',
    '盲人摸象',
    '班门弄斧',
    '杞人忧天',
  ],
  medium: [
    // 四字成语（中等难度）
    '春暖花开',
    '鸟语花香',
    '风和日丽',
    '倾盆大雨',
    '大雪纷飞',
    '秋高气爽',
    '烈日当空',
    '云雾缭绕',
    '生机勃勃',
    '兴高采烈',
    '手舞足蹈',
    '眉开眼笑',
    '欢天喜地',
    '欣喜若狂',
    '垂头丧气',
    '愁眉苦脸',
    '惊慌失措',
    '目瞪口呆',
    '哑口无言',
    '手忙脚乱',
  ],
  hard: [
    // 多字成语和俗语（困难）
    '千里之行，始于足下',
    '世上无难事，只怕有心人',
    '少壮不努力，老大徒伤悲',
    '书山有路勤为径，学海无涯苦作舟',
    '宝剑锋从磨砺出，梅花香自苦寒来',
    '路遥知马力，日久见人心',
    '海内存知己，天涯若比邻',
    '劝君更尽一杯酒，西出阳关无故人',
    '莫愁前路无知己，天下谁人不识君',
    '山重水复疑无路，柳暗花明又一村',
  ]
}

// 获取随机古诗词诗句
export function getRandomPoems(count = 5, difficulty = 'mixed') {
  let poems = []

  if (difficulty === 'mixed') {
    // 混合所有难度
    poems = [
      ...poemsByDifficulty.easy,
      ...poemsByDifficulty.medium,
      ...poemsByDifficulty.hard
    ]
  } else {
    poems = poemsByDifficulty[difficulty] || []
  }

  // Fisher-Yates 洗牌算法
  const shuffled = [...poems]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // 提取诗句并限制数量
  const result = []
  for (const poem of shuffled) {
    for (const line of poem.lines) {
      if (result.length >= count) break
      result.push({
        text: line,
        title: poem.title,
        author: poem.author,
        type: 'poem'
      })
    }
    if (result.length >= count) break
  }

  return result
}

// 获取随机成语
export function getRandomIdioms(count = 5, difficulty = 'mixed') {
  let idioms = []

  if (difficulty === 'mixed') {
    idioms = [
      ...idiomsByDifficulty.easy,
      ...idiomsByDifficulty.medium,
      ...idiomsByDifficulty.hard
    ]
  } else {
    idioms = idiomsByDifficulty[difficulty] || []
  }

  // Fisher-Yates 洗牌算法
  const shuffled = [...idioms]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, count).map(text => ({
    text,
    type: 'idiom'
  }))
}

// 获取混合内容（诗词+成语）
export function getMixedContent(count = 5, difficulty = 'mixed') {
  const halfCount = Math.ceil(count / 2)
  const poems = getRandomPoems(halfCount, difficulty)
  const idioms = getRandomIdioms(count - halfCount, difficulty)

  // 混合并打乱
  const mixed = [...poems, ...idioms]
  for (let i = mixed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[mixed[i], mixed[j]] = [mixed[j], mixed[i]]
  }

  return mixed
}

// 默认导出所有数据
export default {
  poemsByDifficulty,
  idiomsByDifficulty,
  getRandomPoems,
  getRandomIdioms,
  getMixedContent
}
