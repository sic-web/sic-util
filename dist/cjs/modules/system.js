'use strict';

var printJS = require('print-js');
var detectBrowser = require('detect-browser');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var detectBrowser__namespace = /*#__PURE__*/_interopNamespaceDefault(detectBrowser);

/**
 * 函数"sys_print"接受具有“url”属性的对象，并使用它通过“printJS”函数打印文档。
 * @param props - `props` 参数是一个具有单个属性 `url` 的对象，该属性是一个字符串。
 */
const sys_print = (props) => {
    printJS(props?.url);
};
const BrowserNameVersion = [
    { name: "chrome", version: 88 },
    { name: "safari", version: 14 },
    { name: "firefox", version: 78 },
    { name: "opera", version: 74 },
    { name: "edge-chromium", version: 88 },
];
/**
 * 函数"sys_detectBrowser"检查浏览器版本，版本在当前系统兼容之外，将弹出提示
 */
const sys_detectBrowser = () => {
    const browser = detectBrowser__namespace.detect();
    if (browser) {
        let isShowAlert = false;
        const currentBrowser = BrowserNameVersion?.filter((item) => item.name === browser.name)?.[0];
        if (currentBrowser?.version && browser?.version && parseInt(browser?.version) < currentBrowser?.version) {
            isShowAlert = true;
        }
        if (isShowAlert) {
            alert("您当前的浏览器版本较低，请考虑升级浏览器版本或使用其他浏览器以获取最佳体验。");
        }
    }
};

exports.sys_detectBrowser = sys_detectBrowser;
exports.sys_print = sys_print;
