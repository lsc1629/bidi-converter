import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const SchemaMarkup = ({ page, toolName = null, additionalData = {} }) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Limpiar schemas existentes
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    // Schema base para WebApplication
    const baseWebAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Bidi Converter",
      "alternateName": ["BidiConverter", "Bidi Image Converter"],
      "description": language === 'en' 
        ? "Free online image converter and document viewer. Convert JPG, PNG, WebP, GIF formats and view PDF, Word, Excel files directly in your browser."
        : "Convertidor de imágenes y visor de documentos online gratuito. Convierte JPG, PNG, WebP, GIF y visualiza PDF, Word, Excel directamente en tu navegador.",
      "url": "https://bidiconverter.com",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Supports Chrome, Firefox, Safari, Edge.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2847",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "Image Format Conversion (JPG, PNG, WebP, GIF, BMP)",
        "PDF Document Viewer",
        "Word Document Viewer (DOCX)",
        "Excel Spreadsheet Viewer (XLSX)",
        "Developer Tools (Base64, Favicon Generator)",
        "Unit Converter",
        "Percentage Calculator",
        "Password Generator",
        "QR Code Generator",
        "BMI Calculator"
      ],
      "screenshot": "https://bidiconverter.com/screenshot.jpg",
      "softwareVersion": "2.1.0",
      "datePublished": "2024-01-15",
      "dateModified": new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "Bidi Converter Team",
        "url": "https://bidiconverter.com/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bidi Converter",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bidiconverter.com/logo.png",
          "width": 512,
          "height": 512
        }
      },
      "inLanguage": [language, "es", "en", "pt"],
      "isAccessibleForFree": true,
      "usageInfo": "https://bidiconverter.com/terms",
      "privacyPolicy": "https://bidiconverter.com/privacy"
    };

    // Schemas específicos por herramienta
    const toolSchemas = {
      imageConverter: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": language === 'en' ? "Free Image Converter" : "Convertidor de Imágenes Gratuito",
        "description": language === 'en' 
          ? "Convert images between JPG, PNG, WebP, GIF, and BMP formats instantly. No upload required, 100% browser-based processing."
          : "Convierte imágenes entre formatos JPG, PNG, WebP, GIF y BMP al instante. Sin subida de archivos, procesamiento 100% en navegador.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "JPG to PNG conversion",
          "PNG to WebP conversion", 
          "GIF to JPG conversion",
          "WebP to PNG conversion",
          "Batch processing support",
          "Quality adjustment",
          "No watermarks"
        ]
      },
      
      passwordGenerator: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": language === 'en' ? "Secure Password Generator" : "Generador de Contraseñas Seguras",
        "description": language === 'en'
          ? "Generate cryptographically secure passwords with customizable length and character sets. No data stored or transmitted."
          : "Genera contraseñas criptográficamente seguras con longitud y caracteres personalizables. Sin almacenamiento ni transmisión de datos.",
        "applicationCategory": "SecurityApplication",
        "featureList": [
          "Cryptographically secure random generation",
          "Customizable password length",
          "Multiple character sets support",
          "Local generation only",
          "No data transmission"
        ]
      },

      currencyConverter: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication", 
        "name": language === 'en' ? "Currency Converter" : "Conversor de Divisas",
        "description": language === 'en'
          ? "Convert between 150+ world currencies with real-time exchange rates. Support for major and minor currencies."
          : "Convierte entre más de 150 monedas mundiales con tasas de cambio en tiempo real. Soporte para monedas principales y menores.",
        "applicationCategory": "FinanceApplication",
        "featureList": [
          "150+ supported currencies",
          "Real-time exchange rates",
          "Historical rate data",
          "Popular currency pairs",
          "Mobile-optimized interface"
        ]
      },

      bmiCalculator: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": language === 'en' ? "BMI Calculator" : "Calculadora de IMC",
        "description": language === 'en'
          ? "Calculate Body Mass Index (BMI) using WHO standards. Get health category classification and recommendations."
          : "Calcula el Índice de Masa Corporal (IMC) usando estándares de la OMS. Obtén clasificación de categoría de salud y recomendaciones.",
        "applicationCategory": "HealthApplication",
        "featureList": [
          "WHO standard BMI calculation",
          "Health category classification",
          "Metric and Imperial units",
          "Health recommendations",
          "Privacy-focused calculation"
        ]
      },

      qrGenerator: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": language === 'en' ? "QR Code Generator" : "Generador de Códigos QR",
        "description": language === 'en'
          ? "Generate high-quality QR codes for text, URLs, WiFi, and more. No watermarks, print-ready resolution."
          : "Genera códigos QR de alta calidad para texto, URLs, WiFi y más. Sin marcas de agua, resolución lista para imprimir.",
        "applicationCategory": "UtilitiesApplication",
        "featureList": [
          "Multiple QR code types",
          "High-resolution output",
          "No watermarks",
          "Print-ready quality",
          "Instant generation"
        ]
      },

      unitConverter: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": language === 'en' ? "Unit Converter" : "Conversor de Unidades",
        "description": language === 'en'
          ? "Convert between different units of measurement including length, weight, temperature, volume, and more."
          : "Convierte entre diferentes unidades de medida incluyendo longitud, peso, temperatura, volumen y más.",
        "applicationCategory": "UtilitiesApplication",
        "featureList": [
          "Length conversions",
          "Weight conversions", 
          "Temperature conversions",
          "Volume conversions",
          "Area conversions",
          "Speed conversions"
        ]
      },

      percentageCalculator: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": language === 'en' ? "Percentage Calculator" : "Calculadora de Porcentajes",
        "description": language === 'en'
          ? "Calculate percentages, percentage increase/decrease, and find what percentage one number is of another."
          : "Calcula porcentajes, aumento/disminución porcentual, y encuentra qué porcentaje representa un número de otro.",
        "applicationCategory": "UtilitiesApplication",
        "featureList": [
          "Basic percentage calculations",
          "Percentage increase/decrease",
          "Percentage of total",
          "Percentage change",
          "Step-by-step explanations"
        ]
      }
    };

    // FAQ Schema para páginas con preguntas frecuentes
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": language === 'en' ? "Is Bidi Converter completely free?" : "¿Es Bidi Converter completamente gratuito?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": language === 'en' 
              ? "Yes, Bidi Converter is 100% free to use. All tools are available without registration, watermarks, or hidden fees."
              : "Sí, Bidi Converter es 100% gratuito. Todas las herramientas están disponibles sin registro, marcas de agua o tarifas ocultas."
          }
        },
        {
          "@type": "Question", 
          "name": language === 'en' ? "Are my files uploaded to your servers?" : "¿Se suben mis archivos a sus servidores?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": language === 'en'
              ? "No, all processing happens locally in your browser. Your files never leave your device, ensuring maximum privacy and security."
              : "No, todo el procesamiento ocurre localmente en tu navegador. Tus archivos nunca salen de tu dispositivo, garantizando máxima privacidad y seguridad."
          }
        },
        {
          "@type": "Question",
          "name": language === 'en' ? "What image formats are supported?" : "¿Qué formatos de imagen son compatibles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": language === 'en'
              ? "We support JPG, PNG, WebP, GIF, BMP, and SVG formats for conversion and viewing."
              : "Soportamos formatos JPG, PNG, WebP, GIF, BMP y SVG para conversión y visualización."
          }
        }
      ]
    };

    // HowTo Schema para tutoriales
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": language === 'en' ? "How to Convert Images Online" : "Cómo Convertir Imágenes Online",
      "description": language === 'en'
        ? "Step-by-step guide to convert images between different formats using Bidi Converter"
        : "Guía paso a paso para convertir imágenes entre diferentes formatos usando Bidi Converter",
      "totalTime": "PT2M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": language === 'en' ? "Image file to convert" : "Archivo de imagen para convertir"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Web Browser"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": language === 'en' ? "Select your image" : "Selecciona tu imagen",
          "text": language === 'en' 
            ? "Click the upload area or drag and drop your image file"
            : "Haz clic en el área de subida o arrastra y suelta tu archivo de imagen",
          "url": "https://bidiconverter.com/converter#step1"
        },
        {
          "@type": "HowToStep", 
          "name": language === 'en' ? "Choose output format" : "Elige el formato de salida",
          "text": language === 'en'
            ? "Select the desired output format from the dropdown menu"
            : "Selecciona el formato de salida deseado del menú desplegable",
          "url": "https://bidiconverter.com/converter#step2"
        },
        {
          "@type": "HowToStep",
          "name": language === 'en' ? "Download converted image" : "Descarga la imagen convertida", 
          "text": language === 'en'
            ? "Click the download button to save your converted image"
            : "Haz clic en el botón de descarga para guardar tu imagen convertida",
          "url": "https://bidiconverter.com/converter#step3"
        }
      ]
    };

    // Organización Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bidi Converter",
      "url": "https://bidiconverter.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bidiconverter.com/logo.png",
        "width": 512,
        "height": 512
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://bidiconverter.com/contact",
        "availableLanguage": ["Spanish", "English", "Portuguese"]
      },
      "sameAs": [
        "https://github.com/bidiconverter",
        "https://twitter.com/bidiconverter"
      ]
    };

    // Seleccionar schemas según la página
    const schemasToAdd = [baseWebAppSchema];

    // Agregar schema específico de herramienta si existe
    if (toolName && toolSchemas[toolName]) {
      schemasToAdd.push(toolSchemas[toolName]);
    }

    // Agregar schemas adicionales según la página
    switch (page) {
      case 'home':
        schemasToAdd.push(organizationSchema, faqSchema);
        break;
      case 'converter':
      case 'conversor':
        schemasToAdd.push(toolSchemas.imageConverter, howToSchema);
        break;
      case 'password-generator':
      case 'generador-contrasenas':
        schemasToAdd.push(toolSchemas.passwordGenerator);
        break;
      case 'currency-converter':
      case 'conversor-divisas':
        schemasToAdd.push(toolSchemas.currencyConverter);
        break;
      case 'bmi-calculator':
      case 'calculadora-imc':
        schemasToAdd.push(toolSchemas.bmiCalculator);
        break;
      case 'qr-generator':
      case 'generador-qr':
        schemasToAdd.push(toolSchemas.qrGenerator);
        break;
      case 'unit-converter':
      case 'conversor-unidades':
        schemasToAdd.push(toolSchemas.unitConverter);
        break;
      case 'percentage-calculator':
      case 'calculadora-porcentajes':
        schemasToAdd.push(toolSchemas.percentageCalculator);
        break;
      case 'about':
      case 'acerca':
        schemasToAdd.push(organizationSchema);
        break;
      case 'contact':
      case 'contacto':
        schemasToAdd.push(organizationSchema);
        break;
      default:
        // Para otras páginas, solo el schema base
        break;
    }

    // Agregar datos adicionales si se proporcionan
    if (additionalData && Object.keys(additionalData).length > 0) {
      schemasToAdd.push(additionalData);
    }

    // Insertar todos los schemas en el head
    schemasToAdd.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema, null, 2);
      script.id = `schema-${index}`;
      document.head.appendChild(script);
    });

  }, [page, toolName, language, additionalData]);

  return null;
};

export default SchemaMarkup;
