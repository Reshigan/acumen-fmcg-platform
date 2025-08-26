import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  TrendingUp, 
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const SidebarContainer = styled(motion.aside)<{ isCollapsed: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${props => props.isCollapsed ? '80px' : '280px'};
  background: ${theme.colors.background.secondary};
  border-right: 1px solid ${theme.colors.glass.border};
  display: flex;
  flex-direction: column;
  z-index: ${theme.zIndex.dropdown};
  transition: width ${theme.transitions.normal};
`;

const SidebarHeader = styled.div<{ isCollapsed: boolean }>`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.glass.border};
  display: flex;
  align-items: center;
  justify-content: ${props => props.isCollapsed ? 'center' : 'space-between'};
`;

const ToggleButton = styled(motion.button)`
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    background: ${theme.colors.primary.main};
    color: white;
    transform: scale(1.1);
  }
`;

const SearchBar = styled(motion.div)<{ isCollapsed: boolean }>`
  margin: ${theme.spacing.lg};
  position: relative;
  display: ${props => props.isCollapsed ? 'none' : 'block'};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-left: 40px;
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  transition: all ${theme.transitions.normal};
  
  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.text.tertiary};
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Navigation = styled.nav`
  flex: 1;
  padding: ${theme.spacing.lg};
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: ${theme.borderRadius.full};
  }
`;

const NavSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const NavSectionTitle = styled.div<{ isCollapsed: boolean }>`
  color: ${theme.colors.text.tertiary};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${theme.spacing.sm};
  padding: 0 ${theme.spacing.sm};
  display: ${props => props.isCollapsed ? 'none' : 'block'};
`;

const NavItem = styled(NavLink)<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  transition: all ${theme.transitions.normal};
  position: relative;
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};
  
  &:hover {
    background: ${theme.colors.glass.background};
    color: ${theme.colors.text.primary};
    transform: translateX(${props => props.$isCollapsed ? '0' : '4px'});
  }
  
  &.active {
    background: linear-gradient(135deg, 
      ${theme.colors.primary.main}20 0%, 
      ${theme.colors.secondary.main}20 100%);
    color: ${theme.colors.primary.light};
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 70%;
      background: linear-gradient(180deg, 
        ${theme.colors.primary.main} 0%, 
        ${theme.colors.secondary.main} 100%);
      border-radius: 0 ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0;
    }
  }
  
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const NavItemText = styled.span<{ isCollapsed: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  display: ${props => props.isCollapsed ? 'none' : 'block'};
  white-space: nowrap;
`;

const NavItemBadge = styled(motion.span)`
  background: ${theme.colors.primary.main};
  color: white;
  font-size: ${theme.typography.fontSize.xs};
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.full};
  margin-left: auto;
`;

const SidebarFooter = styled.div<{ isCollapsed: boolean }>`
  padding: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.glass.border};
`;

const UserProfile = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.main} 0%, 
    ${theme.colors.secondary.main} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${theme.typography.fontWeight.bold};
  flex-shrink: 0;
`;

const UserInfo = styled.div<{ isCollapsed: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'block'};
`;

const UserName = styled.div`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const UserRole = styled.div`
  color: ${theme.colors.text.tertiary};
  font-size: ${theme.typography.fontSize.xs};
`;

const QuickAction = styled(motion.button)`
  width: 100%;
  padding: ${theme.spacing.md};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.main} 0%, 
    ${theme.colors.secondary.main} 100%);
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg}, ${theme.shadows.glow};
  }
`;

const navigationItems = [
  {
    section: 'Main',
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/customers', label: 'Customers', icon: Users, badge: '12' },
      { path: '/products', label: 'Products', icon: Package },
      { path: '/promotions', label: 'Promotions', icon: TrendingUp, badge: '3' },
      { path: '/calendar', label: 'Calendar', icon: Calendar },
    ],
  },
  {
    section: 'Management',
    items: [
      { path: '/budgets', label: 'Budgets', icon: TrendingUp },
      { path: '/analytics', label: 'Analytics', icon: TrendingUp },
      { path: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed: controlledCollapsed, 
  onToggle 
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };
  
  return (
    <SidebarContainer
      isCollapsed={isCollapsed}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <SidebarHeader isCollapsed={isCollapsed}>
        {!isCollapsed && <Logo size="sm" variant="full" />}
        <ToggleButton
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </ToggleButton>
      </SidebarHeader>
      
      <SearchBar isCollapsed={isCollapsed}>
        <SearchIcon>
          <Search />
        </SearchIcon>
        <SearchInput placeholder="Search..." />
      </SearchBar>
      
      <Navigation>
        {navigationItems.map((section) => (
          <NavSection key={section.section}>
            <NavSectionTitle isCollapsed={isCollapsed}>
              {section.section}
            </NavSectionTitle>
            {section.items.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                $isCollapsed={isCollapsed}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <item.icon />
                <NavItemText isCollapsed={isCollapsed}>
                  {item.label}
                </NavItemText>
                {item.badge && !isCollapsed && (
                  <NavItemBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    {item.badge}
                  </NavItemBadge>
                )}
              </NavItem>
            ))}
          </NavSection>
        ))}
      </Navigation>
      
      <SidebarFooter isCollapsed={isCollapsed}>
        <UserProfile isCollapsed={isCollapsed}>
          <UserAvatar>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </UserAvatar>
          <UserInfo isCollapsed={isCollapsed}>
            <UserName>{user?.name || 'User'}</UserName>
            <UserRole>{user?.role || 'Role'}</UserRole>
          </UserInfo>
        </UserProfile>
        
        {!isCollapsed && (
          <QuickAction
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} />
            Quick Action
          </QuickAction>
        )}
      </SidebarFooter>
    </SidebarContainer>
  );
};
