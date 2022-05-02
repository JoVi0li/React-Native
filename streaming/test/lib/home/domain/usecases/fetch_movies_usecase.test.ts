import { Axios } from "axios";
import { Movie } from "../../../../../lib/home/domain/entities/movie";
import { NoConectionError } from "../../../../../lib/home/domain/errors/movie_error";
import { FetchMoviesUsecase } from "../../../../../lib/home/domain/usecases/fetch_movies_usecase";
import { TmdbDatasourceImpl } from "../../../../../lib/home/external/datasources/tmdb_datasource";
import { AxiosClientImpl } from "../../../../../lib/home/external/services/axios_client";
import { MovieRepositoryImpl } from "../../../../../lib/home/infra/repositories/movie_repository";

const axios = new Axios();
const httpClient = new AxiosClientImpl(axios);
const datasource = new TmdbDatasourceImpl(httpClient);
const repository = new MovieRepositoryImpl(datasource);
const usecase = new FetchMoviesUsecase(repository);

test("should return an instance of Movie", async () => {
  const movieMock: Movie = new Movie(
    "0001",
    "John Wick",
    "9.8",
    "https://movie.cover.com.br"
  )
  const getMovie = jest.fn(
    () => usecase.call().then(
      () => movieMock
    )
  );
  const response = await getMovie();
  expect(response.id).toBe("0001");
});


test("should return an error type of MovieError ", async ()  => {
  const getMovie = jest.fn(
    () => usecase.call().catch(
      (error) => new NoConectionError(
        error.toString()
      )
    )
  );
  const response = await getMovie();
  expect(response["_tag"] === "Left").toBe(true);
});