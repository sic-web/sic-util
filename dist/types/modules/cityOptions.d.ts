/**
 * 城市选择器
 * <Cascader/> 组件内使用 options={cityOptions} 引入省市区
 */
declare const city_options: () => {
    label: any;
    value: any;
    children: any;
}[];
/**
 * 编码转城市
 */
declare const city_code_text: (provinceId: string, cityId?: string, districtId?: string) => string;

export { city_code_text, city_options };
