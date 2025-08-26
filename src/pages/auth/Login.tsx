import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/common/Button';
import { Logo } from '../../components/common/Logo';
import { Building2, User, Lock, Shield, TrendingUp, Package, Users, Sparkles } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import * as S from './Login.styled';

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
    <S.LoginContainer>
      {/* Animated background orbs */}
      <S.BackgroundOrb color="#8B5CF6" size="400px" top="-100px" left="-100px" delay={0} />
      <S.BackgroundOrb color="#EC4899" size="300px" top="50px" right="-50px" delay={2} />
      <S.BackgroundOrb color="#F59E0B" size="350px" bottom="-100px" left="100px" delay={4} />
      
      <S.LoginBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <S.LogoContainer>
          <Logo size="xl" variant="icon" />
          <S.Title>Acumen</S.Title>
          <S.Subtitle>Enterprise FMCG Sales Intelligence Platform</S.Subtitle>
        </S.LogoContainer>

        <S.LoginCard
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <S.TabContainer>
            <S.TabGroup>
              <S.TabButton
                type="button"
                active={isCompanyMode}
                onClick={() => setIsCompanyMode(true)}
              >
                <Building2 />
                Company User
              </S.TabButton>
              <S.TabButton
                type="button"
                active={!isCompanyMode}
                onClick={() => setIsCompanyMode(false)}
              >
                <Shield />
                Super Admin
              </S.TabButton>
            </S.TabGroup>
          </S.TabContainer>

          <S.Form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {isCompanyMode && (
                <S.InputGroup
                  key="company-code"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <S.Label>Company Code</S.Label>
                  <S.InputWrapper>
                    <S.InputIcon>
                      <Building2 />
                    </S.InputIcon>
                    <S.Input
                      type="text"
                      value={formData.companyCode}
                      onChange={(e) =>
                        setFormData({ ...formData, companyCode: e.target.value })
                      }
                      placeholder="Enter company code"
                      required={isCompanyMode}
                    />
                  </S.InputWrapper>
                </S.InputGroup>
              )}
            </AnimatePresence>

            <S.InputGroup>
              <S.Label>Email Address</S.Label>
              <S.InputWrapper>
                <S.InputIcon>
                  <User />
                </S.InputIcon>
                <S.Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  required
                />
              </S.InputWrapper>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Password</S.Label>
              <S.InputWrapper>
                <S.InputIcon>
                  <Lock />
                </S.InputIcon>
                <S.Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  required
                />
              </S.InputWrapper>
            </S.InputGroup>

            <AnimatePresence>
              {error && (
                <S.ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </S.ErrorMessage>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              fullWidth
              isLoading={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </S.Form>

          <S.DemoCredentials>
            <S.DemoTitle>Demo Credentials:</S.DemoTitle>
            {isCompanyMode ? (
              <>
                <S.DemoCard>
                  <S.DemoText className="title">Diplomat South Africa:</S.DemoText>
                  <S.DemoText>Company: <S.DemoCode>DIPLOMAT-SA</S.DemoCode></S.DemoText>
                  <S.DemoText>Email: <S.DemoCode>john.smith@diplomat.co.za</S.DemoCode></S.DemoText>
                  <S.DemoText>Password: <S.DemoCode>demo123</S.DemoCode></S.DemoText>
                </S.DemoCard>
                <S.DemoCard>
                  <S.DemoText className="title">Legacy Demo:</S.DemoText>
                  <S.DemoText>Company: <S.DemoCode>DEMO2024</S.DemoCode></S.DemoText>
                  <S.DemoText>Email: <S.DemoCode>demo@acumen.com</S.DemoCode></S.DemoText>
                  <S.DemoText>Password: <S.DemoCode>demo123</S.DemoCode></S.DemoText>
                </S.DemoCard>
              </>
            ) : (
              <S.DemoCard>
                <S.DemoText>Email: <S.DemoCode>admin@acumen.com</S.DemoCode></S.DemoText>
                <S.DemoText>Password: <S.DemoCode>admin123</S.DemoCode></S.DemoText>
              </S.DemoCard>
            )}
          </S.DemoCredentials>
        </S.LoginCard>

        <S.FeatureGrid>
          <S.FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <S.FeatureIcon>
              <TrendingUp color="#8B5CF6" />
            </S.FeatureIcon>
            <S.FeatureText>AI Analytics</S.FeatureText>
          </S.FeatureCard>
          <S.FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <S.FeatureIcon>
              <Package color="#EC4899" />
            </S.FeatureIcon>
            <S.FeatureText>Multi-Tenant</S.FeatureText>
          </S.FeatureCard>
          <S.FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <S.FeatureIcon>
              <Users color="#F59E0B" />
            </S.FeatureIcon>
            <S.FeatureText>Collaboration</S.FeatureText>
          </S.FeatureCard>
          <S.FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <S.FeatureIcon>
              <Sparkles color="#10B981" />
            </S.FeatureIcon>
            <S.FeatureText>Smart Insights</S.FeatureText>
          </S.FeatureCard>
        </S.FeatureGrid>
      </S.LoginBox>
    </S.LoginContainer>
  );
};
