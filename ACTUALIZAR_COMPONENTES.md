# Componentes Restantes por Actualizar

## ✅ YA ACTUALIZADOS:
1. UnitConverter
2. PercentageCalculator
3. CurrencyConverter
4. PasswordGenerator

## ⏳ PENDIENTES:
5. RutValidator
6. BmiCalculator
7. TextConverter
8. UrlShortener
9. ZipCompressor
10. QrGenerator

## Cambios Necesarios en Cada Componente:

### 1. Agregar import:
```javascript
import { useTranslation } from '../hooks/useTranslation';
```

### 2. Agregar hook al inicio del componente:
```javascript
const { t } = useTranslation();
```

### 3. Actualizar SEO:
```javascript
<SEO 
  title={t('tools.[componente].title') + ' - Free 2025'}
  description={t('tools.[componente].description')}
  keywords="..."
/>
```

### 4. Actualizar Título H1:
```javascript
<h1>{t('tools.[componente].title')}</h1>
```

### 5. Actualizar Descripción:
```javascript
<p>{t('tools.[componente].description')}</p>
```

### 6. Actualizar Labels y Botones:
```javascript
<label>{t('tools.[componente].fieldName')}</label>
<button>{t('tools.[componente].buttonName')}</button>
```

---

## NOTA IMPORTANTE:

Las traducciones ya están definidas en:
- `src/i18n/toolsTranslations.js`

Todos los textos están traducidos a:
- Español (es)
- Inglés (en)
- Portugués (pt)

El sistema detecta automáticamente el idioma del navegador y aplica las traducciones correspondientes.

---

## Sistema Funcional Actual:

✅ **Rutas multiidioma** - URLs cambian según idioma
✅ **Menú automático** - Se actualiza según idioma  
✅ **HomePage** - Enlaces dinámicos
✅ **4 componentes** - Completamente traducidos
⏳ **6 componentes** - Pendientes de traducir

**PRÓXIMO PASO:** Actualizar los 6 componentes restantes con el mismo patrón.
