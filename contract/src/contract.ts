import { NearBindgen, near, call, view, NearPromise } from 'near-sdk-js';
import { v4 as uuidv4 } from 'uuid';


const proposalId = uuidv4();
@NearBindgen({})
class AssetManager {
  // Mapping of user balances
  private balances: Map<string, number> = new Map();

  // Mapping of user risk levels
  private riskLevels: Map<string, number> = new Map();

  // Mapping of proposals
  private proposals: Map<string, Proposal> = new Map();

  // Deposit function
  @call({}) // This method changes the state, for which it cost gas
  deposit(): void {
    // Get the sender's account ID
    const sender = near.predecessorAccountId();

    // Get the deposit amount
    const amount = near.attachedDeposit();

    // Update the sender's balance
    const currentBalance = this.balances.get(sender) || 0;
    this.balances.set(sender, currentBalance + Number(amount));
  }

  // Withdraw function
  @call({}) // This method changes the state, for which it cost gas
  withdraw(amount: number): NearPromise {
    // Get the sender's account ID
    const sender = near.predecessorAccountId();

    // Check if the sender has enough balance
    const currentBalance = this.balances.get(sender) || 0;
    if (currentBalance < amount) {
      throw new Error('Insufficient balance');
    }

    // Update the sender's balance
    this.balances.set(sender, currentBalance - amount);

    // Transfer the amount to the sender
    return NearPromise.new(sender).transfer(BigInt(amount));
  }

  // Allocate funds function
  @call({}) // This method changes the state, for which it cost gas
  allocateFunds(protocol: string, amount: number): void {
    // Get the sender's account ID
    const sender = near.predecessorAccountId();

    // Check if the sender has enough balance
    const currentBalance = this.balances.get(sender) || 0;
    if (currentBalance < amount) {
      throw new Error('Insufficient balance');
    }

    // Update the sender's balance
    this.balances.set(sender, currentBalance - amount);

    // Call the bridge contract to invest in the protocol
    // ( implementation of the bridge contract is not shown here )
  }

  // Harvest yield function
  @call({}) // This method changes the state, for which it cost gas
  harvestYield(): void {
    // Call the bridge contract to harvest yield
    // ( implementation of the bridge contract is not shown here )

    // Update the user's balance with the harvested yield
  }

  // Adjust risk level function
  @call({}) // This method changes the state, for which it cost gas
  adjustRiskLevel(level: number): void {
    // Get the sender's account ID
    const sender = near.predecessorAccountId();

    // Update the sender's risk level
    this.riskLevels.set(sender, level);
  }

  // Propose allocation function
  @call({}) // This method changes the state, for which it cost gas
  proposeAllocation(protocol: string, amount: number, riskLevel: number): void {
    // Get the sender's account ID
    const sender = near.predecessorAccountId();

    // Create a new proposal
    const proposalId = uuidv4();
    const proposal: Proposal = {
      protocol,
      amount,
      riskLevel,
      status: 'Pending',
      userId: ''
    };
    this.proposals.set(proposalId, proposal);
  

    // Save the proposal to the contract
  }

  // Confirm allocation function
  @call({}) // This method changes the state, for which it cost gas
  confirmAllocation(userId: string, proposalId: string): void {
    // Get the proposal
    const proposal = this.proposals.get(proposalId);

    // Check if the proposal exists and is pending
    if (!proposal || proposal.status !== 'Pending') {
      throw new Error('Invalid proposal');
    }

    // Check if the user is the owner of the proposal
    if (proposal.userId !== userId) {
      throw new Error('Invalid user');
    }

    // Update the proposal status to 'Confirmed'
    proposal.status = 'Confirmed';

    // Call the execute allocation function
    this.executeAllocation(userId, proposalId);
  }

    // Reject allocation function
    @call({}) // This method changes the state, for which it cost gas
    rejectAllocation(userId: string, proposalId: string): void {
      // Get the proposal
      const proposal = this.proposals.get(proposalId);
  
      // Check if the proposal exists and is pending
      if (!proposal || proposal.status !== 'Pending') {
        throw new Error('Invalid proposal');
      }
  
      // Check if the user is the owner of the proposal
      if (proposal.userId !== userId) {
        throw new Error('Invalid user');
      }
  
      // Update the proposal status to 'Rejected'
      proposal.status = 'Rejected';
    }
  
    // Execute allocation function
    @call({}) // This method changes the state, for which it cost gas
    executeAllocation(userId: string, proposalId: string): void {
      // Get the proposal
      const proposal = this.proposals.get(proposalId);
  
      // Check if the proposal exists and is confirmed
      if (!proposal || proposal.status !== 'Confirmed') {
        throw new Error('Invalid proposal');
      }
  
      // Call the bridge contract to invest in the protocol
      // ( implementation of the bridge contract is not shown here )
    }
  }
  
  interface Proposal {
    protocol: string;
    amount: number;
    riskLevel: number;
    status: 'Pending' | 'Confirmed' | 'Rejected';
    userId: string;
  }

