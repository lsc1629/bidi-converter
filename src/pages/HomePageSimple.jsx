import React from 'react';
import SEO from '../components/SEO';

const HomePageSimple = () => {
  return (
    <>
      <SEO page="home" />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bidi Converter - Página de Inicio
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Esta es la página de inicio simplificada para verificar que funciona.
          </p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">
              ✅ Si puedes ver esto, la página de inicio está funcionando correctamente.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageSimple;
