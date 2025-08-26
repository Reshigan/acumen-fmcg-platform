import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const float = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
`;

const glow = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
`;

export const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0F0F1E 0%, #1A1A2E 50%, #252540 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

export const BackgroundOrb = styled.div<{ color: string; size: string; top?: string; left?: string; right?: string; bottom?: string; delay?: number }>`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: ${float} ${props => 15 + (props.delay || 0)}s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
`;

export const LoginBox = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 10;
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: ${theme.typography.fontSize['5xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, ${theme.colors.primary.light} 0%, ${theme.colors.secondary.light} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  animation: ${glow} 3s ease-in-out infinite;
`;

export const Subtitle = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
`;

export const LoginCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xxl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.xxl};
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.xl};
`;

export const TabGroup = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.lg};
  padding: 4px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  background: ${props => props.active 
    ? `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.secondary.main} 100%)`
    : 'transparent'};
  color: ${props => props.active ? 'white' : theme.colors.text.secondary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  
  &:hover:not(:disabled) {
    color: ${props => !props.active && theme.colors.text.primary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const Label = styled.label`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.base};
  transition: all ${theme.transitions.normal};
  
  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.text.tertiary};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  color: #EF4444;
  font-size: ${theme.typography.fontSize.sm};
`;

export const DemoCredentials = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.glass.border};
`;

export const DemoTitle = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  text-align: center;
  margin-bottom: ${theme.spacing.md};
`;

export const DemoCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
`;

export const DemoText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: 4px;
  
  &.title {
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const DemoCode = styled.span`
  color: ${theme.colors.primary.light};
  font-family: ${theme.typography.fontFamily.mono};
  background: rgba(139, 92, 246, 0.1);
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

export const FeatureCard = styled(motion.div)`
  text-align: center;
`;

export const FeatureIcon = styled.div`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary.main};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const FeatureText = styled.p`
  color: ${theme.colors.text.tertiary};
  font-size: ${theme.typography.fontSize.xs};
`;