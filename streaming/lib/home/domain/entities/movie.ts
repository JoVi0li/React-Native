export class Movie{
  private _id: string;
  private _title: string;
  private _rate: string;
  private _cover: string;

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get rate() {
    return this._rate;
  }

  get cover() {
    return this._cover;
  }

  constructor (
    id: string,
    title: string, 
    rate: string,
    cover: string
    ) {
    this._id = id;
    this._title = title;
    this._rate = rate;
    this._cover = cover;
  }
}