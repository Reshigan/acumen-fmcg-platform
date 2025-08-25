import React, { useState } from 'react';
import { DraggableDashboard } from '../../components/common/DraggableWidget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  Target,
  Plus,
  Filter,
  Download,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { formatCurrency, formatPercentage, abbreviateNumber } from '../../utils/formatters';

// Sample data for charts
const salesData = [
  { month: 'Jan', actual: 4000, target: 3800, lastYear: 3500 },
  { month: 'Feb', actual: 3800, target: 4000, lastYear: 3700 },
  { month: 'Mar', actual: 4200, target: 4100, lastYear: 3900 },
  { month: 'Apr', actual: 4500, target: 4300, lastYear: 4100 },
  { month: 'May', actual: 4300, target: 4500, lastYear: 4200 },
  { month: 'Jun', actual: 4800, target: 4700, lastYear: 4400 },
];

const categoryData = [
  { name: 'Beverages', value: 35, color: '#3b82f6' },
  { name: 'Snacks', value: 25, color: '#10b981' },
  { name: 'Dairy', value: 20, color: '#f59e0b' },
  { name: 'Personal Care', value: 15, color: '#8b5cf6' },
  { name: 'Others', value: 5, color: '#ef4444' },
];

const promotionData = [
  { week: 'W1', roi: 2.3, volume: 1200 },
  { week: 'W2', roi: 2.8, volume: 1500 },
  { week: 'W3', roi: 2.1, volume: 1100 },
  { week: 'W4', roi: 3.2, volume: 1800 },
];

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  prefix?: string;
}> = ({ title, value, change, icon, prefix = '' }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary-100 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {prefix}{typeof value === 'number' ? abbreviateNumber(value) : value}
        </p>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState([
    {
      id: 'sales-trend',
      title: 'Sales Trend Analysis',
      size: 'large' as const,
      content: (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: any) => formatCurrency(value)} />
            <Legend />
            <Area type="monotone" dataKey="actual" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="target" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            <Line type="monotone" dataKey="lastYear" stroke="#94a3b8" strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'category-mix',
      title: 'Category Mix',
      size: 'medium' as const,
      content: (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'promotion-performance',
      title: 'Promotion Performance',
      size: 'medium' as const,
      content: (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={promotionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="roi" fill="#3b82f6" name="ROI" />
            <Bar yAxisId="right" dataKey="volume" fill="#10b981" name="Volume" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'top-customers',
      title: 'Top Customers',
      size: 'small' as const,
      content: (
        <div className="space-y-3">
          {['Walmart', 'Target', 'Kroger', 'Costco', 'CVS'].map((customer, index) => (
            <div key={customer} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                <span className="text-sm text-gray-900">{customer}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(Math.random() * 1000000 + 500000)}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'budget-utilization',
      title: 'Budget Utilization',
      size: 'small' as const,
      content: (
        <div className="space-y-4">
          {[
            { name: 'Marketing', used: 65, total: 100 },
            { name: 'Trade Terms', used: 80, total: 100 },
            { name: 'Promotions', used: 45, total: 100 },
            { name: 'Co-op', used: 70, total: 100 },
          ].map((budget) => (
            <div key={budget.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{budget.name}</span>
                <span className="text-gray-900 font-medium">{budget.used}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${budget.used}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]);

  const handleReorderWidgets = (newWidgets: typeof widgets) => {
    setWidgets(newWidgets);
  };

  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const handleSettingsWidget = (id: string) => {
    console.log('Settings for widget:', id);
  };

  const handleResizeWidget = (id: string) => {
    console.log('Resize widget:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Here's your business overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
            Filters
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Widget
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={4567890}
          change={12.5}
          icon={<DollarSign className="w-5 h-5 text-primary-600" />}
          prefix="$"
        />
        <MetricCard
          title="Active Customers"
          value={1234}
          change={8.3}
          icon={<Users className="w-5 h-5 text-primary-600" />}
        />
        <MetricCard
          title="Products Sold"
          value={45678}
          change={-3.2}
          icon={<Package className="w-5 h-5 text-primary-600" />}
        />
        <MetricCard
          title="Promotion ROI"
          value="2.8x"
          change={15.7}
          icon={<Target className="w-5 h-5 text-primary-600" />}
        />
      </div>

      {/* Draggable Dashboard */}
      <DraggableDashboard
        widgets={widgets}
        onReorder={handleReorderWidgets}
        onRemoveWidget={handleRemoveWidget}
        onSettingsWidget={handleSettingsWidget}
        onResizeWidget={handleResizeWidget}
      />

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                type: 'warning',
                title: 'Price Anomaly Detected',
                description: 'Competitor pricing 15% below market average on Brand X at Walmart',
                action: 'Review Pricing',
              },
              {
                type: 'success',
                title: 'High Performing Promotion',
                description: 'BOGOF promotion at Target exceeding forecast by 32%',
                action: 'Replicate Success',
              },
              {
                type: 'info',
                title: 'Budget Optimization Opportunity',
                description: 'Reallocate $50K from underperforming Region A to Region C',
                action: 'View Details',
              },
            ].map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.type === 'warning'
                    ? 'bg-amber-50 border-amber-500'
                    : insight.type === 'success'
                    ? 'bg-green-50 border-green-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <Button size="sm" variant="outline">
                  {insight.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};