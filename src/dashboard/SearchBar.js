import React, { useEffect, useState, useContext} from 'react';
import { MyArrayContext } from '../state/context';
import { LoadingContext } from '../state/loading';
import TextField from '@mui/material/TextField';
import useDebounce from '../hooks/useDebounce';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingComponent from './LoadingComponent';

export default function SearchBar() {
    const [notices, setNotices ] = useState([])
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)
    const { myArray, updateArray } = useContext(MyArrayContext);
    const {isLoading, setLoading } = useContext(LoadingContext)  
    const apiKey = process.env.REACT_APP_API;

  useEffect( () => {

    async function fetchData() {
      if(search) {
        const data = await fetch(`https://finnhub.io/api/v1/search?q=${debouncedSearch}&token=${apiKey}`).then((res) => res.json())

        if (data.result) {
            const matches = data.result;
            setNotices(matches);
        }
      }
    
    }
    if(debouncedSearch) fetchData()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     // eslint-disable-next-line
}, [debouncedSearch]);
    const eraseButton = () => { 
      setSearch('');
      setNotices([]);
    }
    const handleAddItem = async(stock) => {
        let uniqueSymbol = stock.symbol
        setLoading(true)
        if(!myArray.some(item => uniqueSymbol === item.symbol)) {
            let stockFinances = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${uniqueSymbol}&metric=all&token=${apiKey}`).then((res) => res.json())
            let chartData = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${uniqueSymbol}&resolution=1&from=1609459200&to=1621363200&token=${apiKey}`).then((res) => res.json())
            let stockSkeleton = {
              ...stock,
              ...stockFinances,
              ...chartData
            }
            console.log(stockSkeleton)
            const newArray = [...myArray, stockSkeleton];
            updateArray(newArray);        
        }
        setTimeout(() => {
          setLoading(false); // Set loading to false when the operation is complete
        }, 2000);
    };



  return (
    <div>
      {!isLoading ? (
        <>
        <Grid container spacing={2}>
          <Grid item md={10} xs={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <TextField align="left" onChange={(e) => setSearch(e.target.value)} 
              id="outlined-basic" value={search} label="Search Stock Tickers" variant="outlined" />
            </Paper>
          </Grid>
          <Grid item md={2} xs={6}>
          <Paper sx={{ py: 3, px:2, display: 'flex', flexDirection: 'column' }}>
            <Button size='large' variant="outlined" onClick={() => eraseButton()} startIcon={<DeleteIcon />}>
              Erase
            </Button>        
          </Paper>
          </Grid>
        </Grid>
    
        <Table size="large" sx={{backgroundColor: 'white'}}>
            <TableBody>
            {notices ? notices.map((stock, index) =>   <TableRow key={index}>
                        <TableCell>{stock.symbol}</TableCell>
                        <TableCell>{stock.description}</TableCell>
                        <TableCell align="right"><Button onClick={() => handleAddItem(stock)} variant="text">Add</Button></TableCell>
                </TableRow> ) : null}
            </TableBody>
        </Table> 
        </>
      ) : <LoadingComponent />}
    </div>
  );
}

