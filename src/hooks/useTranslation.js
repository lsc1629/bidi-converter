import { useLanguage } from './useLanguage'
import { toolsTranslations } from '../i18n/toolsTranslations'

// Diccionario de traducciones completo
const translations = {
  es: {
    nav: {
      home: 'Inicio',
      imageConverter: 'Convertir Imágenes',
      documentViewer: 'Ver Documentos',
      language: 'Idioma'
    },
    home: {
      hero: {
        title: 'Convertidor de Imágenes y Visor de Documentos Online',
        subtitle: 'Gratis, Rápido y Seguro',
        description: 'Convierte PNG a JPG, WebP, GIF online gratis. Visualiza PDF, Word, Excel sin descargar. Herramienta profesional sin registro.',
        convertButton: 'Convertir Imágenes Gratis',
        viewButton: 'Ver Documentos Online'
      },
      popularConversions: {
        title: 'Conversiones Populares',
        description: 'Las conversiones más utilizadas por nuestros usuarios',
        pngToWebp: 'PNG → WebP',
        jpgToPng: 'JPG → PNG',
        gifToWebp: 'GIF → WebP',
        webpToJpg: 'WebP → JPG',
        pdfViewer: 'Visor de PDF',
        popularLabel: 'Popular',
        convertNow: 'Convertir Ahora'
      },
      features: {
        title: 'Por Qué Elegir Nuestro Convertidor de Imágenes',
        description: 'La mejor herramienta gratuita para convertir imágenes y visualizar documentos online',
        fast: {
          title: 'Conversión Instantánea',
          description: 'Convierte PNG a JPG, WebP y GIF en segundos. Sin esperas, sin límites.'
        },
        secure: {
          title: 'Procesamiento Seguro',
          description: 'Tus archivos se procesan localmente en tu navegador. Máxima privacidad garantizada.'
        },
        responsive: {
          title: 'Compatible con Móviles',
          description: 'Funciona perfectamente en teléfonos, tablets y computadoras. Responsive design.'
        },
        crossPlatform: {
          title: 'Sin Instalación Requerida',
          description: 'Compatible con Windows, Mac, Linux, iOS y Android. Solo necesitas un navegador.'
        }
      },
      benefits: {
        title: 'Beneficios del Convertidor Online Gratuito',
        description: 'Descubre por qué millones de usuarios confían en nuestra plataforma',
        noWatermark: {
          title: 'Sin Marcas de Agua',
          description: 'Convierte imágenes sin marcas de agua molestas. Resultados profesionales siempre.'
        },
        batchConversion: {
          title: 'Conversión por Lotes',
          description: 'Convierte múltiples imágenes simultáneamente. Ahorra tiempo con procesamiento masivo.'
        },
        qualityPreservation: {
          title: 'Calidad Preservada',
          description: 'Mantén la calidad original de tus imágenes. Algoritmos avanzados de compresión.'
        },
        noRegistration: {
          title: 'Sin Registro',
          description: 'Empieza a convertir inmediatamente. No necesitas crear cuenta ni proporcionar email.'
        }
      },
      howItWorks: {
        title: 'Cómo Convertir Imágenes Online en 3 Pasos',
        description: 'Proceso simple y rápido para convertir cualquier formato de imagen',
        step1: {
          title: 'Sube tu Imagen',
          description: 'Arrastra y suelta o selecciona archivos PNG, JPG, GIF, WebP o BMP desde tu dispositivo.'
        },
        step2: {
          title: 'Elige el Formato',
          description: 'Selecciona el formato de salida deseado: JPG, PNG, WebP o GIF según tus necesidades.'
        },
        step3: {
          title: 'Descarga el Resultado',
          description: 'Obtén tu imagen convertida instantáneamente. Calidad profesional garantizada.'
        }
      },
      faq: {
        title: 'Preguntas Frecuentes sobre Conversión de Imágenes',
        description: 'Respuestas a las preguntas más comunes sobre nuestro convertidor online gratuito',
        q1: {
          question: '¿Cómo convertir PNG a JPG online gratis?',
          answer: 'Simplemente arrastra tu archivo PNG a nuestra herramienta, selecciona JPG como formato de salida y haz clic en convertir. El proceso es instantáneo y completamente gratuito.'
        },
        q2: {
          question: '¿Es seguro convertir imágenes online?',
          answer: 'Sí, es completamente seguro. Todas las conversiones se procesan localmente en tu navegador, por lo que tus archivos nunca se suben a nuestros servidores.'
        },
        q3: {
          question: '¿Puedo convertir múltiples imágenes a la vez?',
          answer: 'Actualmente soportamos conversión individual, pero estamos trabajando en la función de conversión por lotes para múltiples archivos simultáneamente.'
        },
        q4: {
          question: '¿Qué formatos de imagen soporta el convertidor?',
          answer: 'Soportamos los formatos más populares: PNG, JPG, GIF, WebP y BMP como entrada, y PNG, JPG, WebP y GIF como salida.'
        },
        q5: {
          question: '¿Hay límite de tamaño para las imágenes?',
          answer: 'No hay límites estrictos, pero recomendamos archivos de hasta 50MB para un rendimiento óptimo. Imágenes más grandes pueden tardar más en procesarse.'
        },
        q6: {
          question: '¿Necesito registrarme para usar el convertidor?',
          answer: 'No, nuestro convertidor es completamente gratuito y no requiere registro. Puedes empezar a convertir imágenes inmediatamente.'
        },
        ctaText: '¿Listo para convertir tus imágenes?',
        ctaButton: 'Empezar Ahora Gratis'
      },
      formats: {
        title: 'Formatos Soportados',
        images: {
          title: 'Imágenes',
          input: 'Formatos de entrada',
          output: 'Formatos de salida'
        },
        documents: {
          title: 'Documentos',
          viewing: 'Visualización de documentos'
        }
      }
    },
    converter: {
      title: 'Convertidor de Imágenes',
      subtitle: 'Convierte entre JPG, PNG, WebP y GIF - Soporte para múltiples archivos',
      dragDrop: 'Arrastra y suelta tus imágenes aquí',
      or: 'o',
      selectFiles: 'Seleccionar archivos',
      convert: 'Convertir',
      download: 'Descargar',
      downloadAll: 'Descargar Todo',
      processing: 'Procesando...',
      converting: 'Convirtiendo...',
      convertImage: 'Convertir Imagen',
      changeImage: 'Cambiar imagen',
      selectFormat: 'Seleccionar formato de salida',
      quality: 'Calidad',
      originalSize: 'Tamaño original',
      convertedSize: 'Tamaño convertido',
      compressionRatio: 'Ratio de compresión',
      selectImage: 'Puedes seleccionar de 1 a 10 imágenes',
      supportedFormats: 'Soporta JPG, PNG, GIF, WebP y BMP',
      uploadImage: 'Subir Imágenes',
      targetFormat: 'Formato de salida',
      convertButton: 'Convertir Imágenes',
      conversionComplete: '¡Conversión completada!',
      downloadButton: 'Descargar',
      batchConversion: 'Conversión por Lotes',
      filesSelected: 'archivos seleccionados',
      maxFiles: 'Máximo 10 archivos',
      progress: 'Progreso',
      convertingFile: 'Convirtiendo',
      fileInfo: 'Información del archivo',
      originalFile: 'Archivo original',
      convertedFile: 'Archivo convertido',
      fileSize: 'Tamaño',
      fileType: 'Tipo',
      compressionSaved: 'Compresión',
      conversionTime: 'Tiempo',
      removeFile: 'Eliminar',
      addMoreFiles: 'Agregar más archivos',
      clearAll: 'Limpiar todo'
    },
    viewer: {
      title: 'Visor de Documentos',
      subtitle: 'Visualiza PDF, DOCX y archivos Excel',
      dragDrop: 'Arrastra y suelta tus documentos aquí',
      or: 'o',
      selectFiles: 'Seleccionar archivos',
      download: 'Descargar',
      downloadButton: 'Descargar',
      processing: 'Procesando...',
      changeFile: 'Cambiar archivo',
      pdfViewer: 'Visor de PDF',
      pages: 'páginas',
      page: 'Página',
      of: 'de',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      resetZoom: 'Restablecer zoom',
      fullscreen: 'Pantalla completa',
      description: 'Visualiza documentos PDF, Word y Excel directamente en tu navegador',
      selectFile: 'Selecciona un documento',
      uploadFile: 'Subir Documento',
      supportedFormats: 'Soporta PDF, Word (DOCX) y Excel (XLSX)',
      loading: 'Cargando documento...',
      error: 'Error:',
      processedStyles: '✓ Procesados',
      warnings: 'Advertencias',
      sheets: 'Hojas disponibles',
      newFile: 'Nuevo documento'
    },
    footer: {
      description: 'Herramienta gratuita para convertir imágenes y visualizar documentos online.',
      copyright: 'Todos los derechos reservados.',
      contact: 'Contáctame',
      email: 'donluissalascortes@gmail.com',
      whatsapp: '+56994039964'
    },
    seo: {
      home: {
        title: '🚀 Convertidor GRATIS: Imágenes + PDF Viewer | Sin Registro 2024',
        description: '✅ Convierte 10+ formatos de imagen GRATIS. Visualiza PDF, Word, Excel SIN descargar. Procesamiento local = máxima seguridad. ¡Pruébalo ahora!'
      },
      converter: {
        title: '⚡ Convertir Imágenes GRATIS: PNG→JPG en 3 Segundos | Bidi Converter',
        description: '🎯 Convierte hasta 10 imágenes simultáneamente. PNG, JPG, WebP, GIF → Calidad profesional garantizada. Sin marcas de agua. ¡Conversión instantánea!'
      },
      viewer: {
        title: '📄 Abrir PDF/Word/Excel ONLINE - SIN Descargar | Viewer Gratuito 2024',
        description: '🔒 Visualiza documentos de forma SEGURA en tu navegador. Compatible con PDF, DOCX, XLSX. Sin instalaciones. Procesamiento local 100% privado.'
      }
    },
    aria: {
      openMenu: 'Abrir menú',
      breadcrumb: 'Breadcrumb',
      appHome: 'Bidi Converter - Inicio'
    },
    errors: {
      convertingImage: 'Error al convertir imagen',
      unsupportedFormat: 'Formato de archivo no soportado'
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      close: 'Cerrar',
      retry: 'Reintentar',
      fileSize: 'Tamaño del archivo',
      fileName: 'Nombre del archivo',
      fileType: 'Tipo de archivo'
    },
    ...toolsTranslations.es
  },
  en: {
    nav: {
      home: 'Home',
      imageConverter: 'Convert Images',
      documentViewer: 'View Documents',
      language: 'Language'
    },
    home: {
      hero: {
        title: 'Free Online Image Converter & Document Viewer',
        subtitle: 'Fast, Secure, No Registration',
        description: 'Convert PNG to JPG, WebP converter, GIF to PNG online free. View PDF, Word, Excel files without downloading. Best free converter 2024.',
        convertButton: 'Convert Images Free',
        viewButton: 'View Documents Online'
      },
      popularConversions: {
        title: 'Popular Conversions',
        description: 'The most used conversions by our users',
        pngToWebp: 'PNG → WebP',
        jpgToPng: 'JPG → PNG',
        gifToWebp: 'GIF → WebP',
        webpToJpg: 'WebP → JPG',
        pdfViewer: 'PDF Viewer',
        popularLabel: 'Popular',
        convertNow: 'Convert Now'
      },
      features: {
        title: 'Why Choose Our Free Online Image Converter',
        description: 'The best free tool to convert images and view documents online',
        fast: {
          title: 'Instant Conversion',
          description: 'Convert PNG to JPG, WebP, and GIF in seconds. No waiting, unlimited conversions.'
        },
        secure: {
          title: 'Secure Processing',
          description: 'Your files are processed locally in your browser. Maximum privacy guaranteed.'
        },
        responsive: {
          title: 'Mobile Friendly',
          description: 'Works perfectly on phones, tablets, and computers. Responsive design for all devices.'
        },
        crossPlatform: {
          title: 'No Installation Required',
          description: 'Compatible with Windows, Mac, Linux, iOS, and Android. Just need a web browser.'
        }
      },
      benefits: {
        title: 'Benefits of Our Free Online Image Converter',
        description: 'Discover why millions of users trust our platform for image conversion',
        noWatermark: {
          title: 'No Watermarks',
          description: 'Convert images without annoying watermarks. Professional results every time.'
        },
        batchConversion: {
          title: 'Batch Conversion',
          description: 'Convert multiple images simultaneously. Save time with bulk processing.'
        },
        qualityPreservation: {
          title: 'Quality Preserved',
          description: 'Maintain original image quality. Advanced compression algorithms.'
        },
        noRegistration: {
          title: 'No Registration',
          description: 'Start converting immediately. No account creation or email required.'
        }
      },
      howItWorks: {
        title: 'How to Convert Images Online in 3 Easy Steps',
        description: 'Simple and fast process to convert any image format',
        step1: {
          title: 'Upload Your Image',
          description: 'Drag and drop or select PNG, JPG, GIF, WebP, or BMP files from your device.'
        },
        step2: {
          title: 'Choose Output Format',
          description: 'Select desired output format: JPG, PNG, WebP, or GIF based on your needs.'
        },
        step3: {
          title: 'Download Result',
          description: 'Get your converted image instantly. Professional quality guaranteed.'
        }
      },
      faq: {
        title: 'Frequently Asked Questions About Image Conversion',
        description: 'Answers to the most common questions about our free online image converter',
        q1: {
          question: 'How to convert PNG to JPG online free?',
          answer: 'Simply drag your PNG file to our tool, select JPG as output format and click convert. The process is instant and completely free.'
        },
        q2: {
          question: 'Is it safe to convert images online?',
          answer: 'Yes, it\'s completely safe. All conversions are processed locally in your browser, so your files never get uploaded to our servers.'
        },
        q3: {
          question: 'Can I convert multiple images at once?',
          answer: 'Currently we support individual conversion, but we\'re working on batch conversion feature for multiple files simultaneously.'
        },
        q4: {
          question: 'What image formats does the converter support?',
          answer: 'We support the most popular formats: PNG, JPG, GIF, WebP, and BMP as input, and PNG, JPG, WebP, and GIF as output.'
        },
        q5: {
          question: 'Is there a file size limit for images?',
          answer: 'There are no strict limits, but we recommend files up to 50MB for optimal performance. Larger images may take longer to process.'
        },
        q6: {
          question: 'Do I need to register to use the converter?',
          answer: 'No, our converter is completely free and requires no registration. You can start converting images immediately.'
        },
        ctaText: 'Ready to convert your images?',
        ctaButton: 'Start Now Free'
      },
      formats: {
        title: 'Supported Formats',
        images: {
          title: 'Images',
          input: 'Input formats',
          output: 'Output formats'
        },
        documents: {
          title: 'Documents',
          viewing: 'Document viewing'
        }
      }
    },
    converter: {
      title: 'Image Converter',
      subtitle: 'Convert between JPG, PNG, WebP and GIF - Multiple files support',
      dragDrop: 'Drag and drop your images here',
      or: 'or',
      selectFiles: 'Select files',
      convert: 'Convert',
      download: 'Download',
      downloadAll: 'Download All',
      processing: 'Processing...',
      converting: 'Converting...',
      convertImage: 'Convert Image',
      changeImage: 'Change image',
      selectFormat: 'Select output format',
      quality: 'Quality',
      originalSize: 'Original size',
      convertedSize: 'Converted size',
      compressionRatio: 'Compression ratio',
      selectImage: 'You can select from 1 to 10 images',
      supportedFormats: 'Supports JPG, PNG, GIF, WebP and BMP',
      uploadImage: 'Upload Images',
      targetFormat: 'Output format',
      convertButton: 'Convert Images',
      conversionComplete: 'Conversion completed!',
      downloadButton: 'Download',
      batchConversion: 'Batch Conversion',
      filesSelected: 'files selected',
      maxFiles: 'Maximum 10 files',
      progress: 'Progress',
      convertingFile: 'Converting',
      fileInfo: 'File information',
      originalFile: 'Original file',
      convertedFile: 'Converted file',
      fileSize: 'Size',
      fileType: 'Type',
      compressionSaved: 'Compression',
      conversionTime: 'Time',
      removeFile: 'Remove',
      addMoreFiles: 'Add more files',
      clearAll: 'Clear all'
    },
    viewer: {
      title: 'Document Viewer',
      subtitle: 'View PDF, DOCX and Excel files',
      dragDrop: 'Drag and drop your documents here',
      or: 'or',
      selectFiles: 'Select files',
      download: 'Download',
      downloadButton: 'Download',
      processing: 'Processing...',
      changeFile: 'Change file',
      pdfViewer: 'PDF Viewer',
      pages: 'pages',
      page: 'Page',
      of: 'of',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      resetZoom: 'Reset zoom',
      fullscreen: 'Fullscreen',
      description: 'View PDF, Word and Excel documents directly in your browser',
      selectFile: 'Select a document',
      uploadFile: 'Upload Document',
      supportedFormats: 'Supports PDF, Word (DOCX) and Excel (XLSX)',
      loading: 'Loading document...',
      error: 'Error:',
      processedStyles: '✓ Processed',
      warnings: 'Warnings',
      sheets: 'Available sheets',
      newFile: 'New document'
    },
    footer: {
      description: 'Free tool to convert images and view documents online.',
      copyright: 'All rights reserved.',
      contact: 'Contact me',
      email: 'donluissalascortes@gmail.com',
      whatsapp: '+56994039964'
    },
    seo: {
      home: {
        title: '🔥 FREE Image Converter + PDF Viewer | No Sign-Up Required 2024',
        description: '⚡ Convert 10+ image formats INSTANTLY. View PDF/Word/Excel WITHOUT downloading. 100% browser-based = ultra-secure. Try it now - completely FREE!'
      },
      converter: {
        title: '💯 Convert Images FREE: PNG→JPG in 3 Seconds | Batch Processing',
        description: '🚀 Convert up to 10 images simultaneously! PNG, JPG, WebP, GIF → Professional quality guaranteed. No watermarks. Lightning-fast conversion!'
      },
      viewer: {
        title: '📱 Open PDF/Word/Excel ONLINE - No Download | Free Viewer 2024',
        description: '🛡️ View documents SAFELY in your browser. Supports PDF, DOCX, XLSX. Zero installations needed. 100% private local processing.'
      }
    },
    aria: {
      openMenu: 'Open menu',
      breadcrumb: 'Breadcrumb',
      appHome: 'Bidi Converter - Home'
    },
    errors: {
      convertingImage: 'Error converting image',
      unsupportedFormat: 'Unsupported file format'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      close: 'Close',
      retry: 'Retry',
      fileSize: 'File size',
      fileName: 'File name',
      fileType: 'File type'
    },
    ...toolsTranslations.en
  },
  pt: {
    ...toolsTranslations.pt
  }
}

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language] || translations.en
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        // Fallback al inglés si no se encuentra la traducción
        value = translations.en
        for (const k of keys) {
          value = value?.[k]
          if (value === undefined) {
            return key // Devolver la clave si no se encuentra traducción
          }
        }
        break
      }
    }
    
    return value || key
  }

  return { t }
}
