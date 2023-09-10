// src/components/StockCard.js
import React from 'react';
import { useContext } from 'react';
import { MyArrayContext } from '../state/context';
function PortfolioCard({ symbol, name, onAddClick }) {
  const { myArray, updateArray } = useContext(MyArrayContext);  
  

  const handleRemoveItem = () => {
    const newArray = myArray.filter(item => item.symbol !== symbol);
    updateArray(newArray);
  };
  return (
    <div className="stock-card">
      <h3>{symbol}</h3>
      <p>{name}</p>
      <button onClick={handleRemoveItem}>Remove</button>
    </div>
  );
}

export default PortfolioCard;
