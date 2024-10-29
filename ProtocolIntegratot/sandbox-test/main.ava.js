import test from 'ava';
import { Worker } from 'near-workspaces';

/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */

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

test('investWithConfirmation should invest funds in the selected protocol', async (t) => {
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

  // Invest with confirmation
  await contract.call('investWithConfirmation', { proposalId });

  // Check the investment status
  const investmentStatus = await contract.view('getInvestmentStatus', { user_id: 'user1' });
  t.is(investmentStatus.length, 1);
  t.is(investmentStatus[0].protocol, 'protocol1');
  t.is(investmentStatus[0].amount, '100');
});

test('withdrawFromProtocol should withdraw funds from the selected protocol', async (t) => {
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

  // Invest with confirmation
  await contract.call('investWithConfirmation', { proposalId });

  // Withdraw from the protocol
  await contract.call('withdrawFromProtocol', { user_id: 'user1', protocol: 'protocol1' });

  // Check the investment status
  const investmentStatus = await contract.view('getInvestmentStatus', { user_id: 'user1' });
  t.is(investmentStatus.length, 0);
});

test('getInvestmentStatus should return the current investment status for the user in different protocols', async (t) => {
  const { contract } = t.context.accounts;

  // Create proposals
  const proposalId1 = await contract.call('createProposal', {
    user_id: 'user1',
    protocol: 'protocol1',
    amount: '100',
    risk_level: 50,
  });
  const proposalId2 = await contract.call('createProposal', {
    user_id: 'user1',
    protocol: 'protocol2',
    amount: '200',
    risk_level: 75,
  });

  // Confirm the proposals
  await contract.call('confirmAllocation', { proposalId: proposalId1 });
  await contract.call('confirmAllocation', { proposalId: proposalId2 });

  // Invest with confirmation
  await contract.call('investWithConfirmation', { proposalId: proposalId1 });
  await contract.call('investWithConfirmation', { proposalId: proposalId2 }); 

  // Check the investment status
  const investmentStatus = await contract.view('getInvestmentStatus', { user_id: 'user1' });
  t.is(investmentStatus.length, 2);
  t.is(investmentStatus[0].protocol, 'protocol1');
  t.is(investmentStatus[0].amount, '100');
  t.is(investmentStatus[1].protocol, 'protocol2');
  t.is(investmentStatus[1].amount, '200');
});
