import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { adminService } from '@/services/adminService';
import { storage } from '@/utils/storage';
import type { AdminProfile } from '@/types';

interface AuthContextType {
  user: AdminProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!storage.hasToken()) {
      setIsLoading(false);
      return;
    }
    try {
      const profile = await adminService.getProfile();
      setUser(profile);
    } catch {
      storage.removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (username: string, password: string) => {
    const { access_token } = await adminService.login({ username, password });
    storage.setToken(access_token);
    const profile = await adminService.getProfile();
    setUser(profile);
  };

  const logout = () => {
    storage.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
