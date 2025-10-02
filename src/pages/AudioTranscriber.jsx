import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Download, 
  Copy, 
  FileText, 
  Clock, 
  Volume2,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye,
  Save
} from 'lucide-react';

const AudioTranscriber = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [language, setLanguage] = useState('es-ES');
  const [confidence, setConfidence] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [exportFormat, setExportFormat] = useState('txt');
  const [showPreview, setShowPreview] = useState(false);
  const [micPermission, setMicPermission] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);
  const canvasRef = useRef(null);
  const shouldContinueRecordingRef = useRef(false);
  const mediaStreamRef = useRef(null);

  // Verificar permisos del micrófono
  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' });
      setMicPermission(result.state);
      
      result.addEventListener('change', () => {
        setMicPermission(result.state);
      });
    } catch (err) {
      console.log('Permissions API no disponible, solicitando permisos directamente');
    }
  };

  // Configurar visualización de audio
  const setupAudioVisualization = async (stream) => {
    try {
      // Limpiar contexto anterior si existe
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        await audioContextRef.current.close();
      }
      
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      
      drawWaveform();
    } catch (err) {
      console.error('Error configurando visualización:', err);
    }
  };

  // Dibujar forma de onda
  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calcular nivel promedio
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      setAudioLevel(average / 255);
      
      // Limpiar canvas
      canvasCtx.fillStyle = 'rgb(249, 250, 251)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar barras
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;
        
        // Gradiente de color basado en intensidad
        const hue = (dataArray[i] / 255) * 120;
        canvasCtx.fillStyle = `hsl(${200 + hue}, 80%, 50%)`;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    draw();
  };

  // Configurar reconocimiento de voz
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart + ' ';
            setConfidence(event.results[i][0].confidence);
          } else {
            interimTranscript += transcriptPart;
          }
        }

        setTranscript(prev => prev + finalTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Error de reconocimiento:', event.error);
        let errorMsg = 'Error de reconocimiento';
        
        switch(event.error) {
          case 'not-allowed':
            errorMsg = 'Permiso de micrófono denegado. Por favor, permite el acceso al micrófono.';
            break;
          case 'no-speech':
            errorMsg = 'No se detectó voz. Intenta hablar más cerca del micrófono.';
            break;
          case 'audio-capture':
            errorMsg = 'No se pudo capturar audio. Verifica que tu micrófono funcione.';
            break;
          case 'network':
            errorMsg = 'Error de red. Verifica tu conexión a internet.';
            break;
          default:
            errorMsg = `Error: ${event.error}`;
        }
        
        setError(errorMsg);
        stopRecording();
      };

      recognitionRef.current.onend = () => {
        // Solo reiniciar si el usuario no ha detenido manualmente
        if (shouldContinueRecordingRef.current) {
          // Reiniciar automáticamente si aún está grabando
          try {
            recognitionRef.current.start();
          } catch (err) {
            console.error('Error al reiniciar:', err);
            if (shouldContinueRecordingRef.current) {
              stopRecording();
            }
          }
        } else {
          // Usuario detuvo manualmente, asegurar limpieza completa
          setIsRecording(false);
          setAudioLevel(0);
          
          // Cerrar stream del micrófono si existe
          if (microphoneRef.current && microphoneRef.current.mediaStream) {
            microphoneRef.current.mediaStream.getTracks().forEach(track => track.stop());
          }
        }
      };
    } else {
      setError('Tu navegador no soporta reconocimiento de voz. Prueba con Chrome, Edge o Safari.');
    }

    return () => {
      shouldContinueRecordingRef.current = false;
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.error('Error al detener reconocimiento:', err);
        }
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch (err) {
          console.error('Error al cerrar AudioContext en cleanup:', err);
        }
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [language, isRecording]);

  // Detener grabación completamente
  const stopRecording = async () => {
    console.log('🛑🛑🛑 DETENIENDO GRABACIÓN COMPLETAMENTE...');
    
    // PASO 1: Marcar inmediatamente que NO se debe continuar
    shouldContinueRecordingRef.current = false;
    setIsRecording(false);
    
    // Esperar un momento para que el estado se propague
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // PASO 2: CRÍTICO - Detener PRIMERO los tracks del MediaStream
    // Esto cierra el micrófono a nivel del sistema operativo
    if (mediaStreamRef.current) {
      console.log('🎤 Cerrando stream del micrófono...');
      const tracks = mediaStreamRef.current.getTracks();
      tracks.forEach(track => {
        console.log(`   Deteniendo track: ${track.label} (estado: ${track.readyState})`);
        track.stop();
        console.log(`   ✅ Track detenido (nuevo estado: ${track.readyState})`);
      });
      mediaStreamRef.current = null;
      console.log('✅✅✅ TODOS LOS TRACKS DE AUDIO DETENIDOS');
    }
    
    // PASO 3: Detener reconocimiento de voz
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort(); // Abortar primero
        recognitionRef.current.stop();  // Luego detener
        console.log('✅ Reconocimiento de voz abortado y detenido');
      } catch (err) {
        console.log('ℹ️ Reconocimiento ya estaba detenido');
      }
    }
    
    // PASO 4: Desconectar nodo del micrófono ANTES de cerrar el contexto
    if (microphoneRef.current) {
      try {
        microphoneRef.current.disconnect();
        console.log('✅ Nodo del micrófono desconectado');
      } catch (err) {
        console.log('ℹ️ Error al desconectar micrófono:', err.message);
      }
      microphoneRef.current = null;
    }
    
    // PASO 5: Detener animación
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      console.log('✅ Animación cancelada');
    }
    
    // PASO 6: Cerrar AudioContext al final
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== 'closed') {
          await audioContextRef.current.close();
          console.log('✅ AudioContext cerrado');
        }
      } catch (err) {
        console.log('ℹ️ Error al cerrar AudioContext:', err.message);
      }
      audioContextRef.current = null;
    }
    
    // Resetear UI
    setAudioLevel(0);
    
    console.log('✅✅✅ MICRÓFONO COMPLETAMENTE BLOQUEADO Y CERRADO ✅✅✅');
    console.log('👆 El indicador del navegador debe desaparecer ahora');
  };

  // Iniciar/detener grabación
  const toggleRecording = async () => {
    if (!recognitionRef.current) {
      setError('Reconocimiento de voz no disponible');
      return;
    }

    if (isRecording) {
      stopRecording();
    } else {
      try {
        setError('');
        setSuccess('');
        
        console.log('🎤 Solicitando acceso al micrófono...');
        
        // Solicitar permiso de micrófono
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Guardar referencia al stream (CRÍTICO para poder cerrarlo después)
        mediaStreamRef.current = stream;
        console.log('✅ Stream de micrófono obtenido');
        
        // Configurar visualización
        await setupAudioVisualization(stream);
        
        // Marcar que se debe continuar grabando (para reinicio automático)
        shouldContinueRecordingRef.current = true;
        
        // Iniciar reconocimiento
        recognitionRef.current.start();
        setIsRecording(true);
        setSuccess('🎤 Grabación iniciada. Habla claramente cerca del micrófono.');
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Error al iniciar grabación:', err);
        let errorMsg = 'No se pudo acceder al micrófono.';
        
        if (err.name === 'NotAllowedError') {
          errorMsg = '❌ Permiso denegado. Por favor, permite el acceso al micrófono en la configuración de tu navegador.';
        } else if (err.name === 'NotFoundError') {
          errorMsg = '❌ No se encontró micrófono. Verifica que tu dispositivo tenga un micrófono conectado.';
        } else if (err.name === 'NotReadableError') {
          errorMsg = '❌ El micrófono está siendo usado por otra aplicación. Cierra otras apps que usen el micrófono.';
        }
        
        setError(errorMsg);
        setIsRecording(false);
      }
    }
  };

  // Manejar archivo de audio y transcribir automáticamente
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('audio/')) {
      setError('Por favor selecciona un archivo de audio válido (MP3, WAV, M4A, etc.)');
      return;
    }
    
    setAudioFile(file);
    setError('');
    setTranscriptionProgress(0);
    
    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
      
      // Esperar a que se cargue el audio
      audioRef.current.onloadedmetadata = () => {
        const duration = audioRef.current.duration;
        setDuration(duration);
        setSuccess(`✅ Audio cargado: ${formatTime(duration)}. Haz clic en "Transcribir" para comenzar.`);
      };
    }
  };
  
  // Transcribir archivo de audio usando Web Audio API
  const startFileTranscription = async () => {
    if (!audioRef.current || !recognitionRef.current) {
      setError('No se puede transcribir el audio');
      return;
    }
    
    setIsTranscribing(true);
    setTranscriptionProgress(0);
    setError('');
    setTranscript('');
    
    try {
      console.log('🎧 Iniciando transcripción de archivo...');
      
      // Crear AudioContext para capturar el audio
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      // Crear nodo de destino para capturar el audio
      const destination = audioContext.createMediaStreamDestination();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      // Conectar el audio a los altavoces Y al destino
      source.connect(audioContext.destination); // Para escuchar
      source.connect(destination); // Para capturar
      
      // Guardar el stream
      mediaStreamRef.current = destination.stream;
      audioContextRef.current = audioContext;
      
      // Configurar reconocimiento con el stream capturado
      shouldContinueRecordingRef.current = true;
      
      // Iniciar reconocimiento
      recognitionRef.current.start();
      console.log('✅ Reconocimiento iniciado');
      
      // Reproducir audio
      await audioRef.current.play();
      setIsPlaying(true);
      console.log('✅ Audio reproduciéndose');
      
      // Actualizar progreso mientras se reproduce
      const progressInterval = setInterval(() => {
        if (audioRef.current) {
          const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setTranscriptionProgress(Math.min(progress, 100));
          
          console.log(`📊 Progreso: ${Math.round(progress)}% - ${formatTime(audioRef.current.currentTime)}`);
          
          if (audioRef.current.ended) {
            clearInterval(progressInterval);
            finishFileTranscription();
          }
        }
      }, 500);
      
      // Cuando termina el audio
      audioRef.current.onended = () => {
        clearInterval(progressInterval);
        finishFileTranscription();
      };
      
      setSuccess('🎧 Transcribiendo audio... El audio se está procesando.');
      
    } catch (err) {
      console.error('❌ Error al transcribir archivo:', err);
      
      let errorMsg = 'Error al iniciar transcripción del archivo.';
      
      // Si el problema es que no puede capturar el audio del archivo
      if (err.name === 'NotAllowedError' || err.message.includes('DOMException')) {
        errorMsg = '⚠️ Limitación del navegador: El Web Speech API solo puede transcribir audio del micrófono en tiempo real.\n\n' +
                   '💡 Opciones:\n' +
                   '1. Graba en vivo con el micrófono\n' +
                   '2. Reproduce el audio y habla lo que escuchas\n' +
                   '3. Usa un servicio de transcripción profesional (Whisper AI, Google Speech-to-Text)';
      }
      
      setError(errorMsg);
      setIsTranscribing(false);
      setTranscriptionProgress(0);
    }
  };
  
  // Finalizar transcripción de archivo
  const finishFileTranscription = () => {
    console.log('✅ Transcripción de archivo completada');
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.log('Reconocimiento ya detenido');
      }
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    shouldContinueRecordingRef.current = false;
    setIsTranscribing(false);
    setIsPlaying(false);
    setTranscriptionProgress(100);
    setSuccess(`✅ Transcripción completada. ${transcript.split(' ').length} palabras transcritas.`);
    
    setTimeout(() => setSuccess(''), 5000);
  };

  // Controles de reproducción
  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Actualizar tiempo de reproducción
  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Formatear tiempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Limpiar transcripción
  const clearTranscript = () => {
    // Si está grabando, detener primero
    if (isRecording) {
      stopRecording();
    }
    
    setTranscript('');
    setConfidence(0);
    setError('');
    setSuccess('');
  };

  // Copiar al portapapeles
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      setSuccess('Transcripción copiada al portapapeles');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al copiar al portapapeles');
    }
  };

  // Generar contenido formateado
  const generateFormattedContent = () => {
    const now = new Date();
    const timestamp = now.toLocaleString('es-ES');
    
    const metadata = {
      fecha: timestamp,
      idioma: language,
      confianza: Math.round(confidence * 100) + '%',
      palabras: transcript.trim().split(/\s+/).length,
      caracteres: transcript.length
    };

    switch (exportFormat) {
      case 'markdown':
        return `# Transcripción de Audio

## Información
- **Fecha**: ${metadata.fecha}
- **Idioma**: ${metadata.idioma}
- **Confianza**: ${metadata.confianza}
- **Palabras**: ${metadata.palabras}
- **Caracteres**: ${metadata.caracteres}

## Contenido

${transcript}

---
*Transcrito con Bidi Converter - bidiconverter.com*`;

      case 'html':
        return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transcripción de Audio</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .metadata { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .content { background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
        .footer { text-align: center; margin-top: 20px; color: #6c757d; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📝 Transcripción de Audio</h1>
    </div>
    
    <div class="metadata">
        <h3>📊 Información</h3>
        <p><strong>Fecha:</strong> ${metadata.fecha}</p>
        <p><strong>Idioma:</strong> ${metadata.idioma}</p>
        <p><strong>Confianza:</strong> ${metadata.confianza}</p>
        <p><strong>Palabras:</strong> ${metadata.palabras}</p>
        <p><strong>Caracteres:</strong> ${metadata.caracteres}</p>
    </div>
    
    <div class="content">
        <h3>💬 Contenido</h3>
        <p>${transcript.replace(/\n/g, '<br>')}</p>
    </div>
    
    <div class="footer">
        <p>Transcrito con <strong>Bidi Converter</strong> - <a href="https://bidiconverter.com">bidiconverter.com</a></p>
    </div>
</body>
</html>`;

      case 'json':
        return JSON.stringify({
          transcripcion: {
            contenido: transcript,
            metadata: metadata,
            generado_por: "Bidi Converter",
            url: "https://bidiconverter.com"
          }
        }, null, 2);

      default: // txt
        return `TRANSCRIPCIÓN DE AUDIO
=====================

Fecha: ${metadata.fecha}
Idioma: ${metadata.idioma}
Confianza: ${metadata.confianza}
Palabras: ${metadata.palabras}
Caracteres: ${metadata.caracteres}

CONTENIDO:
----------

${transcript}

---
Transcrito con Bidi Converter - bidiconverter.com`;
    }
  };

  // Descargar transcripción
  const downloadTranscript = () => {
    if (!transcript.trim()) {
      setError('No hay contenido para descargar');
      return;
    }

    const content = generateFormattedContent();
    const extensions = { txt: 'txt', markdown: 'md', html: 'html', json: 'json' };
    const mimeTypes = { 
      txt: 'text/plain', 
      markdown: 'text/markdown', 
      html: 'text/html', 
      json: 'application/json' 
    };

    const blob = new Blob([content], { type: mimeTypes[exportFormat] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcripcion_${Date.now()}.${extensions[exportFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccess(`Transcripción descargada como ${exportFormat.toUpperCase()}`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const languages = [
    { code: 'es-ES', name: 'Español (España)' },
    { code: 'es-MX', name: 'Español (México)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'pt-BR', name: 'Português (Brasil)' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'it-IT', name: 'Italiano' }
  ];

  return (
    <>
      <SEO page="transcriber" />
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            🎤 Transcriptor de Audio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Convierte audio a texto con reconocimiento de voz avanzado. Soporta múltiples idiomas 
            y exporta en formatos profesionales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de Control */}
          <div className="lg:col-span-1 space-y-6">
            {/* Configuración */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                Configuración
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idioma
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Formato de Exportación
                  </label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="txt">Texto (.txt)</option>
                    <option value="markdown">Markdown (.md)</option>
                    <option value="html">HTML (.html)</option>
                    <option value="json">JSON (.json)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Controles de Grabación */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mic className="w-5 h-5 mr-2 text-green-600" />
                Grabación en Vivo
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={toggleRecording}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    isRecording
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-5 h-5 mr-2" />
                      Detener Grabación
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
                      Iniciar Grabación
                    </>
                  )}
                </button>

                {isRecording && (
                  <>
                    <div className="flex items-center justify-center space-x-2 text-red-600 animate-pulse">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                      <span className="text-sm font-medium">Grabando...</span>
                    </div>
                    
                    {/* Visualizador de Ondas de Audio */}
                    <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-center mb-2">
                        <span className="text-xs font-medium text-gray-600">
                          Nivel de Audio: {Math.round(audioLevel * 100)}%
                        </span>
                      </div>
                      <canvas
                        ref={canvasRef}
                        width="400"
                        height="100"
                        className="w-full h-24 bg-gray-100 rounded"
                      />
                      <div className="flex items-center justify-center mt-2 space-x-2">
                        <div className={`w-2 h-2 rounded-full ${audioLevel > 0.1 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                        <div className={`w-2 h-2 rounded-full ${audioLevel > 0.3 ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}></div>
                        <div className={`w-2 h-2 rounded-full ${audioLevel > 0.6 ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
                        <span className="text-xs text-gray-500 ml-2">
                          {audioLevel > 0.1 ? '🎤 Detectando audio' : '🔇 Silencio'}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Subir Archivo */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Volume2 className="w-5 h-5 mr-2 text-purple-600" />
                Subir Audio
              </h3>
              
              {/* Nota informativa */}
              <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">📝 Cómo transcribir archivos de audio:</p>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Sube tu archivo de audio</li>
                      <li>Reproduce el audio desde tus altavoces</li>
                      <li>El micrófono capturará y transcribirá el audio</li>
                    </ol>
                    <p className="mt-2 text-xs text-blue-600">
                      💡 <strong>Tip:</strong> Asegúrate de estar en un lugar silencioso y con buen volumen de altavoces.
                    </p>
                  </div>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {audioFile && (
                <div className="mt-4">
                  <audio
                    ref={audioRef}
                    onTimeUpdate={updateTime}
                    onLoadedMetadata={updateTime}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="hidden"
                  />
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {audioFile.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    {/* Barra de Progreso de Transcripción */}
                    {isTranscribing && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-purple-700">
                            🎧 Transcribiendo...
                          </span>
                          <span className="text-sm font-bold text-purple-700">
                            {Math.round(transcriptionProgress)}%
                          </span>
                        </div>
                        
                        {/* Barra de progreso animada */}
                        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 transition-all duration-300 ease-out rounded-full"
                            style={{ width: `${transcriptionProgress}%` }}
                          >
                            {/* Animación de brillo */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                          </div>
                        </div>
                        
                        {/* Indicadores de estado */}
                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <span>Escuchando audio</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime((duration * transcriptionProgress) / 100)} transcrito</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Mostrar cuando la transcripción está completa */}
                    {!isTranscribing && transcriptionProgress === 100 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            ✅ Transcripción completada - {transcript.split(' ').length} palabras
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={togglePlayback}
                        disabled={isTranscribing}
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                          isTranscribing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Reproducir
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={startFileTranscription}
                        disabled={isTranscribing}
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                          isTranscribing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {isTranscribing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Transcribiendo...
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4 mr-2" />
                            Transcribir
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Estadísticas */}
            {transcript && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Estadísticas
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Palabras:</span>
                    <span className="text-sm font-medium">{transcript.trim().split(/\s+/).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Caracteres:</span>
                    <span className="text-sm font-medium">{transcript.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Confianza:</span>
                    <span className="text-sm font-medium">{Math.round(confidence * 100)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Área de Transcripción */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Transcripción
                </h3>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="Vista previa"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    disabled={!transcript}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600 disabled:text-gray-400 transition-colors"
                    title="Copiar"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadTranscript}
                    disabled={!transcript}
                    className="px-3 py-2 text-gray-600 hover:text-green-600 disabled:text-gray-400 transition-colors"
                    title="Descargar"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={clearTranscript}
                    disabled={!transcript}
                    className="px-3 py-2 text-gray-600 hover:text-red-600 disabled:text-gray-400 transition-colors"
                    title="Limpiar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mensajes de estado */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700">{success}</span>
                </div>
              )}

              {/* Área de texto */}
              <div className="space-y-4">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="La transcripción aparecerá aquí... También puedes editar el texto manualmente."
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />

                {/* Vista previa formateada */}
                {showPreview && transcript && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Vista Previa ({exportFormat.toUpperCase()})
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {generateFormattedContent()}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={downloadTranscript}
                  disabled={!transcript.trim()}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar {exportFormat.toUpperCase()}
                </button>
                
                <button
                  onClick={copyToClipboard}
                  disabled={!transcript.trim()}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copiar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 Características del Transcriptor
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Reconocimiento en Tiempo Real</h4>
              <p className="text-gray-600 text-sm">
                Transcripción instantánea mientras hablas con alta precisión
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Soporte de Archivos</h4>
              <p className="text-gray-600 text-sm">
                Sube archivos de audio y transcríbelos automáticamente
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Múltiples Formatos</h4>
              <p className="text-gray-600 text-sm">
                Exporta en TXT, Markdown, HTML y JSON con formato profesional
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioTranscriber;
