import { TableHeaderItem, KeyVal } from "../types";
// 废弃
export const tem_compare_version = (version1: string, version2: string) => {
  const v1Array = version1.split(".").map(Number);
  const v2Array = version2.split(".").map(Number);

  for (let i = 0; i < Math.max(v1Array.length, v2Array.length); i++) {
    const v1Part = v1Array[i] || 0;
    const v2Part = v2Array[i] || 0;

    if (v1Part > v2Part) {
      return true;
    } else if (v1Part < v2Part) {
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
export const tem_get_tableHeader = (keyVal: KeyVal, cache: TableHeaderItem[], initial: TableHeaderItem[]) => {
  const returnList: TableHeaderItem[] = [];
  const transformList: TableHeaderItem[] = [];
  if (keyVal) {
    Object.keys(keyVal)?.forEach((key) => {
      const item: TableHeaderItem = {};
      item.key = key;
      item.name = keyVal[key];
      transformList.push(item);
    });
  }
  transformList.forEach((i: TableHeaderItem) => {
    initial?.forEach((j: TableHeaderItem) => {
      if (cache?.length > 0 && initial?.length === cache?.length) {
        cache?.forEach((k: TableHeaderItem) => {
          if (i?.key === j?.key && i?.key === k?.key) {
            i = { ...i, ...j, ...k };
            i.width = j?.width;
            i.sort = k?.sort ? k?.sort : j.sort;
            i.selected = k?.selected === undefined ? true : k?.selected;
            returnList.push(i);
          }
        });
      } else {
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
export const getOptionConfig = (value: number, array: any[]) => {
  const findItem = array?.find((item) => item.value === value);
  return findItem ? findItem : {};
};

/**
 * 获取url 文件名 除后缀名以外的地址名  后缀名
 * @param {*} url 地址
 */
export const getUrlConfig = (url: string | null) => {
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
  } else {
    return null;
  }
};
