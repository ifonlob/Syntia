"use strict";

const leerColeccion = (coleccion) => {
  const datosGuardados = localStorage.getItem(coleccion);

  if (datosGuardados === null) {
    return [];
  }

  const datos = JSON.parse(datosGuardados);

  if (!Array.isArray(datos)) {
    throw new TypeError(`La colección "${coleccion}" no es válida.`);
  }

  return datos;
};

const guardarColeccion = (coleccion, datos) => {
  localStorage.setItem(coleccion, JSON.stringify(datos));
};

export const obtenerTodos = (coleccion) => {
  return leerColeccion(coleccion);
};

export const obtenerPorId = (coleccion, id) => {
  const datos = leerColeccion(coleccion);

  return datos.find((dato) => dato.id === id) ?? null;
};

export const crear = (coleccion, dato) => {
  const datos = leerColeccion(coleccion);

  datos = [...datos, dato];

  guardarColeccion(coleccion, datos);

  return dato;
};

export const actualizar = (coleccion, id, dato) => {
  const datos = leerColeccion(coleccion);

  const indice = datos.findIndex((elemento) => elemento.id === id);

  if (indice === -1) return null;

  const datoActualizado = {
    ...datos[indice],
    ...dato,
    id,
  };

  datos[indice] = datoActualizado;

  guardarColeccion(coleccion, datos);

  return datoActualizado;
};

export const borrar = (coleccion, id) => {
  const datos = leerColeccion(coleccion);

  const datosActualizados = datos.filter((dato) => dato.id !== id);

  if (datos.length === datosActualizados.length) {
    return false;
  }

  guardarColeccion(coleccion, datosActualizados);

  return true;
};

export const inicializarColeccion = (coleccion, datosIniciales) => {
  const datosGuardados = localStorage.getItem(coleccion);

  if (datosGuardados !== null) {
    return false;
  }

  guardarColeccion(coleccion, datosIniciales);

  return true;
};
