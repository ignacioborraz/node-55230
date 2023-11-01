import MyError from "../config/MyError.js";
import errors from "../config/errors.js";

export default async (req, res, next) => {
  try {
    const { name, photo, price } = req.body;
    if (!name || !photo || ! price) {
      MyError.new(errors.incomplete);
    } else {
      return next();
    }
  } catch (error) {
    error.where = "middleware";
    return next(error);
  }
};
