import React, { useState } from 'react';
import { Link as LinkIcon, Copy } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const UrlShortener = () => {
  const { t } = useTranslation();
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!longUrl) return;
    
    setLoading(true);
    try {
      // Usando TinyURL API gratuita
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      const result = await response.text();
      setShortUrl(result);
    } catch (error) {
      alert(t('tools.urlShortener.error'));
    }
    setLoading(false);
  };

  return (
    <>
      <SEO 
        title={t('tools.urlShortener.title') + ' - Free 2025'}
        description={t('tools.urlShortener.description')}
        keywords="url shortener, link shortener, short url, shorten link, tiny url, short link generator"
      />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <LinkIcon className="inline w-10 h-10 mb-2" /> {t('tools.urlShortener.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('tools.urlShortener.description')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.urlShortener.longUrl')}
            </label>
            <input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder={t('tools.urlShortener.enterUrl')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            onClick={shortenUrl}
            disabled={loading || !longUrl}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400"
          >
            {loading ? t('tools.urlShortener.shortening') : t('tools.urlShortener.shortenButton')}
          </button>

          {shortUrl && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tools.urlShortener.shortenedUrl')}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono"
                />
                <button
                  onClick={() => {navigator.clipboard.writeText(shortUrl); alert('✅ Copied!')}}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline mt-2 block"
              >
                Test link →
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UrlShortener;
