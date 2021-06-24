import { FormEvent, useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
  }
>;

type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
};

export function useRoom(roomId: string) {
  const [listQuestions, setListQuestions] = useState<QuestionProps[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roommRef = database.ref(`rooms/${roomId}`);

    roommRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestion = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isAnswered: value.isAnswered,
            isHighLighted: value.isHighLighted,
          };
        }
      );

      setTitle(databaseRoom.title);
      setListQuestions(parsedQuestion);
    });
  }, [roomId]);

  return { listQuestions, title };
}
