import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

  // create global state for the entire app
  const DarkModeContext = createContext();

  function DarkModeProvider({children}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    }
    else {
    document.documentElement.classList.add('light-mode')
    document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  function toggleDarkMode() {
    setIsDarkMode((darkMode) => !darkMode)
  }
  return <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
    {children}
  </DarkModeContext.Provider>
}


export { DarkModeProvider, DarkModeContext }


