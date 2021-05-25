import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { appwrite, userState } from "../store/global";
import { User } from "../store/types";

const links = [
  {
    href: "http://github.com/appwrite/appwrite",
    icon: <img src="/assets/github.svg" className="w-10 h-10 inline" />,
  },
  {
    href: "https://twitter.com/appwrite_io",
    icon: <img src="/assets/twitter.svg" className="w-10 h-10 inline" />,
  },
  {
    href: "http://appwrite.io",
    icon: <img src="/assets/appwrite.svg" className="w-10 h-10 inline" />,
  },
];

const Landing = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
      appwrite.account.get().then((response: User) => {
        setUser(response);
        router.replace("/todos");
      }, () => {
        console.log('no session found')
      })
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="container h-screen mx-auto flex">
        <div className="flex flex-col mx-auto justify-center p-6 text-center">
          <p className="my-8 text-xl md:text-2xl lg:text-3xl font-medium">Introducing</p>
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold">toTooooDoooo</h1>
          <p className="my-8 text-xl md:text-2xl lg:text-3xl font-medium">
            A Simple To-do App built with <img src="/assets/appwrite.svg" className="w-8 h-8 inline" /> Appwrite and <img src="/assets/nextjs.svg" className="w-8 h-8 inline" />
            Next.js
          </p>
          <a
            href="/login"
            className="mx-auto mt-4 py-3 lg:py-5 px-10 lg:px-24 text-lg md:text-2xl font-semibold rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none"
          >
            Get Started
          </a>
        </div>
      </section>

      <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8 flex">
        {links.map((item, index) => (
          <div key={index} className="rounded-full mx-4 transition duration-200 ease-in-out transform hover:-translate-y-3 hover:scale-125 hover:shadow-4xl">
            <a href={item["href"]}>{item["icon"]}</a>
          </div>
        ))}
      </section>
    </>
  )
};

export default Landing;
