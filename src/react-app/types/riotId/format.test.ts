import { describe, expect, it } from "vitest";
import { formatRiotId } from "./format";

describe("formatRiotId", () => {
  it("正しくフォーマットする", () => {
    expect(formatRiotId({ gameName: "Summoner", tagLine: "JP1" })).toBe(
      "Summoner #JP1",
    );
  });
});
