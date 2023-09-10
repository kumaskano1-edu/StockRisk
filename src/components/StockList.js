// src/components/StockList.js
import React from 'react';
import StockCard from './StockCard';
import { useContext } from 'react';
import { MyArrayContext } from '../state/context';

function StockList({ stocks }) {

  if(stocks) {
  return (
    <div>
      <h2>Stock List</h2>
      <ul>
      {stocks.map((stock, index) => (
        <StockCard
          key={index}
          symbol={stock['1. symbol']}
          name={stock['2. name']}
        />
      ))}
      </ul>
    </div>
  );
}
}

export default StockList;
