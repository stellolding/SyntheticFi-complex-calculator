import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MortgageData } from './calculations';
import { applyScenarioAndRates } from '../lib/domain/scenario';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface InputFormProps {
  data: MortgageData;
  onChange: (data: MortgageData) => void;
  onUpdate: () => void;
  hasChanges: boolean;
}

export function InputForm({ data, onChange, onUpdate, hasChanges }: InputFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [boxRateError, setBoxRateError] = useState<string | null>(null);
  const [bankRateError, setBankRateError] = useState<string | null>(null);
  const [returnRateError, setReturnRateError] = useState<string | null>(null);

  const updateField = (field: keyof MortgageData, value: number | string) => {
    const newData = { ...data, [field]: value };
    
    // Auto-calculate dependent fields
    if (field === 'homeValue') {
      // When home value changes, keep down payment at 20%
      newData.downPayment = (newData.homeValue * 20) / 100;
      newData.downPaymentPercent = 20;
    }
    if (field === 'downPaymentPercent') {
      newData.downPayment = (newData.homeValue * newData.downPaymentPercent) / 100;
    }
    if (field === 'downPayment') {
      newData.downPaymentPercent = (newData.downPayment / newData.homeValue) * 100;
    }
    if (field === 'portfolioAmount' || field === 'portfolioUsedPercent') {
      newData.portfolioAmountUsed = (newData.portfolioAmount * newData.portfolioUsedPercent) / 100;
    }
    if (field === 'portfolioAmountUsed') {
      newData.portfolioUsedPercent = (newData.portfolioAmountUsed / newData.portfolioAmount) * 100;
    }

    // scenario + derived fields moved to domain layer
{
  const patched = applyScenarioAndRates(newData as any);
  Object.assign(newData, patched);
}
onChange(newData);
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

  const normalizePercentInput = (raw: string) => {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    if (cleaned === '') return 0;
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const makePercentKeyDownHandler = (
    field: keyof MortgageData,
    setError?: (msg: string | null) => void,
  ) => (e: any) => {
    if (e.key === 'Backspace') {
      const value: string = e.currentTarget.value ?? '';
      if (value.endsWith('%')) {
        e.preventDefault();
        const digits = value.slice(0, -1);
        const newDigits = digits.slice(0, -1);
        const numeric = newDigits === '' ? 0 : (parseFloat(newDigits) || 0);
        if (setError) {
          if (numeric > 100) setError('Enter an interest rate below 100%');
          else setError(null);
        }
        updateField(field, numeric);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Fields */}
      <div className="space-y-6">
        <h5 className="mb-6" style={{ color: '#00233A' }}>Home & portfolio details</h5>
        
        <div className="relative">
          <Input
            type="text"
            value={formatCurrency(data.homeValue)}
            onChange={(e) => {
              const value = parseFloat(e.target.value.replace(/[$,]/g, '')) || 0;
              updateField('homeValue', value);
            }}
            className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
          />
          <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
            Home purchase price
          </Label>
        </div>

        <div className="flex">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={formatCurrency(data.downPayment)}
              onChange={(e) => {
                const value = parseFloat(e.target.value.replace(/[$,]/g, '')) || 0;
                updateField('downPayment', value);
              }}
              className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-l-lg rounded-r-none border-r-0"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
              Down payment
            </Label>
          </div>
          <div className="w-24 relative">
            <Input
              type="text"
              value={formatPercent(data.downPaymentPercent)}
              onChange={(e) => {
                const value = parseFloat(e.target.value.replace('%', '')) || 0;
                updateField('downPaymentPercent', value);
              }}
              className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-r-lg rounded-l-none"
            />
          </div>
        </div>

        <div className="relative">
          <Input
            type="text"
            value={formatCurrency(data.portfolioAmount)}
            onChange={(e) => {
              const value = parseFloat(e.target.value.replace(/[$,]/g, '')) || 0;
              updateField('portfolioAmount', value);
            }}
            className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
          />
          <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
            Portfolio value
          </Label>
        </div>

        <div className="flex">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={formatCurrency(data.portfolioAmountUsed)}
              onChange={(e) => {
                const value = parseFloat(e.target.value.replace(/[$,]/g, '')) || 0;
                updateField('portfolioAmountUsed', value);
              }}
              className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-l-lg rounded-r-none border-r-0"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
              Portfolio used for box spread
            </Label>
          </div>
          <div className="w-24 relative">
            <Input
              type="text"
              value={formatPercent(data.portfolioUsedPercent)}
              onChange={(e) => {
                const value = parseFloat(e.target.value.replace('%', '')) || 0;
                updateField('portfolioUsedPercent', value);
              }}
              className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-r-lg rounded-l-none"
            />
          </div>
        </div>

        {/* Warning banner for high portfolio percentage */}
        {data.portfolioUsedPercent > 35 && (
          <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFF3CD' }}>
            <p className="text-sm text-gray-800 leading-relaxed">
              ⚠️ If you borrow {data.portfolioUsedPercent}% of your portfolio with a box spread, your account may face a margin call if the portfolio value drops more than {Math.max(0, 100 - data.portfolioUsedPercent - 10)}%.
            </p>
          </div>
        )}
      </div>



      {/* Loan details header */}
      <h5 className="mb-6" style={{ color: '#00233A' }}>Loan details</h5>

      {/* Scenario-specific fields */}
      {data.scenario === 'scenario-1' ? (
        // Scenario 1: Portfolio ≤ down payment
        <div className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              value={formatCurrency(data.downPaymentFromBoxSpread)}
              disabled
              className="h-14 text-lg px-4 bg-gray-100 border border-gray-300 rounded-lg opacity-60"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-500">
              Down payment from box spread
            </Label>
          </div>
          <div className="relative">
            <Input
              type="text"
              value={formatCurrency(data.mortgageFromBankLoan)}
              disabled
              className="h-14 text-lg px-4 bg-gray-100 border border-gray-300 rounded-lg opacity-60"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-500">
              Mortgage from bank loan
            </Label>
          </div>
        </div>
      ) : data.scenario === 'scenario-2' ? (
        // Scenario 2: Portfolio > down payment but < home value
        <div className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              value={formatCurrency(data.downPaymentFromBoxSpread)}
              disabled
              className="h-14 text-lg px-4 bg-gray-100 border border-gray-300 rounded-lg opacity-60"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-500">
              Down payment from box spread
            </Label>
          </div>
          <div className="relative">
            <Input
              type="text"
              value={formatCurrency(data.mortgageFromBoxSpread)}
              disabled
              className="h-14 text-lg px-4 bg-gray-100 border border-gray-300 rounded-lg opacity-60"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-500">
              Mortgage from box spread
            </Label>
          </div>
          <div className="relative">
            <Input
              type="text"
              value={formatCurrency(data.mortgageFromBankLoan)}
              disabled
              className="h-14 text-lg px-4 bg-gray-100 border border-gray-300 rounded-lg opacity-60"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-500">
              Mortgage from bank loan
            </Label>
          </div>
        </div>
      ) : (
        // Scenario 3: Portfolio ≥ home value
        <div className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              value={formatCurrency(data.downPaymentFromBoxSpread)}
              disabled
              className="h-14 text-lg px-4 bg-gray-100 border border-gray-300 rounded-lg opacity-60"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-500">
              Down payment from box spread
            </Label>
          </div>
          <div className="relative">
            <Input
              type="text"
              value={formatCurrency(data.mortgageFromBoxSpread)}
              disabled
              className="h-14 text-lg px-4 bg-gray-100 border border-gray-300 rounded-lg opacity-60"
            />
            <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-500">
              Mortgage from box spread
            </Label>
          </div>
        </div>
      )}

      {/* Rate Fields */}
      <div className="space-y-6">
        <div className="relative">
          <Input
            type="text"
            value={`${Number.isFinite(data.boxSpreadInterestRate) ? data.boxSpreadInterestRate : 0}%`}
            aria-invalid={!!boxRateError}
            onChange={(e) => {
              const numeric = normalizePercentInput(e.target.value);
              if (numeric > 100) setBoxRateError('Enter an interest rate below 100%');
              else setBoxRateError(null);
              updateField('boxSpreadInterestRate', numeric);
            }}
            onKeyDown={makePercentKeyDownHandler('boxSpreadInterestRate', setBoxRateError)}
            className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
          />
          <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
            Box spread interest rate
          </Label>
          {boxRateError && (
            <p className="mt-2 text-sm text-destructive">{boxRateError}</p>
          )}
        </div>
        <div className="relative">
          <Input
            type="text"
            value={`${Number.isFinite(data.bankMortgageInterestRate) ? data.bankMortgageInterestRate : 0}%`}
            aria-invalid={!!bankRateError}
            onChange={(e) => {
              const numeric = normalizePercentInput(e.target.value);
              if (numeric > 100) setBankRateError('Enter an interest rate below 100%');
              else setBankRateError(null);
              updateField('bankMortgageInterestRate', numeric);
            }}
            onKeyDown={makePercentKeyDownHandler('bankMortgageInterestRate', setBankRateError)}
            className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
          />
          <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
            Bank mortgage interest rate
          </Label>
          {bankRateError && (
            <p className="mt-2 text-sm text-destructive">{bankRateError}</p>
          )}
        </div>
        <div className="relative">
          <Input
            type="text"
            value={formatPercentFixed(data.combinedInterestRate, 2)}
            disabled
            className="h-14 text-lg px-4 bg-gray-100 border border-gray-300 rounded-lg opacity-60"
          />
          <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-500">
            Combined interest rate
          </Label>
        </div>
        <div className="relative">
          <Input
            type="text"
            value={`${data.loanTermYears} years`}
            onChange={(e) => {
              const value = parseFloat(e.target.value.replace('years', '').trim()) || 0;
              updateField('loanTermYears', value);
            }}
            className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
          />
          <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
            Loan term
          </Label>
        </div>
      </div>

      {/* Advanced Section */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 text-base ${showAdvanced ? 'mb-8' : 'mb-4'}`}
          style={{ color: '#00233A' }}
        >
          {showAdvanced ? 'Hide income tax bracket, return rate, tax, insurance, HOA' : 'Show income tax bracket, return rate, tax, insurance, HOA'}
          {showAdvanced ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showAdvanced && (
          <div className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                value={`${Number.isFinite(data.portfolioReturnRate) ? data.portfolioReturnRate : 0}%`}
                aria-invalid={!!returnRateError}
                onChange={(e) => {
                  const numeric = normalizePercentInput(e.target.value);
                  if (numeric > 100) setReturnRateError('Enter an interest rate below 100%');
                  else setReturnRateError(null);
                  updateField('portfolioReturnRate', numeric);
                }}
                onKeyDown={makePercentKeyDownHandler('portfolioReturnRate', setReturnRateError)}
                className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
              />
              <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
                Portfolio return rate
              </Label>
              {returnRateError && (
                <p className="mt-2 text-sm text-destructive">{returnRateError}</p>
              )}
            </div>
            <div className="relative">
              <Input
                type="text"
                value={`${Number.isFinite(data.federalIncomeTaxBracket) ? data.federalIncomeTaxBracket : 32}%`}
                onChange={(e) => {
                  const numeric = normalizePercentInput(e.target.value);
                  updateField('federalIncomeTaxBracket', numeric);
                }}
                onKeyDown={makePercentKeyDownHandler('federalIncomeTaxBracket', () => {})}
                className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
              />
              <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>Federal income tax bracket</span>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <svg 
                        className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tax brackets vary depending on your filing status (single, married, head of household). This calculator starts with a default bracket, but you can enter the rate that matches your income and filing status.</p>
                    </TooltipContent>
                  </UITooltip>
                </div>
              </Label>
            </div>
            <div className="relative">
              <Input
                type="text"
                value={formatCurrency(data.propertyTaxPerYear)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/[$,]/g, '')) || 0;
                  updateField('propertyTaxPerYear', value);
                }}
                className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
              />
              <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
                Property tax per year
              </Label>
            </div>
            <div className="relative">
              <Input
                type="text"
                value={formatCurrency(data.homeownersInsurancePerYear)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/[$,]/g, '')) || 0;
                  updateField('homeownersInsurancePerYear', value);
                }}
                className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
              />
              <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
                Homeowners' insurance per year
              </Label>
            </div>
            <div className="relative">
              <Input
                type="text"
                value={formatCurrency(data.hoaFeePerMonth)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/[$,]/g, '')) || 0;
                  updateField('hoaFeePerMonth', value);
                }}
                className="h-14 text-lg px-4 bg-white border border-gray-400 rounded-lg"
              />
              <Label className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600">
                HOA fee per month
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Update Button */}
      <Button
        onClick={onUpdate}
        disabled={!hasChanges || !!boxRateError || !!bankRateError || !!returnRateError}
        className="w-full h-12 font-medium rounded-xl disabled:cursor-not-allowed"
      >
        Update
      </Button>
    </div>
  );
}