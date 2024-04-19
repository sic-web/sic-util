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

export { num_expand_100, num_reduce_100 };
