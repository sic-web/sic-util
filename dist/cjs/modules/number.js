'use strict';

var Num = require('number-precision');

/**
 * 单位扩大固定倍数
 * @param {*} amount 当前金额
 * @param {*} unit 转换单位，默认100
 * @param {*} accuracy 保留几位小数，默认2位
 */
const num_expand = (amount, unit = 100, accuracy = 2) => {
    if (amount || amount === 0) {
        const realAmount = Num.divide(amount, unit).toFixed(accuracy);
        return realAmount;
    }
    else {
        return amount;
    }
};
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
const num_unit = (amount) => {
    const num = Number(amount);
    if (Math.abs(num) >= 100000000) {
        return `${num_expand(amount, 100000000)} 亿`;
    }
    else if (Math.abs(num) >= 10000) {
        return `${num_expand(amount, 10000)} 万`;
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
/**
 * @description 数字转中文数码
 *
 * @param {Number|String}   num     数字[正整数]
 * @param {String}          type    文本类型，lower|upper，默认upper
 *
 * @example number2text(100000000) => "壹亿元整"
 */
const num_text = (number, type = "upper") => {
    // 配置
    const confs = {
        lower: {
            num: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
            unit: ["", "十", "百", "千", "万"],
            level: ["", "万", "亿"],
        },
        upper: {
            num: ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"],
            unit: ["", "拾", "佰", "仟"],
            level: ["", "万", "亿"],
        },
        decimal: {
            unit: ["分", "角"],
        },
        maxNumber: 999999999999.99,
    };
    // 过滤不合法参数
    if (Number(number) > confs.maxNumber) {
        return false;
    }
    const conf = confs[type];
    const numbers = String(Number(number)?.toFixed(2))?.split(".");
    const integer = numbers[0]?.split("");
    const decimal = Number(numbers[1]) === 0 ? [] : numbers[1]?.split("");
    // 四位分级
    const levels = integer.reverse().reduce((pre, item, idx) => {
        const level = pre[0] && pre[0]?.length < 4 ? pre[0] : [];
        const value = item === "0" ? conf.num[item] : conf.num[item] + conf.unit[idx % 4];
        level.unshift(value);
        if (level.length === 1) {
            pre.unshift(level);
        }
        else {
            pre[0] = level;
        }
        return pre;
    }, []);
    // 整数部分
    const _integer = levels.reduce((pre, item, idx) => {
        let _level = conf.level[levels.length - idx - 1];
        let _item = item?.join("")?.replace(/(零)\1+/g, "$1"); // 连续多个零字的部分设置为单个零字
        // 如果这一级只有一个零字，则去掉这级
        if (_item === "零") {
            _item = "";
            _level = "";
            // 否则如果末尾为零字，则去掉这个零字
        }
        else if (_item[_item.length - 1] === "零") {
            _item = _item?.slice(0, _item.length - 1);
        }
        return pre + _item + _level;
    }, "");
    // 小数部分
    const _decimal = decimal
        ?.map((item, idx) => {
        const unit = confs.decimal.unit;
        const _unit = item !== "0" ? unit[unit.length - idx - 1] : "";
        return `${conf.num[item]}${_unit}`;
    })
        .join("");
    // 如果是整数，则补个整字
    return `${_integer ? _integer : "零"}元` + (_decimal || "整");
};

exports.num_expand = num_expand;
exports.num_expand_100 = num_expand_100;
exports.num_reduce_100 = num_reduce_100;
exports.num_text = num_text;
exports.num_unit = num_unit;
