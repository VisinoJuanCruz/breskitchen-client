import axios from "axios";
import { API_URL } from "./config";

export async function login(formData) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.username,
      password: formData.password,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Error al iniciar sesión");
  }

  return result;
}
export async function logout() {
  const response = await axios.post(
    `${API_URL}/api/logout`,

    {},

    {
      withCredentials: true,
    },
  );

  return response.data;
}

export async function checkAuth() {
  const response = await fetch(`${API_URL}/api/check-auth`, {
    method: "GET",
    credentials: "include",
  });

  return response.data;
}
