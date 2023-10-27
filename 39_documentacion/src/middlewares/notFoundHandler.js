export default (req, res, next) => {
  let status = "error";
  let message = `${req.method} ${req.url} - Not found`;
  return res.status(500).json({ status, error: message });
};
