export interface GainDetails {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainDetails;
  ltcg: GainDetails;
}

export interface CapitalGainsType {
  profits: number;
  losses: number;
}

export interface CapitalGainsResponse {
  capitalGains: {
    stcg: CapitalGainsType;
    ltcg: CapitalGainsType;
  };
}
