import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react"
import Alert from "../components/alert";
import { useRouter } from "next/router";
import { appwrite, userState } from "../store/global";
import { useRecoilState } from "recoil";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();

    const login = async (e: FormEvent<EventTarget>) => {
        e.preventDefault();
        try {
            setUser(await appwrite.account.createSession(email, password));
            router.push("/todos");
        } catch (error) {
            setAlert(error.message);
        }
    }

    return (
        <>
            {alert && <Alert message={alert} />}
            <section className="container h-screen mx-auto flex">
                <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
                    <h1 className="text-6xl font-bold">Login</h1>
                    <p className="mt-6">
                        Don't have an account?{" "}
                        <Link href="/signup">
                            <a className="cursor-pointer underline">
                                Sign Up
                        </a>
                        </Link>
                    </p>
                    <form onSubmit={login}>
                        <label className="block mt-6" htmlFor="email"> Email</label>
                        <input
                            id="email"
                            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
                            type="email"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="block mt-6" htmlFor="password"> Password</label>
                        <input
                            id="password"
                            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
                            type="password"
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={!email || !password}
                                className="mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Login
              </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;
