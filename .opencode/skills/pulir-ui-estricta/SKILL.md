---
name: pulir-ui-estricta
description: Audita, corrige y pule borradores de HTML5 y CSS3 (por ejemplo generados por ChatGPT) para adaptarlos estrictamente a estándares W3C, HTML5 semántico, arquitectura ITCSS con @layer, nomenclatura BEM, tokens semánticos, cero margin y cero pseudoelementos ::before y ::after.
---

# Auditoría y Pulido Estricto de UI (HTML5 + CSS3)

Usa esta skill siempre que el usuario pida revisar, limpiar, refactorizar o pulir archivos `.html` y `.css` existentes o borradores externos.

## Proceso de trabajo obligatorio
1. **Auditoría previa (sin editar aún):** Analiza el HTML y el CSS actuales e enumera todas las infracciones encontradas respecto a las reglas de abajo (por ejemplo: uso de `margin`, `::before`/`::after`, exceso de `<div>`, valores literales fuera de tokens o selectores fuera de BEM).
2. **Refactorización quirúrgica:** Corrige el código manteniendo la intención visual del diseño original (estética editorial limpia tipo Designeer, controles táctiles tipo Uiverse y calidez visual tipo Givingli), pero cumpliendo el 100 % de las normas técnicas.
3. **Verificación final:** Confirma que no queda ningún `margin` (salvo `margin: 0 auto` en contenedores principales), ningún `::before`/`::after`, y que el HTML es válido y comprensible sin CSS.

---

## Reglas Inquebrantables de HTML5 (Estándar W3C)
- **Plantilla base:** `<!DOCTYPE html>`, `<html lang="es">`, `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<meta name="color-scheme" content="light dark">`, `<title>` único por pantalla y `<meta name="description">`.
- **Semántica pura (cero divitis):** Sustituye los `<div>` innecesarios por `<header>`, `<nav aria-label="...">` (obligatorio `aria-label` único si hay varios `<nav>`), un único `<main>`, `<aside>`, `<footer>`, `<section>` (con encabezado) y `<article>` (para tarjetas). Usa `<div>` solo como envoltorio neutro de Grid/Flexbox.
- **Encabezados:** Un único `<h1>` por pantalla y jerarquía secuencial estricta (`<h1>` -> `<h2>` -> `<h3>`, sin saltos).
- **Enlaces vs. Botones:** `<a href="...">` para navegar entre pantallas; `<button type="button|submit">` para acciones en pantalla. Si un botón/enlace solo tiene icono, añade `<span class="u-visually-hidden">Texto descriptivo</span>`.
- **Elementos nativos:**
  - Listas de tarjetas o menús en `<ul>`/`<li>`; pares clave-valor en `<dl>`, `<dt>`, `<dd>`.
  - Fechas y horas siempre con `<time datetime="YYYY-MM-DD...">`.
  - Tablas solo para datos tabulares con `<caption>` y `<th scope="col|row">`.
  - Modales con `<dialog>` y desplegables con `<details>`/`<summary>`.
- **Formularios accesibles:** Cada control asociado con `<label for="...">` (nunca `placeholder` como sustituto). Grupos de radios/checkboxes dentro de `<fieldset>` con `<legend>`. Validación nativa (`required`, `min`, `max`, tipos `date`, `time`, `number`, `search`).
- **Imágenes e Iconos:**
  - `<img>` con `alt`, `width`, `height` explícitos y `loading="lazy"` (salvo la imagen principal).
  - **Todos los iconos deben ser `<svg>` inline** con `aria-hidden="true"`, `width`, `height` y color mediante `currentColor`.

---

## Reglas Inquebrantables de CSS3 (ITCSS + BEM + Tokens)
1. **PROHIBIDO `margin`:** Elimina cualquier `margin`, `margin-top`, `margin-bottom`, `margin-left`, `margin-right`, `margin-block` o `margin-inline` usado para separar elementos. Sustitúyelos por `gap` (en `display: grid` o `display: flex`) y `padding` (`padding-inline`, `padding-block`). **Única excepción:** `margin: 0 auto` (o `margin-inline: auto`) exclusivamente para centrar contenedores principales de página (además de `body { margin: 0; }` en el reset).
2. **PROHIBIDO `::before` y `::after`:** Elimina cualquier pseudoelemento `::before` o `::after`. Si aportan decoración o iconos, conviértelos en nodos HTML semánticos o `<svg>` inline.
3. **Arquitectura ITCSS con `@layer`:** Organiza `css/main.css` estrictamente en este orden:
   `@layer settings, generic, elements, objects, components, utilities;`
4. **Tokens semánticos:**
   - Define primitivas y tokens semánticos en `:root` dentro de `@layer settings` (con `color-scheme: light dark`, modo oscuro con `@media (prefers-color-scheme: dark)` y soporte manual `:root[data-theme="dark"]` / `:root[data-theme="light"]`).
   - En `@layer components` usa **exclusivamente tokens semánticos** (`var(--surface-card)`, `var(--action-primary)`, etc.), nunca primitivos (`var(--teal-50)`) ni colores/tamaños literales sueltos.
   - Máximo 2 familias tipográficas (`--font-sans` y `--font-mono`), escala fluida con `clamp()` y unidades `rem`.
5. **BEM estricto y especificidad baja:**
   - Selectores de una sola clase `(0, 1, 0)`: `.bloque`, `.bloque__elemento`, `.bloque--modificador`.
   - Un elemento siempre cuelga del bloque raíz (`.entry-card__title`, nunca `.entry-card__header__title`).
   - Los modificadores acompañan a la clase base (`class="button button--primary"`).
   - Prohibido estilizar por `#id`, prohibido `!important`, prohibido atributos `style="..."` en HTML y máximo 2 niveles de anidación CSS nativa.
6. **Responsive, Estados y Accesibilidad:**
   - Mobile-First con propiedades lógicas (`inline-size`, `block-size`, `padding-inline`, `padding-block`), Grid (`auto-fit`, `minmax()`, `subgrid`) y `@container` para componentes reutilizables.
   - Estados mediante pseudoclases (`:focus-visible`, `:user-invalid`, `:has()`) y atributos ARIA (`[aria-current="page"]`, `[aria-expanded="true"]`, `[aria-invalid="true"]`).
   - Envolver `:hover` en `@media (hover: hover)` y animaciones en `@media (prefers-reduced-motion: no-preference)`.
   - Objetivos táctiles mínimos de `44 × 44 px` (`min-block-size: 2.75rem`).
   - Incluir `@media print` limpio para impresión.