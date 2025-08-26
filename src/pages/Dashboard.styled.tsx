import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
`;

export const DashboardContent = styled.div<{ hasSidebar?: boolean }>`
  margin-left: ${props => props.hasSidebar ? '280px' : '0'};
  padding: ${theme.spacing.xl};
  transition: margin-left ${theme.transitions.normal};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

export const DashboardHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

export const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.light} 0%, 
    ${theme.colors.secondary.light} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

export const StatCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl}, ${theme.shadows.glow};
    border-color: ${theme.colors.primary.main};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      ${theme.colors.primary.main}, 
      ${theme.colors.secondary.main});
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

export const StatIcon = styled.div<{ color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.color || theme.colors.primary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};
  
  svg {
    width: 24px;
    height: 24px;
    color: ${props => props.color || theme.colors.primary.main};
  }
`;

export const StatLabel = styled.p`
  color: ${theme.colors.text.tertiary};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: ${theme.spacing.xs};
`;

export const StatValue = styled.h3`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

export const StatChange = styled.div<{ isPositive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${props => props.isPositive ? theme.colors.success : theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  height: 400px;
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

export const ChartTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

export const ChartOptions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export const TabButton = styled.button<{ active?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props => props.active 
    ? theme.colors.primary.main 
    : theme.colors.glass.background};
  color: ${props => props.active 
    ? 'white' 
    : theme.colors.text.secondary};
  border: 1px solid ${props => props.active 
    ? theme.colors.primary.main 
    : theme.colors.glass.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover:not(:disabled) {
    background: ${props => !props.active && theme.colors.glass.background};
    border-color: ${theme.colors.primary.main};
    color: ${props => !props.active && theme.colors.primary.main};
  }
`;

export const TableSection = styled.div`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  border-bottom: 2px solid ${theme.colors.glass.border};
`;

export const TableRow = styled.tr`
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.glass.background};
  }
`;

export const TableHeaderCell = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableCell = styled.td`
  padding: ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.base};
  border-bottom: 1px solid ${theme.colors.glass.border};
`;

export const Badge = styled.span<{ variant?: 'success' | 'warning' | 'error' | 'info' }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case 'error':
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      default:
        return `
          background: ${theme.colors.info}20;
          color: ${theme.colors.info};
        `;
    }
  }}
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxxl};
  color: ${theme.colors.text.tertiary};
  
  svg {
    width: 64px;
    height: 64px;
    margin-bottom: ${theme.spacing.lg};
    opacity: 0.5;
  }
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.md};
  }
`;