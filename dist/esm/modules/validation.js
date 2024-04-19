/**
 * 函数"validation_num"检查 TypeScript 中的给定值是否是数字。
 * @param {any} [value] - `validation_num` 函数中的 `value` 参数是可选的，可以是任何数据类型。
 * @returns 函数“validation_num”返回一个布尔值，指示输入的“value”是否是数字。
 */
const val_num = (value) => {
    let flag = false;
    if (typeof value === "number") {
        flag = true;
    }
    return flag;
};
/**
 * 函数"validation_idCard"检查 TypeScript 中的给定值是否是身份证号码。
 * @param {any} [value] - "validation_idCard" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "validation_idCard" 返回一个布尔值，指示输入的 "value" 是否是身份证号码。
 */
const val_idCard = (value) => {
    let flag = false;
    const regex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|10|11|12)(0[1-9]|[1-2]\d|30|31)\d{3}[0-9X]$/;
    if (regex.test(value)) {
        flag = true;
    }
    return flag;
};
/**
 * 函数"validation_phone"检查 TypeScript 中的给定值是否是手机号。
 * @param {any} [value] - "validation_phone" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "validation_phone" 返回一个布尔值，指示输入的 "value" 是否是手机号。
 */
const val_phone = (value) => {
    let flag = false;
    const regex = /^1[0-9]{10}$/;
    if (regex.test(value)) {
        flag = true;
    }
    return flag;
};
/**
 * 函数"validation_email"检查 TypeScript 中的给定值是否是邮箱。
 * @param {any} [value] - "validation_email" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "validation_email" 返回一个布尔值，指示输入的 "value" 是否是邮箱。
 */
const val_email = (value) => {
    let flag = false;
    const regex = /^[\p{L}\d_\-.]+@[\p{L}\d-]+(\.[\p{L}\d-]+)*\.[\p{L}]{2,}$/u;
    if (regex.test(value)) {
        flag = true;
    }
    return flag;
};
/**
 * 函数"val_space"检查 TypeScript 中的给定值是否有空格。
 * @param {any} [value] - "val_space" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "val_space" 返回一个布尔值，指示输入的 "value" 是否有空格。
 */
const val_space = (value) => {
    let flag = false;
    const regex = /\s/;
    if (regex.test(value)) {
        flag = true;
    }
    return flag;
};
/**
 * 函数"val_space"检查 TypeScript 中的给定值头尾是否有空格。
 * @param {any} [value] - "val_space" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "val_space" 返回一个布尔值，指示输入的 "value" 头尾是否有空格。
 */
const val_edgeSpace = (value) => {
    let flag = false;
    const regex = /^\s|\s$/g;
    if (regex.test(value)) {
        flag = true;
    }
    return flag;
};
/**
 * 函数"val_space"检查 TypeScript 中的给定值是否为空。
 * @param {any} [value] - "val_space" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "val_space" 返回一个布尔值，指示输入的 "value" 头尾是否有空格。
 */
const val_empty = (value) => {
    let flag = false;
    if (value === null || value === undefined || value === "" || value.trim() === "") {
        flag = true;
    }
    return flag;
};

export { val_edgeSpace, val_email, val_empty, val_idCard, val_num, val_phone, val_space };
