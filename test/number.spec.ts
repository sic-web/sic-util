import { describe, expect, it } from "vitest";
import {
  num_expand,
  num_expand_100,
  num_reduce_100,
  num_reduce,
  num_text,
} from "../src/modules/number";

describe("number", () => {
  it("num_expand", () => {
    const source1 = "1.00";
    const source2 = "0.10";
    const source3 = "1";
    const res1 = num_expand(100);
    const res2 = num_expand(100, 1000);
    const res3 = num_expand(100, 100, 0);
    expect(res1).toEqual(source1);
    expect(res2).toEqual(source2);
    expect(res3).toEqual(source3);
  });
  it("num_expand_100", () => {
    const source1 = "1.00";
    const source2 = "1";
    const res1 = num_expand_100(100);
    const res2 = num_expand_100(100, 0);
    expect(res1).toEqual(source1);
    expect(res2).toEqual(source2);
  });

  it("num_reduce", () => {
    const source1 = 100;
    const source2 = 1000;
    const res1 = num_reduce(1);
    const res2 = num_reduce(1, 1000);
    expect(res1).toEqual(source1);
    expect(res2).toEqual(source2);
  });
  it("num_reduce_100", () => {
    const source1 = 100;
    const source2 = 1;
    const res1 = num_reduce_100(1);
    const res2 = num_reduce_100(0.01);
    expect(res1).toEqual(source1);
    expect(res2).toEqual(source2);
  });
  it("num_text", () => {
    const source1 = "壹元整";
    const source2 = "壹佰元壹角壹分";

    const res1 = num_text(1);
    const res2 = num_text(100.11);

    expect(res1).toEqual(source1);
    expect(res2).toEqual(source2);
  });
});
