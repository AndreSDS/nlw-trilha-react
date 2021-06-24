import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";

import logo from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";

import { database } from "../../services/firebase";

import "./styles.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
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
            />
          ))}
        </div>
      </main>
    </div>
  );
}
