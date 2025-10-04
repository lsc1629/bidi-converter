import React, { useState, useEffect, useRef } from 'react';

/**
 * Botón premium con micro-interacciones
 */
export const PremiumButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  icon = null,
  onClick,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef(null);

  const variants = {
    primary: 'bg-primary text-white hover:bg-primaryHover',
    secondary: 'bg-surface border border-border text-text-primary hover:bg-surfaceElevated',
    success: 'bg-success text-white hover:bg-success-600',
    danger: 'bg-error text-white hover:bg-error-600'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <button
      ref={buttonRef}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        relative overflow-hidden rounded-lg font-medium
        transform transition-all duration-150 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isPressed ? 'scale-95' : 'hover:scale-105 hover:-translate-y-0.5'}
        ${disabled ? 'pointer-events-none' : ''}
      `}
      disabled={disabled || loading}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
      
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </div>
      
      <RippleEffect />
    </button>
  );
};

/**
 * Efecto ripple para botones
 */
const RippleEffect = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {
        x,
        y,
        size,
        id: Date.now()
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    };

    const button = document.querySelector('[data-ripple]');
    if (button) {
      button.addEventListener('click', handleClick);
      return () => button.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white bg-opacity-30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '600ms'
          }}
        />
      ))}
    </>
  );
};

/**
 * Card premium con hover effects
 */
export const PremiumCard = ({ 
  children, 
  className = '', 
  hoverable = true, 
  clickable = false,
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        bg-surface rounded-xl border border-border p-6
        transition-all duration-300 ease-out
        ${hoverable ? 'hover:shadow-lg hover:-translate-y-1' : ''}
        ${clickable ? 'cursor-pointer hover:bg-surfaceElevated' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      {children}
      
      {hoverable && (
        <div className={`
          absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary
          opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-5' : 'opacity-0'}
        `} />
      )}
    </div>
  );
};

/**
 * Input premium con animaciones
 */
export const PremiumInput = ({ 
  label, 
  error, 
  success, 
  icon, 
  type = 'text',
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        
        <input
          ref={inputRef}
          type={type}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
            bg-surface text-text-primary placeholder-text-tertiary
            focus:outline-none focus:ring-0
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-error focus:border-error' : 
              success ? 'border-success focus:border-success' :
              isFocused ? 'border-primary focus:border-primary' : 'border-border'}
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {label && (
          <label className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${isFocused || hasValue 
              ? 'top-0 -translate-y-1/2 text-xs bg-surface px-2' 
              : 'top-1/2 -translate-y-1/2 text-base'
            }
            ${error ? 'text-error' : 
              success ? 'text-success' :
              isFocused ? 'text-primary' : 'text-text-tertiary'}
          `}>
            {label}
          </label>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      
      {success && (
        <p className="mt-1 text-sm text-success flex items-center gap-1">
          <span>✓</span> {success}
        </p>
      )}
    </div>
  );
};

/**
 * Loading spinner premium
 */
export const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colors = {
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  return (
    <div className={`${sizes[size]} ${colors[color]} animate-spin`}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

/**
 * Modal premium con animaciones
 */
export const PremiumModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnOverlay = true 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          relative bg-surface rounded-2xl shadow-2xl w-full ${sizes[size]}
          transform transition-all duration-300 ease-out
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-surfaceElevated transition-colors"
            >
              <span className="text-xl text-text-tertiary">×</span>
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Tooltip premium
 */
export const PremiumTooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 500 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const tooltipRef = useRef(null);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg
            shadow-lg transition-all duration-200 ease-out
            ${positions[position]}
            animate-fadeIn
          `}
        >
          {content}
          
          {/* Arrow */}
          <div className={`
            absolute w-2 h-2 bg-gray-900 transform rotate-45
            ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
              position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
              position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
              'right-full top-1/2 -translate-y-1/2 -mr-1'}
          `} />
        </div>
      )}
    </div>
  );
};

/**
 * Progress bar premium
 */
export const PremiumProgressBar = ({ 
  value, 
  max = 100, 
  size = 'md', 
  color = 'primary',
  showLabel = false,
  animated = true 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colors = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div className={`w-full bg-border rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`
            ${colors[color]} ${sizes[size]} rounded-full
            transition-all duration-500 ease-out
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/**
 * Switch premium
 */
export const PremiumSwitch = ({ 
  checked, 
  onChange, 
  label, 
  size = 'md',
  disabled = false 
}) => {
  const sizes = {
    sm: { container: 'w-8 h-4', thumb: 'w-3 h-3' },
    md: { container: 'w-10 h-5', thumb: 'w-4 h-4' },
    lg: { container: 'w-12 h-6', thumb: 'w-5 h-5' }
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        
        <div className={`
          ${sizes[size].container} rounded-full transition-all duration-200
          ${checked ? 'bg-primary' : 'bg-border'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}>
          <div className={`
            ${sizes[size].thumb} bg-white rounded-full shadow-md
            transform transition-transform duration-200 ease-out
            ${checked ? 'translate-x-full' : 'translate-x-0'}
            absolute top-0.5 left-0.5
          `} />
        </div>
      </div>
      
      {label && (
        <span className={`text-text-primary ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </span>
      )}
    </label>
  );
};

/**
 * Badge premium
 */
export const PremiumBadge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  dot = false 
}) => {
  const variants = {
    default: 'bg-border text-text-primary',
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  if (dot) {
    return (
      <span className={`
        inline-block w-2 h-2 rounded-full
        ${variants[variant].split(' ')[0]}
      `} />
    );
  }

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${variants[variant]} ${sizes[size]}
    `}>
      {children}
    </span>
  );
};

/**
 * Skeleton loader premium
 */
export const PremiumSkeleton = ({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  variant = 'rectangular' 
}) => {
  const variants = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  return (
    <div
      className={`
        bg-border animate-pulse ${variants[variant]} ${className}
      `}
      style={{ width, height }}
    />
  );
};

export default {
  PremiumButton,
  PremiumCard,
  PremiumInput,
  LoadingSpinner,
  PremiumModal,
  PremiumTooltip,
  PremiumProgressBar,
  PremiumSwitch,
  PremiumBadge,
  PremiumSkeleton
};
