import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionProps = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

type FireBaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>


export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {

            const databaseRoom = room.val();
            const firebaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            });

            const sortedQuestions = parsedQuestions.sort((a, b) => a.likeCount < b.likeCount ? 1 : -1 );

            const answeredQuestions: { id: string; content: string; author: { name: string; avatar: string; }; isHighlighted: boolean; isAnswered: boolean; likeCount: number; likeId: string | undefined; }[] = [];
            const unansweredQuestions: { id: string; content: string; author: { name: string; avatar: string; }; isHighlighted: boolean; isAnswered: boolean; likeCount: number; likeId: string | undefined; }[] = [];

            sortedQuestions.forEach(question => {
                if(question.isAnswered === true) {
                    answeredQuestions.push(question);
                } else {
                    unansweredQuestions.push(question);
                }
            });

            const formatedQuestions = [...unansweredQuestions, ...answeredQuestions];

            setTitle(databaseRoom.title);
            setQuestions(formatedQuestions);
        });

        return () => {
            roomRef.off('value'); 
        }
    }, [roomId, user?.id ]);

    return {questions, title}
}