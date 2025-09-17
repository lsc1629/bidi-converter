import { useLanguage } from './useLanguage'

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
        title: 'Convertidor Universal de Archivos',
        subtitle: 'Rápido y Seguro',
        description: 'Convierte imágenes y visualiza documentos de forma rápida y segura. Sin registro, completamente gratis.',
        convertButton: 'Convertir Imágenes',
        viewButton: 'Ver Documentos'
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
        title: 'Características',
        description: 'Todo lo que necesitas para convertir y visualizar archivos',
        fast: {
          title: 'Rápido',
          description: 'Conversiones instantáneas sin esperas'
        },
        secure: {
          title: 'Seguro',
          description: 'Tus archivos se procesan localmente'
        },
        responsive: {
          title: 'Responsivo',
          description: 'Funciona en todos los dispositivos'
        },
        crossPlatform: {
          title: 'Multiplataforma',
          description: 'Compatible con Windows, Mac, Linux y móviles'
        }
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
      subtitle: 'Convierte entre JPG, PNG, WebP y GIF',
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
      selectImage: 'Selecciona una imagen',
      supportedFormats: 'Soporta JPG, PNG, GIF, WebP y BMP',
      uploadImage: 'Subir Imagen',
      targetFormat: 'Formato de salida',
      convertButton: 'Convertir Imagen',
      conversionComplete: '¡Conversión completada!',
      downloadButton: 'Descargar'
    },
    viewer: {
      title: 'Visor de Documentos',
      subtitle: 'Visualiza PDF, DOCX y archivos Excel',
      dragDrop: 'Arrastra y suelta tus documentos aquí',
      or: 'o',
      selectFiles: 'Seleccionar archivos',
      download: 'Descargar',
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
      copyright: 'Todos los derechos reservados.'
    },
    seo: {
      home: {
        title: 'Bidi Converter - Convertir Imágenes y Visualizar Documentos Online Gratis',
        description: 'Herramienta gratuita para convertir imágenes (PNG, JPG, WebP, GIF) y visualizar documentos (PDF, Word, Excel) online. Rápido, seguro y sin registro.'
      },
      converter: {
        title: 'Convertir Imágenes Online Gratis - PNG, JPG, WebP, GIF | Bidi Converter',
        description: 'Convierte imágenes entre formatos PNG, JPG, WebP, GIF y BMP de forma gratuita. Procesamiento rápido y seguro en tu navegador.'
      },
      viewer: {
        title: 'Visualizar Documentos Online - PDF, Word, Excel | Bidi Converter',
        description: 'Visualiza documentos PDF, Word (DOCX) y Excel (XLSX) directamente en tu navegador. Herramienta gratuita y segura.'
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
    }
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
        title: 'Universal File Converter',
        subtitle: 'Fast and Secure',
        description: 'Convert images and view documents quickly and securely. No registration required, completely free.',
        convertButton: 'Convert Images',
        viewButton: 'View Documents'
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
        title: 'Features',
        description: 'Everything you need to convert and view files',
        fast: {
          title: 'Fast',
          description: 'Instant conversions without waiting'
        },
        secure: {
          title: 'Secure',
          description: 'Your files are processed locally'
        },
        responsive: {
          title: 'Responsive',
          description: 'Works on all devices'
        },
        crossPlatform: {
          title: 'Cross-Platform',
          description: 'Compatible with Windows, Mac, Linux and mobile'
        }
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
      subtitle: 'Convert between JPG, PNG, WebP and GIF',
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
      selectImage: 'Select an image',
      supportedFormats: 'Supports JPG, PNG, GIF, WebP and BMP',
      uploadImage: 'Upload Image',
      targetFormat: 'Output format',
      convertButton: 'Convert Image',
      conversionComplete: 'Conversion completed!',
      downloadButton: 'Download'
    },
    viewer: {
      title: 'Document Viewer',
      subtitle: 'View PDF, DOCX and Excel files',
      dragDrop: 'Drag and drop your documents here',
      or: 'or',
      selectFiles: 'Select files',
      download: 'Download',
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
      copyright: 'All rights reserved.'
    },
    seo: {
      home: {
        title: 'Bidi Converter - Free Online Image Converter & Document Viewer',
        description: 'Free online tool to convert images (PNG, JPG, WebP, GIF) and view documents (PDF, Word, Excel). Fast, secure, no registration required. Perfect for professionals worldwide.'
      },
      converter: {
        title: 'Free Online Image Converter - PNG, JPG, WebP, GIF | Bidi Converter',
        description: 'Convert images between PNG, JPG, WebP, GIF and BMP formats instantly. Professional-grade image conversion tool. Fast, secure processing in your browser.'
      },
      viewer: {
        title: 'Online Document Viewer - PDF, Word, Excel | Bidi Converter',
        description: 'View PDF, Word (DOCX) and Excel (XLSX) documents directly in your browser. Professional document viewer tool. Free, secure, and reliable.'
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
    }
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
