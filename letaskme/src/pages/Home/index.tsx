import {FormEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';

import illustration from '../../assets/images/illustration.svg';
import logo from '../../assets/images/logo.svg';
import googleIcon from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import '../../styles/auth.scss';
import { database } from '../../services/firebase';

export function Home() {
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    if (roomRef.val().endedAt) {
      //criar hottoast ou modalreact
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logo} alt="Logo Letaskme" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
            </button>

            <div className="separator">ou entre em uma sala</div>

            <form onSubmit={(e) => handleJoinRoom(e)}>
              <input value={roomCode} onChange={e => setRoomCode(e.target.value)} type="text" placeholder="Digite o código da sala" />
              <Button type="submit">Entra na sala</Button>
            </form>
        </div>
      </main>
    </div>
  );
}
