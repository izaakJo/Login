const API = "http://127.0.0.1:8000/api";

export const registerRequest = async (email: string, password: string) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return await res.json();
};

export const loginRequest = async (email: string, password: string) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return await res.json();
};