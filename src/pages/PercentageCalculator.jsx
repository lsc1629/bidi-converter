import React, { useState } from 'react';
import { Percent } from 'lucide-react';
import SEO from '../components/SEO';
import ToolContentSection from '../components/ToolContentSection';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../hooks/useLanguage';
import { toolsContent } from '../i18n/toolsContent';

const PercentageCalculator = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [calcType, setCalcType] = useState('percent-of');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    
    if (isNaN(v1) || isNaN(v2)) return;

    let res = 0;
    switch(calcType) {
      case 'percent-of':
        res = (v1 / 100) * v2;
        break;
      case 'is-what-percent':
        res = (v1 / v2) * 100;
        break;
      case 'percent-change':
        res = ((v2 - v1) / v1) * 100;
        break;
      default:
        res = 0;
    }
    
    setResult(res.toFixed(2));
  };

  return (
    <>
      <SEO 
        title={t('tools.percentageCalculator.title') + ' - Free Online 2025'}
        description={t('tools.percentageCalculator.description')}
        keywords="percentage calculator, calculate percentage, percent of, percentage increase, percentage decrease, percentage change"
      />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Percent className="inline w-10 h-10 mb-2" /> {t('tools.percentageCalculator.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('tools.percentageCalculator.description')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.percentageCalculator.calculationType')}
            </label>
            <select
              value={calcType}
              onChange={(e) => {
                setCalcType(e.target.value);
                setResult('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="percent-of">{t('tools.percentageCalculator.whatIsXPercentOfY')}</option>
              <option value="is-what-percent">{t('tools.percentageCalculator.xIsWhatPercentOfY')}</option>
              <option value="percent-change">{t('tools.percentageCalculator.percentageChange')}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {calcType === 'percent-of' ? t('tools.percentageCalculator.percent') : t('tools.percentageCalculator.value1')}
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={t('tools.percentageCalculator.enterNumber')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {calcType === 'percent-of' ? t('tools.percentageCalculator.ofValue') : t('tools.percentageCalculator.value2')}
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={t('tools.percentageCalculator.enterNumber')}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {t('tools.percentageCalculator.calculate')}
          </button>

          {result && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">{t('tools.percentageCalculator.result')}</div>
              <div className="text-4xl font-bold text-green-600">{result}</div>
            </div>
          )}
        </div>
      </div>

      {/* Contenido SEO Rico */}
      <ToolContentSection content={toolsContent[language]?.percentageCalculator || toolsContent.en.percentageCalculator} />
    </>
  );
};

export default PercentageCalculator;
