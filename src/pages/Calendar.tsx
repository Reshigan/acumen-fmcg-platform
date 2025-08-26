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

export const CalendarPage: React.FC = () => {
  return (
    <PageContainer>
      <PageContent>
        <Breadcrumbs />
        
        <PageHeader>
          <PageTitle>Calendar</PageTitle>
          <PageDescription>
            View and manage all promotional activities in a unified calendar
          </PageDescription>
        </PageHeader>

        <PromotionalCalendar promotions={[]} />
      </PageContent>
    </PageContainer>
  );
};
