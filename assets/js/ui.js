"use strict";

import {
  entradasDiarias,
  definicionesSintomas,
  aparicionesSintomas,
  medicamentos,
  tomasMedicacion,
} from "./datos.js";

export const cargarHistorial = (
  entradasDiarias,
  definicionesSintomas,
  aparicionesSintomas
) => {
  const contenedorPrincipal = document.querySelector(".contenido-seccion");
  const cabecera = document.createElement("header");
  const imagenCalendario = document.createElement("img");
  const titulo = document.createElement("h2");
  const subtitulo = document.createElement("p");

  cabecera.classList.add("seccion-introduccion__cabecera");
  titulo.classList.add("seccion-introduccion__titulo");
  imagenCalendario.classList.add("seccion-introduccion__imagen");
  subtitulo.classList.add("seccion-introduccion__subtitulo");

  titulo.textContent = "Historial de registros";
  subtitulo.textContent = "Consulta tus registros de salud y bienestar";
  imagenCalendario.src = "./assets/icons/calendario.svg";
  imagenCalendario.alt = "Icono Calendario";

  cabecera.append(imagenCalendario);
  cabecera.append(titulo);
  cabecera.append(subtitulo);

  contenedorPrincipal.append(cabecera);

  const historialListado = document.createElement("section");

  entradasDiarias.forEach((entrada) => {
    const tarjeta = document.createElement("article");
    const cabeceraTarjeta = document.createElement("header");
    const fechaTarjeta = document.createElement("time");
    const tituloTarjeta = document.createElement("h3");
    const listaDatos = document.createElement("ul");

    tarjeta.classList.add("tarjeta-entrada");
    cabeceraTarjeta.classList.add("tarjeta-entrada__cabecera");
    fechaTarjeta.classList.add("tarjeta-entrada__fecha");
    tituloTarjeta.classList.add("tarjeta-entrada__titulo");
    listaDatos.classList.add("tarjeta-entrada__lista");

    const filaSueno = document.createElement("li");
    const filaEnergia = document.createElement("li");
    const filaEstres = document.createElement("li");

    const filaSuenoImagen = document.createElement("img");
    const filaEnergiaImagen = document.createElement("img");
    const filaEstresImagen = document.createElement("img");

    const tituloSueno = document.createElement("span");
    const tituloEnergia = document.createElement("span");
    const tituloEstres = document.createElement("span");

    const valorSueno = document.createElement("span");
    const valorEnergia = document.createElement("span");
    const valorEstres = document.createElement("span");

    filaSueno.classList.add("tarjeta-entrada__metrica");
    filaEnergia.classList.add("tarjeta-entrada__metrica");
    filaEstres.classList.add("tarjeta-entrada__metrica");

    filaSuenoImagen.classList.add("tarjeta-entrada__icono");
    filaEnergiaImagen.classList.add("tarjeta-entrada__icono");
    filaEstresImagen.classList.add("tarjeta-entrada__icono");

    tituloSueno.classList.add("tarjeta-entrada__titulo");
    tituloEnergia.classList.add("tarjeta-entrada__titulo");
    tituloEstres.classList.add("tarjeta-entrada__titulo");

    valorSueno.classList.add(
      "tarjeta-entrada__valor",
      "tarjeta-entrada__sueno"
    );
    valorEnergia.classList.add(
      "tarjeta-entrada__valor",
      "tarjeta-entrada__energia"
    );
    valorEstres.classList.add(
      "tarjeta-entrada__valor",
      "tarjeta-entrada__estres"
    );

    filaSuenoImagen.src = "./assets/icons/cama.svg";
    filaEnergiaImagen.src = "./assets/icons/rayo.svg";
    filaEstresImagen.src = "./assets/icons/sonrisa.svg";

    tituloSueno.textContent = "Sueño";
    tituloEnergia.textContent = "Energía";
    tituloEstres.textContent = "Estrés";

    filaSueno.append(filaSuenoImagen);
    filaSueno.append(tituloSueno);
    filaSueno.append(valorSueno);

    filaEnergia.append(filaEnergiaImagen);
    filaEnergia.append(tituloEnergia);
    filaEnergia.append(valorEnergia);

    filaEstres.append(filaEstresImagen);
    filaEstres.append(tituloEstres);
    filaEstres.append(valorEstres);

    listaDatos.append(filaSueno);
    listaDatos.append(filaEnergia);
    listaDatos.append(filaEstres);

    tarjeta.append(listaDatos);

    const botonDetalles = document.createElement;
  });
};
