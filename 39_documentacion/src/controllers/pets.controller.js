import __dirname from "../../utils.js";
import PetsService from "../services/pets.service.js";
import CustomError from "../config/CustomError.js";
import errors from "../config/errors.js";

const createPet = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await new PetsService().create(data, next);
    return res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const createPetWithImage = async (req, res, next) => {
  try {
    let data = req.body;
    let file = req.file;
    req.body.image = `${__dirname}/src/public/img/${file.filename}`;
    let result = await new PetsService().create(data, next);
    return res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const getAllPets = async (req, res, next) => {
  try {
    const result = await new PetsService().getAll({}, next);
    if (result.length > 0) {
      return res.status(200).json({ status: "success", payload: result });
    }
    CustomError.newError(errors.notFound);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const updatePet = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const data = req.body;
    const result = await new PetsService().update(pid, data, next);
    if (result) {
      return res.status(200).json({ status: "success", message: "Pet updated" });
    }
    CustomError.newError(errors.notFound);
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const deletePet = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const result = await new PetsService().delete(pid, next);
    if (result) {
      return res.status(200).json({ status: "success", message: "Pet deleted" });
    }
    CustomError.newError(errors.notFound);
  } catch (error) {
    return next(error);
  }
};

export { createPet, createPetWithImage, getAllPets, updatePet, deletePet };
