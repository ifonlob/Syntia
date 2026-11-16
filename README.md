# Syntia

## 1. Descripción del proyecto

**Syntia** es una aplicación web diseñada para ayudar a personas con enfermedades crónicas a registrar y consultar su evolución diaria. Su objetivo es facilitar el seguimiento personal de síntomas, niveles de energía, descanso, estrés y medicación, permitiendo que el usuario observe cómo evoluciona su estado a lo largo del tiempo.

La aplicación pretende ofrecer un espacio sencillo y organizado en el que centralizar la información diaria, identificar posibles patrones y facilitar la consulta del historial personal.

Cabe destacar que la información registrada tendrá carácter de seguimiento personal y no sustituirá el diagnóstico ni las recomendaciones de los profesionales sanitarios.

## 2. Backlog de funcionalidades

Las funcionalidades se han dividido en tareas pequeñas, ordenadas según su prioridad de desarrollo. 

### Prioridad alta - Funcionalidades esenciales

| Funcionalidad | Descripción | Criterio de comprobación |
|---|---|---|
| Datos de ejemplo | Definir y exportar registros de entradas diarias y síntomas. | Existen al menos 10 registros por entidad y sus relaciones son correctas. |
| Menú de navegación | Crear un menú con enlaces a todas las secciones principales. | Todos los enlaces permiten acceder a las páginas correspondientes. |
| Listado de registros diarios | Generar dinámicamente un listado de entradas a partir de los datos de ejemplo. | Las tarjetas se muestran desde JavaScript y no están escritas manualmente en HTML. |
| Información resumida de cada registro | Mostrar en cada tarjeta la fecha, el nivel de energía y los síntomas registrados. | Cada tarjeta presenta los datos correspondientes a su entrada. |
| Detalle de una entrada diaria | Mostrar la información completa de un registro al seleccionarlo desde el listado. | Al pulsar una tarjeta se muestra su ficha y los síntomas asociados. |
| Diseño responsive inicial | Adaptar la estructura principal y la navegación a diferentes tamaños de pantalla. | La aplicación puede consultarse desde escritorio, tablet y móvil. |

### Prioridad media - Gestión de información personal

| Funcionalidad | Descripción | Criterio de comprobación |
|---|---|---|
| Formulario de nueva entrada | Crear un formulario para registrar una nueva entrada diaria. | El formulario permite introducir los datos principales del día. |
| Validación de entradas | Comprobar que los campos obligatorios y los valores numéricos sean válidos. | No se pueden guardar registros con datos incorrectos. |
| Registro de síntomas | Permitir añadir uno o varios síntomas a una entrada diaria, indicando su intensidad. | Los síntomas quedan asociados a la entrada correspondiente. |
| Edición de entradas | Permitir modificar la información de una entrada ya registrada. | Los cambios se reflejan al consultar nuevamente el registro. |
| Eliminación de entradas | Incorporar una opción para eliminar una entrada diaria. | La entrada desaparece del historial y sus datos asociados se gestionan correctamente. |
| Catálogo de síntomas | Crear una sección para consultar y gestionar los síntomas disponibles. | Se pueden visualizar los síntomas registrados y sus categorías. |
| Catálogo de medicamentos | Crear una sección para consultar los medicamentos registrados por el usuario. | Se muestra el nombre, la pauta descriptiva y el estado de cada medicamento. |
| Registro de tomas de medicación | Permitir registrar las tomas realizadas u omitidas y la hora correspondiente. | Las tomas quedan relacionadas con su medicamento y entrada diaria. |
| Persistencia de datos | Guardar la información mediante `localStorage` para conservarla entre sesiones. | Los registros permanecen después de cerrar y volver a abrir la aplicación. |
| Historial y filtros | Incorporar filtros por fecha y síntoma en el historial. | El listado muestra únicamente los registros que cumplen los filtros. |
| Calendario de seguimiento | Mostrar las entradas diarias en una vista de calendario. | Se pueden identificar los días que contienen registros. |

### Prioridad baja - Análisis y funcionalidades complementarias

| Funcionalidad | Descripción | Criterio de comprobación |
|---|---|---|
| Resumen de actividad | Mostrar un resumen de los últimos registros, síntomas frecuentes y niveles de energía. | Los indicadores se calculan a partir de los datos almacenados. |
| Identificación de patrones | Mostrar posibles relaciones temporales entre síntomas, descanso, estrés y energía. | Se presentan tendencias descriptivas basadas en los registros disponibles, sin establecer diagnósticos. |
| Gráficas de evolución | Representar visualmente la evolución de la intensidad de los síntomas y otros indicadores. | Las gráficas se actualizan según los registros disponibles. |
| Generación de informes | Permitir preparar un informe con el historial y los datos registrados durante un periodo. | El informe recoge correctamente la información del intervalo seleccionado. |
| Impresión de informes | Incorporar una vista preparada para imprimir los informes. | El documento se presenta correctamente en la vista de impresión. |
| Configuración de preferencias | Permitir modificar preferencias visuales, como el tema claro u oscuro. | La interfaz aplica y conserva la preferencia seleccionada. |

## 3. Mapa de pantallas

Syntia contará con diferentes vistas organizadas en torno a la consulta y gestión de la información diaria del usuario.

### 3.1. Inicio / Panel principal

**Objetivo:** ofrecer una visión general del estado y de la actividad reciente del usuario.

**Información mostrada:**
- Resumen del último registro diario.
- Nivel de energía y estrés más recientes.
- Síntomas registrados recientemente.
- Resumen de actividad de los últimos días.
- Accesos directos para crear una nueva entrada y consultar el historial.

### 3.2. Nueva entrada diaria

**Objetivo:** permitir registrar cómo se ha encontrado el usuario durante el día.

**Información y campos:**
- Fecha del registro.
- Horas de sueño.
- Nivel de energía.
- Nivel de estrés.
- Síntomas experimentados.
- Intensidad de cada síntoma, de 0 a 10.
- Observaciones o notas personales.
- Medicación tomada u omitida y su hora.

### 3.3. Historial de registros

**Objetivo:** consultar las entradas diarias guardadas anteriormente.

**Información mostrada:**
- Listado de entradas ordenadas cronológicamente.
- Fecha de cada registro.
- Nivel de energía.
- Número de síntomas registrados.
- Síntomas principales e intensidad.
- Filtros por fecha y síntoma.

Cada elemento del listado permitirá acceder a su ficha de detalle.

### 3.4. Detalle de entrada diaria

**Objetivo:** consultar toda la información correspondiente a un día concreto.

**Información mostrada:**
- Fecha de la entrada.
- Horas de sueño.
- Nivel de energía y estrés.
- Listado de síntomas asociados.
- Intensidad y observaciones de cada síntoma.
- Medicación registrada y estado de cada toma.
- Notas personales.

Desde esta pantalla se podrá acceder a las opciones de edición y eliminación.

### 3.5. Síntomas

**Objetivo:** consultar y organizar los síntomas que el usuario puede registrar.

**Información mostrada:**
- Nombre del síntoma.
- Categoría (neurológico, digestivo, muscular, general u otros).
- Descripción.
- Estado (activo o inactivo).

También permitirá incorporar nuevos síntomas y modificar los existentes.

### 3.6. Medicación

**Objetivo:** gestionar el catálogo personal de medicamentos y consultar su seguimiento.

**Información mostrada:**
- Nombre del medicamento.
- Dosis prescrita, introducida por el usuario.
- Pauta o horario descriptivo.
- Fecha de inicio y finalización, cuando corresponda.
- Estado (activo, pausado o archivado).
- Historial de tomas registradas.

### 3.7. Calendario

**Objetivo:** visualizar cronológicamente la actividad registrada.

**Información mostrada:**
- Vista mensual del calendario.
- Días con entradas registradas.
- Indicadores de actividad diaria.
- Acceso a la ficha de cada día.

### 3.8. Evolución y estadísticas

**Objetivo:** facilitar la observación de la evolución personal a lo largo del tiempo.

**Información mostrada:**
- Evolución de la intensidad de los síntomas.
- Variaciones de los niveles de energía y estrés.
- Evolución de las horas de sueño.
- Síntomas más frecuentes.
- Posibles patrones temporales entre los datos registrados.

### 3.9. Informes

**Objetivo:** reunir y presentar la información registrada durante un periodo determinado.

**Información mostrada:**
- Selección del intervalo de fechas.
- Resumen de los registros incluidos.
- Síntomas e intensidades registrados.
- Evolución de los indicadores personales.
- Información sobre la medicación registrada.
- Vista preparada para imprimir el informe.

### 3.10. Configuración

**Objetivo:** gestionar las preferencias generales de la aplicación.

**Información mostrada:**
- Preferencia de tema visual (claro u oscuro).
- Opciones generales de visualización.
- Información sobre la aplicación.

## 4. Organización de la navegación

El menú principal permitirá acceder a las diferentes secciones de Syntia:

| Sección del menú | Pantalla de destino |
|---|---|
| Inicio | Panel principal |
| Nuevo registro | Nueva entrada diaria |
| Historial | Historial de registros |
| Síntomas | Catálogo de síntomas |
| Medicación | Catálogo de medicamentos |
| Calendario | Calendario de seguimiento |
| Evolución | Estadísticas y patrones |
| Informes | Generación de informes |
| Configuración | Preferencias de la aplicación |

Durante el desarrollo inicial, todas las secciones tendrán su correspondiente enlace de navegación, aunque algunas pantallas se incorporarán progresivamente a medida que se implementen sus funcionalidades.

