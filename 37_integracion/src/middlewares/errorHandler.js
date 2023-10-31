export default function (error, req, res, next) {
  let status = error.status || 500;
  let message = error.message;
  let from = req.method + ": " + req.url + ": " + error.from;
  return res.status(status).json({ status, message, from });
}
