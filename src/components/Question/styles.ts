import styled from 'styled-components';

export const QuestionContainer = styled.div`
    background: ${props => props.theme.colors.card};
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba( 0, 0, 0, 0.04);
    padding: 24px;

    p {
        color: ${props => props.theme.colors.card_text_primary};
    }

    & + .question {
        margin-top: 8px;
    }

    &.highlighted {
        background: ${props => props.theme.colors.card_highlight};
        border: 1px solid #835afd;

        footer .user-info span {
            color: ${props => props.theme.colors.card_text_secondary};
        }
    }

    &.answered {
        background: ${props => props.theme.colors.card_inactive};
    }
`;

export const QuestionFooter = styled.footer`
    display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;

        .user-info {
            display: flex;
            align-items: center;

            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }

            span {
                margin-left: 8px;
                color: ${props => props.theme.colors.card_text_secondary};
                font-size: 14px;
            }
        }

        > div {
            display: flex;
            gap: 8px;
        }

        button {
            border: 0;
            background: transparent;
            cursor: pointer;
            transition: filter .2s;

            &.like-button {
                display: flex;
                align-items: flex-end;
                color:  ${props => props.theme.colors.card_text_secondary};
                gap: 8px;

                &.liked {
                    color: #835afd;

                    svg path {
                        stroke: #835afd;
                    }
                }
            }

            &:hover {
                filter: brightness(0.7);
            }
        }
`;