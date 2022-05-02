import { AxiosResponse } from "axios";
import { Movie } from "../../domain/entities/movie";

export interface IMovieDatasource {
  fetchMovie(): Promise<AxiosResponse<Movie>>;
}