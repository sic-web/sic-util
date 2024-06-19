'use strict';

var provinces = require('china-division/dist/provinces.json');
var cities = require('china-division/dist/cities.json');
var areas = require('china-division/dist/areas.json');

areas.forEach((area) => {
    const matchCity = cities?.filter((city) => city.code === area.cityCode)[0];
    if (matchCity) {
        matchCity.children = matchCity.children || [];
        matchCity.children.push({
            label: area.name,
            value: area.code,
        });
    }
});
cities.forEach((city) => {
    const matchProvince = provinces.filter((province) => province.code === city.provinceCode)[0];
    if (matchProvince) {
        matchProvince.children = matchProvince.children || [];
        matchProvince.children.push({
            label: city.name,
            value: city.code,
            children: city.children,
        });
    }
});
provinces.unshift({ code: "000000", name: "全国" });
/**
 * 城市选择器
 * <Cascader/> 组件内使用 options={cityOptions} 引入省市区
 */
const city_options = () => {
    const cityOptions = provinces?.map((province) => ({
        label: province.name,
        value: province.code,
        children: province.children,
    }));
    return cityOptions;
};
/**
 * 编码转城市
 */
const city_code_text = (provinceId, cityId, districtId) => {
    let cityName = "";
    if (provinceId) {
        if (provinceId === "000000") {
            cityName = "全国";
        }
        else {
            city_options()?.forEach((i) => {
                if (i.value === provinceId) {
                    cityName = cityName + i.label;
                    i.children?.forEach((j) => {
                        if (j.value === `${provinceId}${cityId}`) {
                            cityName = cityName + j.label;
                            j.children.forEach((k) => {
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

exports.city_code_text = city_code_text;
exports.city_options = city_options;
