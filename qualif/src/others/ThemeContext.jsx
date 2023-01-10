import { createContext, useContext, useState } from "react"

export const Themes = {
    light: {
        background: "#ffffff",
        font: "#000000"
    },
    dark: {
        background: "#222222",
        font: "#ffffff"
    }
}

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [CurrTheme, setCurrTheme] = useState(Themes.light);

    const changeTheme = () => {
        if (CurrTheme === Themes.dark){
            setCurrTheme(Themes.light);
        }else{
            setCurrTheme(Themes.dark);
        }
    }

    return (
        <ThemeContext.Provider value={{CurrTheme, changeTheme}}>
            <style>{`body { background-color: ${CurrTheme.background}; }`}</style>
            <div style={{
                backgroundColor: CurrTheme.background,
                color: CurrTheme.font,
            }}>
                
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    return useContext(ThemeContext);
}