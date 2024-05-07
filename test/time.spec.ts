import { describe, expect, it } from "vitest";
import { timejs } from "../src/modules/timejs";

describe("time", () => {
  it("timejs", () => {
    const res1 = timejs().format();
    const res2 = timejs("2024-05-01T16:00:00.000Z").format();
    const res3 = timejs("2024-05-01T16:00:00.000Z").format("YYYY-MM-DD");
    expect(res1).not.toEqual("2024-05-07T18:13:08+08:00");
    expect(res2).toEqual("2024-05-02T00:00:00+08:00");
    expect(res3).toEqual("2024-05-02");
  });
});
