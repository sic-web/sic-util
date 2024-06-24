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
    const findItem = array?.find((item) => item.value === value);
    return findItem ? findItem : { value: null, label: "", type: null };
};

export { getOptionConfig, tem_compare_version, tem_get_tableHeader };
