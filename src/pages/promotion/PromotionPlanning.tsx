import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  Package,
  Target,
  Zap,
  Info,
  ChevronDown,
  Plus,
  Search,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

// AI Prediction Data
const aiPredictionData = [
  { price: 2.99, uplift: 120, confidence: 65 },
  { price: 3.49, uplift: 150, confidence: 75 },
  { price: 3.99, uplift: 180, confidence: 85 },
  { price: 4.49, uplift: 165, confidence: 80 },
  { price: 4.99, uplift: 140, confidence: 70 },
  { price: 5.49, uplift: 110, confidence: 60 },
];

// Cannibalization Analysis
const cannibalizationData = [
  { product: 'Brand A 500ml', impact: -15 },
  { product: 'Brand A 1L', impact: -8 },
  { product: 'Competitor X', impact: 25 },
  { product: 'Private Label', impact: 12 },
  { product: 'Brand B 500ml', impact: -5 },
];

// Promotion Performance Factors
const performanceFactors = [
  { factor: 'Price Point', current: 75, optimal: 90 },
  { factor: 'Timing', current: 85, optimal: 85 },
  { factor: 'Display', current: 60, optimal: 95 },
  { factor: 'Feature', current: 70, optimal: 80 },
  { factor: 'Seasonality', current: 90, optimal: 90 },
  { factor: 'Competition', current: 55, optimal: 70 },
];

// Conflict Detection
const conflicts = [
  {
    id: '1',
    severity: 'high',
    type: 'Price Conflict',
    description: 'Same product promoted at Walmart for $3.99 (20% lower)',
    affectedCustomer: 'Target',
    resolution: 'Adjust price to match or differentiate promotion mechanics',
  },
  {
    id: '2',
    severity: 'medium',
    type: 'Timing Overlap',
    description: 'Overlapping promotion with Brand B in same category',
    affectedCustomer: 'Kroger',
    resolution: 'Consider staggering promotion dates',
  },
  {
    id: '3',
    severity: 'low',
    type: 'Budget Constraint',
    description: 'Promotion exceeds allocated quarterly budget by 5%',
    affectedCustomer: 'CVS',
    resolution: 'Reduce promotion duration or adjust funding split',
  },
];

// Post-Promotion Analysis
const postPromotionData = [
  { week: 'W-4', sales: 1000, baseline: 1000 },
  { week: 'W-3', sales: 1050, baseline: 1000 },
  { week: 'W-2', sales: 1100, baseline: 1000 },
  { week: 'W-1', sales: 1200, baseline: 1000 },
  { week: 'Promo W1', sales: 2500, baseline: 1000 },
  { week: 'Promo W2', sales: 2800, baseline: 1000 },
  { week: 'Promo W3', sales: 2600, baseline: 1000 },
  { week: 'Promo W4', sales: 2400, baseline: 1000 },
  { week: 'W+1', sales: 800, baseline: 1000 },
  { week: 'W+2', sales: 900, baseline: 1000 },
  { week: 'W+3', sales: 1100, baseline: 1000 },
  { week: 'W+4', sales: 1050, baseline: 1000 },
];

export const PromotionPlanning: React.FC = () => {
  const [selectedPromotion, setSelectedPromotion] = useState('1');
  const [showAIRecommendations, setShowAIRecommendations] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotion Planning</h1>
          <p className="text-sm text-gray-600 mt-1">
            AI-Powered Promotional Optimization & Planning
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Search className="w-4 h-4" />}>
            Search Promotions
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
            Calendar View
          </Button>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Promotion
          </Button>
        </div>
      </div>

      {/* AI Recommendations Alert */}
      {showAIRecommendations && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-1">AI Recommendations Available</h4>
              <p className="text-sm text-blue-700">
                Based on historical data and market conditions, we've identified 3 optimization opportunities
                that could increase your promotional ROI by up to 35%.
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="primary">
                  View Recommendations
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowAIRecommendations(false)}>
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promotion Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+180%</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Predicted Uplift</p>
            <p className="text-2xl font-bold text-gray-900">2.8x</p>
            <p className="text-xs text-gray-500 mt-1">85% confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">$3.99</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Optimal Price</p>
            <p className="text-2xl font-bold text-gray-900">25% Off</p>
            <p className="text-xs text-gray-500 mt-1">AI recommended</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-amber-600 font-medium">3 Issues</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Conflicts Detected</p>
            <p className="text-2xl font-bold text-gray-900">1 High</p>
            <p className="text-xs text-gray-500 mt-1">Action required</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-purple-600 font-medium">3.2x</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Expected ROI</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(125000)}</p>
            <p className="text-xs text-gray-500 mt-1">Net revenue impact</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Price Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-600" />
            AI Price & Uplift Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Price-Uplift Curve</h4>
              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="price" name="Price" unit="$" />
                  <YAxis dataKey="uplift" name="Uplift" unit="%" />
                  <ZAxis dataKey="confidence" name="Confidence" range={[50, 200]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter
                    name="Predictions"
                    data={aiPredictionData}
                    fill="#3b82f6"
                  />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">AI Insight</span>
                </div>
                <p className="text-sm text-blue-700">
                  Optimal price point identified at $3.99 with expected uplift of 180%. 
                  This represents a 25% discount from regular price with 85% confidence level.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Factors Analysis</h4>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={performanceFactors}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="factor" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Optimal"
                    dataKey="optimal"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Overall Score:</span>
                  <span className="font-medium text-gray-900">72/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conflict Detection & Resolution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Conflict Detection & Synergy Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conflicts.map((conflict) => (
              <div
                key={conflict.id}
                className={`p-4 rounded-lg border-l-4 ${
                  conflict.severity === 'high'
                    ? 'bg-red-50 border-red-500'
                    : conflict.severity === 'medium'
                    ? 'bg-amber-50 border-amber-500'
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          conflict.severity === 'high'
                            ? 'bg-red-100 text-red-700'
                            : conflict.severity === 'medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {conflict.severity.toUpperCase()}
                      </span>
                      <span className="font-medium text-gray-900">{conflict.type}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{conflict.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>Customer: {conflict.affectedCustomer}</span>
                      <span>•</span>
                      <span>Resolution: {conflict.resolution}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cannibalization & Post-Promotion Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cannibalization Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cannibalizationData.map((item) => (
                <div key={item.product} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.product}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.impact > 0 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.abs(item.impact)}%`,
                          marginLeft: item.impact < 0 ? `${100 + item.impact}%` : '0',
                        }}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        item.impact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.impact > 0 ? '+' : ''}{item.impact}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Net Impact:</strong> +14% incremental volume after cannibalization
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post-Promotion Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={postPromotionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.3}
                  name="Baseline"
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Actual Sales"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">+10%</p>
                <p className="text-xs text-green-600">Sustained Uplift</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-700">-20%</p>
                <p className="text-xs text-amber-600">Pantry Loading</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};