import config from "../configs/loggers/factory.js";

export default (req, res, next) => {
  req.logger = config;
  req.logger.HTTP(
    `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  return next();
};
