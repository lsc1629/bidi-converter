import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO page="privacy" />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Política de Privacidad
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6 text-lg">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información que Recopilamos</h2>
              <p className="text-gray-700 mb-4">
                En Bidi Converter, respetamos su privacidad y nos comprometemos a proteger sus datos personales. 
                Esta política explica cómo recopilamos, utilizamos y protegemos su información cuando utiliza nuestro servicio.
              </p>
              <h3 className="text-xl font-medium text-gray-900 mb-3">1.1 Información de Archivos</h3>
              <p className="text-gray-700 mb-4">
                Los archivos que sube para conversión se procesan localmente en su navegador. No almacenamos, 
                transmitimos ni accedemos a sus archivos en nuestros servidores. Todo el procesamiento ocurre 
                en su dispositivo para garantizar la máxima privacidad.
              </p>
              <h3 className="text-xl font-medium text-gray-900 mb-3">1.2 Datos de Uso</h3>
              <p className="text-gray-700 mb-4">
                Podemos recopilar información anónima sobre el uso del sitio web, como páginas visitadas, 
                tiempo de permanencia y patrones de navegación, únicamente con fines de mejora del servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cómo Utilizamos su Información</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Proporcionar y mantener nuestro servicio de conversión de archivos</li>
                <li>Mejorar la funcionalidad y experiencia del usuario</li>
                <li>Analizar el uso del sitio web para optimizar el rendimiento</li>
                <li>Cumplir con obligaciones legales aplicables</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies y Tecnologías Similares</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos cookies esenciales para el funcionamiento del sitio web y cookies de análisis 
                para comprender cómo los usuarios interactúan con nuestro servicio. Puede gestionar sus 
                preferencias de cookies en la configuración de su navegador.
              </p>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Tipos de Cookies:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio</li>
                <li><strong>Cookies de Análisis:</strong> Nos ayudan a entender cómo se utiliza el sitio</li>
                <li><strong>Cookies de Preferencias:</strong> Recuerdan sus configuraciones de idioma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Compartir Información</h2>
              <p className="text-gray-700 mb-4">
                No vendemos, comercializamos ni transferimos su información personal a terceros, excepto en los siguientes casos:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Cuando sea requerido por ley o proceso legal</li>
                <li>Para proteger nuestros derechos, propiedad o seguridad</li>
                <li>Con proveedores de servicios que nos ayudan a operar el sitio web (bajo estrictos acuerdos de confidencialidad)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Seguridad de Datos</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información 
                contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de 
                transmisión por Internet es 100% seguro.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Sus Derechos</h2>
              <p className="text-gray-700 mb-4">Usted tiene derecho a:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Acceder a la información personal que tenemos sobre usted</li>
                <li>Rectificar información inexacta o incompleta</li>
                <li>Solicitar la eliminación de su información personal</li>
                <li>Oponerse al procesamiento de sus datos</li>
                <li>Portabilidad de datos cuando sea aplicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Retención de Datos</h2>
              <p className="text-gray-700 mb-4">
                Como no almacenamos sus archivos, estos se eliminan automáticamente de su navegador cuando 
                cierra la sesión o actualiza la página. Los datos de uso anónimos se conservan por un período 
                máximo de 24 meses para fines de análisis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Menores de Edad</h2>
              <p className="text-gray-700 mb-4">
                Nuestro servicio no está dirigido a menores de 13 años. No recopilamos conscientemente 
                información personal de menores de 13 años. Si descubrimos que hemos recopilado información 
                de un menor, la eliminaremos inmediatamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cambios en esta Política</h2>
              <p className="text-gray-700 mb-4">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre 
                cambios significativos publicando la nueva política en esta página y actualizando la 
                fecha de "última actualización".
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contacto</h2>
              <p className="text-gray-700 mb-4">
                Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos en:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@bidiconverter.com<br />
                  <strong>Dirección:</strong> Disponible bajo solicitud<br />
                  <strong>Teléfono:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Compromiso con la Privacidad
              </h3>
              <p className="text-blue-800">
                En Bidi Converter, su privacidad es nuestra prioridad. Procesamos sus archivos localmente 
                en su navegador, garantizando que sus documentos e imágenes nunca salgan de su dispositivo. 
                Esta arquitectura de "privacidad por diseño" asegura el máximo nivel de protección de datos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
