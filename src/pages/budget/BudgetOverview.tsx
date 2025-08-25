import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  Filter,
  Download,
  ChevronRight,
  Target,
  PieChart,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Treemap,
  Sankey,
  Rectangle,
} from 'recharts';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

// Waterfall chart data
const waterfallData = [
  { name: 'Total Budget', value: 10000000, type: 'total' },
  { name: 'Marketing', value: -3000000, type: 'expense' },
  { name: 'Trading Terms', value: -2500000, type: 'expense' },
  { name: 'Promotions', value: -2000000, type: 'expense' },
  { name: 'Co-op Spend', value: -1500000, type: 'expense' },
  { name: 'Reserve', value: -500000, type: 'expense' },
  { name: 'Remaining', value: 500000, type: 'remaining' },
];

// Budget allocation by category
const allocationData = [
  { name: 'Marketing', value: 3000000, percentage: 30 },
  { name: 'Trading Terms', value: 2500000, percentage: 25 },
  { name: 'Promotions', value: 2000000, percentage: 20 },
  { name: 'Co-op Spend', value: 1500000, percentage: 15 },
  { name: 'Reserve', value: 500000, percentage: 5 },
  { name: 'Unallocated', value: 500000, percentage: 5 },
];

// Monthly phasing data
const phasingData = [
  { month: 'Jan', budget: 800000, actual: 750000, forecast: 820000 },
  { month: 'Feb', budget: 850000, actual: 880000, forecast: 860000 },
  { month: 'Mar', budget: 900000, actual: 920000, forecast: 910000 },
  { month: 'Apr', budget: 850000, actual: 830000, forecast: 840000 },
  { month: 'May', budget: 800000, actual: 0, forecast: 810000 },
  { month: 'Jun', budget: 900000, actual: 0, forecast: 920000 },
  { month: 'Jul', budget: 850000, actual: 0, forecast: 860000 },
  { month: 'Aug', budget: 800000, actual: 0, forecast: 790000 },
  { month: 'Sep', budget: 850000, actual: 0, forecast: 870000 },
  { month: 'Oct', budget: 900000, actual: 0, forecast: 910000 },
  { month: 'Nov', budget: 750000, actual: 0, forecast: 760000 },
  { month: 'Dec', budget: 750000, actual: 0, forecast: 750000 },
];

// Scenario comparison
const scenarios = [
  {
    id: '1',
    name: 'Conservative',
    totalBudget: 9000000,
    expectedROI: 2.1,
    riskLevel: 'Low',
    status: 'Draft',
  },
  {
    id: '2',
    name: 'Balanced',
    totalBudget: 10000000,
    expectedROI: 2.5,
    riskLevel: 'Medium',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Aggressive Growth',
    totalBudget: 12000000,
    expectedROI: 3.2,
    riskLevel: 'High',
    status: 'Draft',
  },
];

const CustomTreemapContent: React.FC<any> = (props) => {
  const { x, y, width, height, name, value, percentage } = props;
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: props.fill,
          stroke: '#fff',
          strokeWidth: 2,
        }}
      />
      {width > 60 && height > 40 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 10}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
            fontWeight="bold"
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 10}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
          >
            {formatCurrency(value)}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 25}
            textAnchor="middle"
            fill="#fff"
            fontSize={11}
          >
            ({percentage}%)
          </text>
        </>
      )}
    </g>
  );
};

export const BudgetOverview: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState('2');
  const [viewMode, setViewMode] = useState<'waterfall' | 'allocation' | 'phasing'>('waterfall');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Planning</h1>
          <p className="text-sm text-gray-600 mt-1">
            FY 2024 Budget Overview and Allocation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
            Filters
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Scenario
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+5.2%</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(10000000)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PieChart className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">72%</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Allocated</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(7200000)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-amber-600 font-medium">38%</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">YTD Spent</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(3800000)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-purple-600 font-medium">2.5x</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Expected ROI</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(25000000)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedScenario === scenario.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{scenario.name}</h4>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      scenario.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {scenario.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Budget:</span>
                    <span className="font-medium">{formatCurrency(scenario.totalBudget)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected ROI:</span>
                    <span className="font-medium">{scenario.expectedROI}x</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Risk Level:</span>
                    <span
                      className={`font-medium ${
                        scenario.riskLevel === 'Low'
                          ? 'text-green-600'
                          : scenario.riskLevel === 'Medium'
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {scenario.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Mode Selector */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'waterfall' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setViewMode('waterfall')}
        >
          Waterfall View
        </Button>
        <Button
          variant={viewMode === 'allocation' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setViewMode('allocation')}
        >
          Allocation View
        </Button>
        <Button
          variant={viewMode === 'phasing' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setViewMode('phasing')}
        >
          Monthly Phasing
        </Button>
      </div>

      {/* Main Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>
            {viewMode === 'waterfall'
              ? 'Investment Waterfall'
              : viewMode === 'allocation'
              ? 'Budget Allocation'
              : 'Monthly Budget Phasing'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'waterfall' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={waterfallData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => formatCurrency(value, 'USD', 'en-US')} />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Bar
                  dataKey="value"
                  fill={(data: any) => {
                    if (data.type === 'total') return '#10b981';
                    if (data.type === 'expense') return '#ef4444';
                    return '#3b82f6';
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {viewMode === 'allocation' && (
            <ResponsiveContainer width="100%" height={400}>
              <Treemap
                data={allocationData}
                dataKey="value"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#3b82f6"
                content={<CustomTreemapContent />}
              />
            </ResponsiveContainer>
          )}

          {viewMode === 'phasing' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={phasingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value, 'USD', 'en-US')} />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="budget" fill="#94a3b8" name="Budget" />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                <Bar dataKey="forecast" fill="#10b981" name="Forecast" opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Approval Workflow Status */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 'KAM Submission', status: 'completed', date: '2024-03-01', user: 'John Doe' },
              { step: 'Regional Manager Review', status: 'completed', date: '2024-03-03', user: 'Jane Smith' },
              { step: 'Sales Director Approval', status: 'in-progress', date: null, user: 'Mike Johnson' },
              { step: 'Finance Validation', status: 'pending', date: null, user: 'Sarah Williams' },
              { step: 'Final Approval', status: 'pending', date: null, user: 'CEO' },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : step.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step.status === 'completed' ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{step.step}</p>
                      <p className="text-sm text-gray-600">{step.user}</p>
                    </div>
                    {step.date && (
                      <span className="text-sm text-gray-500">{step.date}</span>
                    )}
                  </div>
                </div>
                {index < 4 && (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};