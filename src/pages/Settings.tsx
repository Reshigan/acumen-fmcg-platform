import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { 
  User, 
  Building, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Database,
  Key,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
`;

const PageContent = styled.div`
  margin-left: 280px;
  padding: ${theme.spacing.xl};
  max-width: 1200px;
  
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

const SettingsTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.glass.border};
  overflow-x: auto;
`;

const SettingsTab = styled(motion.button)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? theme.colors.primary.main : 'transparent'};
  color: ${props => props.active ? theme.colors.primary.main : theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.primary.main};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const SettingsPanel = styled(motion.div)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const FormSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.glass.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
`;

const NotificationInfo = styled.div``;

const NotificationTitle = styled.div`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const NotificationDescription = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background: ${theme.colors.primary.main};
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.glass.border};
  transition: all ${theme.transitions.fast};
  border-radius: ${theme.borderRadius.full};
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: all ${theme.transitions.fast};
    border-radius: ${theme.borderRadius.full};
  }
`;

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'preferences', label: 'Preferences', icon: Palette }
];

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <SettingsPanel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionTitle>Profile Settings</SectionTitle>
            <FormSection>
              <FormGrid>
                <Input label="First Name" placeholder="John" icon={<User />} />
                <Input label="Last Name" placeholder="Doe" />
                <Input label="Email" type="email" placeholder="john.doe@example.com" icon={<Mail />} />
                <Input label="Phone" type="tel" placeholder="+1 234 567 8900" icon={<Phone />} />
                <Input label="Job Title" placeholder="Sales Director" />
                <Input label="Department" placeholder="Sales" />
              </FormGrid>
            </FormSection>
            <FormActions>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </FormActions>
          </SettingsPanel>
        );
        
      case 'company':
        return (
          <SettingsPanel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionTitle>Company Information</SectionTitle>
            <FormSection>
              <FormGrid>
                <Input label="Company Name" placeholder="Acumen Corp" icon={<Building />} />
                <Input label="Industry" placeholder="FMCG" />
                <Input label="Website" placeholder="www.acumen.com" icon={<Globe />} />
                <Input label="Tax ID" placeholder="XX-XXXXXXX" />
                <Input label="Address" placeholder="123 Business St" icon={<MapPin />} />
                <Input label="City" placeholder="New York" />
              </FormGrid>
            </FormSection>
            <FormActions>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </FormActions>
          </SettingsPanel>
        );
        
      case 'security':
        return (
          <SettingsPanel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionTitle>Security Settings</SectionTitle>
            <FormSection>
              <FormGrid>
                <Input label="Current Password" type="password" icon={<Key />} />
                <Input label="New Password" type="password" icon={<Key />} />
                <Input label="Confirm New Password" type="password" icon={<Key />} />
              </FormGrid>
            </FormSection>
            <FormSection>
              <SectionTitle>Two-Factor Authentication</SectionTitle>
              <NotificationItem>
                <NotificationInfo>
                  <NotificationTitle>Enable 2FA</NotificationTitle>
                  <NotificationDescription>
                    Add an extra layer of security to your account
                  </NotificationDescription>
                </NotificationInfo>
                <Toggle>
                  <ToggleInput type="checkbox" />
                  <ToggleSlider />
                </Toggle>
              </NotificationItem>
            </FormSection>
            <FormActions>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Update Security</Button>
            </FormActions>
          </SettingsPanel>
        );
        
      case 'notifications':
        return (
          <SettingsPanel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionTitle>Notification Preferences</SectionTitle>
            <FormSection>
              <NotificationItem>
                <NotificationInfo>
                  <NotificationTitle>Email Notifications</NotificationTitle>
                  <NotificationDescription>
                    Receive updates about your account via email
                  </NotificationDescription>
                </NotificationInfo>
                <Toggle>
                  <ToggleInput type="checkbox" defaultChecked />
                  <ToggleSlider />
                </Toggle>
              </NotificationItem>
              <NotificationItem>
                <NotificationInfo>
                  <NotificationTitle>Promotion Alerts</NotificationTitle>
                  <NotificationDescription>
                    Get notified when promotions need approval
                  </NotificationDescription>
                </NotificationInfo>
                <Toggle>
                  <ToggleInput type="checkbox" defaultChecked />
                  <ToggleSlider />
                </Toggle>
              </NotificationItem>
              <NotificationItem>
                <NotificationInfo>
                  <NotificationTitle>Budget Warnings</NotificationTitle>
                  <NotificationDescription>
                    Alert when budget utilization exceeds 80%
                  </NotificationDescription>
                </NotificationInfo>
                <Toggle>
                  <ToggleInput type="checkbox" defaultChecked />
                  <ToggleSlider />
                </Toggle>
              </NotificationItem>
              <NotificationItem>
                <NotificationInfo>
                  <NotificationTitle>AI Insights</NotificationTitle>
                  <NotificationDescription>
                    Receive AI-generated insights and recommendations
                  </NotificationDescription>
                </NotificationInfo>
                <Toggle>
                  <ToggleInput type="checkbox" />
                  <ToggleSlider />
                </Toggle>
              </NotificationItem>
            </FormSection>
          </SettingsPanel>
        );
        
      case 'preferences':
        return (
          <SettingsPanel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SectionTitle>Application Preferences</SectionTitle>
            <FormSection>
              <FormGrid>
                <div>
                  <label style={{ display: 'block', marginBottom: theme.spacing.sm, color: theme.colors.text.secondary }}>
                    Theme
                  </label>
                  <select style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    background: theme.colors.glass.background,
                    border: `1px solid ${theme.colors.glass.border}`,
                    borderRadius: theme.borderRadius.lg,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base
                  }}>
                    <option>Dark Mode</option>
                    <option>Light Mode</option>
                    <option>System Default</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: theme.spacing.sm, color: theme.colors.text.secondary }}>
                    Language
                  </label>
                  <select style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    background: theme.colors.glass.background,
                    border: `1px solid ${theme.colors.glass.border}`,
                    borderRadius: theme.borderRadius.lg,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base
                  }}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: theme.spacing.sm, color: theme.colors.text.secondary }}>
                    Date Format
                  </label>
                  <select style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    background: theme.colors.glass.background,
                    border: `1px solid ${theme.colors.glass.border}`,
                    borderRadius: theme.borderRadius.lg,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base
                  }}>
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: theme.spacing.sm, color: theme.colors.text.secondary }}>
                    Currency
                  </label>
                  <select style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    background: theme.colors.glass.background,
                    border: `1px solid ${theme.colors.glass.border}`,
                    borderRadius: theme.borderRadius.lg,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base
                  }}>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </FormGrid>
            </FormSection>
            <FormActions>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save Preferences</Button>
            </FormActions>
          </SettingsPanel>
        );
        
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <PageContent>
        <Breadcrumbs />
        
        <PageHeader>
          <PageTitle>Settings</PageTitle>
          <PageDescription>
            Manage your account settings and preferences
          </PageDescription>
        </PageHeader>

        <SettingsTabs>
          {tabs.map(tab => (
            <SettingsTab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon />
              {tab.label}
            </SettingsTab>
          ))}
        </SettingsTabs>

        {renderTabContent()}
      </PageContent>
    </PageContainer>
  );
};