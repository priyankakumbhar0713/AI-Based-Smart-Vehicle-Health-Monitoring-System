import React, { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  id?: string;
  name?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (payload: { name?: string; email?: string; password?: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      // TODO: call real auth API
      setUser({ id: '1', name: 'Demo User', email });
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    setUser(null);
  }

  async function register(payload: { name?: string; email?: string; password?: string }) {
    setLoading(true);
    try {
      // TODO: call register API
      setUser({ id: '1', name: payload.name, email: payload.email });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export default AuthContext;
