import { Axios } from "axios";
import { Movie } from "../../../../../lib/home/domain/entities/movie";
import { NoConectionError } from "../../../../../lib/home/domain/errors/movie_error";
import { TmdbDatasourceImpl } from "../../../../../lib/home/external/datasources/tmdb_datasource";
import { AxiosClientImpl } from "../../../../../lib/home/external/services/axios_client";
import { MovieRepositoryImpl } from "../../../../../lib/home/infra/repositories/movie_repository";

const axios = new Axios();
const httpClient = new AxiosClientImpl(axios);
const datasource = new TmdbDatasourceImpl(httpClient);
const repository = new MovieRepositoryImpl(datasource);

test("should return an instance type of Movie", async () => {
  const movieMock: Movie = new Movie(
    "0001",
    "Vingadores",
    "10.0",
    "https://movie.covers.com.br"
  );
  const getMovie = jest.fn(
    () => repository.fetchMovies().then(
      () => movieMock
    )
  );
  const response = await getMovie();
  expect(response.id).toBe("0001");
});


test("should return an instance type of MovieError", async () => {
  const getMovie = jest.fn(
    () => repository.fetchMovies().catch(
      (error) => new NoConectionError(error)
    )
  )
  const response = await getMovie();
  expect(response["_tag"] === "Left").toBe(true);
});