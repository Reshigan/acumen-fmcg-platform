import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getMockUsers, diplomatCompany } from '../services/mockData';

interface AuthState {
  user: any | null;
  company: any | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string, companyCode?: string) => Promise<void>;
  logout: () => void;
  setCompany: (company: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      company: null,
      isAuthenticated: false,
      isSuperAdmin: false,
      
      login: async (email: string, password: string, companyCode?: string) => {
        // Mock authentication
        // In production, this would call an API
        
        if (email === 'admin@acumen.com' && password === 'admin123') {
          // Super admin login
          const superAdminUser = {
            id: 'super-admin-001',
            email: 'admin@acumen.com',
            name: 'Super Admin',
            role: 'super_admin',
            companyId: 'SYSTEM',
            permissions: ['view_all', 'edit_all', 'delete_all', 'manage_company'],
            avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=DC2626&color=fff',
            createdAt: new Date().toISOString(),
          };
          
          set({
            user: superAdminUser,
            company: null,
            isAuthenticated: true,
            isSuperAdmin: true,
          });
        } else if (companyCode === 'DIPLOMAT-SA' && email && password === 'demo123') {
          // Diplomat SA user login
          const users = getMockUsers();
          const user = users.find(u => u.email === email);
          
          if (user) {
            set({
              user,
              company: diplomatCompany,
              isAuthenticated: true,
              isSuperAdmin: false,
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } else if (companyCode === 'DEMO2024' && email === 'demo@acumen.com' && password === 'demo123') {
          // Legacy demo user login
          const demoUser = {
            id: '2',
            email: 'demo@acumen.com',
            name: 'Demo User',
            role: 'sales_director',
            companyId: 'DEMO2024',
            companyCode: 'DEMO2024',
            department: 'Sales',
            region: 'North America',
            permissions: ['view_all', 'edit_all', 'approve_budgets', 'approve_promotions'],
            avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0D9488&color=fff',
            createdAt: new Date().toISOString(),
          };
          
          const demoCompany = {
            id: 'DEMO2024',
            code: 'DEMO2024',
            name: 'Demo FMCG Company',
            industry: 'FMCG',
            country: 'USA',
            currency: 'USD',
            fiscalYearStart: '2024-01-01',
            fiscalYearEnd: '2024-12-31',
            settings: {
              theme: 'light',
              dateFormat: 'MM/DD/YYYY',
              numberFormat: 'en-US',
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set({
            user: demoUser,
            company: demoCompany,
            isAuthenticated: true,
            isSuperAdmin: false,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      
      logout: () => {
        set({
          user: null,
          company: null,
          isAuthenticated: false,
          isSuperAdmin: false,
        });
      },
      
      setCompany: (company: any) => {
        set({ company });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
