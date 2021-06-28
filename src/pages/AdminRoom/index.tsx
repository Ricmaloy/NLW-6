import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { RoomCode } from '../../components/RoomCode';
import { SwitchBtn } from '../../components/SwitchBtn';
import { Button } from '../../components/Button';
import { Question } from '../../components/Question';

import EmptyQuestions from '../../assets/empty-questions.svg';

import Modal from 'react-modal';

import { database } from '../../services/firebase';

import { useRoom } from '../../hooks/useRoom';
import { useTheme } from '../../hooks/useTheme';

import logoImg from '../../assets/logo.svg';
import logoWhiteImg from '../../assets/logo-white.svg';
import DeleteImg from '../../assets/delete.svg';
import checkImg from '../../assets/check.svg';
import answerImg from '../../assets/answer.svg';
import Close from '../../assets/close.svg';
import redDelete from '../../assets/redDelete.svg';


import { 
    Container, 
    Header, 
    HeaderContent, 
    Main, 
    QuestionList, 
    RoomTitle, 
    EmptyQuestion,
    RoomInfos,
    ModalContainer
} from './styles';



type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory();
    const { theme } = useTheme();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    const [isEndRoomModalOpen, setIsEndRoomModalOpen] = useState(false);
    const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] = useState(false);

    const [deleteQuestionId, setDeleteQuestionId] = useState('');

    async function handleDeleteQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

        setIsDeleteQuestionModalOpen(false);
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

    function handleCloseEndRoomModal() {
        setIsEndRoomModalOpen(false);
    }

    function handleOpenDeleteQuestionModal(questionId: string) {
        setDeleteQuestionId(questionId);
        setIsDeleteQuestionModalOpen(true);
    }

    function handleCloseDeleteQuestionModal() {
        setIsDeleteQuestionModalOpen(false);
        setDeleteQuestionId('');
    }

    const modalStyles= {
        content: {
            width: '50%',
            height: '60%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: `${theme.colors.bg_secondary}`,
            borderColor: `${theme.colors.bg_primary}`,
        },
        overlay: {
            backgroundColor: 'rgba(5, 2, 6, 0.8)',
        },
    }

    return ( 
        <Container>
            <Header>
                <HeaderContent>
                    <img src={ theme.title === 'light' ? logoImg : logoWhiteImg} alt="Logotipo da aplicação let me ask" />
                    <RoomInfos>
                        <RoomCode code={roomId} />
                        <Button onClick={() => setIsEndRoomModalOpen(true)} isOutlined >Encerrar sala</Button>
                        <SwitchBtn />
                    </RoomInfos>
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
                                    onClick={() => handleOpenDeleteQuestionModal(question.id)}
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
                
            <Modal
                isOpen={isEndRoomModalOpen}
                onRequestClose={handleCloseEndRoomModal}
                style={modalStyles}
            >
                <ModalContainer>
                    <img src={Close} alt="Encerrar sala" />
                    <h1>Encerrar sala</h1>
                    <p>Tem certeza que você deseja encerrar esta sala ?</p>
                    <div>
                        <button 
                            type="button"
                            onClick={handleCloseEndRoomModal}
                        >Cancelar</button>
                        <button 
                            type="button"
                            onClick={() => handleEndRoom()}
                        >Sim, encerrar</button>
                    </div>
                </ModalContainer>
            </Modal>

            <Modal
                isOpen={isDeleteQuestionModalOpen}
                onRequestClose={handleCloseDeleteQuestionModal}
                style={modalStyles}
            >
                <ModalContainer>
                    <img src={redDelete} alt="Apagar imagemh" />
                    <h1>Excluir pergunta</h1>
                    <p>Tem certeza que você deseja excluir esta pergunta ?</p>
                    <div>
                        <button 
                            type="button"
                            onClick={handleCloseDeleteQuestionModal}
                        >Cancelar</button>
                        <button 
                            type="button"
                            onClick={() => handleDeleteQuestion(deleteQuestionId)}
                        >Sim, excluir</button>
                    </div>
                </ModalContainer>
            </Modal>
        </Container>
    )
}