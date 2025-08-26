import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full' 
}) => {
  const sizeMap = {
    sm: { icon: 32, text: 80, height: 32 },
    md: { icon: 48, text: 120, height: 48 },
    lg: { icon: 64, text: 160, height: 64 },
    xl: { icon: 80, text: 200, height: 80 }
  };

  const dimensions = sizeMap[size];

  if (variant === 'icon') {
    return (
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="acumenGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="acumenGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        
        {/* Main pyramid/triangle shape representing growth and analytics */}
        <path
          d="M50 15 L75 65 L25 65 Z"
          fill="url(#acumenGradient1)"
          opacity="0.9"
        />
        
        {/* Data bars inside the pyramid */}
        <rect x="40" y="45" width="4" height="15" fill="#ffffff" opacity="0.8" />
        <rect x="48" y="38" width="4" height="22" fill="#ffffff" opacity="0.8" />
        <rect x="56" y="50" width="4" height="10" fill="#ffffff" opacity="0.8" />
        
        {/* Circular accent representing insights/AI */}
        <circle cx="50" cy="75" r="8" fill="url(#acumenGradient2)" opacity="0.8" />
        <circle cx="50" cy="75" r="3" fill="#ffffff" />
        
        {/* Side accent lines */}
        <path d="M20 70 L30 70" stroke="url(#acumenGradient2)" strokeWidth="2" strokeLinecap="round" />
        <path d="M70 70 L80 70" stroke="url(#acumenGradient2)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Full logo with text
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="acumenGradientFull1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="acumenGradientFull2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        
        {/* Main pyramid/triangle shape */}
        <path
          d="M50 15 L75 65 L25 65 Z"
          fill="url(#acumenGradientFull1)"
          opacity="0.9"
        />
        
        {/* Data bars */}
        <rect x="40" y="45" width="4" height="15" fill="#ffffff" opacity="0.8" />
        <rect x="48" y="38" width="4" height="22" fill="#ffffff" opacity="0.8" />
        <rect x="56" y="50" width="4" height="10" fill="#ffffff" opacity="0.8" />
        
        {/* Circular accent */}
        <circle cx="50" cy="75" r="8" fill="url(#acumenGradientFull2)" opacity="0.8" />
        <circle cx="50" cy="75" r="3" fill="#ffffff" />
        
        {/* Side accents */}
        <path d="M20 70 L30 70" stroke="url(#acumenGradientFull2)" strokeWidth="2" strokeLinecap="round" />
        <path d="M70 70 L80 70" stroke="url(#acumenGradientFull2)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      
      <span className={`font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent`}
            style={{ fontSize: dimensions.height * 0.6 }}>
        Acumen
      </span>
    </div>
  );
};