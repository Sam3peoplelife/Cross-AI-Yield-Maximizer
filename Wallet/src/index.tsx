import React from "react";
import { createRoot } from "react-dom/client";
import CryptoWalletDashboardComponent from "./components/CryptoWalletDashboardComponent/CryptoWalletDashboardComponent.jsx";
import { HotWalletProvider } from "./HotWalletProvider";
import { App } from "./App";

const Root = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <HotWalletProvider>
        <App />
      </HotWalletProvider>
      <CryptoWalletDashboardComponent/>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Root />);
