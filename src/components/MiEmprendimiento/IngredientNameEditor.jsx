export default function IngredientNameEditor({

    value,
    setValue,
    onSave

}) {

    return (

        <div>

            <input

                type="text"

                value={value}

                onChange={(e) => setValue(e.target.value)}

            />

            <button onClick={onSave}>

                Guardar

            </button>

        </div>

    );

}