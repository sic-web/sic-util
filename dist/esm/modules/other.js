import printJS from 'print-js';
import * as detectBrowser from 'detect-browser';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import 'dayjs/locale/zh-cn';

dayjs.extend(quarterOfYear);
dayjs.locale("zh-cn");
/**
 * 函数"sys_print"接受具有“url”属性的对象，并使用它通过“printJS”函数打印文档。
 * @param props - `props` 参数是一个具有单个属性 `url` 的对象，该属性是一个字符串。
 */
const sys_print = (props) => {
    printJS(props?.url);
};
const BrowserNameVersion = [
    { name: "chrome", version: 88 },
    { name: "safari", version: 14 },
    { name: "firefox", version: 78 },
    { name: "opera", version: 74 },
    { name: "edge-chromium", version: 88 },
];
/**
 * 函数"sys_detectBrowser"检查浏览器版本，版本在当前系统兼容之外，将弹出提示
 */
const sys_detectBrowser = () => {
    const browser = detectBrowser.detect();
    if (browser) {
        let isShowAlert = false;
        const currentBrowser = BrowserNameVersion?.filter((item) => item.name === browser.name)?.[0];
        if (currentBrowser?.version && browser?.version && parseInt(browser?.version) < currentBrowser?.version) {
            isShowAlert = true;
        }
        if (isShowAlert) {
            alert("您当前的浏览器版本较低，请考虑升级浏览器版本或使用其他浏览器以获取最佳体验。");
        }
    }
};
/**
 * 函数“win_dynamic_fontSize”根据当前屏幕宽度计算并设置文档的字体大小。
 */
const win_dynamic_fontSize = () => {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const baseScreenWidth = 1920;
    const baseFontSize = 16;
    const fontSize = (screenWidth / baseScreenWidth) * baseFontSize;
    document.documentElement.style.fontSize = fontSize + "px";
};
// 废弃
const tem_compare_version = (version1, version2) => {
    const v1Array = version1.split(".").map(Number);
    const v2Array = version2.split(".").map(Number);
    for (let i = 0; i < Math.max(v1Array.length, v2Array.length); i++) {
        const v1Part = v1Array[i] || 0;
        const v2Part = v2Array[i] || 0;
        if (v1Part > v2Part) {
            return true;
        }
        else if (v1Part < v2Part) {
            return false;
        }
    }
    return true;
};
/**
 * 新的表头数据转译
 * @param {KeyVal} keyVal 接口返回的存在的表头
 * @param {TableHeaderItem} cache 存储
 * @param {TableHeaderItem} initial 默认
 */
const tem_get_tableHeader = (keyVal, cache, initial) => {
    const returnList = [];
    const transformList = [];
    if (keyVal) {
        Object.keys(keyVal)?.forEach((key) => {
            const item = {};
            item.key = key;
            item.name = keyVal[key];
            transformList.push(item);
        });
    }
    transformList.forEach((i) => {
        initial?.forEach((j) => {
            if (cache?.length > 0 && initial?.length === cache?.length) {
                cache?.forEach((k) => {
                    if (i?.key === j?.key && i?.key === k?.key) {
                        i = { ...i, ...j, ...k };
                        i.width = j?.width;
                        i.sort = k?.sort ? k?.sort : j.sort;
                        i.selected = k?.selected === undefined ? true : k?.selected;
                        returnList.push(i);
                    }
                });
            }
            else {
                if (i?.key === j?.key) {
                    i = { ...i, ...j };
                    i.selected = true;
                    returnList.push(i);
                }
            }
        });
    });
    if (initial[initial.length - 1]?.key === "operate") {
        returnList.push(initial[initial.length - 1]);
    }
    returnList.sort((a, b) => {
        return (a?.sort ?? 1) - (b?.sort ?? 2);
    });
    return returnList;
};
/**
 * 获取枚举配置
 * @param {*} value 当前value值
 * @param {*} array  当前枚举配置
 */
const getOptionConfig = (value, array) => {
    if (!!value || value === 0) {
        const findItem = array?.find((item) => item.value === value);
        return findItem ? findItem : {};
    }
    else {
        return {};
    }
};
/**
 * 获取url 文件名 除后缀名以外的地址名  后缀名
 * @param {*} url 地址
 */
const getUrlConfig = (url) => {
    if (!!url) {
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        const fileName = decodeURIComponent(path.substring(path.lastIndexOf("/") + 1));
        const suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
        const prefixPath = url.substring(0, url.lastIndexOf("."));
        return {
            fileName: fileName ?? "",
            prefix: prefixPath ?? "",
            suffix: suffix ?? "",
        };
    }
    else {
        return null;
    }
};
/**
 * timejs 依赖于 dayjs 构建，形成管理时间的工具函数
 * TypeScript 中的 `timejs` 函数接受一个参数 `props`，并返回使用 `props` 调用 `dayjs` 的结果。
 * @param {any} props - `timejs` 函数中的 `props` 参数预计为 `any` 类型，这意味着它可以接受任何数据类型作为其值。
 *
 * @returns `timejs` 函数正在返回使用 `props` 参数调用 `dayjs` 函数的结果。
 */
const timejs = (props, props1, props2) => {
    return dayjs(props, props1, props2);
};
/**
 * 从视频地址中提取第一帧作为预览图（base64 格式）
 * @param videoUrl 视频地址（支持跨域或 Blob URL）
 * @returns 返回一个 Promise<string>，成功时返回 base64 图片，失败返回空字符串
 */
const video_preview = (videoUrl) => {
    return new Promise((resolve) => {
        // 参数校验：无效地址直接返回空
        if (!videoUrl || typeof videoUrl !== "string")
            return resolve("");
        // 创建 video 元素用于加载视频
        const video = document.createElement("video");
        video.crossOrigin = "anonymous"; // 解决跨域问题
        video.src = videoUrl; // 设置视频地址
        video.muted = true; // 静音播放，避免浏览器限制
        // 超时控制：10 秒内未完成则中断并返回空
        const timeout = setTimeout(() => {
            cleanup();
            resolve("");
        }, 10000);
        // 清理函数：释放资源
        const cleanup = () => {
            clearTimeout(timeout); // 清除超时定时器
            video.pause(); // 暂停播放
            video.removeAttribute("src"); // 清除 src 属性
            video.load(); // 重新加载资源（释放内存）
        };
        // 视频元数据加载完成后触发
        video.onloadedmetadata = () => {
            // 如果宽高为 0，说明视频未正确加载
            if (video.videoWidth === 0 || video.videoHeight === 0) {
                return resolve("");
            }
            // 设置到第 0.1 秒的位置，确保能获取有效帧
            video.currentTime = 0.1;
        };
        // seeked 事件表示视频已经跳转到目标时间点（即已准备好绘制）
        video.onseeked = () => {
            try {
                // 创建 canvas 用于绘制视频帧
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                // 获取 canvas 的绘图上下文
                const ctx = canvas.getContext("2d");
                if (!ctx)
                    return resolve("");
                // 将当前帧绘制到 canvas 上
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                // 将 canvas 内容转换为 base64 图片
                const imgUrl = canvas.toDataURL("image/jpeg");
                // 清理资源并返回结果
                cleanup();
                resolve(imgUrl);
            }
            catch {
                // 绘制过程中出错，清理并返回空
                cleanup();
                resolve("");
            }
        };
        // 视频加载错误处理
        video.onerror = () => {
            cleanup();
            resolve("");
        };
        // 开始加载视频
        video.load();
    });
};

export { getOptionConfig, getUrlConfig, sys_detectBrowser, sys_print, tem_compare_version, tem_get_tableHeader, timejs, video_preview, win_dynamic_fontSize };
