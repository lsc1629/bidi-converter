# 🗑️ Sistema de Gestión Automática de Caché

## 📋 Descripción

Sistema implementado para **limpiar automáticamente el caché** cuando hay actualizaciones, siendo completamente **imperceptible para el usuario**.

---

## ✨ Características

### 🔄 **Limpieza Automática de Caché**

El sistema limpia el caché automáticamente en estos escenarios:

1. **Nueva versión detectada**
   - Cuando cambia el número de versión en `version.json`
   - El Service Worker detecta la actualización
   - Se limpia el caché automáticamente
   - La página se recarga con la nueva versión

2. **Usuario regresa después de 10+ minutos**
   - Hook `useAutoRefresh` detecta cuando el usuario regresa
   - Verifica si hay actualizaciones disponibles
   - Recarga automáticamente si es necesario

3. **Build con hash en archivos**
   - Vite genera hash único en cada archivo: `app-abc123.js`
   - El navegador no puede usar versiones cacheadas antiguas
   - Cada deploy tiene archivos con nombres diferentes

### 🛡️ **Service Worker**

Ubicación: `/public/sw.js`

**Funciones:**
- ✅ Limpia cachés antiguos automáticamente
- ✅ Estrategia "Network First" (siempre intenta red primero)
- ✅ Fallback a caché solo si falla la red
- ✅ Se actualiza inmediatamente sin esperar

**Eventos manejados:**
```javascript
install  → Instala nueva versión inmediatamente
activate → Limpia cachés antiguos
fetch    → Intenta red primero, luego caché
message  → Responde a comandos de limpieza
```

### 📱 **Auto-Refresh Hook**

Ubicación: `/src/hooks/useAutoRefresh.js`

**Comportamiento:**
1. Detecta cuando el usuario regresa a la pestaña
2. Si han pasado >10 minutos, verifica actualizaciones
3. Compara versión local con `version.json`
4. Si hay nueva versión:
   - Limpia todos los cachés
   - Actualiza localStorage
   - Recarga la página

### 🔨 **Cache Busting en Build**

Configuración en `vite.config.js`:

```javascript
// Hash en todos los archivos
entryFileNames: 'assets/[name]-[hash].js'
chunkFileNames: 'assets/[name]-[hash].js'
assetFileNames: 'assets/[name]-[hash].[ext]'
```

**Resultado:**
```
app-a1b2c3d4.js      ← Cada build genera hash diferente
vendor-e5f6g7h8.js
styles-i9j0k1l2.css
```

---

## 🚀 Flujo de Actualización

### Escenario 1: Deploy de nueva versión

```
1. Developer hace npm run build
   ↓
2. Vite genera archivos con nuevos hash
   ↓
3. Se actualiza version.json
   ↓
4. Deploy a Cloudflare Pages
   ↓
5. Usuario entra o regresa a la app
   ↓
6. useAutoRefresh verifica versión
   ↓
7. Detecta cambio → Limpia caché
   ↓
8. Recarga página automáticamente
   ↓
9. ✅ Usuario ve nueva versión
```

### Escenario 2: Usuario con app cacheada

```
1. Usuario tiene app v1.0.0 en caché
   ↓
2. Cierra pestaña por 15 minutos
   ↓
3. Mientras tanto, se deploya v1.0.1
   ↓
4. Usuario regresa a la app
   ↓
5. Hook detecta: "15min desde última visita"
   ↓
6. Verifica version.json → v1.0.1
   ↓
7. localStorage tiene v1.0.0
   ↓
8. Limpia caché + actualiza versión
   ↓
9. Recarga automáticamente
   ↓
10. ✅ Usuario ve v1.0.1 sin hacer nada
```

---

## 🛠️ Comandos para Desarrolladores

### Incrementar versión

Edita `public/version.json`:
```json
{
  "version": "1.0.1",  ← Incrementar aquí
  "buildDate": "2025-10-01",
  "features": ["Nueva característica"]
}
```

### Forzar limpieza de caché (para testing)

En la consola del navegador:
```javascript
// Limpiar todo el caché
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});

// Forzar recarga sin caché
window.location.reload(true);
```

### Verificar Service Worker

Consola del navegador:
```javascript
// Ver registros
navigator.serviceWorker.getRegistrations().then(console.log);

// Ver cachés actuales
caches.keys().then(console.log);
```

DevTools → Application → Service Workers

---

## 📊 Ventajas del Sistema

### ✅ **Para el Usuario**

- 🚫 **No necesita hacer nada**
  - No más "Ctrl+Shift+R"
  - No más "limpiar caché manualmente"
  - No más versiones antiguas cacheadas

- ⚡ **Siempre ve la última versión**
  - Actualizaciones automáticas
  - Sin problemas de caché
  - Funcionalidad siempre actualizada

- 🔒 **Totalmente imperceptible**
  - Sin notificaciones molestas
  - Sin popups de "actualizar"
  - Recarga automática cuando es necesario

### ✅ **Para el Desarrollador**

- 📦 **Deploy sin preocupaciones**
  - No más usuarios con versiones antiguas
  - No más "funciona en mi máquina"
  - Hash garantiza archivos únicos

- 🐛 **Menos bugs de caché**
  - Usuarios siempre usan última versión
  - Fácil rollback (cambiar version.json)
  - Logs claros en consola

- ⚙️ **Configuración automática**
  - Service Worker se registra solo
  - Vite genera hash automáticamente
  - Hook se ejecuta en App.jsx

---

## 🔍 Debugging

### Ver logs del sistema

Abre la consola (F12) y busca:

```
✅ Service Worker registrado: /
🔄 Verificando actualizaciones...
⏰ Han pasado 12 minutos. Verificando actualizaciones...
🔄 Nueva versión detectada: 1.0.1
✅ Todos los cachés limpiados
```

### Verificar que funciona

1. Abre la app
2. Nota la versión en localStorage:
   ```javascript
   localStorage.getItem('app-version')
   // → "1.0.0"
   ```
3. Cambia `version.json` a "1.0.1"
4. Espera 10 minutos o simula visibilitychange:
   ```javascript
   document.dispatchEvent(new Event('visibilitychange'))
   ```
5. La app debe recargar automáticamente
6. Verifica nueva versión:
   ```javascript
   localStorage.getItem('app-version')
   // → "1.0.1"
   ```

---

## 📝 Mantenimiento

### Actualizar versión en cada deploy

**Opción 1: Manual**
```bash
# Editar public/version.json
vim public/version.json
# Cambiar version de "1.0.0" a "1.0.1"
```

**Opción 2: Script automático** (futuro)
```bash
npm run version:bump
```

### Desactivar (si es necesario)

En `src/main.jsx`:
```javascript
// Comentar esta línea
// registerServiceWorker()
```

En `src/App.jsx`:
```javascript
// Comentar esta línea
// useAutoRefresh();
```

---

## 🎯 Resultado Final

✅ **Usuario nunca ve versiones antiguas**  
✅ **Caché se limpia automáticamente**  
✅ **Completamente imperceptible**  
✅ **Sin intervención manual necesaria**  
✅ **Funciona en desarrollo y producción**

**El usuario simplemente usa la app, y siempre tiene la última versión.** 🚀

---

**Última actualización**: 2025-10-01  
**Versión del documento**: 1.0.0
