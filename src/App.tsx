import React, { useState, useRef, useEffect } from 'react';

import { InputForm } from './components/InputForm';
import { OutputTabs } from './components/OutputTabs';
import { MortgageData, calculateMortgageMetrics } from './components/calculations';
import { Share2, Link, FileText, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function App() {
  const initialData: MortgageData = {
    homeValue: 1000000,
    downPayment: 200000, // 20% of home value
    downPaymentPercent: 20,
    portfolioAmount: 700000,
    portfolioAmountUsed: 350000,
    portfolioUsedPercent: 35,
    scenario: 'scenario-2', // Since portfolioAmountUsed > downPayment but < homeValue
    downPaymentFromBoxSpread: 200000, // Capped at downPayment amount
    downPaymentFromCash: 0,
    mortgageFromBoxSpread: 150000, // Remaining amount from portfolio
    mortgageFromBankLoan: 650000, // homeValue - downPaymentFromBoxSpread - mortgageFromBoxSpread
    portfolioReturnRate: 6,
    federalIncomeTaxBracket: 32,
    boxSpreadInterestRate: 4,
    bankMortgageInterestRate: 7,
    combinedInterestRate: 5.95, // Calculated: (0.35 × 4%) + (0.65 × 7%) = 5.95%
    loanTermYears: 30,
    propertyTaxPerYear: 15000,
    homeownersInsurancePerYear: 2000,
    hoaFeePerMonth: 0,
    includeInterestCost: true, // Since portfolioAmountUsed > 0
  };

  const [mortgageData, setMortgageData] = useState<MortgageData>(initialData);
  const [lastAppliedData, setLastAppliedData] = useState<MortgageData>(initialData);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const [calculatedData, setCalculatedData] = useState(() => 
    calculateMortgageMetrics(mortgageData)
  );

  // Check if current data differs from last applied data
  const hasChanges = JSON.stringify(mortgageData) !== JSON.stringify(lastAppliedData);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUpdate = () => {
    const newCalculatedData = calculateMortgageMetrics(mortgageData);
    setCalculatedData(newCalculatedData);
    setLastAppliedData({ ...mortgageData }); // Update last applied state
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(window.location.href);
      setShowShareDropdown(false);
    } catch (err) {
      // Fallback for when clipboard API is blocked
      try {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setShowShareDropdown(false);
      } catch (fallbackErr) {
        console.error('Failed to copy link with fallback:', fallbackErr);
        // Could show an alert or toast here
        alert('Unable to copy link. Please copy the URL manually from your browser.');
        setShowShareDropdown(false);
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => `${value}%`;
  const formatPercentFixed = (value: number, digits: number = 2) => `${value.toFixed(digits)}%`;

  const handleExportPDF = async () => {
    setShowShareDropdown(false);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 35, 58); // #00233A
      pdf.text('Loan Calculator Report', margin, yPosition);
      yPosition += 15;

      // Date
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 20;

      // Input Summary
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 35, 58);
      pdf.text('Input Summary', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(50, 50, 50);

      const inputData = [
        ['Home Purchase Price', formatCurrency(mortgageData.homeValue)],
        ['Down Payment', `${formatCurrency(mortgageData.downPayment)} (${mortgageData.downPaymentPercent}%)`],
        ['Portfolio Value', formatCurrency(mortgageData.portfolioAmount)],
        ['Portfolio Used for Box Spread', `${formatCurrency(mortgageData.portfolioAmountUsed)} (${mortgageData.portfolioUsedPercent}%)`],
        ['Box Spread Interest Rate', formatPercent(mortgageData.boxSpreadInterestRate)],
        ['Bank Mortgage Interest Rate', formatPercent(mortgageData.bankMortgageInterestRate)],
        ['Combined Interest Rate', formatPercentFixed(mortgageData.combinedInterestRate, 2)],
        ['Loan Term', `${mortgageData.loanTermYears} years`],
      ];

      inputData.forEach(([label, value]) => {
        pdf.text(`${label}:`, margin, yPosition);
        pdf.text(value, margin + 80, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Results Summary
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 35, 58);
      pdf.text('Results Summary', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');

      const resultsData = [
        ['Total Net Savings (30 years)', formatCurrency(calculatedData.totalNetSavingsSaved)],
        ['Total Monthly Payment', formatCurrency(calculatedData.monthlyPayment.breakdown.total)],
        ['Box Spread Interest (Monthly)', formatCurrency(calculatedData.monthlyPayment.breakdown.boxSpreadInterest)],
        ['Bank Mortgage Interest (Monthly)', formatCurrency(calculatedData.monthlyPayment.breakdown.bankMortgageInterest)],
        ['Property Tax (Monthly)', formatCurrency(calculatedData.monthlyPayment.breakdown.propertyTax)],
        ['Home Insurance (Monthly)', formatCurrency(calculatedData.monthlyPayment.breakdown.insurance)],
      ];

      if (calculatedData.monthlyPayment.breakdown.hoa > 0) {
        resultsData.push(['HOA Fee (Monthly)', formatCurrency(calculatedData.monthlyPayment.breakdown.hoa)]);
      }

      resultsData.forEach(([label, value]) => {
        pdf.text(`${label}:`, margin, yPosition);
        pdf.text(value, margin + 80, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Net Savings Breakdown
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 35, 58);
      pdf.text('Net Savings Breakdown (30 Years)', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');

      const breakdown = calculatedData.netSavings.breakdown;
      const breakdownData = [
        ['Investment Gains', formatCurrency(breakdown.investmentGains)],
        ['Interest Cost', `-${formatCurrency(breakdown.interestCost)}`],
        ['Net Investment Earnings', formatCurrency(breakdown.netInvestmentEarnings)],
        ['Tax Savings', formatCurrency(breakdown.taxSavings)],
      ];

      if (breakdown.interestSavings > 0) {
        breakdownData.push(['Interest Savings', formatCurrency(breakdown.interestSavings)]);
      }

      if (breakdown.taxBenefits > 0) {
        breakdownData.push(['Tax Benefits', formatCurrency(breakdown.taxBenefits)]);
      }

      breakdownData.push(['Total Benefit', formatCurrency(breakdown.totalBenefit)]);

      breakdownData.forEach(([label, value]) => {
        pdf.text(`${label}:`, margin, yPosition);
        pdf.text(value, margin + 80, yPosition);
        yPosition += 6;
      });

      // Add footer
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Generated by Loan Calculator - Box Spread Mortgage Analysis', margin, 280);

      // Save the PDF
      pdf.save('loan-calculator-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-white"
    >
      {/* Header */}
      <div className="px-8 pt-[42px] pr-[28px] pb-[28px] pl-[28px] relative">
        <h1 className="mb-1" style={{ color: '#0B1B2B' }}>
          Loan calculator
        </h1>
        {/* Subtitle removed per request */}
        
        {/* Share Button */}
        <div className="absolute top-[42px] right-[28px]" ref={dropdownRef}>
          <button
            onClick={() => setShowShareDropdown(!showShareDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            style={{ color: '#00233A', borderColor: '#E5E7EB' }}
          >
            <Share2 size={20} />
            <span className="font-medium">Share</span>
            <ChevronDown size={16} className={`transition-transform ${showShareDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown */}
          {showShareDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50" style={{ borderColor: '#E5E7EB' }}>
              <div className="py-2">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                  style={{ color: '#0B1B2B' }}
                >
                  <Link size={16} />
                  <span>Copy link</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                  style={{ color: '#0B1B2B' }}
                >
                  <FileText size={16} />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 px-8 pb-8 items-stretch">
        {/* Left Sidebar - Input Form */}
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <InputForm 
            data={mortgageData} 
            onChange={setMortgageData}
            onUpdate={handleUpdate}
            hasChanges={hasChanges}
          />
        </div>

        {/* Right Side - Output Tabs with left border */}
        <div className="w-full lg:w-2/3 min-w-0 lg:border-l-2 lg:border-solid lg:border-gray-300 lg:pl-8 mt-8 lg:mt-0">
          <OutputTabs data={calculatedData} scenario={mortgageData.scenario} baseData={mortgageData} />
        </div>
      </div>
    </div>
  );
}
