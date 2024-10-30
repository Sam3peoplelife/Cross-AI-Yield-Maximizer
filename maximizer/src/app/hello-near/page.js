'use client';
import { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import axios from 'axios';

const CONTRACTS = {
  protocolIntegrator: require('../../../dist/PI/contract'),
  riskManager: require('../../../dist/RM/contract'),
  assetManager: require('../../../dist/AM/contract'),
  crossChainBridge: require('../../../dist/CCB/contract'),
};

const page = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [protocol, setProtocol] = useState('');
  const [tvlPrediction, setTvlPrediction] = useState(0);
  const [previousTvl, setPreviousTvl] = useState(0);
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);
  const [rejectButtonDisabled, setRejectButtonDisabled] = useState(true);

  useEffect(() => {
    if (!wallet) return;
    const uniqueNames = ['Aave', 'Compound', 'MakerDAO']; // hardcoded for now
    setProtocol(uniqueNames[0]);
  }, [wallet]);

  const handleProtocolChange = async (event) => {
    const selectedProtocol = event.target.value;
    setProtocol(selectedProtocol);
    const response = await axios.get(`http://localhost:3001/predict/${selectedProtocol}`);
    const predictedTvl = response.data.prediction;
    setTvlPrediction(predictedTvl);
    setConfirmButtonDisabled(false);
    setRejectButtonDisabled(false);
  };

  const handleConfirm = async () => {
    if (!wallet || !signedAccountId) return;
    const protocolId = protocol;
    const tvl = tvlPrediction;
    const riskLevel = await riskManager.getRiskLevel(signedAccountId);
    await protocolIntegrator.proposeAllocation(protocolId, tvl, riskLevel);
    await assetManager.depositAsset(protocolId, tvl);
    await crossChainBridge.crossChainTransfer(protocolId, tvl);
    setConfirmButtonDisabled(true);
    setRejectButtonDisabled(true);
  };

  const handleReject = async () => {
    if (!wallet || !signedAccountId) return;
    const protocolId = protocol;
    const tvl = tvlPrediction;
    const riskLevel = await riskManager.getRiskLevel(signedAccountId);
    await protocolIntegrator.rejectAllocation(protocolId, tvl, riskLevel);
    setConfirmButtonDisabled(true);
    setRejectButtonDisabled(true);
  };

  return (
    <div>
      <h1>Protocol Selection</h1>
      <select value={protocol} onChange={handleProtocolChange}>
        {['Aave', 'Compound', 'MakerDAO'].map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <p>TVL Prediction: {tvlPrediction}</p>
      <button onClick={handleConfirm} disabled={confirmButtonDisabled}>
        Confirm
      </button>
      <button onClick={handleReject} disabled={rejectButtonDisabled}>
        Reject
      </button>
    </div>
  );
};

export default page;