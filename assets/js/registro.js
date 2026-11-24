"use strict";

import {
  validarNombreUsuario,
  validarEmail,
  validarPassword,
  validarConfirmacionPassword,
  validarFechaNacimiento,
  validarCondiciones,
} from "./validacion.js";

import { crear } from "./almacen.js";

export const inicializarFormularioRegistro = () => {
  const formulario = document.querySelector("#formulario-registro");

  if (!formulario) return;

  const campos = [
    ...formulario.querySelectorAll(
      'input:not([type="hidden"]), select, textarea'
    ),
  ];

  const campoNombreUsuario = formulario.elements.namedItem("nombreUsuario");
  const campoEmail = formulario.elements.namedItem("email");
  const campoPassword = formulario.elements.namedItem("password");
  const campoConfirmacionPassword = formulario.elements.namedItem(
    "confirmacionPassword"
  );
  const campoFechaNacimiento = formulario.elements.namedItem("fechaNacimiento");
  const campoAceptaCondiciones =
    formulario.elements.namedItem("aceptaCondiciones");

  const campoUsuarioId = formulario.elements.namedItem("usuarioId");
  const estadoRegistro = formulario.querySelector("#estado-registro");

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
          campoPassword.value,
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

  const generarIdUsuario = () => {
    if (globalThis.crypto?.randomUUID) {
      return `usuario-${globalThis.crypto.randomUUID()}`;
    }

    return `usuario-${Date.now()}`;
  };

  const limpiarFormulario = () => {
    formulario.reset();

    camposTocados.clear();

    campos.forEach((campo) => {
      mostrarError(campo, null);
    });

    campoUsuarioId.value = "";
  };

  formulario.addEventListener("focusout", (evento) => {
    const campo = evento.target;

    if (!campos.includes(campo)) return;

    camposTocados.add(campo);

    validarCampo(campo);
  });

  formulario.addEventListener("input", (evento) => {
    const campo = evento.target;

    if (estadoRegistro) {
      estadoRegistro.textContent = "";
    }

    if (!camposTocados.has(campo)) return;

    validarCampo(campo);

    if (
      campo === campoPassword &&
      camposTocados.has(campoConfirmacionPassword)
    ) {
      validarCampo(campoConfirmacionPassword);
    }
  });

  formulario.addEventListener("change", (evento) => {
    const campo = evento.target;

    if (campos.includes(campo) && camposTocados.has(campo)) {
      validarCampo(campo);
    }
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (estadoRegistro) {
      estadoRegistro.textContent = "";
    }

    campos.forEach((campo) => camposTocados.add(campo));

    const camposInvalidos = campos.filter((campo) => !validarCampo(campo));

    if (camposInvalidos.length > 0) {
      camposInvalidos[0].focus();
      return;
    }

    const nuevoUsuario = {
      id: generarIdUsuario(),
      nombreUsuario: campoNombreUsuario.value.trim(),
      email: campoEmail.value.trim(),
      fechaNacimiento: campoFechaNacimiento.value,
      aceptaCondiciones: campoAceptaCondiciones.checked,
      creadoEn: new Date().toISOString(),
      actualizadoEn: new Date().toISOString(),
    };

    try {
      crear("usuarios", nuevoUsuario);
    } catch (error) {
      console.error("No se pudo guardar el usuario:", error);

      if (estadoRegistro) {
        estadoRegistro.textContent =
          "No se ha podido crear la cuenta. Inténtalo de nuevo.";
      }

      return;
    }

    try {
      sessionStorage.setItem("usuarioActivoId", nuevoUsuario.id);
    } catch (error) {
      console.error("No se pudo identificar al usuario activo:", error);
    }

    limpiarFormulario();

    if (estadoRegistro) {
      estadoRegistro.textContent =
        "Tu cuenta se ha creado correctamente. Redirigiendo...";
    }

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 3000);
  });
};
