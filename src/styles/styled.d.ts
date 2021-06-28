import 'styled-components';


declare module 'styled-components' {
    export interface DefaultTheme {
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
}