/**
 * 函数"sys_print"接受具有“url”属性的对象，并使用它通过“printJS”函数打印文档。
 * @param props - `props` 参数是一个具有单个属性 `url` 的对象，该属性是一个字符串。
 */
declare const sys_print: (props: {
    url: string;
}) => void;
/**
 * 函数"sys_detectBrowser"检查浏览器版本，版本在当前系统兼容之外，将弹出提示
 */
declare const sys_detectBrowser: () => void;

export { sys_detectBrowser, sys_print };
