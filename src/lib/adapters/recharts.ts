import type { Outputs } from "@/lib/domain/schema";

export function toRechartsEquity(o: Outputs) {
  return o.equityTimeline.map(d => ({
    year: d.year,
    value: d.value,
    min: d.min,
    max: d.max,
  }));
}

export function toRechartsCashflow(o: Outputs) {
  return o.cashflowByMonth.map(d => ({
    month: d.yyyymm,
    mortgage: d.mortgage,
    boxSpread: d.boxSpread,
    net: d.net,
  }));
}

export function toRechartsMonthlyBreakdown(o: Outputs) {
  return [
    { name: "Mortgage interest", value: o.monthlyPaymentBreakdown.bankMortgageInterest },
    { name: "Property tax", value: o.monthlyPaymentBreakdown.propertyTax },
    { name: "Home insurance", value: o.monthlyPaymentBreakdown.insurance },
    { name: "HOA", value: o.monthlyPaymentBreakdown.hoa },
    { name: "Box spread (monthly eq.)", value: o.monthlyPaymentBreakdown.boxSpreadInterest },
  ];
}
