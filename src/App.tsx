import { useLayoutEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CreateSubgraphBridgePage } from "./Bridge/CreateSubgraphBridgePage";
import { GradientSVGDef } from "./Gradient/GradientSVGDef";
import { Header } from "./Header/Header";
import { initWeb3Onboard } from "./Wallet/onboard";

initWeb3Onboard();

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
    <div className="overflow-hidden h-screen w-screen" id="app-wrapper">
      <RecoilRoot>
        <BrowserRouter>
          <Header />

          <ScrollWrapper>
            <Routes>
              <Route path="/" element={<CreateSubgraphBridgePage />} />
              <Route path="/create" element={<CreateSubgraphBridgePage />} />
              <Route path="/bridges/:id" element={<div />} />
            </Routes>
          </ScrollWrapper>
        </BrowserRouter>
      </RecoilRoot>
      <GradientSVGDef />
    </div>
  );
}

export default App;
