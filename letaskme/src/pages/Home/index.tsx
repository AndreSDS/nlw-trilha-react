import {useHistory} from 'react-router-dom';

import illustration from '../../assets/images/illustration.svg';
import logo from '../../assets/images/logo.svg';
import googleIcon from '../../assets/images/google-icon.svg';

import '../../styles/auth.scss';
import { Button } from '../../components/Button';

export function Home() {
  const history = useHistory();

  function navigateToNewRoom() {
    history.push('/rooms/new');
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
          <button onClick={navigateToNewRoom} className="create-room">
            <img src={googleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
            </button>

            <div className="separator">ou entre em uma sala</div>

            <form>
              <input type="text" placeholder="Digite o código da sala" />
              <Button type="submit">Entra na sala</Button>
            </form>
        </div>
      </main>
    </div>
  );
}
