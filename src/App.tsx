import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { createClient as createUrqlClient, Provider } from "urql";
import {
  configureChains,
  createClient as createWagmiClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { BridgeExplorer } from "./BridgeExplorer/BridgeExplorer";
import { Layout } from "./Layout/Layout";
import { blockChainMap, GOERLI } from "./lib/blockchains";

const urqlClient = createUrqlClient({
  url: blockChainMap[GOERLI].subgraphUrl,
});

const alchemyKey = import.meta.env.VITE_ALCHEMY_KEY;

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyKey }),
  publicProvider(),
]);

const queryClient = new QueryClient();

const wagmiClient = createWagmiClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function App() {
  return (
    <div id="app-wrapper">
      <Provider value={urqlClient}>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig client={wagmiClient}>
            <ConnectKitProvider>
              <Layout>
                <BridgeExplorer />
              </Layout>
            </ConnectKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
