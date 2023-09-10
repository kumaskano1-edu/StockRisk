import React, { useEffect, useState, useContext} from 'react';
import { MyArrayContext } from '../state/context';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from '@mui/material/Button';

export default function Orders() {
  const { myArray, updateArray } = useContext(MyArrayContext);  
  const [rerender, setRerender] = useState(false);

  const onRemoveClick = (symbol) =>{

    const newArray = myArray.filter(stock => stock.symbol !== symbol)
    updateArray(newArray)
  }
  return (  
    <React.Fragment>
      <Title>Your Stock Portfolio</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Stock Type</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myArray.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell align="right"><Button onClick={() => onRemoveClick(row.symbol)}>Remove</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}