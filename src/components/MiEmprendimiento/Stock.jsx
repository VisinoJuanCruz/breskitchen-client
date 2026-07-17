import React, { useEffect, useState } from "react";
import IngredientTable from "./IngredientTable";
 import { API_URL } from "../../api/config.js";

export default function Stock() {
  
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadIngredients = () => {

        fetch(`${API_URL}/api/ingredients`)
            .then(res => res.json())
            .then(data => {

                setIngredients(data);
                setLoading(false);

            });

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
                API_URL={API_URL}

            />

        </div>

    );

}