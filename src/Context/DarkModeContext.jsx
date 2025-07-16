import { createContext, useEffect, useState } from "react";


export let DarkModeContext = createContext();


export default function DarkModeContextProvider({ children }) {

    const [darkMode, setDarkMode] = useState(false);

    // Toggle between light and dark mode
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    // Set theme on initial render
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return <DarkModeContext.Provider value={{ darkMode, toggleTheme }}>
        {children}
    </DarkModeContext.Provider>
}