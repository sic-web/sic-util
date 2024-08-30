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
/** 按钮类型 */
interface ResourceList {
    resourceId: number;
    resourceName?: string;
    key?: string;
    element?: any;
    more?: boolean;
}
/**
 * 处理接口的路由数据，将本地的路由信息补充进去
 * 数据层面：既处理数据问题，也解决浏览器关于menuId，resourceList等字段驼峰大小写的警告
 * 业务层面：处理的的数据存储到localstore中，便于系统使用
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
/**
 * 处理缓存的路由数据，将本地的路由信息补充进去
 * 数据层面：既处理数据问题，也将DOM元素打进当前函数
 * 业务层面：可以在当前函数中使用DOM元素，用于渲染
 * @param {Array} origin 接口的路由信息
 * @param {Array} local 本地的路由信息
 * @returns {Array} 用于渲染的路由树
 */
declare const author_router_add: (origin: MenuInformation[], local: MenuInformation[]) => ({
    resourcelist: ResourceList[] | undefined;
    menuid?: number;
    menuId?: number;
    parentid?: number;
    parentId?: number;
    parentname?: string;
    parentName?: string;
    resourceList?: ResourceList[];
    sort?: number;
    label?: string;
    key?: string;
    icon?: any;
    element?: any;
    children?: any;
} | null)[];
/**
 * RSA数据加密处理，用于密码加密传输
 * @param {String} pubKey 公钥
 * @param {String} password 密码
 * @returns {String} 加密后的数据，吐出为十六进制
 */
declare const author_rsa: (pubKey: string, password: string) => string;

export { author_passwordCheck, author_router_add, author_router_filter, author_rsa, author_strict, author_traceId };
