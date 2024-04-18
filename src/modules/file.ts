import CryptoJS from "crypto-js";

/**
 * 函数“file_calculate_md5”读取一个文件，计算其 MD5 哈希值，并将哈希值作为 Promise 返回。
 * @param {any} file - `file_calculate_md5` 函数将文件作为输入，并使用 CryptoJS 库计算文件内容的 MD5 哈希值。`file` 参数表示要计算 MD5
 * 哈希值的文件。
 * @returns 一旦文件被读取并处理完毕，`file_calculate_md5` 函数就会返回一个 Promise，该 Promise 会使用文件内容的 MD5 哈希值进行解析。
 */
export const file_calculate_md5 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event: any) {
      const fileData = event.target.result;
      const wordArray = CryptoJS.lib.WordArray.create(fileData);
      const md5 = CryptoJS.MD5(wordArray).toString();
      resolve(md5);
    };
    reader.onerror = function (event: any) {
      reject(event.target.error);
    };
    reader.readAsArrayBuffer(file);
  });
};
