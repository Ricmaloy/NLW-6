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

export const Main = styled.main`
    width: 55vw;

    padding: 0 32px;

    background: ${props => props.theme.colors.bg_primary};

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MainContent = styled.div`
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
`;

export const CreateButton = styled.button`
    margin-top: 64px;
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background: ${props => props.theme.colors.warning};
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter .2s;

    img {
        margin-right: 8px;
    }

    &:hover {
        filter: brightness(0.9);
    }
`;

export const Separator = styled.div`
    font-size: 14px;
    color: #a8a8b3;

    margin: 32px 0;
    display: flex;
    align-items: center;

    &::before {
        content: "";
        flex: 1;
        height: 1px;
        background: #a8a8b3;
        margin-right: 16px;
    }

    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background: #a8a8b3;
        margin-left: 16px;
    }
`;

export const SwitchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    margin-top: 30px;
`;