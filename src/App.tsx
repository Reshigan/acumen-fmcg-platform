import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { BudgetOverview } from './pages/budget/BudgetOverview';
import { PromotionPlanning } from './pages/promotion/PromotionPlanning';
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="budget">
              <Route path="overview" element={<BudgetOverview />} />
              <Route path="scenarios" element={<div>Budget Scenarios - Coming Soon</div>} />
              <Route path="allocation" element={<div>Budget Allocation - Coming Soon</div>} />
            </Route>
            <Route path="promotion">
              <Route path="planning" element={<PromotionPlanning />} />
              <Route path="calendar" element={<div>Promotion Calendar - Coming Soon</div>} />
              <Route path="ai-optimization" element={<div>AI Optimization - Coming Soon</div>} />
            </Route>
            <Route path="account">
              <Route path="plans" element={<div>Account Plans - Coming Soon</div>} />
              <Route path="trading-terms" element={<div>Trading Terms - Coming Soon</div>} />
              <Route path="jbp" element={<div>Joint Business Planning - Coming Soon</div>} />
            </Route>
            <Route path="mdm">
              <Route path="customers" element={<div>Customer Management - Coming Soon</div>} />
              <Route path="products" element={<div>Product Management - Coming Soon</div>} />
              <Route path="hierarchies" element={<div>Hierarchy Management - Coming Soon</div>} />
            </Route>
            <Route path="analytics">
              <Route path="dashboards" element={<div>Analytics Dashboards - Coming Soon</div>} />
              <Route path="reports" element={<div>Reports - Coming Soon</div>} />
              <Route path="insights" element={<div>AI Insights - Coming Soon</div>} />
            </Route>
            <Route path="admin">
              <Route path="users" element={<div>User Management - Coming Soon</div>} />
              <Route path="roles" element={<div>Roles & Permissions - Coming Soon</div>} />
              <Route path="company" element={<div>Company Settings - Coming Soon</div>} />
              <Route path="integrations" element={<div>Integrations - Coming Soon</div>} />
            </Route>
            <Route path="notifications" element={<div>Notifications - Coming Soon</div>} />
            <Route path="settings" element={<div>Settings - Coming Soon</div>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
