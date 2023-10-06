import config from "../configs/loggers/factory.js";

export default (error, req, res, next) => {
  req.logger = config;
  req.logger.FATAL(
    `${req.method} ${req.url} - ${
      error.message
    } - ${new Date().toLocaleTimeString()}`
  );
  return res.status(500).json({
    message: error.message,
    success: false,
  });
};
