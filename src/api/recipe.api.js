import { API_URL } from "./config";

export async function getAll() {
  const response = await fetch(`${API_URL}/api/cakes`);

  if (!response.ok) {
    throw new Error("Error al obtener las recetas");
  }

  return await response.json();
}

export async function getOne(id) {
  const response = await fetch(`${API_URL}/api/cakes/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener la receta");
  }

  return await response.json();
}

export async function create(formData) {
  const response = await fetch(`${API_URL}/api/cakes`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al crear la receta");
  }

  return await response.json();
}

export async function update(id, formData) {
  const response = await fetch(`${API_URL}/api/cakes/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Error al actualizar la receta");
  }

  return await response.json();
}

export async function remove(id) {
  const response = await fetch(`${API_URL}/api/cakes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la receta");
  }

  return await response.json();
}
