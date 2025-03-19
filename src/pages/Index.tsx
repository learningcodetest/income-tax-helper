
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
          Calculate your income tax liability under the new tax regime for FY 2025-26
        </p>
      </header>
      
      <main className="w-full max-w-4xl mx-auto">
        <TaxCalculator />
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground max-w-2xl mx-auto animate-fade-in">
        <p className="mb-2">
          This calculator applies the standard deduction of ₹75,000 and 4% Health & Education Cess automatically.
          Income up to ₹12,00,000 is exempt from tax under the new tax regime.
        </p>
        <p>
          Tax rates: 0% (up to ₹4L), 5% (₹4L-₹8L), 10% (₹8L-₹12L), 15% (₹12L-₹16L), 20% (₹16L-₹20L), 25% (₹20L-₹24L), 30% (above ₹24L)
        </p>
      </footer>
    </div>
  );
};

export default Index;
