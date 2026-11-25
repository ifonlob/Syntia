# Syntia

## 1. Descripción del proyecto

**Syntia** es una aplicación web diseñada para ayudar a personas con enfermedades crónicas a registrar y consultar su evolución diaria. Su objetivo es facilitar el seguimiento personal de síntomas, niveles de energía, descanso, estrés y medicación, permitiendo que el usuario observe cómo evoluciona su estado a lo largo del tiempo.

La aplicación pretende ofrecer un espacio sencillo y organizado en el que centralizar la información diaria, identificar posibles patrones y facilitar la consulta del historial personal.

Cabe destacar que la información registrada tendrá carácter de seguimiento personal y no sustituirá el diagnóstico ni las recomendaciones de los profesionales sanitarios.

## 2. Backlog de funcionalidades

Las funcionalidades se han dividido en tareas pequeñas, ordenadas según su prioridad de desarrollo.

### Prioridad alta - Funcionalidades esenciales

| Funcionalidad                         | Descripción                                                                       | Criterio de comprobación                                                           |
| ------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Datos de ejemplo                      | Definir y exportar registros de entradas diarias y síntomas.                      | Existen al menos 10 registros por entidad y sus relaciones son correctas.          |
| Menú de navegación                    | Crear un menú con enlaces a todas las secciones principales.                      | Todos los enlaces permiten acceder a las páginas correspondientes.                 |
| Listado de registros diarios          | Generar dinámicamente un listado de entradas a partir de los datos de ejemplo.    | Las tarjetas se muestran desde JavaScript y no están escritas manualmente en HTML. |
| Información resumida de cada registro | Mostrar en cada tarjeta la fecha, el nivel de energía y los síntomas registrados. | Cada tarjeta presenta los datos correspondientes a su entrada.                     |
| Detalle de una entrada diaria         | Mostrar la información completa de un registro al seleccionarlo desde el listado. | Al pulsar una tarjeta se muestra su ficha y los síntomas asociados.                |
| Diseño responsive inicial             | Adaptar la estructura principal y la navegación a diferentes tamaños de pantalla. | La aplicación puede consultarse desde escritorio, tablet y móvil.                  |

### Prioridad media - Gestión de información personal

| Funcionalidad                   | Descripción                                                                          | Criterio de comprobación                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Formulario de nueva entrada     | Crear un formulario para registrar una nueva entrada diaria.                         | El formulario permite introducir los datos principales del día.                       |
| Validación de entradas          | Comprobar que los campos obligatorios y los valores numéricos sean válidos.          | No se pueden guardar registros con datos incorrectos.                                 |
| Registro de síntomas            | Permitir añadir uno o varios síntomas a una entrada diaria, indicando su intensidad. | Los síntomas quedan asociados a la entrada correspondiente.                           |
| Edición de entradas             | Permitir modificar la información de una entrada ya registrada.                      | Los cambios se reflejan al consultar nuevamente el registro.                          |
| Eliminación de entradas         | Incorporar una opción para eliminar una entrada diaria.                              | La entrada desaparece del historial y sus datos asociados se gestionan correctamente. |
| Catálogo de síntomas            | Crear una sección para consultar y gestionar los síntomas disponibles.               | Se pueden visualizar los síntomas registrados y sus categorías.                       |
| Catálogo de medicamentos        | Crear una sección para consultar los medicamentos registrados por el usuario.        | Se muestra el nombre, la pauta descriptiva y el estado de cada medicamento.           |
| Registro de tomas de medicación | Permitir registrar las tomas realizadas u omitidas y la hora correspondiente.        | Las tomas quedan relacionadas con su medicamento y entrada diaria.                    |
| Persistencia de datos           | Guardar la información mediante `localStorage` para conservarla entre sesiones.      | Los registros permanecen después de cerrar y volver a abrir la aplicación.            |
| Historial y filtros             | Incorporar filtros por fecha y síntoma en el historial.                              | El listado muestra únicamente los registros que cumplen los filtros.                  |
| Calendario de seguimiento       | Mostrar las entradas diarias en una vista de calendario.                             | Se pueden identificar los días que contienen registros.                               |

### Prioridad baja - Análisis y funcionalidades complementarias

| Funcionalidad                 | Descripción                                                                                | Criterio de comprobación                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Resumen de actividad          | Mostrar un resumen de los últimos registros, síntomas frecuentes y niveles de energía.     | Los indicadores se calculan a partir de los datos almacenados.                                          |
| Identificación de patrones    | Mostrar posibles relaciones temporales entre síntomas, descanso, estrés y energía.         | Se presentan tendencias descriptivas basadas en los registros disponibles, sin establecer diagnósticos. |
| Gráficas de evolución         | Representar visualmente la evolución de la intensidad de los síntomas y otros indicadores. | Las gráficas se actualizan según los registros disponibles.                                             |
| Generación de informes        | Permitir preparar un informe con el historial y los datos registrados durante un periodo.  | El informe recoge correctamente la información del intervalo seleccionado.                              |
| Impresión de informes         | Incorporar una vista preparada para imprimir los informes.                                 | El documento se presenta correctamente en la vista de impresión.                                        |
| Configuración de preferencias | Permitir modificar preferencias visuales, como el tema claro u oscuro.                     | La interfaz aplica y conserva la preferencia seleccionada.                                              |

### Hito 2 - Formularios, validación y persistencia

| Tarea                                                                                                   | Estado |
| ------------------------------------------------------------------------------------------------------- | ------ |
| Crear `almacen.js` y centralizar el acceso a `localStorage` mediante las operaciones CRUD.              | Hecho  |
| Crear `validacion.js` con las funciones de validación reutilizables.                                    | Hecho  |
| Implementar el registro de usuarios y guardar sus datos sin almacenar la contraseña.                    | Hecho  |
| Utilizar el mismo formulario para crear y editar el perfil, rellenándolo al entrar en modo edición.     | Hecho  |
| Permitir borrar el perfil con una confirmación previa.                                                  | Hecho  |
| Implementar las validaciones del formulario de registro.                                                | Hecho  |
| Implementar el formulario de contacto con sus motivos adaptados a Syntia.                               | Hecho  |
| Validar el teléfono cuando se introduce y hacerlo obligatorio si se marca "Prefiero que me llaméis".    | Hecho  |
| Añadir el contador de caracteres y validar la longitud del mensaje.                                     | Hecho  |
| Guardar los mensajes enviados y mostrarlos en la vista "Mensajes enviados".                             | Hecho  |
| Recordar el nombre y el correo del último envío mediante una cookie con caducidad.                      | Hecho  |
| Validar los campos al salir de ellos y volver a validarlos mientras se escribe cuando ya se han tocado. | Hecho  |
| Mostrar los errores junto a los campos y utilizar `aria-invalid` y `aria-describedby`.                  | Hecho  |
| Añadir el borrado individual de mensajes con confirmación y delegación de eventos.                      | Hecho  |

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

| Sección del menú | Pantalla de destino           |
| ---------------- | ----------------------------- |
| Inicio           | Panel principal               |
| Nuevo registro   | Nueva entrada diaria          |
| Historial        | Historial de registros        |
| Síntomas         | Catálogo de síntomas          |
| Medicación       | Catálogo de medicamentos      |
| Calendario       | Calendario de seguimiento     |
| Evolución        | Estadísticas y patrones       |
| Informes         | Generación de informes        |
| Preferencias     | Preferencias de la aplicación |
| Mi perfil        | Acceso a los datos de sesión  |

## 5. Hito 2

En este hito he trabajado sobre todo en la gestión de los usuarios y en el formulario de contacto, adaptando las funcionalidades a Syntia. También he reorganizado la forma de guardar los datos para que el acceso a `localStorage` esté centralizado y no tenga que utilizarlo directamente desde todos los módulos.

### 5.1. Qué he hecho

He creado `almacen.js` para gestionar los datos de la aplicación, puesto que desde este módulo puedo recuperar todos los elementos de una colección, buscar uno por su identificador, crear registros nuevos, actualizar los existentes y borrarlos. Así, el resto de módulos utiliza estas funciones en lugar de acceder directamente a `localStorage`.

También he creado `validacion.js`, donde tengo las funciones que comprueban los datos de los formularios. De esta forma, puedo reutilizar las validaciones y mantener separada esa lógica de la parte que se encarga de mostrar los formularios.

En el registro he implementado la creación de usuarios y la edición del perfil utilizando el mismo formulario. Cuando entro en modo edición, recupero los datos del usuario y relleno los campos correspondientes. También he añadido la opción de borrar el perfil con confirmación. La contraseña no se guarda en `localStorage`, ya que no se deben almacenar contraseñas en texto plano.

En el formulario de contacto he añadido los campos de nombre, correo, teléfono, motivo y mensaje, con opciones relacionadas con la aplicación. El teléfono es opcional, pero pasa a ser obligatorio cuando se marca la opción "Prefiero que me llaméis". También he incorporado el contador de caracteres y las comprobaciones de longitud del mensaje.

Los mensajes enviados se guardan en la colección `mensajes` y después se muestran dinámicamente en la sección "Mensajes enviados". Para que el usuario no tenga que volver a escribir sus datos de contacto cada vez, guardo el nombre y el correo del último envío en una cookie que caduca a los 30 días.

En los dos formularios he trabajado las validaciones para que los errores aparezcan junto a cada campo. Los campos se validan al salir de ellos y, cuando ya se han tocado, vuelven a comprobarse mientras se escribe. También utilizo `aria-invalid` y `aria-describedby` para relacionar los campos con sus mensajes de error.

### 5.2. Qué me falta

Aún me queda por implementar diversas funcionalidades de mi aplicación, entre ellas, la creación de entradas, un resumen de la evolución junto con la generación de informes entre otros, que se desarrollarán a lo largo de los hitos correspondientes.

### 5.3. Qué me ha costado más

Lo que más me ha costado ha sido organizar las validaciones, sobre todo cuando una depende de otro campo. Por ejemplo, el teléfono normalmente es opcional, pero deja de serlo si se marca que se prefiere una llamada. También me ha llevado un poco de trabajo controlar cuándo se debe mostrar un error y cuándo hay que volver a comprobar el campo para que el mensaje desaparezca al corregirlo.

Otra parte que he tenido que entender mejor es cómo conectar los elementos HTML con la lógica de JavaScript. Al trabajar con los mensajes, he aprendido a utilizar la delegación de eventos y los atributos `data-*` para que un mismo listener pueda detectar qué botón se ha pulsado y sobre qué mensaje tiene que actuar.

También me ha resultado importante separar las responsabilidades de los módulos: `almacen.js` se ocupa de los datos, `validacion.js` de comprobar los valores y los módulos de cada funcionalidad de coordinar el comportamiento de sus formularios y vistas. Al principio cuesta organizarlo, pero después es más fácil localizar dónde hay que hacer cada cambio.

### 5.4. Mapa de validación

Los mensajes indicados en esta tabla describen los errores que debe mostrar cada campo cuando no cumple su regla de validación.

#### Formulario de registro

| Campo               | Regla de validación                                                                   | Mensaje de error                                                           |
| ------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Nombre de usuario   | Es obligatorio y debe cumplir las condiciones de validación definidas para el nombre. | Introduce un nombre de usuario válido.                                     |
| Correo electrónico  | Es obligatorio y debe cumplir el formato establecido mediante una expresión regular.  | Introduce un correo electrónico válido.                                    |
| Contraseña          | Debe tener al menos 8 caracteres, una letra mayúscula y un número.                    | La contraseña debe tener al menos 8 caracteres, una mayúscula y un número. |
| Repetir contraseña  | Debe coincidir con la contraseña introducida.                                         | Las contraseñas no coinciden.                                              |
| Fecha de nacimiento | No puede ser una fecha futura y el usuario debe tener al menos 16 años.               | Debes tener al menos 16 años y la fecha no puede ser futura.               |
| Aceptar condiciones | La casilla debe estar marcada para completar el registro.                             | Debes aceptar las condiciones para registrarte.                            |

#### Formulario de contacto

| Campo                  | Regla de validación                                                                               | Mensaje de error                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Nombre                 | Es obligatorio y no puede superar los 80 caracteres.                                              | Introduce tu nombre.                                |
| Correo electrónico     | Es obligatorio y debe cumplir el formato establecido mediante una expresión regular.              | Introduce un correo electrónico válido.             |
| Teléfono               | Es opcional. Si se introduce, debe cumplir el formato establecido mediante una expresión regular. | Introduce un número de teléfono válido.             |
| Preferencia de llamada | Si se marca "Prefiero que me llaméis", el teléfono pasa a ser obligatorio.                        | Introduce un teléfono si prefieres que te llamemos. |
| Motivo                 | Es obligatorio seleccionar uno de los motivos disponibles.                                        | Selecciona un motivo de contacto.                   |
| Mensaje                | Debe tener un mínimo de 20 y un máximo de 1000 caracteres.                                        | El mensaje debe tener entre 20 y 1000 caracteres.   |
