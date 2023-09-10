import React, {useContext, useEffect} from 'react'
import { MyArrayContext } from '../state/context';
import axios from 'axios'
export default function BetaScore() {
  
  const { myArray, updateArray } = useContext(MyArrayContext);
  let betaScore = 0

    if(myArray) {
      myArray.map((stock) => {
      const ticker = stock.symbol
      const index = "GSPC"
      const interval = "1d"
      const observations = "350"
      betaScore = betaScore + 1.2
      // fetch(`https://api.newtonanalytics.com/stock-beta/?ticker=${ticker}&index=^${index}&interval=${interval}​&observations=${observations}`)
      //     .then((response) => {
      //       console.log(response.data)
      //       betaScore = betaScore + response.data;
      //     });
        }
        )
    }
  return (
    <div>{betaScore}</div>
  )
}
