import AdoptionsService from "../services/adoptions.service.js";
import PetsService from "../services/pets.service.js";

const createAdoption = async (req, res, next) => {
  try {
    await new PetsService().update(req.pet._id, { adopted: true, owner: req.user._id }, next);
    await new AdoptionsService().create({ owner: req.user._id, pet: req.pet._id }, next);
    return res.status(201).json({ status: "success", message: "Pet adopted" });
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

const getAllAdoptions = async (req, res, next) => {
  try {
    const result = await new AdoptionsService().getAll({}, next);
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
    error.where = "controller";
    return next(error);
  }
};

const getAdoption = async (req, res, next) => {
  try {
    const aid = req.params.aid;
    const result = await new AdoptionsService().getBy({ _id: aid }, next);
    if (result) {
      return res.status(200).json({ status: "success", payload: result });
    } else {
      let error = new Error("not found doc");
      error.status = "error";
      error.statusCode = 404;
      error.where = "database";
      return next(error);
    }
  } catch (error) {
    error.where = "controller";
    return next(error);
  }
};

export { createAdoption, getAllAdoptions, getAdoption };
