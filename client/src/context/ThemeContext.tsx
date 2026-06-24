import React, {createContext, useContext, useEffect, useState} from 'react'


interface ThemeContextType{
    theme : 'dark' | 'light',
    toggleTheme : () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({children}: {children: React.ReactNode}) {

    /* if the theme is available then take the theme from localstorage , otherwise take the data from system*/
    const [theme, setTheme] = useState<'light' | 'dark'>(
        () => localStorage.getItem('theme') as 'light' | 'dark' ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')
    )


    /* now update the theme when state changes , so we have to use the useEffect hook */
    useEffect( () => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        localStorage.setItem('theme', theme)
    } , [theme] )


    const toggleTheme = () => {
        setTheme(  (prevTheme) => (prevTheme === 'light' ? 'dark' : 'light')   )
    }

    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}

export function useTheme(){
    const context = useContext(ThemeContext)
    if (context === undefined){
        throw new Error("useTheme must be used within ThemeProvider")
    }return context
}