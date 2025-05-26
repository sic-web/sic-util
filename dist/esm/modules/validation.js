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
        else if (Number(value) <= 0 || Number(value) >= 100) {
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
        else if (Number(value) <= 0 || Number(value) >= 100) {
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
// 金额文本 支持到小数点后两位
const val_amount = (_, value) => {
    if (value) {
        if (/\s/.test(value)) {
            return Promise.reject(new Error("请去除文本前后及内容中的空格！"));
        }
        else if (isNaN(Number(value))) {
            return Promise.reject(new Error("请输入有效的数字文本！"));
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

export { val_amount, val_beforeAfter_space, val_email, val_idcard, val_landline, val_number, val_phone, val_space, val_three_percent, val_two_percent };
