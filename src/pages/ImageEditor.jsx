import React, { useState, useRef, useEffect } from 'react';
import { Upload, RotateCw, Crop, Sliders, Download, Undo, Redo, ZoomIn, ZoomOut, Move } from 'lucide-react';
import SEO from '../components/SEO';

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tool, setTool] = useState('move');
  const [zoom, setZoom] = useState(1);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    sepia: 0,
    grayscale: 0
  });
  const [rotation, setRotation] = useState(0);
  const [cropArea, setCropArea] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // Cargar imagen
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          setCurrentImage(img);
          setHistory([img]);
          setHistoryIndex(0);
          // Resetear posición y zoom al cargar nueva imagen
          setImagePosition({ x: 0, y: 0 });
          setZoom(1);
          setRotation(0);
          setFilters({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            blur: 0,
            sepia: 0,
            grayscale: 0
          });
          drawImageToCanvas(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Dibujar imagen en canvas
  const drawImageToCanvas = (img, applyFilters = true) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Definir área de trabajo del canvas
    const containerWidth = 800;
    const containerHeight = 600;
    
    // Calcular dimensiones de la imagen manteniendo aspect ratio
    let { width, height } = img;
    const aspectRatio = width / height;
    
    // Ajustar imagen para que quepa en el contenedor
    if (width > containerWidth || height > containerHeight) {
      if (aspectRatio > containerWidth / containerHeight) {
        // La imagen es más ancha
        width = containerWidth * 0.9; // 90% del ancho disponible
        height = width / aspectRatio;
      } else {
        // La imagen es más alta
        height = containerHeight * 0.9; // 90% del alto disponible
        width = height * aspectRatio;
      }
    }
    
    // Establecer tamaño del canvas
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    
    // Limpiar canvas con fondo gris claro
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calcular posición centrada
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Aplicar transformaciones
    ctx.save();
    ctx.translate(centerX + imagePosition.x, centerY + imagePosition.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    
    // Aplicar filtros si está habilitado
    if (applyFilters) {
      ctx.filter = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        blur(${filters.blur}px)
        sepia(${filters.sepia}%)
        grayscale(${filters.grayscale}%)
      `;
    }
    
    // Dibujar imagen centrada
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
    
    // Dibujar área de recorte si está activa
    if (cropArea && tool === 'crop') {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
      ctx.setLineDash([]);
    }
  };

  // Aplicar rotación
  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    addToHistory();
  };

  // Aplicar filtros
  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
  };

  // Aplicar filtros al canvas
  useEffect(() => {
    if (currentImage) {
      drawImageToCanvas(currentImage);
    }
  }, [filters, rotation, zoom, imagePosition, cropArea, tool]);

  // Agregar al historial
  const addToHistory = () => {
    const canvas = canvasRef.current;
    const newImageData = canvas.toDataURL();
    const img = new Image();
    img.onload = () => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(img);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentImage(img);
    };
    img.src = newImageData;
  };

  // Deshacer
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentImage(history[newIndex]);
      drawImageToCanvas(history[newIndex]);
    }
  };

  // Rehacer
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentImage(history[newIndex]);
      drawImageToCanvas(history[newIndex]);
    }
  };

  // Recortar imagen
  const handleCrop = () => {
    if (!cropArea || !currentImage) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Crear nuevo canvas para el recorte
    const cropCanvas = document.createElement('canvas');
    const cropCtx = cropCanvas.getContext('2d');
    
    cropCanvas.width = cropArea.width;
    cropCanvas.height = cropArea.height;
    
    // Obtener datos de la imagen del área de recorte
    const imageData = ctx.getImageData(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
    cropCtx.putImageData(imageData, 0, 0);
    
    // Convertir a imagen
    const croppedImage = new Image();
    croppedImage.onload = () => {
      setCurrentImage(croppedImage);
      setCropArea(null);
      setTool('move');
      addToHistory();
    };
    croppedImage.src = cropCanvas.toDataURL();
  };

  // Descargar imagen editada
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'imagen-editada.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  // Manejo de eventos del mouse para herramientas
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDragStart({ x, y });
    
    if (tool === 'crop') {
      setCropArea({ x, y, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (tool === 'move') {
      const deltaX = x - dragStart.x;
      const deltaY = y - dragStart.y;
      setImagePosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setDragStart({ x, y });
    } else if (tool === 'crop' && cropArea) {
      setCropArea(prev => ({
        ...prev,
        width: x - prev.x,
        height: y - prev.y
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Presets de filtros
  const filterPresets = [
    { name: 'Original', filters: { brightness: 100, contrast: 100, saturation: 100, blur: 0, sepia: 0, grayscale: 0 } },
    { name: 'Vintage', filters: { brightness: 110, contrast: 120, saturation: 80, blur: 0, sepia: 30, grayscale: 0 } },
    { name: 'B&W', filters: { brightness: 100, contrast: 110, saturation: 0, blur: 0, sepia: 0, grayscale: 100 } },
    { name: 'Brillante', filters: { brightness: 120, contrast: 110, saturation: 120, blur: 0, sepia: 0, grayscale: 0 } },
    { name: 'Suave', filters: { brightness: 105, contrast: 95, saturation: 90, blur: 1, sepia: 0, grayscale: 0 } }
  ];

  const applyPreset = (preset) => {
    setFilters(preset.filters);
  };

  return (
    <>
      <SEO page="editor" />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Editor de Imágenes Online
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Edita tus imágenes directamente en el navegador. Aplica filtros, rota, recorta y ajusta 
            sin necesidad de software adicional. Procesamiento 100% local y privado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de herramientas */}
          <div className="lg:col-span-1 space-y-6">
            {/* Cargar imagen */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cargar Imagen</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Upload className="w-5 h-5 mr-2" />
                Seleccionar Imagen
              </button>
            </div>

            {/* Herramientas */}
            {currentImage && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Herramientas</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => setTool('move')}
                    className={`p-3 rounded-lg flex items-center justify-center ${
                      tool === 'move' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Move className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setTool('crop')}
                    className={`p-3 rounded-lg flex items-center justify-center ${
                      tool === 'crop' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Crop className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleRotate}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Rotar 90°
                  </button>
                  
                  <button
                    onClick={() => setImagePosition({ x: 0, y: 0 })}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Move className="w-4 h-4 mr-2" />
                    Centrar Imagen
                  </button>
                  
                  <button
                    onClick={() => {
                      setImagePosition({ x: 0, y: 0 });
                      setZoom(1);
                      setRotation(0);
                      setFilters({
                        brightness: 100,
                        contrast: 100,
                        saturation: 100,
                        blur: 0,
                        sepia: 0,
                        grayscale: 0
                      });
                    }}
                    className="w-full bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors flex items-center justify-center"
                  >
                    <Undo className="w-4 h-4 mr-2" />
                    Resetear Todo
                  </button>
                  
                  {tool === 'crop' && cropArea && (
                    <button
                      onClick={handleCrop}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Aplicar Recorte
                    </button>
                  )}
                </div>

                {/* Controles de zoom */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zoom: {Math.round(zoom * 100)}%
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <button
                      onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Historial */}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={handleUndo}
                    disabled={historyIndex <= 0}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Undo className="w-4 h-4 mr-1" />
                    Deshacer
                  </button>
                  <button
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Redo className="w-4 h-4 mr-1" />
                    Rehacer
                  </button>
                </div>
              </div>
            )}

            {/* Filtros */}
            {currentImage && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Sliders className="w-5 h-5 mr-2" />
                  Filtros
                </h3>

                {/* Presets */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Presets</label>
                  <div className="grid grid-cols-2 gap-1">
                    {filterPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controles individuales */}
                <div className="space-y-4">
                  {Object.entries(filters).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key === 'brightness' ? 'Brillo' :
                         key === 'contrast' ? 'Contraste' :
                         key === 'saturation' ? 'Saturación' :
                         key === 'blur' ? 'Desenfoque' :
                         key === 'sepia' ? 'Sepia' :
                         key === 'grayscale' ? 'Escala de Grises' : key}: {value}{key === 'blur' ? 'px' : '%'}
                      </label>
                      <input
                        type="range"
                        min={key === 'blur' ? 0 : key === 'brightness' || key === 'contrast' ? 0 : 0}
                        max={key === 'blur' ? 10 : key === 'brightness' || key === 'contrast' ? 200 : 100}
                        value={value}
                        onChange={(e) => handleFilterChange(key, parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Descargar */}
            {currentImage && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar Imagen
                </button>
              </div>
            )}
          </div>

          {/* Canvas de edición */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Área de Edición</h3>
              {!currentImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Selecciona una imagen para comenzar a editar</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="max-w-full h-auto cursor-crosshair"
                    style={{ cursor: tool === 'move' ? 'move' : 'crosshair' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Editor de Imágenes Online - Funcionalidades
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Herramientas Básicas</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Rotar imágenes en incrementos de 90°</li>
                <li>• Recortar áreas específicas</li>
                <li>• Zoom para edición detallada</li>
                <li>• Mover y posicionar imagen</li>
                <li>• Historial de deshacer/rehacer</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Filtros y Efectos</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Ajustar brillo y contraste</li>
                <li>• Controlar saturación de colores</li>
                <li>• Aplicar desenfoque gaussiano</li>
                <li>• Efectos sepia y escala de grises</li>
                <li>• Presets predefinidos</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Procesamiento 100% local</li>
                <li>• Sin subida a servidores</li>
                <li>• Descarga en formato PNG</li>
                <li>• Interfaz intuitiva y responsive</li>
                <li>• Gratis y sin marcas de agua</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageEditor;
