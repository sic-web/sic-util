import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import areas from "china-division/dist/areas.json";

areas.forEach((area) => {
  const matchCity: any = cities?.filter((city) => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code,
    });
  }
});
cities.forEach((city: any) => {
  const matchProvince: any = provinces.filter((province) => province.code === city.provinceCode)[0];
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
export const city_options = () => {
  const cityOptions = provinces?.map((province: any) => ({
    label: province.name,
    value: province.code,
    children: province.children,
  }));
  return cityOptions;
};
