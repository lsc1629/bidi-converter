import React, { useState } from 'react';
import { QrCode, Download } from 'lucide-react';
import SEO from '../components/SEO';
import ToolContentSection from '../components/ToolContentSection';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../hooks/useLanguage';
import { toolsContent } from '../i18n/toolsContent';

const QrGenerator = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [size, setSize] = useState(200);

  const generateQR = () => {
    if (!text) return;
    // Usando API gratuita de QR Code Generator
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    setQrUrl(url);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <>
      <SEO 
        title={t('tools.qrGenerator.title') + ' - Free 2025'}
        description={t('tools.qrGenerator.description')}
        keywords="qr code generator, create qr code, qr generator, make qr code, qr code maker, generate qr"
      />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <QrCode className="inline w-10 h-10 mb-2" /> {t('tools.qrGenerator.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('tools.qrGenerator.description')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.qrGenerator.textOrUrl')}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('tools.qrGenerator.enterData')}
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.qrGenerator.size')} {size}x{size} px
            </label>
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full"
            />
          </div>

          <button
            onClick={generateQR}
            disabled={!text}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400"
          >
            {t('tools.qrGenerator.generate')}
          </button>

          {qrUrl && (
            <div className="bg-gray-50 rounded-lg p-6 text-center space-y-4">
              <button
                onClick={downloadQR}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center mx-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('tools.qrGenerator.download')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido SEO Rico */}
      <ToolContentSection content={toolsContent[language]?.qrGenerator || toolsContent.en.qrGenerator} />
    </>
  );
};

export default QrGenerator;
