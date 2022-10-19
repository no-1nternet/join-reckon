import axios from "axios";
import { HttpClient } from "./HttpClient";

interface GetRangeInfoApiRes {
  lower: number;
  upper: number;
}

interface GetDivisorInfoApiRes {
  outputDetails: { divisor: number; output: string }[];
}

interface GetTextToSearchApiRes {
  text: string;
}

interface GetSubTextsApiRes {
  subTexts: string[];
}

interface SubmitResultApiReq {
  candidate: string;
  text: string;
  results: {
    subText: string;
    result: string;
  }[];
}

interface SubmitResultApiRes {
  result: string;
}

export class JoinReckonClient {
  private static instance: JoinReckonClient;
  private httpClient: HttpClient;
  private baseUrl = process.env.JOIN_RECKON_URL_BASE;
  constructor() {
    this.httpClient = new HttpClient();
  }
  public static getInstance(): JoinReckonClient {
    if (!JoinReckonClient.instance) {
      JoinReckonClient.instance = new JoinReckonClient();
    }

    return JoinReckonClient.instance;
  }

  public async getRangeInfo(): Promise<GetRangeInfoApiRes> {
    const result = await this.httpClient.get(this.baseUrl + "/test1/rangeInfo");
    return result;
  }
  public async getDivisorInfo(): Promise<GetDivisorInfoApiRes> {
    const result = await this.httpClient.get(
      this.baseUrl + "/test1/divisorInfo"
    );
    return result;
  }
  public async getTextToSearch(): Promise<GetTextToSearchApiRes> {
    const result = await this.httpClient.get(
      this.baseUrl + "/test2/textToSearch"
    );
    return result;
  }
  public async getSubTexts(): Promise<GetSubTextsApiRes> {
    const result = await this.httpClient.get(this.baseUrl + "/test2/subTexts");
    return result;
  }

  public async submitResult(
    req: SubmitResultApiReq
  ): Promise<SubmitResultApiRes> {
    const { candidate, text, results } = req;
    const result = await this.httpClient.post(
      this.baseUrl + "/test2/submitResults",
      {
        candidate,
        text,
        results,
      }
    );
    return result;
  }
}
