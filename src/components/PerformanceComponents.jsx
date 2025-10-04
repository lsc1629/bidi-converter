import React, { useState, useEffect, useRef } from 'react';

/**
 * Componente de dashboard de performance
 */
export const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [score, setScore] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const updateMetrics = () => {
      if (window.coreWebVitalsOptimizer && window.performanceMonitor) {
        const cwvMetrics = window.coreWebVitalsOptimizer.getMetrics();
        const perfScore = window.performanceMonitor.getPerformanceScore();
        const perfAlerts = window.performanceMonitor.getAlerts();
        
        setMetrics(cwvMetrics);
        setScore(perfScore);
        setAlerts(perfAlerts);
      }
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!metrics || !score) {
    return (
      <div className="performance-dashboard loading">
        <div className="animate-pulse">Loading performance metrics...</div>
      </div>
    );
  }

  return (
    <div className="performance-dashboard bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CoreWebVitalCard 
          metric="LCP" 
          value={metrics.cwv.lcp} 
          threshold={2500}
          unit="ms"
          description="Largest Contentful Paint"
        />
        <CoreWebVitalCard 
          metric="FID" 
          value={metrics.cwv.fid} 
          threshold={100}
          unit="ms"
          description="First Input Delay"
        />
        <CoreWebVitalCard 
          metric="CLS" 
          value={metrics.cwv.cls} 
          threshold={0.1}
          unit=""
          description="Cumulative Layout Shift"
        />
        <PerformanceScoreCard score={score} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResourceBudgetChart />
        <PerformanceAlerts alerts={alerts} />
      </div>
    </div>
  );
};

/**
 * Tarjeta individual de Core Web Vital
 */
const CoreWebVitalCard = ({ metric, value, threshold, unit, description }) => {
  const getStatus = () => {
    if (value === undefined) return 'unknown';
    if (metric === 'CLS') {
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    }
    return value <= threshold ? 'good' : value <= threshold * 1.6 ? 'needs-improvement' : 'poor';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const status = getStatus();
  const displayValue = value !== undefined ? 
    (metric === 'CLS' ? value.toFixed(3) : Math.round(value)) : 'N/A';

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-700">{metric}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
          {status.replace('-', ' ')}
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {displayValue}{unit}
      </div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
};

/**
 * Tarjeta de score general de performance
 */
const PerformanceScoreCard = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4">
      <h3 className="font-semibold text-gray-700 mb-2">Overall Score</h3>
      <div className={`text-3xl font-bold mb-1 ${getScoreColor(score.overall)}`}>
        {score.overall}
      </div>
      <div className="text-lg font-medium text-gray-600 mb-2">
        Grade: {score.grade}
      </div>
      <div className="text-sm text-gray-500">
        Performance Budget Compliance
      </div>
    </div>
  );
};

/**
 * Gráfico de presupuesto de recursos
 */
const ResourceBudgetChart = () => {
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    const updateUsage = () => {
      if (window.performanceMonitor) {
        const currentUsage = window.performanceMonitor.getCurrentResourceUsage();
        setUsage(currentUsage);
      }
    };

    updateUsage();
    const interval = setInterval(updateUsage, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!usage) return <div>Loading resource usage...</div>;

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const resources = [
    { name: 'Scripts', value: usage.scripts, color: 'bg-blue-500' },
    { name: 'Images', value: usage.images, color: 'bg-green-500' },
    { name: 'Stylesheets', value: usage.stylesheets, color: 'bg-purple-500' },
    { name: 'Fonts', value: usage.fonts, color: 'bg-orange-500' }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-700 mb-4">Resource Budget</h3>
      
      <div className="space-y-3">
        {resources.map((resource, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{resource.name}</span>
              <span className="font-medium">{formatSize(resource.value)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${resource.color}`}
                style={{ width: `${Math.min((resource.value / (usage.total || 1)) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Size:</span>
          <span className="font-medium">{formatSize(usage.total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Requests:</span>
          <span className="font-medium">{usage.requests}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Lista de alertas de performance
 */
const PerformanceAlerts = ({ alerts }) => {
  const getAlertIcon = (severity) => {
    return severity === 'critical' ? '🚨' : '⚠️';
  };

  const getAlertColor = (severity) => {
    return severity === 'critical' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50';
  };

  const formatAlertMessage = (alert) => {
    switch (alert.type) {
      case 'lcp_warning':
        return `LCP is ${Math.round(alert.data.value)}ms (should be < 2500ms)`;
      case 'fid_warning':
        return `FID is ${Math.round(alert.data.value)}ms (should be < 100ms)`;
      case 'cls_warning':
        return `CLS is ${alert.data.value.toFixed(3)} (should be < 0.1)`;
      case 'bundle_size_exceeded':
        return `Bundle size exceeded: ${Math.round(alert.data.size / 1024)}KB`;
      case 'long_task_detected':
        return `Long task detected: ${Math.round(alert.data.duration)}ms`;
      default:
        return alert.type.replace(/_/g, ' ');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-700 mb-4">Performance Alerts</h3>
      
      {alerts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-2xl mb-2">✅</div>
          <div>No performance issues detected</div>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {alerts.slice(-10).reverse().map((alert, index) => (
            <div 
              key={index}
              className={`border-l-4 p-3 rounded ${getAlertColor(alert.severity)}`}
            >
              <div className="flex items-start">
                <span className="text-lg mr-2">{getAlertIcon(alert.severity)}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">
                    {formatAlertMessage(alert)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Indicador de performance en tiempo real
 */
export const PerformanceIndicator = () => {
  const [status, setStatus] = useState('good');
  const [score, setScore] = useState(100);

  useEffect(() => {
    const updateStatus = () => {
      if (window.coreWebVitalsOptimizer) {
        const metrics = window.coreWebVitalsOptimizer.getMetrics();
        setStatus(metrics.status || 'good');
      }
      
      if (window.performanceMonitor) {
        const perfScore = window.performanceMonitor.getPerformanceScore();
        setScore(perfScore.overall);
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-3 border">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
          <span className="text-sm font-medium">Performance: {score}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Optimizador visual de imágenes
 */
export const ImageOptimizer = ({ src, alt, className, ...props }) => {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef(null);

  useEffect(() => {
    const optimizeImage = async () => {
      if (window.performanceMonitor) {
        // Simular optimización de imagen
        const marketConfig = window.performanceMonitor.currentMarket;
        
        // En implementación real, esto llamaría a un servicio de optimización
        const optimized = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        setOptimizedSrc(optimized);
      }
      setIsLoading(false);
    };

    optimizeImage();
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    
    // Track image load performance
    if (window.performanceMonitor && imgRef.current) {
      const img = imgRef.current;
      const size = img.naturalWidth * img.naturalHeight;
      
      // Report to performance monitor
      console.log(`Image loaded: ${src}, size: ${size}px`);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

/**
 * Componente de lazy loading para contenido pesado
 */
export const LazyContent = ({ children, threshold = '100px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      // Simulate content loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded]);

  return (
    <div ref={ref} className="lazy-content">
      {isVisible ? (
        isLoaded ? (
          children
        ) : (
          <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
        )
      ) : (
        <div className="h-32"></div>
      )}
    </div>
  );
};

/**
 * Hook para monitoreo de performance
 */
export const usePerformance = () => {
  const [metrics, setMetrics] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      if (window.coreWebVitalsOptimizer && window.performanceMonitor) {
        const cwv = window.coreWebVitalsOptimizer.getMetrics();
        const perf = window.performanceMonitor.getPerformanceScore();
        
        setMetrics({ cwv, perf });
      }
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  const optimize = async () => {
    setIsOptimizing(true);
    
    try {
      if (window.coreWebVitalsOptimizer) {
        window.coreWebVitalsOptimizer.forceOptimization();
      }
      
      if (window.performanceMonitor) {
        window.performanceMonitor.forceOptimization();
      }
      
      // Wait for optimizations to apply
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsOptimizing(false);
    }
  };

  const getOverallStatus = () => {
    if (!metrics) return 'unknown';
    
    const cwvStatus = metrics.cwv.status;
    const perfGrade = metrics.perf.grade;
    
    if (cwvStatus === 'good' && ['A', 'B'].includes(perfGrade)) return 'excellent';
    if (cwvStatus === 'good' || perfGrade === 'B') return 'good';
    if (cwvStatus === 'needs-improvement' || perfGrade === 'C') return 'needs-improvement';
    return 'poor';
  };

  return {
    metrics,
    isOptimizing,
    optimize,
    status: getOverallStatus()
  };
};

export default {
  PerformanceDashboard,
  PerformanceIndicator,
  ImageOptimizer,
  LazyContent,
  usePerformance
};
