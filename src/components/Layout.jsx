import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../hooks/useTranslation';
import { routes } from '../utils/routes';
import SEO from './SEO';
import SchemaMarkup from './SchemaMarkup';
import CriticalCSS, { CriticalFonts, CriticalResourceHints } from './CriticalCSS';
import LanguageDebugger from './LanguageDebugger';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const r = routes[language] || routes.en;

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Convertidor', href: r.converter },
    { name: 'Editor', href: r.editor },
    { name: 'Dev Tools', href: r.devTools },
    { name: 'Visor', href: r.viewer },
    { name: 'Blog', href: r.blog },
    { name: 'Acerca de', href: r.about },
    { name: 'Contacto', href: r.contact }
  ];

  const getPageFromPath = (pathname) => {
    const page = navigation.find((page) => page.href === pathname);
    return page ? page.name : 'home';
  };
  
  const getPageType = (pathname) => {
    switch (pathname) {
      case '/converter':
      case '/conversor': return 'converter';
      case '/editor': return 'editor';
      case '/dev-tools':
      case '/herramientas-dev':
      case '/ferramentas-dev': return 'devtools';
      case '/viewer':
      case '/visor':
      case '/visualizador': return 'viewer';
      case '/unit-converter':
      case '/conversor-unidades': return 'unit-converter';
      case '/percentage-calculator':
      case '/calculadora-porcentajes':
      case '/calculadora-porcentagens': return 'percentage-calculator';
      case '/currency-converter':
      case '/conversor-divisas':
      case '/conversor-moedas': return 'currency-converter';
      case '/password-generator':
      case '/generador-contrasenas':
      case '/gerador-senhas': return 'password-generator';
      case '/bmi-calculator':
      case '/calculadora-imc': return 'bmi-calculator';
      case '/qr-generator':
      case '/generador-qr':
      case '/gerador-qr': return 'qr-generator';
      case '/about':
      case '/acerca':
      case '/sobre': return 'about';
      case '/contact':
      case '/contacto':
      case '/contato': return 'contact';
      case '/blog': return 'blog';
      case '/privacy': return 'privacy';
      case '/terms': return 'terms';
      default: return 'home';
    }
  };

  const getToolName = (pathname) => {
    switch (pathname) {
      case '/converter':
      case '/conversor': return 'imageConverter';
      case '/password-generator':
      case '/generador-contrasenas':
      case '/gerador-senhas': return 'passwordGenerator';
      case '/currency-converter':
      case '/conversor-divisas':
      case '/conversor-moedas': return 'currencyConverter';
      case '/bmi-calculator':
      case '/calculadora-imc': return 'bmiCalculator';
      case '/qr-generator':
      case '/generador-qr':
      case '/gerador-qr': return 'qrGenerator';
      case '/unit-converter':
      case '/conversor-unidades': return 'unitConverter';
      case '/percentage-calculator':
      case '/calculadora-porcentajes':
      case '/calculadora-porcentagens': return 'percentageCalculator';
      default: return null;
    }
  };
  
  const currentPage = getPageFromPath(location.pathname);
  const pageType = getPageType(location.pathname);
  const toolName = getToolName(location.pathname);

  const getBreadcrumbTitle = (pathname) => {
    switch (pathname) {
      case '/converter':
      case '/conversor': return 'Convertidor de Imágenes';
      case '/editor': return 'Editor de Imágenes';
      case '/dev-tools':
      case '/herramientas-dev':
      case '/ferramentas-dev': return 'Herramientas para Desarrolladores';
      case '/viewer':
      case '/visor':
      case '/visualizador': return 'Visor de Documentos';
      case '/unit-converter':
      case '/conversor-unidades': return 'Conversor de Unidades';
      case '/percentage-calculator':
      case '/calculadora-porcentajes':
      case '/calculadora-porcentagens': return 'Calculadora de Porcentajes';
      case '/currency-converter':
      case '/conversor-divisas':
      case '/conversor-moedas': return 'Conversor de Divisas';
      case '/password-generator':
      case '/generador-contrasenas':
      case '/gerador-senhas': return 'Generador de Contraseñas';
      case '/rut-validator':
      case '/validador-rut':
      case '/id-validator':
      case '/validador-cpf': return 'Validador RUT/DNI';
      case '/bmi-calculator':
      case '/calculadora-imc': return 'Calculadora IMC';
      case '/text-converter':
      case '/conversor-texto': return 'Conversor de Texto';
      case '/url-shortener':
      case '/acortador-url':
      case '/encurtador-url': return 'Acortador de Enlaces';
      case '/zip-compressor':
      case '/compresor-zip':
      case '/compressor-zip': return 'Compresor ZIP';
      case '/qr-generator':
      case '/generador-qr':
      case '/gerador-qr': return 'Generador de Código QR';
      case '/about':
      case '/acerca':
      case '/sobre': return 'Acerca de Nosotros';
      case '/blog': return 'Blog y Guías';
      case '/contact':
      case '/contacto':
      case '/contato': return 'Contacto';
      case '/privacy': return 'Política de Privacidad';
      case '/terms': return 'Términos de Servicio';
      default: return 'Inicio';
    }
  };

  return (
    <>
      <CriticalCSS />
      <CriticalFonts />
      <CriticalResourceHints />
      <SEO page={currentPage} />
      <SchemaMarkup page={pageType} toolName={toolName} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header with structured navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-blue-600">
                  <Link to="/" className="hover:text-blue-700 transition-colors">
                    Bidi Converter
                  </Link>
                </h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                  aria-label="Abrir menú"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                        location.pathname === item.href
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Breadcrumbs */}
        {location.pathname !== '/' && (
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-gray-700">
                  Inicio
                </Link>
              </li>
              <li>
                <ArrowRight className="h-4 w-4" />
              </li>
              <li className="text-gray-900 font-medium">
                {getBreadcrumbTitle(location.pathname)}
              </li>
            </ol>
          </nav>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bidi Converter</h3>
                <p className="text-gray-600 mb-4">
                  La herramienta más confiable para convertir tus archivos de imagen y visualizar documentos de forma segura y privada.
                </p>
                <div className="flex space-x-4">
                  <Link to="/privacy" className="text-sm text-gray-500 hover:text-blue-600">
                    Privacidad
                  </Link>
                  <Link to="/terms" className="text-sm text-gray-500 hover:text-blue-600">
                    Términos
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Herramientas</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <Link to="/converter" className="hover:text-blue-600">
                      Convertidor de Imágenes
                    </Link>
                  </li>
                  <li>
                    <Link to="/editor" className="hover:text-blue-600">
                      Editor de Imágenes
                    </Link>
                  </li>
                  <li>
                    <Link to="/dev-tools" className="hover:text-blue-600">
                      Dev Tools
                    </Link>
                  </li>
                  <li>
                    <Link to="/viewer" className="hover:text-blue-600">
                      Visor de Documentos
                    </Link>
                  </li>
                  <li>
                    <Link to="/converter" className="hover:text-blue-600">
                      PNG a WebP
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Recursos</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <Link to="/blog" className="hover:text-blue-600">
                      Blog y Guías
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-blue-600">
                      Acerca de Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-blue-600">
                      Soporte
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:help@bidiconverter.com" className="hover:text-blue-600">
                      Ayuda
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Contacto</h4>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <a 
                      href="https://wa.me/56994039964"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-600 transition-colors font-medium"
                    >
                      +56 9 9403 9964
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
              <p>&copy; 2024 Bidi Converter. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Language Debugger - Solo visible en desarrollo */}
      <LanguageDebugger />
    </>
  );
};

export default Layout;
