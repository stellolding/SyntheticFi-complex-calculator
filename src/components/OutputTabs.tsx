import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, ReferenceLine, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { CalculatedData, MortgageData, calculateMortgageMetrics } from './calculations';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Alert, AlertDescription } from './ui/alert';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface OutputTabsProps {
  data: CalculatedData;
  scenario: 'scenario-1' | 'scenario-2' | 'scenario-3';
  baseData: MortgageData;
}

export function OutputTabs({ data, scenario, baseData }: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState<'net-savings' | 'monthly-payment'>('net-savings');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [rateDelta, setRateDelta] = useState<number>(2);
  const [showRangeView, setShowRangeView] = useState<boolean>(false);
  const [paymentStructure, setPaymentStructure] = useState<'traditional' | 'deferred'>('deferred');

  // Precompute advanced series so hooks order remains stable
  const advancedPlusSeries = useMemo(() => {
    const adjustedRate = baseData.boxSpreadInterestRate + rateDelta;
    const adjusted = { ...baseData, boxSpreadInterestRate: adjustedRate };
    return calculateMortgageMetrics(adjusted).netSavings.chartData;
  }, [baseData, rateDelta]);

  const advancedMinusSeries = useMemo(() => {
    const adjustedRate = Math.max(0, baseData.boxSpreadInterestRate - rateDelta);
    const adjusted = { ...baseData, boxSpreadInterestRate: adjustedRate };
    return calculateMortgageMetrics(adjusted).netSavings.chartData;
  }, [baseData, rateDelta]);

  // Percentile series (10/25/50/75/90) based on treating ± as 1 std of box rate
  const percentileSeries = useMemo(() => {
    const meanBox = baseData.boxSpreadInterestRate;
    const meanPortfolio = baseData.portfolioReturnRate;
    const std = Math.max(0, rateDelta);

    const zScores = {
      p10: -1.28155,
      p25: -0.67449,
      p50: 0,
      p75: 0.67449,
      p90: 1.28155,
    } as const;

    const compute = (z: number) => {
      const adjustedBox = Math.max(0, meanBox + z * std);
      const delta = adjustedBox - meanBox;
      const adjustedPortfolio = Math.max(0, meanPortfolio - 0.5 * delta);
      const metrics = calculateMortgageMetrics({
        ...baseData,
        boxSpreadInterestRate: adjustedBox,
        portfolioReturnRate: adjustedPortfolio,
      });
      return metrics.netSavings.chartData;
    };

    const p10 = compute(zScores.p10);
    const p25 = compute(zScores.p25);
    const p50 = compute(zScores.p50);
    const p75 = compute(zScores.p75);
    const p90 = compute(zScores.p90);

    return p50.map((row, idx) => {
      const v10 = p10[idx]?.value ?? row.value;
      const v25 = p25[idx]?.value ?? row.value;
      const v50 = row.value;
      const v75 = p75[idx]?.value ?? row.value;
      const v90 = p90[idx]?.value ?? row.value;
      return {
      year: row.year,
        p10: v10,
        p25: v25,
        p50: v50,
        p75: v75,
        p90: v90,
        lower10: v10,
        lower25: v25,
        upper90: v90,
        band10_90: Math.max(0, v90 - v10),
        band25_75: Math.max(0, v75 - v25),
      };
    });
  }, [baseData, rateDelta]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium">{`Year ${label}`}</p>
          <p>
            {`Net Savings: ${formatCurrency(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const AdvancedTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const raw = payload[0]?.payload ?? {};
      // Pull directly from the underlying datum; fall back to visible series if needed
      const getVal = (key: string) => payload.find((p: any) => p.dataKey === key)?.value ?? 0;
      const p10Val = raw.p10 ?? getVal('lower10');
      const p50Val = raw.p50 ?? getVal('p50');
      const p90Val = raw.p90 ?? getVal('upper90') ?? (getVal('lower10') + getVal('band10_90'));
      
      if (showRangeView) {
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium mb-2">{`Year ${label}`}</p>
          <div className="space-y-1">
              <p>Net worth range: {formatCurrency(p10Val)} – {formatCurrency(p90Val)}</p>
              <p>Median outcome: {formatCurrency(p50Val)}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="bg-white p-3 border rounded shadow-lg">
            <p className="font-medium mb-2">{`Year ${label}`}</p>
            <div className="space-y-1">
              <p>10% chance: {formatCurrency(p10Val)}</p>
              <p>50% chance: {formatCurrency(p50Val)}</p>
              <p>90% chance: {formatCurrency(p90Val)}</p>
          </div>
        </div>
      );
      }
    }
    return null;
  };

  const createMonthlyPaymentData = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyBasePayment = data.monthlyPayment.breakdown.bankMortgageInterest + 
                              data.monthlyPayment.breakdown.propertyTax + 
                              data.monthlyPayment.breakdown.insurance + 
                              data.monthlyPayment.breakdown.hoa;
    const boxSpreadMonthlyInterest = data.monthlyPayment.breakdown.boxSpreadInterest;
    
    return monthNames.map((month, index) => ({
      month,
      requiredPayment: monthlyBasePayment,
      boxSpreadInterest: index === 11 ? boxSpreadMonthlyInterest * 12 : 0, // Only pay in December
      deferredAmount: index === 11 ? 0 : boxSpreadMonthlyInterest, // Deferred for first 11 months
    }));
  };

  const monthlyData = createMonthlyPaymentData();

  const BarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const requiredPayment = payload.find((p: any) => p.dataKey === 'requiredPayment')?.value || 0;
      const boxSpreadInterest = payload.find((p: any) => p.dataKey === 'boxSpreadInterest')?.value || 0;
      const deferredAmount = payload.find((p: any) => p.dataKey === 'deferredAmount')?.value || 0;
      
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-blue-600 rounded mr-2"></span>
              Required Payment: {formatCurrency(requiredPayment)}
            </p>
            {boxSpreadInterest > 0 && (
              <p className="text-sm">
                <span className="inline-block w-3 h-3 bg-gray-500 rounded mr-2"></span>
                Box Spread Interest: {formatCurrency(boxSpreadInterest)}
              </p>
            )}
            {deferredAmount > 0 && (
              <p className="text-sm">
                <span className="inline-block w-3 h-3 bg-orange-500 opacity-80 rounded mr-2"></span>
                Deferred Payment: {formatCurrency(deferredAmount)}
              </p>
            )}
            <div className="border-t pt-1 mt-2">
              <p className="font-medium">
                Total Cash Required: {formatCurrency(requiredPayment + boxSpreadInterest)}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    // Left divider + padding to visually separate from the form column
    <div className="relative h-full pl-8 border-l-2 border-solid border-gray-300">
      {/* Tab Navigation */}
      <div className="flex gap-1 mb-8 p-1 bg-gray-100 rounded-xl inline-flex">
        <button
          onClick={() => setActiveTab('net-savings')}
          className={`px-6 py-3 rounded-lg transition-all text-base font-medium ${
            activeTab === 'net-savings'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          style={{
            backgroundColor: activeTab === 'net-savings' ? '#00233A' : 'transparent',
          }}
        >
          Net benefit
        </button>
        <button
          onClick={() => setActiveTab('monthly-payment')}
          className={`px-6 py-3 rounded-lg transition-all text-base font-medium ${
            activeTab === 'monthly-payment'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          style={{
            backgroundColor: activeTab === 'monthly-payment' ? '#00233A' : 'transparent',
          }}
        >
          Payment structure
        </button>
      </div>

      {/* Net Savings Tab */}
      {activeTab === 'net-savings' && (
        <div>

          {/* Chart */}
          <div className="mb-2">
            {/* Controls and summary: radio → alert → metrics */}
            <div className="mb-4 flex flex-col gap-4">
              {/* Rate mode radios */}
              <div className="w-full mt-1">
                <RadioGroup
                  className="grid grid-cols-1 gap-2"
                  value={showAdvanced ? 'fluctuating' : 'fixed'}
                  onValueChange={(v) => setShowAdvanced(v === 'fluctuating')}
                >
                  <label className="inline-flex items-center gap-2 text-base" style={{ color: 'var(--color-axis-muted)' }}>
                    <RadioGroupItem value="fixed" />
                    <span>Assume fixed rate</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-base" style={{ color: 'var(--color-axis-muted)' }}>
                    <RadioGroupItem value="fluctuating" />
                    <span>Assume fluctuating rate</span>
                  </label>
                </RadioGroup>
              </div>

              {/* Info alert (no buttons, dismissible) */}
              <Alert className="relative text-sm w-full">
                <button
                  onClick={(e) => (e.currentTarget.parentElement as HTMLElement).remove()}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  ×
                </button>
                <AlertDescription className="col-start-2 whitespace-normal break-words">
                  First 5 years are fixed at box spread rates. Years 6–30 are estimates, assuming rollover at similar rates. Box spreads interest rates are generally always lower than bank mortgages.{' '}
                  <a href="#" className="underline" style={{ color: 'var(--color-axis-muted)' }}>Learn more</a>
                </AlertDescription>
              </Alert>

              {/* Summary section */}
              {showAdvanced ? (
                <>
                  {/* Advanced summary metrics */}
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              {(() => {
                      const advLast = percentileSeries[percentileSeries.length - 1] || ({} as any);
                      const baseVal = data.netSavings.chartData[data.netSavings.chartData.length - 1]?.value || 0;
                      
                      if (showRangeView) {
                        return (
                          <>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-axis-muted)' }}>
                                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0,35,58,1)' }}></span>
                                <span>Net worth range (10-90%)</span>
                              </div>
                              <h2 className="mt-1" style={{ color: '#0B1B2B', fontSize: '32px' }}>
                                {formatCurrency(advLast.p10 || 0)} – {formatCurrency(advLast.p90 || 0)}
                              </h2>
                            </div>
                            <div className="hidden lg:block self-stretch w-px bg-gray-200" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-axis-muted)' }}>
                                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0,35,58,0.7)' }}></span>
                                <span>Median outcome</span>
                              </div>
                              <h2 className="mt-1" style={{ color: '#0B1B2B', fontSize: '32px' }}>{formatCurrency(advLast.p50 || baseVal)}</h2>
                            </div>
                          </>
                        );
                      } else {
                  return (
                        <>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-axis-muted)' }}>
                                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0,35,58,1)' }}></span>
                              <span>Net benefit (90% chance)</span>
                      </div>
                            <h2 className="mt-1" style={{ color: '#0B1B2B', fontSize: '32px' }}>{formatCurrency(advLast.p90 || 0)}</h2>
                    </div>
                          <div className="hidden lg:block self-stretch w-px bg-gray-200" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-axis-muted)' }}>
                                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0,35,58,0.7)' }}></span>
                              <span>Net benefit (50% chance)</span>
                    </div>
                            <h2 className="mt-1" style={{ color: '#0B1B2B', fontSize: '32px' }}>{formatCurrency(advLast.p50 || baseVal)}</h2>
                    </div>
                          <div className="hidden lg:block self-stretch w-px bg-gray-200" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-axis-muted)' }}>
                                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(0,35,58,0.4)' }}></span>
                              <span>Net benefit (10% chance)</span>
                    </div>
                            <h2 className="mt-1" style={{ color: '#0B1B2B', fontSize: '32px' }}>{formatCurrency(advLast.p10 || 0)}</h2>
                  </div>
                        </>
                );
                      }
              })()}
            </div>

            {/* Fluctuation input below metrics */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm text-gray-600 shrink-0">±</span>
              <div className="relative flex-none w-[180px]">
                <Input
                  type="number"
                  min={0}
                  step={0.25}
                  value={rateDelta}
                  onChange={(e) => setRateDelta(Number(e.target.value))}
                  className="h-10 px-3 bg-white border border-gray-400 rounded-lg w-full"
                />
                <Label
                  className="absolute -top-3 left-3 bg-white px-2 text-sm text-gray-600 leading-none pointer-events-none !whitespace-nowrap"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Box spread fluctuation rate
                </Label>
              </div>
            </div>

          </>
        ) : (
          (() => {
            const last = data.netSavings.chartData[data.netSavings.chartData.length - 1];
            const baseVal = last?.value || 0;
            return (
              <div>
                <h5 className="mb-1" style={{ color: '#0B1B2B' }}>Net benefit (as of 2055)</h5>
                <h2 className="font-extrabold tracking-tight" style={{ color: '#0B1B2B' }}>
                  {formatCurrency(baseVal)}
                </h2>
              </div>
            );
          })()
        )}
      </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={showAdvanced ? percentileSeries : data.netSavings.chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  onMouseMove={(e: any) => {
                    if (e && e.activeLabel) {
                      setHoveredYear(e.activeLabel);
                    }
                  }}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <defs>
                    <linearGradient id="netSavingsAreaPre" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C2DFF6" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#C2DFF6" stopOpacity={0.25} />
                    </linearGradient>
                    {/* Confidence band gradient (10–90%) - more visible gray */}
                    <linearGradient id="band10_90" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E2E8F0" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#E2E8F0" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="netSavingsPlus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.03} />
                    </linearGradient>
                    <linearGradient id="netSavingsMinus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  {/* Axes only - hide horizontal grid lines */}
                  <CartesianGrid horizontal={false} stroke="#E5E7EB" strokeDasharray="2 2" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                    type="number"
                    domain={[2025, 2055]}
                    ticks={[2025, 2030, 2035, 2040, 2045, 2050, 2055]}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                    domain={[0, 1500000]}
                    ticks={[0, 250000, 500000, 750000, 1000000, 1250000, 1500000]}
                    tickFormatter={(value) => {
                      if (value === 0) return '$0';
                      if (value < 1000000) return `${value / 1000}K`;
                      return `${value / 1000000}M`;
                    }}
                  />
                  {/* 5-year vertical divider (2030) */}
                  <ReferenceLine x={2030} stroke="#CBD5E1" strokeWidth={1} strokeOpacity={0.9} strokeDasharray="3 3" />

                  <Tooltip content={showAdvanced ? <AdvancedTooltip /> : <CustomTooltip />} />

                  {!showAdvanced && (
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0B1B2B"
                      strokeWidth={3}
                      fill="url(#netSavingsAreaPre)"
                      activeDot={{ r: 5, fill: '#0B1B2B', strokeWidth: 0 }}
                    />
                  )}

                  {showAdvanced && (
                    <>
                      {/* Fill everything below 10% line with gray */}
                      <Area type="monotone" dataKey="p10" fill="#E2E8F0" fillOpacity={0.3} strokeOpacity={0} />
                      
                      {/* Fill everything below 90% line with white (creating the band effect) */}
                      <Area type="monotone" dataKey="p90" fill="white" fillOpacity={1} strokeOpacity={0} />

                      {/* Median line on top */}
                      <Area type="monotone" dataKey="p50" stroke="#00233A" strokeWidth={3} dot={false} fillOpacity={0} />
                    </>
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Toggle at bottom right */}
          {showAdvanced && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowRangeView(!showRangeView)}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {showRangeView ? 'Show percentiles' : 'Another option'}
              </button>
            </div>
          )}

          {/* Breakdown Rows (restructured + black numbers with colored signs) */}
          {!showAdvanced && (
          <div className="space-y-3">
            {(() => {
              const currentBreakdown = hoveredYear ? 
                data.netSavings.chartData.find(item => item.year === hoveredYear)?.breakdown : 
                data.netSavings.chartData[data.netSavings.chartData.length - 1]?.breakdown;
              const displayYear = hoveredYear || 2055;

              const renderSigned = (amount: number) => {
                const isNeg = amount < 0;
                const abs = Math.abs(amount);
                return (
                  <span className="font-medium text-gray-900">
                    <span className={isNeg ? 'text-red-600' : 'text-green-600'}>{isNeg ? '-' : '+'}</span>{formatCurrency(abs)}
                  </span>
                );
              };

              const investmentGains = currentBreakdown?.investmentGains || 0;
              const interestCost = currentBreakdown?.interestCost || 0; // positive cost value expected
              const netPortfolioGrowth = currentBreakdown?.netInvestmentEarnings || (investmentGains - interestCost);
              const interestSavings = currentBreakdown?.interestSavings || 0;
              const taxSavings = currentBreakdown?.taxSavings || 0;
              const taxBenefits = currentBreakdown?.taxBenefits || 0;
              const borrowingBenefits = interestSavings + taxSavings + taxBenefits;
              
              return (
                <>
                  {/* Net portfolio growth */}
                  <div className="flex justify-between py-3">
                    <h5 className="text-gray-900">Net portfolio growth</h5>
                    <span className="font-bold text-gray-900">{formatCurrency(netPortfolioGrowth)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700 pl-6">Portfolio growth (from unsold portfolio)</span>
                    {renderSigned(investmentGains)}
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700 pl-6">Interest paid (for box spread)</span>
                    {renderSigned(-Math.abs(interestCost))}
                  </div>

                  {/* Borrowing benefits */}
                  <div className="flex justify-between py-3">
                    <h5 className="text-gray-900">Borrowing benefits</h5>
                    <span className="font-bold text-gray-900">{formatCurrency(borrowingBenefits)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700 pl-6">Lower interest cost (comparing to bank loan)</span>
                    {renderSigned(interestSavings)}
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700 pl-6">Capital gains tax savings (from unsold portfolio)</span>
                    {renderSigned(taxSavings)}
                  </div>
                  <div className="flex justify-between py-3">
                    <div className="flex items-center gap-2 pl-6">
                      <span className="text-gray-700">Box Spread tax savings (IRS 60/40 rule)</span>
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
                          <p>The IRS "60/40 rule" lets Box Spread interest be reported as 60% long-term and 40% short-term capital loss. These losses offset your gains or income at your applicable tax rates, reducing your overall tax bill.</p>
                        </TooltipContent>
                      </UITooltip>
                    </div>
                    {renderSigned(taxBenefits)}
                    </div>

                  <div className="border-t-2 border-gray-800 my-3"></div>
                  <div className="flex justify-between py-3">
                    <h5 className="text-gray-800">Net benefit as of {displayYear}</h5>
                    <span className="font-bold text-lg text-gray-900">
                      {formatCurrency(currentBreakdown?.totalBenefit || 0)}
                    </span>
                  </div>

                  {/* Advanced toggle removed from bottom per spec */}
                </>
              );
            })()}
          </div>
          )}
        </div>
      )}

      {/* Payment Structure Tab */}
      {activeTab === 'monthly-payment' && (
        <div>
          {/* Payment Structure Radio Buttons */}
          <div className="mb-6">
            <RadioGroup
              className="grid grid-cols-1 gap-2"
              value={paymentStructure}
              onValueChange={(v) => setPaymentStructure(v as 'traditional' | 'deferred')}
            >
              <label className="inline-flex items-center gap-2 text-base" style={{ color: 'var(--color-axis-muted)' }}>
                <RadioGroupItem value="traditional" />
                <span>Simulate a traditional loan (monthly payments)</span>
              </label>
              <label className="inline-flex items-center gap-2 text-base" style={{ color: 'var(--color-axis-muted)' }}>
                <RadioGroupItem value="deferred" />
                <span>Cash-flow optimized (defer to year 5)</span>
              </label>
            </RadioGroup>
          </div>


          {/* Payment Breakdown Donut Chart */}
          <div className="mb-8">
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                  data={(() => {
                      if (paymentStructure === 'traditional') {
                        // Traditional: include box spread interest in monthly payment
                        return [
                          { name: 'Mortgage Interest', value: data.monthlyPayment.breakdown.bankMortgageInterest, color: '#00233A' },
                          { name: 'Property Tax', value: data.monthlyPayment.breakdown.propertyTax, color: '#0392F1' },
                          { name: 'Home Insurance', value: data.monthlyPayment.breakdown.insurance, color: '#10B981' },
                          { name: 'HOA', value: data.monthlyPayment.breakdown.hoa, color: '#F59E0B' },
                          { name: 'Box Spread Interest', value: data.monthlyPayment.breakdown.boxSpreadInterest, color: '#EF4444' }
                        ].filter(item => item.value > 0);
                      } else {
                        // Deferred: monthly payment without box spread interest
                        return [
                          { name: 'Mortgage Interest', value: data.monthlyPayment.breakdown.bankMortgageInterest, color: '#00233A' },
                          { name: 'Property Tax', value: data.monthlyPayment.breakdown.propertyTax, color: '#0392F1' },
                          { name: 'Home Insurance', value: data.monthlyPayment.breakdown.insurance, color: '#10B981' },
                          { name: 'HOA', value: data.monthlyPayment.breakdown.hoa, color: '#F59E0B' }
                        ].filter(item => item.value > 0);
                      }
                  })()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {(() => {
                      const chartData = (() => {
                        if (paymentStructure === 'traditional') {
                          return [
                            data.monthlyPayment.breakdown.bankMortgageInterest,
                            data.monthlyPayment.breakdown.propertyTax,
                            data.monthlyPayment.breakdown.insurance,
                            data.monthlyPayment.breakdown.hoa,
                            data.monthlyPayment.breakdown.boxSpreadInterest
                          ];
                        } else {
                          return [
                            data.monthlyPayment.breakdown.bankMortgageInterest,
                            data.monthlyPayment.breakdown.propertyTax,
                            data.monthlyPayment.breakdown.insurance,
                            data.monthlyPayment.breakdown.hoa
                          ];
                        }
                      })();
                      
                      const colors = ['#00233A', '#0392F1', '#10B981', '#F59E0B', '#EF4444'];
                      
                      return chartData.map((value, index) => 
                        value > 0 ? <Cell key={index} fill={colors[index]} /> : null
                      ).filter(Boolean);
                    })()}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(value)}
                    labelStyle={{ color: '#0B1B2B' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Breakdown Tables */}
          {paymentStructure === 'traditional' ? (
            /* Traditional Loan - Single Monthly Payment Table */
            <div className="max-w-md mx-auto">
              <h4 className="font-medium text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">Monthly Payment Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00233A' }}></div>
                  <span className="text-gray-700">Mortgage interest</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(data.monthlyPayment.breakdown.bankMortgageInterest)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0392F1' }}></div>
                  <span className="text-gray-700">Property tax</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(data.monthlyPayment.breakdown.propertyTax)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  <span className="text-gray-700">Home insurance</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(data.monthlyPayment.breakdown.insurance)}
                  </span>
                </div>
                {data.monthlyPayment.breakdown.hoa > 0 && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
                    <span className="text-gray-700">HOA</span>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(data.monthlyPayment.breakdown.hoa)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }}></div>
                    <span className="text-gray-700">Box spread interest</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(data.monthlyPayment.breakdown.boxSpreadInterest)}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <div></div>
                  <span className="font-bold text-lg text-gray-800">
                    {formatCurrency(
                      data.monthlyPayment.breakdown.bankMortgageInterest + 
                      data.monthlyPayment.breakdown.propertyTax + 
                      data.monthlyPayment.breakdown.insurance + 
                      data.monthlyPayment.breakdown.hoa +
                      data.monthlyPayment.breakdown.boxSpreadInterest
                    )}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Deferred Payment - Stacked Tables */
            <div className="space-y-8">
              {/* Monthly Payment (Months 1-59) Breakdown */}
              <div className="max-w-md mx-auto">
                <h4 className="font-medium text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">Monthly Payment (Months 1-59)</h4>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00233A' }}></div>
                  <span className="text-gray-700">Mortgage interest</span>
                    </div>
                  <span className="font-medium">
                    {formatCurrency(data.monthlyPayment.breakdown.bankMortgageInterest)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0392F1' }}></div>
                  <span className="text-gray-700">Property tax</span>
                    </div>
                  <span className="font-medium">
                    {formatCurrency(data.monthlyPayment.breakdown.propertyTax)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  <span className="text-gray-700">Home insurance</span>
                    </div>
                  <span className="font-medium">
                    {formatCurrency(data.monthlyPayment.breakdown.insurance)}
                  </span>
                </div>
                {data.monthlyPayment.breakdown.hoa > 0 && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
                    <span className="text-gray-700">HOA</span>
                      </div>
                    <span className="font-medium">
                      {formatCurrency(data.monthlyPayment.breakdown.hoa)}
                    </span>
                  </div>
                )}
                  <div className="flex justify-between py-3">
                    <div></div>
                    <span className="font-bold text-lg text-gray-800">
                      {formatCurrency(
                        data.monthlyPayment.breakdown.bankMortgageInterest + 
                        data.monthlyPayment.breakdown.propertyTax + 
                        data.monthlyPayment.breakdown.insurance + 
                        data.monthlyPayment.breakdown.hoa
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Payment (Month 60) - Simplified */}
              <div className="max-w-md mx-auto">
                <h4 className="font-medium text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">Final Payment (Month 60)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Regular monthly payment</span>
                    <span className="font-medium">
                      {formatCurrency(
                        data.monthlyPayment.breakdown.bankMortgageInterest + 
                        data.monthlyPayment.breakdown.propertyTax + 
                        data.monthlyPayment.breakdown.insurance + 
                        data.monthlyPayment.breakdown.hoa
                      )}
                    </span>
                  </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Deferred box spread interest (5 years)</span>
                  <span className="font-medium">
                    {formatCurrency(data.monthlyPayment.breakdown.boxSpreadInterest * 12 * 5)}
                  </span>
                </div>
                  <div className="flex justify-between py-3">
                    <div></div>
                  <span className="font-bold text-lg text-gray-800">
                    {formatCurrency(
                      data.monthlyPayment.breakdown.bankMortgageInterest + 
                      data.monthlyPayment.breakdown.propertyTax + 
                      data.monthlyPayment.breakdown.insurance + 
                      data.monthlyPayment.breakdown.hoa +
                      (data.monthlyPayment.breakdown.boxSpreadInterest * 12 * 5)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
}
