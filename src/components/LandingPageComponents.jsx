import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Componente principal de Landing Page
 */
export const LandingPageHero = ({ tool = 'image-converter' }) => {
  const { language } = useLanguage();
  const [config, setConfig] = useState(null);
  const [ctaConfig, setCTAConfig] = useState(null);

  useEffect(() => {
    if (window.landingPageManager) {
      setConfig(window.landingPageManager.getLandingPageConfig(tool));
      setCTAConfig(window.landingPageManager.getCTAConfig());
    }
  }, [tool]);

  if (!config) return null;

  return (
    <section className="hero-section bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          {config.headline}
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          {config.subheadline}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
          {config.benefits.map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-green-300 text-lg mb-2">✓</div>
              <p className="text-sm">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            onClick={() => window.landingPageManager?.trackEvent('cta_primary_clicked')}
          >
            {ctaConfig?.primary || 'Get Started Free'}
          </button>
          <button 
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            onClick={() => window.landingPageManager?.showLeadModal('cta_secondary')}
          >
            {config.leadMagnet}
          </button>
        </div>
      </div>
    </section>
  );
};

/**
 * Componente de características destacadas
 */
export const FeaturesSection = ({ tool = 'image-converter' }) => {
  const features = {
    'image-converter': [
      {
        icon: '🔄',
        title: 'Multiple Formats',
        description: 'Convert between PNG, JPG, WebP, AVIF, and more formats instantly.'
      },
      {
        icon: '🛡️',
        title: 'Secure Processing',
        description: 'All conversions happen in your browser. Your files never leave your device.'
      },
      {
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Convert images in seconds with our optimized processing engine.'
      },
      {
        icon: '💰',
        title: 'Completely Free',
        description: 'No limits, no watermarks, no registration required. Forever free.'
      }
    ],
    'pdf-viewer': [
      {
        icon: '📱',
        title: 'Any Device',
        description: 'View PDFs on desktop, tablet, or mobile with perfect rendering.'
      },
      {
        icon: '🔍',
        title: 'Advanced Search',
        description: 'Find text instantly with powerful search and navigation tools.'
      },
      {
        icon: '🔒',
        title: 'Privacy First',
        description: 'PDFs are processed locally. No uploads, no data collection.'
      },
      {
        icon: '🎯',
        title: 'No Downloads',
        description: 'View PDFs instantly without downloading or installing anything.'
      }
    ]
  };

  const toolFeatures = features[tool] || features['image-converter'];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Our {tool.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {toolFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Componente de testimonios sociales
 */
export const SocialProofSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Graphic Designer',
      content: 'This tool saved me hours of work. The quality is amazing and it\'s so easy to use!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Web Developer',
      content: 'Perfect for optimizing images for my websites. Fast, reliable, and completely free.',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      role: 'Marketing Manager',
      content: 'I use this daily for converting images for social media. Couldn\'t work without it!',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Trusted by Thousands of Users
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-gray-800">{testimonial.name}</div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500K+</div>
              <div className="text-sm">Files Converted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="text-sm">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4.9★</div>
              <div className="text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Componente de FAQ optimizado para conversión
 */
export const ConversionFAQ = ({ tool = 'image-converter' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = {
    'image-converter': [
      {
        question: 'Is it really free to convert images?',
        answer: 'Yes! Our image converter is completely free with no limits, no watermarks, and no registration required.'
      },
      {
        question: 'Are my files safe and private?',
        answer: 'Absolutely. All conversions happen in your browser. Your files never leave your device or get uploaded to our servers.'
      },
      {
        question: 'What image formats do you support?',
        answer: 'We support all major formats including PNG, JPG, JPEG, WebP, AVIF, GIF, BMP, TIFF, and SVG.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'No file size limits! Convert images of any size, from small icons to high-resolution photos.'
      }
    ]
  };

  const toolFAQs = faqs[tool] || faqs['image-converter'];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {toolFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <span className="text-gray-500 text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Componente de CTA final
 */
export const FinalCTA = ({ tool = 'image-converter' }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (window.landingPageManager) {
      setConfig(window.landingPageManager.getLandingPageConfig(tool));
    }
  }, [tool]);

  const handleCTAClick = () => {
    window.landingPageManager?.trackEvent('final_cta_clicked', { tool });
    // Scroll to tool or redirect
    const toolSection = document.getElementById('tool-section');
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of users who trust our tools for their daily workflow. 
          Start converting now - it's completely free!
        </p>
        
        <button
          onClick={handleCTAClick}
          className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg"
        >
          {config?.cta || 'Start Converting Now'}
        </button>
        
        <div className="mt-6 text-sm opacity-75">
          No registration required • Completely free • Secure & private
        </div>
      </div>
    </section>
  );
};

/**
 * Componente de captura de leads
 */
export const LeadCaptureForm = ({ inline = false, tool = 'image-converter' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadMagnet, setLeadMagnet] = useState(null);

  useEffect(() => {
    if (window.landingPageManager) {
      const config = window.landingPageManager.getLandingPageConfig(tool);
      setLeadMagnet(config?.leadMagnet);
    }
  }, [tool]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Simulate lead capture
    if (window.landingPageManager) {
      const form = e.target;
      window.landingPageManager.handleLeadCapture(form);
    }
    
    setIsSubmitted(true);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-gray-600">Your download will start automatically.</p>
      </div>
    );
  }

  const containerClass = inline 
    ? "bg-blue-50 rounded-lg p-6" 
    : "bg-white rounded-lg shadow-lg p-8";

  return (
    <div className={containerClass}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">
          Get Your Free Guide
        </h3>
        <p className="text-gray-600">
          Download "{leadMagnet}" and become a pro user!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Download Free Guide
        </button>
      </form>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

/**
 * Componente de estadísticas en tiempo real
 */
export const ConversionStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const updateStats = () => {
      if (window.landingPageManager) {
        setStats(window.landingPageManager.getConversionStats());
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalLeads}</div>
            <div className="text-sm text-gray-600">Total Leads</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{stats.toolLeads}</div>
            <div className="text-sm text-gray-600">Tool Leads</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{stats.conversionRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{stats.topPerformingTool}</div>
            <div className="text-sm text-gray-600">Top Tool</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook para usar landing page manager
 */
export const useLandingPage = (tool) => {
  const [manager, setManager] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (window.landingPageManager) {
      setManager(window.landingPageManager);
      setConfig(window.landingPageManager.getLandingPageConfig(tool));
    }
  }, [tool]);

  const trackEvent = (eventName, data = {}) => {
    if (manager) {
      manager.trackEvent(eventName, { ...data, tool });
    }
  };

  const showLeadModal = (trigger = 'manual') => {
    if (manager) {
      manager.showLeadModal(trigger);
    }
  };

  const getStats = () => {
    return manager ? manager.getConversionStats() : null;
  };

  return {
    manager,
    config,
    trackEvent,
    showLeadModal,
    getStats
  };
};

export default {
  LandingPageHero,
  FeaturesSection,
  SocialProofSection,
  ConversionFAQ,
  FinalCTA,
  LeadCaptureForm,
  ConversionStats,
  useLandingPage
};
