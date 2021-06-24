import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import logo from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import "./room.scss";
import { database } from "../../services/firebase";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const { listQuestions, title } = useRoom(roomId);
  const [newQuestion, setNewQuestion] = useState("");
 

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Logo Letaskme" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Nome da sala {title}</h1>
          {listQuestions.length > 0 && (
            <span>
              {listQuestions.length}{" "}
              {listQuestions.length === 1 ? "pergunta" : "perguntas"}{" "}
            </span>
          )}
        </div>

        <form onSubmit={(e) => handleSendQuestion(e)}>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="O que você quer perguntar?"
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{" "}
                <button className="login">faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {listQuestions.map((question) => (
            <Question key={question.id} content={question.content} author={question.author} />
          ))}
        </div>
      </main>
    </div>
  );
}
