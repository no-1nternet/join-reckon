import { Request, Response } from "express";
import { JoinReckonClient } from "../clients";
export const testTwo = async (req: Request, res: Response) => {
  const joinReckonClient = new JoinReckonClient();
  const textToSearchApiRes = await joinReckonClient.getTextToSearch();
  const subTextApiRes = await joinReckonClient.getSubTexts();

  const { text } = textToSearchApiRes;
  const { subTexts } = subTextApiRes;

  const results: { subText: string; result: string }[] = [];
  subTexts.forEach((subText) => {
    results.push({
      subText,
      result: findSubStringLoactions(subText.toLowerCase(), text.toLowerCase()),
    });
  });
  const submitApiRes = await joinReckonClient.submitResult({
    candidate: "Steven Yan",
    text,
    results,
  });

  res.send(submitApiRes.result);
};

function findSubStringLoactions(smallStr: string, bigStr: string): string {
  const M = smallStr.length;
  const N = bigStr.length;
  let found = false;
  const locations: string[] = [];
  for (let i = 0; i <= N - M; i++) {
    let j;

    for (j = 0; j < M; j++) {
      if (bigStr[i + j] != smallStr[j]) break;
    }

    if (j == M) {
      found = true;
      locations.push(i + "");
    }
  }
  if (found) return locations.join(", ");
  return "<No Output>";
}
