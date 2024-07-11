import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './listaDePrecios.css';

export default function ListaDePrecios({ isLoggedIn,API_URL }) {
  const [cakes, setCakes] = useState([]);
  const [editingPrice, setEditingPrice] = useState(null);
  const [editedPrice, setEditedPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // Puede ser 'asc' o 'desc'
  const [priceSortOrder, setPriceSortOrder] = useState('asc');
  const [listPriceSortOrder, setListPriceSortOrder] = useState('asc');
  const [profitDifferenceSortOrder, setProfitDifferenceSortOrder] = useState('asc');
  const [nameSortOrder, setNameSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSortColumn, setActiveSortColumn] = useState(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cakes`);
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
    if (!isNaN(editedPrice) && parseFloat(editedPrice) >= 0) {
      try {
        const response = await fetch(`${API_URL}/api/cakes/updatePrice/${cakeId}`, {
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
  const calculateIngredientCost = (ingredients) => {
    return ingredients.reduce((total, ingredient) => {
      if (typeof ingredient.quantity === 'number' && typeof ingredient.ingredient.priceKg === 'number') {
        let costoIngrediente = (ingredient.quantity * ingredient.ingredient.priceKg) / 1000;
        return total + costoIngrediente;
      } else {
        console.error('Valores no válidos en ingredient.quantity o ingredient.ingredient.priceKg');
        return total;
      }
    }, 0).toFixed(2);
  };
  const calculateProfitPercentage = (cake) => {
    const totalIngredientCost = parseFloat(calculateIngredientCost(cake.ingredients));
    const profit = parseFloat(cake.price) - totalIngredientCost;
  
    if (totalIngredientCost > 0) {
      return (profit / totalIngredientCost) * 100;
    } else {
      return NaN;
    }
  };  
  const handleSortTable = () => {
    if (activeSortColumn === 'profit') {
      // Cambia el orden de la columna actual
      const newSortOrder = nameSortOrder === 'asc' ? 'desc' : 'asc';
      setNameSortOrder(newSortOrder);
    } else {
      // Establece la columna activa y ordena en orden ascendente
      setActiveSortColumn('profit');
      setNameSortOrder('asc');
      setPriceSortOrder(null);
      setListPriceSortOrder(null);
      setProfitDifferenceSortOrder(null);
    }
    const sortedCakes = [...cakes].sort((a, b) => {
      const profitA = calculateProfitPercentage(a);
      const profitB = calculateProfitPercentage(b);
  
      if (isNaN(profitA) && isNaN(profitB)) {
        return 0; // Ambos son NaN, no cambia el orden
      } else if (isNaN(profitA)) {
        return sortOrder === 'asc' ? 1 : -1; // Mueve NaN al final
      } else if (isNaN(profitB)) {
        return sortOrder === 'asc' ? -1 : 1; // Mueve NaN al final
      }
  
      return sortOrder === 'asc' ? profitA - profitB : profitB - profitA;
    });
  
    setCakes(sortedCakes);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Cambia el orden de clasificación
  };
  const handleSortPrice = () => {
    if (activeSortColumn === 'price') {
      // Cambia el orden de la columna actual
      const newSortOrder = nameSortOrder === 'asc' ? 'desc' : 'asc';
      setNameSortOrder(newSortOrder);
    } else {
      // Establece la columna activa y ordena en orden ascendente
      setActiveSortColumn('price');
      setNameSortOrder('asc');
      setPriceSortOrder(null);
      setListPriceSortOrder(null);
      setProfitDifferenceSortOrder(null);
    }
    const sortedCakes = [...cakes].sort((a, b) => {
      return priceSortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
  
    setCakes(sortedCakes);
    setPriceSortOrder(priceSortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleSortListPrice = () => {
    if (activeSortColumn === 'listprice') {
      // Cambia el orden de la columna actual
      const newSortOrder = nameSortOrder === 'asc' ? 'desc' : 'asc';
      setNameSortOrder(newSortOrder);
    } else {
      // Establece la columna activa y ordena en orden ascendente
      setActiveSortColumn('listprice');
      setNameSortOrder('asc');
      setPriceSortOrder(null);
      setListPriceSortOrder(null);
      setProfitDifferenceSortOrder(null);
    }
    const sortedCakes = [...cakes].sort((a, b) => {
      const costA = calculateIngredientCost(a.ingredients);
      const costB = calculateIngredientCost(b.ingredients);
    
      return listPriceSortOrder === 'asc' ? costA - costB : costB - costA;
    });

  





  setCakes(sortedCakes);
  setListPriceSortOrder(listPriceSortOrder === 'asc' ? 'desc' : 'asc');
  };  
  const handleSortProfitDifference = () => {
    if (activeSortColumn === 'profitdifference') {
      // Cambia el orden de la columna actual
      const newSortOrder = nameSortOrder === 'asc' ? 'desc' : 'asc';
      setNameSortOrder(newSortOrder);
    } else {
      // Establece la columna activa y ordena en orden ascendente
      setActiveSortColumn('profitdifference');
      setNameSortOrder('asc');
      setPriceSortOrder(null);
      setListPriceSortOrder(null);
      setProfitDifferenceSortOrder(null);
    }
    const sortedCakes = [...cakes].sort((a, b) => {
      const profitDifferenceA = calculateProfitDifference(a);
      const profitDifferenceB = calculateProfitDifference(b);

      return profitDifferenceSortOrder === 'asc' ? profitDifferenceA - profitDifferenceB : profitDifferenceB - profitDifferenceA;
    });

    setCakes(sortedCakes);
    setProfitDifferenceSortOrder(profitDifferenceSortOrder === 'asc' ? 'desc' : 'asc');
  };
  const calculateProfitDifference = (cake) => {
    const totalIngredientCost = parseFloat(calculateIngredientCost(cake.ingredients));
    const profit = parseFloat(cake.price) - totalIngredientCost;

    return profit.toFixed(2);
  };


  const handleSortName = () => {
    if (activeSortColumn === 'name') {
      // Cambia el orden de la columna actual
      const newSortOrder = nameSortOrder === 'asc' ? 'desc' : 'asc';
      setNameSortOrder(newSortOrder);
    } else {
      // Establece la columna activa y ordena en orden ascendente
      setActiveSortColumn('name');
      setNameSortOrder('asc');
      setPriceSortOrder(null);
      setListPriceSortOrder(null);
      setProfitDifferenceSortOrder(null);
    }
    const sortedCakes = [...cakes].sort((a, b) => {
      return nameSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });

    setCakes(sortedCakes);
    setNameSortOrder(nameSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredCakes = cakes.filter((cake) => {
    if (searchTerm.trim() === '') {
      return true;
    }
    return cake.name.toLowerCase().includes(searchTerm.toLowerCase());
  
  });
  
  
  return (
    <div className="price-list-container">
      <h2 className="price-list-title text-center">Lista de Precios</h2>
        <div className="search-input">
          <input
            type="text"
            placeholder="Buscar productos...🔎"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}>
          </input>
        </div>
        <table className="price-list-table">
          <thead>
            <tr>
            <th onClick={handleSortName}>
              Nombre
              {activeSortColumn === 'name' && (nameSortOrder === 'asc' ? ' ↑': ' ↓')}
            </th>
            <th onClick={handleSortPrice}>
              Precio
              {activeSortColumn === 'price' && (priceSortOrder === 'asc' ? ' ↑' : ' ↓')}
            </th>
              {isLoggedIn && (
                <>
                  <th onClick={handleSortListPrice}>
                     Precio Lista
                     {activeSortColumn === 'listprice' && (nameSortOrder === 'asc' ? ' ↑': ' ↓')}
                  </th>
                  <th onClick={handleSortProfitDifference}>
                    Dif Ganada
                    {activeSortColumn === 'profitdifference' && (nameSortOrder === 'asc' ? ' ↑': ' ↓')}
                    </th>
                  <th onClick={handleSortTable}>
                    % Ganancia
                    {activeSortColumn === 'profit' && (nameSortOrder === 'asc' ? ' ↑': ' ↓')}
                  </th>
                </>
                )
              }
            </tr>
          </thead>
          <tbody>
            {filteredCakes.map((cake) => (
              <tr key={cake._id} className="tabla-row">
                <td className="name-column">
                  <span>{cake.name}</span>
                </td>
                {isLoggedIn ? (
                  <>
                    <td className="price-column">
                      {editingPrice === cake._id ? (
                        <div>
                          <input
                            type="number"
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                          />
                          <button onClick={() => handleSavePrice(cake._id)}>
                            Guardar
                          </button>
                        </div>) 
                        :
                        (
                          <span onClick={() => handleEditPrice(cake._id)}>${cake.price}<i className="pencil">✏️</i></span>
                        )}
                    </td>
                    <td>
                      <span>${calculateIngredientCost(cake.ingredients)}</span>
                    </td>
                    <td>${(cake.price - calculateIngredientCost(cake.ingredients)).toFixed(2)}</td>
                    <td>{calculateProfitPercentage(cake).toFixed(2)}</td>
                  </>)
                  :
                  (
                    <>
                      <td>
                        <span>${cake.price}</span>
                      </td>
                    </>
                  )
                }
              </tr>
          ))}
          </tbody>
        </table>
    </div>
  );
}
