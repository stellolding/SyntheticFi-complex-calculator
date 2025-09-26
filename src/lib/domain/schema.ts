import { z } from "zod";

export const Inputs = z.object({
  homeValue: z.number().nonnegative(),
  downPayment: z.number().nonnegative(),
  downPaymentPercent: z.number().nonnegative(),
  portfolioAmount: z.number().nonnegative(),
  portfolioAmountUsed: z.number().nonnegative(),
  portfolioUsedPercent: z.number().nonnegative(),
  scenario: z.enum(['scenario-1', 'scenario-2', 'scenario-3']).default('scenario-1'),
  downPaymentFromBoxSpread: z.number().nonnegative(),
  downPaymentFromCash: z.number().nonnegative(),
  mortgageFromBoxSpread: z.number().nonnegative(),
  mortgageFromBankLoan: z.number().nonnegative(),
  portfolioReturnRate: z.number().min(0),
  boxSpreadInterestRate: z.number().min(0),
  bankMortgageInterestRate: z.number().min(0),
  combinedInterestRate: z.number().min(0).optional(),
  loanTermYears: z.number().int().min(1).max(40),
  propertyTaxPerYear: z.number().nonnegative(),
  homeownersInsurancePerYear: z.number().nonnegative(),
  hoaFeePerMonth: z.number().nonnegative(),
  appreciationBase: z.number().default(0.05),
  appreciationBand: z.number().default(0.03),
  fixedYears: z.number().int().min(0).default(5),
  startYear: z.number().int().min(2000).default(new Date().getFullYear())
});

export type Inputs = z.infer<typeof Inputs>;

export type EquityPoint = { year: number; value: number; min: number; max: number };
export type CashflowPoint = { yyyymm: string; mortgage: number; boxSpread: number; net: number };

export type Outputs = {
  monthlyPaymentBreakdown: {
    bankMortgageInterest: number;
    propertyTax: number;
    insurance: number;
    hoa: number;
    boxSpreadInterest: number; // monthly equivalent of yearly box spread (for visualization only)
  };
  requiredMonthlyPayment: number;
  fiveYearAccumulatedBoxInterest: number;
  equityTimeline: EquityPoint[];
  cashflowByMonth: CashflowPoint[];
  totals: {
    totalMortgage: number;
    totalBox: number;
    totalNet: number;
  };
};
