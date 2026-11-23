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

  const campos = [
    ...formulario.querySelectorAll(
      'input:not([type="hidden"]), select, textarea'
    ),
  ];

  const camposTocados = new Set();

  const mostrarError = (campo, mensajeError) => {
    const identificadorError = campo.getAttribute("aria-describedby");

    const elementoError = document.getElementById(identificadorError);

    if (!elementoError) return;

    elementoError.textContent = mensajeError ?? "";
    campo.setAttribute("aria-invalid", String(Boolean(mensajeError)));
  };

  const validarCampo = (campo) => {
    let mensajeError = null;

    switch (campo.name) {
      case "nombreUsuario":
        mensajeError = validarNombreUsuario(campo.value);
        break;

      case "email":
        mensajeError = validarEmail(campo.value);
        break;

      case "password":
        mensajeError = validarPassword(campo.value, campo.minLength);
        break;

      case "confirmacionPassword":
        mensajeError = validarConfirmacionPassword(
          formulario.elements.namedItem("password").value,
          campo.value
        );
        break;

      case "fechaNacimiento":
        mensajeError = validarFechaNacimiento(campo.value);
        break;

      case "aceptaCondiciones":
        mensajeError = validarCondiciones(campo.checked);
        break;
    }

    mostrarError(campo, mensajeError);

    return !mensajeError;
  };

  formulario.addEventListener("focusout", (evento) => {
    const campo = evento.target;

    if (!campos.includes(campo)) return;

    camposTocados.add(campo);

    validarCampo(campo);
  });

  formulario.addEventListener("input", (evento) => {
    const campo = evento.target;

    if (!camposTocados.has(campo)) return;

    validarCampo(campo);
  });
};
