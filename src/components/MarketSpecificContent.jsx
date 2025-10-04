import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useInternationalMarket } from '../utils/internationalMarkets';

/**
 * Componente para mostrar contenido específico por mercado
 */
const MarketSpecificContent = ({ children, fallback = null }) => {
  const { language, detectedMarket } = useLanguage();
  const { currentMarket, isLoading } = useInternationalMarket();

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>;
  }

  return (
    <div className="market-specific-content" data-market={currentMarket?.code}>
      {children || fallback}
    </div>
  );
};

/**
 * Componente para mostrar banners específicos por mercado
 */
export const MarketBanner = () => {
  const { language, detectedMarket } = useLanguage();

  const marketBanners = {
    IN: {
      title: '🇮🇳 भारत में #1 मुफ्त इमेज कन्वर्टर',
      subtitle: 'हिंदी में उपलब्ध • डेटा सेवर मोड • तेज़ और सुरक्षित',
      bgColor: 'bg-gradient-to-r from-orange-500 to-green-500',
      textColor: 'text-white'
    },
    ID: {
      title: '🇮🇩 Konverter Gambar #1 di Indonesia',
      subtitle: 'Bahasa Indonesia • Mode Hemat Data • Cepat dan Aman',
      bgColor: 'bg-gradient-to-r from-red-500 to-white',
      textColor: 'text-red-800'
    },
    RU: {
      title: '🇷🇺 Лучший Конвертер в России',
      subtitle: 'На русском языке • Высокое качество • Максимальная безопасность',
      bgColor: 'bg-gradient-to-r from-blue-600 to-red-600',
      textColor: 'text-white'
    },
    KR: {
      title: '🇰🇷 한국 최고의 이미지 변환기',
      subtitle: '한국어 지원 • 초고속 처리 • 모바일 최적화',
      bgColor: 'bg-gradient-to-r from-blue-500 to-red-500',
      textColor: 'text-white'
    }
  };

  const banner = marketBanners[detectedMarket?.code];

  if (!banner) return null;

  return (
    <div className={`${banner.bgColor} ${banner.textColor} p-4 text-center mb-6 rounded-lg shadow-lg`}>
      <h2 className="text-xl font-bold mb-2">{banner.title}</h2>
      <p className="text-sm opacity-90">{banner.subtitle}</p>
    </div>
  );
};

/**
 * Componente para mostrar características específicas del mercado
 */
export const MarketFeatures = () => {
  const { language, detectedMarket } = useLanguage();

  const marketFeatures = {
    IN: [
      {
        icon: '📱',
        title: 'मोबाइल फ्रेंडली',
        description: 'Android और iOS के लिए ऑप्टिमाइज़्ड'
      },
      {
        icon: '💾',
        title: 'डेटा सेवर',
        description: '50% कम डेटा उपयोग'
      },
      {
        icon: '🔒',
        title: '100% सुरक्षित',
        description: 'आपकी फाइलें आपके डिवाइस पर ही रहती हैं'
      }
    ],
    ID: [
      {
        icon: '⚡',
        title: 'Super Cepat',
        description: 'Konversi dalam 3 detik'
      },
      {
        icon: '📊',
        title: 'Hemat Data',
        description: 'Dioptimalkan untuk koneksi lambat'
      },
      {
        icon: '🆓',
        title: '100% Gratis',
        description: 'Tidak ada biaya tersembunyi'
      }
    ],
    RU: [
      {
        icon: '🎯',
        title: 'Высокое Качество',
        description: 'Профессиональный результат'
      },
      {
        icon: '🖥️',
        title: 'Для ПК',
        description: 'Оптимизировано для настольных ПК'
      },
      {
        icon: '🔐',
        title: 'Безопасность',
        description: 'Локальная обработка файлов'
      }
    ],
    KR: [
      {
        icon: '🚀',
        title: '초고속',
        description: '3초 만에 변환 완료'
      },
      {
        icon: '📱',
        title: '모바일 우선',
        description: '스마트폰에 최적화'
      },
      {
        icon: '⭐',
        title: '최고 품질',
        description: '원본 품질 유지'
      }
    ]
  };

  const features = marketFeatures[detectedMarket?.code];

  if (!features) return null;

  return (
    <div className="grid md:grid-cols-3 gap-6 my-8">
      {features.map((feature, index) => (
        <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * Componente para mostrar testimonios específicos del mercado
 */
export const MarketTestimonials = () => {
  const { language, detectedMarket } = useLanguage();

  const marketTestimonials = {
    IN: [
      {
        text: 'बहुत बढ़िया टूल है! रोज़ाना इस्तेमाल करता हूं।',
        author: 'राहुल शर्मा',
        location: 'दिल्ली',
        role: 'ग्राफिक डिज़ाइनर'
      },
      {
        text: 'हिंदी में होने से बहुत आसान हो गया।',
        author: 'प्रिया पटेल',
        location: 'मुंबई',
        role: 'स्टूडेंट'
      }
    ],
    ID: [
      {
        text: 'Tool yang sangat bagus! Saya pakai setiap hari.',
        author: 'Budi Santoso',
        location: 'Jakarta',
        role: 'Graphic Designer'
      },
      {
        text: 'Dalam Bahasa Indonesia jadi lebih mudah.',
        author: 'Sari Dewi',
        location: 'Surabaya',
        role: 'Mahasiswa'
      }
    ],
    RU: [
      {
        text: 'Отличный инструмент! Использую каждый день.',
        author: 'Алексей Петров',
        location: 'Москва',
        role: 'Графический дизайнер'
      },
      {
        text: 'На русском языке намного удобнее.',
        author: 'Мария Иванова',
        location: 'Санкт-Петербург',
        role: 'Студентка'
      }
    ],
    KR: [
      {
        text: '정말 훌륭한 도구입니다! 매일 사용해요.',
        author: '김민수',
        location: '서울',
        role: '그래픽 디자이너'
      },
      {
        text: '한국어로 되어 있어서 훨씬 편해요.',
        author: '박지영',
        location: '부산',
        role: '대학생'
      }
    ]
  };

  const testimonials = marketTestimonials[detectedMarket?.code];

  if (!testimonials) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-8 my-8">
      <h3 className="text-2xl font-bold text-center mb-6">
        {language === 'hi' && 'उपयोगकर्ता क्या कहते हैं'}
        {language === 'id' && 'Apa Kata Pengguna'}
        {language === 'ru' && 'Что Говорят Пользователи'}
        {language === 'ko' && '사용자 후기'}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-semibold">
                  {testimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Componente para mostrar estadísticas específicas del mercado
 */
export const MarketStats = () => {
  const { language, detectedMarket } = useLanguage();

  const marketStats = {
    IN: {
      users: '10 लाख+',
      conversions: '50 लाख+',
      rating: '4.8★',
      countries: 'भारत में #1'
    },
    ID: {
      users: '1 Juta+',
      conversions: '5 Juta+',
      rating: '4.8★',
      countries: '#1 di Indonesia'
    },
    RU: {
      users: '1 млн+',
      conversions: '5 млн+',
      rating: '4.8★',
      countries: '#1 в России'
    },
    KR: {
      users: '100만+',
      conversions: '500만+',
      rating: '4.8★',
      countries: '한국 1위'
    }
  };

  const stats = marketStats[detectedMarket?.code];

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-blue-600">{stats.users}</div>
        <div className="text-sm text-gray-500">
          {language === 'hi' && 'उपयोगकर्ता'}
          {language === 'id' && 'Pengguna'}
          {language === 'ru' && 'Пользователи'}
          {language === 'ko' && '사용자'}
        </div>
      </div>
      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-green-600">{stats.conversions}</div>
        <div className="text-sm text-gray-500">
          {language === 'hi' && 'कन्वर्शन'}
          {language === 'id' && 'Konversi'}
          {language === 'ru' && 'Конвертации'}
          {language === 'ko' && '변환'}
        </div>
      </div>
      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-yellow-600">{stats.rating}</div>
        <div className="text-sm text-gray-500">
          {language === 'hi' && 'रेटिंग'}
          {language === 'id' && 'Rating'}
          {language === 'ru' && 'Рейтинг'}
          {language === 'ko' && '평점'}
        </div>
      </div>
      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-purple-600">{stats.countries}</div>
        <div className="text-sm text-gray-500">
          {language === 'hi' && 'स्थिति'}
          {language === 'id' && 'Posisi'}
          {language === 'ru' && 'Позиция'}
          {language === 'ko' && '순위'}
        </div>
      </div>
    </div>
  );
};

/**
 * Componente para mostrar selector de idioma/mercado
 */
export const MarketSelector = () => {
  const { language, changeLanguage, getSupportedLanguages } = useLanguage();
  const supportedLanguages = getSupportedLanguages();

  return (
    <div className="relative inline-block text-left">
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};

export default MarketSpecificContent;
