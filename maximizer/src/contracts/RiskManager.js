import { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import { RiskManagerContract } from '@/config';

const CONTRACT = RiskManagerContract;

export default function RiskManager() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [riskInfo, setRiskInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!wallet) return;
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId, wallet]);

  const handleGetRiskInfo = async () => {
    if (!wallet || !signedAccountId) return;
    const riskInfo = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_risk_info' });
    setRiskInfo(riskInfo);
  };

  const handleSetRiskProfile = async () => {
    if (!wallet || !signedAccountId) return;
    const riskLevel = '50';
    await wallet.callMethod({ contractId: CONTRACT, method: 'set_risk_profile', args: { risk_level: riskLevel } });
  };

  const handleGetUserRiskProfile = async () => {
    if (!wallet || !signedAccountId) return;
    const userRiskProfile = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_user_risk_profile' });
    console.log(userRiskProfile);
  };

  return (
    <div>
      <h1>Risk Manager</h1>
      {loggedIn && (
        <>
          <p>Your account ID: {signedAccountId}</p>
          <button onClick={handleGetRiskInfo}>Get Risk Info</button>
          <p>Risk Info: {JSON.stringify(riskInfo)}</p>
          <button onClick={handleSetRiskProfile}>Set Risk Profile</button>
          <button onClick={handleGetUserRiskProfile}>Get User Risk Profile</button>
        </>
      )}
    </div>
  );
}