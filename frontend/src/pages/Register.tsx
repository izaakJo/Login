import { useState } from "react";
import { registerRequest } from "../services/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await registerRequest(email, password);

    alert(res.message || res.detail);
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Registrarse</button>
    </form>
  );
}