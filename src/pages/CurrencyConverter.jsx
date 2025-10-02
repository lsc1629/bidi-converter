import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';
import ToolContentSection from '../components/ToolContentSection';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../hooks/useLanguage';
import { toolsContent } from '../i18n/toolsContent';

const CurrencyConverter = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState('');
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      setLoading(true);
      // API gratuita de ExchangeRate-API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setRates(data.rates);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rates:', error);
      setLoading(false);
    }
  };

  const convert = () => {
    if (!amount || !rates[from] || !rates[to]) return;
    const rate = rates[to] / rates[from];
    const converted = parseFloat(amount) * rate;
    setResult(converted.toFixed(2));
  };

  useEffect(() => {
    if (amount && rates[from] && rates[to]) {
      convert();
    }
  }, [amount, from, to, rates]);

  const currencies = Object.keys(rates).sort();

  return (
    <>
      <SEO 
        title={t('tools.currencyConverter.title') + ' - Free 2025'}
        description={t('tools.currencyConverter.description')}
        keywords="currency converter, exchange rate, convert currency, USD to EUR, currency calculator, forex rates"
      />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <DollarSign className="inline w-10 h-10 mb-2" /> {t('tools.currencyConverter.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('tools.currencyConverter.description')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {loading ? (
            <div className="text-center text-gray-500">{t('tools.currencyConverter.loadingRates')}<RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" /></div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.currencyConverter.from')}</label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.currencyConverter.to')}</label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={result}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg font-bold"
                    placeholder="Result"
                  />
                </div>
              </div>

              <button
                onClick={fetchRates}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                {t('tools.currencyConverter.refreshRates')}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Contenido SEO Rico */}
      <ToolContentSection content={toolsContent[language]?.currencyConverter || toolsContent.en.currencyConverter} />
    </>
  );
};

export default CurrencyConverter;
