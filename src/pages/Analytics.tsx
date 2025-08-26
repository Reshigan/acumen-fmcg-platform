import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { DrillThroughTable } from '../components/analytics/DrillThroughTable';

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

const analyticsData = [
  {
    id: '1',
    name: 'Q3 2024 Performance',
    revenue: 4500000,
    growth: 0.15,
    margin: 0.28,
    roi: 2.3,
    status: 'On Track',
    children: [
      {
        id: '1-1',
        name: 'July 2024',
        revenue: 1400000,
        growth: 0.12,
        margin: 0.27,
        roi: 2.1,
        status: 'Completed'
      },
      {
        id: '1-2',
        name: 'August 2024',
        revenue: 1550000,
        growth: 0.18,
        margin: 0.29,
        roi: 2.4,
        status: 'Completed'
      },
      {
        id: '1-3',
        name: 'September 2024',
        revenue: 1550000,
        growth: 0.15,
        margin: 0.28,
        roi: 2.3,
        status: 'In Progress'
      }
    ]
  },
  {
    id: '2',
    name: 'Q2 2024 Performance',
    revenue: 4200000,
    growth: 0.22,
    margin: 0.26,
    roi: 2.1,
    status: 'Completed'
  },
  {
    id: '3',
    name: 'Q1 2024 Performance',
    revenue: 3800000,
    growth: 0.18,
    margin: 0.25,
    roi: 1.9,
    status: 'Completed'
  }
];

const columns = [
  { key: 'name', label: 'Period', sortable: true, drillDown: true },
  { key: 'revenue', label: 'Revenue', sortable: true, type: 'currency' as const },
  { key: 'growth', label: 'Growth', sortable: true, type: 'percentage' as const },
  { key: 'margin', label: 'Margin', sortable: true, type: 'percentage' as const },
  { key: 'roi', label: 'ROI', sortable: true, type: 'number' as const },
  { key: 'status', label: 'Status', sortable: false }
];

export const AnalyticsPage: React.FC = () => {
  return (
    <PageContainer>
      <PageContent>
        <Breadcrumbs />
        
        <PageHeader>
          <PageTitle>Analytics</PageTitle>
          <PageDescription>
            Deep dive into your sales performance with AI-powered insights and predictive analytics
          </PageDescription>
        </PageHeader>

        <DrillThroughTable
          columns={columns}
          data={analyticsData}
          expandable
          showActions
          onDrillDown={(row, level) => console.log('Drill down:', row, level)}
          onRowClick={(row) => console.log('Row clicked:', row)}
        />
      </PageContent>
    </PageContainer>
  );
};