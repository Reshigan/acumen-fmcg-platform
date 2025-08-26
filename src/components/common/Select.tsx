import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  variant?: 'default' | 'filled' | 'outlined';
  animated?: boolean;
}

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const SelectTrigger = styled.button<{ isOpen: boolean; hasError?: boolean; variant?: string }>`
  width: 100%;
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.sans};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.normal};
  cursor: pointer;
  outline: none;
  text-align: left;
  
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
          
          ${props.isOpen && css`
            background: rgba(255, 255, 255, 0.1);
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.main};
            box-shadow: 0 0 0 3px ${props.hasError 
              ? 'rgba(239, 68, 68, 0.2)' 
              : 'rgba(139, 92, 246, 0.2)'};
          `}
        `;
      case 'outlined':
        return css`
          background: transparent;
          border: 2px solid ${props.hasError ? theme.colors.error : theme.colors.glass.border};
          color: ${theme.colors.text.primary};
          
          &:hover {
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.light};
          }
          
          ${props.isOpen && css`
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.main};
            box-shadow: ${theme.shadows.glow};
          `}
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
          
          ${props.isOpen && css`
            background: rgba(255, 255, 255, 0.08);
            border-color: ${props.hasError ? theme.colors.error : theme.colors.primary.main};
            box-shadow: 0 0 0 3px ${props.hasError 
              ? 'rgba(239, 68, 68, 0.2)' 
              : 'rgba(139, 92, 246, 0.2)'};
          `}
        `;
    }
  }}
`;

const SelectValue = styled.span<{ isPlaceholder?: boolean }>`
  color: ${props => props.isPlaceholder ? theme.colors.text.tertiary : theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ChevronIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.tertiary};
`;

const DropdownContainer = styled(motion.div)`
  position: absolute;
  top: calc(100% + ${theme.spacing.sm});
  left: 0;
  right: 0;
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xxl};
  overflow: hidden;
  z-index: ${theme.zIndex.dropdown};
  max-height: 300px;
  overflow-y: auto;
  backdrop-filter: blur(20px);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: ${theme.borderRadius.full};
  }
`;

const Option = styled(motion.button)<{ isSelected?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.isSelected 
    ? `linear-gradient(90deg, ${theme.colors.primary.main}20, transparent)` 
    : 'transparent'};
  border: none;
  color: ${props => props.isSelected ? theme.colors.primary.light : theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.sans};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  text-align: left;
  
  &:hover {
    background: ${props => props.isSelected 
      ? `linear-gradient(90deg, ${theme.colors.primary.main}30, transparent)`
      : theme.colors.glass.background};
    color: ${theme.colors.primary.light};
  }
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const CheckIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  color: ${theme.colors.primary.main};
`;

const ErrorMessage = styled(motion.div)`
  margin-top: ${theme.spacing.xs};
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  variant = 'default',
  animated = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };
  
  const animationProps = animated ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};
  
  return (
    <SelectContainer ref={containerRef} as={motion.div} {...animationProps}>
      {label && <Label>{label}</Label>}
      
      <SelectTrigger
        type="button"
        isOpen={isOpen}
        hasError={!!error}
        variant={variant}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SelectValue isPlaceholder={!selectedOption}>
          {selectedOption ? (
            <OptionContent>
              {selectedOption.icon}
              {selectedOption.label}
            </OptionContent>
          ) : (
            placeholder
          )}
        </SelectValue>
        
        <ChevronIcon
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </ChevronIcon>
      </SelectTrigger>
      
      <AnimatePresence>
        {isOpen && (
          <DropdownContainer
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option, index) => (
              <Option
                key={option.value}
                isSelected={option.value === value}
                onClick={() => handleSelect(option.value)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <OptionContent>
                  {option.icon}
                  {option.label}
                </OptionContent>
                
                {option.value === value && (
                  <CheckIcon
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <Check size={16} />
                  </CheckIcon>
                )}
              </Option>
            ))}
          </DropdownContainer>
        )}
      </AnimatePresence>
      
      {error && (
        <ErrorMessage
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </ErrorMessage>
      )}
    </SelectContainer>
  );
};