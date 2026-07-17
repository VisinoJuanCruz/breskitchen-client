export default function IngredientPriceEditor({

    value,
    setValue,
    onSave

}) {

    return (

        <div>

            <input

                type="number"

                value={value}

                onChange={(e) => setValue(parseFloat(e.target.value))}

            />

            <button onClick={onSave}>

                Guardar

            </button>

        </div>

    );

}