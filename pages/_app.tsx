import "../public/style.css";
import { IBM_Plex_Mono } from "@next/font/google";
import type { AppProps } from "next/app";

const plex = IBM_Plex_Mono({
  weight: "300",
  style: "normal",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
        * {
          font-family: ${plex.style.fontFamily};
        }
      `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
