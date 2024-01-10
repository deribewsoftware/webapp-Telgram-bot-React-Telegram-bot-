// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [language,setlanguage]=useState('amharic');
  const [data,setText]=useState(" ");
 
  const [dataset,setDataSet] = useState([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const  languageChange=(data)=>{
    setlanguage(data);
  }

  const  textChange=(dt)=>{
    setText(dt);
  }
  const resetData=() => {
    setText(" ");
  };

  const handleDataSave=(dataEntry)=>{
    setDataSet((dataSave)=>[...dataSave,dataEntry])
  }
  return (
    <ThemeContext.Provider value={{dataset,handleDataSave,resetData,textChange,data,language,languageChange, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
