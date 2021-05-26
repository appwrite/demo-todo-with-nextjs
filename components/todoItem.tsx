import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoState, userState } from "../store/global";
import { Todo } from "../store/types";
import { getJWT } from "../utils/jwt";

const TodoItem = ({ item }) => {
    const [todo, setTodo] = useState<Todo>(item);
    const [todos, setTodos] = useRecoilState(todoState);
    const [user, setUser] = useRecoilState(userState);

    const toggle = async (item) => {
        const jwt = await getJWT();
        await fetch('/api/todos', {
            method: 'PATCH',
            headers: {
                JWT: jwt
            },
            body: JSON.stringify({
                user: user.$id,
                todo: {
                    $id: todo.$id,
                    isComplete: !todo.isComplete
                }
            })
        });
        setTodo({
            ...todo,
            isComplete: !todo.isComplete
        });
    };

    const handleDelete = async () => {
        const jwt = await getJWT();
        await fetch('/api/todos', {
            method: 'DELETE',
            headers: {
                JWT: jwt
            },
            body: JSON.stringify({
                user: user.$id,
                todo: {
                    $id: todo.$id,
                }
            })
        });
        setTodos(todos.filter(n => n.$id !== todo.$id))
    };

    return (
        <li className="flex justify-between items-center mt-4 px-4">
            <div className="flex">
                <input
                    type="checkbox"
                    className="h-6 w-6 text-green-500 rounded-md border-4 border-green-200 focus:ring-0 transition duration-75 ease-in-out transform hover:scale-125"
                    checked={todo["isComplete"]}
                    onChange={toggle}
                />
                <div
                    className={`capitalize ml-3 text-md font-medium ${todo["isComplete"] ? "line-through" : ""
                        }`}
                >
                    {todo["content"]}
                </div>
            </div>
            <button
                onClick={handleDelete}
                className="focus:outline-none transition duration-75 ease-in-out transform hover:scale-125"
            >
                <img src="/assets/delete.svg" className="w-6 h-6 text-red-500" />
            </button>
        </li>
    );
};

export default TodoItem;