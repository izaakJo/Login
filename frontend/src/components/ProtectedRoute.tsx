import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuth()

  // 👇 evita pantalla en blanco infinita
  if (!initialized) {
    return <div className="p-4">Verificando sesión...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}