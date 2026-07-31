import { useState } from "react";
import { AuthContext } from "./authContext";

const validAdmins = [
  { email: "neemaisabel@gmail.com", password: "#neema@microsoft12" },
  { email: "info@tumainisicklecell.org", password: "Blessedassurance123$" },
];

function readStoredUser() {
  const stored = localStorage.getItem("adminUser") || sessionStorage.getItem("adminUser");

  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored);
    if (parsed && validAdmins.some((admin) => admin.email === parsed.email)) {
      return parsed;
    }
  } catch {
    localStorage.removeItem("adminUser");
    sessionStorage.removeItem("adminUser");
  }

  return null;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());

  const login = (email, password, remember = false) => {
    const match = validAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );
    if (match) {
      const authUser = { email: match.email };
      setUser(authUser);
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("adminUser", JSON.stringify(authUser));
      if (!remember) {
        localStorage.removeItem("adminUser");
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("adminUser");
    localStorage.removeItem("adminUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
