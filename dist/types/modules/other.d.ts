import { KeyVal, TableHeaderItem } from '../types/index.js';
import dayjs from 'dayjs';

/**
 * 函数"sys_print"接受具有“url”属性的对象，并使用它通过“printJS”函数打印文档。
 * @param props - `props` 参数是一个具有单个属性 `url` 的对象，该属性是一个字符串。
 */
declare const sys_print: (props: {
    url: string;
}) => void;
/**
 * 函数"sys_detectBrowser"检查浏览器版本，版本在当前系统兼容之外，将弹出提示
 */
declare const sys_detectBrowser: () => void;
/**
 * 函数“win_dynamic_fontSize”根据当前屏幕宽度计算并设置文档的字体大小。
 */
declare const win_dynamic_fontSize: () => void;
declare const tem_compare_version: (version1: string, version2: string) => boolean;
/**
 * 新的表头数据转译
 * @param {KeyVal} keyVal 接口返回的存在的表头
 * @param {TableHeaderItem} cache 存储
 * @param {TableHeaderItem} initial 默认
 */
declare const tem_get_tableHeader: (keyVal: KeyVal, cache: TableHeaderItem[], initial: TableHeaderItem[]) => TableHeaderItem[];
/**
 * 获取枚举配置
 * @param {*} value 当前value值
 * @param {*} array  当前枚举配置
 */
declare const getOptionConfig: (value: any, array: any[]) => any;
/**
 * 获取url 文件名 除后缀名以外的地址名  后缀名
 * @param {*} url 地址
 */
declare const getUrlConfig: (url: string | null) => {
    fileName: string;
    prefix: string;
    suffix: string;
} | null;
/**
 * timejs 依赖于 dayjs 构建，形成管理时间的工具函数
 * TypeScript 中的 `timejs` 函数接受一个参数 `props`，并返回使用 `props` 调用 `dayjs` 的结果。
 * @param {any} props - `timejs` 函数中的 `props` 参数预计为 `any` 类型，这意味着它可以接受任何数据类型作为其值。
 *
 * @returns `timejs` 函数正在返回使用 `props` 参数调用 `dayjs` 函数的结果。
 */
declare const timejs: (props?: any, props1?: any, props2?: any) => dayjs.Dayjs;
/**
 * 从视频地址中提取第一帧作为预览图（base64 格式）
 * @param videoUrl 视频地址（支持跨域或 Blob URL）
 * @param frameTime 预览帧时间点（number）
 * @returns 返回一个 Promise<string>，成功时返回 base64 图片，失败返回空字符串
 */
declare const video_preview: (videoUrl: string, frameTime?: number) => Promise<string>;

export { getOptionConfig, getUrlConfig, sys_detectBrowser, sys_print, tem_compare_version, tem_get_tableHeader, timejs, video_preview, win_dynamic_fontSize };
