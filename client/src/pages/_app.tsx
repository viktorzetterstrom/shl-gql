import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>swedish hockey league 21/22</title>
        <meta
          name="description"
          content="Swedish Hockey League Statistics"
        ></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
export default MyApp;
