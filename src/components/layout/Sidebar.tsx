import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  Target,
  TrendingUp,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Building2,
  FileText,
  Brain,
  Shield,
  Database,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/authStore';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  badge?: string | number;
  permissions?: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/dashboard',
  },
  {
    id: 'master-data',
    label: 'Master Data',
    icon: <Database className="w-5 h-5" />,
    children: [
      {
        id: 'customers',
        label: 'Customers',
        icon: <Building2 className="w-5 h-5" />,
        path: '/mdm/customers',
      },
      {
        id: 'products',
        label: 'Products',
        icon: <Package className="w-5 h-5" />,
        path: '/mdm/products',
      },
      {
        id: 'hierarchies',
        label: 'Hierarchies',
        icon: <ChevronDown className="w-5 h-5" />,
        path: '/mdm/hierarchies',
      },
    ],
  },
  {
    id: 'budget',
    label: 'Budget Planning',
    icon: <DollarSign className="w-5 h-5" />,
    children: [
      {
        id: 'budget-overview',
        label: 'Overview',
        icon: <BarChart3 className="w-5 h-5" />,
        path: '/budget/overview',
      },
      {
        id: 'budget-scenarios',
        label: 'Scenarios',
        icon: <Brain className="w-5 h-5" />,
        path: '/budget/scenarios',
      },
      {
        id: 'budget-allocation',
        label: 'Allocation',
        icon: <Target className="w-5 h-5" />,
        path: '/budget/allocation',
      },
    ],
  },
  {
    id: 'account',
    label: 'Account Planning',
    icon: <Target className="w-5 h-5" />,
    children: [
      {
        id: 'account-plans',
        label: 'Account Plans',
        icon: <FileText className="w-5 h-5" />,
        path: '/account/plans',
      },
      {
        id: 'trading-terms',
        label: 'Trading Terms',
        icon: <DollarSign className="w-5 h-5" />,
        path: '/account/trading-terms',
      },
      {
        id: 'jbp',
        label: 'Joint Business Planning',
        icon: <Users className="w-5 h-5" />,
        path: '/account/jbp',
      },
    ],
  },
  {
    id: 'promotions',
    label: 'Promotions',
    icon: <TrendingUp className="w-5 h-5" />,
    children: [
      {
        id: 'promo-planning',
        label: 'Planning',
        icon: <Target className="w-5 h-5" />,
        path: '/promotion/planning',
      },
      {
        id: 'promo-calendar',
        label: 'Calendar',
        icon: <FileText className="w-5 h-5" />,
        path: '/promotion/calendar',
      },
      {
        id: 'promo-ai',
        label: 'AI Optimization',
        icon: <Brain className="w-5 h-5" />,
        path: '/promotion/ai-optimization',
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      {
        id: 'dashboards',
        label: 'Dashboards',
        icon: <LayoutDashboard className="w-5 h-5" />,
        path: '/analytics/dashboards',
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: <FileText className="w-5 h-5" />,
        path: '/analytics/reports',
      },
      {
        id: 'insights',
        label: 'AI Insights',
        icon: <Brain className="w-5 h-5" />,
        path: '/analytics/insights',
      },
    ],
  },
];

const adminMenuItems: MenuItem[] = [
  {
    id: 'admin',
    label: 'Administration',
    icon: <Shield className="w-5 h-5" />,
    children: [
      {
        id: 'users',
        label: 'Users',
        icon: <Users className="w-5 h-5" />,
        path: '/admin/users',
      },
      {
        id: 'roles',
        label: 'Roles & Permissions',
        icon: <Shield className="w-5 h-5" />,
        path: '/admin/roles',
      },
      {
        id: 'company',
        label: 'Company Settings',
        icon: <Building2 className="w-5 h-5" />,
        path: '/admin/company',
      },
      {
        id: 'integrations',
        label: 'Integrations',
        icon: <Database className="w-5 h-5" />,
        path: '/admin/integrations',
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, company, logout } = useAuthStore();
  const [expandedItems, setExpandedItems] = useState<string[]>(['master-data']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
      setIsMobileOpen(false);
    }
  };

  const isActive = (path?: string) => {
    return path ? location.pathname === path : false;
  };

  const isParentActive = (item: MenuItem) => {
    if (item.children) {
      return item.children.some((child) => isActive(child.path));
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.path) || isParentActive(item);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              handleNavigation(item.path);
            }
          }}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200',
            depth > 0 && 'ml-4',
            active
              ? 'bg-primary-100 text-primary-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          )}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="text-sm">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          {hasChildren && (
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                isExpanded && 'rotate-90'
              )}
            />
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const allMenuItems = user?.role.type === 'CompanyAdmin' || user?.role.type === 'SuperAdmin'
    ? [...menuItems, ...adminMenuItems]
    : menuItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-transform duration-300',
          'w-64 overflow-y-auto',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-4">
          {/* Logo and Company */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Acumen</h1>
                <p className="text-xs text-gray-500">{company?.name || 'FMCG Platform'}</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
                <span className="text-primary-700 font-medium">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.role.name}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {allMenuItems.map((item) => renderMenuItem(item))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-8 pt-4 border-t border-gray-200 space-y-2">
            <button
              onClick={() => handleNavigation('/notifications')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="text-sm">Notifications</span>
              <span className="ml-auto px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                3
              </span>
            </button>
            
            <button
              onClick={() => handleNavigation('/settings')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm">Settings</span>
            </button>
            
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};