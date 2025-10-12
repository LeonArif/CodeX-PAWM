import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ambil token dari query param URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      window.history.replaceState({}, document.title, "/");
      const userData = jwtDecode(token);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else if (localStorage.getItem("jwt")) {
      const userData = jwtDecode(localStorage.getItem("jwt"));
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}