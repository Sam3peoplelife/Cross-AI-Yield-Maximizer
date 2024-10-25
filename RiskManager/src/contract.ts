import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class RiskManager {
  private riskProfiles: Map<string, RiskProfile> = new Map();

  @call({}) // This method changes the state, for which it cost gas
  setUserRiskProfile({ user_id, risk_level }: { user_id: string, risk_level: number }): void {
    // Validate input parameters
    if (risk_level < 0 || risk_level > 100) {
      throw new Error('Risk level must be between 0 and 100');
    }

    // Set the risk profile for the user
    this.riskProfiles.set(user_id, { user_id, risk_level });
  }

  @view({}) // This method is read-only and can be called for free
  getUserRiskProfile({ user_id }: { user_id: string }): RiskProfile | null {
    // Return the risk profile for the user, or null if not found
    return this.riskProfiles.get(user_id) || null;
  }
/******  09d20619-40a9-4bfb-b754-4bb7f6666c29  *******/
}

interface RiskProfile {
  user_id: string;
  risk_level: number;
}