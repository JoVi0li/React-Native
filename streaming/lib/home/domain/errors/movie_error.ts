export abstract class MovieError extends Error {
  private _message: string;
  private _error: string;
  private _stack?: string;
  private _cause?: Error;

  get message() {
    return this._message;
  }

  get error() {
    return this._error;
  }

  get stack(){
    return this._stack;
  }

  get cause() {
    return this._cause;
  }

  constructor(error: string, message: string, stack?: string, cause?: Error) {
    super();
    this._error = error;
    this._message = message;
    this._stack = stack;
    this._cause = cause;
  }
}

export class NoConectionError extends MovieError {
  constructor (error: string){
    super(
      error,
      "Não foi possível estabelecer uma conexão com servidor. Tente novamente."
    );
  }
}

export class Unauthorized extends MovieError {
  constructor(error: string) {
    super(
      error,
      "Você não possui autorização para realizar esta ação."
    );
  }
}

export class Unauthenticated extends MovieError {
  constructor(error: string) {
    super(
      error,
      "Tivemos um problema com a sua autenticação. Tente novamente."
    );
  }
}

export class NotFound extends MovieError {
  constructor(error: string){
    super(
      error,
      "Não encontramos nenhum resultado. Por favor, revise os parâmetros de busca."
    );
  }
}
