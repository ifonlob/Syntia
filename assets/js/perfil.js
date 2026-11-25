"use strict";

import { obtenerPorId, borrar } from "./almacen.js";
import { mostrarDatosPerfil } from "./ui.js";

export const inicializarPerfil = () => {
  const usuarioActivoId = sessionStorage.getItem("usuarioActivoId");

  const contenedorPrincipal = document.querySelector(".contenido-seccion");

  if (!contenedorPrincipal) return;

  if (!usuarioActivoId) {
    contenedorPrincipal.textContent =
      "No hay ningún usuario con la sesión iniciada.";
    return;
  }

  const usuario = obtenerPorId("usuarios", usuarioActivoId);

  if (!usuario) {
    contenedorPrincipal.textContent =
      "No se ha encontrado la información de tu perfil.";
    return;
  }

  mostrarDatosPerfil(usuario);

  const botonDeBorrado = contenedorPrincipal.querySelector(
    ".tarjeta-perfil__boton--eliminar"
  );

  const estadoPerfil = contenedorPrincipal.querySelector(
    ".tarjeta-perfil__estado"
  );

  botonDeBorrado.addEventListener("click", () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
    );

    if (!confirmacion) return;

    try {
      const eliminado = borrar("usuarios", usuarioActivoId);

      if (!eliminado) {
        estadoPerfil.textContent =
          "No se ha podido encontrar la cuenta que quieres eliminar.";
        return;
      }

      sessionStorage.removeItem("usuarioActivoId");

      window.location.href = "./registro.html";
    } catch (error) {
      estadoPerfil.textContent =
        "No se ha podido eliminar la cuenta. Inténtalo de nuevo.";
    }
  });
};
