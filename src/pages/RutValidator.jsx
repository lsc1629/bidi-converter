import React, { useState } from 'react';
import { CheckCircle, XCircle, CreditCard } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const RutValidator = () => {
  const { t } = useTranslation();
  const [rut, setRut] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [message, setMessage] = useState('');

  const validateRUT = (rut) => {
    // Remove dots and hyphens
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    
    if (rut.length < 2) return false;
    
    const body = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    
    if (!/^\d+$/.test(body)) return false;
    
    let sum = 0;
    let multiplier = 2;
    
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const expectedDV = 11 - (sum % 11);
    const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();
    
    return dv === calculatedDV;
  };

  const validate = () => {
    if (!rut) {
      setIsValid(null);
      setMessage('');
      return;
    }

    const valid = validateRUT(rut);
    setIsValid(valid);
    setMessage(valid ? t('tools.rutValidator.validRut') : t('tools.rutValidator.invalidRut'));
  };

  return (
    <>
      <SEO 
        title={t('tools.rutValidator.title') + ' - Free 2025'}
        description={t('tools.rutValidator.description')}
        keywords="rut validator, validate rut, dni validator, chilean rut, rut checker, validate dni"
      />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <CreditCard className="inline w-10 h-10 mb-2" /> {t('tools.rutValidator.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('tools.rutValidator.description')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter RUT or DNI
            </label>
            <input
              type="text"
              value={rut}
              onChange={(e) => {
                setRut(e.target.value);
                setIsValid(null);
              }}
              placeholder={t('tools.rutValidator.enterRutDni')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
            />
          </div>

          <button
            onClick={validate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {t('tools.rutValidator.validate')}
          </button>

          {isValid !== null && (
            <div className={`border-2 rounded-lg p-6 text-center ${isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              {isValid ? (
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
              ) : (
                <XCircle className="w-16 h-16 text-red-600 mx-auto mb-2" />
              )}
              <div className="text-2xl font-bold">{message}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RutValidator;
