import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PortfolioChart = ({ portfolioData }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your FinHub API key
    const apiKey = 'cjuao3hr01qlodk31tq0cjuao3hr01qlodk31tqg';

    // Define the start and end timestamps for your desired time period
    const startTime = 1609459200; // Replace with your start timestamp
    const endTime = 1621363200; // Replace with your end timestamp

    // Create an array to store data for each stock
    const stockDataPromises = portfolioData.map((stock) => {
      const apiUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${stock.symbol}&resolution=1&from=${startTime}&to=${endTime}&token=${apiKey}`;
      return axios.get(apiUrl);
    });

    // Fetch data for each stock concurrently
    Promise.all(stockDataPromises)
      .then((responses) => {
        const newChartData = {
          labels: responses[0].data.t.map((timestamp) => new Date(timestamp * 1000).toLocaleDateString()),
          datasets: [],
        };

        responses.forEach((response, index) => {
          newChartData.datasets.push({
            label: portfolioData[index].symbol,
            data: response.data.c,
            fill: false,
            borderColor: 'black', // Function to generate random colors
          });
        });

        setChartData(newChartData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [portfolioData]);

  return (
    <div className="portfolio-chart">
      <h2>Portfolio Performance</h2>
      <Line data={chartData} />
    </div>
  );
};

export default PortfolioChart;
