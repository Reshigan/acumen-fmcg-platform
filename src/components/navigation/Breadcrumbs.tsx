import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
}

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md} 0;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: ${theme.borderRadius.full};
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BreadcrumbListItem = styled(motion.li)`
  display: flex;
  align-items: center;
`;

const BreadcrumbLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.fast};
  position: relative;
  
  &:hover {
    color: ${theme.colors.primary.main};
    background: ${theme.colors.glass.background};
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: ${theme.spacing.md};
      right: ${theme.spacing.md};
      height: 2px;
      background: linear-gradient(90deg, 
        transparent, 
        ${theme.colors.primary.main}, 
        transparent);
      animation: shimmer 1s ease-in-out;
    }
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const BreadcrumbSpan = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.primary.main};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const BreadcrumbText = styled.span<{ isActive?: boolean }>`
  color: ${props => props.isActive 
    ? theme.colors.primary.main 
    : theme.colors.text.secondary};
  font-weight: ${props => props.isActive 
    ? theme.typography.fontWeight.semibold 
    : theme.typography.fontWeight.medium};
`;

const BreadcrumbSeparator = styled.span`
  display: flex;
  align-items: center;
  margin: 0 ${theme.spacing.xs};
  color: ${theme.colors.text.tertiary};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const HomeIcon = styled(Home)`
  width: 18px;
  height: 18px;
`;

// Route configuration for automatic breadcrumb generation
const routeConfig: Record<string, string> = {
  '/': 'Dashboard',
  '/customers': 'Customers',
  '/products': 'Products',
  '/promotions': 'Promotions',
  '/calendar': 'Calendar',
  '/budgets': 'Budgets',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
  '/account-planning': 'Account Planning',
  '/promotion-planning': 'Promotion Planning',
  '/budget-overview': 'Budget Overview',
};

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    const label = routeConfig[currentPath] || 
                  path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    
    breadcrumbs.push({
      label,
      path: index === paths.length - 1 ? undefined : currentPath
    });
  });
  
  return breadcrumbs;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <ChevronRight />,
  showHome = true
}) => {
  const location = useLocation();
  
  // Use provided items or generate from current route
  const breadcrumbItems = items || generateBreadcrumbs(location.pathname);
  
  // Add home if requested and not already present
  const finalItems = showHome && location.pathname !== '/'
    ? [{ label: 'Home', path: '/', icon: <HomeIcon /> }, ...breadcrumbItems]
    : breadcrumbItems;
  
  if (finalItems.length === 0) return null;
  
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {finalItems.map((item, index) => {
          const isLast = index === finalItems.length - 1;
          
          return (
            <BreadcrumbListItem
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.path ? (
                <BreadcrumbLink to={item.path}>
                  {item.icon}
                  <BreadcrumbText>{item.label}</BreadcrumbText>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbSpan>
                  {item.icon}
                  <BreadcrumbText isActive>{item.label}</BreadcrumbText>
                </BreadcrumbSpan>
              )}
              
              {!isLast && (
                <BreadcrumbSeparator>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </BreadcrumbListItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};