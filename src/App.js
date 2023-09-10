import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Context } from './state/context';
import { MyArrayProvider } from './state/context';
import StockApp from './components/StockApp';
import Dashboard from "./dashboard/Dashboard"
function App() {

  return (
    <div className="App">    
    <MyArrayProvider>
      <Dashboard />
    </MyArrayProvider>
    </div>
  );
}

export default App;
