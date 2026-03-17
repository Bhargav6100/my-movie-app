import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse userInfo from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      } else {
        localStorage.removeItem("userInfo");
      }
    } catch (error) {
      console.error("Failed to save userInfo:", error);
    }
  }, [userInfo]);

  const login = (data) => {
    setUserInfo(data);
  };

  const logout = () => {
    setUserInfo(null);
  };

  const token = userInfo?.token || null;
  const isLoggedIn = !!token; // Boolean(token)

  const value = useMemo(
    () => ({
      userInfo,
      token,
      isLoggedIn,
      login,
      logout,
    }),
    [userInfo, token, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
};
