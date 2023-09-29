import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './listaDePrecios.css'



export default function ListaDePrecios({isLoggedIn}) {
    

    const [cakes, setCakes] = useState([]);
    const [editingPrice, setEditingPrice] = useState(null);
    const [editedPrice, setEditedPrice] = useState(null);
      
    useEffect(() => {
      const fetchCakes = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/cakes');
          setCakes(response.data);
        } catch (error) {
          console.error('Error al obtener la lista de tortas', error);
        }
      };
      fetchCakes();
    }, []);


    const handleEditPrice = (cakeId) => {
        setEditingPrice(cakeId);
        const cakeToEdit = cakes.find((cake) => cake._id === cakeId);
        setEditedPrice(cakeToEdit.price);
      };


      const handleSavePrice = async (cakeId) => {
        // Verificar si editedPrice es un número válido mayor que 0
        if (!isNaN(editedPrice) && parseFloat(editedPrice) >= 0) {
          try {
            const response = await fetch(`http://localhost:3000/api/cakes/updatePrice/${cakeId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ price: editedPrice }),
            });
    
            if (response.ok) {
              const updatedCake = await response.json();
              console.log('Precio actualizado con éxito:', updatedCake);
              setCakes((prevCakes) =>
                prevCakes.map((cake) =>
                  cake._id === updatedCake._id ? updatedCake : cake
                )
              );
              setEditingPrice(null);
            } else {
              console.error('Error al actualizar el precio:', response.status);
            }
          } catch (error) {
            console.error('Error al actualizar el precio:', error);
          }
        } else {
          alert('El precio debe ser un número válido mayor que 0.');
        }
      };
  
  return (
    <div>
      <h1 className="text-center">Lista de Precios</h1>
      <table className="price-list-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {cakes.map((cake) => (
            <tr key={cake._id} className="tabla-row">
              <td className="name-column">
                <span>{cake.name}</span>
              </td>
              {isLoggedIn ? 
              <td className="price-column">
              {editingPrice === cake._id ? (
                  <div>
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                    />
                    <button onClick={() => handleSavePrice(cake._id)}>Guardar</button>
                  </div>
                ) : (
                  <span onClick={() => handleEditPrice(cake._id)}>${cake.price}<i className="pencil">✏️</i></span>
                )}
              </td>
              :
              <td>
                <span>${cake.price}</span></td>}
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
