/**
 * 城市选择器
 * <Cascader/> 组件内使用 options={cityOptions} 引入省市区
 */
declare const city_options: (level?: string) => ({
    label: string;
    value: string;
    children?: undefined;
} | {
    label: string;
    value: string;
    children: {
        label: string;
        value: string;
    }[];
})[];
/**
 * 编码转城市
 */
declare const city_two_code_text: (provinceId: string, cityId?: string) => string;
/**
 * 编码转城市，默认三级
 */
declare const city_code_text: (provinceId: string, cityId?: string, districtId?: string) => string;

export { city_code_text, city_options, city_two_code_text };
