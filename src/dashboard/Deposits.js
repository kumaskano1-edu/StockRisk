import React, {useContext, useEffect, useState} from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { MyArrayContext, MyArrayProvider } from '../state/context';
// import yahooFinance from "yahoo-finance";
export default function Deposits() {
  const { myArray, updateArray } = useContext(MyArrayContext);  
  const [count, setCount] = useState()
  useEffect( () => {
    async function fetchData() {
      if(myArray.length > 0) {
        const apiKey = 'cjuao3hr01qlodk31tq0cjuao3hr01qlodk31tqg';
        https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=cjuao3hr01qlodk31tq0cjuao3hr01qlodk31tqg
        // let data = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`).
        //   then((res) => res.json())
        //   let invidualBeta = data.Beta

        // for(const stock of myArray) {
        //   let symbol = stock.symbol
        //   let data = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`).
        //   then((res) => res.json())
          
        // }
        return
      }
    }
    fetchData()
}, [myArray]);
  return (
    <React.Fragment>
      <Title>Portfolio Risk</Title>
      <Typography component="p" variant="h4">
        {count}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
      </div>
    </React.Fragment>
  );
}