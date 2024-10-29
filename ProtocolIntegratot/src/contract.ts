import { NearBindgen, near, call, view } from 'near-sdk-js';

interface Investment {
  status: InvestmentStatus;
  investmentId: string;
  user_id: string;
  protocol: string;
  amount: string;
  investmentDate: string;
}

interface Proposal {
  user_id: string;
  protocol: string;
  amount: string;
  risk_level: number;
  status: string;
}

export enum InvestmentStatus {
  Deployed,
  // Add other statuses as needed
}

@NearBindgen({})
class ProtocolIntegrator {
  private static investments: Investment[] = [];

  static getUserInvestments({ user_id }: { user_id: string }): Investment[] {
    // Return a list of investments for the given user
    return ProtocolIntegrator.investments.filter(investment => investment.user_id === user_id);
  }
  
  static harvest(arg0: { user_id: string; investmentId: any; }) {
    throw new Error('Method not implemented.');
  }

  private investments: Map<string, Investment> = new Map();
  private proposals: Map<string, Proposal> = new Map();

  //@ts-ignore
  @call({})
  investWithConfirmation({ proposalId }: { proposalId: string }): void {
    const proposal = this.proposals.get(proposalId);
    if (!proposal || proposal.status !== 'Confirmed') {
      throw new Error('Invalid proposal');
    }
  
    // Invest the user's funds in the selected protocol
    const investmentId = this.investments.size.toString();
    const investment: Investment = {
      investmentId,
      user_id: proposal.user_id,
      protocol: proposal.protocol,
      amount: proposal.amount,
      investmentDate: new Date().toISOString(),
      status: InvestmentStatus.Deployed
    };
    this.investments.set(investmentId, investment);
  }

  //@ts-ignore
  @call({})
  withdrawFromProtocol({ user_id, protocol }: { user_id: string; protocol: string }): void {
    // Withdraw the user's funds from the selected protocol
    const investmentsForProtocol = Array.from(this.investments.values())
      .filter((investment) => investment.protocol === protocol && investment.user_id === user_id);
    investmentsForProtocol.forEach((investment) => {
      this.investments.delete(investment.investmentId);
    });
  }
  //@ts-ignore
  @view({})
  getInvestmentStatus({ user_id }: { user_id: string }): Investment[] {
    // Return the current investment status for the user in different protocols
    return Array.from(this.investments.values()).filter((investment) => investment.user_id === user_id);
  }
}