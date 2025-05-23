
export interface TaxDetails {
  annualIncome: number;
  taxableIncome: number;
  exemptionLimit: number;
  standardDeduction: number;
  taxBeforeCess: number;
  cessAmount: number;
  totalTaxLiability: number;
  taxBreakdown: {
    slab: string;
    amount: number;
    taxRate: string;
    tax: number;
  }[];
  isExempted: boolean;
  regime: "new" | "old";
  exemptions?: number;
}

export const calculateTax = (annualIncome: number, regime: "new" | "old" = "new", exemptions: number = 0): TaxDetails => {
  // Constants
  const STANDARD_DEDUCTION_NEW = 75000;
  const STANDARD_DEDUCTION_OLD = 50000;
  const EXEMPTION_LIMIT_NEW = 1200000;
  const EXEMPTION_LIMIT_OLD = 250000;
  const CESS_RATE = 0.04;

  const STANDARD_DEDUCTION = regime === "new" ? STANDARD_DEDUCTION_NEW : STANDARD_DEDUCTION_OLD;
  const EXEMPTION_LIMIT = regime === "new" ? EXEMPTION_LIMIT_NEW : EXEMPTION_LIMIT_OLD;
  
  // Calculate taxable income
  // For old regime, apply exemptions in addition to standard deduction
  const deductionsTotal = regime === "new" ? STANDARD_DEDUCTION : (STANDARD_DEDUCTION + exemptions);
  const taxableIncome = Math.max(0, annualIncome - deductionsTotal);
  
  // Check if income is within exemption limit
  const isExempted = taxableIncome <= EXEMPTION_LIMIT;
  
  // Initialize tax calculation
  let taxBeforeCess = 0;
  const taxBreakdown = [];
  
  if (!isExempted) {
    // Tax slabs for new regime
    const newRegimeSlabs = [
      { min: 0, max: 400000, rate: 0, rateText: "0%" },
      { min: 400000, max: 800000, rate: 0.05, rateText: "5%" },
      { min: 800000, max: 1200000, rate: 0.10, rateText: "10%" },
      { min: 1200000, max: 1600000, rate: 0.15, rateText: "15%" },
      { min: 1600000, max: 2000000, rate: 0.20, rateText: "20%" },
      { min: 2000000, max: 2400000, rate: 0.25, rateText: "25%" },
      { min: 2400000, max: Infinity, rate: 0.30, rateText: "30%" }
    ];

    // Tax slabs for old regime
    const oldRegimeSlabs = [
      { min: 0, max: 250000, rate: 0, rateText: "0%" },
      { min: 250000, max: 500000, rate: 0.05, rateText: "5%" },
      { min: 500000, max: 1000000, rate: 0.20, rateText: "20%" },
      { min: 1000000, max: Infinity, rate: 0.30, rateText: "30%" }
    ];
    
    const slabs = regime === "new" ? newRegimeSlabs : oldRegimeSlabs;
    let remainingIncome = taxableIncome;
    
    for (const slab of slabs) {
      if (remainingIncome <= 0) break;
      
      const slabWidth = slab.max - slab.min;
      const incomeInSlab = Math.min(remainingIncome, slabWidth);
      const taxInSlab = incomeInSlab * slab.rate;
      
      if (incomeInSlab > 0) {
        taxBeforeCess += taxInSlab;
        taxBreakdown.push({
          slab: `₹${(slab.min / 100000).toFixed(1)} - ₹${slab.max === Infinity ? '∞' : (slab.max / 100000).toFixed(1)} Lakh`,
          amount: incomeInSlab,
          taxRate: slab.rateText,
          tax: taxInSlab
        });
      }
      
      remainingIncome -= incomeInSlab;
    }
  }
  
  // Calculate cess
  const cessAmount = taxBeforeCess * CESS_RATE;
  
  // Calculate total tax liability
  const totalTaxLiability = taxBeforeCess + cessAmount;
  
  return {
    annualIncome,
    taxableIncome,
    exemptionLimit: EXEMPTION_LIMIT,
    standardDeduction: STANDARD_DEDUCTION,
    taxBeforeCess,
    cessAmount,
    totalTaxLiability,
    taxBreakdown,
    isExempted,
    regime,
    exemptions: regime === "old" ? exemptions : 0
  };
};

// Format currency for display
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Format number with commas for Indian numbering system
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('en-IN').format(number);
};
