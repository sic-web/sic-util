import { describe, expect, it } from "vitest";
import { num_expand_100, num_reduce_100 } from "../src/modules/number";

describe("number", () => {
  it("num_expand_100", () => {
    const source1 = "1.00";
    const source2 = "1";
    const res1 = num_expand_100(100);
    const res2 = num_expand_100(100, 0);
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
});
