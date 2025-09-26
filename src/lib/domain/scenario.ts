export type Scenario = 'scenario-1' | 'scenario-2' | 'scenario-3';

/**
 * Apply scenario selection and derived allocations + combined rate.
 * This is a pure function. It does NOT mutate the input; it returns a new object.
 */
export function applyScenarioAndRates<T extends {
  homeValue: number;
  downPayment: number;
  portfolioAmount: number;
  portfolioAmountUsed: number;
  downPaymentFromBoxSpread: number;
  downPaymentFromCash: number;
  mortgageFromBoxSpread: number;
  mortgageFromBankLoan: number;
  boxSpreadInterestRate: number;
  bankMortgageInterestRate: number;
}>(data: T & { scenario?: Scenario }): (T & {
  scenario: Scenario;
  includeInterestCost: boolean;
  combinedInterestRate: number;
  downPaymentFromBoxSpread: number;
  downPaymentFromCash: number;
  mortgageFromBoxSpread: number;
  mortgageFromBankLoan: number;
}) {
  const d = { ...data };

  // Scenario selection
  const used = d.portfolioAmountUsed;
  if (used <= d.downPayment) {
    d.scenario = 'scenario-1';
  } else if (used > d.downPayment && used < d.homeValue) {
    d.scenario = 'scenario-2';
  } else {
    d.scenario = 'scenario-3';
  }

  // Allocations per scenario
  if (d.scenario === 'scenario-1') {
    // Portfolio ≤ down payment
    d.downPaymentFromBoxSpread = used;
    d.downPaymentFromCash = Math.max(0, d.downPayment - used);
    d.mortgageFromBankLoan = Math.max(0, d.homeValue - d.downPayment);
    d.mortgageFromBoxSpread = 0;
  } else if (d.scenario === 'scenario-2') {
    // Portfolio > down payment but < home value
    d.downPaymentFromBoxSpread = d.downPayment;
    d.mortgageFromBoxSpread = Math.max(0, used - d.downPayment);
    d.mortgageFromBankLoan = Math.max(0, d.homeValue - d.downPaymentFromBoxSpread - d.mortgageFromBoxSpread);
    d.downPaymentFromCash = 0;
  } else {
    // Scenario 3: Portfolio ≥ home value
    d.downPaymentFromBoxSpread = d.downPayment;
    d.mortgageFromBoxSpread = Math.max(0, d.homeValue - d.downPayment);
    d.mortgageFromBankLoan = 0;
    d.downPaymentFromCash = 0;
  }

  // Interest-cost toggle
  d.includeInterestCost = d.portfolioAmountUsed > 0;

  // Weighted combined interest rate across entire property value
  const home = d.homeValue || 1;
  const boxPortion = (d.downPaymentFromBoxSpread + d.mortgageFromBoxSpread) / home;
  const bankPortion = d.mortgageFromBankLoan / home;
  d.combinedInterestRate = (boxPortion * d.boxSpreadInterestRate) + (bankPortion * d.bankMortgageInterestRate);

  return d;
}
