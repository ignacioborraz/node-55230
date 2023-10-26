import {
  adoptionsService,
  petsService,
  usersService,
} from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  try {
    const result = await adoptionsService.getAll();
    return res.status(200).send({ status: "success", payload: result });
  } catch (error) {
		return res.status(500).send({ status: "fatal", error: error.message });
	}
};

const getAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({ _id: adoptionId });
    if (!adoption)
      return res.status(404).send({ status: "error", error: "Adoption not found" });
    return res.status(200).send({ status: "success", payload: adoption });
  } catch (error) {
		return res.status(500).send({ status: "fatal", error: error.message });
	}
};

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;
    const user = await usersService.getUserById(uid);
    if (!user)
      return res.status(404).send({ status: "error", error: "user Not found" });
    const pet = await petsService.getBy({ _id: pid });
    if (!pet)
      return res.status(404).send({ status: "error", error: "Pet not found" });
    if (pet.adopted)
      return res.status(400).send({ status: "error", error: "Pet is already adopted" });
    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets });
    await petsService.update(pet._id, { adopted: true, owner: user._id });
    await adoptionsService.create({ owner: user._id, pet: pet._id });
    return res.status(201).send({ status: "success", message: "Pet adopted" });
  } catch (error) {
		return res.status(500).send({ status: "fatal", error: error.message });
	}
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
};
