import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import TodoItem from "../components/todoItem";
import { appwrite, todoState, userState } from "../store/global";
import { User } from "../store/types";
import { getJWT, setJWT } from "../utils/jwt";


const Todo = () => {
    const [currentTodo, setCurrentTodo] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [todos, setTodos] = useRecoilState(todoState);
    const [user, setUser] = useRecoilState(userState);

    const router = useRouter();
    const addTodo = async (e: FormEvent<EventTarget>) => {
        e.preventDefault();
        const jwt = await getJWT();
        const res = await fetch('/api/todos', {
            method: 'post',
            headers: {
                JWT: jwt
            },
            body: JSON.stringify({
                user: user.$id,
                todo: {
                    content: currentTodo,
                    isComplete: false
                }
            })
        });
        const json = await res.json();
        setTodos(todos.concat(json));
        setCurrentTodo("");
    }


    const logout = async () => {
        await appwrite.account.deleteSession('current');
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("jwt_expire");
        router.push("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            const jwt = await getJWT();
            const res = await fetch('/api/todos', {
                headers: {
                    JWT: jwt
                }
            });
            const json = await res.json()
            setTodos(json.documents);
            setIsLoading(false);
        }
        fetchData()
    }, [user])

    useEffect(() => {
        if (user) return;
        const fetchData = async () => {
            const response = await appwrite.account.get();
            setUser(response as User);
        }
        fetchData()
    }, [])

    return (
        <>
            <section className="container h-screen max-h-screen px-3 max-w-xl mx-auto flex flex-col">
                <div className="my-auto p-16 rounded-lg text-center">
                    <div className="font-bold text-3xl md:text-5xl lg:text-6xl">
                        📝 <br /> &nbsp; toTooooDoooos
                    </div>
                    <form onSubmit={addTodo}>
                        <input
                            type="text"
                            className="w-full my-8 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
                            placeholder="🤔   What to do today?"
                            required={true}
                            value={currentTodo}
                            onChange={(e) => setCurrentTodo(e.target.value)}
                        ></input>
                    </form>

                    {isLoading && <h1> Loading .... </h1>}

                    <ul>
                        {todos.map((item) => (
                            <TodoItem key={item["$id"]} item={item} />
                        ))}
                    </ul>
                </div>
            </section>

            <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8">
                <button onClick={logout} className="mx-auto mt-4 py-3 px-12 font-semibold text-md rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none">
                    Logout 👋
            </button>
            </section>
        </>
    );
};

export default Todo;
