import {Link} from 'react-router-dom';

import { Button } from "../../components/Button";
//import { useAuth } from '../../hooks/useAuth';

import illustration from '../../assets/images/illustration.svg';
import logo from '../../assets/images/logo.svg';

import '../../styles/auth.scss';

export function NewRoom() {
  //const { user } = useAuth();

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
            <h2>Criar uma nova sala</h2>
            <form>
              <input type="text" placeholder="Nome da sala" />
              <Button type="submit">Criar sala</Button>
            </form>
              <p>Quer entrar em uma sala existente?<Link to="/"> Clique aqui</Link>
              </p>
          </div>
        </main>
      </div>
  );
}
