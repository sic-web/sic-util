import { describe, expect, it } from "vitest";
import { author_traceId, author_strict, author_passwordCheck } from "../src/modules/author";

describe("author", () => {
  it("author_traceId", () => {
    const source = "os-os";
    const res = author_traceId("os", "/os_service/v1/agent/vip/saveOrUpdate");
    const extracted = res.match(/^(.*?)-(.*?)-/)?.[1] + "-" + res.match(/^(.*?)-(.*?)-/)?.[2];
    expect(extracted).toEqual(source);
  });
  it("author_strict", () => {
    const source = [
      { resourceId: 12, resourceName: "园区数据总览" },
      { resourceId: 13, resourceName: "园区统计列表" },
    ];
    const res1 = author_strict(source, 12);
    const res2 = author_strict(source, 13);
    const res3 = author_strict(source, 14);
    expect(res1).toEqual(true);
    expect(res2).toEqual(true);
    expect(res3).toEqual(false);
  });
  it("author_passwordCheck", () => {
    const res1 = author_passwordCheck("");
    const res2 = author_passwordCheck("123");
    const res3 = author_passwordCheck("123abcd");
    const res4 = author_passwordCheck("123abcd!");
    expect(res1).toEqual(0);
    expect(res2).toEqual(1);
    expect(res3).toEqual(2);
    expect(res4).toEqual(3);
  });
});
