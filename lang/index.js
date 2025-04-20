
    // 导入国际化JSON文件
    import langJSON from './index.json'
    (function () {
    // 定义翻译函数
    let $t = function (key, val, nameSpace) {
      // 获取指定命名空间下的语言包
      const langPackage = $t[nameSpace];
      // 返回翻译结果，如果不存在则返回默认值
      return (langPackage || {})[key] || val;
    };
    // 定义简单翻译函数，直接返回传入的值
    let $$t = function (val) {
      return val;
    };
    globalThis.$deepScan = function (val) {
      return val;
    };
    // 定义设置语言包的方法
    $t.locale = function (locale, nameSpace) {
      // 将指定命名空间下的语言包设置为传入的locale
      $t[nameSpace] = locale || {};
    };
    // 将翻译函数挂载到globalThis对象上，如果已经存在则使用已有的
    globalThis.$t = globalThis.$t || $t;
    // 将简单翻译函数挂载到globalThis对象上
    globalThis.$$t = $$t;
    // 定义从JSON文件中获取指定键的语言对象的方法
    globalThis._getJSONKey = function (key, insertJSONObj = undefined) {
        // 获取JSON对象
        const JSONObj = insertJSONObj;
        // 初始化语言对象
        const langObj = {};
        // 遍历JSON对象的所有键
        Object.keys(JSONObj).forEach((value) => {
            // 将每个语言的对应键值添加到语言对象中
            langObj[value] = JSONObj[value][key];
        });
        // 返回语言对象
        return langObj;
    };
    })();
    // 定义语言映射对象
    const langMap = {
        'en': (globalThis && globalThis.lang && globalThis.lang.en) ? globalThis.lang.en : globalThis._getJSONKey('en', langJSON),
'ko': (globalThis && globalThis.lang && globalThis.lang.ko) ? globalThis.lang.ko : globalThis._getJSONKey('ko', langJSON),
'ja': (globalThis && globalThis.lang && globalThis.lang.ja) ? globalThis.lang.ja : globalThis._getJSONKey('ja', langJSON),
'zhcn': (globalThis && globalThis.lang && globalThis.lang.zhcn) ? globalThis.lang.zhcn : globalThis._getJSONKey('zh-cn', langJSON)
    };
    // 存储语言是否存在
    // 判断 globalThis.localStorage.getItem 是否为函数
    const isFunction = (fn) => {
        return typeof fn === 'function';
    };
    const withStorageLang = isFunction && globalThis && globalThis.localStorage && 
    isFunction(globalThis.localStorage.getItem) && globalThis.localStorage.getItem('lang');
    // 从本地存储中获取当前语言，如果不存在则使用源语言
    const lang = withStorageLang ? globalThis.localStorage.getItem('lang') : 'zhcn';
    // 根据当前语言设置翻译函数的语言包
    globalThis.$t.locale(langMap[lang], 'lang');
  