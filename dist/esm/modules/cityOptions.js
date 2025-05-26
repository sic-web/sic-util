import { city_three, city_two } from '../constant/city.js';

/**
 * 城市选择器
 * <Cascader/> 组件内使用 options={cityOptions} 引入省市区
 */
const city_options = (level = "three") => {
    if (level === "three") {
        return city_three;
    }
    else if (level === "two") {
        return city_two;
    }
    else {
        return city_three;
    }
};
/**
 * 编码转城市
 */
const city_two_code_text = (provinceId, cityId) => {
    let cityName = "";
    if (provinceId) {
        if (provinceId === "000000") {
            cityName = "全国";
        }
        else {
            city_two?.forEach((i) => {
                if (i.value === provinceId) {
                    cityName = cityName + i.label;
                    i.children?.forEach((j) => {
                        if (j.value === `${provinceId}${cityId}`) {
                            cityName = cityName + j.label;
                        }
                    });
                }
            });
        }
    }
    return cityName;
};
/**
 * 编码转城市，默认三级
 */
const city_code_text = (provinceId, cityId, districtId) => {
    let cityName = "";
    if (provinceId) {
        if (provinceId === "000000") {
            cityName = "全国";
        }
        else {
            city_three?.forEach((i) => {
                if (i.value === provinceId) {
                    cityName = cityName + i.label;
                    i.children?.forEach((j) => {
                        if (j.value === `${provinceId}${cityId}`) {
                            cityName = cityName + j.label;
                            j.children?.forEach((k) => {
                                if (k.value === `${provinceId}${cityId}${districtId}`) {
                                    cityName = cityName + k.label;
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    return cityName;
};

export { city_code_text, city_options, city_two_code_text };
