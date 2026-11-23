"use strict";

import { cargarHistorial } from "./ui.js";
import { obtenerTodos } from "./almacen.js";
import { inicializarDatos } from "./inicializarDatos.js";

inicializarDatos();

const parametros = new URLSearchParams(window.location.search);
const seccionActual = parametros.get("seccion");

const cargarSeccion = (seccionActual) => {
  switch (seccionActual) {
    case "historial": {
      const entradasDiarias = obtenerTodos("entradasDiarias");
      const definicionesSintomas = obtenerTodos("definicionesSintomas");
      const aparicionesSintomas = obtenerTodos("aparicionesSintomas");
      const medicamentos = obtenerTodos("medicamentos");
      const tomasMedicacion = obtenerTodos("tomasMedicacion");
      cargarHistorial(
        entradasDiarias,
        definicionesSintomas,
        aparicionesSintomas,
        medicamentos,
        tomasMedicacion
      );
      break;
    }
    case "nuevo-registro": {
    }
    case "sintomas": {
    }
    case "medicacion": {
    }
    case "calendario": {
    }
    case "evolucion": {
    }
    case "informes": {
    }
    case "preferencias": {
    }
  }
};

cargarSeccion(seccionActual);
