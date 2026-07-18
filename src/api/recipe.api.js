import { API_URL } from "./config";

export async function getAll() {

    const response = await fetch(`${API_URL}/api/cakes`);

    if (!response.ok) {
        throw new Error("Error al obtener las recetas");
    }

    return await response.json();

}

export async function create(recipe) {

    const response = await fetch(
        `${API_URL}/api/cakes`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        }
    );

    if (!response.ok) {
        throw new Error("Error al crear la receta");
    }

    return await response.json();

}