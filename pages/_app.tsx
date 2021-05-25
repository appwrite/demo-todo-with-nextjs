import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }: AppProps) => <RecoilRoot><Component {...pageProps} /></RecoilRoot>

export default App;