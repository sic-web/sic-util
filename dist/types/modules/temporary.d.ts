import { KeyVal, TableHeaderItem } from '../types/index.js';

declare const tem_compare_version: (version1: string, version2: string) => boolean;
/**
 * 新的表头数据转译
 * @param {KeyVal} keyVal 接口返回的存在的表头
 * @param {TableHeaderItem} cache 存储
 * @param {TableHeaderItem} initial 默认
 */
declare const tem_get_tableHeader: (keyVal: KeyVal, cache: TableHeaderItem[], initial: TableHeaderItem[]) => TableHeaderItem[];

export { tem_compare_version, tem_get_tableHeader };
