import { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import { AssetManagerContract } from '@/config';

const CONTRACT = AssetManagerContract;

export default function AssetManager() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [assets, setAssets] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!wallet) return;
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId, wallet]);

  const handleGetAssets = async () => {
    if (!wallet || !signedAccountId) return;
    const assets = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_assets' });
    setAssets(assets);
  };

  const handleDepositAsset = async () => {
    if (!wallet || !signedAccountId) return;
    const assetId = 'some-asset-id';
    const amount = '100';
    await wallet.callMethod({ contractId: CONTRACT, method: 'deposit_asset', args: { asset_id: assetId, amount } });
  };

  const handleWithdrawAsset = async () => {
    if (!wallet || !signedAccountId) return;
    const assetId = 'some-asset-id';
    const amount = '100';
    await wallet.callMethod({ contractId: CONTRACT, method: 'withdraw_asset', args: { asset_id: assetId, amount } });
  };

  return (
    <div>
      <h1>Asset Manager</h1>
      {loggedIn && (
        <>
          <p>Your account ID: {signedAccountId}</p>
          <button onClick={handleGetAssets}>Get Assets</button>
          <ul>
            {assets.map((asset) => (
              <li key={asset.id}>{asset.name} ({asset.amount})</li>
            ))}
          </ul>
          <button onClick={handleDepositAsset}>Deposit Asset</button>
          <button onClick={handleWithdrawAsset}>Withdraw Asset</button>
        </>
      )}
    </div>
  );
}