import React, {useContext, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { MyArrayContext } from '../state/context';
// import yahooFinance from "yahoo-finance";
export default function Deposits() {
  const { myArray } = useContext(MyArrayContext);  
  const [count, setCount] = useState()
  useEffect( () => {
    async function fetchData() {
      let betaPercentage = 0
      let maxBeta = 2
      let minBeta = 0.5
      let totalBeta = 0;
      if(myArray.length > 0) {
        //calculate each weighted beta 
        myArray.map((invidualStock) => {
          let singleBeta = invidualStock.metric.beta
          let singleWeightedBeta = singleBeta * (1 / myArray.length)
          //calculate totalBeta
          totalBeta = totalBeta + singleWeightedBeta
          return null
        })
      }
      //calculate the normalized percentage 
      betaPercentage = 100 * ((totalBeta - minBeta) / (maxBeta - minBeta))
      setCount(Math.floor(betaPercentage))
    }
    if(myArray.length > 0) { fetchData()}
    else setCount(0)
}, [myArray]);
  return (
    <React.Fragment>
      <Title>Portfolio Risk</Title>
      <Typography component="p" variant="h4">
        {count}%
      </Typography>
      <Typography color="text.secondary">
        Risk compared to Market
      </Typography>

    </React.Fragment>
  );
}