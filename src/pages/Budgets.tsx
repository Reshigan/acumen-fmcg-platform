import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { Button } from '../components/common/Button';
import { DollarSign, TrendingUp, PieChart, Target, AlertCircle } from 'lucide-react';

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

const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const BudgetCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${theme.colors.primary.main}, 
      ${theme.colors.secondary.main});
  }
`;

const BudgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${theme.spacing.lg};
`;

const BudgetTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

const BudgetIcon = styled.div<{ color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.color || theme.colors.primary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.color || theme.colors.primary.main};
  }
`;

const BudgetAmount = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const BudgetProgress = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const ProgressBar = styled.div`
  height: 8px;
  background: ${theme.colors.glass.background};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: ${theme.spacing.sm};
`;

const ProgressFill = styled(motion.div)<{ percentage: number; color?: string }>`
  height: 100%;
  background: ${props => props.color || `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`};
  border-radius: ${theme.borderRadius.full};
  width: ${props => props.percentage}%;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const BudgetDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.glass.border};
`;

const DetailItem = styled.div``;

const DetailLabel = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${theme.spacing.xs};
`;

const DetailValue = styled.div`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

const budgetData = [
  {
    title: 'Marketing Budget',
    icon: TrendingUp,
    color: theme.colors.primary.main,
    total: 500000,
    spent: 325000,
    remaining: 175000,
    percentage: 65,
    period: 'Q3 2024'
  },
  {
    title: 'Trade Promotion',
    icon: Target,
    color: theme.colors.success,
    total: 750000,
    spent: 450000,
    remaining: 300000,
    percentage: 60,
    period: 'Q3 2024'
  },
  {
    title: 'Co-op Advertising',
    icon: PieChart,
    color: theme.colors.warning,
    total: 250000,
    spent: 180000,
    remaining: 70000,
    percentage: 72,
    period: 'Q3 2024'
  },
  {
    title: 'Fixed Trading Terms',
    icon: DollarSign,
    color: theme.colors.info,
    total: 1000000,
    spent: 850000,
    remaining: 150000,
    percentage: 85,
    period: 'Annual 2024'
  }
];

export const BudgetsPage: React.FC = () => {
  return (
    <PageContainer>
      <PageContent>
        <Breadcrumbs />
        
        <PageHeader>
          <PageTitle>Budgets</PageTitle>
          <PageDescription>
            Monitor and manage your budget allocations across all commercial activities
          </PageDescription>
        </PageHeader>

        <BudgetGrid>
          {budgetData.map((budget, index) => (
            <BudgetCard
              key={budget.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <BudgetHeader>
                <BudgetTitle>{budget.title}</BudgetTitle>
                <BudgetIcon color={budget.color}>
                  <budget.icon />
                </BudgetIcon>
              </BudgetHeader>
              
              <BudgetAmount>
                ${new Intl.NumberFormat('en-US').format(budget.total)}
              </BudgetAmount>
              
              <BudgetProgress>
                <ProgressBar>
                  <ProgressFill
                    percentage={budget.percentage}
                    color={budget.color}
                    initial={{ width: 0 }}
                    animate={{ width: `${budget.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  />
                </ProgressBar>
                <ProgressText>
                  <span>{budget.percentage}% utilized</span>
                  <span>{budget.period}</span>
                </ProgressText>
              </BudgetProgress>
              
              <BudgetDetails>
                <DetailItem>
                  <DetailLabel>Spent</DetailLabel>
                  <DetailValue>
                    ${new Intl.NumberFormat('en-US').format(budget.spent)}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Remaining</DetailLabel>
                  <DetailValue>
                    ${new Intl.NumberFormat('en-US').format(budget.remaining)}
                  </DetailValue>
                </DetailItem>
              </BudgetDetails>
            </BudgetCard>
          ))}
        </BudgetGrid>

        {budgetData.some(b => b.percentage > 80) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              background: `${theme.colors.warning}20`,
              border: `1px solid ${theme.colors.warning}`,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.lg,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md
            }}
          >
            <AlertCircle color={theme.colors.warning} />
            <div>
              <div style={{ fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing.xs }}>
                Budget Alert
              </div>
              <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                Some budgets are approaching their limits. Consider reviewing allocations for Q4 planning.
              </div>
            </div>
            <Button variant="outline" size="sm">Review Budgets</Button>
          </motion.div>
        )}
      </PageContent>
    </PageContainer>
  );
};