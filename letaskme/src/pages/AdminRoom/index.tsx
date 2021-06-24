import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";

import logo from "../../assets/images/logo.svg";
import delete from "../../assets/images/delete.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";

import "./styles.scss";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { listQuestions, title } = useRoom(roomId);

  function handleDeleteQuestion(questionId: string) {
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
            <Button isOutlined>Criar sala</Button>
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
                <img src={delete} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
