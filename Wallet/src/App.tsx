import React from "react";
import { useHotWallet } from "./HotWalletProvider";

export const App = () => {
  const { here, login, logout, user } = useHotWallet();

  if (!here) return null;


  return (
    <div className="container">
      {!user ? (
        <>
          <h1>Auth</h1>
          <button onClick={login}>Connect HOT Wallet</button>
        </>
      ) : (
        <>
          <h1>Hello {user?.accounts.near}</h1>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};
