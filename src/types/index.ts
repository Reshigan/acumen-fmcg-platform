// Core Types for Acumen Platform

// Multi-tenancy Types
export interface Company {
  id: string;
  name: string;
  code: string;
  logo?: string;
  currency: string;
  fiscalYearStart: Date;
  fiscalYearEnd: Date;
  settings: CompanySettings;
  licenses: License[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  type: 'manufacturer' | 'distributor' | 'hybrid';
}

export interface CompanySettings {
  theme: ThemeSettings;
  features: FeatureFlags;
  integrations: IntegrationSettings;
  hierarchies: HierarchySettings;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  favicon: string;
}

export interface FeatureFlags {
  budgetPlanning: boolean;
  aiPromotion: boolean;
  advancedAnalytics: boolean;
  contractManagement: boolean;
  competitorTracking: boolean;
}

export interface IntegrationSettings {
  erp?: ERPIntegration;
  crm?: CRMIntegration;
  finance?: FinanceIntegration;
}

export interface ERPIntegration {
  type: 'SAP' | 'Oracle' | 'Microsoft' | 'Custom';
  endpoint: string;
  apiKey: string;
  syncFrequency: 'realtime' | 'hourly' | 'daily';
}

export interface CRMIntegration {
  type: 'Salesforce' | 'HubSpot' | 'Dynamics' | 'Custom';
  endpoint: string;
  apiKey: string;
}

export interface FinanceIntegration {
  type: 'QuickBooks' | 'Xero' | 'SAP' | 'Custom';
  endpoint: string;
  apiKey: string;
}

export interface HierarchySettings {
  customerLevels: HierarchyLevel[];
  productLevels: HierarchyLevel[];
}

export interface HierarchyLevel {
  id: string;
  name: string;
  level: number;
  parentLevel?: string;
}

// License Management
export interface License {
  id: string;
  type: 'KAM' | 'SalesDirector' | 'Admin' | 'Viewer';
  totalSeats: number;
  usedSeats: number;
  expiryDate: Date;
}

// User & Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyId: string;
  managerId?: string;
  hierarchyPath: string[];
  permissions: Permission[];
  avatar?: string;
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRole {
  id: string;
  name: string;
  type: 'SuperAdmin' | 'CompanyAdmin' | 'SalesDirector' | 'RegionalManager' | 'KAM' | 'Viewer';
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[];
}

// Master Data Management
export interface Customer {
  id: string;
  code: string;
  name: string;
  type: 'Retailer' | 'Wholesaler' | 'Distributor' | 'DirectCustomer';
  hierarchyLevel: string;
  parentId?: string;
  children?: Customer[];
  address: Address;
  contacts: Contact[];
  tradingTerms: TradingTerm[];
  creditLimit: number;
  paymentTerms: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  vendor: string;
  unitPrice: number;
  caseSize: number;
  weight: number;
  dimensions: Dimensions;
  barcode: string;
  isActive: boolean;
  launchDate?: Date;
  discontinuedDate?: Date;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inch';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

// Budget & Financial Planning
export interface Budget {
  id: string;
  name: string;
  companyId: string;
  fiscalYear: number;
  type: 'Annual' | 'Quarterly' | 'Monthly';
  status: 'Draft' | 'Submitted' | 'Approved' | 'Active' | 'Closed';
  totalAmount: number;
  allocatedAmount: number;
  spentAmount: number;
  scenarios: BudgetScenario[];
  allocations: BudgetAllocation[];
  approvals: Approval[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetScenario {
  id: string;
  name: string;
  description: string;
  assumptions: string[];
  totalAmount: number;
  allocations: BudgetAllocation[];
  isActive: boolean;
}

export interface BudgetAllocation {
  id: string;
  budgetId: string;
  type: 'Marketing' | 'TradingTerms' | 'CoOp' | 'Promotional';
  customerId?: string;
  productId?: string;
  brandId?: string;
  amount: number;
  period: string;
  status: 'Planned' | 'Committed' | 'Spent';
}

export interface TradingTerm {
  id: string;
  customerId: string;
  type: 'Volume' | 'Growth' | 'Display' | 'Listing' | 'Payment';
  name: string;
  description: string;
  percentage?: number;
  fixedAmount?: number;
  conditions: string[];
  startDate: Date;
  endDate: Date;
  status: 'Draft' | 'Active' | 'Expired';
  contractId?: string;
}

// Account Planning
export interface AccountPlan {
  id: string;
  customerId: string;
  kamId: string;
  fiscalYear: number;
  status: 'Draft' | 'InProgress' | 'Submitted' | 'Approved';
  objectives: Objective[];
  strategies: Strategy[];
  initiatives: Initiative[];
  budget: AccountBudget;
  performance: PerformanceMetrics;
  jbpStatus?: JBPStatus;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  status: 'NotStarted' | 'InProgress' | 'AtRisk' | 'Completed';
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  tactics: string[];
}

export interface Initiative {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  owner: string;
  status: 'Planned' | 'Active' | 'Completed' | 'Cancelled';
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: Date;
  status: 'Pending' | 'Completed' | 'Delayed';
  completedDate?: Date;
}

export interface AccountBudget {
  total: number;
  marketing: number;
  tradingTerms: number;
  promotional: number;
  coOp: number;
  allocated: number;
  spent: number;
  committed: number;
}

export interface PerformanceMetrics {
  salesVolume: MetricValue;
  salesValue: MetricValue;
  marketShare: MetricValue;
  distribution: MetricValue;
  promotionalROI: MetricValue;
}

export interface MetricValue {
  target: number;
  actual: number;
  previousYear: number;
  growth: number;
}

export interface JBPStatus {
  isActive: boolean;
  sharedObjectives: Objective[];
  jointInitiatives: Initiative[];
  lastReviewDate: Date;
  nextReviewDate: Date;
}

// Promotional Planning
export interface Promotion {
  id: string;
  name: string;
  type: 'PriceReduction' | 'BOGOF' | 'Bundle' | 'Display' | 'Feature';
  status: 'Draft' | 'Submitted' | 'Approved' | 'Active' | 'Completed' | 'Cancelled';
  customerId: string;
  products: PromotionProduct[];
  startDate: Date;
  endDate: Date;
  mechanics: PromotionMechanics;
  forecast: PromotionForecast;
  actual?: PromotionActual;
  budget: PromotionBudget;
  approvals: Approval[];
  conflicts?: Conflict[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromotionProduct {
  productId: string;
  regularPrice: number;
  promotionalPrice: number;
  discount: number;
  discountType: 'Percentage' | 'Fixed';
  targetVolume: number;
  minOrderQuantity?: number;
}

export interface PromotionMechanics {
  displayType?: 'Gondola' | 'Endcap' | 'Checkout' | 'None';
  featureType?: 'FrontPage' | 'InPage' | 'Digital' | 'None';
  additionalSupport?: string[];
}

export interface PromotionForecast {
  baselineVolume: number;
  upliftPercentage: number;
  incrementalVolume: number;
  totalVolume: number;
  cannibalization: number;
  roi: number;
  confidence: number;
  aiPrediction?: AIPrediction;
}

export interface AIPrediction {
  recommendedPrice: number;
  expectedUplift: number;
  confidenceInterval: [number, number];
  factors: PredictionFactor[];
}

export interface PredictionFactor {
  name: string;
  impact: 'Positive' | 'Negative' | 'Neutral';
  weight: number;
}

export interface PromotionActual {
  actualVolume: number;
  actualRevenue: number;
  actualCost: number;
  actualROI: number;
  postPromotionEffect: PostPromotionEffect;
}

export interface PostPromotionEffect {
  sustainedUplift: number;
  pantryLoading: number;
  newBuyers: number;
  repeatRate: number;
}

export interface PromotionBudget {
  totalCost: number;
  fundingSource: 'Vendor' | 'Customer' | 'Shared';
  vendorContribution: number;
  customerContribution: number;
}

export interface Conflict {
  id: string;
  type: 'Price' | 'Timing' | 'Product';
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  affectedPromotions: string[];
  resolution?: string;
}

// Analytics & Reporting
export interface Dashboard {
  id: string;
  name: string;
  description: string;
  userId: string;
  isPublic: boolean;
  widgets: Widget[];
  filters: DashboardFilter[];
  layout: LayoutConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface Widget {
  id: string;
  type: 'Chart' | 'Table' | 'Metric' | 'Map' | 'Custom';
  title: string;
  dataSource: string;
  config: WidgetConfig;
  position: Position;
  size: Size;
}

export interface WidgetConfig {
  chartType?: 'Line' | 'Bar' | 'Pie' | 'Area' | 'Scatter';
  metrics?: string[];
  dimensions?: string[];
  filters?: Filter[];
  sorting?: SortConfig;
  colors?: string[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface DashboardFilter {
  field: string;
  operator: 'equals' | 'contains' | 'between' | 'in';
  value: any;
}

export interface LayoutConfig {
  columns: number;
  rows: number;
  gap: number;
}

export interface Filter {
  field: string;
  operator: string;
  value: any;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

// Workflow & Approvals
export interface Approval {
  id: string;
  entityType: 'Budget' | 'Promotion' | 'Contract' | 'AccountPlan';
  entityId: string;
  requesterId: string;
  approverId: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Escalated';
  comments?: string;
  conditions?: string[];
  requestedAt: Date;
  respondedAt?: Date;
}

export interface Workflow {
  id: string;
  name: string;
  entityType: string;
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
  isActive: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  order: number;
  approverRole: string;
  approverIds?: string[];
  escalationTime?: number;
  escalationTo?: string;
}

export interface WorkflowCondition {
  field: string;
  operator: string;
  value: any;
  action: 'RequireApproval' | 'AutoApprove' | 'Reject';
}

// Notifications & Alerts
export interface Notification {
  id: string;
  userId: string;
  type: 'Info' | 'Warning' | 'Error' | 'Success';
  category: 'System' | 'Approval' | 'Alert' | 'Reminder';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

export interface Alert {
  id: string;
  name: string;
  type: 'Threshold' | 'Anomaly' | 'Deadline' | 'Custom';
  condition: AlertCondition;
  recipients: string[];
  frequency: 'Immediate' | 'Daily' | 'Weekly';
  isActive: boolean;
}

export interface AlertCondition {
  metric: string;
  operator: string;
  threshold: number;
  timeWindow?: string;
}

// Audit & Compliance
export interface AuditLog {
  id: string;
  userId: string;
  companyId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: ChangeRecord[];
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface ChangeRecord {
  field: string;
  oldValue: any;
  newValue: any;
}

// Competition Tracking
export interface CompetitorActivity {
  id: string;
  competitorName: string;
  customerId: string;
  productCategory: string;
  activityType: 'Pricing' | 'Promotion' | 'Display' | 'NewProduct';
  description: string;
  observedPrice?: number;
  observedDate: Date;
  reportedBy: string;
  evidence?: string[];
  impact: 'High' | 'Medium' | 'Low';
}