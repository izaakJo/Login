import { useState } from "react";
import { loginRequest } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await loginRequest(email, password);

    if (res.token) {
      localStorage.setItem("token", res.token);
      alert("Login correcto");
    } else {
      alert(res.detail);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Ingresar</button>
    </form>
  );
}