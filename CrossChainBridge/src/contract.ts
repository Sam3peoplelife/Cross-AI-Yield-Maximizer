import { NearBindgen, near, call, view } from 'near-sdk-js';

interface BridgeTransfer {
  user_id: string;
  source_chain: string;
  destination_chain: string;
  amount: string;
  protocol: string;
  status: string;
}

interface Proposal {
  user_id: string;
  protocol: string;
  amount: string;
  risk_level: number;
  status: string;
}

@NearBindgen({})
class CrossChainBridge {
  private bridgeTransfers: Map<string, BridgeTransfer> = new Map();
  private proposals: Map<string, Proposal> = new Map();

  //@ts-ignore
  @call({})
  bridgeTransfer({ user_id, protocol, amount, proposalId }: { user_id: string; protocol: string; amount: string; proposalId: string }): void {
    const proposal = this.proposals.get(proposalId);
    if (!proposal || proposal.status !== 'Confirmed') {
      throw new Error('Invalid proposal');
    }

    // Check if the proposal is confirmed
    const proposalStatus = this.checkProposalStatus({ proposalId });
    if (proposalStatus !== 'Confirmed') {
      throw new Error('Proposal is not confirmed');
    }

    // Perform the bridge transfer
    const bridgeTransferId = this.bridgeTransfers.size.toString();
    const bridgeTransfer: BridgeTransfer = {
      user_id,
      source_chain: 'near',
      destination_chain: 'ethereum',
      amount,
      protocol,
      status: 'Pending',
    };
    this.bridgeTransfers.set(bridgeTransferId, bridgeTransfer);

    // Update the proposal status
    proposal.status = 'Invested';
    this.proposals.set(proposalId, proposal);
  }

  //@ts-ignore
  @view({})
  checkProposalStatus({ proposalId }: { proposalId: string }): string {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      return 'Invalid proposal';
    }

    return proposal.status;
  }

  //@ts-ignore
  @view({})
  getBridgeStatus({ transactionId }: { transactionId: string }): string {
    const bridgeTransfer = this.bridgeTransfers.get(transactionId);
    if (!bridgeTransfer) {
      return 'Invalid transaction';
    }

    return bridgeTransfer.status;
  }
}