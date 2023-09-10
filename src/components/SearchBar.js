// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onTickerChange }) {
  const [ticker, setTicker] = useState('');

  const handleInputChange = (event) => {
    setTicker(event.target.value);
    onTickerChange(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Ticker Symbol"
        value={ticker}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
