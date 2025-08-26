import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../styles/theme';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  animated?: boolean;
}

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled(motion.label)<{ hasValue: boolean; focused: boolean }>`
  position: absolute;
  left: ${props => props.hasValue || props.focused ? '12px' : '44px'};
  top: ${props => props.hasValue || props.focused ? '-8px' : '50%'};
  transform: translateY(${props => props.hasValue || props.focused ? '0' : '-50%'});
  background: ${theme.colors.background.primary};
  padding: 0 ${theme.spacing.xs};
  color: ${props => props.focused ? theme.colors.primary.main : theme.colors.text.tertiary};
  font-size: ${props => props.hasValue || props.focused ? theme.typography.fontSize.xs : theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.transitions.normal};
  pointer-events: none;
  z-index: 1;
`;

const StyledInput = styled.input<{ hasError?: boolean; hasIcon?: boolean; variant?: string }>`
  width: 100%;
  padding: ${props => props.hasIcon 
    ? `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 44px`
    : `${theme.spacing.md}`};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.sans};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.normal};
  outline: none;
  
  ${props => {
    switch (props.variant) {
      case 'filled':
        return css`
          background: ${theme.colors.glass.background};
          border: 2px solid transparent;
          color: ${theme.colors.text.primary};
          
          &:hover {
            background: rgba(255, 255, 255, 0.08);
          }
          
          &:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.main};
            box-shadow: 0 0 0 3px ${props.hasError 
              ? 'rgba(239, 68, 68, 0.2)' 
              : 'rgba(139, 92, 246, 0.2)'};
          }
        `;
      case 'outlined':
        return css`
          background: transparent;
          border: 2px solid ${props.hasError ? theme.colors.error : theme.colors.glass.border};
          color: ${theme.colors.text.primary};
          
          &:hover {
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.light};
          }
          
          &:focus {
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.main};
            box-shadow: ${theme.shadows.glow};
            animation: ${pulse} 1.5s infinite;
          }
        `;
      default:
        return css`
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid ${props.hasError ? theme.colors.error : theme.colors.glass.border};
          color: ${theme.colors.text.primary};
          
          &:hover {
            background: rgba(255, 255, 255, 0.07);
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.light};
          }
          
          &:focus {
            background: rgba(255, 255, 255, 0.08);
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.main};
            box-shadow: 0 0 0 3px ${props.hasError 
              ? 'rgba(239, 68, 68, 0.2)' 
              : 'rgba(139, 92, 246, 0.2)'};
          }
        `;
    }
  }}
  
  &::placeholder {
    color: ${theme.colors.text.tertiary};
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${props => props.position}: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.text.tertiary};
  display: flex;
  align-items: center;
  pointer-events: none;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ErrorMessage = styled(motion.div)`
  margin-top: ${theme.spacing.xs};
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const SuccessIndicator = styled(motion.div)`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.success};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  variant = 'default',
  animated = true,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };
  
  const animationProps = animated ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};
  
  return (
    <InputContainer as={motion.div} {...animationProps}>
      {label && (
        <Label
          hasValue={!!internalValue}
          focused={focused}
          initial={false}
        >
          {label}
        </Label>
      )}
      
      {icon && (
        <IconWrapper position="left">
          {icon}
        </IconWrapper>
      )}
      
      <StyledInput
        hasError={!!error}
        hasIcon={!!icon}
        variant={variant}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      
      {rightIcon && !error && (
        <IconWrapper position="right">
          {rightIcon}
        </IconWrapper>
      )}
      
      {!error && internalValue && !rightIcon && (
        <SuccessIndicator
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </SuccessIndicator>
      )}
      
      {error && (
        <ErrorMessage
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </ErrorMessage>
      )}
    </InputContainer>
  );
};