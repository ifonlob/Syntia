"use strict";

import { obtenerTodos } from "./almacen.js";
import { cargarMensajes } from "./ui.js";

export const inicializarMensajes = () => {
  const mensajes = obtenerTodos("mensajes");
  cargarMensajes(mensajes);
};
