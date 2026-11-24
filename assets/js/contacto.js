"use strict";

import {
  validarNombreContacto,
  validarEmail,
  validarTelefono,
  validarMotivo,
  validarMensaje,
} from "./validacion.js";

import { crear } from "./almacen.js";

export const inicializarFormularioContacto = () => {
  const formulario = document.querySelector("#formulario-contacto");

  if (!formulario) return;

  const campos = [
    ...formulario.querySelectorAll(
      'input:not([type="hidden"]):not([type="checkbox"]), select, textarea'
    ),
  ];

  const campoNombre = formulario.elements.namedItem("nombre");
  const campoEmail = formulario.elements.namedItem("email");
  const campoTelefono = formulario.elements.namedItem("telefono");
  const casillaPrefiereLlamada =
    formulario.elements.namedItem("prefiereLlamada");
  const campoMensaje = formulario.elements.namedItem("mensaje");

  const contadorMensaje = formulario.querySelector("#contador-mensaje");
  const estadoContacto = formulario.querySelector("#estado-contacto");

  const camposTocados = new Set();

  const nombreCookie = "syntia_contacto";

  const obtenerCookie = (nombre) => {
    const prefijo = `${nombre}=`;

    const cookieEncontrada = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(prefijo));

    if (!cookieEncontrada) return null;

    try {
      return decodeURIComponent(cookieEncontrada.slice(prefijo.length));
    } catch {
      return null;
    }
  };

  const cargarDatosRecordados = () => {
    const valorCookie = obtenerCookie(nombreCookie);

    if (!valorCookie) return;

    try {
      const datosContacto = JSON.parse(valorCookie);

      campoNombre.value =
        typeof datosContacto.nombre === "string" ? datosContacto.nombre : "";

      campoEmail.value =
        typeof datosContacto.email === "string" ? datosContacto.email : "";
    } catch (error) {
      console.warn("No se pudieron recuperar los datos de contacto:", error);
    }
  };

  const guardarDatosRecordados = (nombre, email) => {
    const datosContacto = encodeURIComponent(JSON.stringify({ nombre, email }));

    const fechaCaducidad = new Date();
    fechaCaducidad.setDate(fechaCaducidad.getDate() + 30);

    const seguridad = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie =
      `${nombreCookie}=${datosContacto}; ` +
      `expires=${fechaCaducidad.toUTCString()}; ` +
      `path=/; SameSite=Lax${seguridad}`;
  };

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
      case "nombre":
        mensajeError = validarNombreContacto(campo.value);
        break;

      case "email":
        mensajeError = validarEmail(campo.value);
        break;

      case "telefono":
        mensajeError = validarTelefono(
          campo.value,
          casillaPrefiereLlamada.checked
        );
        break;

      case "motivo":
        mensajeError = validarMotivo(campo.value);
        break;

      case "mensaje":
        mensajeError = validarMensaje(
          campo.value,
          campo.minLength,
          campo.maxLength
        );
        break;
    }

    mostrarError(campo, mensajeError);

    return !mensajeError;
  };

  const actualizarContador = () => {
    contadorMensaje.textContent = `${campoMensaje.value.length} / ${campoMensaje.maxLength} caracteres`;
  };
  cargarDatosRecordados();

  actualizarContador();

  formulario.addEventListener("focusout", (evento) => {
    const campo = evento.target;

    if (!campos.includes(campo)) return;

    camposTocados.add(campo);

    validarCampo(campo);
  });

  formulario.addEventListener("input", (evento) => {
    const campo = evento.target;

    if (campo === campoMensaje) {
      actualizarContador();
    }

    if (estadoContacto) {
      estadoContacto.textContent = "";
    }

    if (!camposTocados.has(campo)) return;

    validarCampo(campo);
  });

  formulario.addEventListener("change", (evento) => {
    const campo = evento.target;

    if (campo === casillaPrefiereLlamada) {
      camposTocados.add(campoTelefono);

      validarCampo(campoTelefono);
      return;
    }

    if (campos.includes(campo) && camposTocados.has(campo)) {
      validarCampo(campo);
    }
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (estadoContacto) {
      estadoContacto.textContent = "";
    }

    campos.forEach((campo) => camposTocados.add(campo));

    const camposInvalidos = campos.filter((campo) => !validarCampo(campo));

    if (camposInvalidos.length > 0) {
      camposInvalidos[0].focus();
      return;
    }

    const nuevoMensaje = {
      id: globalThis.crypto?.randomUUID?.() ?? `mensaje-${Date.now()}`,
      nombre: campoNombre.value.trim(),
      email: campoEmail.value.trim(),
      telefono: campoTelefono.value.trim(),
      prefiereLlamada: casillaPrefiereLlamada.checked,
      motivo: formulario.elements.namedItem("motivo").value,
      mensaje: campoMensaje.value.trim(),
      creadoEn: new Date().toISOString(),
    };

    try {
      crear("mensajes", nuevoMensaje);
    } catch (error) {
      console.error("No se pudo guardar el mensaje:", error);

      if (estadoContacto) {
        estadoContacto.textContent =
          "No se ha podido guardar el mensaje. Inténtalo de nuevo.";
      }

      return;
    }

    guardarDatosRecordados(nuevoMensaje.nombre, nuevoMensaje.email);

    formulario.reset();

    camposTocados.clear();

    campos.forEach((campo) => mostrarError(campo, null));

    campoNombre.value = nuevoMensaje.nombre;
    campoEmail.value = nuevoMensaje.email;

    actualizarContador();

    if (estadoContacto) {
      estadoContacto.textContent =
        "Tu mensaje se ha guardado correctamente en este navegador.";
    }
  });
};
