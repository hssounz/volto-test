import "../styles/globals.css";
import { ToastContainer } from "react-nextjs-toast";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
      <ToastContainer align={"center"} position={"bottom"} />
    </main>
  );
}
