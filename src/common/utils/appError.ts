export class AppError extends Error {
  constructor(error: Error) {
    super();

    console.log(error);
  }
}
