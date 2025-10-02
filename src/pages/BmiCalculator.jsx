import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import SEO from '../components/SEO';
import ToolContentSection from '../components/ToolContentSection';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../hooks/useLanguage';
import { toolsContent } from '../i18n/toolsContent';

const BmiCalculator = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m
    
    if (!w || !h) return;
    
    const calculatedBmi = w / (h * h);
    setBmi(calculatedBmi.toFixed(1));
    
    if (calculatedBmi < 18.5) setCategory(t('tools.bmiCalculator.underweight'));
    else if (calculatedBmi < 25) setCategory(t('tools.bmiCalculator.normal'));
    else if (calculatedBmi < 30) setCategory(t('tools.bmiCalculator.overweight'));
    else setCategory(t('tools.bmiCalculator.obesity'));
  };

  const getCategoryColor = () => {
    if (category === t('tools.bmiCalculator.normal')) return 'green';
    if (category === t('tools.bmiCalculator.underweight') || category === t('tools.bmiCalculator.overweight')) return 'yellow';
    return 'red';
  };

  return (
    <>
      <SEO 
        title={t('tools.bmiCalculator.title') + ' - Free 2025'}
        description={t('tools.bmiCalculator.description')}
        keywords="bmi calculator, body mass index, calculate bmi, bmi chart, weight calculator, health calculator"
      />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Activity className="inline w-10 h-10 mb-2" /> {t('tools.bmiCalculator.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('tools.bmiCalculator.description')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.bmiCalculator.weight')}</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.bmiCalculator.height')}</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {t('tools.bmiCalculator.calculate')}
          </button>

          {bmi && (
            <div className={`bg-${getCategoryColor()}-50 border-2 border-${getCategoryColor()}-200 rounded-lg p-6 text-center`}>
              <div className="text-sm text-gray-600 mb-2">Your BMI:</div>
              <div className="text-5xl font-bold mb-2">{bmi}</div>
              <div className={`text-xl font-semibold text-${getCategoryColor()}-600`}>{category}</div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <h3 className="font-semibold mb-2">BMI Categories:</h3>
            <ul className="space-y-1">
              <li>• Underweight: &lt; 18.5</li>
              <li>• Normal weight: 18.5 - 24.9</li>
              <li>• Overweight: 25 - 29.9</li>
              <li>• Obesity: ≥ 30</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contenido SEO Rico */}
      <ToolContentSection content={toolsContent[language]?.bmiCalculator || toolsContent.en.bmiCalculator} />
    </>
  );
};

export default BmiCalculator;
