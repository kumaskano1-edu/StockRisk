// src/App.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import StockList from './StockList';
import { useContext } from 'react';
import { MyArrayContext } from '../state/context';
import PortfolioCard from './PortfolioCard';
import BetaScore from './BetaScore';
function App() {
  const [ticker, setTicker] = useState('');
  const [stocks, setStocks] = useState();
  const { myArray, updateArray } = useContext(MyArrayContext);
 
  useEffect(() => {
    if (ticker) {
      fetchStocks();
    } else {
      setStocks([]);
    }
  }, [ticker]);

  const fetchStocks = async () => {
    // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
    const apiKey = 'YOUR_API_KEY';
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${apiKey}`
    );
    const data = await response.json();
    if (data.bestMatches) {
      const matches = data.bestMatches;
      setStocks(matches);
    }
  };


  return ( 
    <div>
      <h1>Stock App</h1>
      <BetaScore />
      <SearchBar onTickerChange={setTicker} />
      <StockList stocks={stocks}/>
      <ul>
        {myArray ? myArray.map((item) => <PortfolioCard  key={item.index}
          symbol={item.symbol}
          name={item.name}/> ): null}
      </ul>
    </div>
    
  );
}

export default App;
