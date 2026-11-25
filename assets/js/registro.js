"use strict";

import {
  validarNombreUsuario,
  validarEmail,
  validarPassword,
  validarConfirmacionPassword,
  validarFechaNacimiento,
  validarCondiciones,
} from "./validacion.js";

import { crear, obtenerPorId, actualizar } from "./almacen.js";

export const inicializarFormularioRegistro = () => {
  const formulario = document.querySelector("#formulario-registro");

  if (!formulario) return;

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

  const parametros = new URLSearchParams(window.location.search);
  const modoEdicion = parametros.get("modo") === "editar";

  let usuarioEnEdicion = null;

  if (modoEdicion) {
    const usuarioActivoId = sessionStorage.getItem("usuarioActivoId");
    const botonDeConfirmacion = document.querySelector(
      "#boton-enviar-registro"
    );

    if (!usuarioActivoId) {
      if (estadoRegistro) {
        estadoRegistro.textContent =
          "No hay ningún usuario activo para editar.";
      }

      return;
    }

    usuarioEnEdicion = obtenerPorId("usuarios", usuarioActivoId);

    if (!usuarioEnEdicion) {
      if (estadoRegistro) {
        estadoRegistro.textContent =
          "No se ha encontrado el usuario que quieres editar.";
      }

      return;
    }

    botonDeConfirmacion.textContent = "Actualizar Perfil";
    campoUsuarioId.value = usuarioEnEdicion.id;
    campoNombreUsuario.value = usuarioEnEdicion.nombreUsuario;
    campoEmail.value = usuarioEnEdicion.email;
    campoFechaNacimiento.value = usuarioEnEdicion.fechaNacimiento;
    campoAceptaCondiciones.checked = usuarioEnEdicion.aceptaCondiciones;

    campoPassword.disabled = true;
    campoConfirmacionPassword.disabled = true;
    campoAceptaCondiciones.disabled = true;

    const grupoContrasena = formulario.querySelector("#grupo-seguridad");

    if (grupoContrasena) {
      grupoContrasena.hidden = true;
    }
  }

  const campos = [
    ...formulario.querySelectorAll(
      'input:not([type="hidden"]), select, textarea'
    ),
  ].filter((campo) => !campo.disabled);

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

    const ahora = new Date().toISOString();

    if (modoEdicion) {
      const usuarioId = campoUsuarioId.value;

      const datosActualizados = {
        nombreUsuario: campoNombreUsuario.value.trim(),
        email: campoEmail.value.trim(),
        fechaNacimiento: campoFechaNacimiento.value,
        aceptaCondiciones: usuarioEnEdicion.aceptaCondiciones,
        actualizadoEn: ahora,
      };

      try {
        actualizar("usuarios", usuarioId, datosActualizados);
      } catch (error) {
        console.error("No se pudo actualizar el usuario:", error);

        if (estadoRegistro) {
          estadoRegistro.textContent =
            "No se han podido guardar los cambios. Inténtalo de nuevo.";
        }

        return;
      }

      if (estadoRegistro) {
        estadoRegistro.textContent =
          "Tu perfil se ha actualizado correctamente. Redirigiendo...";
      }

      setTimeout(() => {
        window.location.href = "./seccion.html?seccion=perfil";
      }, 3000);

      return;
    }

    const nuevoUsuario = {
      id: generarIdUsuario(),
      nombreUsuario: campoNombreUsuario.value.trim(),
      email: campoEmail.value.trim(),
      fechaNacimiento: campoFechaNacimiento.value,
      aceptaCondiciones: campoAceptaCondiciones.checked,
      creadoEn: ahora,
      actualizadoEn: ahora,
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
