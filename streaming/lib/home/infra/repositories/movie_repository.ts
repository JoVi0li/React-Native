import { either } from "fp-ts";
import {Either} from "fp-ts/lib/Either";
import { right } from "fp-ts/lib/EitherT";
import { Movie } from "../../domain/entities/movie";
import { MovieError, NoConectionError } from "../../domain/errors/movie_error";
import { IMovieRepository } from "../../domain/repositories/movie_repository";
import { IMovieDatasource } from "../datasources/movie_datasource";

export class MovieRepositoryImpl implements IMovieRepository{

  private _datasource: IMovieDatasource;

  constructor(datasource: IMovieDatasource) {
    this._datasource = datasource;
  }

  async fetchMovies(): Promise<Either<MovieError, Movie>> {
    try {
      const data = await this._datasource.fetchMovie();
      return either.right(
        data.data
      );
    } catch (error) {
      return either.left(
        new NoConectionError(error.message)
      );
    }
  }

}