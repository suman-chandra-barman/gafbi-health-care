/** @format */
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "user" | "admin";

interface UserRoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined,
);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("user");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;
    if (savedRole) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole(savedRole);
    }
  }, []);

  const updateRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return (
    <UserRoleContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
}
