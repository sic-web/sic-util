import printJS from "print-js";

/**
 * 函数“sys_print”接受具有“url”属性的对象，并使用它通过“printJS”函数打印文档。
 * @param props - `props` 参数是一个具有单个属性 `url` 的对象，该属性是一个字符串。
 */
export const sys_print = (props: { url: string }) => {
  printJS(props?.url);
};
