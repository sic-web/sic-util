import { ResourceItem } from '../types/index.js';

/**
 * 生成TraceId
 * @param {string} origin 请求源（请求发起方）
 * @param {string} url 请求url
 * @returns - traceId，例如 "os-os-1d677771-4e85-460d-b669-682077a5067f"
 */
declare const author_traceId: (origin: string, url: string) => string;
/**
 * 严格匹配当前按钮权限
 * @param {ResourceItem[]} list 当前的页面权限
 * @param {number} id 当前的按钮权限
 * @returns {boolean} 是否存在该权限 true/false
 */
declare const author_strict: (list: ResourceItem[], id: number) => boolean;
/**
 * 计算密码强度，返回等级
 * @param {string} str 当前密码
 * @returns {number} 强度等级
 */
declare const author_passwordCheck: (str: string) => number;
/** 菜单类型 */
interface MenuInformation {
    menuid?: number;
    menuId?: number;
    parentid?: number;
    parentId?: number;
    parentname?: string;
    parentName?: string;
    resourcelist?: ResourceList[];
    resourceList?: ResourceList[];
    sort?: number;
    label?: string;
    key?: string;
    icon?: any;
    element?: any;
    children?: any;
}
/** 按钮类型 */ interface ResourceList {
    resourceId: number;
    resourceName?: string;
    key?: string;
    element?: any;
}
/**
 * 处理接口的路由数据，将本地的路由信息补充进去
 * @param {Array} origin 接口的路由信息
 * @param {Array} local 本地的路由信息
 * @returns {Array} 适配到项目的路由树
 */
declare const author_router_filter: (origin: MenuInformation[], local: MenuInformation[]) => ({
    key: string | undefined;
    menuid: number | undefined;
    label: string | undefined;
    resourcelist: ResourceList[] | undefined;
    children: any;
} | null)[];

export { author_passwordCheck, author_router_filter, author_strict, author_traceId };
