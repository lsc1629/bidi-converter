import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import ToolContentSection from '../components/ToolContentSection';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../hooks/useLanguage';
import { toolsContent } from '../i18n/toolsContent';

const UnitConverter = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('kilometers');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const units = {
    length: {
      meters: 1,
      kilometers: 0.001,
      feet: 3.28084,
      miles: 0.000621371,
      inches: 39.3701,
      centimeters: 100,
      millimeters: 1000,
    },
    weight: {
      kilograms: 1,
      grams: 1000,
      pounds: 2.20462,
      ounces: 35.274,
      tons: 0.001,
    },
    temperature: {
      celsius: 'base',
      fahrenheit: (c) => (c * 9/5) + 32,
      kelvin: (c) => c + 273.15,
    },
    volume: {
      liters: 1,
      milliliters: 1000,
      gallons: 0.264172,
      cups: 4.22675,
      tablespoons: 67.628,
    }
  };

  const convertUnit = () => {
    if (!value || isNaN(value)) {
      setResult('');
      return;
    }

    const val = parseFloat(value);
    
    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5/9;
      if (fromUnit === 'kelvin') celsius = val - 273.15;
      
      let converted = celsius;
      if (toUnit === 'fahrenheit') converted = (celsius * 9/5) + 32;
      if (toUnit === 'kelvin') converted = celsius + 273.15;
      
      setResult(converted.toFixed(2));
    } else {
      const baseValue = val / units[category][fromUnit];
      const converted = baseValue * units[category][toUnit];
      setResult(converted.toFixed(4));
    }
  };

  useEffect(() => {
    if (value) {
      convertUnit();
    }
  }, [fromUnit, toUnit]);

  return (
    <>
      <SEO 
        title={t('tools.unitConverter.title') + ' - Free Online Tool 2025'}
        description={t('tools.unitConverter.description')}
        keywords="unit converter, convert units, length converter, weight converter, temperature converter, meters to feet, kg to pounds, celsius to fahrenheit"
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📐 {t('tools.unitConverter.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('tools.unitConverter.description')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.unitConverter.category')}
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setFromUnit(Object.keys(units[e.target.value])[0]);
                setToUnit(Object.keys(units[e.target.value])[1]);
                setResult('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="length">{t('tools.unitConverter.length')}</option>
              <option value="weight">{t('tools.unitConverter.weight')}</option>
              <option value="temperature">{t('tools.unitConverter.temperature')}</option>
              <option value="volume">{t('tools.unitConverter.volume')}</option>
            </select>
          </div>

          {/* Conversion */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.unitConverter.from')}</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                {Object.keys(units[category]).map(unit => (
                  <option key={unit} value={unit}>{t(`tools.unitConverter.${unit}`)}</option>
                ))}
              </select>
              <input
                type="number"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (e.target.value) setTimeout(convertUnit, 100);
                }}
                placeholder={t('tools.unitConverter.enterValue')}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-8 h-8 text-blue-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.unitConverter.to')}</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                {Object.keys(units[category]).map(unit => (
                  <option key={unit} value={unit}>{t(`tools.unitConverter.${unit}`)}</option>
                ))}
              </select>
              <input
                type="text"
                value={result}
                readOnly
                placeholder={t('tools.unitConverter.result')}
                className="w-full mt-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg font-bold"
              />
            </div>
          </div>

          <button
            onClick={convertUnit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('tools.unitConverter.convert')}
          </button>
        </div>
      </div>

      {/* Contenido SEO Rico */}
      <ToolContentSection content={toolsContent[language]?.unitConverter || toolsContent.en.unitConverter} />
    </>
  );
};

export default UnitConverter;
