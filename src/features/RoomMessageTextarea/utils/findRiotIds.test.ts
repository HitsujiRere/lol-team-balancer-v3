import { describe, expect, it } from "vitest";
import { findRiotIds } from "./findRiotIds";

describe("findRiotIds", () => {
  it("正しくRiotIdを取り出す", () => {
    expect(findRiotIds("Summoner #JP1がロビーに参加しました。")).toEqual([
      { gameName: "Summoner", tagLine: "JP1" },
    ]);

    expect(
      findRiotIds(
        "SummonerA #JP1がロビーに参加しました。\n" +
          "SummonerB #JP2がロビーに参加しました。\n" +
          "SummonerC #JP3がロビーに参加しました。\n",
      ),
    ).toEqual([
      { gameName: "SummonerA", tagLine: "JP1" },
      { gameName: "SummonerB", tagLine: "JP2" },
      { gameName: "SummonerC", tagLine: "JP3" },
    ]);
  });

  it("参加メッセージ以外は無視する", () => {
    expect(findRiotIds("こんにちは")).toEqual([]);

    expect(
      findRiotIds(
        "SummonerA #JP1がロビーに参加しました。\n" +
          "こんにちは\n" +
          "SummonerB #JP2がロビーに参加しました。\n",
      ),
    ).toEqual([
      { gameName: "SummonerA", tagLine: "JP1" },
      { gameName: "SummonerB", tagLine: "JP2" },
    ]);
  });

  it("フォーマット記号がが含まれていても正しくRiotIdを取り出す", () => {
    expect(
      findRiotIds(
        "\u2066\u2066Summoner\u2069 #\u2066JP1\u2069\u2069がロビーに参加しました。",
      ),
    ).toEqual([{ gameName: "Summoner", tagLine: "JP1" }]);

    expect(
      findRiotIds(
        "\u2066\u2066SummonerA\u2069 #\u2066JP1\u2069\u2069がロビーに参加しました。\n" +
          "\u2066\u2066SummonerB\u2069 #\u2066JP2\u2069\u2069がロビーに参加しました。\n" +
          "\u2066\u2066SummonerC\u2069 #\u2066JP3\u2069\u2069がロビーに参加しました。\n",
      ),
    ).toEqual([
      { gameName: "SummonerA", tagLine: "JP1" },
      { gameName: "SummonerB", tagLine: "JP2" },
      { gameName: "SummonerC", tagLine: "JP3" },
    ]);
  });

  it("空文字列のとき空配列を返す", () => {
    expect(findRiotIds("")).toEqual([]);
  });
});
