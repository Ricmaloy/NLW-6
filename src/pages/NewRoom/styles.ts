import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: stretch;
    height: 100vh;
`;

export const Aside = styled.aside`
    width: 45vw;

    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};


    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 120px 80px;

    img {
        max-width: 320px;
    }

    strong {
        font: 700 36px 'Poppins', sans-serif;
        line-height: 42px;
        margin-top: 16px;
    }

    span {
        font-size: 24px;
        line-height: 32px;
        margin-top: 16px;
        color: #f8f8f8;
    }
`;

export const Main = styled.div`
    width: 55vw;

    padding: 0 32px;

    background: ${props => props.theme.colors.bg_primary};

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MainContent = styled.main`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: center;

    > img {
        align-self: center;
        width: 160px;
    }

    h2 {
        font-size: 24px;
        margin: 64px 0 24px;
        font-family: 'Poppins', sans-serif;

        color: ${props => props.theme.colors.card_text_primary};
    }

    form {
        input {
            height: 50px;
            border-radius: 8px;
            padding: 0 16px;
            background: ${props => props.theme.colors.card_highlight};
            border: 1px solid ${props => props.theme.colors.border};
            color: ${props => props.theme.colors.card_text_primary};
        }

        button {
            margin-top: 16px;
        }

        button, input {
            width: 100%;
        }
    }

    p {
        font-size: 14px;
        color: #737380;
        margin-top: 16px;

        a {
            color: #e559f9;
        }
    }
`;

export const SwitchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    margin-top: 30px;
`;