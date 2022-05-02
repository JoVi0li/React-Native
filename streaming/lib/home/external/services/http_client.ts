export interface IHttpClient {
  get(url: string, params: {}, headers: {}): Promise<any>;
  put(): Promise<any>;
  delete(): Promise<any>
}