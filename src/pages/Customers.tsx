import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { DrillThroughTable } from '../components/analytics/DrillThroughTable';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { Users, Plus, Search, Filter, Download, Building2, MapPin, Phone, Mail } from 'lucide-react';

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

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
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

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const CustomerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const CustomerCard = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary.main};
  }
`;

const CustomerHeader = styled.div`
  display: flex;
  align-items: start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const CustomerIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.main} 0%, 
    ${theme.colors.secondary.main} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const CustomerInfo = styled.div`
  flex: 1;
`;

const CustomerName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const CustomerType = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const CustomerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  
  svg {
    width: 16px;
    height: 16px;
    color: ${theme.colors.text.tertiary};
  }
`;

const CustomerMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.glass.border};
`;

const Metric = styled.div``;

const MetricLabel = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${theme.spacing.xs};
`;

const MetricValue = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

const mockCustomers = [
  {
    id: '1',
    name: 'MegaMart Chain',
    type: 'Retail Chain',
    locations: 45,
    contact: 'John Smith',
    email: 'john@megamart.com',
    phone: '+1 234 567 8900',
    revenue: '$12.5M',
    growth: '+15%'
  },
  {
    id: '2',
    name: 'QuickShop Express',
    type: 'Convenience Store',
    locations: 120,
    contact: 'Sarah Johnson',
    email: 'sarah@quickshop.com',
    phone: '+1 234 567 8901',
    revenue: '$8.3M',
    growth: '+22%'
  },
  {
    id: '3',
    name: 'FreshFood Markets',
    type: 'Supermarket',
    locations: 28,
    contact: 'Mike Davis',
    email: 'mike@freshfood.com',
    phone: '+1 234 567 8902',
    revenue: '$15.7M',
    growth: '+8%'
  },
  {
    id: '4',
    name: 'ValueMart Stores',
    type: 'Discount Store',
    locations: 67,
    contact: 'Lisa Brown',
    email: 'lisa@valuemart.com',
    phone: '+1 234 567 8903',
    revenue: '$9.2M',
    growth: '+18%'
  }
];

const tableColumns = [
  { key: 'name', label: 'Customer Name', sortable: true, drillDown: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'locations', label: 'Locations', sortable: true, type: 'number' as const },
  { key: 'revenue', label: 'Revenue', sortable: true, type: 'currency' as const },
  { key: 'growth', label: 'Growth', sortable: true, type: 'percentage' as const }
];

export const CustomersPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  return (
    <PageContainer>
      <PageContent>
        <Breadcrumbs />
        
        <PageHeader>
          <HeaderTop>
            <div>
              <PageTitle>Customers</PageTitle>
              <PageDescription>
                Manage your customer accounts and trading relationships
              </PageDescription>
            </div>
            <HeaderActions>
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}>
                {viewMode === 'grid' ? 'Table View' : 'Grid View'}
              </Button>
              <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
                <Plus size={16} />
                Add Customer
              </Button>
            </HeaderActions>
          </HeaderTop>
        </PageHeader>

        <StatsRow>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatValue>342</StatValue>
            <StatLabel>Total Customers</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatValue>28</StatValue>
            <StatLabel>New This Month</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatValue>$45.6M</StatValue>
            <StatLabel>Total Revenue</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatValue>+18.5%</StatValue>
            <StatLabel>Average Growth</StatLabel>
          </StatCard>
        </StatsRow>

        {viewMode === 'grid' ? (
          <CustomerGrid>
            {mockCustomers.map((customer, index) => (
              <CustomerCard
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4 }}
              >
                <CustomerHeader>
                  <CustomerIcon>
                    <Building2 size={24} />
                  </CustomerIcon>
                  <CustomerInfo>
                    <CustomerName>{customer.name}</CustomerName>
                    <CustomerType>{customer.type}</CustomerType>
                  </CustomerInfo>
                </CustomerHeader>
                
                <CustomerDetails>
                  <DetailRow>
                    <MapPin />
                    <span>{customer.locations} Locations</span>
                  </DetailRow>
                  <DetailRow>
                    <Mail />
                    <span>{customer.email}</span>
                  </DetailRow>
                  <DetailRow>
                    <Phone />
                    <span>{customer.phone}</span>
                  </DetailRow>
                </CustomerDetails>
                
                <CustomerMetrics>
                  <Metric>
                    <MetricLabel>Revenue</MetricLabel>
                    <MetricValue>{customer.revenue}</MetricValue>
                  </Metric>
                  <Metric>
                    <MetricLabel>Growth</MetricLabel>
                    <MetricValue>{customer.growth}</MetricValue>
                  </Metric>
                </CustomerMetrics>
              </CustomerCard>
            ))}
          </CustomerGrid>
        ) : (
          <DrillThroughTable
            columns={tableColumns}
            data={mockCustomers}
            showActions
            onRowClick={(row) => console.log('Row clicked:', row)}
            onRowAction={(action, row) => console.log(action, row)}
          />
        )}

        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Customer"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            <Input label="Customer Name" placeholder="Enter customer name" />
            <Input label="Customer Type" placeholder="e.g., Retail Chain, Supermarket" />
            <Input label="Number of Locations" type="number" placeholder="0" />
            <Input label="Contact Name" placeholder="Enter contact name" />
            <Input label="Email" type="email" placeholder="email@example.com" />
            <Input label="Phone" type="tel" placeholder="+1 234 567 8900" />
            <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowAddModal(false)}>
                Add Customer
              </Button>
            </div>
          </div>
        </Modal>
      </PageContent>
    </PageContainer>
  );
};