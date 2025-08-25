import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Sun, Moon, Globe } from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from '../common/Breadcrumbs';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    paths.forEach((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      
      breadcrumbs.push({
        label,
        onClick: index < paths.length - 1 ? () => navigate(href) : undefined,
      });
    });
    
    return breadcrumbs;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumbs */}
          <div className="flex-1">
            <Breadcrumbs
              items={generateBreadcrumbs()}
              onHomeClick={() => navigate('/dashboard')}
            />
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers, products, promotions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {searchQuery && (
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-gray-100 rounded">
                  ESC
                </kbd>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Help */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};