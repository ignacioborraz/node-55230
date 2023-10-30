export default (error, req, res, next) => {
  console.log(error);
  let status = error.status || "fatal";
  let statusCode = error.statusCode || 500;
  let where = error.where || "error handler";
  let from = `${req.method} ${req.url} ${where}`;
  let message = `${error.message[0].toUpperCase()}${error.message.slice(1).toLowerCase()}`;
  return res.status(statusCode).json({ status, from, message });
};
