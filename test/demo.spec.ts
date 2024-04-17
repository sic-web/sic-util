import { describe, expect, it } from "vitest";
import { demo } from "../src/modules/demo";

describe("demo", () => {
  it("demo", () => {
    const source = true;
    const res = demo();
    expect(res).toEqual(source);
  });
});
