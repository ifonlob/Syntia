"use strict";

import { validarEmail, validarPasswordAcceso } from "./validacion.js";

export const inicializarFormularioLogin = () => {
  const formulario = document.querySelector("#formulario-login");

  if (!formulario) return;

  const campos = [
    ...formulario.querySelectorAll(
      'input:not([type="hidden"]), select, textarea'
    ),
  ];

  const camposTocados = new Set();

  const mostrarError = (campo, mensajeError) => {
    const identificador = campo.getAttribute("aria-describedby");

    if (!identificador) return;

    const elementoError = document.getElementById(identificador);

    if (!elementoError) return;

    elementoError.textContent = mensajeError ?? "";
    campo.setAttribute("aria-invalid", String(Boolean(mensajeError)));
  };

  const validarCampo = (campo) => {
    let mensajeError = null;

    switch (campo.name) {
      case "email":
        mensajeError = validarEmail(campo.value);
        break;

      case "password":
        mensajeError = validarPasswordAcceso(campo.value);
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

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    campos.forEach((campo) => camposTocados.add(campo));

    const camposInvalidos = campos.filter((campo) => !validarCampo(campo));

    if (camposInvalidos.length > 0) {
      camposInvalidos[0].focus();
      return;
    }

    // TODO: lógica de inicio de sesión.
  });
};
