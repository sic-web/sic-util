import { describe, expect, it } from "vitest";
import { city_options } from "../src/modules/cityOptions";

describe("city_options", () => {
  it("city_options", () => {
    const source = { label: "全国", value: "000000", children: undefined };
    const source1 = { label: "北京市", value: "11", children: [{ label: "市辖区", value: "1101", children: [] }] };
    const res = city_options();
    expect(res[0]).toEqual(source);
    expect(res[1].label).toEqual(source1.label);
    expect(res[1].value).toEqual(source1.value);
    expect(res[1].children[0].value).toEqual(source1.children[0].value);
  });
});
