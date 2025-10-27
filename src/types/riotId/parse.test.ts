import { describe, expect, it } from "vitest";
import { parseRiotId } from "./parse";

describe("parseRiotId", () => {
  it("タグ記号前にスペースが含まれていても正しくRiotIdに変換する", () => {
    expect(parseRiotId("Summoner #JP1")).toEqual({
      gameName: "Summoner",
      tagLine: "JP1",
    });

    expect(parseRiotId("Summoner  #JP1")).toEqual({
      gameName: "Summoner",
      tagLine: "JP1",
    });
  });

  it("タグ記号前にスペースが含まれていなくとも正しくRiotIdに変換する", () => {
    expect(parseRiotId("Summoner#JP1")).toEqual({
      gameName: "Summoner",
      tagLine: "JP1",
    });
  });

  it("ゲーム名中にスペースが含まていても正しくRiotIdに変換する", () => {
    expect(parseRiotId("Super Summoner #JP1")).toEqual({
      gameName: "Super Summoner",
      tagLine: "JP1",
    });
  });

  it("前後に余分なスペースが含まていても正しくRiotIdに変換する", () => {
    expect(parseRiotId("  Summoner #JP1  ")).toEqual({
      gameName: "Summoner",
      tagLine: "JP1",
    });
  });

  it("フォーマット記号がが含まれていても正しくRiotIdに変換する", () => {
    expect(
      parseRiotId("\u2066\u2066Summoner\u2069 #\u2066JP1\u2069\u2069"),
    ).toEqual({
      gameName: "Summoner",
      tagLine: "JP1",
    });
  });

  it("タグ記号が含まていないときundefinedを返す", () => {
    expect(parseRiotId("SummonerJP1")).toBe(undefined);
  });

  it("タグラインが含まていないときundefinedを返す", () => {
    expect(parseRiotId("Summoner#")).toBe(undefined);
  });

  it("ゲーム名が含まていないときundefinedを返す", () => {
    expect(parseRiotId("#JP1")).toBe(undefined);
  });

  it("空文字列のときundefinedを返す", () => {
    expect(parseRiotId("")).toBe(undefined);
  });
});
