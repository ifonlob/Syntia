"use strict";

import { obtenerTodos, borrar } from "./almacen.js";
import { cargarMensajes } from "./ui.js";

const actualizarListado = () => {
  const mensajes = obtenerTodos("mensajes");
  cargarMensajes(mensajes);
};

const gestionarAccionesMensaje = (evento) => {
  const elementoPulsado = evento.target;

  const botonBorrar = elementoPulsado.closest('[data-accion="borrar-mensaje"]');

  if (!botonBorrar) return;

  const tarjeta = botonBorrar.closest("[data-mensaje-id]");

  if (!tarjeta) return;

  const id = tarjeta.dataset.mensajeId;

  const confirmarBorrado = confirm(
    "¿Estás segura de que quieres borrar este mensaje?"
  );

  if (!confirmarBorrado) return;

  borrar("mensajes", id);

  actualizarListado();
};

export const inicializarMensajes = () => {
  const contenedor = document.querySelector(".contenido-seccion");

  if (!contenedor) return;

  contenedor.addEventListener("click", gestionarAccionesMensaje);

  actualizarListado();
};
