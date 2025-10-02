import React, { useState } from 'react';
import { Type, Copy } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const TextConverter = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const convert = (type) => {
    switch(type) {
      case 'uppercase':
        setResult(text.toUpperCase());
        break;
      case 'lowercase':
        setResult(text.toLowerCase());
        break;
      case 'capitalize':
        setResult(text.replace(/\b\w/g, l => l.toUpperCase()));
        break;
      case 'reverse':
        setResult(text.split('').reverse().join(''));
        break;
      case 'remove-spaces':
        setResult(text.replace(/\s+/g, ''));
        break;
      case 'count':
        setResult(`Characters: ${text.length}, Words: ${text.trim().split(/\s+/).length}, Lines: ${text.split('\n').length}`);
        break;
    }
  };

  return (
    <>
      <SEO 
        title={t('tools.textConverter.title') + ' - Free 2025'}
        description={t('tools.textConverter.description')}
        keywords="text converter, uppercase converter, lowercase converter, text case, capitalize text, text transformer"
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Type className="inline w-10 h-10 mb-2" /> {t('tools.textConverter.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('tools.textConverter.description')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.textConverter.inputText')}</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('tools.textConverter.enterText')}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { type: 'uppercase', label: t('tools.textConverter.uppercase') },
              { type: 'lowercase', label: t('tools.textConverter.lowercase') },
              { type: 'capitalize', label: t('tools.textConverter.capitalize') },
              { type: 'reverse', label: t('tools.textConverter.reverse') },
              { type: 'remove-spaces', label: t('tools.textConverter.removeSpaces') },
              { type: 'count', label: t('tools.textConverter.count') }
            ].map(btn => (
              <button
                key={btn.type}
                onClick={() => convert(btn.type)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {result && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.textConverter.result')}</label>
                <button
                  onClick={() => {navigator.clipboard.writeText(result); alert(`${t('tools.textConverter.copied')}!`)}}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center"
                >
                  <Copy className="w-4 h-4 mr-1" /> {t('tools.textConverter.copy')}
                </button>
              </div>
              <textarea
                value={result}
                readOnly
                className="w-full h-40 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TextConverter;
