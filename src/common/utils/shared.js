/* eslint-disable implicit-arrow-linebreak */
/**
 * 空执行函数
 * @method noop
 */
export const noop = function noop() {};

/**
 * 是否为数组对象
 */
export function isArray(o) {
  return Object.prototype.toString.apply(o) === '[object Array]';
}

/**
 * 是否为对象
 */
export function isObject(o) {
  return Object.prototype.toString.apply(o) === '[object Object]';
}

/**
 * 是否为字符串
 */
export function isString(o) {
  return Object.prototype.toString.apply(o) === '[object String]';
}

/**
 * 是否为方法
 */
export function isFunction(o) {
  return Object.prototype.toString.apply(o) === '[object Function]';
}

/**
 * 是否为NaN
 */
export function isNaN(o) {
  if (Number.isNaN) {
    return Number.isNaN(Number(o));
  }
  // eslint-disable-next-line no-self-compare
  return o !== o;
}

/**
 * isEmpty
 * @method isEmpty
 * @return {Boolean}
 */
export function isEmpty(value) {
  if (isObject(value)) {
    return Object.getOwnPropertyNames(value).length <= 0;
  }
  // eslint-disable-next-line
  return value === null || value === undefined || value === 'null' || value === 'undefined' || value.toString().trim().length <= 0;
}

/**
 * 将数字或者数字字符串格式化 formatCurrency
 * @param {String | Number} num
 * @return {String} NumberFormatResult
 * */
export function formatCurrency(num) {
  const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
  return num && num.toString().replace(DIGIT_PATTERN, m => m.replace(MILI_PATTERN, ','));
}

export function emptyReplace(value, placeholder) {
  if (value !== undefined && value !== null) {
    return value;
  } if (placeholder !== undefined && placeholder !== null) {
    return placeholder;
  }
  return '-';
}

export function singleNumber2CH(value) {
  const map = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十',
  };
  return map[value];
}

export function ellipsis(value = '', len = 10) {
  value = value || ''
  return value.substring(0, 10) + (value.length > len ? '...' : '');
}

/**
 * 千分数处理
 * @param {number} num
 */
export function thousandBitSeparator(num) {
  const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
  return num && num.toString().replace(DIGIT_PATTERN, m => m.replace(MILI_PATTERN, ','));
}

/**
 * getScrollTop
 * @param {ScrollElement} el
 * return number
 */
export function getScrollTop(el) {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
}

/**
 * setScrollTop
 * @param {ScrollElement} el
 * @param {number} value
 * return void(0)
 */
export function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

/**
 * padZero 前面补充0
 * @param {number | string} num
 * @param {number} targetLength
 * return string
 */
export function padZero(num, targetLength = 2) {
  let str = String(num);
  while (str.length < targetLength) {
    str = `0${str}`;
  }
  return str;
}

/**
 * setRootScrollTop
 * @param {number} value
 */
export function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}

/**
 * getRootScrollTop
 * return number
 */
export function getRootScrollTop() {
  return (
    window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0
  );
}

/**
 * 简单的深拷贝
 * smipleDeepCopy
 */
export function smipleDeepCopy(source) {
  return JSON.parse(JSON.stringify(source))
}

/**
 * 用于ios11.3软键盘收起后页面未回到原位置
 * resetScroll
 */
export function resetScroll() {
  setRootScrollTop(getRootScrollTop());
}

/**
 * toFixed
 * @param {number | string} val
 * @param {number} len
 */
export function toFixed(val, len = 2) {
  if (!val) return ''
  val = Number(val)
  if (isNaN(val)) return ''
  val = String(val)
  const first = val.split('.')[0]
  const second = val.split('.')[1] || ''
  if (second.length < len) {
    return `${first}${second ? `.${second}` : ''}`
  }
  val = Number(val)
  return val.toFixed(len)
}

/**
 * checkTelephone
 * @param {number | string} rule
 * @param {number} value
 * @param {Function} callback
 */
const TelephoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
const fixedTelReg = /^0[0-9]{2,3}-?[0-9]{7,8}$/;

export function checkTelephone(rule, value, callback) {
  if (!value) return callback(new Error('电话不能为空'));
  if (value.startsWith(0)) {
    return fixedTelReg.test(value) ? callback() : callback(new Error('请输入正确的电话号码'))
  }
  TelephoneReg.test(value) ? callback() : callback(new Error('请输入正确的手机号'))
}

/**
 * removeRepeat 去重数组中的对象
 * @param {array} origin 原数组
 * @param {string} key 根据什么去重
 */
export function removeRepeat(origin, key) {
  const obj = {};
  const arr = origin.reduce((item, next) => {
    if (!obj[next[key]]) {
      item.push(next);
      obj[next[key]] = true;
    }
    return item;
  }, []);
  return arr
}

/**
 * setArrKeyNoDiff 把数据树中key不一致的子元素赋值一致
 * @param {array} arr 原数组
 * @param {string} originKey 不一致的key
 * @param {string} newKey 最终的key
 */
export function setArrKeyNoDiff(arr, originKey, newKey) {
  arr = arr || []
  arr.forEach((element) => {
    const valueArray = element[originKey] || element[newKey]
    element[originKey] && (element[newKey] = element[originKey])
    if (Array.isArray(valueArray)) {
      return setArrKeyNoDiff(valueArray, originKey, newKey)
    }
  });
  return arr
}
// 随机生成32位数
export function create32Str() {
  let pwd = ''
  const $chars = '123456789'
  const maxPos = $chars.length
  for (let i = 0; i < 5; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd
}
// 生成一个a标签打开一个链接
export function openLinkFile(url) {
  const aLink = document.createElement('a');
  const evt = document.createEvent('HTMLEvents');
  // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  evt.initEvent('click', true, true);
  aLink.href = url
  aLink.target = '_blank'
  // 兼容火狐
  aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
}
export function createExcal(res, name) {
  const aTag = document.createElement('a');
  // 创建一个blob对象
  const blob = new Blob([res], {
    // Excel文件版本
    type: 'application/vnd.ms-excel',
  });
  aTag.download = name; // 下载的文件名
  aTag.href = URL.createObjectURL(blob); // 创建一个URL对象
  aTag.click();
  URL.revokeObjectURL(blob);
}


/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c =>
    // eslint-disable-next-line no-bitwise
    (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16))
}

/**
 * 转换成树形数据
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  const res = [];
  const temp = {};
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i];
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]].children) {
        temp[data[k][pid]].children = [];
      }
      if (!temp[data[k][pid]]._level) {
        temp[data[k][pid]]._level = 1;
      }
      data[k]._level = temp[data[k][pid]]._level + 1;
      temp[data[k][pid]].children.push(data[k]);
    } else {
      res.push(data[k]);
    }
  }
  return res;
}

/**
 * 树形数据转换成列表
 * @param {*} treeObj
 * @param {*} id
 * @param {*} pid
 */
export function tree2List(treeObj, childrenkey = 'son', list = []) {
  const children = treeObj[childrenkey] || [];
  for (let i = 0; i < children.length; i++) {
    tree2List(children[i], childrenkey, list)
  }
  const newTreeObj = {
    ...treeObj,
  }
  delete newTreeObj[childrenkey]
  list.push(newTreeObj)
  return list
}

export function file2Blob(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // 获取到 file文件
    reader.onload = function (event) {
      const blob = new Blob([event.target.result], { type: file.type });
      window.URL = window.URL || window.webkitURL;
      const blobURL = window.URL.createObjectURL(blob);
      resolve(blobURL)
    }
    reader.onerror = (err) => {
      reject(err)
    }
    reader.readAsArrayBuffer(file);
  })
}
