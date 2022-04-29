import { Either } from "fp-ts/lib/Either";

export interface IMovieRepository {
  fetchMovies(): Promise<Either<MovieError, Movie>>;
}