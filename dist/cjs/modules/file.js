'use strict';

var CryptoJS = require('crypto-js');

/**
 * 函数“file_calculate_md5”读取一个文件，计算其 MD5 哈希值，并将哈希值作为 Promise 返回。
 * @param {any} file - `file_calculate_md5` 函数将文件作为输入，并使用 CryptoJS 库计算文件内容的 MD5 哈希值。`file` 参数表示要计算 MD5
 * 哈希值的文件。
 * @returns 一旦文件被读取并处理完毕，`file_calculate_md5` 函数就会返回一个 Promise，该 Promise 会使用文件内容的 MD5 哈希值进行解析。
 */
const file_calculate_md5 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileData = event.target.result;
            const wordArray = CryptoJS.lib.WordArray.create(fileData);
            const md5 = CryptoJS.MD5(wordArray).toString();
            resolve(md5);
        };
        reader.onerror = function (event) {
            reject(event.target.error);
        };
        reader.readAsArrayBuffer(file);
    });
};
/**
 * 函数 "file_open" 打开一个文件，如果该文件再浏览器无法预览，会实现下载功能
 * @param {string} url 必填参数，传入的文件的url
 * @param {string=} name 可选参数，传入的文件的文件名。如果不提供，默认使用URL中的文件名
 */
const file_open = (props) => {
    const { url, name } = props;
    if (typeof url === "string" && url !== "") {
        const fileName = url?.split("/")?.[url?.split("/")?.length - 1];
        const link = document.createElement("a");
        link.href = url;
        link.download = name ?? fileName;
        link.addEventListener("error", () => {
            link.remove();
        });
        link.addEventListener("click", () => {
            link.remove();
        });
        document.body.appendChild(link);
        link.click();
    }
};
/**
 * 函数 "file_load" 下载一个文件
 * @param {string} url 必填参数，传入的文件的url
 * @param {string=} name 可选参数，传入的文件的文件名。如果不提供，默认使用URL中的文件名
 */
const file_load = (props) => {
    const { url, name } = props;
    if (typeof url === "string" && url !== "") {
        const fileName = url?.split("/")?.[url?.split("/")?.length - 1];
        if (typeof url === "string" && url !== "") {
            return fetch(url)
                .then((response) => response.blob())
                .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = name ?? fileName;
                link.click();
                URL.revokeObjectURL(link.href);
            });
        }
    }
};

exports.file_calculate_md5 = file_calculate_md5;
exports.file_load = file_load;
exports.file_open = file_open;
