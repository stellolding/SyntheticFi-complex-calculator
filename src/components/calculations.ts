export interface MortgageData {
  homeValue: number;
  downPayment: number;
  downPaymentPercent: number;
  portfolioAmount: number;
  portfolioAmountUsed: number;
  portfolioUsedPercent: number;
  scenario: 'scenario-1' | 'scenario-2' | 'scenario-3';
  downPaymentFromBoxSpread: number;
  downPaymentFromCash: number;
  mortgageFromBoxSpread: number;
  mortgageFromBankLoan: number;
  portfolioReturnRate: number;
  federalIncomeTaxBracket: number;
  boxSpreadInterestRate: number;
  bankMortgageInterestRate: number;
  combinedInterestRate: number;
  loanTermYears: number;
  propertyTaxPerYear: number;
  homeownersInsurancePerYear: number;
  hoaFeePerMonth: number;
  includeInterestCost: boolean;
}

export interface CalculatedData {
  netSavings: {
    chartData: { year: number; value: number; breakdown: {
      netInvestmentEarnings: number;
      investmentGains: number;
      interestCost: number;
      interestSavings: number;
      taxSavings: number;
      taxBenefits: number;
      totalBenefit: number;
    } }[];
    breakdown: {
      netInvestmentEarnings: number;
      investmentGains: number;
      interestCost: number;
      interestSavings: number;
      taxSavings: number;
      taxBenefits: number;
      totalBenefit: number;
    };
  };
  monthlyPayment: {
    chartData: { name: string; value: number; color: string }[];
    breakdown: {
      boxSpreadInterest: number;
      bankMortgageInterest: number;
      propertyTax: number;
      insurance: number;
      hoa: number;
      total: number;
    };
  };
  totalNetSavingsSaved: number;
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal === 0 || annualRate === 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateMortgageMetrics(data: MortgageData): CalculatedData {
  const {
    portfolioReturnRate,
    boxSpreadInterestRate,
    bankMortgageInterestRate,
    loanTermYears,
    downPaymentFromBoxSpread,
    mortgageFromBankLoan,
    mortgageFromBoxSpread,
    propertyTaxPerYear,
    homeownersInsurancePerYear,
    hoaFeePerMonth,
    portfolioAmount,
    portfolioAmountUsed,
    includeInterestCost
  } = data;

  // Calculate monthly payments
  const bankMortgageMonthly = calculateMonthlyPayment(
    mortgageFromBankLoan, 
    bankMortgageInterestRate, 
    loanTermYears
  );
  
  const boxSpreadMonthly = calculateMonthlyPayment(
    downPaymentFromBoxSpread + mortgageFromBoxSpread, 
    boxSpreadInterestRate, 
    loanTermYears
  );

  const propertyTaxMonthly = propertyTaxPerYear / 12;
  const insuranceMonthly = homeownersInsurancePerYear / 12;

  // Calculate breakdown values first for consistency
  const totalPortfolioGains = portfolioAmountUsed * (portfolioReturnRate / 100) * loanTermYears;
  
  // Calculate actual total interest costs over loan term for box spread borrowing
  // This uses the proper amortization formula, not simple interest
  // Interest cost should be included whenever there's box spread borrowing
  const boxSpreadPrincipal = downPaymentFromBoxSpread + mortgageFromBoxSpread;
  const totalBoxSpreadCosts = boxSpreadPrincipal > 0 ? 
    (boxSpreadMonthly * loanTermYears * 12) - boxSpreadPrincipal : 0;
  
  // Interest cost only includes box spread costs for net savings comparison
  const interestCostForComparison = totalBoxSpreadCosts;
  
  // Interest savings from using box spread rates instead of bank rates for mortgage portion
  // Only applies when portfolio amount > down payment (when mortgageFromBoxSpread > 0)
  const interestSavings = mortgageFromBoxSpread > 0 ? 
    mortgageFromBoxSpread * ((bankMortgageInterestRate - boxSpreadInterestRate) / 100) * loanTermYears : 0;
  
  // Tax savings = 15% × Portfolio amount used to borrow
  const taxSavings = portfolioAmountUsed * 0.15;
  
  // Tax benefits (additional benefits for scenarios 2 and 3)
  const taxBenefits = (data.scenario === 'scenario-2' || data.scenario === 'scenario-3') ? 
    portfolioAmountUsed * 0.05 : 0;
  
  // Net investment earnings = Investment gains - Interest cost
  const netInvestmentEarnings = totalPortfolioGains - interestCostForComparison;
  
  // Total benefit = Net investment earnings + Tax savings + Interest savings + Tax benefits
  const totalBenefit = netInvestmentEarnings + taxSavings + interestSavings + taxBenefits;
  
  const totalNetSavings = totalBenefit;

  // Net savings calculations over time using compound interest formula
  const chartData: { year: number; value: number; breakdown: {
    netInvestmentEarnings: number;
    investmentGains: number;
    interestCost: number;
    interestSavings: number;
    taxSavings: number;
    taxBenefits: number;
    totalBenefit: number;
  } }[] = [];

  for (let year = 1; year <= 30; year++) {
    const actualYear = 2024 + year; // Start from 2025
    
    // Calculate compound investment growth: FV = P × (1+r)^t
    const portfolioValue = portfolioAmountUsed * Math.pow(1 + (portfolioReturnRate / 100), year);
    const yearlyInvestmentGains = portfolioValue - portfolioAmountUsed;
    
    // Interest cost for this year (accumulated box spread costs for comparison)
    const boxSpreadPrincipal = downPaymentFromBoxSpread + mortgageFromBoxSpread;
    const yearlyInterestCost = boxSpreadPrincipal > 0 ? 
      ((boxSpreadMonthly * year * 12) - boxSpreadPrincipal) * (year / loanTermYears) : 0;
    
    // Interest savings for this year (accumulated savings from box spread vs bank rates)
    const yearlyInterestSavings = mortgageFromBoxSpread > 0 ? 
      mortgageFromBoxSpread * ((bankMortgageInterestRate - boxSpreadInterestRate) / 100) * year : 0;
    
    // Net investment earnings = Investment gains - Interest cost
    const yearlyNetInvestmentEarnings = yearlyInvestmentGains - yearlyInterestCost;
    
    // Total benefit = Net investment earnings + Tax savings + Interest savings + Tax benefits
    const yearlyTotalBenefit = yearlyNetInvestmentEarnings + taxSavings + yearlyInterestSavings + taxBenefits;
    
    chartData.push({ 
      year: actualYear, 
      value: yearlyTotalBenefit,
      breakdown: {
        netInvestmentEarnings: yearlyNetInvestmentEarnings,
        investmentGains: yearlyInvestmentGains,
        interestCost: yearlyInterestCost,
        interestSavings: yearlyInterestSavings,
        taxSavings: taxSavings,
        taxBenefits: taxBenefits,
        totalBenefit: yearlyTotalBenefit
      }
    });
  }

  const monthlyPaymentBreakdown = {
    boxSpreadInterest: boxSpreadMonthly,
    bankMortgageInterest: bankMortgageMonthly,
    propertyTax: propertyTaxMonthly,
    insurance: insuranceMonthly,
    hoa: hoaFeePerMonth,
    total: boxSpreadMonthly + bankMortgageMonthly + propertyTaxMonthly + insuranceMonthly + hoaFeePerMonth
  };

  const monthlyChartData = [
    { 
      name: 'Box spread interest', 
      value: boxSpreadMonthly, 
      color: '#0392F1' 
    },
    { 
      name: 'Mortgage interest', 
      value: bankMortgageMonthly, 
      color: '#4ECDC4' 
    },
    { 
      name: 'Property tax', 
      value: propertyTaxMonthly, 
      color: '#FFA726' 
    },
    { 
      name: 'Home insurance', 
      value: insuranceMonthly, 
      color: '#FF7043' 
    },
    { 
      name: 'HOA', 
      value: hoaFeePerMonth, 
      color: '#42A5F5' 
    }
  ].filter(item => item.value > 0);

  return {
    netSavings: {
      chartData,
      breakdown: {
        netInvestmentEarnings: netInvestmentEarnings,
        investmentGains: totalPortfolioGains,
        interestCost: interestCostForComparison,
        interestSavings: interestSavings,
        taxSavings,
        taxBenefits,
        totalBenefit: totalBenefit
      }
    },
    monthlyPayment: {
      chartData: monthlyChartData,
      breakdown: monthlyPaymentBreakdown
    },
    totalNetSavingsSaved: totalNetSavings
  };
}