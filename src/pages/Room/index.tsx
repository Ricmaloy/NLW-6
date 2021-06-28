import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import Switch from 'react-switch';

import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';
import { Question } from '../../components/Question';

import { useAuth } from '../../hooks/useAuth';

import { database } from '../../services/firebase';

import logoImg from '../../assets/logo.svg';
import logoWhiteImg from '../../assets/logo-white.svg';
import EmptyQuestions from '../../assets/empty-questions.svg';

import {
    Container,
    EmptyQuestionsContainer,
    FormFooter,
    Header,
    HeaderContent,
    Main,
    QuestionFormInput,
    QuestionsList,
    RoomTitle,
    UserInfo,
    RoomInfos,
    AnonSwitch
} from './styles';

import { useRoom } from '../../hooks/useRoom';
import toast from 'react-hot-toast';
import { useTheme } from '../../hooks/useTheme';
import { SwitchBtn } from '../../components/SwitchBtn';


type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [isAnonQuestion, setIsAnonQuestion] = useState<boolean>(false);

    async function handleSendNewQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === '') return;

        if(!user) {
            throw new Error('You mus be logged in'); 
        }

        const question = {
            content: newQuestion,
            author: {
                name: isAnonQuestion ? 'Anônimo(a)' : user.name,
                avatar: isAnonQuestion ? 'https://www.hiringthing.com/wp-content/uploads/2018/11/avatar-generic.jpg' : user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        toast('Question successfully sent', {
            icon: '👏',
        });

        setNewQuestion('');
    }

    async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
        
        if( likeId ) {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
        } else {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id,
                name: user?.name,
                avatar: user?.avatar,
            });
        }
    }

    return ( 
        <Container>
            <Header>
                <HeaderContent>
                    <img src={ theme.title === 'light' ? logoImg : logoWhiteImg} alt="Logotipo da aplicação let me ask" />
                    <RoomInfos>
                        <RoomCode code={roomId} />
                        <SwitchBtn />
                    </RoomInfos>
                </HeaderContent>
            </Header>

            <Main>
                <RoomTitle>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta (s)</span>}
                </RoomTitle>

                <form onSubmit={handleSendNewQuestion}>
                    <QuestionFormInput 
                      value={newQuestion}
                      placeholder="O que você quer perguntar ?"
                      onChange={event => setNewQuestion(event.target.value)}
                    />
                   
                    <AnonSwitch>
                        <Switch
                            onChange={() => setIsAnonQuestion(!isAnonQuestion)}
                            checked={isAnonQuestion}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            height={15}
                            width={40}
                            handleDiameter={20}
                            onColor={theme.colors.secondary}
                            offColor={theme.colors.tertiary}
                        />    
                        <span>{isAnonQuestion ? 'Anônimo(a)' : 'Não anônimo(a)'}</span>
                    </AnonSwitch>   



                    <FormFooter>
                        { user ? (
                            <UserInfo>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </UserInfo>
                        ) : (
                            <span>Pare enviar uma pergunta, <button>faça seu login</button>.</span>
                        ) }
                        
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </FormFooter>
                </form>
                <QuestionsList>
                    {
                    questions.length !== 0 ? (
                        questions.map(question => {
                            return (
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                    isAnswered={question.isAnswered}
                                    isHighlighted={question.isHighlighted}
                                >
                                    { !question.isAnswered && (
                                        <button
                                            className={`like-button ${question.likeId ? 'liked' : ''}`}
                                            type="button"
                                            aria-label="Marcar como gostei"
                                            onClick={() => handleLikeQuestion(question.id, question.likeId)}
                                        >
                                            { question.likeCount > 0 && <span>{question.likeCount}</span> }
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    )}
                                </Question>
                            )
                        }) ) : (
                            <EmptyQuestionsContainer>
                                <img src={EmptyQuestions} alt="Não há perguntas" />
                                <h3>Nenhuma pergunta por aqui...</h3>
                                <span>Seja a primeira pessoa a fazer uma pergunta!</span>
                            </EmptyQuestionsContainer>
                        )
                    }
                        
                </QuestionsList>
            </Main>
        </Container>
    )
}