import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { PromotionalCalendar } from '../components/promotions/PromotionalCalendar';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
`;

const PageContent = styled.div`
  margin-left: 280px;
  padding: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.light} 0%, 
    ${theme.colors.secondary.light} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
  margin-top: ${theme.spacing.sm};
`;

const mockPromotions = [
  {
    id: '1',
    title: 'Summer Sale 2024',
    customer: 'MegaMart',
    brand: 'All Brands',
    startDate: new Date(2024, 5, 1),
    endDate: new Date(2024, 5, 7),
    status: 'approved' as const,
    investment: 50000,
    expectedUplift: 25,
    color: '#8B5CF6'
  },
  {
    id: '2',
    title: 'Back to School',
    customer: 'QuickShop',
    brand: 'Snacks',
    startDate: new Date(2024, 5, 15),
    endDate: new Date(2024, 5, 30),
    status: 'active' as const,
    investment: 35000,
    expectedUplift: 20,
    color: '#3B82F6'
  },
  {
    id: '3',
    title: 'Weekend Special',
    customer: 'FreshFood',
    brand: 'Beverages',
    startDate: new Date(2024, 5, 8),
    endDate: new Date(2024, 5, 10),
    status: 'pending' as const,
    investment: 15000,
    expectedUplift: 15,
    color: '#F59E0B'
  },
  {
    id: '4',
    title: 'Monthly Deals',
    customer: 'ValueMart',
    brand: 'Personal Care',
    startDate: new Date(2024, 5, 1),
    endDate: new Date(2024, 5, 30),
    status: 'draft' as const,
    investment: 25000,
    expectedUplift: 18,
    color: '#10B981'
  }
];

export const PromotionsPage: React.FC = () => {
  const handlePromotionMove = (promotion: any, newDate: Date) => {
    console.log('Moving promotion:', promotion.title, 'to', newDate);
  };

  const handlePromotionClick = (promotion: any) => {
    console.log('Clicked promotion:', promotion);
  };

  return (
    <PageContainer>
      <PageContent>
        <Breadcrumbs />
        
        <PageHeader>
          <PageTitle>Promotions</PageTitle>
          <PageDescription>
            Plan, schedule, and track your promotional campaigns with AI-powered insights
          </PageDescription>
        </PageHeader>

        <PromotionalCalendar
          promotions={mockPromotions}
          onPromotionMove={handlePromotionMove}
          onPromotionClick={handlePromotionClick}
        />
      </PageContent>
    </PageContainer>
  );
};