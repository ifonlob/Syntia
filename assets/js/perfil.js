import { obtenerPorId } from "./almacen.js";
import { mostrarDatosPerfil } from "./ui.js";

export const inicializarPerfil = () => {
  const usuarioActivoId = sessionStorage.getItem("usuarioActivoId");

  if (!usuarioActivoId) return;

  const usuario = obtenerPorId("usuarios", usuarioActivoId);

  if (!usuario) return;

  mostrarDatosPerfil(usuario);
};
