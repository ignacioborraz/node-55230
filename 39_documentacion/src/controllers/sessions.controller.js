import UsersService from "../services/users.service.js";

const register = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await new UsersService().create(data, next);
    return res.status(201).json({ status: "success", payload: result._id });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const login = async (req, res) => {
  try {
    return res.status(200).cookie("token", req.token, { maxAge: 60 * 60 * 1000 }).json({ status: "success", message: "Logged in" });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const signout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({ status: "success", message: "Signed out" });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

export { login, register, signout };
