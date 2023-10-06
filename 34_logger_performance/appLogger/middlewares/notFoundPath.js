import config from "../configs/loggers/factory.js";

export default (req, res, next) => {
  let message = `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`;
  req.logger = config;
  req.logger.WARN(
    `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  return res.status(404).json({
    message,
    success: false,
  });
};
