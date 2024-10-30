import { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import { ProtocolIntegratorContract } from '@/config';

const CONTRACT = ProtocolIntegratorContract;

export default function ProtocolIntegrator() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [protocolInfo, setProtocolInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!wallet) return;
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId, wallet]);

  const handleGetProtocolInfo = async () => {
    if (!wallet || !signedAccountId) return;
    const protocolInfo = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_protocol_info' });
    setProtocolInfo(protocolInfo);
  };

  const handleProposeAllocation = async () => {
    if (!wallet || !signedAccountId) return;
    const protocolId = 'some-protocol-id';
    const amount = '100';
    const riskLevel = '50';
    await wallet.callMethod({ contractId: CONTRACT, method: 'propose_allocation', args: { protocol_id: protocolId, amount, risk_level: riskLevel } });
  };

  const handleGetInvestmentStatus = async () => {
    if (!wallet || !signedAccountId) return;
    const investmentStatus = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_investment_status' });
    console.log(investmentStatus);
  };

  return (
    <div>
      <h1>Protocol Integrator</h1>
      {loggedIn && (
        <>
          <p>Your account ID: {signedAccountId}</p>
          <button onClick={handleGetProtocolInfo}>Get Protocol Info</button>
          <p>Protocol Info: {JSON.stringify(protocolInfo)}</p>
          <button onClick={handleProposeAllocation}>Propose Allocation</button>
          <button onClick={handleGetInvestmentStatus}>Get Investment Status</button>
        </>
      )}
    </div>
  );
}