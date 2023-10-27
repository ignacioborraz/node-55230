export default (error, req, res, next) => {
  console.log(error);
  let status = "fatal";
  let message = `${req.method} ${req.url} - ${error.message}`;
  return res.status(500).json({ status, error: message });
};
