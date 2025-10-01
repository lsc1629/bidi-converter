import React, { useState, useRef } from 'react';
import { Code, Download, Copy, Check, FileImage, Palette, Zap, Globe } from 'lucide-react';
import SEO from '../components/SEO';

const DevTools = () => {
  const [activeTab, setActiveTab] = useState('base64');
  const [copiedStates, setCopiedStates] = useState({});
  const [results, setResults] = useState({});
  const fileInputRef = useRef(null);

  // Convertir imagen a Base64
  const handleImageToBase64 = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        const dataUrl = base64;
        const base64Only = base64.split(',')[1];
        
        setResults({
          ...results,
          base64: {
            dataUrl,
            base64Only,
            size: Math.round(base64Only.length * 0.75),
            cssBackground: `background-image: url('${dataUrl}');`,
            htmlImg: `<img src="${dataUrl}" alt="Imagen Base64" />`,
            cssClass: `.my-image {\n  background-image: url('${dataUrl}');\n  background-size: cover;\n  background-position: center;\n}`
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Generar favicons
  const handleFaviconGeneration = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const sizes = [16, 32, 48, 96, 152, 180, 192];
          const favicons = {};
          
          sizes.forEach(size => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(img, 0, 0, size, size);
            favicons[size] = canvas.toDataURL('image/png');
          });

          const htmlCode = `<!-- Favicons -->
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="manifest" href="manifest.json">`;

          setResults({
            ...results,
            favicons: {
              images: favicons,
              htmlCode,
              sizes
            }
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Generar código responsive
  const generateResponsiveCode = () => {
    const responsiveCode = `<!-- Imagen Responsive con WebP -->
<picture>
  <source media="(min-width: 768px)" srcset="imagen-desktop.webp" type="image/webp">
  <source media="(min-width: 768px)" srcset="imagen-desktop.jpg">
  <source srcset="imagen-mobile.webp" type="image/webp">
  <img src="imagen-mobile.jpg" alt="Descripción" loading="lazy" width="800" height="600">
</picture>`;

    const reactCode = `// Componente React Optimizado
const OptimizedImage = ({ src, webpSrc, alt, width, height }) => {
  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </picture>
  );
};`;

    setResults({
      ...results,
      responsive: { htmlCode: responsiveCode, reactCode }
    });
  };

  // Copiar al portapapeles
  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [key]: true });
      setTimeout(() => setCopiedStates({ ...copiedStates, [key]: false }), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const tools = [
    { id: 'base64', title: 'Base64 Encoder', description: 'Convierte imágenes a Base64', icon: Code },
    { id: 'favicons', title: 'Favicon Generator', description: 'Genera favicons para tu web', icon: Globe },
    { id: 'responsive', title: 'Código Responsive', description: 'HTML/React optimizado', icon: Zap }
  ];

  return (
    <>
      <SEO page="devtools" />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Herramientas para Desarrolladores
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas especializadas para desarrolladores web. Genera código optimizado, 
            favicons y más. Todo procesado localmente.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tool.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tool.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de entrada */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {tools.find(t => t.id === activeTab)?.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {tools.find(t => t.id === activeTab)?.description}
              </p>

              {activeTab === 'base64' && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageToBase64}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FileImage className="w-5 h-5 mr-2" />
                    Seleccionar Imagen
                  </button>
                </div>
              )}

              {activeTab === 'favicons' && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFaviconGeneration}
                    className="hidden"
                    id="favicon-input"
                  />
                  <button
                    onClick={() => document.getElementById('favicon-input')?.click()}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Seleccionar Logo
                  </button>
                </div>
              )}

              {activeTab === 'responsive' && (
                <div>
                  <button
                    onClick={generateResponsiveCode}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Generar Código
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Panel de resultados */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados</h3>
              
              {!results[activeTab] ? (
                <div className="text-center py-12 text-gray-500">
                  <Code className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Selecciona archivos para generar el código</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Base64 Results */}
                  {activeTab === 'base64' && results.base64 && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Data URL</h4>
                          <button
                            onClick={() => copyToClipboard(results.base64.dataUrl, 'dataUrl')}
                            className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            {copiedStates.dataUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <textarea
                          value={results.base64.dataUrl}
                          readOnly
                          className="w-full h-20 p-3 border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">CSS Class</h4>
                          <button
                            onClick={() => copyToClipboard(results.base64.cssClass, 'cssClass')}
                            className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            {copiedStates.cssClass ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <textarea
                          value={results.base64.cssClass}
                          readOnly
                          className="w-full h-24 p-3 border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Favicon Results */}
                  {activeTab === 'favicons' && results.favicons && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        {results.favicons.sizes.map(size => (
                          <div key={size} className="text-center">
                            <img 
                              src={results.favicons.images[size]} 
                              alt={`${size}x${size}`}
                              className="w-12 h-12 mx-auto border border-gray-200 rounded"
                            />
                            <span className="text-xs text-gray-500">{size}px</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">HTML Code</h4>
                          <button
                            onClick={() => copyToClipboard(results.favicons.htmlCode, 'faviconHtml')}
                            className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            {copiedStates.faviconHtml ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <textarea
                          value={results.favicons.htmlCode}
                          readOnly
                          className="w-full h-24 p-3 border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Responsive Results */}
                  {activeTab === 'responsive' && results.responsive && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">HTML Responsive</h4>
                          <button
                            onClick={() => copyToClipboard(results.responsive.htmlCode, 'responsiveHTML')}
                            className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            {copiedStates.responsiveHTML ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <textarea
                          value={results.responsive.htmlCode}
                          readOnly
                          className="w-full h-32 p-3 border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">React Component</h4>
                          <button
                            onClick={() => copyToClipboard(results.responsive.reactCode, 'reactCode')}
                            className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            {copiedStates.reactCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <textarea
                          value={results.responsive.reactCode}
                          readOnly
                          className="w-full h-32 p-3 border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <Code className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Base64 Encoder</h3>
            <p className="text-gray-700 text-sm">
              Convierte imágenes a Base64 para embeber en CSS. Ideal para iconos y elementos críticos.
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <Globe className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Favicon Generator</h3>
            <p className="text-gray-700 text-sm">
              Genera todos los tamaños necesarios para diferentes dispositivos y plataformas.
            </p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <Zap className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Código Responsive</h3>
            <p className="text-gray-700 text-sm">
              Plantillas optimizadas para imágenes responsive con WebP y lazy loading.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevTools;
