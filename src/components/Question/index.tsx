import { ReactNode } from 'react';
import cx from 'classnames';

import { QuestionContainer, QuestionFooter } from './styles';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content, 
    author, 
    children,
    isAnswered = false,
    isHighlighted = false,
}: QuestionProps) {
    return (
        <QuestionContainer className={
            cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered },
            )
            }>
            <p>{content}</p>
            <QuestionFooter>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </QuestionFooter>
        </QuestionContainer>
    );
};