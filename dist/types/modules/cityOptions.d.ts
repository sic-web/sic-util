/**
 * 城市选择器
 * <Cascader/> 组件内使用 options={cityOptions} 引入省市区
 */
declare const city_options: () => {
    label: any;
    value: any;
    children: any;
}[];

export { city_options };
