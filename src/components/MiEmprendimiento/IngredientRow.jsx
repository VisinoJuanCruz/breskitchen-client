import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import IngredientNameEditor from "./IngredientNameEditor";
import IngredientPriceEditor from "./IngredientPriceEditor";

export default function IngredientRow({

    ingredient,
    ingredients,
    setIngredients,
    API_URL

}) {

    const MySwal = withReactContent(Swal);

    const [editingName, setEditingName] = useState(false);
    const [editingPrice, setEditingPrice] = useState(false);

    const [editedName, setEditedName] = useState(ingredient.name);
    const [editedPrice, setEditedPrice] = useState(ingredient.priceKg);

    const handleSaveName = async () => {

        if (editedName.trim() === "") {

            alert("El nombre no puede estar vacío.");
            return;

        }

        try {

            const response = await fetch(
                `${API_URL}/api/ingredients/updateName/${ingredient._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: editedName,
                    }),
                }
            );

            if (!response.ok) {

                throw new Error("Error al actualizar.");

            }

            const updatedIngredient = await response.json();

            setIngredients(prev =>
                prev.map(item =>
                    item._id === updatedIngredient._id
                        ? updatedIngredient
                        : item
                )
            );

            setEditingName(false);

        } catch (error) {

            console.error(error);

        }

    };

    const handleSavePrice = async () => {

        if (isNaN(editedPrice) || editedPrice < 0) {

            alert("Precio inválido.");
            return;

        }

        try {

            const response = await fetch(
                `${API_URL}/api/ingredients/updatePrice/${ingredient._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({

                        priceKg: editedPrice

                    }),
                }
            );

            if (!response.ok) {

                throw new Error("Error al actualizar.");

            }

            const updatedIngredient = await response.json();

            setIngredients(prev =>
                prev.map(item =>
                    item._id === updatedIngredient._id
                        ? updatedIngredient
                        : item
                )
            );

            setEditingPrice(false);

        } catch (error) {

            console.error(error);

        }

    };

    const handleDeleteIngredient = async () => {

        const confirmDelete = await MySwal.fire({

            title: "¿Eliminar ingrediente?",

            text: "Esta acción no se puede deshacer.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Eliminar",

            cancelButtonText: "Cancelar",

        });

        if (!confirmDelete.isConfirmed) {

            return;

        }

        try {

            const response = await fetch(

                `${API_URL}/api/ingredients/${ingredient._id}`,

                {

                    method: "DELETE",

                }

            );

            if (!response.ok) {

                throw new Error("Error al eliminar.");

            }

            setIngredients(prev =>
                prev.filter(item => item._id !== ingredient._id)
            );

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <tr className="tabla-row">

            <td>

                {

                    editingName

                        ?

                        <IngredientNameEditor

                            value={editedName}

                            setValue={setEditedName}

                            onSave={handleSaveName}

                        />

                        :

                        <span

                            style={{ cursor: "pointer" }}

                            onClick={() => setEditingName(true)}

                        >

                            {ingredient.name}

                        </span>

                }

            </td>

            <td>

                {

                    editingPrice

                        ?

                        <IngredientPriceEditor

                            value={editedPrice}

                            setValue={setEditedPrice}

                            onSave={handleSavePrice}

                        />

                        :

                        <span

                            style={{ cursor: "pointer" }}

                            onClick={() => setEditingPrice(true)}

                        >

                            ${ingredient.priceKg}

                        </span>

                }

            </td>

            <td>

                <button

                    onClick={handleDeleteIngredient}

                >

                    Eliminar

                </button>

            </td>

        </tr>

    );

}