// 由一个组件，向上找到最近的指定组件
export function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
// 由一个组件，向上找到所有的指定组件
export function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}
// 由一个组件，向下找到最近的指定组件
export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;
  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}
// 由一个组件，向下找到所有指定的组件
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, [])
}
// 由一个组件，找到指定组件的兄弟组件
export function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

// 节流
export function throttle(func, wait = 0, options = {}) {
  const { leading = true, maxWait, trailing } = options
  const ref = {
    t: undefined,
    isExecute: false,
    maxWaitTimer: undefined,
    last: undefined,
  }
  return function (...args) {
    const main = () => func.apply(null, args)
    if ('maxWait' in options && !ref.maxWaitTimer) {
      ref.maxWaitTimer = setTimeout(() => {
        if (!ref.isExecute) {
          ref.maxWaitTimer = undefined
          return main()
        }
      }, maxWait);
    }
    if (!ref.isExecute) {
      if (leading) {
        ref.isExecute = true
        main()
      }
      if (!ref.last && trailing) {
        // 先记录下等下trailing模式要执行的函数
        ref.last = main
      }
    }
    if (ref.t === undefined) {
      ref.t = setTimeout(() => {
        // wait时间内只能执行一次
        ref.isExecute = false
        ref.t = undefined
        if (ref.last && trailing) {
          // 执行记录下来的函数
          ref.isExecute = true
          ref.last()
          ref.last = undefined
        }
      }, wait);
    }
  }
}

// 判断类型
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

// 深拷贝
export function deepCopy(data) {
  const t = typeOf(data);
  let o;
  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {}
  } else {
    return data;
  }
  if (t === "array") {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o;
}