import React, { useEffect, useState } from "react";
import IngredientTable from "./IngredientTable";
import { getAll } from "../../api/ingredient.api";

export default function Stock() {

    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadIngredients = async () => {

        try {

            const data = await getAll();

            setIngredients(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadIngredients();

    }, []);

    if (loading) {

        return <h2>Cargando...</h2>;

    }

    return (

        <div className="ingredients-list-container">

            <h1 className="header-title ingredients-list-title text-center">
                Stock
            </h1>

            <IngredientTable
                ingredients={ingredients}
                setIngredients={setIngredients}
            />

        </div>

    );

}