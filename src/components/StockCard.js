// src/components/StockCard.js
import React from 'react';
import { useContext } from 'react';
import { MyArrayContext } from '../state/context';
function StockCard({ symbol, name, onAddClick }) {
  const { myArray, updateArray } = useContext(MyArrayContext);  
  
  
  const handleAddItem = () => {
    const newItem = {
      symbol: symbol,
      name: name
    }
    const newArray = [...myArray, newItem];
    updateArray(newArray);
  };
  return (
    <div className="stock-card">
      <h3>{symbol}</h3>
      <p>{name}</p>
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
}

export default StockCard;
