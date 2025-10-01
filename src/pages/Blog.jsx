import React from 'react';
import { Link } from 'react-router-dom';
import { FileImage, Calendar, User, ArrowRight, BookOpen, Zap, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Guía Completa: JPG vs PNG vs WebP - ¿Cuál Elegir en 2024?",
      excerpt: "Descubre las diferencias clave entre los formatos de imagen más populares y cuándo usar cada uno para obtener los mejores resultados.",
      content: `
        <h2>Introducción a los Formatos de Imagen</h2>
        <p>En el mundo digital actual, elegir el formato de imagen correcto puede marcar la diferencia entre un sitio web rápido y uno lento, entre una imagen de alta calidad y una pixelada. Esta guía completa te ayudará a entender las diferencias entre JPG, PNG y WebP.</p>
        
        <h3>JPG (JPEG) - El Veterano Confiable</h3>
        <p>El formato JPG, desarrollado por el Joint Photographic Experts Group, ha sido el estándar de facto para fotografías digitales durante décadas. Sus características principales incluyen:</p>
        <ul>
          <li><strong>Compresión con pérdida:</strong> Reduce significativamente el tamaño del archivo eliminando información visual que el ojo humano no percibe fácilmente.</li>
          <li><strong>Ideal para fotografías:</strong> Excelente para imágenes con muchos colores y gradientes suaves.</li>
          <li><strong>Compatibilidad universal:</strong> Soportado por todos los navegadores y dispositivos.</li>
          <li><strong>Tamaños de archivo pequeños:</strong> Perfecto para web y almacenamiento eficiente.</li>
        </ul>
        
        <h4>Cuándo usar JPG:</h4>
        <ul>
          <li>Fotografías y imágenes con muchos colores</li>
          <li>Cuando el tamaño del archivo es prioritario</li>
          <li>Imágenes para redes sociales</li>
          <li>Contenido web donde la velocidad de carga es crucial</li>
        </ul>
        
        <h3>PNG - Calidad Sin Compromisos</h3>
        <p>PNG (Portable Network Graphics) fue creado como una alternativa libre de patentes al formato GIF. Sus ventajas incluyen:</p>
        <ul>
          <li><strong>Compresión sin pérdida:</strong> Mantiene toda la información original de la imagen.</li>
          <li><strong>Soporte para transparencia:</strong> Canal alfa que permite fondos transparentes.</li>
          <li><strong>Ideal para gráficos:</strong> Perfecto para logos, iconos y texto.</li>
          <li><strong>Calidad superior:</strong> No hay degradación de la imagen.</li>
        </ul>
        
        <h4>Cuándo usar PNG:</h4>
        <ul>
          <li>Logos y gráficos con texto</li>
          <li>Imágenes que requieren transparencia</li>
          <li>Screenshots y capturas de pantalla</li>
          <li>Cuando la calidad es más importante que el tamaño</li>
        </ul>
        
        <h3>WebP - El Futuro de las Imágenes Web</h3>
        <p>Desarrollado por Google, WebP combina lo mejor de JPG y PNG:</p>
        <ul>
          <li><strong>Compresión superior:</strong> 25-35% más eficiente que JPG</li>
          <li><strong>Soporte para transparencia:</strong> Como PNG pero con archivos más pequeños</li>
          <li><strong>Compresión con y sin pérdida:</strong> Flexibilidad total</li>
          <li><strong>Soporte para animación:</strong> Alternativa moderna a GIF</li>
        </ul>
        
        <h4>Cuándo usar WebP:</h4>
        <ul>
          <li>Sitios web modernos que priorizan la velocidad</li>
          <li>Cuando necesitas el mejor balance calidad/tamaño</li>
          <li>Aplicaciones móviles</li>
          <li>E-commerce y galerías de imágenes</li>
        </ul>
        
        <h3>Comparación de Rendimiento</h3>
        <p>Según estudios de Google, WebP puede reducir el tamaño de archivo:</p>
        <ul>
          <li>25-35% comparado con JPG</li>
          <li>26% comparado con PNG</li>
          <li>Hasta 64% comparado con PNG para imágenes con transparencia</li>
        </ul>
        
        <h3>Conclusión</h3>
        <p>La elección del formato depende de tus necesidades específicas. Para máxima compatibilidad, usa JPG para fotos y PNG para gráficos. Para sitios web modernos, WebP ofrece el mejor rendimiento. Con Bidi Converter, puedes experimentar fácilmente con diferentes formatos para encontrar el equilibrio perfecto entre calidad y tamaño.</p>
      `,
      date: "2024-09-25",
      author: "Equipo Bidi Converter",
      category: "Guías Técnicas",
      readTime: "8 min"
    },
    {
      id: 2,
      title: "Optimización de Imágenes para Web: Mejores Prácticas 2024",
      excerpt: "Aprende técnicas avanzadas para optimizar imágenes web, reducir tiempos de carga y mejorar la experiencia del usuario sin sacrificar calidad.",
      content: `
        <h2>La Importancia de la Optimización de Imágenes</h2>
        <p>Las imágenes representan en promedio el 65% del peso total de una página web. Una optimización adecuada puede reducir los tiempos de carga hasta en un 80%, mejorando significativamente la experiencia del usuario y el SEO.</p>
        
        <h3>1. Elegir el Formato Correcto</h3>
        <h4>Matriz de Decisión por Tipo de Imagen:</h4>
        <ul>
          <li><strong>Fotografías complejas:</strong> JPG (calidad 80-90%) o WebP</li>
          <li><strong>Gráficos simples:</strong> PNG-8 o SVG</li>
          <li><strong>Logos con transparencia:</strong> PNG-24 o SVG</li>
          <li><strong>Animaciones:</strong> WebP animado o GIF optimizado</li>
        </ul>
        
        <h3>2. Técnicas de Compresión Avanzadas</h3>
        <h4>Compresión Progresiva:</h4>
        <p>Los JPG progresivos cargan en múltiples pasadas, mostrando primero una versión de baja calidad que mejora gradualmente. Esto mejora la percepción de velocidad.</p>
        
        <h4>Optimización de Paleta de Colores:</h4>
        <p>Para PNG, reducir la paleta de colores puede disminuir significativamente el tamaño del archivo sin pérdida visual notable.</p>
        
        <h3>3. Responsive Images y Srcset</h3>
        <p>Implementa imágenes responsivas para servir diferentes resoluciones según el dispositivo:</p>
        <pre><code>&lt;img src="imagen-800w.jpg" 
     srcset="imagen-400w.jpg 400w, 
             imagen-800w.jpg 800w, 
             imagen-1200w.jpg 1200w"
     sizes="(max-width: 400px) 400px, 
            (max-width: 800px) 800px, 
            1200px"
     alt="Descripción de la imagen"&gt;</code></pre>
        
        <h3>4. Lazy Loading</h3>
        <p>Carga las imágenes solo cuando están a punto de entrar en el viewport:</p>
        <pre><code>&lt;img src="imagen.jpg" loading="lazy" alt="Descripción"&gt;</code></pre>
        
        <h3>5. Herramientas de Optimización</h3>
        <h4>Automáticas:</h4>
        <ul>
          <li><strong>Bidi Converter:</strong> Conversión y optimización en el navegador</li>
          <li><strong>ImageOptim:</strong> Compresión sin pérdida</li>
          <li><strong>TinyPNG:</strong> Compresión inteligente</li>
        </ul>
        
        <h4>Línea de Comandos:</h4>
        <ul>
          <li><strong>cwebp:</strong> Conversión a WebP</li>
          <li><strong>jpegoptim:</strong> Optimización de JPG</li>
          <li><strong>pngquant:</strong> Compresión de PNG</li>
        </ul>
        
        <h3>6. Métricas y Monitoreo</h3>
        <h4>Core Web Vitals:</h4>
        <ul>
          <li><strong>LCP (Largest Contentful Paint):</strong> Debe ocurrir en menos de 2.5s</li>
          <li><strong>CLS (Cumulative Layout Shift):</strong> Menor a 0.1</li>
          <li><strong>FID (First Input Delay):</strong> Menor a 100ms</li>
        </ul>
        
        <h4>Herramientas de Medición:</h4>
        <ul>
          <li>Google PageSpeed Insights</li>
          <li>GTmetrix</li>
          <li>WebPageTest</li>
          <li>Lighthouse</li>
        </ul>
        
        <h3>7. Técnicas Avanzadas</h3>
        <h4>Art Direction:</h4>
        <p>Usa diferentes imágenes para diferentes breakpoints:</p>
        <pre><code>&lt;picture&gt;
  &lt;source media="(min-width: 800px)" srcset="desktop.jpg"&gt;
  &lt;source media="(min-width: 400px)" srcset="tablet.jpg"&gt;
  &lt;img src="mobile.jpg" alt="Descripción"&gt;
&lt;/picture&gt;</code></pre>
        
        <h4>Placeholders:</h4>
        <ul>
          <li><strong>LQIP (Low Quality Image Placeholder):</strong> Versión muy comprimida</li>
          <li><strong>Blur-up:</strong> Imagen borrosa que se enfoca al cargar</li>
          <li><strong>Color dominante:</strong> Color promedio como placeholder</li>
        </ul>
        
        <h3>8. Casos de Uso Específicos</h3>
        <h4>E-commerce:</h4>
        <ul>
          <li>Múltiples resoluciones para zoom</li>
          <li>WebP con fallback a JPG</li>
          <li>Lazy loading para galerías</li>
        </ul>
        
        <h4>Blogs y Medios:</h4>
        <ul>
          <li>JPG progresivo para artículos</li>
          <li>WebP para mejor SEO</li>
          <li>Compresión adaptativa según contenido</li>
        </ul>
        
        <h3>Conclusión</h3>
        <p>La optimización de imágenes es un proceso continuo que requiere balance entre calidad visual, tamaño de archivo y compatibilidad. Con las herramientas adecuadas como Bidi Converter y siguiendo estas mejores prácticas, puedes lograr mejoras significativas en el rendimiento de tu sitio web.</p>
      `,
      date: "2024-09-20",
      author: "María González",
      category: "Optimización Web",
      readTime: "12 min"
    }
  ];

  return (
    <>
      <SEO page="blog" />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog y Guías Técnicas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Aprende todo sobre formatos de imagen, optimización web y mejores prácticas 
            para convertir y gestionar tus archivos digitales de forma eficiente.
          </p>
        </div>

        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('es-ES')}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/converter"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                    >
                      <FileImage className="w-5 h-5 mr-2" />
                      Probar Convertidor
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    
                    <div className="flex space-x-4">
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        Compartir
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Recursos Adicionales */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recursos Útiles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Convertidor Rápido
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Convierte tus imágenes entre diferentes formatos en segundos.
              </p>
              <Link
                to="/converter"
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Usar Ahora →
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Procesamiento Seguro
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Tus archivos se procesan localmente, nunca salen de tu dispositivo.
              </p>
              <Link
                to="/privacy"
                className="text-green-600 font-medium hover:text-green-700"
              >
                Saber Más →
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <FileImage className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Múltiples Formatos
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Soportamos JPG, PNG, WebP, GIF y más formatos populares.
              </p>
              <Link
                to="/about"
                className="text-purple-600 font-medium hover:text-purple-700"
              >
                Ver Todos →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
