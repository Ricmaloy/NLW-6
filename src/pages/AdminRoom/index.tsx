import { useHistory, useParams } from 'react-router-dom';

import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';
import { Question } from '../../components/Question';

import EmptyQuestions from '../../assets/empty-questions.svg';

import { database } from '../../services/firebase';

import logoImg from '../../assets/logo.svg';
import DeleteImg from '../../assets/delete.svg';
import checkImg from '../../assets/check.svg';
import answerImg from '../../assets/answer.svg';

import { useRoom } from '../../hooks/useRoom';

import { Container, 
        Header, 
        HeaderContent, 
        Main, 
        QuestionList, 
        RoomTitle, 
        EmptyQuestion 
} from './styles';


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom() {
       await database.ref(`rooms/${roomId}`).update({
           endedAt: new Date(),
       })

       history.push('/');
    }

    async function handleCheckQuestionAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }

    return ( 
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="LetmeAsk" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined >Encerrar sala</Button>
                    </div>
                </HeaderContent>
            </Header>

            <Main>
                <RoomTitle>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta (s)</span>}
                </RoomTitle>

                <QuestionList>
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
                                {!question.isAnswered && (
                                    <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAnswered(question.id)}
                                    >
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="Dar destaque a pergunta" />
                                    </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={DeleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    }) ) : (
                        <EmptyQuestion>
                            <img src={EmptyQuestions} alt="Não há perguntas" />
                            <h3>Nenhuma pergunta por aqui...</h3>
                            <span>Envie a sala para seus ouvintes e começe a responder</span>
                        </EmptyQuestion>
                    )
                }
                </QuestionList>
            </Main>
        </Container>
    )
}