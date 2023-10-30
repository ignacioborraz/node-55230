import UsersService from "../services/users.service.js";

export default async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      let error = new Error("incomplete values");
      error.status = "error";
      error.statusCode = 400;
      error.where = "middleware";
      return next(error);
    } else {
      const user = await new UsersService().getUserByEmail(email, next);
      if (!user) {
        let error = new Error("invalid credentials");
        error.status = "error";
        error.statusCode = 401;
        error.where = "middleware";
        return next(error);
      }
      return next();
    }
  } catch (error) {
    error.where = "middleware";
    return next(error);
  }
};
