'use strict';

// 数字文本
const val_number = (_, value) => {
    if (value) {
        if (/\s/.test(value)) {
            return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
        }
        else if (isNaN(Number(value))) {
            return Promise.reject(new Error("请输入有效的数字文本！"));
        }
        else {
            return Promise.resolve();
        }
    }
    else {
        return Promise.resolve();
    }
};
// 两位小数点百分比
const val_two_percent = (_, value) => {
    if (value) {
        if (/\s/.test(value)) {
            return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
        }
        else if (isNaN(Number(value))) {
            return Promise.reject(new Error("请输入有效的数字文本！"));
        }
        else if (Number(value) < 0 || Number(value) > 100) {
            return Promise.reject(new Error("范围必须在0到100之间！"));
        }
        else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
            return Promise.reject(new Error("最多支持两位小数！"));
        }
        else {
            return Promise.resolve();
        }
    }
    else {
        return Promise.resolve();
    }
};
// 三位小数点百分比
const val_three_percent = (_, value) => {
    if (value) {
        if (/\s/.test(value)) {
            return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
        }
        else if (isNaN(Number(value))) {
            return Promise.reject(new Error("请输入有效的数字文本！"));
        }
        else if (Number(value) < 0 || Number(value) > 100) {
            return Promise.reject(new Error("范围必须在0到100之间！"));
        }
        else if (!/^\d+(\.\d{1,3})?$/.test(value)) {
            return Promise.reject(new Error("最多支持三位小数！"));
        }
        else {
            return Promise.resolve();
        }
    }
    else {
        return Promise.resolve();
    }
};
// 年龄校验
const val_age = (_, value) => {
    const validateInput = (input) => {
        if (!input) {
            return "输入框不能为空！";
        }
        if (/\s/.test(input?.toString())) {
            return "请去除文本前后及内容中的空格！";
        }
        if (Number(input) < 0 || Number(input) > 150 || !Number.isInteger(input)) {
            return "请输入合法的年龄！";
        }
        return;
    };
    if (typeof value === "object" && value !== null) {
        // 如果是对象，分别校验每个键的值
        const errors = [];
        Object.keys(value).forEach((key) => {
            const inputValue = value[key];
            const error = validateInput(inputValue);
            if (error) {
                errors.push(`${key}: ${error}`);
            }
        });
        if (errors?.length > 0) {
            return Promise.reject(new Error(errors.join("\n")));
        }
        else {
            return Promise.resolve();
        }
    }
    else {
        // 如果是单个值，直接校验
        const error = validateInput(value);
        if (error) {
            return Promise.reject(new Error(error));
        }
        else {
            return Promise.resolve();
        }
    }
};
// 金额文本 支持到小数点后两位
const val_amount = (_, value) => {
    const validateInput = (input) => {
        const newInput = input?.toString();
        if (!newInput) {
            return "输入框不能为空！";
        }
        if (/\s/.test(newInput)) {
            return "请去除文本前后及内容中的空格！";
        }
        if (isNaN(Number(newInput))) {
            return "请输入有效的数字文本！";
        }
        if (!/^\d+(\.\d{1,2})?$/.test(newInput)) {
            return "最多支持两位小数！";
        }
        return;
    };
    if (typeof value === "object" && value !== null) {
        // 如果是对象，分别校验每个键的值
        const errors = [];
        Object.keys(value).forEach((key) => {
            const inputValue = value[key];
            const error = validateInput(inputValue);
            if (error) {
                errors.push(`${key}: ${error}`);
            }
        });
        if (errors?.length > 0) {
            return Promise.reject(new Error(errors.join("\n")));
        }
        else {
            return Promise.resolve();
        }
    }
    else {
        // 如果是单个值，直接校验
        const error = validateInput(value);
        if (error) {
            return Promise.reject(new Error(error));
        }
        else {
            return Promise.resolve();
        }
    }
};
// 身份证
const val_idcard = (_rule, value) => {
    if (value) {
        const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|10|11|12)(0[1-9]|[1-2]\d|30|31)\d{3}[0-9X]$/;
        if (/\s/.test(value)) {
            return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
        }
        else if (!idCardRegex.test(value)) {
            return Promise.reject(new Error("身份证号格式不正确！"));
        }
        else {
            return Promise.resolve();
        }
    }
    else {
        return Promise.resolve();
    }
};
// 手机号
const val_phone = (_, value) => {
    if (value) {
        const phoneRegex = /^1[0-9]{10}$/;
        if (/\s/.test(value)) {
            return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
        }
        else if (!phoneRegex.test(value)) {
            return Promise.reject(new Error("手机号格式不正确！"));
        }
        else {
            return Promise.resolve();
        }
    }
    else {
        return Promise.resolve();
    }
};
// 联系电话校验（只校验座机格式   例如 010-12345678    010 12345678  （010）12345678）
const val_landline = (_, value) => {
    if (value) {
        const landlinePhoneRegex = /^[\d\s()-]+$/;
        if (!landlinePhoneRegex.test(value)) {
            return Promise.reject(new Error("联系电话格式不正确！"));
        }
        else {
            return Promise.resolve();
        }
    }
    else {
        return Promise.resolve();
    }
};
// 邮箱校验
const val_email = (_, value) => {
    if (!value || value === "/") {
        return Promise.resolve();
    }
    if (/\s/.test(value)) {
        return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
    }
    else {
        const emailRegex = /^[\p{L}\d_\-.]+@[\p{L}\d-]+(\.[\p{L}\d-]+)*\.[\p{L}]{2,}$/u;
        if (!emailRegex.test(value)) {
            return Promise.reject(new Error("邮箱格式不正确！"));
        }
        else {
            return Promise.resolve();
        }
    }
};
//空格校验
const val_space = (_, value) => {
    if (!value) {
        return Promise.resolve();
    }
    else if (/\s/.test(value)) {
        return Promise.reject(new Error("文本内容包含空格！"));
    }
    else {
        return Promise.resolve();
    }
};
//前后空格
const val_beforeAfter_space = (_, value) => {
    if (!value) {
        return Promise.resolve();
    }
    else if (/^\s|\s$/g.test(value)) {
        return Promise.reject(new Error("文本内容前后包含空格！"));
    }
    else {
        return Promise.resolve();
    }
};

exports.val_age = val_age;
exports.val_amount = val_amount;
exports.val_beforeAfter_space = val_beforeAfter_space;
exports.val_email = val_email;
exports.val_idcard = val_idcard;
exports.val_landline = val_landline;
exports.val_number = val_number;
exports.val_phone = val_phone;
exports.val_space = val_space;
exports.val_three_percent = val_three_percent;
exports.val_two_percent = val_two_percent;
