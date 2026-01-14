import { describe, expect, it } from "vitest";
import { toOpggLink, toOpggMultisearchLink } from "./opggLink";

describe("toOpggLink", () => {
  it("正しくフォーマットする", () => {
    expect(toOpggLink({ gameName: "Summoner", tagLine: "JP1" })).toBe(
      "https://op.gg/ja/lol/summoners/jp/Summoner-JP1",
    );
  });
});

describe("toOpggMultisearchLink", () => {
  it("正しくフォーマットする", () => {
    expect(
      toOpggMultisearchLink([{ gameName: "Summoner", tagLine: "JP1" }]),
    ).toBe("https://op.gg/ja/lol/multisearch/jp?summoners=Summoner%23JP1");
  });
});
