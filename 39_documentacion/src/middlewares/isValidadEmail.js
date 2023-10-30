import UsersService from "../services/users.service.js";

export default async (req, res, next) => {
  try {
    const exists = await new UsersService().getUserByEmail(
      req.body.email,
      next
    );
    if (exists) {
      let error = new Error("User already exists");
      error.status = "error";
      error.statusCode = 400;
      error.where = "middleware";
      return next(error);
    } else {
      return next();
    }
  } catch (error) {
    error.where = "middleware";
    return next(error);
  }
};
