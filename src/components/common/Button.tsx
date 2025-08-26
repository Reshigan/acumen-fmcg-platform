import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const LoaderIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  margin-right: 8px;
`;

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.sans};
  font-weight: ${theme.typography.fontWeight.semibold};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.normal};
  cursor: pointer;
  border: none;
  outline: none;
  overflow: hidden;
  transform: translateZ(0);
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
  }

  /* Size variants */
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
        `;
      default:
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.base};
        `;
    }
  }}

  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primary.main};
          color: white;
          box-shadow: ${theme.shadows.md};

          &:hover:not(:disabled) {
            background: ${theme.colors.primary.dark};
            box-shadow: ${theme.shadows.lg};
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.secondary.main};
          color: white;
          box-shadow: ${theme.shadows.md};

          &:hover:not(:disabled) {
            background: ${theme.colors.secondary.dark};
            box-shadow: ${theme.shadows.lg};
            transform: translateY(-2px);
          }
        `;
      case 'gradient':
        return css`
          background: linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.secondary.main} 100%);
          color: white;
          box-shadow: ${theme.shadows.lg};
          background-size: 200% auto;

          &:hover:not(:disabled) {
            animation: ${shimmer} 3s linear infinite;
            box-shadow: ${theme.shadows.xl}, ${theme.shadows.glow};
            transform: translateY(-2px) scale(1.02);
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.colors.primary.main};
          border: 2px solid ${theme.colors.primary.main};

          &:hover:not(:disabled) {
            background: ${theme.colors.primary.main};
            color: white;
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.text.secondary};

          &:hover:not(:disabled) {
            background: ${theme.colors.glass.background};
            color: ${theme.colors.text.primary};
            backdrop-filter: blur(10px);
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.error};
          color: white;
          box-shadow: ${theme.shadows.md};

          &:hover:not(:disabled) {
            background: #DC2626;
            box-shadow: ${theme.shadows.lg};
            transform: translateY(-2px);
          }
        `;
      default:
        return '';
    }
  }}
`;

const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  margin-${props => props.position === 'left' ? 'right' : 'left'}: ${theme.spacing.sm};
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      {isLoading && <LoaderIcon />}
      {!isLoading && leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
      {children}
      {!isLoading && rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
    </StyledButton>
  );
};
