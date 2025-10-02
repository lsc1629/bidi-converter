# 🔧 Guía de Solución de Problemas - Bidi Converter

## 🚨 Pantalla en Blanco al Iniciar la Aplicación

Este es el problema más común. Aquí están las soluciones probadas:

### ✅ Solución Rápida (Recomendada)

```bash
# 1. Ejecutar script de diagnóstico automático
npm run check

# 2. Si todo está OK, iniciar el servidor
npm run dev
```

### 🔍 Diagnóstico Manual

Si el script automático no detecta el problema, sigue estos pasos:

#### 1. Verificar la Consola del Navegador
```bash
# Abrir el navegador en http://localhost:5173
# Presionar F12 para abrir DevTools
# Ir a la pestaña "Console"
# Buscar errores en rojo
```

#### 2. Errores Comunes y Soluciones

**Error: "Cannot read property of undefined"**
```bash
# Causa: Variables no definidas en componentes
# Solución: Verificar Layout.jsx y App.jsx
```

**Error: "useLocation is not defined"**
```jsx
// Solución: En Layout.jsx agregar:
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  // ... resto del código
};
```

**Error: "currentPage is not defined"**
```jsx
// Solución: En Layout.jsx después de definir location:
const currentPage = getPageFromPath(location.pathname);
```

**Error: "Component is not defined"**
```bash
# Causa: Import faltante
# Solución: Verificar que todos los imports estén presentes
```

#### 3. Verificar Archivos Críticos

**App.jsx debe tener:**
```jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
// ... otros imports

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            {/* Rutas aquí */}
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App
```

**Layout.jsx debe tener:**
```jsx
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation(); // ← CRÍTICO
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  const currentPage = getPageFromPath(location.pathname); // ← CRÍTICO
  
  return (
    <>
      <SEO page={currentPage} />
      {/* resto del layout */}
    </>
  );
};
```

### 🛠️ Soluciones Avanzadas

#### Limpiar Caché y Dependencias

```bash
# 1. Eliminar node_modules y caché
rm -rf node_modules
rm -rf .vite
rm package-lock.json

# 2. Reinstalar dependencias
npm install

# 3. Verificar aplicación
npm run check

# 4. Iniciar servidor
npm run dev
```

#### Forzar Inicio sin Verificación

Si necesitas iniciar rápidamente sin verificaciones:

```bash
npm run dev:force
```

⚠️ **Advertencia**: Esto omite las verificaciones de seguridad. Solo usar para desarrollo rápido.

#### Verificar Puertos en Uso

```bash
# Ver si el puerto 5173 está en uso
lsof -ti:5173

# Matar proceso en puerto 5173 si es necesario
kill -9 $(lsof -ti:5173)

# O usar puerto alternativo
vite --port 3000
```

## 🐛 Otros Problemas Comunes

### Problema: Componentes no se Renderizan

**Síntomas:**
- La página carga pero los componentes están vacíos
- Console muestra warnings de React

**Solución:**
```bash
# 1. Verificar que todos los componentes tengan export default
# 2. Verificar imports en App.jsx
# 3. Revisar ErrorBoundary en consola del navegador
```

### Problema: Estilos no se Aplican

**Síntomas:**
- La página se ve sin estilos
- Todo aparece en texto plano

**Solución:**
```bash
# 1. Verificar que Tailwind esté configurado
npm run build

# 2. Verificar index.css tenga las directivas @tailwind
# 3. Reiniciar el servidor
npm run dev
```

### Problema: Rutas 404

**Síntomas:**
- Al navegar a /converter muestra página vacía
- Browser muestra "Cannot GET /converter"

**Solución:**
```jsx
// En App.jsx verificar que todas las rutas estén definidas:
<Route path="/converter" element={<ImageConverter />} />
<Route path="/editor" element={<ImageEditor />} />
<Route path="/transcriber" element={<AudioTranscriber />} />
// etc.
```

### Problema: Hot Module Replacement (HMR) no Funciona

**Síntomas:**
- Los cambios en código no se reflejan automáticamente
- Necesitas refrescar manualmente el navegador

**Solución:**
```bash
# 1. Reiniciar el servidor de desarrollo
# Ctrl+C para detener
npm run dev

# 2. Si persiste, limpiar caché de Vite
rm -rf .vite
npm run dev
```

## 📋 Checklist Antes de Reportar un Bug

Antes de reportar que la aplicación no funciona, verifica:

- [ ] Ejecutaste `npm run check` y no hay errores
- [ ] La consola del navegador no muestra errores en rojo
- [ ] Todos los archivos en `src/pages/` existen
- [ ] Layout.jsx tiene `useLocation` y `currentPage` definidos
- [ ] App.jsx está envuelto en `<ErrorBoundary>`
- [ ] Todas las rutas en App.jsx tienen componentes importados
- [ ] `node_modules` está instalado correctamente
- [ ] Puerto 5173 no está en uso por otra aplicación

## 🚀 Comandos Útiles

```bash
# Verificar estado de la aplicación
npm run check

# Iniciar desarrollo (con verificación)
npm run dev

# Iniciar desarrollo (sin verificación)
npm run dev:force

# Build para producción (con verificación)
npm run build

# Build para producción (sin verificación)
npm run build:force

# Ver preview de build
npm run preview

# Limpiar todo y reiniciar
rm -rf node_modules .vite package-lock.json && npm install && npm run dev
```

## 📞 Soporte

Si ninguna de estas soluciones funciona:

1. **Revisa la consola del navegador** (F12) y copia el error exacto
2. **Ejecuta** `npm run check` y copia la salida
3. **Verifica** que estás en la rama correcta de Git
4. **Contacta** con los detalles específicos del error

## 🎯 Prevención de Problemas Futuros

### Buenas Prácticas:

1. **Siempre ejecuta** `npm run check` antes de commitear código
2. **Usa ErrorBoundary** en todos los componentes críticos
3. **Define variables** antes de usarlas (especialmente hooks)
4. **Importa dependencias** al inicio del archivo
5. **Exporta componentes** con `export default`

### Scripts Automáticos:

El script `check-app.js` verifica automáticamente:
- ✅ Todos los archivos críticos existen
- ✅ Sintaxis básica de componentes
- ✅ Imports necesarios están presentes
- ✅ Configuración de rutas es correcta
- ✅ Dependencias están instaladas

---

**Última actualización**: 2025-10-01  
**Versión**: 1.0.0
