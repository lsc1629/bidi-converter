import React, { useState } from 'react'
import { Upload, FileImage, FileText, Download, Menu, X, ArrowRight, Zap, Shield, Smartphone } from 'lucide-react'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'
import SEO from './components/SEO'

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <SEO 
        title={activeTab === 'home' ? "Convertidor de Imágenes y Documentos Online Gratis | Bidi Converter" : 
               activeTab === 'converter' ? "Convertidor de Imágenes Online - JPG, PNG, WebP, GIF" :
               "Visor de Documentos Online - PDF, Word, Excel"}
        description={activeTab === 'home' ? "Convierte imágenes y visualiza documentos online gratis. PNG a WebP, JPG a PNG, visor PDF, Word y Excel. Rápido, seguro y sin registro." :
                    activeTab === 'converter' ? "Convierte imágenes entre JPG, PNG, GIF, WebP de forma gratuita. Herramienta online rápida y segura sin registro." :
                    "Visualiza documentos Word, Excel y PDF directamente en tu navegador. Visor online gratuito y seguro."}
        keywords={activeTab === 'home' ? "convertidor imágenes, PNG a WebP, JPG a PNG, visor PDF, convertir imágenes gratis, herramientas online" :
                  activeTab === 'converter' ? "convertidor imágenes, JPG a PNG, PNG a WebP, GIF converter, convertir imágenes online" :
                  "visor PDF, Word online, Excel viewer, documentos online, PDF viewer"}
        url={`https://bidiconverter.com/${activeTab === 'home' ? '' : activeTab === 'converter' ? 'convertidor-imagenes' : 'visor-documentos'}`}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header with structured navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Navegación principal">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-blue-600">
                  <button onClick={() => setActiveTab('home')} aria-label="Bidi Converter - Inicio">
                    Bidi Converter
                  </button>
                </h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'home'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={activeTab === 'home'}
                >
                  Inicio
                </button>
                <button
                  onClick={() => setActiveTab('converter')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'converter'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={activeTab === 'converter'}
                >
                  <FileImage className="inline-block w-4 h-4 mr-2" />
                  Convertidor
                </button>
                <button
                  onClick={() => setActiveTab('viewer')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'viewer'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={activeTab === 'viewer'}
                >
                  <FileText className="inline-block w-4 h-4 mr-2" />
                  Visor
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  aria-expanded={isMenuOpen}
                  aria-label="Abrir menú de navegación"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab('home')
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      activeTab === 'home'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Inicio
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('converter')
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      activeTab === 'converter'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FileImage className="inline-block w-4 h-4 mr-2" />
                    Convertidor
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('viewer')
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      activeTab === 'viewer'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="inline-block w-4 h-4 mr-2" />
                    Visor
                  </button>
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Breadcrumbs - Only show when not on home */}
        {activeTab !== 'home' && (
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-gray-700">Inicio</button>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900">
                  {activeTab === 'converter' ? 'Convertidor de Imágenes' : 'Visor de Documentos'}
                </span>
              </li>
            </ol>
          </nav>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
          {activeTab === 'home' && (
            <HomePage setActiveTab={setActiveTab} />
          )}
          {activeTab === 'converter' && (
            <section aria-labelledby="converter-heading">
              <ImageConverter />
            </section>
          )}
          {activeTab === 'viewer' && (
            <section aria-labelledby="viewer-heading">
              <DocumentViewer />
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bidi Converter</h3>
                <p className="text-gray-600 text-sm">
                  Herramienta gratuita para convertir imágenes y visualizar documentos online de forma segura y rápida.
                </p>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Conversiones Populares</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><button onClick={() => setActiveTab('converter')} className="hover:text-gray-900">PNG a WebP</button></li>
                  <li><button onClick={() => setActiveTab('converter')} className="hover:text-gray-900">JPG a PNG</button></li>
                  <li><button onClick={() => setActiveTab('converter')} className="hover:text-gray-900">GIF a WebP</button></li>
                  <li><button onClick={() => setActiveTab('converter')} className="hover:text-gray-900">WebP a JPG</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Herramientas</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><button onClick={() => setActiveTab('converter')} className="hover:text-gray-900">Convertidor de Imágenes</button></li>
                  <li><button onClick={() => setActiveTab('viewer')} className="hover:text-gray-900">Visor de Documentos</button></li>
                  <li><button onClick={() => setActiveTab('viewer')} className="hover:text-gray-900">Visor PDF Online</button></li>
                  <li><button onClick={() => setActiveTab('viewer')} className="hover:text-gray-900">Visor Word Online</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Información</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">Política de Privacidad</a></li>
                  <li><a href="#" className="hover:text-gray-900">Términos de Uso</a></li>
                  <li><a href="#" className="hover:text-gray-900">Contacto</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
              <p>&copy; 2024 Bidi Converter. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Home Page Component
function HomePage({ setActiveTab }) {
  const popularConversions = [
    { from: 'PNG', to: 'WebP', description: 'Reduce el tamaño manteniendo calidad', popular: true },
    { from: 'JPG', to: 'PNG', description: 'Convierte a formato con transparencia', popular: true },
    { from: 'GIF', to: 'WebP', description: 'Optimiza animaciones para web', popular: false },
    { from: 'WebP', to: 'JPG', description: 'Compatible con todos los navegadores', popular: false },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Convierte y Visualiza
            <span className="text-blue-600 block">Archivos Online</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Herramienta gratuita para convertir imágenes y visualizar documentos. 
            Rápido, seguro y sin necesidad de registro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('converter')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <FileImage className="w-5 h-5 mr-2" />
              Convertir Imágenes
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => setActiveTab('viewer')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Ver Documentos
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Conversiones Más Populares</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Accede directamente a las conversiones más utilizadas por nuestros usuarios
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularConversions.map((conversion, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
                conversion.popular ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setActiveTab('converter')}
            >
              {conversion.popular && (
                <div className="flex items-center mb-3">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {conversion.from} → {conversion.to}
                </div>
                <p className="text-sm text-gray-600 mb-4">{conversion.description}</p>
                <div className="flex items-center justify-center text-blue-600 font-medium">
                  Convertir ahora
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir Bidi Converter?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La herramienta más completa para todas tus necesidades de conversión y visualización
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Súper Rápido</h3>
            <p className="text-gray-600">
              Conversiones instantáneas procesadas directamente en tu navegador
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Seguro</h3>
            <p className="text-gray-600">
              Tus archivos nunca salen de tu dispositivo. Privacidad garantizada
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiplataforma</h3>
            <p className="text-gray-600">
              Funciona perfectamente en móviles, tablets y computadoras
            </p>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Formatos Soportados</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileImage className="w-6 h-6 mr-2 text-blue-600" />
              Imágenes
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Entrada:</h4>
                <div className="flex flex-wrap gap-2">
                  {['JPG', 'PNG', 'GIF', 'WebP', 'BMP'].map(format => (
                    <span key={format} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Salida:</h4>
                <div className="flex flex-wrap gap-2">
                  {['JPG', 'PNG', 'WebP', 'GIF'].map(format => (
                    <span key={format} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-green-600" />
              Documentos
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Visualización:</h4>
                <div className="flex flex-wrap gap-2">
                  {['PDF', 'Word (DOCX)', 'Excel (XLSX)'].map(format => (
                    <span key={format} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Image Converter Component
function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [convertedImage, setConvertedImage] = useState(null)
  const [targetFormat, setTargetFormat] = useState('png')
  const [isConverting, setIsConverting] = useState(false)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setConvertedImage(null)
    }
  }

  const convertImage = async () => {
    if (!selectedFile) return

    setIsConverting(true)
    
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        const quality = targetFormat === 'jpg' ? 0.9 : undefined
        const mimeType = `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          setConvertedImage({
            url,
            blob,
            filename: `converted.${targetFormat}`
          })
          setIsConverting(false)
        }, mimeType, quality)
      }
      
      img.src = URL.createObjectURL(selectedFile)
    } catch (error) {
      console.error('Error converting image:', error)
      setIsConverting(false)
    }
  }

  const downloadImage = () => {
    if (convertedImage) {
      const link = document.createElement('a')
      link.href = convertedImage.url
      link.download = convertedImage.filename
      link.click()
    }
  }

  const resetConverter = () => {
    setSelectedFile(null)
    setConvertedImage(null)
    setTargetFormat('png')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 id="converter-heading" className="text-3xl font-bold text-gray-900 mb-4">
          Convertidor de Imágenes
        </h2>
        <p className="text-gray-600">
          Convierte tus imágenes entre diferentes formatos de manera rápida y segura
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {!selectedFile ? (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-400 transition-colors">
              <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona una imagen
              </h3>
              <p className="text-gray-500 mb-4">
                Soporta JPG, PNG, GIF, WebP y BMP
              </p>
              <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Subir Imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileImage className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedFile.name}</h3>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={resetConverter}
                className="text-gray-500 hover:text-gray-700 p-2"
                aria-label="Cambiar imagen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de salida
                </label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="webp">WebP</option>
                  <option value="gif">GIF</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={convertImage}
                  disabled={isConverting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isConverting ? 'Convirtiendo...' : 'Convertir Imagen'}
                </button>
              </div>
            </div>

            {convertedImage && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileImage className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{convertedImage.filename}</h3>
                      <p className="text-sm text-green-600">¡Conversión completada!</p>
                    </div>
                  </div>
                  <button
                    onClick={downloadImage}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Document Viewer Component
function DocumentViewer() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [processedStyles, setProcessedStyles] = useState([])

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      loadDocument(file)
    }
  }

  const loadDocument = async (file) => {
    setIsLoading(true)
    setError(null)
    setFileContent(null)
    setProcessedStyles([])

    try {
      const fileType = file.type
      
      if (fileType === 'application/pdf') {
        const url = URL.createObjectURL(file)
        setFileContent({ type: 'pdf', url })
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Handle DOCX files with mammoth
        const arrayBuffer = await file.arrayBuffer()
        
        const styleMap = [
          "p[style-name='Firma'] => .signature",
          "p[style-name='Sinespaciado'] => .no-spacing",
          "p[style-name='Título'] => .title",
          "p[style-name='Subtítulo'] => .subtitle"
        ]
        
        const options = {
          styleMap: styleMap,
          includeDefaultStyleMap: true
        }
        
        const result = await mammoth.convertToHtml({ arrayBuffer }, options)
        
        // Filter and process warnings
        const criticalWarnings = result.messages.filter(msg => 
          msg.type === 'error' || 
          (msg.type === 'warning' && !msg.message.includes('Unrecognised paragraph style'))
        )
        
        const styleWarnings = result.messages.filter(msg => 
          msg.message.includes('Unrecognised paragraph style')
        )
        
        setProcessedStyles(styleWarnings.map(w => w.message))
        setFileContent({ 
          type: 'word', 
          html: result.value,
          warnings: criticalWarnings
        })
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Handle Excel files with SheetJS
        const arrayBuffer = await file.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        
        const sheets = {}
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName]
          const htmlTable = XLSX.utils.sheet_to_html(worksheet, {
            id: `sheet-${sheetName}`,
            editable: false
          })
          sheets[sheetName] = htmlTable
        })
        
        setFileContent({ 
          type: 'excel', 
          sheets,
          sheetNames: workbook.SheetNames
        })
      } else {
        throw new Error('Formato de archivo no soportado')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetViewer = () => {
    setSelectedFile(null)
    setFileContent(null)
    setError(null)
    setProcessedStyles([])
  }

  const downloadFile = () => {
    if (selectedFile) {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(selectedFile)
      link.download = selectedFile.name
      link.click()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 id="viewer-heading" className="text-3xl font-bold text-gray-900 mb-4">
          Visor de Documentos
        </h2>
        <p className="text-gray-600">
          Visualiza documentos PDF, Word y Excel directamente en tu navegador
        </p>
      </div>

      {!fileContent ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-400 transition-colors">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona un documento
              </h3>
              <p className="text-gray-500 mb-4">
                Soporta PDF, Word (DOCX) y Excel (XLSX)
              </p>
              <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Subir Documento
                <input
                  type="file"
                  accept=".pdf,.docx,.xlsx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top bar with file info and actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedFile?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadFile}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Descargar
                </button>
                <button
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Cambiar archivo
                </button>
                <button
                  onClick={resetViewer}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center text-sm"
                >
                  <X className="w-4 h-4 mr-1" />
                  Nuevo documento
                </button>
              </div>
            </div>
            
            {/* Hidden file input for changing files */}
            <input
              type="file"
              accept=".pdf,.docx,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando documento...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}

          {/* Document content */}
          {fileContent && !isLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {fileContent.type === 'pdf' && (
                <div className="w-full h-screen">
                  <iframe
                    src={fileContent.url}
                    className="w-full h-full border-0"
                    title="PDF Viewer"
                  />
                </div>
              )}
              
              {fileContent.type === 'word' && (
                <div className="p-6">
                  {processedStyles.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        ✓ Procesados {processedStyles.length} estilos personalizados
                      </p>
                    </div>
                  )}
                  {fileContent.warnings && fileContent.warnings.length > 0 && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800 font-medium mb-2">Advertencias:</p>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {fileContent.warnings.map((warning, index) => (
                          <li key={index}>• {warning.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div 
                    className="word-document prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: fileContent.html }}
                  />
                </div>
              )}
              
              {fileContent.type === 'excel' && (
                <div className="p-6">
                  {fileContent.sheetNames.length > 1 && (
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Hojas disponibles:</h3>
                      <div className="flex flex-wrap gap-2">
                        {fileContent.sheetNames.map(sheetName => (
                          <span key={sheetName} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {sheetName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {fileContent.sheetNames.map(sheetName => (
                    <div key={sheetName} className="mb-8">
                      {fileContent.sheetNames.length > 1 && (
                        <h4 className="text-md font-medium text-gray-800 mb-3 border-b pb-2">
                          {sheetName}
                        </h4>
                      )}
                      <div 
                        className="excel-sheet overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: fileContent.sheets[sheetName] }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App