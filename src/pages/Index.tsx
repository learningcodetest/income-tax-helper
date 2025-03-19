
import React from 'react';
import TaxCalculator from '../components/TaxCalculator';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10">
      <header className="mb-10 text-center animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Income Tax Calculator
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Calculate your income tax liability under both new and old tax regimes for FY 2025-26
        </p>
      </header>
      
      <main className="w-full max-w-4xl mx-auto">
        <TaxCalculator />
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground max-w-2xl mx-auto animate-fade-in">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold">New Tax Regime:</h3>
            <p className="mb-2">
              Standard deduction of ₹75,000 applies automatically. 
              Income up to ₹12,00,000 is exempt from tax.
            </p>
            <p>
              Tax rates: 0% (up to ₹4L), 5% (₹4L-₹8L), 10% (₹8L-₹12L), 15% (₹12L-₹16L), 20% (₹16L-₹20L), 25% (₹20L-₹24L), 30% (above ₹24L)
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold">Old Tax Regime:</h3>
            <p className="mb-2">
              Standard deduction of ₹50,000 applies automatically. 
              Income up to ₹2,50,000 is exempt from tax.
            </p>
            <p>
              Tax rates: 0% (up to ₹2.5L), 5% (₹2.5L-₹5L), 20% (₹5L-₹10L), 30% (above ₹10L)
            </p>
          </div>
          
          <p className="mt-4 pt-3 border-t border-border">
            Health & Education Cess (4%) applies to the calculated tax amount in both regimes.
          </p>
          
          <p className="text-xs opacity-60 pt-6">
            Prompted by Harsh Nahar
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
