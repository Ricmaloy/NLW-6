import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';

import illustrationImg from '../../assets/illustration.svg';
import logoImg from '../../assets/logo.svg';
import googleIcon from '../../assets/google-icon.svg';

import { Aside, Container, CreateButton, Main, MainContent, Separator } from './styles';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import Typist from 'react-typist';
import toast from 'react-hot-toast';

export function Home() {
    const history = useHistory(); 
    const { signInWithGoogle, user } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    };

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') {
            toast.error('Invalid name', {
                style: {
                  border: '1px solid #fd4141',
                  padding: '16px',
                  color: '#333333',
                },
                iconTheme: {
                  primary: '#fd4141',
                  secondary: '#FFFAEE',
                },
            });
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            toast.error('Could not find the room !', {
                style: {
                  border: '1px solid #fd4141',
                  padding: '16px',
                  color: '#333333',
                },
                iconTheme: {
                  primary: '#fd4141',
                  secondary: '#FFFAEE',
                },
            });
            return;
        }

        if(roomRef.val().endedAt) {
            toast.error('Room already closed !', {
                style: {
                  border: '1px solid #fd4141',
                  padding: '16px',
                  color: '#333333',
                },
                iconTheme: {
                  primary: '#fd4141',
                  secondary: '#FFFAEE',
                },
            });
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return (
        <Container>
            <Aside>
                <img src={illustrationImg} alt="Illustration simbolizando perguntas e respostas" />
                <Typist>
                    <strong>Crie salas de Q&amp;A</strong><br/>
                    <Typist.Delay ms={1000} />
                    <span>Tire as dúvidas da sua audiência em tempo real</span>
                </Typist>
            </Aside>
            <Main>
                <MainContent>
                    <img src={logoImg} alt="Logotipo da aplicação let me ask" />
                    <CreateButton onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </CreateButton>
                    <Separator className="separator">ou entre em uma sala</Separator>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                          type="text"
                          placeholder="Insira o código da sala"
                          onChange={event => setRoomCode(event.target.value)}
                          value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </MainContent>
            </Main>
        </Container>
    );
};
