import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Download, Upload, Zap, Shield, Clock, Star } from 'lucide-react';

const SpecificConverter = ({ 
  fromFormat, 
  toFormat, 
  title, 
  description, 
  keywords,
  benefits = [],
  useCases = [],
  faqs = [],
  relatedTools = []
}) => {
  const { language } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const fileInputRef = useRef(null);

  // Función para manejar la conversión (integrada con el convertidor existente)
  const handleConversion = async (inputFile) => {
    if (!inputFile) return;
    
    setConverting(true);
    
    try {
      // Simular conversión (aquí se integraría con la lógica existente del convertidor)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConverted(true);
    } catch (error) {
      console.error('Error en conversión:', error);
    } finally {
      setConverting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      handleConversion(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      handleConversion(selectedFile);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {description}
        </p>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span>100% Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <span>Conversión Instantánea</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Sin Marcas de Agua</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>24/7 Disponible</span>
          </div>
        </div>
      </div>

      {/* Converter Tool */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Convertir {fromFormat.toUpperCase()} a {toFormat.toUpperCase()}
          </h2>
          <p className="text-gray-600">
            Arrastra tu archivo aquí o haz clic para seleccionar
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={`.${fromFormat}`}
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {!file && !converting && !converted && (
            <>
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">
                Selecciona tu archivo {fromFormat.toUpperCase()}
              </p>
              <p className="text-gray-500 mb-6">
                O arrastra y suelta aquí
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Elegir Archivo
              </button>
            </>
          )}

          {converting && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 mb-2">
                Convirtiendo a {toFormat.toUpperCase()}...
              </p>
              <p className="text-gray-500">
                Procesamiento local seguro
              </p>
            </div>
          )}

          {converted && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-xl text-gray-900 mb-2 font-semibold">
                ¡Conversión Completada!
              </p>
              <p className="text-gray-600 mb-6">
                Tu archivo {toFormat.toUpperCase()} está listo
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Descargar {toFormat.toUpperCase()}
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2.5M+</div>
            <div className="text-sm text-gray-500">Conversiones</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-500">Gratuito</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">3s</div>
            <div className="text-sm text-gray-500">Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4.8★</div>
            <div className="text-sm text-gray-500">Valoración</div>
          </div>
        </div>
      </div>

      {/* Benefits & Use Cases */}
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Por qué convertir {fromFormat.toUpperCase()} a {toFormat.toUpperCase()}?
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-700 leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Casos de Uso Comunes
          </h2>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">•</span>
                </div>
                <span className="text-gray-700 leading-relaxed">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Cómo Convertir {fromFormat.toUpperCase()} a {toFormat.toUpperCase()}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Selecciona tu archivo
            </h3>
            <p className="text-gray-600">
              Haz clic o arrastra tu archivo {fromFormat.toUpperCase()} al área de conversión
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Conversión automática
            </h3>
            <p className="text-gray-600">
              El archivo se convierte automáticamente a {toFormat.toUpperCase()} en tu navegador
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Descarga el resultado
            </h3>
            <p className="text-gray-600">
              Descarga tu archivo {toFormat.toUpperCase()} convertido al instante
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Herramientas Relacionadas
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedTools.map((tool, index) => (
            <Link
              key={index}
              to={tool.href}
              className="bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-2xl mb-3">{tool.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificConverter;
