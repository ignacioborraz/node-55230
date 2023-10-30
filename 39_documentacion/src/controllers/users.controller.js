import UsersService from "../services/users.service.js";

const getAllUsers = async (req, res, next) => {
  try {
    const result = await new UsersService().getAll({}, next);
    if (result.length > 0) {
      return res.status(200).json({ status: "success", payload: result });
    } else {
      let error = new Error("not found docs");
      error.status = "error";
      error.statusCode = 404;
      error.where = "database";
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const result = await new UsersService().getUserById(userId);
    result.password = null;
    if (result) {
      return res.status(200).json({ status: "success", payload: result });
    } else {
      let error = new Error("not found docs");
      error.status = "error";
      error.statusCode = 404;
      error.where = "database";
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const data = req.body;
    const result = await new UsersService().update(uid, data, next);
    if (result) {
      return res.status(200).json({ status: "success", message: "User updated" });
    } else {
      let error = new Error("not found doc");
      error.status = "error";
      error.statusCode = 404;
      error.where = "database";
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const result = await new UsersService().delete(uid, next);
    if (result) {
      return res.status(200).json({ status: "success", message: "User deleted" });
    } else {
      let error = new Error("not found doc");
      error.status = "error";
      error.statusCode = 404;
      error.where = "database";
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

export { getAllUsers, getUser, updateUser, deleteUser };
