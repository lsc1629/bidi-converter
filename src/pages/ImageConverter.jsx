import React, { useState } from 'react';
import { Upload, FileImage, Download, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';

const ImageConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [targetFormat, setTargetFormat] = useState('png');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [currentlyConverting, setCurrentlyConverting] = useState('');
  const { t } = useTranslation();

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files).slice(0, 10);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const filesWithInfo = imageFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file)
    }));
    
    setSelectedFiles(prev => [...prev, ...filesWithInfo].slice(0, 10));
    setConvertedImages([]);
  };

  const removeFile = (id) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== id));
    setConvertedImages(prev => prev.filter(c => c.originalId !== id));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setConvertedImages([]);
    setConversionProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const convertSingleImage = (fileInfo) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const startTime = Date.now();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const quality = targetFormat === 'jpg' ? 0.9 : undefined;
        const mimeType = `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`;
        
        canvas.toBlob((blob) => {
          const endTime = Date.now();
          const conversionTime = endTime - startTime;
          const url = URL.createObjectURL(blob);
          const compressionRatio = ((fileInfo.size - blob.size) / fileInfo.size * 100).toFixed(1);
          
          resolve({
            originalId: fileInfo.id,
            originalFile: fileInfo,
            convertedFile: {
              url,
              blob,
              size: blob.size,
              type: mimeType,
              filename: `${fileInfo.name.split('.')[0]}.${targetFormat}`
            },
            compressionRatio: compressionRatio > 0 ? compressionRatio : '0',
            conversionTime,
            timestamp: new Date().toISOString()
          });
        }, mimeType, quality);
      };
      
      img.src = fileInfo.preview;
    });
  };

  const convertAllImages = async () => {
    if (selectedFiles.length === 0) return;

    setIsConverting(true);
    setConversionProgress(0);
    setConvertedImages([]);
    
    try {
      const results = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const fileInfo = selectedFiles[i];
        setCurrentlyConverting(fileInfo.name);
        
        const result = await convertSingleImage(fileInfo);
        results.push(result);
        
        const progress = ((i + 1) / selectedFiles.length) * 100;
        setConversionProgress(progress);
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setConvertedImages(results);
      setCurrentlyConverting('');
    } catch (error) {
      console.error('Error convirtiendo imagen:', error);
    } finally {
      setIsConverting(false);
      setConversionProgress(0);
    }
  };

  const downloadSingleImage = (convertedImage) => {
    const a = document.createElement('a');
    a.href = convertedImage.convertedFile.url;
    a.download = convertedImage.convertedFile.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAllImages = () => {
    convertedImages.forEach(convertedImage => {
      setTimeout(() => downloadSingleImage(convertedImage), 100);
    });
  };

  return (
    <>
      <SEO page="converter" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Convertidor de Imágenes Online Gratuito
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Convierte tus imágenes entre JPG, PNG, WebP, GIF y más formatos de forma rápida y segura. 
            Procesamiento local en tu navegador sin subir archivos a servidores.
          </p>
        </div>

        {/* Información de Formatos */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Formatos Soportados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-blue-800">Entrada:</strong> JPG, PNG, GIF, WebP, BMP, TIFF
            </div>
            <div>
              <strong className="text-blue-800">Salida:</strong> JPG, PNG, WebP, GIF
            </div>
          </div>
          <p className="text-blue-700 text-sm mt-2">
            <strong>Límites:</strong> Máximo 10 archivos, 50MB por archivo
          </p>
        </div>

        {/* File Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          {selectedFiles.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-400 transition-colors text-center">
              <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona tus Imágenes
              </h3>
              <p className="text-gray-500 mb-4">
                Arrastra y suelta archivos aquí o haz clic para seleccionar
              </p>
              <div className="flex justify-center">
                <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Subir Imágenes
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedFiles.length} archivo(s) seleccionado(s)
                </h3>
                <div className="flex gap-2">
                  <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer inline-flex items-center">
                    <Upload className="w-4 h-4 mr-2" />
                    Agregar Más
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={clearAllFiles}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors inline-flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpiar Todo
                  </button>
                </div>
              </div>
              
              {/* Files Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {selectedFiles.map((fileInfo) => (
                  <div key={fileInfo.id} className="bg-gray-50 rounded-lg p-4 relative">
                    <button
                      onClick={() => removeFile(fileInfo.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={fileInfo.preview}
                      alt={fileInfo.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-medium text-gray-900 text-sm truncate">{fileInfo.name}</h4>
                    <p className="text-gray-500 text-xs">{formatFileSize(fileInfo.size)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Conversion Settings */}
        {selectedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de Conversión</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato de Salida
                </label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="png">PNG - Sin pérdida, soporta transparencia</option>
                  <option value="jpg">JPG - Ideal para fotografías</option>
                  <option value="webp">WebP - Mejor compresión, moderno</option>
                  <option value="gif">GIF - Para animaciones simples</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={convertAllImages}
                  disabled={isConverting || selectedFiles.length === 0}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isConverting ? 'Convirtiendo...' : 'Convertir Imágenes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isConverting && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progreso de Conversión</span>
                <span className="text-sm text-gray-500">{Math.round(conversionProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${conversionProgress}%` }}
                ></div>
              </div>
            </div>
            {currentlyConverting && (
              <p className="text-sm text-gray-600">
                Convirtiendo: {currentlyConverting}
              </p>
            )}
          </div>
        )}

        {/* Results */}
        {convertedImages.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Conversión Completada
              </h3>
              <button
                onClick={downloadAllImages}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Descargar Todas
              </button>
            </div>
            
            <div className="space-y-4">
              {convertedImages.map((result) => (
                <div key={result.originalId} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Original File Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Archivo Original</h4>
                      <img
                        src={result.originalFile.preview}
                        alt={result.originalFile.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <p className="text-sm text-gray-600 truncate">{result.originalFile.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(result.originalFile.size)}</p>
                    </div>
                    
                    {/* Conversion Stats */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Estadísticas</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-600">Reducción:</span> {result.compressionRatio}%</p>
                        <p><span className="text-gray-600">Tiempo:</span> {result.conversionTime}ms</p>
                        <p><span className="text-gray-600">Formato:</span> {targetFormat.toUpperCase()}</p>
                      </div>
                    </div>
                    
                    {/* Converted File */}
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Archivo Convertido</h4>
                      <img
                        src={result.convertedFile.url}
                        alt={result.convertedFile.filename}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <p className="text-sm text-gray-600 truncate">{result.convertedFile.filename}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(result.convertedFile.size)}</p>
                      <button
                        onClick={() => downloadSingleImage(result)}
                        className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors inline-flex items-center"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Convertidor de Imágenes Online - Guía Completa
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">¿Por qué convertir imágenes?</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>Optimización web:</strong> Reduce tiempos de carga</li>
                <li>• <strong>Compatibilidad:</strong> Asegura que funcione en todos los dispositivos</li>
                <li>• <strong>Espacio de almacenamiento:</strong> Archivos más pequeños</li>
                <li>• <strong>Calidad:</strong> Mantén la mejor calidad posible</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Formatos populares</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>JPG:</strong> Ideal para fotografías</li>
                <li>• <strong>PNG:</strong> Perfecto para gráficos con transparencia</li>
                <li>• <strong>WebP:</strong> Mejor compresión para web moderna</li>
                <li>• <strong>GIF:</strong> Para animaciones simples</li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Características de nuestro convertidor</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <ul className="text-gray-700 space-y-2">
              <li>✅ <strong>Procesamiento local:</strong> Tus archivos nunca salen de tu dispositivo</li>
              <li>✅ <strong>Sin límites de uso:</strong> Convierte tantas imágenes como necesites</li>
              <li>✅ <strong>Conversión por lotes:</strong> Hasta 10 archivos simultáneamente</li>
              <li>✅ <strong>Preservación de calidad:</strong> Algoritmos optimizados</li>
              <li>✅ <strong>Gratis para siempre:</strong> Sin costos ocultos ni suscripciones</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageConverter;
