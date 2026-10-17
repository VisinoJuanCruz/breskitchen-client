import { API_URL } from "./config";

export async function getAll() {

    const response = await fetch(`${API_URL}/api/ingredients`);

    if (!response.ok) {
        throw new Error("Error al obtener los ingredientes");
    }

    return await response.json();

}


export async function create(data) {
    const response = await fetch(`${API_URL}/api/ingredients`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            result.error || result.message || "Error al crear el ingrediente"
        );
    }

    return result;
}

export const update = async (id, ingredient) => {

    const response = await fetch(
        `${API_URL}/api/ingredients/${id}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredient)
        }
    );

    if (!response.ok) {
        throw new Error("Error al actualizar el ingrediente");
    }

    return await response.json();

};

export async function updateUnitPrice(id, data) {

    const response = await fetch(
        `${API_URL}/api/ingredients/updatePrice/${id}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error("Error al actualizar el precio");
    }

    return await response.json();

}

export async function updateName(id, data) {

    const response = await fetch(
        `${API_URL}/api/ingredients/updateName/${id}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error("Error al actualizar el nombre");
    }

    return await response.json();

}

export async function remove(id) {

    const response = await fetch(
        `${API_URL}/api/ingredients/${id}`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Error al eliminar el ingrediente");
    }

    return await response.json();

}