  
import { useState } from 'react';
import { createContext } from 'react';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface IThemeContext {
    toggleTheme(): void ;
    theme: ITheme;
}

interface ITheme {
    title: string,

    colors: {
        primary: string,
        secondary: string,
        tertiary: string,

        text: string,
        bg_primary: string,
        bg_secondary: string,
        border: string,

        card: string,
        card_highlight: string,
        card_inactive: string,
        card_text_primary: string,
        card_text_secondary: string,

        white: string,
        warning: string,
    }
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider:  React.FC = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(() => {
        const storageTheme = localStorage.getItem('@letmeask/theme');

        if(storageTheme) {
            return JSON.parse(storageTheme);
        } else {
            return dark;
        }
    });

    const toggleTheme = () => {
        if(theme.title === 'dark') {
            setTheme(light);
            localStorage.setItem('@letmeask/theme', JSON.stringify(light));
        }else {
            setTheme(dark);
            localStorage.setItem('@letmeask/theme', JSON.stringify(dark));
        }
    }


    return(
        <ThemeContext.Provider value={{toggleTheme, theme}}>
            {children}
        </ThemeContext.Provider>
    )
}


export { ThemeProvider, ThemeContext }

