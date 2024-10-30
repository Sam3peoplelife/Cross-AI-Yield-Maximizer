import anyTest from 'ava';
import { Worker } from 'near-workspaces';

const test = anyTest;

test.beforeEach(async t => {
  // Create a new sandbox environment
  const worker = t.context.worker = await Worker.init();

  // Deploy the AssetManager contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('asset-manager');
  await contract.deploy(
    process.argv[2],
  );

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

test('should create a new proposal', async t => {
  const { contract } = t.context;
  const user_id = 'user1';
  const protocol = 'protocol1';
  const amount = '100';
  const risk_level = 50;

  // Create a new proposal
  await contract.call('proposeAllocation', { user_id, protocol, amount, risk_level });

  // Get the proposal
  const proposal = await contract.view('getUserProposals', { user_id })[0];

  // Verify the proposal
  t.truthy(proposal);
  t.is(proposal.user_id, user_id);
  t.is(proposal.protocol, protocol);
  t.is(proposal.amount, amount);
  t.is(proposal.risk_level, risk_level);
  t.is(proposal.status, 0); // Pending
});

test('should confirm a proposal', async t => {
  const { contract } = t.context;
  const user_id = 'user1';
  const protocol = 'protocol1';
  const amount = '100';
  const risk_level = 50;

  // Create a new proposal
  await contract.call('proposeAllocation', { user_id, protocol, amount, risk_level });

  // Get the proposal ID
  const proposalId = await contract.view('getUserProposals', { user_id })[0].proposalId;

  // Confirm the proposal
  await contract.call('confirmAllocation', { user_id, proposalId });

  // Get the proposal
  const proposal = await contract.view('getUserProposals', { user_id })[0];

  // Verify the proposal
  t.truthy(proposal);
  t.is(proposal.status, 1); // Confirmed
});

test('should reject a proposal', async t => {
  const { contract } = t.context;
  const user_id = 'user1';
  const protocol = 'protocol1';
  const amount = '100';
  const risk_level = 50;

  // Create a new proposal
  await contract.call('proposeAllocation', { user_id, protocol, amount, risk_level });

  // Get the proposal ID
  const proposalId = await contract.view('getUserProposals', { user_id })[0].proposalId;

  // Reject the proposal
  await contract.call('rejectAllocation', { user_id, proposalId });

  // Get the proposal
  const proposal = await contract.view('getUserProposals', { user_id })[0];

  // Verify the proposal
  t.truthy(proposal);
  t.is(proposal.status, 2); // Rejected
});

test('should throw an error if trying to confirm or reject a non-existent proposal', async t => {
  const { contract } = t.context;
  const user_id = 'user1';
  const proposalId = 'non-existent-proposal-id';

  // Try to confirm the proposal
  await t.throwsAsync(contract.call('confirmAllocation', { user_id, proposalId }), 'Invalid proposal');

  // Try to reject the proposal
  await t.throwsAsync(contract.call('rejectAllocation', { user_id, proposalId }), 'Invalid proposal');
});