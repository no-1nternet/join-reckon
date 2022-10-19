import { Request, Response } from "express";
import { JoinReckonClient } from "../clients";
export const testOne = async (req: Request, res: Response) => {
  const joinReckonClient = new JoinReckonClient();

  const rangeApiRes = await joinReckonClient.getRangeInfo();
  const divisorInfoApiRes = await joinReckonClient.getDivisorInfo();
  const { lower, upper } = rangeApiRes;

  const result: string[] = [];
  for (let i = lower; i <= upper; i++) {
    let row = i + ": ";
    divisorInfoApiRes.outputDetails.forEach((di) => {
      if (!(i % di.divisor)) {
        row += di.output;
      }
    });
    result.push(row);
  }

  // /n does not work so I use <div> haha.
  const resultStr = result.reduce(
    (pv, cv, i, arr) => pv + "<div>" + cv + "</div>",
    ""
  );

  res.send(resultStr);
};
