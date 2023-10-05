import config from "../configs/loggers/config.dev.js";

export default (req, res, next) => {
  req.logger = config;
  req.logger.HTTP(
    `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  return next();
};
