import "../styles/globals.css";
import NavBar from "../components/Home/navbar";
import { Provider } from "../context";
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
  chain,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Provider>
          <NavBar />
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
