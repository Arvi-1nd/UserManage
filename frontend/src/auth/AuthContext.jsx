import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on refresh
  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      api
        .get("me/") // ✅ no leading slash
        .then((res) => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // ✅ no leading slash
    const res = await api.post("login/", { email, password });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    // ✅ no leading slash
    const me = await api.get("me/");
    setUser(me.data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
