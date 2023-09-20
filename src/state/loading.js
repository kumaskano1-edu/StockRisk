import React, { useState, createContext } from 'react';

const LoadingContext = createContext();
function MyLoadingProvider({ children }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading}}>
      {children}
    </LoadingContext.Provider>
  );
}

export { LoadingContext, MyLoadingProvider };
