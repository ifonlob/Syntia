"use strict";

import {
  entradasDiarias,
  definicionesSintomas,
  aparicionesSintomas,
  medicamentos,
  tomasMedicacion,
} from "./datos.js";

import { inicializarColeccion } from "./almacen.js";

export const inicializarDatos = () => {
  inicializarColeccion("entradasDiarias", entradasDiarias);
  inicializarColeccion("definicionesSintomas", definicionesSintomas);
  inicializarColeccion("aparicionesSintomas", aparicionesSintomas);
  inicializarColeccion("medicamentos", medicamentos);
  inicializarColeccion("tomasMedicacion", tomasMedicacion);
};
