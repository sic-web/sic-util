/**
 * 单位扩大两位，一般用于（分->元）（百分数->数）
 * @param {*} amount 当前金额
 * @param {*} accuracy 保留几位小数，默认2位
 */
declare const num_expand_100: (amount: number | string, accuracy?: number) => string | number;
/**
 * 单位缩小两位，一般用于（元->分）（数->百分数）
 * @param {*} amount 当前金额
 */
declare const num_reduce_100: (amount: any) => any;
/**
 * @description 数字转中文数码
 *
 * @param {Number|String}   num     数字[正整数]
 * @param {String}          type    文本类型，lower|upper，默认upper
 *
 * @example number2text(100000000) => "壹亿元整"
 */
declare const num_text: (number: number | string | undefined, type?: string) => string | false;

export { num_expand_100, num_reduce_100, num_text };
