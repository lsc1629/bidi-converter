import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ImageConverter from './pages/ImageConverter';
import ImageEditor from './pages/ImageEditor';
import DocumentViewer from './pages/DocumentViewer';
import DevTools from './pages/DevTools';
import UnitConverter from './pages/UnitConverter';
import PercentageCalculator from './pages/PercentageCalculator';
import CurrencyConverter from './pages/CurrencyConverter';
import PasswordGenerator from './pages/PasswordGenerator';
import RutValidator from './pages/RutValidator';
import BmiCalculator from './pages/BmiCalculator';
import TextConverter from './pages/TextConverter';
import UrlShortener from './pages/UrlShortener';
import ZipCompressor from './pages/ZipCompressor';
import QrGenerator from './pages/QrGenerator';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import { useLanguage } from './hooks/useLanguage';
import { routes } from './utils/routes';

function App() {
  // Auto-refrescar cuando hay actualizaciones
  useAutoRefresh();
  const { language } = useLanguage();
  const r = routes[language] || routes.en;
  
  // Debug del idioma
  console.log('🌍 Idioma:', language, '| Navegador:', navigator.language);
  
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Rutas principales - Todos los idiomas */}
            <Route path="/converter" element={<ImageConverter />} />
            <Route path="/conversor" element={<ImageConverter />} />
            <Route path="/editor" element={<ImageEditor />} />
            <Route path="/dev-tools" element={<DevTools />} />
            <Route path="/herramientas-dev" element={<DevTools />} />
            <Route path="/ferramentas-dev" element={<DevTools />} />
            <Route path="/viewer" element={<DocumentViewer />} />
            <Route path="/visor" element={<DocumentViewer />} />
            <Route path="/visualizador" element={<DocumentViewer />} />
            
            {/* Herramientas - Todas las rutas de todos los idiomas */}
            {/* Español */}
            <Route path="/conversor-unidades" element={<UnitConverter />} />
            <Route path="/calculadora-porcentajes" element={<PercentageCalculator />} />
            <Route path="/conversor-divisas" element={<CurrencyConverter />} />
            <Route path="/generador-contrasenas" element={<PasswordGenerator />} />
            <Route path="/validador-rut" element={<RutValidator />} />
            <Route path="/calculadora-imc" element={<BmiCalculator />} />
            <Route path="/conversor-texto" element={<TextConverter />} />
            <Route path="/acortador-url" element={<UrlShortener />} />
            <Route path="/compresor-zip" element={<ZipCompressor />} />
            <Route path="/generador-qr" element={<QrGenerator />} />
            
            {/* Inglés */}
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/id-validator" element={<RutValidator />} />
            <Route path="/bmi-calculator" element={<BmiCalculator />} />
            <Route path="/text-converter" element={<TextConverter />} />
            <Route path="/url-shortener" element={<UrlShortener />} />
            <Route path="/zip-compressor" element={<ZipCompressor />} />
            <Route path="/qr-generator" element={<QrGenerator />} />
            
            {/* Páginas adicionales - Todos los idiomas */}
            <Route path="/about" element={<About />} />
            <Route path="/acerca" element={<About />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacidad" element={<PrivacyPolicy />} />
            <Route path="/privacidade" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terminos" element={<TermsOfService />} />
            <Route path="/termos" element={<TermsOfService />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App
