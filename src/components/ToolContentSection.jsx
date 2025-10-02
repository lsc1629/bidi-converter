import React from 'react';
import { CheckCircle, Lightbulb, HelpCircle, Link as LinkIcon } from 'lucide-react';

const ToolContentSection = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-12 px-4">
      {/* Descripción Principal */}
      {content.description && (
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.description.title}</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {content.description.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Características / Beneficios */}
      {content.features && (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
            {content.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.features.items.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Casos de Uso */}
      {content.useCases && (
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="w-8 h-8 text-yellow-600 mr-3" />
            {content.useCases.title}
          </h2>
          <div className="space-y-4">
            {content.useCases.items.map((useCase, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cómo Usar (Pasos) */}
      {content.howToUse && (
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.howToUse.title}</h2>
          <ol className="space-y-4">
            {content.howToUse.steps.map((step, index) => (
              <li key={index} className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* FAQs */}
      {content.faqs && (
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <HelpCircle className="w-8 h-8 text-purple-600 mr-3" />
            {content.faqs.title}
          </h2>
          <div className="space-y-6">
            {content.faqs.items.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 flex items-start">
                  <span className="text-blue-600 mr-2">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Herramientas Relacionadas */}
      {content.relatedTools && (
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <LinkIcon className="w-8 h-8 text-purple-600 mr-3" />
            {content.relatedTools.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.relatedTools.items.map((tool, index) => (
              <a
                key={index}
                href={tool.link}
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow border-2 border-transparent hover:border-purple-300"
              >
                <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ToolContentSection;
