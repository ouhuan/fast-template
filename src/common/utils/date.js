/**
 * 日期类utils
 */

/**
 * @method
 * @desc 获取传入时间的相关信息
 * @param date 传入的日期
 * @returns object {
 *   Y: 年份
 *   M+: 月份
 *   D+: 日期
 *   H+: 小时（24h模式）
 *   h+: 小时（12h模式）
 *   m+: 分钟
 *   s+: 秒
 *   S: 毫秒
 *   t: 时间戳
 * }
 * */
export function dateObj(date) {
  if (!date) {
    date = new Date();
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'));
  }
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return {
    t: date.getTime(),
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'H+': date.getHours(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    date,
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    H: date.getHours(),
    h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    m: date.getMinutes(),
    s: date.getSeconds(),
    q: Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
}

/**
 * @method formatDate
 * @desc 将日期格式化
 * @param date 传入的日期，默认为当前日期
 * @param fmt 格式化的形式，默认为YYYY-MM-DD HH:mm:ss
 * @return string 格式化日期
 * */
export function formatDate(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  const o = dateObj(date);
  const week = {
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d',
  };

  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${o.Y}`).substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    // eslint-disable-next-line no-nested-ternary
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[`${date.getDay()}`]);
  }
  for (const [k, v] of Object.entries(o)) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (v) : ((`00${v}`).substr((`${v}`).length)));
    }
  }
  return fmt;
}

/**
 * 获取目标日期距离现在几天
 * @param {string} referenceDay 参照物日期
 * @param {string} targetDay 目标日期
 */
// eslint-disable-next-line object-curly-newline
const TIME_ALIAS_MAP = { '-2': '后', '-1': '明', 0: '今', 1: '昨', 2: '前' } // 时间别名
export function otherDay(referenceDay, targetDay, needAlias = false) {
  const { Y: referenceY, M: referenceM, D: referenceD } = dateObj(referenceDay)
  const referenceTime = dateObj(`${referenceY}/${referenceM}/${referenceD} 00:00`)

  const { Y: targetDayY, M: targetDayM, D: targetDayD } = dateObj(targetDay)
  const targetTime = dateObj(`${targetDayY}/${targetDayM}/${targetDayD} 00:00`)
  console.log('referenceTime', referenceTime)
  console.log('referenceTime', targetTime)
  // eslint-disable-next-line radix
  const tag = parseInt((referenceTime.t - targetTime.t) / 1000 / 60 / 60 / 24)
  if (needAlias && TIME_ALIAS_MAP[tag]) {
    return TIME_ALIAS_MAP[tag]
  }
  return tag
}

/**
 * @method countDown
 * @desc 计算倒计时时间
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param count 倒计时毫秒数
 * */
export function countDown({ endTime, startTime, count }) {
  let totalSecsLeft = 0;
  if (!count) {
    const start = dateObj(startTime).t;
    const end = dateObj(endTime).t;
    totalSecsLeft = end - start; // In miliseconds
    totalSecsLeft = Math.ceil(totalSecsLeft / 1000);
    totalSecsLeft = totalSecsLeft < 0 ? 0 : totalSecsLeft;
  } else {
    totalSecsLeft = Math.ceil(count / 1000);
  }
  return {
    totalSecsLeft, // 时间差
    seconds: totalSecsLeft % 60,
    minutes: Math.floor(totalSecsLeft / 60) % 60,
    hours: Math.floor(totalSecsLeft / 60 / 60) % 24,
    days: Math.floor(totalSecsLeft / 60 / 60 / 24),
    weeks: Math.floor(totalSecsLeft / 60 / 60 / 24 / 7),
    months: Math.floor(totalSecsLeft / 60 / 60 / 24 / 30),
    years: Math.floor(totalSecsLeft / 60 / 60 / 24 / 365),
  };
}

/**
 *  时间戳格式化
 *
 * */
export function fomateDateTime(inputTime) {
  let date
  if (inputTime) {
    const formatTime = inputTime.replace(/-/g, '/')
    date = new Date(formatTime);
  } else {
    date = new Date();
  }
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? (`0${m}`) : m;
  let d = date.getDate();
  d = d < 10 ? (`0${d}`) : d;
  return `${y}-${m}-${d}`;
}

/*
指定天数后日期
*/

export function addDays(date, days, seperator = '-') {
  const oDate = new Date(date).valueOf();
  let nDate = oDate + days * 24 * 3600 * 1000;
  nDate = new Date(nDate);
  const y = nDate.getFullYear().toString().padStart(2, 0);
  const m = (nDate.getMonth() + 1).toString().padStart(2, 0);
  const d = nDate.getDate().toString().padStart(2, 0);
  return `${y}${seperator}${m}${seperator}${d}`
}

/**
* @method addDay
* @desc 天数增加或者减少
* */
export function addDay(date, num = 1) {
  const { date: d, D } = dateObj(date)
  d.setDate(D + num)
  return d
}

/**
 * 计算两个时间段是否冲突
 * @param {*} originTimes {start,end}
 * @param {*} targetTimes {start,end}
 */
export function checkTimeConflict(originTimes, targetTimes) {
  const { start: originStart, end: originEnd } = originTimes
  const { start: targetStart, end: targetEnd } = targetTimes
  const startTimeArr = [];
  const endTimeArr = [];
  for (const i of [{ value: [originStart, originEnd] }, { value: [targetStart, targetEnd] }]) {
    const start = i.value[0];
    const end = i.value[1];
    startTimeArr.push(start);
    endTimeArr.push(end);
  }
  const begin = startTimeArr.sort();
  const over = endTimeArr.sort();
  for (let k = 1; k < begin.length; k++) {
    if (begin[k] < over[k - 1]) {
      return true
    }
  }
  return false
}
