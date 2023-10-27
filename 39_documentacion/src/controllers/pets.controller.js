import __dirname from "../../utils.js";
import PetsService from "../services/pets.service.js";

const createPet = async (req, res, next) => {
  try {
    const { name, specie } = req.body;
    if (!name || !specie) {
      return res.status(400).send({ status: "error", error: "Incomplete values" });
    }
    const result = await new PetsService().create(req.body);
    return res.status(201).send({ status: "success", payload: result });
  } catch (error) {
    return next(error);
  }
};

const createPetWithImage = async (req, res, next) => {
  try {
    const { name, specie } = req.body;
    if (!name || !specie) {
      return res.status(400).send({ status: "error", error: "Incomplete values" });
    }
    const file = req.file;
    req.body.image = `${__dirname}/src/public/img/${file.filename}`;
    const result = await new PetsService().create(req.body);
    return res.status(201).send({ status: "success", payload: result });
  } catch (error) {
    return next(error);
  }
};

const getAllPets = async (req, res, next) => {
  try {
    const result = await new PetsService().getAll();
    if (result.length > 0) {
      return res.status(200).send({ status: "success", payload: result });
    }
    return res.status(404).send({ status: "error", error: "Not found" });
  } catch (error) {
    return next(error);
  }
};

const updatePet = async (req, res, next) => {
  try {
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await new PetsService().update(petId, petUpdateBody);
    if (result) {
      return res.status(200).send({ status: "success", message: "Pet updated" });
    }
    return res.status(404).send({ status: "error", error: "Not found" });
  } catch (error) {
    return next(error);
  }
};

const deletePet = async (req, res, next) => {
  try {
    const petId = req.params.pid;
    const result = await new PetsService().delete(petId);
    if (result) {
      return res.status(200).send({ status: "success", message: "Pet deleted" });
    }
    return res.status(404).send({ status: "error", error: "Not found" });
  } catch (error) {
    return next(error);
  }
};

export { createPet, createPetWithImage, getAllPets, updatePet, deletePet };
