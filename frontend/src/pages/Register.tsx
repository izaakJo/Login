import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { registerRequest } from "../services/auth"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await registerRequest(email, password)

      if (res.message) {
        alert(res.message)
        // opcional: redirigir a login
        // window.location.href = "/login"
      } else {
        alert(res.detail || "Error en registro")
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

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-center">
                Crear Una cuenta
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
                Registrarse
              </button>
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