import { describe, expect, it } from "vitest";
import { hex_to_rgb, reduce_opacity, rgb_to_hex, get_multiple_color } from "../src/modules/color";

describe("color", () => {
  it("hex_to_rgb", () => {
    const source = [69, 103, 136];
    const res = hex_to_rgb("#456788");
    expect(res).toEqual(source);
  });
  it("reduce_opacity", () => {
    const source = [69, 121, 95];
    const res = reduce_opacity([22, 88, 55], 0.8);
    expect(res).toEqual(source);
  });

  it("rgb_to_hex", () => {
    const source = "#456788";
    const res = rgb_to_hex([69, 103, 136]);
    expect(res).toEqual(source);
  });

  it("get_multiple_color", () => {
    const source1 = "#fff8e8";
    const source2 = "#fff1d2";
    const source3 = "#45795f";
    const res1 = get_multiple_color("#feb71d", 0.1);
    const res2 = get_multiple_color("#feb71d", 0.2);
    const res3 = get_multiple_color([22, 88, 55], 0.8);
    expect(res1).toEqual(source1);
    expect(res2).toEqual(source2);
    expect(res3).toEqual(source3);
  });
});
