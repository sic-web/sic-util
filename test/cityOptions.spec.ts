import { describe, expect, it } from "vitest";
import { city_options, city_code_text } from "../src/modules/cityOptions";

describe("city_options", () => {
  it("city_options", () => {
    const source = { label: "全国", value: "000000", children: undefined };
    const source1 = { label: "北京市", value: "11", children: [{ label: "市辖区", value: "1101", children: [] }] };
    const res = city_options();
    expect(res[0]).toEqual(source);
    expect(res[1].label).toEqual(source1.label);
    expect(res[1].value).toEqual(source1.value);
  });
  it("city_code_text", () => {
    const res1 = city_code_text("000000", undefined, undefined);
    const res2 = city_code_text("63", "25", "25");
    expect(res1).toEqual("全国");
    expect(res2).toEqual("青海省海南藏族自治州贵南县");
  });
});
