'use strict';

/**
 * 函数“hex_to_rgb”将十六进制颜色代码转换为 RGB 颜色数组。
 * @param {string} hex - 十六进制颜色代码，例如“#FFA500”
 * @returns 包含从输入提供的十六进制颜色代码转换而来的 RGB 值的数组。
 */
const hex_to_rgb = (hex) => {
    const r = Number.parseInt(hex.substring(1, 3), 16);
    const g = Number.parseInt(hex.substring(3, 5), 16);
    const b = Number.parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
};
/**
 * 函数“reduce_opacity”将十六进制颜色透明度改变，得到同等规则下的颜色。
 * @param rgb - RGB颜色代码，例如 [ 22, 34, 55 ]
 * @returns - RGB颜色代码，例如 [ 69, 78, 95 ]
 */
const reduce_opacity = (rgb, opacity) => {
    const r = Math.round(rgb[0] + (255 - rgb[0]) * (1 - opacity));
    const g = Math.round(rgb[1] + (255 - rgb[1]) * (1 - opacity));
    const b = Math.round(rgb[2] + (255 - rgb[2]) * (1 - opacity));
    return [r, g, b];
};
/**
 * 该函数将 RGB 颜色数组转换为十六进制颜色代码。
 * @param rgb - 参数 `rgb` 应该是一个数字数组，表示 RGB 颜色模型中颜色的红色、绿色和蓝色值。
 * @returns 十六进制颜色代码。
 */
const rgb_to_hex = (rgb) => {
    const hexColor = rgb?.reduce((acc, value) => {
        const hex = value?.toString(16)?.padStart(2, "0");
        return acc + hex;
    }, "#");
    return hexColor;
};
/**
 * 该函数将颜色转成一种颜色的多种透明度的
 * @param value rgb或者十六进制
 * @param  {number} opacity 透明度
 * @returns 十六进制颜色代码
 */
const get_multiple_color = (value, opacity) => {
    let rgb;
    if (value === null) {
        return "#feefcf";
    }
    if (value.startsWith("#")) {
        rgb = hex_to_rgb(value);
    }
    else {
        rgb = value.match(/\d+/g).map(Number);
    }
    const multipleColor = reduce_opacity(rgb, opacity);
    const hexColor = rgb_to_hex(multipleColor);
    return hexColor;
};
/**
 * 该函数用于生成主题颜色。
 * @param value - 主题颜色值
 */
const theme_change = (value) => {
    // 创建或获取样式元素
    let styleEl = document.getElementById("theme-style");
    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "theme-style";
        document.head.appendChild(styleEl);
    }
    // 生成CSS变量
    let cssText = ":root {\n";
    cssText += `  --themeColor: ${value};\n`;
    const steps = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5];
    steps.forEach((step) => {
        const variableName = `--themeColor${step.toString().replace(".", "_")}`;
        const colorValue = get_multiple_color(value, step / 10);
        cssText += `  ${variableName}: ${colorValue};\n`;
    });
    cssText += "}";
    // 更新样式表内容
    styleEl.textContent = cssText;
};

exports.get_multiple_color = get_multiple_color;
exports.hex_to_rgb = hex_to_rgb;
exports.reduce_opacity = reduce_opacity;
exports.rgb_to_hex = rgb_to_hex;
exports.theme_change = theme_change;
