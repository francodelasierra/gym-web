# QA Report — Power Gym (Web + Carrito Lateral)

- **Proyecto:** Power Gym
- **Fecha:** 02/03/2026
- **Versión:** v1.0 (Carrito lateral + mejoras UI/UX)
- **Entorno:** Navegador Desktop + Mobile (Responsive)
- **Objetivo QA:** Validar funcionalidades de catálogo + carrito + modal + navegación mobile y asegurar que los cambios no rompan el flujo de compra.

---

## 1) Alcance del testing

### Funcionalidades cubiertas
- Render del catálogo de productos desde `PRODUCTS`.
- Carrito con LocalStorage:
  - Agregar productos
  - Actualizar cantidades
  - Eliminar productos
  - Calcular total
  - Finalizar compra (vacía carrito + muestra modal)
- Carrito lateral tipo drawer:
  - Botón flotante
  - Apertura/cierre con overlay, botón X y tecla ESC
  - Badge (contador) siempre actualizado
  - UI de items (con imagen, nombre, precio, input qty, eliminar)
- Modal reutilizable (planes + compra del carrito).
- Navbar responsive con menú toggle mobile.

### Fuera de alcance (no implementado)
- Checkout real con pasarela de pagos
- Envío real de emails
- Gestión de stock real desde backend

---

## 2) Hallazgos principales (bugs detectados y corregidos)

### BUG-001 — Event listeners duplicados en checkout (carrito)
- **Severidad:** Alta
- **Prioridad:** Alta
- **Módulo:** Carrito / Checkout
- **Descripción:** El evento `click` del botón `Finalizar compra` se estaba agregando más de una vez y hasta anidado, provocando ejecuciones múltiples e inconsistencias.
- **Resultado actual (antes):** Se disparaban acciones duplicadas, comportamiento errático.
- **Corrección aplicada:** Se reescribió `cart-render.js` para:
  - Agregar el listener una sola vez por render (sin anidación).
  - Mantener el flujo limpio: modal → vaciar storage → render.
- **Estado:** Corregido ✅

---

### BUG-002 — Carrito obligaba a scrollear hasta la sección
- **Severidad:** Media
- **Prioridad:** Alta
- **Módulo:** UX / Navegación
- **Descripción:** El usuario debía bajar para ver el carrito, afectando la experiencia mientras navegaba el catálogo.
- **Corrección aplicada:** Se implementó **Carrito lateral tipo drawer** con:
  - Botón flotante 🛒
  - Panel lateral (drawer)
  - Overlay + cierre por click afuera y ESC
- **Estado:** Corregido ✅

---

### BUG-003 — Badge (contador) no existía / no actualizaba
- **Severidad:** Media
- **Prioridad:** Media
- **Módulo:** Carrito lateral
- **Descripción:** No había feedback visual de cantidad de items.
- **Corrección aplicada:** Se agregó:
  - `cartBadge` en HTML
  - Función global `window.__setCartBadge` en `main.js`
  - Cálculo del count dentro de `renderCart()`
- **Estado:** Corregido ✅

---

### BUG-004 — Botones se salían del layout dentro del drawer
- **Severidad:** Media
- **Prioridad:** Alta
- **Módulo:** CSS / Carrito
- **Causa raíz:** Los botones tenían `margin: 20px` global, y la grilla original del item no estaba adaptada a panel angosto.
- **Corrección aplicada:**
  - Se rediseñó la estructura de cada item:
    - Mini imagen + info + acciones en fila
  - Se agregó CSS para `.cart-actions` y se anuló el margin en `.cart-remove { margin:0; }`
- **Estado:** Corregido ✅

---

### BUG-005 — Imágenes no se mostraban en el carrito
- **Severidad:** Baja
- **Prioridad:** Media
- **Módulo:** UI / Carrito
- **Descripción:** El render del carrito no incluía `item.image`.
- **Corrección aplicada:** Se actualizó `cart-render.js` para incluir:
  - `<img class="cart-thumb" src="${item.image}">`
- **Estado:** Corregido ✅

---

### BUG-006 — Ruta de imagen de fondo incorrecta (presentación)
- **Severidad:** Media
- **Prioridad:** Media
- **Módulo:** CSS / Deploy
- **Descripción:** Se usaba una ruta absoluta `/gym-web/assets/...` que puede fallar en GitHub Pages/hosting.
- **Corrección aplicada:** Se cambió a ruta relativa:
  - `url("../assets/img/suplementacion.jpg")`
- **Estado:** Corregido ✅

---

### BUG-007 — CSS duplicado y reglas globales peligrosas
- **Severidad:** Baja
- **Prioridad:** Media
- **Módulo:** CSS / Mantenibilidad
- **Descripción:**
  - `.planes-header` estaba duplicado.
  - `p { margin: 20px }` afectaba todo el sitio (footer, carrito, etc).
- **Corrección aplicada:**
  - Se limpió duplicación (quedó un solo bloque).
  - Se eliminó margin global de `<p>` y se controló por secciones.
- **Estado:** Corregido ✅

---

### BUG-008 — Menú mobile podía quedar abierto al navegar
- **Severidad:** Baja
- **Prioridad:** Media
- **Módulo:** Navbar Mobile
- **Corrección aplicada:** Se agregó cierre por:
  - click en link
  - click fuera
  - tecla ESC
- **Estado:** Corregido ✅

---

## 3) Cambios implementados (resumen técnico)

### Archivos modificados
- `index.html`
  - Se agregó: `cartFab`, `cartBadge`, `cartDrawer`, `cartOverlay`, `cartClose`
  - Se movió el carrito a un `<aside>` lateral con `id="cart-container"`.

- `css/style.css`
  - Se agregó UI del drawer + overlay + botón flotante.
  - Se agregaron estilos de items con imagen.
  - Se corrigió ruta de imagen.
  - Se limpiaron duplicados y reglas globales peligrosas.

- `js/main.js`
  - Se agregó `setupCartDrawer()`
  - Se agregó auto-open del drawer al comprar (con click al FAB)
  - Se mantuvo navbar mobile robusto.

- `js/cart-render.js`
  - Se reescribió render para:
    - badge update
    - item con imagen + acciones
    - checkout limpio (sin listeners duplicados)

---



> Sugerencia: crear carpeta `qa/test-cases/` y guardar como `TC-POWERGYM.md`

## 4) Checklist de regresión

- [ ] La web carga sin errores en consola.
- [ ] Render productos OK.
- [ ] Carrito guarda en LocalStorage.
- [ ] Badge actualiza (add/remove/change/checkout).
- [ ] Drawer no tapa modal (z-index correcto).
- [ ] Botones no se salen del drawer.
- [ ] Imágenes del carrito se ven.
- [ ] Mobile nav funciona y cierra correctamente.
- [ ] Rutas de imágenes funcionan en deploy (relativas).

---

## 5) Estado final

✅ **Resultado:** La funcionalidad de compra es usable sin scrollear, el carrito acompaña al usuario, los bugs detectados fueron corregidos y se mejoró UI/UX y mantenibilidad del CSS/JS.

---