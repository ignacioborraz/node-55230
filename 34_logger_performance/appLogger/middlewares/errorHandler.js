export default (error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    message: error.message,
    response: `${req.method} ${req.ur}l`,
  });
};
