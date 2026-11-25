"use strict";

import {
  aparicionesSintomas,
  definicionesSintomas,
  medicamentos,
  tomasMedicacion,
} from "./datos.js";

const mostrarDetalles = (
  entradaSeleccionada,
  definicionesSintomas,
  aparicionesSintomas,
  medicamentos,
  tomasMedicacion
) => {
  const modal = document.querySelector("#dialogo-detalles");
  const fechaDetalle = document.querySelector("#fecha-detalle");
  const horasSueno = document.querySelector("#detalle-horas-sueno");
  const nivelEnergia = document.querySelector("#detalle-nivel-energia");
  const nivelEstres = document.querySelector("#detalle-nivel-estres");
  const notaPersonal = document.querySelector("#nota-personal-detalle");
  const contenedorSintomas = document.querySelector("#lista-sintomas-detalle");
  const contenedorMedicacion = document.querySelector(
    "#lista-medicacion-detalle"
  );

  contenedorSintomas.replaceChildren();
  contenedorMedicacion.replaceChildren();

  fechaDetalle.textContent = entradaSeleccionada.fecha;

  horasSueno.textContent = `${entradaSeleccionada.horasSueno} horas`;
  nivelEnergia.textContent = `${entradaSeleccionada.nivelEnergia}/10`;
  nivelEstres.textContent = `${entradaSeleccionada.nivelEstres}/10`;

  notaPersonal.textContent =
    entradaSeleccionada.notas || "No se añadió ninguna nota personal.";

  cargarSintomas(
    entradaSeleccionada,
    definicionesSintomas,
    aparicionesSintomas,
    contenedorSintomas
  );

  cargarMedicacion(
    entradaSeleccionada,
    medicamentos,
    tomasMedicacion,
    contenedorMedicacion
  );

  modal.showModal();
};

const cargarSintomas = (
  entrada,
  definicionesSintomas,
  aparicionesSintomas,
  contenedorSintomas
) => {
  const sintomasEntrada = aparicionesSintomas.filter(
    (aparicion) => aparicion.entradaId === entrada.id
  );

  if (sintomasEntrada.length === 0) {
    const mensaje = document.createElement("li");

    mensaje.textContent = "No se registraron síntomas este día.";

    contenedorSintomas.append(mensaje);
    return;
  }
  sintomasEntrada.forEach((aparicion) => {
    const elemento = document.createElement("li");

    const sintoma = definicionesSintomas.find(
      (definicion) => definicion.id === aparicion.definicionSintomaId
    );

    const nombreSintoma = sintoma ? sintoma.nombre : aparicion.nombreRegistrado;
    elemento.textContent = `${nombreSintoma}
Intensidad: ${aparicion.intensidad}`;

    if (aparicion.nota) {
      elemento.textContent += `\nNota: ${aparicion.nota}`;
    }

    contenedorSintomas.append(elemento);
  });
};

const cargarMedicacion = (
  entrada,
  medicamentos,
  tomasMedicacion,
  contenedorMedicacion
) => {
  const tomasEntrada = tomasMedicacion.filter(
    (toma) => toma.entradaId === entrada.id
  );

  if (tomasEntrada.length === 0) {
    const mensaje = document.createElement("li");

    mensaje.textContent = "No se registraron tomas este día.";

    contenedorMedicacion.append(mensaje);
    return;
  }

  tomasEntrada.forEach((toma) => {
    const elemento = document.createElement("li");

    const medicamento = medicamentos.find(
      (medicamento) => medicamento.id === toma.medicamentoId
    );

    const nombreMedicamento = medicamento
      ? medicamento.nombre
      : toma.nombreMedicamentoRegistrado;

    elemento.textContent = `${nombreMedicamento}
    Dosis: ${toma.dosisTexto}
    Hora: ${toma.hora}
    Estado: ${toma.estado}`;

    if (toma.nota) {
      elemento.textContent += `\n${toma.nota}`;
    }

    contenedorMedicacion.append(elemento);
  });
};

export const cargarHistorial = (entradasDiarias) => {
  const entradasOrdenadas = [...entradasDiarias].sort((a, b) =>
    a.fecha.localeCompare(b.fecha)
  );
  const contenedorPrincipal = document.querySelector(".contenido-seccion");

  if (!contenedorPrincipal || !entradasDiarias) return;

  const cabecera = document.createElement("header");
  const imagenCalendario = document.createElement("span");
  const titulo = document.createElement("h2");
  const subtitulo = document.createElement("p");

  cabecera.classList.add("seccion-introduccion__cabecera");
  titulo.classList.add("seccion-introduccion__titulo");
  imagenCalendario.classList.add(
    "seccion-introduccion__icono",
    "seccion-introduccion__icono--calendario"
  );
  subtitulo.classList.add("seccion-introduccion__subtitulo");

  titulo.textContent = "Historial de registros";
  subtitulo.textContent = "Consulta tus registros de salud y bienestar";

  cabecera.append(imagenCalendario);
  cabecera.append(titulo);
  cabecera.append(subtitulo);

  const historialListado = document.createElement("section");
  historialListado.classList.add("historial__listado");

  contenedorPrincipal.append(cabecera);
  contenedorPrincipal.append(historialListado);

  entradasOrdenadas.forEach((entrada) => {
    const tarjeta = document.createElement("article");
    const cabeceraTarjeta = document.createElement("header");
    const fechaTarjeta = document.createElement("time");
    const tituloTarjeta = document.createElement("h3");
    const listaDatos = document.createElement("ul");

    tarjeta.classList.add("tarjeta-entrada");
    tarjeta.dataset.entradaId = entrada.id;
    cabeceraTarjeta.classList.add("tarjeta-entrada__cabecera");
    fechaTarjeta.classList.add("tarjeta-entrada__fecha");
    tituloTarjeta.classList.add("tarjeta-entrada__titulo");
    listaDatos.classList.add("tarjeta-entrada__lista");

    cabeceraTarjeta.append(fechaTarjeta);
    cabeceraTarjeta.append(tituloTarjeta);

    const filaSueno = document.createElement("li");
    const filaEnergia = document.createElement("li");
    const filaEstres = document.createElement("li");

    const filaSuenoImagen = document.createElement("span");
    const filaEnergiaImagen = document.createElement("span");
    const filaEstresImagen = document.createElement("span");

    const tituloSueno = document.createElement("span");
    const tituloEnergia = document.createElement("span");
    const tituloEstres = document.createElement("span");

    const valorSueno = document.createElement("span");
    const valorEnergia = document.createElement("span");
    const valorEstres = document.createElement("span");

    filaSueno.classList.add("tarjeta-entrada__metrica");
    filaEnergia.classList.add("tarjeta-entrada__metrica");
    filaEstres.classList.add("tarjeta-entrada__metrica");

    filaSuenoImagen.classList.add(
      "tarjeta-entrada__icono",
      "tarjeta-entrada__icono--sueno"
    );

    filaEnergiaImagen.classList.add(
      "tarjeta-entrada__icono",
      "tarjeta-entrada__icono--energia"
    );

    filaEstresImagen.classList.add(
      "tarjeta-entrada__icono",
      "tarjeta-entrada__icono--estres"
    );

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

    fechaTarjeta.textContent = entrada.fecha;

    valorSueno.textContent = `${entrada.horasSueno} h`;
    valorEnergia.textContent = `${entrada.nivelEnergia}/10`;
    valorEstres.textContent = `${entrada.nivelEstres}/10`;

    tituloTarjeta.textContent = "Registro diario";

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

    const botonDetalles = document.createElement("button");
    const imagenBotonDetalles = document.createElement("span");

    botonDetalles.textContent = "Ver detalles";
    botonDetalles.classList.add("tarjeta-entrada__boton");
    botonDetalles.type = "button";

    imagenBotonDetalles.classList.add("tarjeta-entrada__flecha");

    botonDetalles.append(imagenBotonDetalles);

    tarjeta.append(cabeceraTarjeta);
    tarjeta.append(listaDatos);
    tarjeta.append(botonDetalles);

    historialListado.append(tarjeta);
  });

  historialListado.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".tarjeta-entrada__boton");

    const tarjeta = boton.closest(".tarjeta-entrada");
    const entradaId = tarjeta.dataset.entradaId;

    const entradaSeleccionada = entradasDiarias.find(
      (entrada) => entrada.id === entradaId
    );

    mostrarDetalles(
      entradaSeleccionada,
      definicionesSintomas,
      aparicionesSintomas,
      medicamentos,
      tomasMedicacion
    );
  });

  const botonCerrado = document.querySelector("#cerrar-dialogo-detalles");
  const modal = document.querySelector("#dialogo-detalles");
  botonCerrado.addEventListener("click", () => {
    modal.close();
  });
};

export const mostrarDatosPerfil = (usuario) => {
  const contenedorPrincipal = document.querySelector(".contenido-seccion");

  if (!contenedorPrincipal || !usuario) return;

  const cabecera = document.createElement("header");
  const titulo = document.createElement("h2");
  const subtitulo = document.createElement("p");

  cabecera.classList.add("seccion-introduccion__cabecera");
  titulo.classList.add("seccion-introduccion__titulo");
  subtitulo.classList.add("seccion-introduccion__subtitulo");

  titulo.textContent = "Mi perfil";
  subtitulo.textContent = "Consulta y gestiona los datos de tu cuenta";

  cabecera.append(titulo);
  cabecera.append(subtitulo);

  const tarjeta = document.createElement("article");
  const tituloTarjeta = document.createElement("h3");
  const listaDatos = document.createElement("ul");

  tarjeta.classList.add("tarjeta-perfil");
  tituloTarjeta.classList.add("tarjeta-perfil__titulo");
  listaDatos.classList.add("tarjeta-perfil__lista");

  tituloTarjeta.textContent = "Información personal";

  const formatearFecha = (fecha) => {
    if (!fecha) return "No disponible";

    const fechaFormateada = new Date(
      fecha.length === 10 ? `${fecha}T00:00:00` : fecha
    );

    if (Number.isNaN(fechaFormateada.getTime())) {
      return "No disponible";
    }

    return new Intl.DateTimeFormat("es-ES").format(fechaFormateada);
  };

  const datosUsuario = [
    {
      etiqueta: "Nombre de usuario",
      valor: usuario.nombreUsuario,
    },
    {
      etiqueta: "Correo electrónico",
      valor: usuario.email,
    },
    {
      etiqueta: "Fecha de nacimiento",
      valor: formatearFecha(usuario.fechaNacimiento),
    },
    {
      etiqueta: "Cuenta creada",
      valor: formatearFecha(usuario.creadoEn),
    },
  ];

  datosUsuario.forEach((dato) => {
    const fila = document.createElement("li");
    const etiqueta = document.createElement("span");
    const valor = document.createElement("span");

    fila.classList.add("tarjeta-perfil__dato");
    etiqueta.classList.add("tarjeta-perfil__etiqueta");
    valor.classList.add("tarjeta-perfil__valor");

    etiqueta.textContent = dato.etiqueta;
    valor.textContent = dato.valor || "No disponible";

    fila.append(etiqueta);
    fila.append(valor);

    listaDatos.append(fila);
  });

  const acciones = document.createElement("div");
  const enlaceEditar = document.createElement("a");
  const botonEliminar = document.createElement("button");

  acciones.classList.add("tarjeta-perfil__acciones");

  enlaceEditar.href = "./registro.html?modo=editar";
  enlaceEditar.classList.add("boton", "boton--principal");

  enlaceEditar.textContent = "Editar perfil";

  botonEliminar.type = "button";
  botonEliminar.classList.add("boton", "tarjeta-perfil__boton--eliminar");

  botonEliminar.dataset.accion = "eliminar-cuenta";
  botonEliminar.textContent = "Eliminar cuenta";

  acciones.append(enlaceEditar);
  acciones.append(botonEliminar);

  const estadoPerfil = document.createElement("p");

  estadoPerfil.classList.add("tarjeta-perfil__estado");

  tarjeta.append(tituloTarjeta);
  tarjeta.append(listaDatos);
  tarjeta.append(acciones);
  tarjeta.append(estadoPerfil);

  contenedorPrincipal.append(cabecera);
  contenedorPrincipal.append(tarjeta);
};

export const cargarMensajes = (mensajes) => {
  const contenedorPrincipal = document.querySelector(".contenido-seccion");

  if (!contenedorPrincipal || !Array.isArray(mensajes)) return;

  const mensajesOrdenados = [...mensajes].sort((a, b) => {
    const fechaA = Date.parse(a.creadoEn) || 0;
    const fechaB = Date.parse(b.creadoEn) || 0;

    return fechaB - fechaA;
  });

  const cabecera = document.createElement("header");
  const titulo = document.createElement("h2");
  const subtitulo = document.createElement("p");

  cabecera.classList.add("seccion-introduccion__cabecera");
  titulo.classList.add("seccion-introduccion__titulo");
  subtitulo.classList.add("seccion-introduccion__subtitulo");

  titulo.textContent = "Mensajes enviados";
  subtitulo.textContent = "Revisa las consultas que has enviado a Syntia";

  cabecera.append(titulo);
  cabecera.append(subtitulo);

  const mensajesListado = document.createElement("section");

  mensajesListado.classList.add("mensajes__listado");

  contenedorPrincipal.append(cabecera);
  contenedorPrincipal.append(mensajesListado);

  if (mensajesOrdenados.length === 0) {
    const mensajeVacio = document.createElement("p");

    mensajeVacio.classList.add("estado-vacio");
    mensajeVacio.textContent = "Todavía no has enviado ninguna consulta.";

    mensajesListado.append(mensajeVacio);
    return;
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return "No disponible";

    const fechaFormateada = new Date(fecha);

    if (Number.isNaN(fechaFormateada.getTime())) {
      return "No disponible";
    }

    return new Intl.DateTimeFormat("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(fechaFormateada);
  };

  const motivosConsulta = {
    "problema-tecnico": "Problema técnico",
    "problema-registro": "Problema con un registro",
    "privacidad-datos": "Privacidad y datos",
    "sugerencia-mejora": "Sugerencia de mejora",
    "otra-consulta": "Otra consulta",
  };

  mensajesOrdenados.forEach((mensaje) => {
    const tarjeta = document.createElement("article");
    const cabeceraTarjeta = document.createElement("header");
    const botonBorrar = document.createElement("button");
    const tituloTarjeta = document.createElement("h3");
    const fechaTarjeta = document.createElement("time");

    tarjeta.classList.add("tarjeta-mensaje");
    cabeceraTarjeta.classList.add("tarjeta-mensaje__cabecera");
    tituloTarjeta.classList.add("tarjeta-mensaje__titulo");
    botonBorrar.classList.add("tarjeta-mensaje__boton-borrar");
    fechaTarjeta.classList.add("tarjeta-mensaje__fecha");

    tarjeta.dataset.mensajeId = String(mensaje.id);
    botonBorrar.type = "button";
    botonBorrar.dataset.accion = "borrar-mensaje";

    tituloTarjeta.textContent =
      motivosConsulta[mensaje.motivo] || "Consulta de contacto";
    fechaTarjeta.textContent = formatearFecha(mensaje.creadoEn);
    botonBorrar.textContent = "Borrar mensaje";

    if (mensaje.creadoEn) {
      fechaTarjeta.dateTime = mensaje.creadoEn;
    }

    cabeceraTarjeta.append(tituloTarjeta);
    cabeceraTarjeta.append(fechaTarjeta);

    const listaDatos = document.createElement("ul");

    listaDatos.classList.add("tarjeta-mensaje__lista");

    const datosMensaje = [
      {
        etiqueta: "Nombre",
        valor: mensaje.nombre,
      },
      {
        etiqueta: "Correo electrónico",
        valor: mensaje.email,
      },
      {
        etiqueta: "Teléfono",
        valor: mensaje.telefono || "No facilitado",
      },
      {
        etiqueta: "Motivo",
        valor: motivosConsulta[mensaje.motivo] || mensaje.motivo,
      },
      {
        etiqueta: "Preferencia de contacto",
        valor: mensaje.prefiereLlamada
          ? "Prefiere que le llamen"
          : "No ha solicitado una llamada",
      },
    ];

    datosMensaje.forEach((dato) => {
      const fila = document.createElement("li");
      const etiqueta = document.createElement("span");
      const valor = document.createElement("span");

      fila.classList.add("tarjeta-mensaje__dato");
      etiqueta.classList.add("tarjeta-mensaje__etiqueta");
      valor.classList.add("tarjeta-mensaje__valor");

      etiqueta.textContent = dato.etiqueta;
      valor.textContent = dato.valor || "No disponible";

      fila.append(etiqueta);
      fila.append(valor);

      listaDatos.append(fila);
    });

    const contenidoMensaje = document.createElement("section");
    const tituloMensaje = document.createElement("h4");
    const textoMensaje = document.createElement("p");

    contenidoMensaje.classList.add("tarjeta-mensaje__contenido");
    tituloMensaje.classList.add("tarjeta-mensaje__subtitulo");
    textoMensaje.classList.add("tarjeta-mensaje__texto");

    tituloMensaje.textContent = "Contenido del mensaje";
    textoMensaje.textContent = mensaje.mensaje || "Sin contenido.";

    contenidoMensaje.append(tituloMensaje);
    contenidoMensaje.append(textoMensaje);

    tarjeta.append(cabeceraTarjeta);
    tarjeta.append(listaDatos);
    tarjeta.append(contenidoMensaje);
    tarjeta.append(botonBorrar);

    mensajesListado.append(tarjeta);
  });
};
