import { ConnectKitProvider } from "connectkit";
import { useLayoutEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AllBridgesPage } from "./BridgeExplorer/AllBridgesPage";
import { BridgeFormPage } from "./BridgeForm/CreateSubgraphBridgePage";

import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Layout } from "./Layout/Layout";

const alchemyKey = import.meta.env.VITE_ALCHEMY_KEY;

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyKey }),
  publicProvider(),
]);

// Set up client
const client = createClient({
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

export const ScrollWrapper = ({ children }) => {
  const location = useLocation();
  const ref = useRef(null);

  useLayoutEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      ref={ref}
      className="overflow-y-scroll w-screen overflow-x-hiddenome"
      style={{ height: "calc(100vh - 70px)" }}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <div id="app-wrapper">
      <RecoilRoot>
        <BrowserRouter>
          <WagmiConfig client={client}>
            <ConnectKitProvider>
              {/* <Header /> */}

              <Layout>
                {/* <ScrollWrapper> */}
                <Routes>
                  <Route path="" element={<AllBridgesPage />} />
                  <Route path="/create" element={<BridgeFormPage />} />
                  <Route path="/bridges/:id" element={<div />} />
                </Routes>
                {/* </ScrollWrapper> */}
              </Layout>
            </ConnectKitProvider>
          </WagmiConfig>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
