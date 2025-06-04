
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode"; 

interface JwtPayload {
  exp: number; 
  
}


interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean; 
  login: (jwtToken: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  
  const isTokenValid = (jwtToken: string): boolean => {
    if (!jwtToken) return false;
    try {
      const decoded: JwtPayload = jwtDecode(jwtToken);
        console.log("Token decodificado:", decoded, Date.now());
        console.log(new Date(decoded.exp * 1000));

      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return false;
    }
  };

  
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      
      localStorage.removeItem("jwtToken");
      setToken(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false); 
  }, []); 

  const login = (jwtToken: string) => {
    if (isTokenValid(jwtToken)) {
      localStorage.setItem("jwtToken", jwtToken);
      setToken(jwtToken);
      setIsAuthenticated(true);
    } else {
      console.error("Token JWT recibido no es válido o ha expirado.");
      logout(); 
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    token,
    isAuthenticated,
    isLoading, 
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Error Use");
  }
  return context;
};