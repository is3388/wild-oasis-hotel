import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error(
      'DarkModeContext was used outside of DarkModeContextProvider'
    );
  return context;
}
