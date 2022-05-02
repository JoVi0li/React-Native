import { Axios, AxiosResponse } from "axios";
import { Movie } from "../../domain/entities/movie";
import { IMovieDatasource } from "../../infra/datasources/movie_datasource";
import { IHttpClient } from "../services/http_client";

export class TmdbDatasourceImpl implements IMovieDatasource {

  private _httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
  }

  async fetchMovie(): Promise<AxiosResponse<Movie, any>> {
    const reponse = await this._httpClient.get("https://api.themoviedb.org/3/movie/550?api_key=fdfd9e58d75d71ad73fc57242f4075e3", {}, {});
    return reponse;
  }

}