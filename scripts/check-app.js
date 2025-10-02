#!/usr/bin/env node

/**
 * Script de verificación de la aplicación
 * Detecta problemas comunes que causan pantallas en blanco
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errors = [];
const warnings = [];

console.log('🔍 Verificando la aplicación Bidi Converter...\n');

// 1. Verificar que todos los componentes principales existan
const requiredFiles = [
  'src/App.jsx',
  'src/main.jsx',
  'src/components/Layout.jsx',
  'src/components/SEO.jsx',
  'src/components/ErrorBoundary.jsx',
  'src/pages/HomePage.jsx',
  'src/pages/ImageConverter.jsx',
  'src/pages/ImageEditor.jsx',
  'src/pages/AudioTranscriber.jsx',
  'src/pages/DocumentViewer.jsx',
  'src/pages/DevTools.jsx',
  'src/hooks/useLanguage.js',
  'src/hooks/useTranslation.js',
  'index.html',
  'package.json'
];

const rootDir = path.resolve(__dirname, '..');

requiredFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`❌ Archivo faltante: ${file}`);
  } else {
    console.log(`✅ ${file}`);
  }
});

// 2. Verificar sintaxis básica de App.jsx
try {
  const appPath = path.join(rootDir, 'src/App.jsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  
  // Verificar imports críticos
  if (!appContent.includes('import React')) {
    warnings.push(`⚠️  App.jsx: Falta import de React`);
  }
  if (!appContent.includes('BrowserRouter') || !appContent.includes('Router')) {
    warnings.push(`⚠️  App.jsx: Falta import de React Router`);
  }
  if (!appContent.includes('ErrorBoundary')) {
    warnings.push(`⚠️  App.jsx: No está envuelto en ErrorBoundary`);
  }
  
  // Verificar export
  if (!appContent.includes('export default App')) {
    errors.push(`❌ App.jsx: Falta export default`);
  }
  
  console.log('✅ App.jsx sintaxis básica OK');
} catch (err) {
  errors.push(`❌ Error al leer App.jsx: ${err.message}`);
}

// 3. Verificar Layout.jsx
try {
  const layoutPath = path.join(rootDir, 'src/components/Layout.jsx');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Verificar useLocation
  if (!layoutContent.includes('useLocation')) {
    errors.push(`❌ Layout.jsx: Falta useLocation hook`);
  }
  
  // Verificar que location esté definido
  if (!layoutContent.includes('const location = useLocation()') && !layoutContent.includes('const location=useLocation()')) {
    errors.push(`❌ Layout.jsx: Variable 'location' no está definida`);
  }
  
  console.log('✅ Layout.jsx configuración OK');
} catch (err) {
  errors.push(`❌ Error al leer Layout.jsx: ${err.message}`);
}

// 4. Verificar package.json
try {
  const packagePath = path.join(rootDir, 'package.json');
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredDeps = ['react', 'react-dom', 'react-router-dom'];
  requiredDeps.forEach(dep => {
    if (!packageContent.dependencies || !packageContent.dependencies[dep]) {
      errors.push(`❌ package.json: Falta dependencia '${dep}'`);
    }
  });
  
  console.log('✅ package.json dependencias OK');
} catch (err) {
  errors.push(`❌ Error al leer package.json: ${err.message}`);
}

// 5. Verificar index.html
try {
  const indexPath = path.join(rootDir, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  if (!indexContent.includes('<div id="root"')) {
    errors.push(`❌ index.html: Falta <div id="root">`);
  }
  
  console.log('✅ index.html configuración OK');
} catch (err) {
  errors.push(`❌ Error al leer index.html: ${err.message}`);
}

// 6. Verificar main.jsx
try {
  const mainPath = path.join(rootDir, 'src/main.jsx');
  const mainContent = fs.readFileSync(mainPath, 'utf8');
  
  if (!mainContent.includes('createRoot') && !mainContent.includes('render')) {
    errors.push(`❌ main.jsx: Falta método de renderizado`);
  }
  
  if (!mainContent.includes('import App')) {
    errors.push(`❌ main.jsx: Falta import de App`);
  }
  
  console.log('✅ main.jsx configuración OK');
} catch (err) {
  errors.push(`❌ Error al leer main.jsx: ${err.message}`);
}

// Resumen
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMEN DE VERIFICACIÓN\n');

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ ¡Todo perfecto! No se encontraron problemas.\n');
  console.log('🚀 La aplicación debería funcionar correctamente.');
  console.log('💡 Si ves pantalla en blanco, verifica la consola del navegador (F12).\n');
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.log('❌ ERRORES CRÍTICOS:\n');
    errors.forEach(err => console.log(`   ${err}`));
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  ADVERTENCIAS:\n');
    warnings.forEach(warn => console.log(`   ${warn}`));
    console.log('');
  }
  
  console.log('🔧 Por favor corrige los errores antes de continuar.\n');
  process.exit(errors.length > 0 ? 1 : 0);
}
