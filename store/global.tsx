import { Appwrite } from "appwrite";
import { atom } from "recoil";
import { Todo, User } from "./types";
// “In a software project team of ten, there are probably three people who produce enough defects to make them net-negative producers.”
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
