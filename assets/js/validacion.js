"use strict";

export const EDAD_MINIMA = 16;

const validarTextoObligatorio = (valor, mensaje) => {
  if (typeof valor !== "string" || valor.trim() === "") {
    return mensaje;
  }

  return null;
};

export const validarNombreUsuario = (valor) => {
  return validarTextoObligatorio(valor, "Introduce un nombre de usuario.");
};

export const validarNombreContacto = (valor) => {
  return validarTextoObligatorio(valor, "Introduce tu nombre.");
};

export const validarEmail = (valor) => {
  if (typeof valor !== "string" || valor.trim() === "") {
    return "Introduce tu correo electrónico.";
  }

  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!patronEmail.test(valor.trim())) {
    return "Introduce un correo electrónico válido.";
  }

  return null;
};

export const validarPassword = (valor, longitudMinima = 8) => {
  if (!valor) {
    return "Introduce una contraseña.";
  }

  if (valor.length < longitudMinima) {
    return `La contraseña debe tener al menos ${longitudMinima} caracteres.`;
  }

  if (!/[A-ZÁÉÍÓÚÜÑ]/.test(valor)) {
    return "La contraseña debe contener al menos una mayúscula.";
  }

  if (!/\d/.test(valor)) {
    return "La contraseña debe contener al menos un número.";
  }

  return null;
};

export const validarConfirmacionPassword = (password, confirmacion) => {
  if (!confirmacion) {
    return "Repite tu contraseña.";
  }

  if (password !== confirmacion) {
    return "Las contraseñas no coinciden.";
  }

  return null;
};

export const obtenerFechaMaximaNacimiento = (edadMinima = EDAD_MINIMA) => {
  const fechaLimite = new Date();

  fechaLimite.setHours(0, 0, 0, 0);
  fechaLimite.setFullYear(fechaLimite.getFullYear() - edadMinima);

  const anio = fechaLimite.getFullYear();
  const mes = String(fechaLimite.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaLimite.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

export const validarFechaNacimiento = (
  valor,
  fechaMaximaPermitida = obtenerFechaMaximaNacimiento()
) => {
  if (!valor) {
    return "Introduce tu fecha de nacimiento.";
  }

  const patronFecha = /^\d{4}-\d{2}-\d{2}$/;

  if (!patronFecha.test(valor)) {
    return "Introduce una fecha de nacimiento válida.";
  }

  const [anio, mes, dia] = valor.split("-").map(Number);

  const fechaNacimiento = new Date(anio, mes - 1, dia);

  if (
    fechaNacimiento.getFullYear() !== anio ||
    fechaNacimiento.getMonth() !== mes - 1 ||
    fechaNacimiento.getDate() !== dia
  ) {
    return "Introduce una fecha de nacimiento válida.";
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaNacimiento > hoy) {
    return "La fecha de nacimiento no puede ser futura.";
  }

  if (valor > fechaMaximaPermitida) {
    return `Debes tener al menos ${EDAD_MINIMA} años para registrarte.`;
  }

  return null;
};

export const validarCondiciones = (aceptaCondiciones) => {
  if (!aceptaCondiciones) {
    return "Debes aceptar las condiciones para registrarte.";
  }

  return null;
};

export const validarPasswordAcceso = (valor) => {
  if (!valor) {
    return "Introduce tu contraseña.";
  }

  return null;
};

export const validarTelefono = (valor, prefiereLlamada = false) => {
  const telefono = valor.trim();

  if (telefono === "") {
    if (prefiereLlamada) {
      return "Introduce tu teléfono para que podamos llamarte.";
    }

    return null;
  }

  const patronTelefono = /^(?:\+34\s?)?[6789](?:[\s.-]?\d){8}$/;

  if (!patronTelefono.test(telefono)) {
    return "Introduce un número de teléfono válido.";
  }

  return null;
};

export const validarMotivo = (valor) => {
  return validarTextoObligatorio(valor, "Selecciona el motivo de tu consulta.");
};

export const validarMensaje = (
  valor,
  longitudMinima = 20,
  longitudMaxima = 1000
) => {
  if (typeof valor !== "string" || valor.trim() === "") {
    return "Escribe un mensaje.";
  }

  if (valor.length < longitudMinima) {
    return `El mensaje debe tener al menos ${longitudMinima} caracteres.`;
  }

  if (valor.length > longitudMaxima) {
    return `El mensaje no puede superar los ${longitudMaxima} caracteres.`;
  }

  return null;
};
