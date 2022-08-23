import "../styles/globals.css";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import wrapper from "../store";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
