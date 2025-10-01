import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          ¡Funciona! 🎉
        </h1>
        <p className="text-gray-700 text-lg">
          El sitio está funcionando correctamente.
        </p>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Botón de prueba
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
