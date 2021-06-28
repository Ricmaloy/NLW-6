import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface IThemeContext {
  toggleTheme(): void;
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

function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);

  return context;
}

export { useTheme };