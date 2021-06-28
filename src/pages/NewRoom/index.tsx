import {FormEvent, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {useAuth} from "../../hooks/useAuth";
import {database} from "../../services/firebase";

import {Button} from "../../components/Button";

import illustration from "../../assets/illustration.svg";
import logoImg from "../../assets/logo.svg";
import Typist from 'react-typist';
import toast from 'react-hot-toast';

import { Aside, Container, Main, MainContent } from './styles';

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        if (newRoom.trim() === '') {
            toast.error('Invalid name !', {
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
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.replace(`admin/rooms/${firebaseRoom.key}`);

        toast.success('Sala criada com sucesso !', {
            style: {
              border: '1px solid #16C60C',
              padding: '16px',
              color: '#333333',
            },
            iconTheme: {
              primary: '#16C60C',
              secondary: '#FFFAEE',
            },
        });

    }
    return(
        <Container>
            <Aside>
                <img src={ illustration } alt="Inicial Imagem Login"/>
                <Typist>
                    <strong>Chame as pessoas !</strong><br/>
                    <Typist.Delay ms={1000} />
                    <span>Interaja com aqueles que te acompanham</span>
                </Typist>
            </Aside >
            <Main>
                <MainContent>
                    <img src={ logoImg } alt="LetMeAsk" />
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            value={newRoom}
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </MainContent>
            </Main>
        </Container>
    )
}