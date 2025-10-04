import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Componente principal del blog
 */
export const BlogLayout = ({ children }) => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="blog-layout">
      <BlogHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>
      <BlogSidebar />
      <BlogFooter />
    </div>
  );
};

/**
 * Header del blog
 */
export const BlogHeader = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const blogTitles = {
    es: 'Blog de Bidi Converter',
    en: 'Bidi Converter Blog',
    hi: 'Bidi Converter ब्लॉग',
    id: 'Blog Bidi Converter',
    ru: 'Блог Bidi Converter',
    ko: 'Bidi Converter 블로그'
  };

  const blogSubtitles = {
    es: 'Guías, tutoriales y consejos sobre conversión de archivos',
    en: 'Guides, tutorials and tips about file conversion',
    hi: 'फाइल कन्वर्जन के बारे में गाइड, ट्यूटोरियल और टिप्स',
    id: 'Panduan, tutorial dan tips tentang konversi file',
    ru: 'Руководства, учебники и советы по конвертации файлов',
    ko: '파일 변환에 대한 가이드, 튜토리얼 및 팁'
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {blogTitles[language] || blogTitles.en}
        </h1>
        <p className="text-xl opacity-90">
          {blogSubtitles[language] || blogSubtitles.en}
        </p>
      </div>
    </header>
  );
};

/**
 * Lista de artículos del blog
 */
export const BlogArticleList = ({ articles = [], loading = false }) => {
  const { language } = useLanguage();

  if (loading) {
    return <BlogLoadingSkeleton />;
  }

  if (articles.length === 0) {
    return <BlogEmptyState />;
  }

  return (
    <div className="space-y-8">
      {articles.map(article => (
        <BlogArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

/**
 * Tarjeta de artículo
 */
export const BlogArticleCard = ({ article }) => {
  const { language } = useLanguage();
  
  const readMoreTexts = {
    es: 'Leer más',
    en: 'Read more',
    hi: 'और पढ़ें',
    id: 'Baca selengkapnya',
    ru: 'Читать далее',
    ko: '더 읽기'
  };

  const readingTimeTexts = {
    es: 'min de lectura',
    en: 'min read',
    hi: 'मिनट पढ़ें',
    id: 'menit baca',
    ru: 'мин чтения',
    ko: '분 읽기'
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.featuredImage && (
        <img 
          src={article.featuredImage} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <time dateTime={article.publishDate}>
            {new Date(article.publishDate).toLocaleDateString(language)}
          </time>
          <span className="mx-2">•</span>
          <span>{article.readingTime} {readingTimeTexts[language] || readingTimeTexts.en}</span>
          {article.category && (
            <>
              <span className="mx-2">•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {article.category}
              </span>
            </>
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          <a href={`/blog/${article.slug}`}>
            {article.title}
          </a>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {article.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>

          <a 
            href={`/blog/${article.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
          >
            {readMoreTexts[language] || readMoreTexts.en}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

/**
 * Artículo individual
 */
export const BlogArticle = ({ article }) => {
  const { language } = useLanguage();
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    // Cargar artículos relacionados
    if (window.blogManager) {
      const related = window.blogManager.getRelatedArticles(article.id, 3);
      setRelatedArticles(related);
    }
  }, [article.id]);

  if (!article) {
    return <BlogArticleNotFound />;
  }

  return (
    <article className="max-w-4xl mx-auto">
      <BlogArticleHeader article={article} />
      <BlogArticleContent article={article} />
      <BlogArticleFooter article={article} />
      {relatedArticles.length > 0 && (
        <BlogRelatedArticles articles={relatedArticles} />
      )}
    </article>
  );
};

/**
 * Header del artículo
 */
export const BlogArticleHeader = ({ article }) => {
  const { language } = useLanguage();

  const publishedTexts = {
    es: 'Publicado el',
    en: 'Published on',
    hi: 'प्रकाशित',
    id: 'Diterbitkan pada',
    ru: 'Опубликовано',
    ko: '게시일'
  };

  return (
    <header className="mb-8">
      <div className="mb-4">
        {article.category && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        )}
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {article.title}
      </h1>

      <p className="text-xl text-gray-600 mb-6">
        {article.description}
      </p>

      <div className="flex items-center text-sm text-gray-500 border-b border-gray-200 pb-6">
        <div className="flex items-center">
          <img 
            src="/images/author-avatar.jpg" 
            alt="Author"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-medium text-gray-900">{article.author || 'Bidi Converter Team'}</div>
            <div>
              {publishedTexts[language] || publishedTexts.en} {' '}
              <time dateTime={article.publishDate}>
                {new Date(article.publishDate).toLocaleDateString(language)}
              </time>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <span>{article.readingTime} min</span>
          <BlogShareButtons article={article} />
        </div>
      </div>
    </header>
  );
};

/**
 * Contenido del artículo
 */
export const BlogArticleContent = ({ article }) => {
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    // Generar tabla de contenidos
    const headings = article.content?.match(/^#{2,3}\s+(.+)$/gm) || [];
    const toc = headings.map((heading, index) => {
      const level = heading.match(/^#{2,3}/)[0].length - 1;
      const text = heading.replace(/^#{2,3}\s+/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      return { id, text, level, index };
    });
    
    setTableOfContents(toc);
  }, [article.content]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Tabla de contenidos */}
      {tableOfContents.length > 0 && (
        <aside className="lg:col-span-1">
          <div className="sticky top-8">
            <BlogTableOfContents items={tableOfContents} />
          </div>
        </aside>
      )}

      {/* Contenido principal */}
      <div className={`${tableOfContents.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.htmlContent || article.content }}
        />
        
        {/* Tags del artículo */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <a
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Tabla de contenidos
 */
export const BlogTableOfContents = ({ items }) => {
  const { language } = useLanguage();
  
  const tocTitles = {
    es: 'Tabla de contenidos',
    en: 'Table of contents',
    hi: 'विषय सूची',
    id: 'Daftar isi',
    ru: 'Содержание',
    ko: '목차'
  };

  return (
    <nav className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3">
        {tocTitles[language] || tocTitles.en}
      </h3>
      <ul className="space-y-2 text-sm">
        {items.map(item => (
          <li key={item.id} className={`${item.level === 3 ? 'ml-4' : ''}`}>
            <a
              href={`#${item.id}`}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * Botones de compartir
 */
export const BlogShareButtons = ({ article }) => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(article.title);

  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      icon: '🐦',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: '📘',
      color: 'hover:text-blue-600'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      icon: '💼',
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      {shareLinks.map(link => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-400 ${link.color} transition-colors`}
          title={`Share on ${link.name}`}
        >
          <span className="text-lg">{link.icon}</span>
        </a>
      ))}
    </div>
  );
};

/**
 * Footer del artículo
 */
export const BlogArticleFooter = ({ article }) => {
  const { language } = useLanguage();

  const authorBioTexts = {
    es: 'Sobre el autor',
    en: 'About the author',
    hi: 'लेखक के बारे में',
    id: 'Tentang penulis',
    ru: 'Об авторе',
    ko: '저자 소개'
  };

  return (
    <footer className="mt-12 pt-8 border-t border-gray-200">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          {authorBioTexts[language] || authorBioTexts.en}
        </h3>
        <div className="flex items-start space-x-4">
          <img 
            src="/images/team-avatar.jpg" 
            alt="Bidi Converter Team"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h4 className="font-medium text-gray-900">Bidi Converter Team</h4>
            <p className="text-gray-600 text-sm mt-1">
              Expertos en conversión de archivos y optimización web. Creamos herramientas gratuitas 
              para hacer tu trabajo más eficiente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Artículos relacionados
 */
export const BlogRelatedArticles = ({ articles }) => {
  const { language } = useLanguage();

  const relatedTitles = {
    es: 'Artículos relacionados',
    en: 'Related articles',
    hi: 'संबंधित लेख',
    id: 'Artikel terkait',
    ru: 'Похожие статьи',
    ko: '관련 기사'
  };

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {relatedTitles[language] || relatedTitles.en}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map(article => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {article.featuredImage && (
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="w-full h-32 object-cover"
              />
            )}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                <a href={`/blog/${article.slug}`} className="hover:text-blue-600">
                  {article.title}
                </a>
              </h4>
              <p className="text-gray-600 text-sm line-clamp-2">
                {article.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * Sidebar del blog
 */
export const BlogSidebar = () => {
  const { language } = useLanguage();
  const [popularArticles, setPopularArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Cargar contenido del sidebar
    if (window.blogManager) {
      setPopularArticles(window.blogManager.getPopularArticles(5));
      setCategories(window.blogManager.getCategories());
    }
  }, []);

  const sidebarTitles = {
    es: {
      popular: 'Artículos populares',
      categories: 'Categorías',
      newsletter: 'Newsletter'
    },
    en: {
      popular: 'Popular articles',
      categories: 'Categories',
      newsletter: 'Newsletter'
    }
  };

  const titles = sidebarTitles[language] || sidebarTitles.en;

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-8 space-y-8">
        {/* Artículos populares */}
        {popularArticles.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{titles.popular}</h3>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <div key={article.id} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <a 
                      href={`/blog/${article.slug}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                    >
                      {article.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categorías */}
        {categories.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{titles.categories}</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <a
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                    {category.count}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <BlogNewsletterSignup />
      </div>
    </aside>
  );
};

/**
 * Signup de newsletter
 */
export const BlogNewsletterSignup = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const newsletterTexts = {
    es: {
      title: 'Newsletter',
      description: 'Recibe los últimos artículos y consejos directamente en tu email',
      placeholder: 'Tu email',
      button: 'Suscribirse',
      success: '¡Gracias por suscribirte!'
    },
    en: {
      title: 'Newsletter',
      description: 'Get the latest articles and tips directly in your email',
      placeholder: 'Your email',
      button: 'Subscribe',
      success: 'Thanks for subscribing!'
    }
  };

  const texts = newsletterTexts[language] || newsletterTexts.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simular suscripción
      setSubscribed(true);
      
      // Trackear suscripción
      if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
          event_category: 'Blog',
          event_label: language
        });
      }
    }
  };

  if (subscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-2xl mb-2">✅</div>
        <p className="text-green-800 font-medium">{texts.success}</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-2">{texts.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{texts.description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={texts.placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {texts.button}
        </button>
      </form>
    </div>
  );
};

/**
 * Estados de carga y error
 */
export const BlogLoadingSkeleton = () => (
  <div className="space-y-8">
    {[1, 2, 3].map(i => (
      <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    ))}
  </div>
);

export const BlogEmptyState = () => {
  const { language } = useLanguage();
  
  const emptyTexts = {
    es: 'No hay artículos disponibles',
    en: 'No articles available'
  };

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📝</div>
      <p className="text-gray-600">
        {emptyTexts[language] || emptyTexts.en}
      </p>
    </div>
  );
};

export const BlogArticleNotFound = () => {
  const { language } = useLanguage();
  
  const notFoundTexts = {
    es: 'Artículo no encontrado',
    en: 'Article not found'
  };

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">❌</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {notFoundTexts[language] || notFoundTexts.en}
      </h1>
      <a href="/blog" className="text-blue-600 hover:text-blue-800">
        ← Volver al blog
      </a>
    </div>
  );
};

export default BlogLayout;
