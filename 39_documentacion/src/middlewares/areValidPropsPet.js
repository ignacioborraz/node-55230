import UsersService from "../services/users.service.js";

export default async (req, res, next) => {
  try {
    const { name, specie } = req.body;
    if (!name || !specie) {
      let error = new Error("incomplete values");
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
