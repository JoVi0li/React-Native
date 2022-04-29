import { Either } from "fp-ts/lib/Either";
import { IMovieRepository } from "../repositories/movie_repository";

interface IFetchMoviesUsecase {
  call(): Promise<Either<MovieError, Movie>>;
}

class FetchMoviesUsecase implements IFetchMoviesUsecase {
  private _repository: IMovieRepository;

  constructor(repository: IMovieRepository){
    this._repository = repository;
  }

  async call(): Promise<Either<MovieError, Movie>>  {
    var response = await this._repository.fetchMovies();
    return response;
  }

}