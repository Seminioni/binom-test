export class MovieDoesntExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MovieDoesntExistsError';
  }
}
