import {FormEvent, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {useAuth} from "../../hooks/useAuth";
import {database} from "../../services/firebase";

import {Button} from "../../components/Button";

import illustration from "../../assets/illustration.svg";
import logoImg from "../../assets/logo.svg";

import './styles.scss'

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        if (newRoom.trim() === '') {
            return;
        }
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.replace(`admin/rooms/${firebaseRoom.key}`)

    }
    return(
        <div id="page-auth">
            <aside>
                <img src={ illustration } alt="Inicial Imagem Login"/>
                <strong>Crie salas de Q&amp;A ao vivo!</strong>
                <p>Tire as dúvidas de sua audiência em tempo real.</p>
            </aside >
            <main>
                <div className="main-content">
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
                </div>
            </main>
        </div>
    )
}