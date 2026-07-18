import * as ingredientApi from "../api/ingredient.api";

export async function getIngredients() {
    return await ingredientApi.getAll();
}

export async function createIngredient(data) {
    return await ingredientApi.create(data);
}

export async function updateIngredientPrice(id, data) {
    return await ingredientApi.updatePrice(id, data);
}

export async function updateIngredientName(id, data) {
    return await ingredientApi.updateName(id, data);
}

export async function deleteIngredient(id) {
    return await ingredientApi.remove(id);
}