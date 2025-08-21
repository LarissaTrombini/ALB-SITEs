"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

interface AdminState {
  isAuthenticated: boolean
  user: { name: string; email: string } | null
}

interface AdminContextType {
  state: AdminState
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminContext = createContext<AdminContextType | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>({
    isAuthenticated: false,
    user: null,
  })

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de autenticação - em produção, usar API real
    if (email === "admin@albsistemas.com.br" && password === "admin123") {
      setState({
        isAuthenticated: true,
        user: { name: "Administrador", email: "admin@albsistemas.com.br" },
      })
      return true
    }
    return false
  }

  const logout = () => {
    setState({
      isAuthenticated: false,
      user: null,
    })
  }

  return <AdminContext.Provider value={{ state, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
