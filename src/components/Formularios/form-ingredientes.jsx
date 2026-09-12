import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/config.js";
import "./form-ingredientes.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function IngredientForm() {

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const submitHandler = async (e) => {

        e.preventDefault();

        const newIngredient = {

            name: e.target.name.value.trim(),

            unit: e.target.unit.value,

            unitPrice: Number(e.target.unitPrice.value),

            stock: Number(e.target.stock.value),

            minStock: Number(e.target.minStock.value),

            defaultBrand: e.target.defaultBrand.value.trim(),

            defaultSupplier: e.target.defaultSupplier.value.trim(),

            note: e.target.note.value.trim()

        };

        try {

            const response = await fetch(`${API_URL}/api/ingredients`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                mode: "cors",

                body: JSON.stringify(newIngredient)

            });

            if (!response.ok) {

                throw new Error("Error al crear el ingrediente");

            }

            await MySwal.fire({

                title: "Ingrediente agregado con éxito",

                icon: "success"

            });

            navigate("/stock");

        } catch (error) {

            console.error(error);

            MySwal.fire({

                title: "Error",

                text: "No se pudo crear el ingrediente.",

                icon: "error"

            });

        }

    };

    return (

        <div className="form-ingredientes-container form">

            <div className="form-logo">

                <img
                    src="https://i.imgur.com/FS05DJJ.jpg"
                    alt="logo"
                />

            </div>

            <div>

                <h1 className="form-ingredientes-title">
                    Agregar ingrediente
                </h1>

                <form
                    className="form-ingredientes"
                    onSubmit={submitHandler}
                >

                    <div>

                        <label htmlFor="name">
                            Nombre
                        </label>

                        <br />

                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                        />

                    </div>

                    <div>

                        <label htmlFor="unit">
                            Unidad
                        </label>

                        <br />

                        <select
                            id="unit"
                            name="unit"
                            defaultValue="kg"
                        >

                            <option value="kg">Kilogramo (kg)</option>

                            <option value="g">Gramo (g)</option>

                            <option value="l">Litro (l)</option>

                            <option value="ml">Mililitro (ml)</option>

                            <option value="unidad">Unidad</option>

                        </select>

                    </div>

                    <div>

                        <label htmlFor="unitPrice">
                            Precio por unidad
                        </label>

                        <br />

                        <input
                            type="number"
                            id="unitPrice"
                            name="unitPrice"
                            min="0"
                            step="0.01"
                            defaultValue="0"
                            required
                        />

                    </div>

                    <div>

                        <label htmlFor="stock">
                            Stock inicial
                        </label>

                        <br />

                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            min="0"
                            step="0.01"
                            defaultValue="0"
                        />

                    </div>

                    <div>

                        <label htmlFor="minStock">
                            Stock mínimo
                        </label>

                        <br />

                        <input
                            type="number"
                            id="minStock"
                            name="minStock"
                            min="0"
                            step="0.01"
                            defaultValue="0"
                        />

                    </div>

                    <div>

                        <label htmlFor="defaultBrand">
                            Marca habitual
                        </label>

                        <br />

                        <input
                            type="text"
                            id="defaultBrand"
                            name="defaultBrand"
                        />

                    </div>

                    <div>

                        <label htmlFor="defaultSupplier">
                            Proveedor habitual
                        </label>

                        <br />

                        <input
                            type="text"
                            id="defaultSupplier"
                            name="defaultSupplier"
                        />

                    </div>

                    <div>

                        <label htmlFor="note">
                            Observaciones
                        </label>

                        <br />

                        <textarea
                            id="note"
                            name="note"
                            rows="3"
                        />

                    </div>

                    <button
                        className="form-ingredientes-button"
                        type="submit"
                    >
                        Agregar ingrediente
                    </button>

                </form>

            </div>

        </div>

    );

}

export default IngredientForm;