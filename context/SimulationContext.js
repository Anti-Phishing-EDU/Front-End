import React, { createContext, useState } from 'react';

export const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addToHistory = (entry) => {
    setHistory(prev => [...prev, entry]);
  };

  return (
    <SimulationContext.Provider value={{ history, addToHistory }}>
      {children}
    </SimulationContext.Provider>
  );
};
