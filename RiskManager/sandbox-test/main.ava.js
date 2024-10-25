import anyTest from 'ava';
import { Worker } from 'near-workspaces';

const test = anyTest;

test.beforeEach(async t => {
  // Create a new sandbox environment
  const worker = t.context.worker = await Worker.init();

  // Deploy the RiskManager contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('risk-manager');
  await contract.deploy('../out/risk_manager.wasm');

  // Initialize the contract
  await contract.call('init', {});

  // Save the contract and worker for later use
  t.context.contract = contract;
  t.context.worker = worker;
});

test.afterEach.always(async t => {
  // Tear down the sandbox environment
  await t.context.worker.tearDown().catch(error => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('sets and gets user risk profile', async t => {
  const { contract } = t.context;
  const userId = 'user1';
  const riskLevel = 50;

  // Set the user risk profile
  await contract.call('setUserRiskProfile', { user_id: userId, risk_level: riskLevel });

  // Get the user risk profile
  const riskProfile = await contract.view('getUserRiskProfile', { user_id: userId });

  // Verify the risk profile
  t.truthy(riskProfile);
  t.is(riskProfile.user_id, userId);
  t.is(riskProfile.risk_level, riskLevel);
});

test('returns null for unknown user', async t => {
  const { contract } = t.context;
  const unknownUserId = 'unknown-user';

  // Get the user risk profile
  const riskProfile = await contract.view('getUserRiskProfile', { user_id: unknownUserId });

  // Verify the risk profile is null
  t.is(riskProfile, null);
});

test('throws error for invalid risk level', async t => {
  const { contract } = t.context;
  const userId = 'user2';
  const invalidRiskLevel = 101;

  // Try to set the user risk profile with an invalid risk level
  await t.throwsAsync(
    contract.call('setUserRiskProfile', { user_id: userId, risk_level: invalidRiskLevel }),
    { message: 'Risk level must be between 0 and 100' }
  );
});