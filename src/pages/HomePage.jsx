import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { routes } from '../utils/routes';
import { 
  FileImage, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Code,
  Zap,
  Shield,
  Users,
  Star,
  TrendingUp,
  Clock,
  Download,
  Smartphone,
  Globe,
  Award,
  Heart,
  Ruler,
  Percent,
  DollarSign,
  Key,
  CreditCard,
  Activity,
  Type,
  Link as LinkIcon,
  FileArchive,
  QrCode
} from 'lucide-react';
import SEO from '../components/SEO';

const HomePage = () => {
  const { language } = useLanguage();
  const r = routes[language] || routes.en;
  
  return (
    <>
      <SEO page="home" />
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center py-12 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Convertidor de Imágenes
              <span className="text-blue-600 block animate-fade-in-up animation-delay-200">Gratuito y Seguro</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Convierte tus imágenes entre JPG, PNG, WebP, GIF y más formatos de forma completamente gratuita. 
              Procesamiento local en tu navegador garantiza máxima privacidad y seguridad de tus archivos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center mb-8 animate-fade-in-up animation-delay-600">
              <Link
                to={r.converter}
                className="bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center transform group"
              >
                <FileImage className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Convertir
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to={r.editor}
                className="bg-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-purple-700 hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center transform group"
              >
                <Code className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Editor
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to={r.devTools}
                className="bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center transform group"
              >
                <Code className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Dev Tools
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to={r.viewer}
                className="border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center transform group"
              >
                <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Visor
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            {/* Nuevas Herramientas */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🛠️ Herramientas Gratuitas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                <Link to={r.unitConverter} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <Ruler className="w-6 h-6 text-blue-600 mb-1" />
                  <span className="text-sm font-medium">Unidades</span>
                </Link>
                <Link to={r.percentageCalculator} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <Percent className="w-6 h-6 text-green-600 mb-1" />
                  <span className="text-sm font-medium">Porcentajes</span>
                </Link>
                <Link to={r.currencyConverter} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <DollarSign className="w-6 h-6 text-yellow-600 mb-1" />
                  <span className="text-sm font-medium">Divisas</span>
                </Link>
                <Link to={r.passwordGenerator} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <Key className="w-6 h-6 text-purple-600 mb-1" />
                  <span className="text-sm font-medium">Contraseñas</span>
                </Link>
                <Link to={r.rutValidator} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <CreditCard className="w-6 h-6 text-indigo-600 mb-1" />
                  <span className="text-sm font-medium">RUT/DNI</span>
                </Link>
                <Link to={r.bmiCalculator} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <Activity className="w-6 h-6 text-red-600 mb-1" />
                  <span className="text-sm font-medium">IMC</span>
                </Link>
                <Link to={r.textConverter} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <Type className="w-6 h-6 text-gray-600 mb-1" />
                  <span className="text-sm font-medium">Texto</span>
                </Link>
                <Link to={r.urlShortener} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <LinkIcon className="w-6 h-6 text-blue-600 mb-1" />
                  <span className="text-sm font-medium">Acortar URL</span>
                </Link>
                <Link to={r.zipCompressor} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <FileArchive className="w-6 h-6 text-orange-600 mb-1" />
                  <span className="text-sm font-medium">ZIP</span>
                </Link>
                <Link to={r.qrGenerator} className="bg-white border-2 border-gray-200 px-4 py-3 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                  <QrCode className="w-6 h-6 text-black mb-1" />
                  <span className="text-sm font-medium">Código QR</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 animate-fade-in-up animation-delay-800">
              <div className="flex items-center hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 animate-pulse" />
                100% Gratuito
              </div>
              <div className="flex items-center hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 animate-pulse animation-delay-100" />
                Sin Registro
              </div>
              <div className="flex items-center hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1 animate-pulse animation-delay-200" />
                Procesamiento Local
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              ¿Por Qué Elegir Bidi Converter?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              La mejor herramienta gratuita para convertir imágenes y visualizar documentos online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:rotate-12 transition-all duration-300">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Conversión Instantánea</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Convierte imágenes en segundos sin esperas ni límites de uso
              </p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-400">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 group-hover:rotate-12 transition-all duration-300">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Procesamiento Seguro</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Tus archivos se procesan localmente, nunca salen de tu dispositivo
              </p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-500">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 group-hover:rotate-12 transition-all duration-300">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">Sin Marcas de Agua</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Resultados profesionales sin marcas de agua molestas
              </p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-600">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 group-hover:rotate-12 transition-all duration-300">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">Múltiples Formatos</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Soporte completo para JPG, PNG, WebP, GIF y más
              </p>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in-up animation-delay-200">Confiado por Miles de Usuarios</h2>
            <p className="text-gray-600 animate-fade-in-up animation-delay-300">Números que demuestran nuestra calidad y confiabilidad</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-110 transition-all duration-500 animate-fade-in-up animation-delay-400">
              <div className="text-3xl font-bold text-blue-600 mb-1 group-hover:animate-pulse">2.5M+</div>
              <div className="text-gray-600 text-sm group-hover:text-blue-700 transition-colors duration-300">Conversiones Realizadas</div>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-500 animate-fade-in-up animation-delay-500">
              <div className="text-3xl font-bold text-green-600 mb-1 group-hover:animate-pulse">850K+</div>
              <div className="text-gray-600 text-sm group-hover:text-green-700 transition-colors duration-300">Usuarios Satisfechos</div>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-500 animate-fade-in-up animation-delay-600">
              <div className="text-3xl font-bold text-purple-600 mb-1 group-hover:animate-pulse">25+</div>
              <div className="text-gray-600 text-sm group-hover:text-purple-700 transition-colors duration-300">Formatos Soportados</div>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-500 animate-fade-in-up animation-delay-700">
              <div className="text-3xl font-bold text-orange-600 mb-1 group-hover:animate-pulse">99.9%</div>
              <div className="text-gray-600 text-sm group-hover:text-orange-700 transition-colors duration-300">Tiempo de Actividad</div>
            </div>
          </div>
        </section>

        {/* Conversiones Populares */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">Conversiones Más Populares</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Las conversiones de imagen más utilizadas por nuestros usuarios profesionales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animation-delay-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">PNG → WebP</span>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Popular</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Reduce el tamaño de archivo hasta un 30% manteniendo la calidad visual perfecta
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold text-sm group-hover:animate-pulse">Ahorro: 30%</span>
                <Link to="/converter" className="text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Convertir →
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animation-delay-400 group">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium group-hover:bg-purple-200 transition-colors duration-300">JPG → PNG</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs group-hover:animate-bounce">Popular</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Convierte a PNG para mantener transparencias y mayor calidad sin compresión
              </p>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-semibold text-sm group-hover:animate-pulse">Sin pérdida</span>
                <Link to="/converter" className="text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Convertir →
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animation-delay-500 group">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium group-hover:bg-green-200 transition-colors duration-300">GIF → WebP</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Animaciones más ligeras con mejor compresión y calidad superior
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold text-sm group-hover:animate-pulse">Ahorro: 50%</span>
                <Link to="/converter" className="text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Convertir →
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animation-delay-600 group">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium group-hover:bg-orange-200 transition-colors duration-300">WebP → JPG</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs group-hover:animate-bounce">Popular</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Compatibilidad universal para todos los navegadores y plataformas
              </p>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-semibold text-sm group-hover:animate-pulse">Compatible</span>
                <Link to="/converter" className="text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Convertir →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficios Detallados */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Beneficios del Convertidor Online Gratuito
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre por qué millones de usuarios confían en nuestra plataforma para sus necesidades de conversión
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Procesamiento 100% Local</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tus archivos nunca salen de tu dispositivo. Todo el procesamiento se realiza localmente en tu navegador, 
                  garantizando máxima privacidad y seguridad. Ideal para documentos confidenciales y datos sensibles.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Velocidad Ultrarrápida</h3>
                <p className="text-gray-600 leading-relaxed">
                  Conversiones instantáneas sin tiempos de espera. Procesa hasta 10 imágenes simultáneamente con 
                  algoritmos optimizados que mantienen la calidad mientras reducen significativamente los tiempos de procesamiento.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Calidad Profesional</h3>
                <p className="text-gray-600 leading-relaxed">
                  Algoritmos avanzados de compresión que preservan la calidad visual mientras optimizan el tamaño del archivo. 
                  Resultados comparables a software profesional de pago, pero completamente gratuito.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <Smartphone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Totalmente Responsive</h3>
                <p className="text-gray-600 leading-relaxed">
                  Funciona perfectamente en cualquier dispositivo: móviles, tablets, laptops y desktops. 
                  Interfaz optimizada que se adapta automáticamente al tamaño de tu pantalla para una experiencia perfecta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo Funciona */}
        <section className="py-12 bg-gray-50 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cómo Convertir Imágenes Online en 3 Pasos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proceso simple y rápido para convertir cualquier formato de imagen sin complicaciones
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sube tu Imagen</h3>
              <p className="text-gray-600 leading-relaxed">
                Arrastra y suelta o selecciona archivos PNG, JPG, GIF, WebP o BMP desde tu dispositivo. 
                Soporte para múltiples archivos simultáneamente hasta 10 imágenes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Elige el Formato</h3>
              <p className="text-gray-600 leading-relaxed">
                Selecciona el formato de salida deseado: JPG, PNG, WebP o GIF según tus necesidades específicas. 
                Ajusta la calidad y configuraciones avanzadas si es necesario.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Descarga el Resultado</h3>
              <p className="text-gray-600 leading-relaxed">
                Obtén tu imagen convertida instantáneamente con calidad profesional garantizada. 
                Descarga individual o en lote con un solo clic.
              </p>
            </div>
          </div>
        </section>

        {/* Testimoniales */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lo Que Dicen Nuestros Usuarios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Miles de profesionales confían en Bidi Converter para sus necesidades diarias de conversión
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Increíble herramienta. La uso diariamente para optimizar imágenes para mi blog. 
                La conversión a WebP me ha ahorrado muchísimo espacio y mejorado la velocidad de carga."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Carlos Mendoza</div>
                  <div className="text-gray-500 text-sm">Blogger y Content Creator</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Como diseñadora, necesito convertir constantemente entre formatos. Esta herramienta es perfecta: 
                rápida, gratuita y mantiene la calidad. El procesamiento local me da total tranquilidad."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ana Martínez</div>
                  <div className="text-gray-500 text-sm">Diseñadora Gráfica</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Excelente para nuestro e-commerce. Convertimos todas las imágenes de productos a WebP y 
                hemos visto una mejora significativa en la velocidad de carga de nuestra tienda online."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Roberto Silva</div>
                  <div className="text-gray-500 text-sm">E-commerce Manager</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes sobre Conversión de Imágenes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Respuestas a las preguntas más comunes sobre nuestro convertidor online gratuito
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Cómo convertir PNG a JPG online gratis?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Simplemente arrastra tu archivo PNG a nuestra herramienta, selecciona JPG como formato de salida y haz clic en convertir. 
                El proceso es instantáneo y completamente gratuito. Puedes ajustar la calidad de compresión según tus necesidades.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Es seguro convertir imágenes online?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sí, es completamente seguro. Todas las conversiones se procesan localmente en tu navegador, por lo que tus archivos 
                nunca se suben a nuestros servidores. Esto garantiza máxima privacidad y seguridad para tus documentos confidenciales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Puedo convertir múltiples imágenes a la vez?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sí, soportamos conversión por lotes de hasta 10 imágenes simultáneamente. Esto te permite ahorrar tiempo 
                significativo cuando necesitas procesar múltiples archivos con la misma configuración.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Qué formatos de imagen soporta el convertidor?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Soportamos los formatos más populares: PNG, JPG, GIF, WebP y BMP como entrada, y PNG, JPG, WebP y GIF como salida. 
                También incluimos soporte para formatos menos comunes y estamos constantemente añadiendo nuevos formatos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Hay límite de tamaño para las imágenes?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No hay límites estrictos, pero recomendamos archivos de hasta 50MB para un rendimiento óptimo. 
                Imágenes más grandes pueden tardar más en procesarse dependiendo de la potencia de tu dispositivo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Necesito registrarme para usar el convertidor?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No, nuestro convertidor es completamente gratuito y no requiere registro. Puedes empezar a convertir imágenes 
                inmediatamente sin proporcionar email ni crear cuenta. Sin límites ocultos ni restricciones.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl py-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para Convertir tus Imágenes?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a más de 850,000 usuarios que confían en Bidi Converter para sus necesidades de conversión
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/converter"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Empezar Ahora Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/editor"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Probar Editor
              <Zap className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
