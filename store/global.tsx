import { Appwrite } from "appwrite";
import { atom } from "recoil";
import { Todo, User } from "./types";

export const Server = {
    endpoint: process.env.REACT_APP_ENDPOINT,
    project: process.env.REACT_APP_PROJECT,
    collectionID: process.env.REACT_APP_COLLECTION_ID,
};

export const appwrite = new Appwrite()
    .setEndpoint(Server.endpoint)
    .setProject(Server.project);

export const todoState = atom<Todo[]>({
    key: "todos",
    default: [],
});

export const userState = atom<User>({
    key: "user",
    default: null,
});
