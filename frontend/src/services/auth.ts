const API = "http://localhost:8000/api"

export const loginRequest = async (email: string, password: string) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  return res.json()
}

export const registerRequest = async (email: string, password: string) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  return res.json()
}

export const getUser = async () => {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}