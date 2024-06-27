import { KeyVal, TableHeaderItem } from '../types/index.js';

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
declare const getOptionConfig: (value: number, array: any[]) => any;
/**
 * 获取url 文件名 除后缀名以外的地址名  后缀名
 * @param {*} url 地址
 */
declare const getUrlConfig: (url: string | null) => {
    fileName: string;
    prefix: string;
    suffix: string;
} | null;

export { getOptionConfig, getUrlConfig, tem_compare_version, tem_get_tableHeader };
