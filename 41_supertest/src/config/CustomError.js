export default class {
  static newError({ message, status, statusCode, where }) {
    const error = new Error(message);
    error.message = message;
    error.status = status
    error.statusCode = statusCode
    error.where = where
    throw error;
  }
}
