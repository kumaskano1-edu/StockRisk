import React, { useEffect, useState, useContext} from 'react';
import { MyArrayContext } from '../state/context';
import TextField from '@mui/material/TextField';
import StockList from '../components/StockList';
import useDebounce from '../hooks/useDebounce';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TabOutlined, TableView } from '@mui/icons-material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';

export default function SearchBar() {
    const [notices, setNotices ] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const debouncedSearch = useDebounce(search, 500)
    const { myArray, updateArray } = useContext(MyArrayContext);  
    
  useEffect( () => {
    async function fetchData() {
      setLoading(true)
      if(search) {
        const apiKey = '4ADN1I2Q8A076DAR';
        const data = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${debouncedSearch}&apikey=${apiKey}`).
        then((res) => res.json())

        if (data.bestMatches) {
            const matches = data.bestMatches;
            setNotices(matches);
        }
      }
      setLoading(false)

    }
    if(debouncedSearch) fetchData()
}, [debouncedSearch]);

    const handleAddItem = (symbol, name, type, region) => {
        const newItem = {
        symbol: symbol,
        name: name,
        type: type,
        region: region
        }
        if(!myArray.some(item => symbol === item.symbol)) {
            const newArray = [...myArray, newItem];
            updateArray(newArray);        
        }
    };



  return (
    <div>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <TextField onChange={(e) => setSearch(e.target.value)} 
      id="outlined-basic" label="Search Stock Tickers" variant="outlined" />
    </Paper>

    <Table size="large" sx={{backgroundColor: 'white'}}>
        <TableBody>
        {notices ? notices.map((stock, index) =>   <TableRow key={index}>
                    <TableCell>{stock['1. symbol']}</TableCell>
                    <TableCell>{stock['2. name']}</TableCell>

                    <TableCell align="right"><Button onClick={() => handleAddItem(stock['1. symbol'], stock['2. name'], stock['3. type'], stock['4. region'])} variant="text">Add</Button></TableCell>
            </TableRow> ) : null}
        </TableBody>
    </Table> 
    </div>
  );
}

