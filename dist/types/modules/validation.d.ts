/**
 * 函数"validation_num"检查 TypeScript 中的给定值是否是数字。
 * @param {any} [value] - `validation_num` 函数中的 `value` 参数是可选的，可以是任何数据类型。
 * @returns 函数“validation_num”返回一个布尔值，指示输入的“value”是否是数字。
 */
declare const val_num: (value?: any) => boolean;
/**
 * 函数"validation_idCard"检查 TypeScript 中的给定值是否是身份证号码。
 * @param {any} [value] - "validation_idCard" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "validation_idCard" 返回一个布尔值，指示输入的 "value" 是否是身份证号码。
 */
declare const val_idCard: (value?: any) => boolean;
/**
 * 函数"validation_phone"检查 TypeScript 中的给定值是否是手机号。
 * @param {any} [value] - "validation_phone" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "validation_phone" 返回一个布尔值，指示输入的 "value" 是否是手机号。
 */
declare const val_phone: (value?: any) => boolean;
/**
 * 函数"validation_email"检查 TypeScript 中的给定值是否是邮箱。
 * @param {any} [value] - "validation_email" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "validation_email" 返回一个布尔值，指示输入的 "value" 是否是邮箱。
 */
declare const val_email: (value?: any) => boolean;
/**
 * 函数"val_space"检查 TypeScript 中的给定值是否有空格。
 * @param {any} [value] - "val_space" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "val_space" 返回一个布尔值，指示输入的 "value" 是否有空格。
 */
declare const val_space: (value?: any) => boolean;
/**
 * 函数"val_space"检查 TypeScript 中的给定值头尾是否有空格。
 * @param {any} [value] - "val_space" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "val_space" 返回一个布尔值，指示输入的 "value" 头尾是否有空格。
 */
declare const val_edgeSpace: (value?: any) => boolean;
/**
 * 函数"val_space"检查 TypeScript 中的给定值是否为空。
 * @param {any} [value] - "val_space" 函数中的 "value" 参数是可选的，可以是任何数据类型。
 * @returns 函数 "val_space" 返回一个布尔值，指示输入的 "value" 头尾是否有空格。
 */
declare const val_empty: (value?: any) => boolean;

export { val_edgeSpace, val_email, val_empty, val_idCard, val_num, val_phone, val_space };
