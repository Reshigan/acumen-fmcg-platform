import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { Eye, EyeOff, Building2, Users, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'company' | 'superadmin'>('company');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyCode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock user and company data
      const mockUser = {
        id: '1',
        email: formData.email,
        firstName: 'John',
        lastName: 'Doe',
        role: {
          id: '1',
          name: loginType === 'superadmin' ? 'Super Administrator' : 'Sales Director',
          type: loginType === 'superadmin' ? 'SuperAdmin' as const : 'SalesDirector' as const,
          permissions: [],
        },
        companyId: '1',
        hierarchyPath: [],
        permissions: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockCompany = {
        id: '1',
        name: 'Global FMCG Corp',
        code: formData.companyCode || 'GFMCG',
        currency: 'USD',
        fiscalYearStart: new Date('2024-01-01'),
        fiscalYearEnd: new Date('2024-12-31'),
        settings: {
          theme: {
            primaryColor: '#3b82f6',
            secondaryColor: '#64748b',
            logo: '',
            favicon: '',
          },
          features: {
            budgetPlanning: true,
            aiPromotion: true,
            advancedAnalytics: true,
            contractManagement: true,
            competitorTracking: true,
          },
          integrations: {},
          hierarchies: {
            customerLevels: [],
            productLevels: [],
          },
        },
        licenses: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        type: 'hybrid' as const,
      };

      login(mockUser, mockCompany, 'mock-token');
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl shadow-lg mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Acumen</h1>
          <p className="text-gray-600 mt-2">Multi-Company FMCG Sales Platform</p>
        </div>

        {/* Login Type Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-6">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setLoginType('company')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                loginType === 'company'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Company Login</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginType('superadmin')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                loginType === 'superadmin'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Super Admin</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {loginType === 'company' && (
              <div>
                <label htmlFor="companyCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Code
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="companyCode"
                    type="text"
                    value={formData.companyCode}
                    onChange={(e) => setFormData({ ...formData, companyCode: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter company code"
                    required={loginType === 'company'}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">Demo Credentials</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Company Code:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">DEMO2024</code>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Email:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">demo@acumen.com</code>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Password:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">demo123</code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
              Contact Sales
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-4">
            © 2024 Acumen. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};