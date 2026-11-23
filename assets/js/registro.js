"use strict";

import {
  validarNombreUsuario,
  validarEmail,
  validarPassword,
  validarConfirmacionPassword,
  validarFechaNacimiento,
  validarCondiciones,
} from "./validacion.js";

export const inicializarFormularioRegistro = () => {
  const formulario = document.querySelector("#formulario-registro");

  if (!formulario) return;
};
