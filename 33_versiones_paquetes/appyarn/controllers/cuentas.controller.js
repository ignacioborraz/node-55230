import servicios from "../services/cuentas.service.js";
import ResponseDTO from "../dto/response.dto.js";

const { sumar, restar, dividir, multiplicar } = servicios;

function sumarController(req, res) {
  let { n1, n2 } = req.params;
  let respuestaDelServicio = sumar(n1, n2);
  let responseDto = new ResponseDTO(respuestaDelServicio);
  return res.status(200).json(responseDto);
}

function restarController(req, res) {
  let { n1, n2 } = req.params;
  let respuestaDelServicio = restar(n1, n2);
  let responseDto = new ResponseDTO(respuestaDelServicio);
  return res.status(200).json(responseDto);
}

function dividirController(req, res) {
  let { n1, n2 } = req.params;
  let respuestaDelServicio = dividir(n1, n2);
  let responseDto = new ResponseDTO(respuestaDelServicio);
  return res.status(200).json(responseDto);
}

function multiplicarController(req, res) {
  let { n1, n2 } = req.params;
  let respuestaDelServicio = multiplicar(n1, n2);
  let responseDto = new ResponseDTO(respuestaDelServicio);
  return res.status(200).json(responseDto);
}

export default {
  sumar: sumarController,
  restar: restarController,
  dividir: dividirController,
  multiplicar: multiplicarController,
};
