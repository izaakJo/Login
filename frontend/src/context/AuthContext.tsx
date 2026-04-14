import { createContext, useContext, useEffect, useState } from "react"
import { getUser } from "../services/auth"

type User = {
  name: string
  email: string
  avatar: string
}

type AuthContextType = {
  user: User | null
  initialized: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  initialized: false,
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setInitialized(true)
        return
      }

      try {
        const data = await getUser()
        setUser(data)
      } catch {
        localStorage.removeItem("token")
        setUser(null)
      } finally {
        setInitialized(true)
      }
    }

    init()
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, initialized, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)