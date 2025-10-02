import React, { useState } from 'react';
import { Key, Copy, RefreshCw, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import ToolContentSection from '../components/ToolContentSection';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../hooks/useLanguage';
import { toolsContent } from '../i18n/toolsContent';

const PasswordGenerator = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Select at least one option');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <>
      <SEO 
        title={t('tools.passwordGenerator.title') + ' - Free 2025'}
        description={t('tools.passwordGenerator.description')}
        keywords="password generator, random password, secure password, strong password generator, password creator, random password, strong password, password maker, generate password"
      />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Key className="inline w-10 h-10 mb-2" /> {t('tools.passwordGenerator.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('tools.passwordGenerator.description')}</p>
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <Shield className="inline w-4 h-4 mr-1" />
                {t('tools.passwordGenerator.securityNote')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {password && (
            <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <code className="text-xl font-mono font-bold break-all">{password}</code>
                <button
                  onClick={copyToClipboard}
                  className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-shrink-0"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  {t('tools.passwordGenerator.copied')}
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.passwordGenerator.passwordLength')} {length}
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            {[
              { key: 'uppercase', label: t('tools.passwordGenerator.uppercase') },
              { key: 'lowercase', label: t('tools.passwordGenerator.lowercase') },
              { key: 'numbers', label: t('tools.passwordGenerator.numbers') },
              { key: 'symbols', label: t('tools.passwordGenerator.symbols') }
            ].map(opt => (
              <label key={opt.key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options[opt.key]}
                  onChange={() => setOptions({...options, [opt.key]: !options[opt.key]})}
                  className="w-4 h-4"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {t('tools.passwordGenerator.generate')}
          </button>
        </div>
      </div>

      {/* Contenido SEO Rico */}
      <ToolContentSection content={toolsContent[language]?.passwordGenerator || toolsContent.en.passwordGenerator} />
    </>
  );
};

export default PasswordGenerator;
