import { useHistory, useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";

import logo from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";

import "./styles.scss";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { listQuestions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    // inserir modal react-modal
    if (window.confirm('Tem certeza que deseja exluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Logo Letaskme" />

          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {listQuestions.length > 0 && (
            <span>
              {listQuestions.length}{" "}
              {listQuestions.length === 1 ? "pergunta" : "perguntas"}{" "}
            </span>
          )}
        </div>

        <div className="question-list">
          {listQuestions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
