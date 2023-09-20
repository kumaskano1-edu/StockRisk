import React, { useState, useEffect, createContext } from 'react';

const MyArrayContext = createContext();
function MyArrayProvider({ children }) {
  const [myArray, setMyArray] = useState([]);

  useEffect(() => {
    // Retrieve the array from localStorage on component mount
    const storedArray = localStorage.getItem('myArray');
    if (storedArray) {
      setMyArray(JSON.parse(storedArray));
    }
    // Set loading to false once the data is loaded
  }, []);

  const updateArray = (newArray) => {
    setMyArray(newArray);
    // Save the updated array to localStorage
    localStorage.setItem('myArray', JSON.stringify(newArray));
  };

  return (
    <MyArrayContext.Provider value={{ myArray, updateArray}}>
      {children}
    </MyArrayContext.Provider>
  );
}

export { MyArrayContext, MyArrayProvider };
