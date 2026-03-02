### TC-001 — Render catálogo
- **Pasos:**
  1. Abrir la página
  2. Scrollear a Productos
- **Esperado:** Se renderizan cards con imagen, nombre, descripción y precio.

### TC-002 — Agregar al carrito
- **Pasos:**
  1. Click en “Comprar” de un producto
- **Esperado:**
  - Badge aumenta (+1)
  - Drawer se abre automáticamente
  - Item aparece en el carrito con mini imagen

### TC-003 — Actualizar cantidad
- **Pasos:**
  1. En el drawer, cambiar el input de cantidad (ej: 1 → 3)
- **Esperado:**
  - Badge refleja cantidad total
  - Total se recalcula correctamente

### TC-004 — Eliminar item
- **Pasos:**
  1. Click en “Eliminar”
- **Esperado:**
  - Item desaparece
  - Total se recalcula
  - Badge disminuye

### TC-005 — Carrito vacío
- **Pasos:**
  1. Eliminar todos los items
- **Esperado:**
  - Se muestra mensaje “🛒 El carrito está vacío”
  - Badge queda en 0

### TC-006 — Finalizar compra
- **Pasos:**
  1. Con items en carrito, click “Finalizar compra”
- **Esperado:**
  - Modal aparece con mensaje de compra
  - LocalStorage “cart” se elimina
  - Carrito se vacía y badge vuelve a 0

### TC-007 — Drawer open/close
- **Pasos:**
  1. Click en 🛒 FAB
  2. Cerrar con X
  3. Abrir de nuevo y cerrar tocando overlay
  4. Abrir y cerrar con ESC
- **Esperado:** Abre/cierra correctamente en todos los métodos.

### TC-008 — Navbar mobile
- **Pasos:**
  1. Vista <= 768px
  2. Abrir menú (☰)
  3. Click en un link
- **Esperado:** Menú se cierra y navega.
