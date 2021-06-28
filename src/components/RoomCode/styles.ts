import styled from "styled-components";

export const ButtonContainer = styled.button`
    height: 40px;
    border-radius: 8px;
    overflow: hidden;

    background: #fff;
    border: 1px solid #835afd;
    cursor: pointer;

    display: flex;

    div {
        height: 100%;
    }
`;

export const ButtonImg = styled.img`
    width: 45px;
    height: 100%;
    background: #835afd;
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ButtonCode = styled.span`
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 240px;
    font-size: 13px;
    font-weight: 500;
`;