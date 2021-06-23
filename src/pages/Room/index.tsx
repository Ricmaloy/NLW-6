import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';

import { database } from '../../services/firebase';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');

    async function handleSendNewQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === '') return;

        if(!user) {
            throw new Error('You mus be logged in'); 
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeAsk" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendNewQuestion}>
                    <textarea 
                      value={newQuestion}
                      placeholder="O que você quer perguntar ?"
                      onChange={event => setNewQuestion(event.target.value)}
                    />
                    <div className="form-footer">
                        <span>Pare enviar uma pergunta, <button>faça seu login</button>.</span>
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}