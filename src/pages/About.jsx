import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';
import { Shield, Zap, Users, Award, Globe, Heart, Target, Lightbulb } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();


  const values = [
    {
      icon: Shield,
      title: "Privacidad Primero",
      description: "Procesamos todos los archivos localmente en tu navegador, garantizando que tus datos nunca salgan de tu dispositivo."
    },
    {
      icon: Zap,
      title: "Velocidad y Eficiencia",
      description: "Utilizamos tecnologías modernas para ofrecer conversiones rápidas sin comprometer la calidad."
    },
    {
      icon: Users,
      title: "Accesibilidad Universal",
      description: "Nuestro servicio es gratuito y accesible para todos, sin necesidad de registro o instalación."
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Mantenemos la máxima calidad en todas las conversiones, preservando los detalles importantes."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Fundación",
      description: "Inicio del proyecto con la visión de crear una herramienta de conversión simple y segura."
    },
    {
      year: "2023",
      title: "Lanzamiento Beta",
      description: "Primera versión pública con soporte para formatos básicos de imagen."
    },
    {
      year: "2024",
      title: "Expansión de Formatos",
      description: "Agregamos soporte para documentos y nuevos formatos de imagen como WebP."
    },
    {
      year: "2024",
      title: "1M+ Conversiones",
      description: "Alcanzamos más de un millón de conversiones exitosas realizadas por usuarios."
    }
  ];

  return (
    <>
      <SEO page="about" />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Acerca de Bidi Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Somos un equipo apasionado por la tecnología que cree en hacer que la conversión 
            de archivos sea simple, segura y accesible para todos. Desde 2022, hemos ayudado 
            a millones de usuarios a convertir sus archivos de manera eficiente y privada.
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-blue-50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Nuestra Misión</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Democratizar el acceso a herramientas de conversión de archivos de alta calidad, 
              proporcionando una solución gratuita, segura y fácil de usar que respete la 
              privacidad de los usuarios y no requiera conocimientos técnicos avanzados.
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Nuestra Visión</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Ser la plataforma líder mundial en conversión de archivos, reconocida por su 
              compromiso con la privacidad, la calidad y la innovación tecnológica, 
              estableciendo nuevos estándares en la industria.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos y cada línea de código que escribimos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Historia y Cronología */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un recorrido por los hitos más importantes en el desarrollo de Bidi Converter.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Casos de Uso y Aplicaciones */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Casos de Uso Profesionales</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre cómo diferentes profesionales utilizan Bidi Converter para optimizar su flujo de trabajo diario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Desarrolladores Web</h3>
              <p className="text-gray-600 text-sm mb-3">
                Optimizan imágenes para sitios web convirtiendo a WebP para mejor rendimiento y SEO.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Conversión masiva PNG → WebP</li>
                <li>• Optimización para Core Web Vitals</li>
                <li>• Reducción de tiempo de carga</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Diseñadores Gráficos</h3>
              <p className="text-gray-600 text-sm mb-3">
                Convierten entre formatos para diferentes plataformas y requisitos de cliente.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• JPG para impresión</li>
                <li>• PNG para transparencias</li>
                <li>• Múltiples formatos por proyecto</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Empresas y Corporativos</h3>
              <p className="text-gray-600 text-sm mb-3">
                Procesan documentos confidenciales sin riesgo de filtración de datos.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Visualización segura de PDFs</li>
                <li>• Sin subida a servidores</li>
                <li>• Cumplimiento de privacidad</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">E-commerce</h3>
              <p className="text-gray-600 text-sm mb-3">
                Optimizan imágenes de productos para catálogos online y marketplaces.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Imágenes de productos optimizadas</li>
                <li>• Múltiples tamaños y formatos</li>
                <li>• Mejor experiencia de compra</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bloggers y Creadores</h3>
              <p className="text-gray-600 text-sm mb-3">
                Optimizan contenido visual para redes sociales y plataformas de contenido.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Formatos específicos por plataforma</li>
                <li>• Reducción de tamaño de archivo</li>
                <li>• Mejor engagement</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Estudiantes y Académicos</h3>
              <p className="text-gray-600 text-sm mb-3">
                Visualizan documentos académicos y convierten imágenes para proyectos.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Lectura de PDFs académicos</li>
                <li>• Conversión para presentaciones</li>
                <li>• Herramienta gratuita confiable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparación con Competidores */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por Qué Elegir Bidi Converter?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comparación transparente con otras herramientas del mercado.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Característica</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Bidi Converter</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">Otros Convertidores</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Procesamiento Local</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Sí
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ✗ No
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Sin Marcas de Agua</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Gratis
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        $ Premium
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Límite de Archivos</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-900">10 simultáneos</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-500">1-3 archivos</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Velocidad de Conversión</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-green-600 font-medium">Instantánea</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-500">Depende del servidor</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Registro Requerido</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ No
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ✗ Sí
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Impacto</h2>
            <p className="text-gray-600">
              Números que reflejan la confianza que nuestros usuarios depositan en nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
              <p className="text-gray-700 font-medium">Conversiones Realizadas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500K+</div>
              <p className="text-gray-700 font-medium">Usuarios Únicos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
              <p className="text-gray-700 font-medium">Formatos Soportados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
              <p className="text-gray-700 font-medium">Tiempo de Actividad</p>
            </div>
          </div>
        </div>

        {/* Tecnología */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tecnología y Seguridad</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Utilizamos las tecnologías más avanzadas para garantizar la mejor experiencia y máxima seguridad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Procesamiento Local</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Todos los archivos se procesan directamente en tu navegador utilizando tecnologías 
                web modernas como Canvas API y Web Workers. Esto garantiza que tus archivos nunca 
                salgan de tu dispositivo.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sin subida a servidores externos</li>
                <li>• Procesamiento en tiempo real</li>
                <li>• Máxima privacidad garantizada</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Tecnología Moderna</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Construido con React, Vite y las últimas tecnologías web para ofrecer una 
                experiencia rápida, fluida y confiable en todos los dispositivos y navegadores modernos.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Interfaz responsive y accesible</li>
                <li>• Optimizado para rendimiento</li>
                <li>• Compatible con todos los navegadores</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compromiso */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Nuestro Compromiso Contigo
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Nos comprometemos a mantener Bidi Converter como una herramienta gratuita, segura y confiable. 
            Continuaremos innovando y mejorando nuestro servicio basándonos en tus comentarios y necesidades. 
            Tu privacidad y satisfacción son nuestras prioridades principales, y trabajamos incansablemente 
            para superar tus expectativas en cada conversión.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
