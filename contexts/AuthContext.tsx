// contexts/AuthContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"; // 1. Import useEffect

// --- DEFINING MOCK USER DIRECTLY HERE ---
export const FAKE_USER = {
  uid: "fake-user-uid",
  email: "user@test.com",
  name: "Demo User",
};

type FakeUser = typeof FAKE_USER;

interface AuthContextType {
  user: FakeUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  loading: boolean;
  hasTrip: boolean;
  createTrip: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FakeUser | null>(null);
  const [hasTrip, setHasTrip] = useState(false);

  // THIS IS THE FIX:
  const [loading, setLoading] = useState(true); // 2. Set initial state to true

  useEffect(() => {
    setLoading(false); // 3. After the first render, set loading to false
  }, []);

  const login = (email: string, pass: string) => {
    if (email.toLowerCase() === "user@test.com" && pass === "password123") {
      setUser(FAKE_USER);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setHasTrip(false); // Reset trip when logging out
  };

  const createTrip = () => {
    setHasTrip(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, hasTrip, createTrip }}
    >
      {children}
    </AuthContext.Provider>
  );
};
