import { Axios } from "axios";
import { IHttpClient } from "./http_client";

export class AxiosClientImpl implements IHttpClient {

  private _client: Axios;

  constructor(client: Axios) {
    this._client = client;
  }

  async get(url: string, params: {}, headers: {}): Promise<any> {
    const data = await this._client.get(url, {params, headers});
    const datatParsed = JSON.stringify(data);
    return datatParsed;
  }

  async put(): Promise<any> {

  }

  async delete(): Promise<any> {

  }
}