/**
 * 函数 "files_open" 打开一个文件，如果该文件再浏览器无法预览，会实现下载功能
 * @param {string} url 必填参数，传入的文件的url
 * @param {string=} name 可选参数，传入的文件的文件名。如果不提供，默认使用URL中的文件名
 */
declare const files_open: (props: {
    url: string;
    name?: string;
}) => void;

export { files_open };
