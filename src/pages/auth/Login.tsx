import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Building2, User, Lock, Shield, Sparkles, TrendingUp, Package, Users } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isCompanyMode, setIsCompanyMode] = useState(true);
  const [formData, setFormData] = useState({
    companyCode: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(
        formData.email,
        formData.password,
        isCompanyMode ? formData.companyCode : undefined
      );
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Acumen
          </h1>
          <p className="text-gray-300">Enterprise FMCG Sales Intelligence Platform</p>
        </div>

        <Card className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="flex bg-white/10 backdrop-blur rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsCompanyMode(true)}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  isCompanyMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Company User
              </button>
              <button
                type="button"
                onClick={() => setIsCompanyMode(false)}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  !isCompanyMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Super Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isCompanyMode && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Company Code
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.companyCode}
                    onChange={(e) =>
                      setFormData({ ...formData, companyCode: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Enter company code"
                    required={isCompanyMode}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 backdrop-blur text-red-200 p-3 rounded-lg text-sm border border-red-500/30">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:scale-105"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm text-gray-300 text-center mb-4">
              Demo Credentials:
            </p>
            {isCompanyMode ? (
              <div className="space-y-2">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-sm">
                  <p className="text-gray-200 font-semibold mb-1">Diplomat South Africa:</p>
                  <p className="text-gray-300">Company: <span className="text-purple-300 font-mono">DIPLOMAT-SA</span></p>
                  <p className="text-gray-300">Email: <span className="text-purple-300 font-mono">john.smith@diplomat.co.za</span></p>
                  <p className="text-gray-300">Password: <span className="text-purple-300 font-mono">demo123</span></p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-sm">
                  <p className="text-gray-200 font-semibold mb-1">Legacy Demo:</p>
                  <p className="text-gray-300">Company: <span className="text-purple-300 font-mono">DEMO2024</span></p>
                  <p className="text-gray-300">Email: <span className="text-purple-300 font-mono">demo@acumen.com</span></p>
                  <p className="text-gray-300">Password: <span className="text-purple-300 font-mono">demo123</span></p>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-sm">
                <p className="text-gray-300">Email: <span className="text-purple-300 font-mono">admin@acumen.com</span></p>
                <p className="text-gray-300">Password: <span className="text-purple-300 font-mono">admin123</span></p>
              </div>
            )}
          </div>
        </Card>

        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 mb-2">
              <TrendingUp className="w-6 h-6 text-purple-400 mx-auto" />
            </div>
            <p className="text-xs text-gray-400">AI Analytics</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 mb-2">
              <Package className="w-6 h-6 text-pink-400 mx-auto" />
            </div>
            <p className="text-xs text-gray-400">Multi-Tenant</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 mb-2">
              <Users className="w-6 h-6 text-yellow-400 mx-auto" />
            </div>
            <p className="text-xs text-gray-400">Collaboration</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 mb-2">
              <Sparkles className="w-6 h-6 text-green-400 mx-auto" />
            </div>
            <p className="text-xs text-gray-400">Smart Insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};
