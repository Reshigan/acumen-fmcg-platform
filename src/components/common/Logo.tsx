import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const LogoText = styled.span<{ size: number }>`
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.main} 0%, 
    ${theme.colors.secondary.main} 50%, 
    ${theme.colors.accent.main} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: ${props => props.size * 0.6}px;
`;

const AnimatedSvg = styled(motion.svg)`
  filter: drop-shadow(0 4px 6px rgba(139, 92, 246, 0.2));
  transition: filter ${theme.transitions.normal};
  
  &:hover {
    filter: drop-shadow(0 8px 12px rgba(139, 92, 246, 0.4));
  }
`;

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

  const svgContent = (
    <>
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
      <motion.path
        d="M50 15 L75 65 L25 65 Z"
        fill="url(#acumenGradient1)"
        opacity="0.9"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      />
      
      {/* Data bars inside the pyramid */}
      <motion.rect 
        x="40" y="45" width="4" height="15" 
        fill="#ffffff" opacity="0.8"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        style={{ transformOrigin: "bottom" }}
      />
      <motion.rect 
        x="48" y="38" width="4" height="22" 
        fill="#ffffff" opacity="0.8"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{ transformOrigin: "bottom" }}
      />
      <motion.rect 
        x="56" y="50" width="4" height="10" 
        fill="#ffffff" opacity="0.8"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        style={{ transformOrigin: "bottom" }}
      />
      
      {/* Circular accent representing insights/AI */}
      <motion.circle 
        cx="50" cy="75" r="8" 
        fill="url(#acumenGradient2)" 
        opacity="0.8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
      />
      <motion.circle 
        cx="50" cy="75" r="3" 
        fill="#ffffff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      />
      
      {/* Side accent lines */}
      <motion.path 
        d="M20 70 L30 70" 
        stroke="url(#acumenGradient2)" 
        strokeWidth="2" 
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
      <motion.path 
        d="M70 70 L80 70" 
        stroke="url(#acumenGradient2)" 
        strokeWidth="2" 
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
    </>
  );

  if (variant === 'icon') {
    return (
      <AnimatedSvg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {svgContent}
      </AnimatedSvg>
    );
  }

  // Full logo with text
  return (
    <LogoContainer className={className}>
      <AnimatedSvg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {svgContent}
      </AnimatedSvg>
      
      <LogoText size={dimensions.height}>
        Acumen
      </LogoText>
    </LogoContainer>
  );
};
