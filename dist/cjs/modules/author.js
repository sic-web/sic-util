'use strict';

var uuid = require('uuid');
var JSEncrypt = require('jsencrypt');

/**
 * 生成TraceId
 * @param {string} origin 请求源（请求发起方）
 * @param {string} url 请求url
 * @returns - traceId，例如 "os-os-1d677771-4e85-460d-b669-682077a5067f"
 */
const author_traceId = (origin, url) => {
    const randomString = uuid.v4();
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
const author_strict = (list, id) => {
    let isShow = false;
    isShow = list?.some((item) => item?.resourceId === id);
    return isShow;
};
/**
 * 计算密码强度，返回等级
 * @param {string} str 当前密码
 * @returns {number} 强度等级
 */
const author_passwordCheck = (str) => {
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
/**
 * 处理接口的路由数据，将本地的路由信息补充进去
 * 数据层面：既处理数据问题，也解决浏览器关于menuId，resourceList等字段驼峰大小写的警告
 * 业务层面：处理的的数据存储到localstore中，便于系统使用
 * @param {Array} origin 接口的路由信息
 * @param {Array} local 本地的路由信息
 * @returns {Array} 适配到项目的路由树
 */
const author_router_filter = (origin, local) => {
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
/**
 * 处理缓存的路由数据，将本地的路由信息补充进去
 * 数据层面：既处理数据问题，也将DOM元素打进当前函数
 * 业务层面：可以在当前函数中使用DOM元素，用于渲染
 * @param {Array} origin 接口的路由信息
 * @param {Array} local 本地的路由信息
 * @returns {Array} 用于渲染的路由树
 */
const author_router_add = (origin, local) => {
    return origin
        ?.map((originItem) => {
        const matchingItem = local?.find((localItem) => localItem?.menuid === originItem?.menuid);
        if (matchingItem) {
            originItem?.resourcelist?.forEach((i) => {
                matchingItem?.resourcelist?.forEach((j) => {
                    if (i.resourceId === j.resourceId && !j.more) {
                        Object.assign(i, j);
                    }
                });
            });
            // 处理后端 resourceId 返回相同情况
            const a = matchingItem?.resourcelist?.filter((i) => i.more);
            const b = a?.filter((i) => originItem?.resourcelist?.some((j) => i.resourceId === j.resourceId));
            const c = b ? originItem?.resourcelist?.concat(b) : originItem?.resourcelist;
            const newItem = { ...originItem, ...matchingItem, resourcelist: c };
            if (originItem.children && originItem.children.length > 0) {
                newItem.children = author_router_add(originItem?.children, matchingItem?.children || []);
            }
            return newItem;
        }
        return null;
    })
        ?.filter(Boolean);
};
// Base64 转二进制
const base64ToBinary = (base64) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};
// 二进制转 16 进制
const binaryToHex = (binary) => {
    const hexArray = Array.from(binary).map((byte) => byte.toString(16).padStart(2, "0"));
    return hexArray.join("");
};
/**
 * RSA数据加密处理，用于密码加密传输
 * @param {String} pubKey 公钥
 * @param {String} password 密码
 * @returns {String} 加密后的数据，吐出为十六进制
 */
const author_rsa = (pubKey, password) => {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(pubKey);
    const result = jsEncrypt.encrypt(password);
    // 进行转换
    const binaryData = base64ToBinary(result);
    const encryptedHex = binaryToHex(binaryData);
    return encryptedHex;
};

exports.author_passwordCheck = author_passwordCheck;
exports.author_router_add = author_router_add;
exports.author_router_filter = author_router_filter;
exports.author_rsa = author_rsa;
exports.author_strict = author_strict;
exports.author_traceId = author_traceId;
