import React from 'react';
import SEO from '../components/SEO';
import { MessageCircle, Phone, Mail, Clock, Zap, Shield, Users, Star } from 'lucide-react';

const Contact = () => {
  // Función para abrir WhatsApp con mensaje predefinido
  const openWhatsApp = (message = '') => {
    const phoneNumber = '56994039964'; // Número sin el +
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Mensajes predefinidos para diferentes consultas
  const predefinedMessages = [
    {
      title: 'Soporte Técnico',
      message: 'Hola! Necesito ayuda técnica con Bidi Converter. Mi consulta es:',
      icon: '🔧',
      color: 'blue'
    },
    {
      title: 'Problema de Conversión',
      message: 'Hola! Tengo un problema al convertir archivos en Bidi Converter. Los detalles son:',
      icon: '⚠️',
      color: 'red'
    },
    {
      title: 'Sugerencia de Mejora',
      message: 'Hola! Tengo una sugerencia para mejorar Bidi Converter:',
      icon: '💡',
      color: 'yellow'
    },
    {
      title: 'Colaboración Empresarial',
      message: 'Hola! Estoy interesado en una colaboración empresarial con Bidi Converter. Me gustaría discutir:',
      icon: '🤝',
      color: 'purple'
    },
    {
      title: 'Consulta General',
      message: 'Hola! Tengo una consulta sobre Bidi Converter:',
      icon: '❓',
      color: 'green'
    }
  ];

  return (
    <>
      <SEO page="contact" />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Contáctanos por WhatsApp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            ¿Tienes preguntas sobre Bidi Converter? Contáctanos directamente por WhatsApp para recibir 
            asistencia inmediata y personalizada. ¡Estamos aquí para ayudarte!
          </p>
        </div>

        {/* WhatsApp CTA Principal */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 mb-16 text-white text-center animate-fade-in-up animation-delay-300">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">¡Chatea con Nosotros Ahora!</h2>
            <p className="text-xl mb-8 opacity-90">
              Respuesta inmediata • Soporte personalizado • Disponible 24/7
            </p>
            <button
              onClick={() => openWhatsApp('Hola! Me gustaría obtener más información sobre Bidi Converter.')}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 inline-flex items-center shadow-lg"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Abrir WhatsApp
              <span className="ml-2">→</span>
            </button>
            <p className="text-sm mt-4 opacity-80">
              +56 9 9403 9964 • Clic para abrir WhatsApp directamente
            </p>
          </div>
        </div>

        {/* Consultas Rápidas */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Consultas Rápidas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Selecciona el tipo de consulta para enviar un mensaje predefinido y agilizar tu comunicación
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predefinedMessages.map((item, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up cursor-pointer group`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                onClick={() => openWhatsApp(item.message)}
              >
                <div className={`bg-${item.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center group-hover:text-green-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Mensaje predefinido para {item.title.toLowerCase()}
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center text-green-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                    Enviar por WhatsApp
                    <MessageCircle className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información de Contacto Alternativa */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Otros Medios de Contacto</h2>
            <p className="text-gray-600">Si prefieres otros canales de comunicación, también estamos disponibles en:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-100 p-4 rounded-full">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">donluissalascortes@gmail.com</p>
                <p className="text-sm text-gray-500 mt-1">Respuesta en 24 horas</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-green-100 p-4 rounded-full">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Teléfono/WhatsApp</h3>
                <p className="text-gray-600">+56 9 9403 9964</p>
                <p className="text-sm text-gray-500 mt-1">Disponible para WhatsApp</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Rápido */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-gray-600">Respuestas rápidas a las consultas más comunes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 text-blue-600 mr-2" />
                ¿Es seguro usar Bidi Converter?
              </h3>
              <p className="text-gray-700 text-sm">
                Sí, completamente seguro. Todos los archivos se procesan localmente en tu navegador. 
                Nunca se envían a nuestros servidores, garantizando máxima privacidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Zap className="w-5 h-5 text-green-600 mr-2" />
                ¿Qué formatos soportan?
              </h3>
              <p className="text-gray-700 text-sm">
                Soportamos JPG, PNG, WebP, GIF, BMP para imágenes y PDF, DOCX, XLSX para documentos. 
                Constantemente añadimos nuevos formatos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                ¿Hay límites de uso?
              </h3>
              <p className="text-gray-700 text-sm">
                No hay límites estrictos. Recomendamos archivos de hasta 50MB para rendimiento óptimo. 
                Puedes procesar hasta 10 archivos simultáneamente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="w-5 h-5 text-yellow-600 mr-2" />
                ¿Es realmente gratuito?
              </h3>
              <p className="text-gray-700 text-sm">
                Sí, Bidi Converter es 100% gratuito. Sin marcas de agua, sin registro requerido, 
                sin límites ocultos. Nuestro compromiso con la comunidad.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            No dudes en contactarnos por WhatsApp. Nuestro equipo está listo para ayudarte con cualquier consulta, 
            problema técnico o sugerencia que tengas.
          </p>
          <button
            onClick={() => openWhatsApp('Hola! Tengo una consulta que no está en las preguntas frecuentes:')}
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 hover:scale-105 transition-all duration-300 inline-flex items-center shadow-lg"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Contactar por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
