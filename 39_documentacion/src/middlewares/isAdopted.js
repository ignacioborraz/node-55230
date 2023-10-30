export default async (req, res, next) => {
  try {
    if (req.pet.adopted) {
      let error = new Error("already adopted");
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
