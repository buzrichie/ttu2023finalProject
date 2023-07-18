/**
 * CustomError class for creating custom errors with a specific status code.
 * @class CustomError
 * @extends Error
 */
export default class CustomError extends Error {
  /**
   * Create a new instance of CustomError.
   * @param {string} message - The error message.
   * @param {number} statusCode - The status code associated with the error.
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomError";
  }
}
