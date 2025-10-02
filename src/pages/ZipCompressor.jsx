import React, { useState } from 'react';
import { FileArchive, Download } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const ZipCompressor = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [zipName, setZipName] = useState('archive');

  const handleFileSelect = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const createZip = async () => {
    if (files.length === 0) return;

    const zip = new JSZip();
    
    files.forEach(file => {
      zip.file(file.name, file);
    });

    const content = await zip.generateAsync({type: 'blob'});
    saveAs(content, `${zipName}.zip`);
  };

  return (
    <>
      <SEO 
        title={t('tools.zipCompressor.title') + ' - Free 2025'}
        description={t('tools.zipCompressor.description')}
        keywords="zip compressor, create zip, zip files, compress files, archive files, zip creator"
      />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <FileArchive className="inline w-10 h-10 mb-2" /> {t('tools.zipCompressor.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('tools.zipCompressor.description')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.zipCompressor.selectFiles')}
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {files.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t('tools.zipCompressor.selectedFiles')} ({files.length}):</h3>
              <ul className="text-sm space-y-1">
                {files.map((file, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{file.name}</span>
                    <span className="text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.zipCompressor.zipFileName')}
            </label>
            <input
              type="text"
              value={zipName}
              onChange={(e) => setZipName(e.target.value)}
              placeholder={t('tools.zipCompressor.archivePlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            onClick={createZip}
            disabled={files.length === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            {t('tools.zipCompressor.createDownload')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ZipCompressor;
