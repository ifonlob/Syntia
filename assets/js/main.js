"use strict";

import { cargarHistorial } from "./ui.js";
import {
  entradasDiarias,
  definicionesSintomas,
  aparicionesSintomas,
  medicamentos,
  tomasMedicacion,
} from "./datos.js";

const parametros = new URLSearchParams(window.location.search);
const seccionActual = parametros.get("seccion");

const cargarSeccion = (seccionActual) => {
  switch (seccionActual) {
    case "historial":
      cargarHistorial(
        entradasDiarias,
        definicionesSintomas,
        aparicionesSintomas,
        medicamentos,
        tomasMedicacion
      );
      break;
    case "nuevo-registro":
      break;
    case "sintomas":
      break;
    case "medicacion":
      break;
    case "calendario":
      break;
    case "evolucion":
      break;
    case "informes":
      break;
    case "preferencias":
      break;
  }
};

cargarSeccion(seccionActual);
