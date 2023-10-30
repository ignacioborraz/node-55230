import UsersService from "../services/users.service.js";
import { passwordValidation } from "../config/hash.js";

export default async (req, res, next) => {
  try {
    const user = await new UsersService().getUserByEmail(req.body.email, next);
    const password = req.body.password
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) {
      let error = new Error("invalid credentials");
      error.status = "error";
      error.statusCode = 401;
      error.where = "middleware";
      return next(error);
    } else {
      delete user.password
      req.user = user
      return next()
    }
  } catch (error) {
    error.where = "middleware";
    return next(error);
  }
};
