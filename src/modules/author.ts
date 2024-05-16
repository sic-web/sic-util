import { v4 as uuidv4 } from "uuid";
import type { ResourceItem } from "../types";
/**
 * 生成TraceId
 * @param {string} origin 请求源（请求发起方）
 * @param {string} url 请求url
 * @returns - traceId，例如 "os-os-1d677771-4e85-460d-b669-682077a5067f"
 */
export const author_traceId = (origin: string, url: string): string => {
  const randomString = uuidv4();
  let traceId = randomString ?? "";
  if (origin && url) {
    if (url.includes("os_service")) {
      traceId = `${origin}-os-${randomString}`;
    }
    if (url.includes("b_service")) {
      traceId = `${origin}-b-${randomString}`;
    }
    if (url.includes("a_service")) {
      traceId = `${origin}-a-${randomString}`;
    }
    if (url.includes("g_service")) {
      traceId = `${origin}-g-${randomString}`;
    }
    if (url.includes("base_common")) {
      traceId = `${origin}-base-${randomString}`;
    }
    if (url.includes("auth")) {
      traceId = `${origin}-auth-${randomString}`;
    }
  }
  return traceId;
};

/**
 * 严格匹配当前按钮权限
 * @param {ResourceItem[]} list 当前的页面权限
 * @param {number} id 当前的按钮权限
 * @returns {boolean} 是否存在该权限 true/false
 */
export const author_strict = (list: ResourceItem[], id: number) => {
  let isShow = false;
  isShow = list?.some((item) => item?.resourceId === id);
  return isShow;
};

/**
 * 计算密码强度，返回等级
 * @param {string} str 当前密码
 * @returns {number} 强度等级
 */
export const author_passwordCheck = (str: string) => {
  let level = 0;
  if (/\d/.test(str)) {
    level = level + 1;
  }
  if (/[a-zA-Z]/.test(str)) {
    level = level + 1;
  }
  if (/[^a-zA-Z0-9\s]/.test(str)) {
    level = level + 1;
  }
  return level;
};

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
 * 数据层面：既处理数据问题，也解决浏览器关于menuId，resourceList等字段驼峰大小写的警告
 * 业务层面：处理的的数据存储到localstore中，便于系统使用
 * @param {Array} origin 接口的路由信息
 * @param {Array} local 本地的路由信息
 * @returns {Array} 适配到项目的路由树
 */
export const author_router_filter = (origin: MenuInformation[], local: MenuInformation[]) => {
  return origin
    ?.map((originItem) => {
      const matchingItem = local?.find((targetItem) => targetItem?.menuid === originItem?.menuId);
      if (matchingItem) {
        const newItem = {
          key: matchingItem?.key,
          menuid: originItem?.menuId,
          label: originItem?.label,
          resourcelist: originItem?.resourceList,
          children: originItem?.children,
        };

        if (!newItem?.children || newItem?.children?.length === 0) {
          delete newItem?.children;
        }
        if (originItem?.children && originItem?.children?.length > 0) {
          newItem.children = author_router_filter(originItem?.children, matchingItem?.children || []);
        }
        return newItem;
      }
      return null;
    })
    ?.filter(Boolean);
};
