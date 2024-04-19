'use strict';

var Num = require('number-precision');

/**
 * 单位扩大两位，一般用于（分->元）（百分数->数）
 * @param {*} amount 当前金额
 * @param {*} accuracy 保留几位小数，默认2位
 */
const num_expand_100 = (amount, accuracy = 2) => {
    if (amount || amount === 0) {
        const realAmount = Num.divide(amount, 100).toFixed(accuracy);
        return realAmount;
    }
    else {
        return amount;
    }
};
/**
 * 单位缩小两位，一般用于（元->分）（数->百分数）
 * @param {*} amount 当前金额
 */
const num_reduce_100 = (amount) => {
    if (amount || amount === 0) {
        const realAmount = Num.times(amount, 100);
        return realAmount;
    }
    else {
        return amount;
    }
};

exports.num_expand_100 = num_expand_100;
exports.num_reduce_100 = num_reduce_100;
