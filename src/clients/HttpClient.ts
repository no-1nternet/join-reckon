import axios from "axios";

export class HttpClient {
  private static instance: HttpClient;
  constructor() {}
  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }

    return HttpClient.instance;
  }

  public async get(url: string): Promise<any> {
    const retries = 3;
    try {
      const config = {
        timeout: 1000,
      };
      for (let i = 0; i < retries; i++) {
        try {
          const req = await axios.get(url, config);
          if (req) {
            return req.data;
          } else {
            console.log(
              `Get request for url: ${url} failed on attempt ${i + 1}, retry...`
            );
          }
        } catch (error) {
          console.log(
            `Get request for url: ${url} failed on attempt ${i + 1}, retry...`
          );
        }
      }
      console.log(`request failed after ${retries} retries. :(`);
    } catch (err: any) {
      console.log(err);
    }
  }

  public async post(url: string, data: any): Promise<any> {
    const retries = 3;
    try {
      const config = {
        timeout: 1000,
      };
      for (let i = 0; i < retries; i++) {
        try {
          const req = await axios.post(url, data, config);
          if (req) {
            return req.data;
          } else {
            console.log(
              `Post request for url: ${url} failed on attempt ${
                i + 1
              }, retry...`
            );
          }
        } catch (error) {
          console.log(
            `Post request for url: ${url} failed on attempt ${i + 1}, retry...`
          );
        }
      }
      console.log(`request failed after ${retries} retries. :(`);
    } catch (err: any) {
      console.log(err);
    }
  }
}
