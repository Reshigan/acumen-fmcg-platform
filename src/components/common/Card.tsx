import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'gradient' | 'elevated';
  hoverable?: boolean;
  animated?: boolean;
}

const StyledCard = styled(motion.div)<{ clickable?: boolean; variant?: string; hoverable?: boolean }>`
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  transition: all ${theme.transitions.normal};
  position: relative;
  overflow: hidden;

  ${props => props.clickable && css`
    cursor: pointer;
  `}

  ${props => {
    switch (props.variant) {
      case 'glass':
        return css`
          background: ${theme.colors.glass.background};
          backdrop-filter: blur(20px);
          border: 1px solid ${theme.colors.glass.border};
          box-shadow: ${theme.shadows.lg};
        `;
      case 'gradient':
        return css`
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.1) 0%, 
            rgba(236, 72, 153, 0.1) 100%);
          border: 1px solid ${theme.colors.glass.border};
          box-shadow: ${theme.shadows.lg};
        `;
      case 'elevated':
        return css`
          background: ${theme.colors.background.secondary};
          box-shadow: ${theme.shadows.xxl};
          border: 1px solid ${theme.colors.background.tertiary};
        `;
      default:
        return css`
          background: ${theme.colors.background.card};
          backdrop-filter: blur(10px);
          border: 1px solid ${theme.colors.glass.border};
          box-shadow: ${theme.shadows.md};
        `;
    }
  }}

  ${props => props.hoverable && css`
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.xxl}, ${theme.shadows.glow};
      border-color: ${theme.colors.primary.main};
    }
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      ${theme.colors.primary.light}, 
      transparent);
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  onClick,
  variant = 'default',
  hoverable = true,
  animated = true
}) => {
  const animationProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  } : {};

  return (
    <StyledCard
      className={className}
      onClick={onClick}
      clickable={!!onClick}
      variant={variant}
      hoverable={hoverable}
      {...animationProps}
    >
      {children}
    </StyledCard>
  );
};

// Additional exports for compatibility
const CardHeader = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.glass.border};
`;

const CardTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
`;

export { CardHeader, CardTitle, CardContent };
