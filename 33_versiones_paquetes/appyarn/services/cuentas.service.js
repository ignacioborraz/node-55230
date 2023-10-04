import calculator55230 from "calculator-55230";
const { sumar, restar, dividir, multiplicar } = calculator55230;

const sumarService = (n1, n2) => sumar(n1, n2);
const restarService = (n1, n2) => restar(n1, n2);
const dividirService = (n1, n2) => dividir(n1, n2);
const multiplicarService = (n1, n2) => multiplicar(n1, n2);

export default {
  sumar: sumarService,
  restar: restarService,
  dividir: dividirService,
  multiplicar: multiplicarService,
};
