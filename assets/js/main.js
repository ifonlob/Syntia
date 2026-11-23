"use strict";

import { cargarHistorial } from "./ui.js";
import { obtenerTodos } from "./almacen.js";
import { inicializarDatos } from "./inicializarDatos.js";
import { inicializarFormularioRegistro } from "./registro.js";
import { inicializarFormularioLogin } from "./login.js";

const paginaActual = document.body.dataset.page;

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
      break;
    }

    case "sintomas": {
      break;
    }

    case "medicacion": {
      break;
    }

    case "calendario": {
      break;
    }

    case "evolucion": {
      break;
    }

    case "informes": {
      break;
    }

    case "preferencias": {
      break;
    }
  }
};

switch (paginaActual) {
  case "registro":
    inicializarFormularioRegistro();
    break;
  case "login":
    inicializarFormularioLogin();
    break;

  case "seccion": {
    inicializarDatos();

    const parametros = new URLSearchParams(window.location.search);
    const seccionActual = parametros.get("seccion");

    cargarSeccion(seccionActual);
    break;
  }
}
