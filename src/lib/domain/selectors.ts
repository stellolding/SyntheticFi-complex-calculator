import type { Outputs } from "./schema";

export function selectMonthlyBarSeries(o: Outputs) {
  // required monthly (excludes yearly box charge), and a stacked option with box monthly-equivalent for visuals
  const required = o.requiredMonthlyPayment;
  const withBoxEquivalent = required + o.monthlyPaymentBreakdown.boxSpreadInterest;
  return { required, withBoxEquivalent };
}
