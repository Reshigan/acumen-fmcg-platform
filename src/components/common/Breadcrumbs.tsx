import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  showHome?: boolean;
  onHomeClick?: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
  showHome = true,
  onHomeClick,
}) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      {showHome && (
        <>
          <button
            onClick={onHomeClick}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>
          {items.length > 0 && separator}
        </>
      )}
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {item.onClick || item.href ? (
              <button
                onClick={item.onClick}
                className={cn(
                  'flex items-center gap-1 transition-colors',
                  isLast
                    ? 'text-gray-900 font-medium cursor-default'
                    : 'text-gray-600 hover:text-primary-600'
                )}
                disabled={isLast}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </button>
            ) : (
              <span
                className={cn(
                  'flex items-center gap-1',
                  isLast ? 'text-gray-900 font-medium' : 'text-gray-600'
                )}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </span>
            )}
            
            {!isLast && separator}
          </React.Fragment>
        );
      })}
    </nav>
  );
};