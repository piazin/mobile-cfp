import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [deviceTheme, setDeviceTheme] = useState("");

  let colorScheme = useColorScheme();
  useEffect(() => {
    setDeviceTheme(colorScheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ deviceTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
