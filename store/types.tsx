import type { Appwrite } from "appwrite";

type Todo = {
    $id?: string;
    isComplete: boolean;
    content: string;
};

type Alert = {
    color: "red";
    message: string;
};

type User = {
    $id: string;
    email: string;
    name: string;
};

type State = {
    todos: Todo[];
    user?: User;
    appwrite?: Appwrite;
};

export type {
    Todo,
    Alert,
    User,
    State
}