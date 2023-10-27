import { usersService } from "../services/adoptions.service.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).send({ status: "success", payload: users });
  } catch (error) {
		return res.status(500).send({ status: "fatal", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user)
      return res.status(404).send({ status: "error", error: "User not found" });
    return res.status(200).send({ status: "success", payload: user });
  } catch (error) {
    return res.status(500).send({ status: "fatal", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user)
      return res.status(404).send({ status: "error", error: "User not found" });
    const result = await usersService.update(userId, updateBody);
    return res.status(200).send({ status: "success", message: "User updated" });
  } catch (error) {
    return res.status(500).send({ status: "fatal", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    return res.status(200).send({ status: "success", message: "User deleted" });
  } catch (error) {
    return res.status(500).send({ status: "fatal", error: error.message });
  }
};

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
