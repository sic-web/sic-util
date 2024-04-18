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
