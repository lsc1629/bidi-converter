import React, { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Componente para inyectar schemas dinámicamente
 */
export const SchemaInjector = ({ schemaType, data }) => {
  useEffect(() => {
    if (window.schemaManager && schemaType && data) {
      const schema = generateSchemaByType(schemaType, data);
      window.schemaManager.addCustomSchema(`dynamic-${schemaType}`, schema);
    }

    return () => {
      if (window.schemaManager) {
        window.schemaManager.removeSchema(`dynamic-${schemaType}`);
      }
    };
  }, [schemaType, data]);

  return null; // Este componente no renderiza nada visible
};

/**
 * Componente FAQ con schema automático
 */
export const FAQWithSchema = ({ faqs, title = "Frequently Asked Questions" }) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (window.schemaManager && faqs?.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };

      window.schemaManager.addCustomSchema('dynamic-faq', faqSchema);
    }

    return () => {
      if (window.schemaManager) {
        window.schemaManager.removeSchema('dynamic-faq');
      }
    };
  }, [faqs]);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="faq-section" data-schema="faq">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

/**
 * Item individual de FAQ
 */
export const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

/**
 * Componente HowTo con schema automático
 */
export const HowToWithSchema = ({ title, description, steps, estimatedTime = 'PT5M' }) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (window.schemaManager && steps?.length > 0) {
      const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: title,
        description: description,
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        totalTime: estimatedTime,
        step: steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
          image: step.image ? {
            '@type': 'ImageObject',
            url: step.image
          } : undefined
        }))
      };

      window.schemaManager.addCustomSchema('dynamic-howto', howToSchema);
    }

    return () => {
      if (window.schemaManager) {
        window.schemaManager.removeSchema('dynamic-howto');
      }
    };
  }, [title, description, steps, estimatedTime]);

  if (!steps || steps.length === 0) return null;

  return (
    <section className="howto-section" data-schema="howto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <HowToStep key={index} step={step} number={index + 1} />
        ))}
      </div>
    </section>
  );
};

/**
 * Paso individual de HowTo
 */
export const HowToStep = ({ step, number }) => {
  return (
    <div className="step flex items-start space-x-4" data-step={number}>
      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="step-title font-semibold text-gray-900 mb-2">{step.name}</h3>
        <p className="step-content text-gray-600 mb-3">{step.text}</p>
        {step.image && (
          <img 
            src={step.image} 
            alt={step.name}
            className="rounded-lg border border-gray-200 max-w-md"
          />
        )}
      </div>
    </div>
  );
};

/**
 * Componente para productos con schema
 */
export const ProductWithSchema = ({ product }) => {
  useEffect(() => {
    if (window.schemaManager && product) {
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        brand: {
          '@type': 'Brand',
          name: 'Bidi Converter'
        },
        offers: {
          '@type': 'Offer',
          price: product.price || '0',
          priceCurrency: product.currency || 'USD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Bidi Converter'
          }
        },
        aggregateRating: product.rating ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating.value,
          reviewCount: product.rating.count
        } : undefined
      };

      window.schemaManager.addCustomSchema('dynamic-product', productSchema);
    }

    return () => {
      if (window.schemaManager) {
        window.schemaManager.removeSchema('dynamic-product');
      }
    };
  }, [product]);

  return null;
};

/**
 * Componente para breadcrumbs con schema
 */
export const BreadcrumbsWithSchema = ({ items }) => {
  useEffect(() => {
    if (window.schemaManager && items?.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };

      window.schemaManager.addCustomSchema('dynamic-breadcrumbs', breadcrumbSchema);
    }

    return () => {
      if (window.schemaManager) {
        window.schemaManager.removeSchema('dynamic-breadcrumbs');
      }
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs flex items-center space-x-2 text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {item.url ? (
            <a href={item.url} className="hover:text-blue-600">
              {item.name}
            </a>
          ) : (
            <span className="text-gray-900">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

/**
 * Componente para artículos con schema
 */
export const ArticleWithSchema = ({ article, children }) => {
  useEffect(() => {
    if (window.schemaManager && article) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        image: article.image,
        author: {
          '@type': 'Organization',
          name: article.author || 'Bidi Converter Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Bidi Converter',
          logo: {
            '@type': 'ImageObject',
            url: 'https://bidiconverter.com/logo.png'
          }
        },
        datePublished: article.publishDate,
        dateModified: article.modifiedDate || article.publishDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': window.location.href
        },
        wordCount: article.wordCount,
        keywords: article.keywords?.join(', ')
      };

      window.schemaManager.addCustomSchema('dynamic-article', articleSchema);
    }

    return () => {
      if (window.schemaManager) {
        window.schemaManager.removeSchema('dynamic-article');
      }
    };
  }, [article]);

  return (
    <article className="article-with-schema">
      {children}
    </article>
  );
};

/**
 * Componente para reviews con schema
 */
export const ReviewWithSchema = ({ review }) => {
  useEffect(() => {
    if (window.schemaManager && review) {
      const reviewSchema = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Product',
          name: review.productName
        },
        author: {
          '@type': 'Person',
          name: review.authorName
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: '5'
        },
        reviewBody: review.text,
        datePublished: review.date
      };

      window.schemaManager.addCustomSchema('dynamic-review', reviewSchema);
    }

    return () => {
      if (window.schemaManager) {
        window.schemaManager.removeSchema('dynamic-review');
      }
    };
  }, [review]);

  return null;
};

/**
 * Hook para usar schema manager
 */
export const useSchema = () => {
  const [schemaManager, setSchemaManager] = useState(null);

  useEffect(() => {
    if (window.schemaManager) {
      setSchemaManager(window.schemaManager);
    } else {
      // Esperar a que se inicialice
      const checkManager = setInterval(() => {
        if (window.schemaManager) {
          setSchemaManager(window.schemaManager);
          clearInterval(checkManager);
        }
      }, 100);

      return () => clearInterval(checkManager);
    }
  }, []);

  const addSchema = (key, schema) => {
    if (schemaManager) {
      schemaManager.addCustomSchema(key, schema);
    }
  };

  const removeSchema = (key) => {
    if (schemaManager) {
      schemaManager.removeSchema(key);
    }
  };

  const getStats = () => {
    return schemaManager ? schemaManager.getSchemaStats() : null;
  };

  return {
    schemaManager,
    addSchema,
    removeSchema,
    getStats
  };
};

/**
 * Generar schema por tipo
 */
const generateSchemaByType = (type, data) => {
  const generators = {
    'faq': (data) => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }),
    'howto': (data) => ({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: data.title,
      description: data.description,
      totalTime: data.estimatedTime || 'PT5M',
      step: data.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text
      }))
    }),
    'product': (data) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      offers: {
        '@type': 'Offer',
        price: data.price || '0',
        priceCurrency: data.currency || 'USD'
      }
    })
  };

  const generator = generators[type];
  return generator ? generator(data) : null;
};

export default {
  SchemaInjector,
  FAQWithSchema,
  HowToWithSchema,
  ProductWithSchema,
  BreadcrumbsWithSchema,
  ArticleWithSchema,
  ReviewWithSchema,
  useSchema
};
