import React, {useContext, useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { MyArrayContext } from '../state/context';

export default function Chart() {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const { myArray } = useContext(MyArrayContext);  

  // Function to calculate the aggregated performance of the portfolio
  const calculatePortfolioPerformance = () => {
    try {
      // Extract the stock data arrays and ensure they all have the same length
      const stockDataArray = myArray.map((stock) => stock.c);
      const maxLength = Math.max(...stockDataArray.map(data => data.length));
      const normalizedData = stockDataArray.map(data => {
        if (data.length < maxLength) {
          const padding = new Array(maxLength - data.length).fill(0);
          return [...data, ...padding];
        }
        return data;
      });
  
      // Sum the values for each time point
      const aggregatedData = Array.from({ length: maxLength }, (_, index) => ({
        time: `Time ${index}`,
        amount: normalizedData.reduce((sum, data) => sum + data[index], 0)
      }));
  
      return aggregatedData;
    } catch (error) {
      console.error('Error calculating portfolio performance:', error);
      return [];
    }
  };
   useEffect(() => {
   if(myArray.length > 0) {
   const data = calculatePortfolioPerformance()
   setChartData(data)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myArray]);

  return (
    <React.Fragment>
      <Title>Portfolio Performance</Title>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Stock Price ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
