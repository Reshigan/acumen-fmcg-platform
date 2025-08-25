import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  hoverable = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
        hoverable && 'card-hover cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('mb-4 pb-4 border-b border-gray-200', className)}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return <h3 className={cn('text-lg font-semibold text-gray-900', className)}>{children}</h3>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};