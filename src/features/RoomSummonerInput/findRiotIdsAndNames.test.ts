import { describe, expect, it } from "vitest";
import { findRiotIdsAndNames } from "./findRiotIdsAndNames";

describe("findRiotIdsAndNames", () => {
  it("正しくRiotIdを取り出す", () => {
    expect(findRiotIdsAndNames("Summoner #JP1")).toEqual([
      [{ gameName: "Summoner", tagLine: "JP1" }],
      [],
    ]);

    expect(
      findRiotIdsAndNames(
        "SummonerA #JP1,SummonerB #JP2、SummonerC #JP3，SummonerD #JP4",
      ),
    ).toEqual([
      [
        { gameName: "SummonerA", tagLine: "JP1" },
        { gameName: "SummonerB", tagLine: "JP2" },
        { gameName: "SummonerC", tagLine: "JP3" },
        { gameName: "SummonerD", tagLine: "JP4" },
      ],
      [],
    ]);
  });

  it("RiotId以外はstringとして取り出す", () => {
    expect(findRiotIdsAndNames("Summoner")).toEqual([[], ["Summoner"]]);

    expect(
      findRiotIdsAndNames(
        "SummonerA #JP1,SummonerB、SummonerC #JP3，SummonerD",
      ),
    ).toEqual([
      [
        { gameName: "SummonerA", tagLine: "JP1" },
        { gameName: "SummonerC", tagLine: "JP3" },
      ],
      ["SummonerB", "SummonerD"],
    ]);
  });

  it("間に空白を含んでいても正しくRiotIdを取り出す", () => {
    expect(findRiotIdsAndNames(" Summoner #JP1 ")).toEqual([
      [{ gameName: "Summoner", tagLine: "JP1" }],
      [],
    ]);

    expect(
      findRiotIdsAndNames(
        " SummonerA #JP1 , SummonerB #JP2 、 SummonerC #JP3 ， SummonerD #JP4 ",
      ),
    ).toEqual([
      [
        { gameName: "SummonerA", tagLine: "JP1" },
        { gameName: "SummonerB", tagLine: "JP2" },
        { gameName: "SummonerC", tagLine: "JP3" },
        { gameName: "SummonerD", tagLine: "JP4" },
      ],
      [],
    ]);
  });

  it("空文字列のとき空配列を返す", () => {
    expect(findRiotIdsAndNames("")).toEqual([[], []]);
  });
});
