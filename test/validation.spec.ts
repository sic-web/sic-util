import { describe, it, expect } from "vitest";
import { val_num, val_idCard, val_phone, val_email, val_space, val_edgeSpace, val_empty } from "../src/modules/validation";
describe("validation", () => {
  it("val_num", () => {
    const res1 = val_num(0);
    const res2 = val_num("");
    const res3 = val_num("0");
    const res4 = val_num();
    expect(res1).toEqual(true);
    expect(res2).toEqual(false);
    expect(res3).toEqual(false);
    expect(res4).toEqual(false);
  });

  it("val_idCard", () => {
    const res1 = val_idCard(224623188806292874);
    const res2 = val_idCard(22462318880629287);
    const res3 = val_idCard("22462318880629287X");
    const res4 = val_idCard("225623188806292874");
    expect(res1).toEqual(true);
    expect(res2).toEqual(false);
    expect(res3).toEqual(true);
    expect(res4).toEqual(true);
  });

  it("val_phone", () => {
    const res1 = val_phone(13028747834);
    const res2 = val_phone("13028747834");
    const res3 = val_phone("13028X47834");
    const res4 = val_phone(33028747834);
    expect(res1).toEqual(true);
    expect(res2).toEqual(true);
    expect(res3).toEqual(false);
    expect(res4).toEqual(false);
  });

  it("val_email", () => {
    const res1 = val_email("zijin567@126.com");
    const res2 = val_email("zijin567126.com");
    const res3 = val_email("zijin567@126com");
    const res4 = val_email("zijin567@qq.com");
    expect(res1).toEqual(true);
    expect(res2).toEqual(false);
    expect(res3).toEqual(false);
    expect(res4).toEqual(true);
  });

  it("val_space", () => {
    const res1 = val_space("aaa bbb");
    const res2 = val_space("aaabbb");
    const res3 = val_space("aaa 123");
    const res4 = val_space(123);
    expect(res1).toEqual(true);
    expect(res2).toEqual(false);
    expect(res3).toEqual(true);
    expect(res4).toEqual(false);
  });

  it("val_edgeSpace", () => {
    const res1 = val_edgeSpace(" aaa bbb");
    const res2 = val_edgeSpace("aaabbb ");
    const res3 = val_edgeSpace("aaa123");
    const res4 = val_edgeSpace(123);
    expect(res1).toEqual(true);
    expect(res2).toEqual(true);
    expect(res3).toEqual(false);
    expect(res4).toEqual(false);
  });

  it("val_empty", () => {
    const res1 = val_empty("");
    const res2 = val_empty(null);
    const res3 = val_empty(undefined);
    const res4 = val_empty();
    const res5 = val_empty("  ");
    const res6 = val_empty(" 2");

    expect(res1).toEqual(true);
    expect(res2).toEqual(true);
    expect(res3).toEqual(true);
    expect(res4).toEqual(true);
    expect(res5).toEqual(true);
    expect(res6).toEqual(false);
  });
});
