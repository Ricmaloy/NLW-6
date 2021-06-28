import styled from 'styled-components';

export const Container = styled.div`
    background: ${props => props.theme.colors.bg_secondary};
`;

export const Header = styled.header`
    padding: 24px;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.bg_secondary};
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > img {
        max-height: 45px;
    }
`;

export const Main = styled.main`
    max-width: 800px;
    margin: 0 auto;
`;

export const RoomTitle = styled.div`
    margin: 32px 0 24px;
    display: flex;
    align-items: center;

    h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 24px;
        color: ${props => props.theme.colors.card_text_primary};
    }

    span {
        margin-left: 16px;
        background: ${props => props.theme.colors.tertiary};
        border-radius: 9999px;
        padding: 8px 16px;
        color: #fff;
        font-weight: 500;
        font-size: 14px;
    }
`;

export const QuestionsList = styled.div`
    margin-top: 32px;
    margin-bottom: 50px;
`;

export const EmptyQuestionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    img {
        margin-bottom: 20px;
        margin-top: 30px;
    }
`;

export const QuestionFormInput = styled.textarea`
    width: 100%;
    border: 0;
    padding: 16px;
    border-radius: 8px;
    background: ${props => props.theme.colors.card};
    color: ${props => props.theme.colors.card_text_primary};
    box-shadow: 0 2px 12px rgba(#000000, 0.04);
    resize: vertical;
    min-height: 130px;
`;

export const FormFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    > span {
        font-size: 14px;
        color: ${props => props.theme.colors.card_text_secondary};
        font-weight: 500;

        button {
            background: transparent;
            border: none;
            color: #835afd;
            text-decoration: underline;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }
    }
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    span {
        margin-left: 8px;
        color: ${props => props.theme.colors.card_text_primary};
        font-weight: 500;
        font-size: 14px;
    }
`;


export const RoomInfos = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
`;