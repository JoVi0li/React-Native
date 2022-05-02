import { Axios } from "axios";
import { Movie } from "../../../../../lib/home/domain/entities/movie";
import { Unauthenticated } from "../../../../../lib/home/domain/errors/movie_error";
import { TmdbDatasourceImpl } from "../../../../../lib/home/external/datasources/tmdb_datasource";
import { AxiosClientImpl } from "../../../../../lib/home/external/services/axios_client";

const axios = new Axios();
const httpClient = new AxiosClientImpl(axios);
const datasource = new TmdbDatasourceImpl(httpClient);

test("should return an instance of Movie", async () => {
  const movieMock: Movie = new Movie(
    "0001",
    "Homem-Aranha",
    "10.0",
    "https://movie.cover.com.br"
  );
  const getMovie = jest.fn(
    () => datasource.fetchMovie().then(
      () => movieMock
    )
  )
  const response = await getMovie();
  expect(response.id).toBe("0001");
});

test("should return an instance type of MovieError", async () => {
  const getMovie = jest.fn(
    () => datasource.fetchMovie().catch(
      (error) => new Unauthenticated(error.toString())
    )
  )
  const response = await getMovie();
  expect(response["_tag"] === "Left").toBe(true);
})


