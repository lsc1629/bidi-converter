import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO page="terms" />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Términos de Servicio
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6 text-lg">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-700 mb-4">
                Al acceder y utilizar Bidi Converter ("el Servicio"), usted acepta estar sujeto a estos 
                Términos de Servicio ("Términos"). Si no está de acuerdo con alguna parte de estos términos, 
                no debe utilizar nuestro servicio.
              </p>
              <p className="text-gray-700 mb-4">
                Estos términos constituyen un acuerdo legal vinculante entre usted y Bidi Converter. 
                Nos reservamos el derecho de modificar estos términos en cualquier momento, y dichas 
                modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-700 mb-4">
                Bidi Converter es una herramienta web gratuita que permite a los usuarios convertir archivos 
                de imagen entre diferentes formatos (JPG, PNG, WebP, GIF, BMP) y visualizar documentos 
                (PDF, DOCX, XLSX) directamente en el navegador.
              </p>
              <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Características del Servicio:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Conversión de imágenes entre múltiples formatos</li>
                <li>Procesamiento local en el navegador (sin subida a servidores)</li>
                <li>Visualización de documentos PDF, Word y Excel</li>
                <li>Conversión por lotes de múltiples archivos</li>
                <li>Preservación de la calidad de imagen</li>
                <li>Interfaz responsive para dispositivos móviles y desktop</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Uso Aceptable</h2>
              <p className="text-gray-700 mb-4">
                Al utilizar nuestro servicio, usted se compromete a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Utilizar el servicio únicamente para fines legales y legítimos</li>
                <li>No cargar contenido que infrinja derechos de autor o propiedad intelectual</li>
                <li>No utilizar el servicio para procesar contenido ilegal, dañino o malicioso</li>
                <li>No intentar comprometer la seguridad o funcionalidad del servicio</li>
                <li>No utilizar el servicio de manera que pueda dañar, deshabilitar o sobrecargar la infraestructura</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Contenido del Usuario</h2>
              <p className="text-gray-700 mb-4">
                Usted mantiene todos los derechos sobre los archivos que procesa a través de nuestro servicio. 
                Al utilizar Bidi Converter, usted declara y garantiza que:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Posee todos los derechos necesarios sobre los archivos que procesa</li>
                <li>El contenido no infringe derechos de terceros</li>
                <li>El contenido no contiene material ilegal o dañino</li>
                <li>Tiene autorización para procesar cualquier dato personal contenido en los archivos</li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800">
                  <strong>Privacidad Garantizada:</strong> Sus archivos se procesan localmente en su navegador 
                  y nunca se envían a nuestros servidores. Esto garantiza la máxima privacidad y seguridad de sus datos.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitaciones del Servicio</h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">5.1 Limitaciones Técnicas:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Tamaño máximo de archivo: 50MB por archivo</li>
                <li>Máximo 10 archivos por sesión de conversión</li>
                <li>Formatos soportados limitados a los especificados en el sitio web</li>
                <li>Dependencia de las capacidades del navegador del usuario</li>
              </ul>
              <h3 className="text-xl font-medium text-gray-900 mb-3 mt-6">5.2 Disponibilidad del Servicio:</h3>
              <p className="text-gray-700 mb-4">
                Nos esforzamos por mantener el servicio disponible 24/7, pero no garantizamos un tiempo de 
                actividad del 100%. El servicio puede estar temporalmente no disponible debido a mantenimiento, 
                actualizaciones o circunstancias fuera de nuestro control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Propiedad Intelectual</h2>
              <p className="text-gray-700 mb-4">
                El servicio Bidi Converter, incluyendo su código fuente, diseño, funcionalidad y contenido, 
                está protegido por derechos de autor y otras leyes de propiedad intelectual. Usted no puede:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Copiar, modificar o distribuir el código fuente del servicio</li>
                <li>Realizar ingeniería inversa de la funcionalidad</li>
                <li>Crear trabajos derivados basados en nuestro servicio</li>
                <li>Utilizar nuestras marcas comerciales sin autorización expresa</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Exención de Responsabilidad</h2>
              <p className="text-gray-700 mb-4">
                EL SERVICIO SE PROPORCIONA "TAL COMO ESTÁ" Y "SEGÚN DISPONIBILIDAD" SIN GARANTÍAS DE NINGÚN TIPO. 
                NO GARANTIZAMOS QUE EL SERVICIO:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Será ininterrumpido, oportuno, seguro o libre de errores</li>
                <li>Cumplirá con sus requisitos específicos</li>
                <li>Producirá resultados exactos o confiables</li>
                <li>Será compatible con todos los dispositivos o navegadores</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-yellow-800">
                  <strong>Importante:</strong> Recomendamos mantener copias de seguridad de sus archivos originales 
                  antes de realizar cualquier conversión.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitación de Responsabilidad</h2>
              <p className="text-gray-700 mb-4">
                EN NINGÚN CASO SEREMOS RESPONSABLES POR DAÑOS DIRECTOS, INDIRECTOS, INCIDENTALES, ESPECIALES 
                O CONSECUENTES QUE RESULTEN DEL USO O LA INCAPACIDAD DE USAR EL SERVICIO, INCLUYENDO PERO NO 
                LIMITADO A:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Pérdida de datos o archivos</li>
                <li>Pérdida de beneficios o ingresos</li>
                <li>Interrupción del negocio</li>
                <li>Pérdida de información o datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnización</h2>
              <p className="text-gray-700 mb-4">
                Usted acepta indemnizar y eximir de responsabilidad a Bidi Converter, sus afiliados, directores, 
                empleados y agentes de cualquier reclamo, pérdida, responsabilidad, daño o gasto (incluyendo 
                honorarios razonables de abogados) que surja de:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Su uso del servicio</li>
                <li>Su violación de estos términos</li>
                <li>Su violación de derechos de terceros</li>
                <li>Cualquier contenido que procese a través del servicio</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Terminación</h2>
              <p className="text-gray-700 mb-4">
                Podemos suspender o terminar su acceso al servicio en cualquier momento, con o sin causa, 
                con o sin previo aviso. Usted puede dejar de usar el servicio en cualquier momento.
              </p>
              <p className="text-gray-700 mb-4">
                Al terminar el acceso, su derecho a usar el servicio cesará inmediatamente. Las disposiciones 
                de estos términos que por su naturaleza deben sobrevivir a la terminación permanecerán en efecto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Ley Aplicable</h2>
              <p className="text-gray-700 mb-4">
                Estos términos se regirán e interpretarán de acuerdo con las leyes del país donde opera 
                Bidi Converter, sin tener en cuenta los principios de conflicto de leyes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contacto</h2>
              <p className="text-gray-700 mb-4">
                Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos en:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@bidiconverter.com<br />
                  <strong>Dirección:</strong> Disponible bajo solicitud<br />
                  <strong>Teléfono:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Compromiso con la Calidad
              </h3>
              <p className="text-blue-800">
                Nos comprometemos a proporcionar un servicio de alta calidad, seguro y confiable. 
                Su satisfacción y la protección de sus datos son nuestras prioridades principales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
