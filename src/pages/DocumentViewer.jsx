import React, { useState } from 'react';
import { Upload, FileText, Download, AlertCircle, Eye, File } from 'lucide-react';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';

const DocumentViewer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSheet, setActiveSheet] = useState(0);
  const { t } = useTranslation();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      loadDocument(file);
    }
  };

  const loadDocument = async (file) => {
    setIsLoading(true);
    setError(null);
    setFileContent(null);

    try {
      const fileType = file.type;
      
      if (fileType === 'application/pdf') {
        const url = URL.createObjectURL(file);
        setFileContent({ type: 'pdf', url });
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Handle DOCX files
        const arrayBuffer = await file.arrayBuffer();
        
        const styleMap = [
          "p[style-name='Heading 1'] => h1.doc-heading-1",
          "p[style-name='Heading 2'] => h2.doc-heading-2", 
          "p[style-name='Heading 3'] => h3.doc-heading-3",
          "p[style-name='Título 1'] => h1.doc-heading-1",
          "p[style-name='Título 2'] => h2.doc-heading-2",
          "p[style-name='Normal'] => p.doc-normal",
          "p[style-name='Quote'] => blockquote.doc-quote",
          "r[style-name='Strong'] => strong",
          "r[style-name='Emphasis'] => em"
        ];
        
        const options = {
          styleMap: styleMap,
          includeDefaultStyleMap: true,
          convertImage: mammoth.images.imgElement(function(image) {
            return image.read("base64").then(function(imageBuffer) {
              return {
                src: "data:" + image.contentType + ";base64," + imageBuffer
              };
            });
          })
        };
        
        const result = await mammoth.convertToHtml({ arrayBuffer }, options);
        setFileContent({ 
          type: 'word', 
          html: result.value,
          warnings: result.messages
        });
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Handle Excel files
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { 
          type: 'array',
          cellStyles: true,
          cellNF: true
        });
        
        const sheets = {};
        
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
          
          let htmlTable = '<table class="excel-table">';
          htmlTable += '<thead><tr><th class="excel-row-header"></th>';
          
          for (let col = range.s.c; col <= range.e.c; col++) {
            const colName = XLSX.utils.encode_col(col);
            htmlTable += `<th class="excel-col-header">${colName}</th>`;
          }
          htmlTable += '</tr></thead><tbody>';
          
          for (let row = range.s.r; row <= range.e.r; row++) {
            htmlTable += '<tr>';
            htmlTable += `<td class="excel-row-header">${row + 1}</td>`;
            
            for (let col = range.s.c; col <= range.e.c; col++) {
              const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
              const cell = worksheet[cellAddress];
              
              let cellValue = '';
              let cellClass = 'excel-cell';
              
              if (cell) {
                cellValue = cell.w || cell.v || '';
                if (cell.t === 'n') cellClass += ' excel-number';
                if (cell.t === 's') cellClass += ' excel-text';
                if (cell.f) cellClass += ' excel-formula';
              }
              
              htmlTable += `<td class="${cellClass}">${cellValue}</td>`;
            }
            htmlTable += '</tr>';
          }
          
          htmlTable += '</tbody></table>';
          sheets[sheetName] = htmlTable;
        });
        
        setFileContent({ 
          type: 'excel', 
          sheets,
          sheetNames: workbook.SheetNames
        });
      } else {
        throw new Error('Formato de archivo no soportado. Use PDF, DOCX o XLSX.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetViewer = () => {
    setSelectedFile(null);
    setFileContent(null);
    setError(null);
  };

  const downloadFile = () => {
    if (selectedFile) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(selectedFile);
      link.download = selectedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <SEO page="viewer" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Visor de Documentos Online Gratuito
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visualiza documentos PDF, Word (DOCX) y Excel (XLSX) directamente en tu navegador. 
            Seguro, privado y sin necesidad de software adicional.
          </p>
        </div>

        {/* Información de Formatos */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-3">Formatos Soportados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-green-600 mr-2" />
              <span><strong>PDF:</strong> Documentos portátiles</span>
            </div>
            <div className="flex items-center">
              <File className="w-5 h-5 text-blue-600 mr-2" />
              <span><strong>DOCX:</strong> Microsoft Word</span>
            </div>
            <div className="flex items-center">
              <File className="w-5 h-5 text-green-600 mr-2" />
              <span><strong>XLSX:</strong> Microsoft Excel</span>
            </div>
          </div>
          <p className="text-green-700 text-sm mt-2">
            <strong>Límite:</strong> Máximo 50MB por archivo
          </p>
        </div>

        {!selectedFile ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-green-400 transition-colors text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona un Documento
              </h3>
              <p className="text-gray-500 mb-4">
                Arrastra y suelta un archivo aquí o haz clic para seleccionar
              </p>
              <div className="flex justify-center">
                <label className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer inline-flex items-center">
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
            {/* File Info Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • 
                      {selectedFile.type.includes('pdf') ? ' PDF' : 
                       selectedFile.type.includes('word') ? ' Word Document' : 
                       selectedFile.type.includes('sheet') ? ' Excel Spreadsheet' : ' Documento'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadFile}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </button>
                  <button
                    onClick={resetViewer}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Nuevo Archivo
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando documento...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-red-900">Error al cargar el documento</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Document Content */}
            {fileContent && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {fileContent.type === 'pdf' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Vista Previa del PDF
                      </h3>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <iframe
                        src={fileContent.url}
                        className="w-full h-96"
                        title="PDF Viewer"
                      />
                    </div>
                  </div>
                )}

                {fileContent.type === 'word' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Contenido del Documento Word
                      </h3>
                    </div>
                    <div 
                      className="prose max-w-none border rounded-lg p-6 bg-white"
                      dangerouslySetInnerHTML={{ __html: fileContent.html }}
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        lineHeight: '1.6'
                      }}
                    />
                    {fileContent.warnings && fileContent.warnings.length > 0 && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Nota:</strong> Algunos elementos del documento pueden no mostrarse exactamente como en el original.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {fileContent.type === 'excel' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Contenido de la Hoja de Cálculo
                      </h3>
                    </div>
                    
                    {/* Sheet Tabs */}
                    {fileContent.sheetNames.length > 1 && (
                      <div className="flex space-x-2 mb-4 border-b">
                        {fileContent.sheetNames.map((sheetName, index) => (
                          <button
                            key={sheetName}
                            onClick={() => setActiveSheet(index)}
                            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                              activeSheet === index
                                ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {sheetName}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <div className="border rounded-lg overflow-auto max-h-96">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: fileContent.sheets[fileContent.sheetNames[activeSheet]] 
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Visor de Documentos Online - Características y Beneficios
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">¿Por qué usar nuestro visor?</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>Sin instalaciones:</strong> Funciona directamente en tu navegador</li>
                <li>• <strong>Privacidad total:</strong> Los archivos se procesan localmente</li>
                <li>• <strong>Multiplataforma:</strong> Compatible con cualquier dispositivo</li>
                <li>• <strong>Gratuito:</strong> Sin límites ni costos ocultos</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Formatos soportados</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>PDF:</strong> Documentos Adobe Acrobat</li>
                <li>• <strong>DOCX:</strong> Microsoft Word moderno</li>
                <li>• <strong>XLSX:</strong> Hojas de cálculo Excel</li>
                <li>• <strong>Próximamente:</strong> PowerPoint, OpenDocument</li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Características destacadas</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <ul className="text-gray-700 space-y-2">
              <li>✅ <strong>Visualización fiel:</strong> Mantiene el formato original</li>
              <li>✅ <strong>Navegación por hojas:</strong> Para archivos Excel con múltiples pestañas</li>
              <li>✅ <strong>Preservación de estilos:</strong> Títulos, negritas, cursivas y más</li>
              <li>✅ <strong>Soporte de imágenes:</strong> Muestra imágenes incrustadas</li>
              <li>✅ <strong>Descarga directa:</strong> Guarda el archivo original cuando quieras</li>
            </ul>
          </div>
        </div>

        {/* CSS Styles for Excel and Word */}
        <style jsx>{`
          .excel-table {
            border-collapse: collapse;
            width: 100%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;
          }
          
          .excel-table th,
          .excel-table td {
            border: 1px solid #d1d5db;
            padding: 4px 8px;
            text-align: left;
          }
          
          .excel-col-header,
          .excel-row-header {
            background-color: #f3f4f6;
            font-weight: bold;
            text-align: center;
            color: #374151;
          }
          
          .excel-cell {
            background-color: white;
          }
          
          .excel-number {
            text-align: right;
          }
          
          .excel-formula {
            background-color: #fef3c7;
          }
          
          .doc-heading-1 {
            font-size: 2em;
            font-weight: bold;
            margin: 1em 0 0.5em 0;
            color: #1f2937;
          }
          
          .doc-heading-2 {
            font-size: 1.5em;
            font-weight: bold;
            margin: 1em 0 0.5em 0;
            color: #374151;
          }
          
          .doc-heading-3 {
            font-size: 1.2em;
            font-weight: bold;
            margin: 1em 0 0.5em 0;
            color: #4b5563;
          }
          
          .doc-normal {
            margin: 0.5em 0;
            line-height: 1.6;
          }
          
          .doc-quote {
            border-left: 4px solid #3b82f6;
            padding-left: 1em;
            margin: 1em 0;
            font-style: italic;
            color: #4b5563;
          }
        `}</style>
      </div>
    </>
  );
};

export default DocumentViewer;
