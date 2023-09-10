import React, { useState, useEffect } from 'react';

const MyArrayContext = React.createContext();

function MyArrayProvider({ children }) {
  const [myArray, setMyArray] = useState([]);

 
  useEffect(() => {
    // Retrieve the array from localStorage on component mount
    const storedArray = localStorage.getItem('myArray');
    if (storedArray) {
      setMyArray(JSON.parse(storedArray));
    }
  }, []);

  const updateArray = newArray => {
    setMyArray(newArray);
    // Save the updated array to localStorage
    localStorage.setItem('myArray', JSON.stringify(newArray));
  };
  return (
    <MyArrayContext.Provider value={{ myArray, updateArray }}>
      {children}
    </MyArrayContext.Provider>
  );
}

export { MyArrayContext, MyArrayProvider };
