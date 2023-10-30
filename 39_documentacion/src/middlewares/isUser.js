import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    const cookie = req.cookies["token"];
    if (cookie) {
      const user = jwt.verify(cookie, process.env.JWT);
      if (user) {
        return next();
      }
    }
    let error = new Error("invalid credentials");
    error.status = "error";
    error.statusCode = 401;
    error.where = "middleware";
    return next(error);
  } catch (error) {
    return next(error);
  }
};
