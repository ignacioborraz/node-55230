import AdoptionsService from "../services/adoptions.service.js";
import UsersService from "../services/users.service.js";
import PetsService from "../services/pets.service.js";

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;
    const user = await new UsersService().getUserById(uid);
    const pet = await new PetsService().getBy(pid);
    if (!user || !pet) {
      return res.status(404).send({ status: "error", error: "Not found" });
    }
    if (pet.adopted) {
      return res.status(400).send({ status: "error", error: "Already adopted" });
    }
    await new PetsService().update(pet._id, { adopted: true, owner: user._id });
    await new AdoptionsService().create({ owner: user._id, pet: pet._id });
    return res.status(201).send({ status: "success", message: "Pet adopted" });
  } catch (error) {
    return next(error);
  }
};

const getAllAdoptions = async (req, res, next) => {
  try {
    const result = await new AdoptionsService().getAll();
    if (result.length > 0) {
      return res.status(200).send({ status: "success", payload: result });
    }
    return res.status(404).send({ status: "error", error: "Not found" });
  } catch (error) {
    return next(error);
  }
};

const getAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const result = await new AdoptionsService().getBy({ _id: adoptionId });
    if (result) {
      return res.status(200).send({ status: "success", payload: result });
    }
    return res.status(404).send({ status: "error", error: "Not found" });
  } catch (error) {
    return next(error);
  }
};

export { createAdoption, getAllAdoptions, getAdoption };
