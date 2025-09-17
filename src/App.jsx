import React, { useState } from 'react'
import { Upload, FileImage, FileText, Download, Menu, X, ArrowRight, Zap, Shield, Smartphone } from 'lucide-react'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'
import SEO from './components/SEO'
import { useLanguage } from './hooks/useLanguage'
import { useTranslation } from './hooks/useTranslation'

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()

  return (
    <>
      <SEO page={activeTab} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header with structured navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label={t('nav.home')}>
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-blue-600">
                  <button onClick={() => setActiveTab('home')} aria-label={t('aria.appHome')}>
                    Bidi Converter
                  </button>
                </h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'home'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={activeTab === 'home'}
                >
                  {t('nav.home')}
                </button>
                <button
                  onClick={() => setActiveTab('converter')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'converter'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={activeTab === 'converter'}
                >
                  {t('nav.imageConverter')}
                </button>
                <button
                  onClick={() => setActiveTab('viewer')}
                  className={`hidden md:block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'viewer'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={activeTab === 'viewer'}
                >
                  {t('nav.documentViewer')}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                  aria-label={t('aria.openMenu')}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                  <button
                    onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                      activeTab === 'home'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {t('nav.home')}
                  </button>
                  <button
                    onClick={() => { setActiveTab('converter'); setIsMenuOpen(false); }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                      activeTab === 'converter'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {t('nav.imageConverter')}
                  </button>
                  <button
                    onClick={() => { setActiveTab('viewer'); setIsMenuOpen(false); }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                      activeTab === 'viewer'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {t('nav.documentViewer')}
                  </button>
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Breadcrumbs */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label={t('aria.breadcrumb')}>
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-gray-700">
                {t('nav.home')}
              </button>
            </li>
            {activeTab !== 'home' && (
              <>
                <li>
                  <ArrowRight className="h-4 w-4" />
                </li>
                <li className="text-gray-900 font-medium">
                  {activeTab === 'converter' ? t('nav.imageConverter') : t('nav.documentViewer')}
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
          {activeTab === 'converter' && <ImageConverter />}
          {activeTab === 'viewer' && <DocumentViewer />}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bidi Converter</h3>
                <p className="text-gray-600">
                  {t('footer.description')}
                </p>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  {t('home.popularConversions.title')}
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <button onClick={() => setActiveTab('converter')} className="hover:text-blue-600">
                      {t('home.popularConversions.pngToWebp')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('converter')} className="hover:text-blue-600">
                      {t('home.popularConversions.jpgToPng')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('viewer')} className="hover:text-blue-600">
                      {t('home.popularConversions.pdfViewer')}
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  {t('footer.contact')}
                </h4>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a 
                      href={`mailto:${t('footer.email')}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {t('footer.email')}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <a 
                      href={`https://wa.me/${t('footer.whatsapp').replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-600 transition-colors"
                    >
                      {t('footer.whatsapp')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
              <p>&copy; 2024 Bidi Converter. {t('footer.copyright')}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Home Page Component
function HomePage({ setActiveTab }) {
  const { t } = useTranslation()
  
  const popularConversions = [
    { 
      from: 'PNG', 
      to: 'WebP', 
      description: t('home.popularConversions.pngToWebp'), 
      popular: true 
    },
    { 
      from: 'JPG', 
      to: 'PNG', 
      description: t('home.popularConversions.jpgToPng'), 
      popular: true 
    },
    { 
      from: 'GIF', 
      to: 'WebP', 
      description: t('home.popularConversions.gifToWebp'), 
      popular: false 
    },
    { 
      from: 'WebP', 
      to: 'JPG', 
      description: t('home.popularConversions.webpToJpg'), 
      popular: false 
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('home.hero.title')}
            <span className="text-blue-600 block">{t('home.hero.subtitle')}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('converter')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <FileImage className="w-5 h-5 mr-2" />
              {t('home.hero.convertButton')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => setActiveTab('viewer')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              {t('home.hero.viewButton')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.popularConversions.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.popularConversions.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularConversions.map((conversion, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
                conversion.popular ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setActiveTab('converter')}
            >
              {conversion.popular && (
                <div className="flex items-center mb-3">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {t('home.popularConversions.popularLabel')}
                  </span>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {conversion.from} → {conversion.to}
                </div>
                <p className="text-sm text-gray-600 mb-4">{conversion.description}</p>
                <div className="flex items-center justify-center text-blue-600 font-medium">
                  {t('home.popularConversions.convertNow')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.features.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.features.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.features.fast.title')}</h3>
            <p className="text-gray-600">
              {t('home.features.fast.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.features.secure.title')}</h3>
            <p className="text-gray-600">
              {t('home.features.secure.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.features.crossPlatform.title')}</h3>
            <p className="text-gray-600">
              {t('home.features.crossPlatform.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.formats.title')}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileImage className="w-6 h-6 mr-2 text-blue-600" />
              {t('home.formats.images.title')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">{t('home.formats.images.input')}:</h4>
                <div className="flex flex-wrap gap-2">
                  {['JPG', 'PNG', 'GIF', 'WebP', 'BMP'].map(format => (
                    <span key={format} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">{t('home.formats.images.output')}:</h4>
                <div className="flex flex-wrap gap-2">
                  {['JPG', 'PNG', 'WebP', 'GIF'].map(format => (
                    <span key={format} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-green-600" />
              {t('home.formats.documents.title')}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">{t('home.formats.documents.viewing')}:</h4>
                <div className="flex flex-wrap gap-2">
                  {['PDF', 'Word (DOCX)', 'Excel (XLSX)'].map(format => (
                    <span key={format} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.benefits.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.benefits.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('home.benefits.noWatermark.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('home.benefits.noWatermark.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('home.benefits.batchConversion.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('home.benefits.batchConversion.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FileImage className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('home.benefits.qualityPreservation.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('home.benefits.qualityPreservation.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Smartphone className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('home.benefits.noRegistration.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('home.benefits.noRegistration.description')}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.howItWorks.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.howItWorks.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.howItWorks.step1.title')}</h3>
            <p className="text-gray-600">
              {t('home.howItWorks.step1.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.howItWorks.step2.title')}</h3>
            <p className="text-gray-600">
              {t('home.howItWorks.step2.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.howItWorks.step3.title')}</h3>
            <p className="text-gray-600">
              {t('home.howItWorks.step3.description')}
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <button
            onClick={() => setActiveTab('converter')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center text-lg"
          >
            <FileImage className="w-6 h-6 mr-2" />
            {t('home.hero.convertButton')}
            <ArrowRight className="w-6 h-6 ml-2" />
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.faq.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.faq.description')}
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* FAQ Item 1 */}
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('home.faq.q1.question')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('home.faq.q1.answer')}</p>
          </div>
          
          {/* FAQ Item 2 */}
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('home.faq.q2.question')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('home.faq.q2.answer')}</p>
          </div>
          
          {/* FAQ Item 3 */}
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('home.faq.q3.question')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('home.faq.q3.answer')}</p>
          </div>
          
          {/* FAQ Item 4 */}
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('home.faq.q4.question')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('home.faq.q4.answer')}</p>
          </div>
          
          {/* FAQ Item 5 */}
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('home.faq.q5.question')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('home.faq.q5.answer')}</p>
          </div>
          
          {/* FAQ Item 6 */}
          <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('home.faq.q6.question')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('home.faq.q6.answer')}</p>
          </div>
        </div>
        
        {/* Final CTA in FAQ */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">{t('home.faq.ctaText')}</p>
          <button
            onClick={() => setActiveTab('converter')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
          >
            <FileImage className="w-5 h-5 mr-2" />
            {t('home.faq.ctaButton')}
          </button>
        </div>
      </section>
    </div>
  )
}

// Image Converter Component
function ImageConverter() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [convertedImages, setConvertedImages] = useState([])
  const [targetFormat, setTargetFormat] = useState('png')
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [currentlyConverting, setCurrentlyConverting] = useState('')
  const { t } = useTranslation()

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files).slice(0, 10) // Máximo 10 archivos
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    const filesWithInfo = imageFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file)
    }))
    
    setSelectedFiles(prev => [...prev, ...filesWithInfo].slice(0, 10))
    setConvertedImages([])
  }

  const removeFile = (id) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== id))
    setConvertedImages(prev => prev.filter(c => c.originalId !== id))
  }

  const clearAllFiles = () => {
    setSelectedFiles([])
    setConvertedImages([])
    setConversionProgress(0)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const convertSingleImage = (fileInfo) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      const startTime = Date.now()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        const quality = targetFormat === 'jpg' ? 0.9 : undefined
        const mimeType = `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`
        
        canvas.toBlob((blob) => {
          const endTime = Date.now()
          const conversionTime = endTime - startTime
          const url = URL.createObjectURL(blob)
          const compressionRatio = ((fileInfo.size - blob.size) / fileInfo.size * 100).toFixed(1)
          
          resolve({
            originalId: fileInfo.id,
            originalFile: fileInfo,
            convertedFile: {
              url,
              blob,
              size: blob.size,
              type: mimeType,
              filename: `${fileInfo.name.split('.')[0]}.${targetFormat}`
            },
            compressionRatio: compressionRatio > 0 ? compressionRatio : '0',
            conversionTime,
            timestamp: new Date().toISOString()
          })
        }, mimeType, quality)
      }
      
      img.src = fileInfo.preview
    })
  }

  const convertAllImages = async () => {
    if (selectedFiles.length === 0) return

    setIsConverting(true)
    setConversionProgress(0)
    setConvertedImages([])
    
    try {
      const results = []
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const fileInfo = selectedFiles[i]
        setCurrentlyConverting(fileInfo.name)
        
        const result = await convertSingleImage(fileInfo)
        results.push(result)
        
        const progress = ((i + 1) / selectedFiles.length) * 100
        setConversionProgress(progress)
        
        // Pequeña pausa para mostrar el progreso
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      setConvertedImages(results)
      setCurrentlyConverting('')
    } catch (error) {
      console.error(t('errors.convertingImage'), error)
    } finally {
      setIsConverting(false)
      setConversionProgress(0)
    }
  }

  const downloadSingleImage = (convertedImage) => {
    const a = document.createElement('a')
    a.href = convertedImage.convertedFile.url
    a.download = convertedImage.convertedFile.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const downloadAllImages = () => {
    convertedImages.forEach(convertedImage => {
      setTimeout(() => downloadSingleImage(convertedImage), 100)
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 id="converter-heading" className="text-3xl font-bold text-gray-900 mb-4">
          {t('converter.title')}
        </h2>
        <p className="text-gray-600">
          {t('converter.subtitle')} • {t('converter.selectImage')}
        </p>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        {selectedFiles.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-400 transition-colors text-center">
            <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('converter.selectImage')}
            </h3>
            <p className="text-gray-500 mb-4">
              {t('converter.supportedFormats')}
            </p>
            <div className="flex justify-center">
              <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                {t('converter.uploadImage')}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedFiles.length} {t('converter.filesSelected')}
              </h3>
              <div className="flex gap-2">
                <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer inline-flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  {t('converter.addMoreFiles')}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={clearAllFiles}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors inline-flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  {t('converter.clearAll')}
                </button>
              </div>
            </div>
            
            {/* Files Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {selectedFiles.map((fileInfo) => (
                <div key={fileInfo.id} className="bg-gray-50 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeFile(fileInfo.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img
                    src={fileInfo.preview}
                    alt={fileInfo.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-gray-900 text-sm truncate">{fileInfo.name}</h4>
                  <p className="text-gray-500 text-xs">{formatFileSize(fileInfo.size)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conversion Settings */}
      {selectedFiles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('converter.targetFormat')}
              </label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WebP</option>
                <option value="gif">GIF</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={convertAllImages}
                disabled={isConverting || selectedFiles.length === 0}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isConverting ? t('converter.converting') : t('converter.convertButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isConverting && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{t('converter.progress')}</span>
              <span className="text-sm text-gray-500">{Math.round(conversionProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${conversionProgress}%` }}
              ></div>
            </div>
          </div>
          {currentlyConverting && (
            <p className="text-sm text-gray-600">
              {t('converter.convertingFile')}: {currentlyConverting}
            </p>
          )}
        </div>
      )}

      {/* Results */}
      {convertedImages.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {t('converter.conversionComplete')}
            </h3>
            <button
              onClick={downloadAllImages}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              {t('converter.downloadAll')}
            </button>
          </div>
          
          <div className="space-y-4">
            {convertedImages.map((result) => (
              <div key={result.originalId} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Original File Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('converter.originalFile')}</h4>
                    <img
                      src={result.originalFile.preview}
                      alt={result.originalFile.name}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm text-gray-600 truncate">{result.originalFile.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(result.originalFile.size)}</p>
                  </div>
                  
                  {/* Conversion Stats */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('converter.fileInfo')}</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">{t('converter.compressionSaved')}:</span> {result.compressionRatio}%</p>
                      <p><span className="text-gray-600">{t('converter.conversionTime')}:</span> {result.conversionTime}ms</p>
                      <p><span className="text-gray-600">{t('converter.fileType')}:</span> {targetFormat.toUpperCase()}</p>
                    </div>
                  </div>
                  
                  {/* Converted File */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('converter.convertedFile')}</h4>
                    <img
                      src={result.convertedFile.url}
                      alt={result.convertedFile.filename}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm text-gray-600 truncate">{result.convertedFile.filename}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(result.convertedFile.size)}</p>
                    <button
                      onClick={() => downloadSingleImage(result)}
                      className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors inline-flex items-center"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      {t('converter.downloadButton')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Document Viewer Component
function DocumentViewer() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [processedStyles, setProcessedStyles] = useState([])
  const { t } = useTranslation()

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      loadDocument(file)
    }
  }

  const loadDocument = async (file) => {
    setIsLoading(true)
    setError(null)
    setFileContent(null)
    setProcessedStyles([])

    try {
      const fileType = file.type
      
      if (fileType === 'application/pdf') {
        const url = URL.createObjectURL(file)
        setFileContent({ type: 'pdf', url })
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Handle DOCX files with mammoth - Enhanced formatting
        const arrayBuffer = await file.arrayBuffer()
        
        const styleMap = [
          // Headings
          "p[style-name='Heading 1'] => h1.doc-heading-1",
          "p[style-name='Heading 2'] => h2.doc-heading-2", 
          "p[style-name='Heading 3'] => h3.doc-heading-3",
          "p[style-name='Heading 4'] => h4.doc-heading-4",
          "p[style-name='Heading 5'] => h5.doc-heading-5",
          "p[style-name='Heading 6'] => h6.doc-heading-6",
          
          // Spanish headings
          "p[style-name='Título 1'] => h1.doc-heading-1",
          "p[style-name='Título 2'] => h2.doc-heading-2",
          "p[style-name='Título 3'] => h3.doc-heading-3",
          
          // Text styles
          "p[style-name='Normal'] => p.doc-normal",
          "p[style-name='Body Text'] => p.doc-body",
          "p[style-name='Quote'] => blockquote.doc-quote",
          "p[style-name='Intense Quote'] => blockquote.doc-intense-quote",
          
          // Lists
          "p[style-name='List Paragraph'] => p.doc-list-paragraph",
          "p[style-name='Bullet List'] => p.doc-bullet-list",
          
          // Special styles
          "p[style-name='Subtitle'] => p.doc-subtitle",
          "p[style-name='Caption'] => p.doc-caption",
          "p[style-name='Intense Emphasis'] => p.doc-intense-emphasis",
          "p[style-name='Strong'] => p.doc-strong",
          
          // Custom styles
          "p[style-name='Firma'] => p.doc-signature",
          "p[style-name='Sinespaciado'] => p.doc-no-spacing",
          "p[style-name='Título'] => h2.doc-title",
          "p[style-name='Subtítulo'] => h3.doc-subtitle",
          
          // Character styles
          "r[style-name='Strong'] => strong",
          "r[style-name='Emphasis'] => em",
          "r[style-name='Intense Emphasis'] => strong.doc-intense",
          "r[style-name='Subtle Emphasis'] => em.doc-subtle"
        ]
        
        const options = {
          styleMap: styleMap,
          includeDefaultStyleMap: true,
          convertImage: mammoth.images.imgElement(function(image) {
            return image.read("base64").then(function(imageBuffer) {
              return {
                src: "data:" + image.contentType + ";base64," + imageBuffer
              }
            })
          }),
          transformDocument: mammoth.transforms.paragraph(function(element) {
            // Preserve text alignment
            if (element.alignment) {
              return {
                ...element,
                styleName: element.styleName + "-" + element.alignment
              }
            }
            return element
          })
        }
        
        const result = await mammoth.convertToHtml({ arrayBuffer }, options)
        
        // Filter and process warnings
        const criticalWarnings = result.messages.filter(msg => 
          msg.type === 'error' || 
          (msg.type === 'warning' && !msg.message.includes('Unrecognised paragraph style'))
        )
        
        const styleWarnings = result.messages.filter(msg => 
          msg.message.includes('Unrecognised paragraph style')
        )
        
        setProcessedStyles(styleWarnings.map(w => w.message))
        setFileContent({ 
          type: 'word', 
          html: result.value,
          warnings: criticalWarnings
        })
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Handle Excel files with SheetJS - Enhanced formatting
        const arrayBuffer = await file.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer, { 
          type: 'array',
          cellStyles: true,
          cellNF: true,
          cellHTML: true
        })
        
        const sheets = {}
        const sheetsData = {}
        
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName]
          
          // Get the range of the worksheet
          const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1')
          
          // Create enhanced HTML table with proper Excel styling
          let htmlTable = '<table class="excel-table">'
          
          // Add column headers (A, B, C, etc.)
          htmlTable += '<thead><tr><th class="excel-row-header"></th>'
          for (let col = range.s.c; col <= range.e.c; col++) {
            const colName = XLSX.utils.encode_col(col)
            htmlTable += `<th class="excel-col-header">${colName}</th>`
          }
          htmlTable += '</tr></thead><tbody>'
          
          // Add rows with data
          for (let row = range.s.r; row <= range.e.r; row++) {
            htmlTable += '<tr>'
            
            // Row number header
            htmlTable += `<td class="excel-row-header">${row + 1}</td>`
            
            // Data cells
            for (let col = range.s.c; col <= range.e.c; col++) {
              const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
              const cell = worksheet[cellAddress]
              
              let cellValue = ''
              let cellClass = 'excel-cell'
              
              if (cell) {
                // Handle different cell types
                if (cell.t === 'n') { // number
                  cellValue = cell.v
                  cellClass += ' excel-number'
                } else if (cell.t === 's') { // string
                  cellValue = cell.v
                  cellClass += ' excel-text'
                } else if (cell.t === 'b') { // boolean
                  cellValue = cell.v ? 'TRUE' : 'FALSE'
                  cellClass += ' excel-boolean'
                } else if (cell.t === 'd') { // date
                  cellValue = cell.w || cell.v
                  cellClass += ' excel-date'
                } else if (cell.f) { // formula
                  cellValue = cell.w || cell.v || `=${cell.f}`
                  cellClass += ' excel-formula'
                } else {
                  cellValue = cell.w || cell.v || ''
                }
                
                // Add styling based on cell format
                if (cell.s) {
                  if (cell.s.font && cell.s.font.bold) cellClass += ' excel-bold'
                  if (cell.s.font && cell.s.font.italic) cellClass += ' excel-italic'
                  if (cell.s.alignment) {
                    if (cell.s.alignment.horizontal === 'center') cellClass += ' excel-center'
                    if (cell.s.alignment.horizontal === 'right') cellClass += ' excel-right'
                  }
                }
              }
              
              htmlTable += `<td class="${cellClass}">${cellValue}</td>`
            }
            htmlTable += '</tr>'
          }
          
          htmlTable += '</tbody></table>'
          sheets[sheetName] = htmlTable
          
          // Also store raw data for potential future use
          sheetsData[sheetName] = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1, 
            defval: '',
            raw: false
          })
        })
        
        setFileContent({ 
          type: 'excel', 
          sheets,
          sheetsData,
          sheetNames: workbook.SheetNames
        })
      } else {
        throw new Error('Formato de archivo no soportado')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetViewer = () => {
    setSelectedFile(null)
    setFileContent(null)
    setError(null)
    setProcessedStyles([])
  }

  const downloadFile = () => {
    if (selectedFile) {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(selectedFile)
      link.download = selectedFile.name
      link.click()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Enhanced CSS Styles for Document Viewing */}
      <style jsx>{`
        /* Word Document Styles */
        .word-document {
          background: white;
          padding: 2rem;
          margin: 1rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          font-family: 'Times New Roman', Times, serif;
          line-height: 1.6;
          color: #1f2937;
        }
        
        .word-document h1.doc-heading-1 {
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
          margin: 1.5rem 0 1rem 0;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        .word-document h2.doc-heading-2 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #374151;
          margin: 1.25rem 0 0.75rem 0;
        }
        
        .word-document h3.doc-heading-3 {
          font-size: 1.25rem;
          font-weight: bold;
          color: #4b5563;
          margin: 1rem 0 0.5rem 0;
        }
        
        .word-document p.doc-normal {
          margin: 0.75rem 0;
          text-align: justify;
        }
        
        .word-document p.doc-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          font-style: italic;
          margin: 0.5rem 0;
        }
        
        .word-document blockquote.doc-quote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background: #f8fafc;
          padding: 1rem;
          border-radius: 4px;
        }
        
        .word-document p.doc-signature {
          text-align: right;
          font-style: italic;
          margin-top: 2rem;
          color: #6b7280;
        }
        
        .word-document strong.doc-intense {
          color: #dc2626;
          font-weight: bold;
        }
        
        .word-document em.doc-subtle {
          color: #6b7280;
        }
        
        /* Excel Table Styles */
        .excel-sheet {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 1rem 0;
        }
        
        .excel-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 0.875rem;
          background: white;
        }
        
        .excel-table thead {
          background: #f3f4f6;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .excel-col-header {
          background: #e5e7eb !important;
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          text-align: center;
          font-weight: bold;
          color: #374151;
          min-width: 80px;
          font-size: 0.75rem;
        }
        
        .excel-row-header {
          background: #e5e7eb !important;
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          text-align: center;
          font-weight: bold;
          color: #374151;
          min-width: 50px;
          font-size: 0.75rem;
          position: sticky;
          left: 0;
          z-index: 5;
        }
        
        .excel-cell {
          border: 1px solid #d1d5db;
          padding: 6px 12px;
          background: white;
          min-height: 20px;
          vertical-align: top;
          position: relative;
        }
        
        .excel-cell:hover {
          background: #f0f9ff;
          border-color: #3b82f6;
        }
        
        .excel-number {
          text-align: right;
          font-family: 'Courier New', monospace;
        }
        
        .excel-text {
          text-align: left;
        }
        
        .excel-center {
          text-align: center;
        }
        
        .excel-right {
          text-align: right;
        }
        
        .excel-bold {
          font-weight: bold;
        }
        
        .excel-italic {
          font-style: italic;
        }
        
        .excel-formula {
          background: #fef3c7;
          color: #92400e;
          font-family: 'Courier New', monospace;
        }
        
        .excel-boolean {
          text-align: center;
          font-weight: bold;
          color: #059669;
        }
        
        .excel-date {
          text-align: center;
          color: #7c3aed;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .word-document {
            padding: 1rem;
            margin: 0.5rem 0;
          }
          
          .excel-table {
            font-size: 0.75rem;
          }
          
          .excel-cell, .excel-col-header, .excel-row-header {
            padding: 4px 8px;
            min-width: 60px;
          }
        }
      `}</style>
      
      <div className="text-center mb-8">
        <h2 id="viewer-heading" className="text-3xl font-bold text-gray-900 mb-4">
          {t('viewer.title')}
        </h2>
        <p className="text-gray-600">
          {t('viewer.description')}
        </p>
      </div>

      {!fileContent ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-400 transition-colors">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('viewer.selectFile')}
              </h3>
              <p className="text-gray-500 mb-4">
                {t('viewer.supportedFormats')}
              </p>
              <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                {t('viewer.uploadFile')}
                <input
                  type="file"
                  accept=".pdf,.docx,.xlsx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top bar with file info and actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedFile?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadFile}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {t('viewer.downloadButton')}
                </button>
                <button
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  {t('viewer.changeFile')}
                </button>
                <button
                  onClick={resetViewer}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center text-sm"
                >
                  <X className="w-4 h-4 mr-1" />
                  {t('viewer.newFile')}
                </button>
              </div>
            </div>
            
            {/* Hidden file input for changing files */}
            <input
              type="file"
              accept=".pdf,.docx,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('viewer.loading')}</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{t('viewer.error')} {error}</p>
            </div>
          )}

          {/* Document content */}
          {fileContent && !isLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {fileContent.type === 'pdf' && (
                <div className="w-full h-screen">
                  <iframe
                    src={fileContent.url}
                    className="w-full h-full border-0"
                    title={t('viewer.pdfViewer')}
                  />
                </div>
              )}
              
              {fileContent.type === 'word' && (
                <div className="p-6">
                  {processedStyles.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        {t('viewer.processedStyles')} {processedStyles.length}
                      </p>
                    </div>
                  )}
                  {fileContent.warnings && fileContent.warnings.length > 0 && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800 font-medium mb-2">{t('viewer.warnings')}:</p>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {fileContent.warnings.map((warning, index) => (
                          <li key={index}>• {warning.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div 
                    className="word-document prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: fileContent.html }}
                  />
                </div>
              )}
              
              {fileContent.type === 'excel' && (
                <div className="p-6">
                  {fileContent.sheetNames.length > 1 && (
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t('viewer.sheets')}:</h3>
                      <div className="flex flex-wrap gap-2">
                        {fileContent.sheetNames.map(sheetName => (
                          <span key={sheetName} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {sheetName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {fileContent.sheetNames.map(sheetName => (
                    <div key={sheetName} className="mb-8">
                      {fileContent.sheetNames.length > 1 && (
                        <h4 className="text-md font-medium text-gray-800 mb-3 border-b pb-2">
                          {sheetName}
                        </h4>
                      )}
                      <div 
                        className="excel-sheet overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: fileContent.sheets[sheetName] }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App