import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Company } from '../types';

interface AuthState {
  user: User | null;
  company: Company | null;
  token: string | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  login: (user: User, company: Company, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updateCompany: (company: Partial<Company>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      company: null,
      token: null,
      isAuthenticated: false,
      isSuperAdmin: false,
      
      login: (user, company, token) => {
        set({
          user,
          company,
          token,
          isAuthenticated: true,
          isSuperAdmin: user.role.type === 'SuperAdmin',
        });
      },
      
      logout: () => {
        set({
          user: null,
          company: null,
          token: null,
          isAuthenticated: false,
          isSuperAdmin: false,
        });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      
      updateCompany: (companyData) => {
        set((state) => ({
          company: state.company ? { ...state.company, ...companyData } : null,
        }));
      },
    }),
    {
      name: 'acumen-auth',
    }
  )
);