interface IProps {
    url: string;
    name?: string;
}
/**
 * 函数“file_calculate_md5”读取一个文件，计算其 MD5 哈希值，并将哈希值作为 Promise 返回。
 * @param {any} file - `file_calculate_md5` 函数将文件作为输入，并使用 CryptoJS 库计算文件内容的 MD5 哈希值。`file` 参数表示要计算 MD5
 * 哈希值的文件。
 * @returns 一旦文件被读取并处理完毕，`file_calculate_md5` 函数就会返回一个 Promise，该 Promise 会使用文件内容的 MD5 哈希值进行解析。
 */
declare const file_calculate_md5: (file: any) => Promise<unknown>;
/**
 * 函数 "file_open" 打开一个文件，如果该文件再浏览器无法预览，会实现下载功能
 * @param {string} url 必填参数，传入的文件的url
 * @param {string=} name 可选参数，传入的文件的文件名。如果不提供，默认使用URL中的文件名
 */
declare const file_open: (props: IProps) => void;
/**
 * 函数 "file_load" 下载一个文件
 * @param {string} url 必填参数，传入的文件的url
 * @param {string=} name 可选参数，传入的文件的文件名。如果不提供，默认使用URL中的文件名
 */
declare const file_load: (props: IProps) => Promise<void> | undefined;

export { file_calculate_md5, file_load, file_open };
