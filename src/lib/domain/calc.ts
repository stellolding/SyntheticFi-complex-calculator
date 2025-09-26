import type { Inputs, Outputs } from "./schema";

function pmtMonthly(principal: number, annualRate: number, years: number): number {
  if (principal <= 0) return 0;
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 12;
  const n = years * 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function compute(i: Inputs): Outputs {
  // Determine principal from inputs
  const principal = Math.max(0, (i.mortgageFromBankLoan + i.mortgageFromBoxSpread));

  // Base monthly mortgage (bank loan side only; box-spread is paid yearly)
  const bankMonthly = pmtMonthly(i.mortgageFromBankLoan, i.bankMortgageInterestRate, i.loanTermYears);

  // Monthlyized costs for display
  const propertyTaxMonthly = i.propertyTaxPerYear / 12;
  const insuranceMonthly = i.homeownersInsurancePerYear / 12;
  const hoaMonthly = i.hoaFeePerMonth;

  // Box spread: treat as yearly charge (interest-only for now), but expose a "monthly equivalent" for charts if needed
  const yearlyBoxInterest = i.downPaymentFromBoxSpread * i.boxSpreadInterestRate;
  const monthlyBoxEquivalent = yearlyBoxInterest / 12;

  const requiredMonthlyPayment = bankMonthly + propertyTaxMonthly + insuranceMonthly + hoaMonthly;

  // Five-year accumulation (kept as a domain output instead of inline in UI)
  const fiveYearAccumulatedBoxInterest = yearlyBoxInterest * 5;

  // Equity/appreciation banding
  const equityTimeline = Array.from({ length: i.loanTermYears + 1 }, (_, k) => {
    const year = i.startYear + k;
    const baseRate = (k <= i.fixedYears) ? i.appreciationBase : i.appreciationBase;
    const minRate = (k <= i.fixedYears) ? i.appreciationBase : i.appreciationBase - i.appreciationBand;
    const maxRate = (k <= i.fixedYears) ? i.appreciationBase : i.appreciationBase + i.appreciationBand;
    const value = i.homeValue * Math.pow(1 + baseRate, k);
    const min = i.homeValue * Math.pow(1 + minRate, k);
    const max = i.homeValue * Math.pow(1 + maxRate, k);
    return { year, value, min, max };
  });

  // Monthly cashflow: bank mortgage monthly; box spread once per year in December
  const cashflowByMonth = Array.from({ length: i.loanTermYears * 12 }, (_, idx) => {
    const year = i.startYear + Math.floor(idx / 12);
    const month = (idx % 12) + 1;
    const isBoxMonth = month === 12;
    const box = isBoxMonth ? yearlyBoxInterest : 0;
    const mort = bankMonthly;
    return {
      yyyymm: `${year}-${String(month).padStart(2, "0")}`,
      mortgage: mort,
      boxSpread: box,
      net: mort + box,
    };
  });

  const totalMortgage = cashflowByMonth.reduce((s, m) => s + m.mortgage, 0);
  const totalBox = cashflowByMonth.reduce((s, m) => s + m.boxSpread, 0);

  return {
    monthlyPaymentBreakdown: {
      bankMortgageInterest: bankMonthly,
      propertyTax: propertyTaxMonthly,
      insurance: insuranceMonthly,
      hoa: hoaMonthly,
      boxSpreadInterest: monthlyBoxEquivalent,
    },
    requiredMonthlyPayment,
    fiveYearAccumulatedBoxInterest,
    equityTimeline,
    cashflowByMonth,
    totals: { totalMortgage, totalBox, totalNet: totalMortgage + totalBox },
  };
}
