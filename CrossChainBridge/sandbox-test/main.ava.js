import test from 'ava';
import { Worker } from 'near-workspaces';
import { NearBindgen, near, call, view } from 'near-sdk-js';

test.beforeEach(async t => {
  // Create sandbox
  const worker = t.context.worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('bridgeTransfer should transfer assets between chains', async (t) => {
  const { contract } = t.context.accounts;

  // Create a proposal
  const proposalId = await contract.call('createProposal', {
    user_id: 'user1',
    protocol: 'protocol1',
    amount: '100',
    risk_level: 50,
  });

  // Confirm the proposal
  await contract.call('confirmAllocation', { proposalId });

  // Perform the bridge transfer
  await contract.call('bridgeTransfer', {
    user_id: 'user1',
    protocol: 'protocol1',
    amount: '100',
    proposalId,
  });

  // Check the proposal status
  const proposalStatus = await contract.view('checkProposalStatus', { proposalId });
  t.is(proposalStatus, 'Invested');
});

test('checkProposalStatus should return the proposal status', async (t) => {
  const { contract } = t.context.accounts;

  // Create a proposal
  const proposalId = await contract.call('createProposal', {
    user_id: 'user1',
    protocol: 'protocol1',
    amount: '100',
    risk_level: 50,
  });

  // Check the proposal status
  const proposalStatus = await contract.view('checkProposalStatus', { proposalId });
  t.is(proposalStatus, 'Pending');
});

test('getBridgeStatus should return the bridge transfer status', async (t) => {
  const { contract } = t.context.accounts;

  // Create a proposal
  const proposalId = await contract.call('createProposal', {
    user_id: 'user1',
    protocol: 'protocol1',
    amount: '100',
    risk_level: 50,
  });

  // Confirm the proposal
  await contract.call('confirmAllocation', { proposalId });

  // Perform the bridge transfer
  const bridgeTransferId = await contract.call('bridgeTransfer', {
    user_id: 'user1',
    protocol: 'protocol1',
    amount: '100',
    proposalId,
  });

  // Check the bridge transfer status
  const bridgeStatus = await contract.view('getBridgeStatus', { transactionId: bridgeTransferId });
  t.is(bridgeStatus, 'Pending');
});