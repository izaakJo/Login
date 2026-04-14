import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { loginRequest } from "../services/auth"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await loginRequest(email, password)

      if (res.token) {
        localStorage.setItem("token", res.token)
        //alert("Login correcto")
        // aquí podrías redirigir
        navigate("/dashboard")
      } else {
        alert(res.detail || "Error en login")
      }
    } catch (error) {
      alert("Error de conexión")
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* LADO IZQUIERDO */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        
        {/* LOGO */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Mi Sistema
          </a>
        </div>

        {/* FORM */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-center">
                Iniciar sesión
              </h2>

              <input
                type="email"
                placeholder="Correo"
                className="border rounded-md p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="border rounded-md p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="bg-primary text-white rounded-md p-2 hover:opacity-90"
              >
                Ingresar
              </button>
              <p className="text-sm text-center text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <a
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Crear cuenta
              </a>
            </p>
            </form>

          </div>
        </div>
      </div>

      {/* LADO DERECHO */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}