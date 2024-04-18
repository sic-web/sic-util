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

export { author_strict, author_traceId };
