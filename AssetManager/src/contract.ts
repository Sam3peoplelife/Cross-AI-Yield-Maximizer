import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class AssetManager {
  // In AssetManager contract
  private static proposals: Proposal[] = [];

  static getUserProposals({ user_id }: { user_id: string }): Proposal[] {
    // Return a list of proposals for the given user
    return AssetManager.proposals.filter(proposal => proposal.user_id === user_id);
  }

  static confirmAllocation({ user_id, proposalId }: { user_id: string; proposalId: string }): void {
    // Perform the actual allocation
    const proposal = AssetManager.proposals.find(proposal => proposal.proposalId === proposalId);
    if (proposal) {
      proposal.status = ProposalStatus.Confirmed;
    }
  }

  private proposals: Map<string, Proposal> = new Map();
  private userProposals: Map<string, string[]> = new Map();

  //@ts-ignore
  @call({}) // This method changes the state, for which it cost gas
  proposeAllocation({ user_id, protocol, amount, risk_level }: { user_id: string, protocol: string, amount: string, risk_level: number }): void {
    // Validate input parameters
    if (risk_level < 0 || risk_level > 100) {
      throw new Error('Risk level must be between 0 and 100');
    }

    // Create a new proposal
    const proposalId = this.proposals.size.toString();
    const proposal: Proposal = {
      user_id, protocol, amount, risk_level, status: ProposalStatus.Pending, proposalId
    };
    this.proposals.set(proposalId, proposal);
    this.userProposals.set(user_id, [...(this.userProposals.get(user_id) || []), proposalId]);
  }
  
  //@ts-ignore
  @call({}) // This method changes the state, for which it cost gas
  confirmAllocation({ user_id, proposalId }: { user_id: string, proposalId: string }): void {
    // Validate input parameters
    const proposal = this.proposals.get(proposalId);
    if (!proposal || proposal.user_id !== user_id || proposal.status !== ProposalStatus.Pending) {
      throw new Error('Invalid proposal');
    }

    // Confirm the proposal
    proposal.status = ProposalStatus.Confirmed;
    this.proposals.set(proposalId, proposal);
  }
  
  //@ts-ignore
  @call({}) // This method changes the state, for which it cost gas
  rejectAllocation({ user_id, proposalId }: { user_id: string, proposalId: string }): void {
    // Validate input parameters
    const proposal = this.proposals.get(proposalId);
    if (!proposal || proposal.user_id !== user_id || proposal.status !== ProposalStatus.Pending) {
      throw new Error('Invalid proposal');
    }

    // Reject the proposal
    proposal.status = ProposalStatus.Rejected;
    this.proposals.set(proposalId, proposal);
  }

  //@ts-ignore
  @view({}) // This method is read-only and can be called for free
  getUserProposals({ user_id }: { user_id: string }): Proposal[] {
    // Return the proposals for the user
    const proposals = this.userProposals.get(user_id) || [];
    return proposals.map(proposalId => this.proposals.get(proposalId));
  }
}

interface Proposal {
  proposalId: string;
  user_id: string;
  protocol: string;
  amount: string;
  risk_level: number;
  status: ProposalStatus;
}

export enum ProposalStatus {
  Pending,
  Confirmed,
  Rejected,
}