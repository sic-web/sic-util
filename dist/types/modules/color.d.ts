import { RgbColor } from '../types/index.js';

/**
 * 函数“hex_to_rgb”将十六进制颜色代码转换为 RGB 颜色数组。
 * @param {string} hex - 十六进制颜色代码，例如“#FFA500”
 * @returns 包含从输入提供的十六进制颜色代码转换而来的 RGB 值的数组。
 */
declare const hex_to_rgb: (hex: string) => RgbColor;
/**
 * 函数“reduce_opacity”将十六进制颜色透明度改变，得到同等规则下的颜色。
 * @param rgb - RGB颜色代码，例如 [ 22, 34, 55 ]
 * @returns - RGB颜色代码，例如 [ 69, 78, 95 ]
 */
declare const reduce_opacity: (rgb: RgbColor, opacity: number) => RgbColor;
/**
 * 该函数将 RGB 颜色数组转换为十六进制颜色代码。
 * @param rgb - 参数 `rgb` 应该是一个数字数组，表示 RGB 颜色模型中颜色的红色、绿色和蓝色值。
 * @returns 十六进制颜色代码。
 */
declare const rgb_to_hex: (rgb: RgbColor) => string;
/**
 * 该函数将颜色转成一种颜色的多种透明度的
 * @param value rgb或者十六进制
 * @param  {number} opacity 透明度
 * @returns 十六进制颜色代码
 */
declare const get_multiple_color: (value: string | null, opacity: number) => string;
/**
 * 该函数用于生成主题颜色。
 * @param value - 主题颜色值
 */
declare const theme_change: (value: string) => void;

export { get_multiple_color, hex_to_rgb, reduce_opacity, rgb_to_hex, theme_change };
