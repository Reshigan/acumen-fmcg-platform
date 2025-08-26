import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { TrendingUp, Users, Package, DollarSign, ArrowUp, ArrowDown, Activity, Calendar, BarChart3 } from 'lucide-react';
import { 
  DashboardContainer, 
  DashboardContent, 
  DashboardHeader,
  HeaderTop,
  PageTitle,
  HeaderActions,
  StatsGrid,
  StatCard,
  StatIcon,
  StatLabel,
  StatValue,
  StatChange,
  ChartsSection,
  ChartCard,
  ChartHeader,
  ChartTitle,
  TableSection
} from '../Dashboard.styled';

const PageDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
  margin-top: ${theme.spacing.sm};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ActivityItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.p`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const ActivityDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const ActivityTime = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.tertiary};
  white-space: nowrap;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
`;

const statsData = [
  {
    title: 'Total Revenue',
    value: '$1,234,567',
    change: '+12.5%',
    isPositive: true,
    icon: DollarSign,
    color: theme.colors.success
  },
  {
    title: 'Active Customers',
    value: '342',
    change: '+5 new',
    isPositive: true,
    icon: Users,
    color: theme.colors.info
  },
  {
    title: 'Products',
    value: '1,847',
    change: '12 categories',
    isPositive: true,
    icon: Package,
    color: theme.colors.primary.main
  },
  {
    title: 'Growth Rate',
    value: '23.4%',
    change: 'YoY',
    isPositive: true,
    icon: TrendingUp,
    color: theme.colors.warning
  }
];

const activities = [
  {
    title: 'New promotion approved',
    description: 'Summer Sale 2024 - 20% off selected items',
    time: '2h ago'
  },
  {
    title: 'Budget allocation updated',
    description: 'Q3 marketing budget increased by $50,000',
    time: '5h ago'
  },
  {
    title: 'New customer onboarded',
    description: 'MegaMart Chain - 15 locations',
    time: '1d ago'
  },
  {
    title: 'AI prediction completed',
    description: 'Promotional uplift forecast for Q3 ready',
    time: '2d ago'
  }
];

export const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardContent hasSidebar>
        <Breadcrumbs />
        
        <DashboardHeader>
          <HeaderTop>
            <div>
              <PageTitle>Dashboard</PageTitle>
              <PageDescription>
                Welcome back! Here's an overview of your FMCG sales performance.
              </PageDescription>
            </div>
            <HeaderActions>
              <Button variant="outline" size="sm">
                <Calendar size={16} />
                Last 30 Days
              </Button>
              <Button variant="primary" size="sm">
                <BarChart3 size={16} />
                View Reports
              </Button>
            </HeaderActions>
          </HeaderTop>
        </DashboardHeader>

        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatCard
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <StatIcon color={stat.color}>
                <stat.icon />
              </StatIcon>
              <StatLabel>{stat.title}</StatLabel>
              <StatValue>{stat.value}</StatValue>
              <StatChange isPositive={stat.isPositive}>
                {stat.isPositive ? <ArrowUp /> : <ArrowDown />}
                {stat.change}
              </StatChange>
            </StatCard>
          ))}
        </StatsGrid>

        <ChartsSection>
          <ChartCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ChartHeader>
              <ChartTitle>Recent Activities</ChartTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </ChartHeader>
            <CardContent>
              <ActivityList>
                {activities.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <ActivityContent>
                      <ActivityTitle>{activity.title}</ActivityTitle>
                      <ActivityDescription>{activity.description}</ActivityDescription>
                    </ActivityContent>
                    <ActivityTime>{activity.time}</ActivityTime>
                  </ActivityItem>
                ))}
              </ActivityList>
            </CardContent>
          </ChartCard>

          <ChartCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ChartHeader>
              <ChartTitle>Quick Actions</ChartTitle>
              <Activity size={20} color={theme.colors.primary.main} />
            </ChartHeader>
            <CardContent>
              <QuickActionsGrid>
                <Button variant="gradient" size="md">
                  Create Promotion
                </Button>
                <Button variant="outline" size="md">
                  View Plans
                </Button>
                <Button variant="outline" size="md">
                  AI Insights
                </Button>
                <Button variant="outline" size="md">
                  Manage Budget
                </Button>
              </QuickActionsGrid>
            </CardContent>
          </ChartCard>
        </ChartsSection>
      </DashboardContent>
    </DashboardContainer>
  );
};
