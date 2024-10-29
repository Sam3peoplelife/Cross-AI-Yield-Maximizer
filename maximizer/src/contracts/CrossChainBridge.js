import { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import { CrossChainBridgeContract } from '@/config';

const CONTRACT = CrossChainBridgeContract;

export default function CrossChainBridge() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [bridgeInfo, setBridgeInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!wallet) return;
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId, wallet]);

  const handleGetBridgeInfo = async () => {
    if (!wallet || !signedAccountId) return;
    const bridgeInfo = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_bridge_info' });
    setBridgeInfo(bridgeInfo);
  };

  const handleCrossChainTransfer = async () => {
    if (!wallet || !signedAccountId) return;
    const amount = '100';
    const recipient = 'some-recipient-id';
    await wallet.callMethod({ contractId: CONTRACT, method: 'cross_chain_transfer', args: { amount, recipient } });
  };

  return (
    <div>
      <h1>Cross Chain Bridge</h1>
      {loggedIn && (
        <>
          <p>Your account ID: {signedAccountId}</p>
          <button onClick={handleGetBridgeInfo}>Get Bridge Info</button>
          <p>Bridge Info: {JSON.stringify(bridgeInfo)}</p>
          <button onClick={handleCrossChainTransfer}>Cross Chain Transfer</button>
        </>
      )}
    </div>
  );
}