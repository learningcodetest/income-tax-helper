
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TaxSummary from "./TaxSummary";
import TaxBreakdown from "./TaxBreakdown";
import { calculateTax, type TaxDetails } from "@/utils/taxCalculator";
import { toast } from "@/components/ui/use-toast";

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<string>('');
  const [taxDetails, setTaxDetails] = useState<TaxDetails | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setIncome(value);
    
    if (showResult) {
      setShowResult(false);
      setShowBreakdown(false);
    }
  };

  const calculateTaxLiability = () => {
    const numericIncome = Number(income);
    
    if (!income || numericIncome <= 0) {
      toast({
        title: "Please enter a valid income",
        description: "Income must be a positive number.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const details = calculateTax(numericIncome);
      setTaxDetails(details);
      setShowResult(true);
      setShowBreakdown(false);
      
      // Show toast based on exemption status
      if (details.isExempted) {
        toast({
          title: "You're eligible for zero tax!",
          description: "Your income falls under the ₹12 Lakh exemption limit.",
          variant: "default"
        });
      } else {
        toast({
          title: "Tax calculated successfully",
          description: "See your detailed breakdown below.",
          variant: "default"
        });
      }
    } catch (error) {
      toast({
        title: "Calculation error",
        description: "There was a problem calculating your tax. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    setIncome('');
    setTaxDetails(null);
    setShowResult(false);
    setShowBreakdown(false);
  };

  const toggleBreakdown = () => {
    setShowBreakdown(!showBreakdown);
  };

  const formatInputValue = (value: string) => {
    if (!value) return '';
    
    const numericValue = value.replace(/,/g, '');
    return new Intl.NumberFormat('en-IN').format(parseInt(numericValue));
  };

  const displayValue = formatInputValue(income);

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="glass shadow-lg border-0">
        <CardHeader className="space-y-1 text-center">
          <Badge variant="outline" className="mx-auto mb-2 px-3 py-1 animate-fade-in">
            FY 2025-26
          </Badge>
          <CardTitle className="text-3xl font-bold transition-all duration-300 ease-in-out text-foreground/90 text-shadow">
            How Much Will You Pay?
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="income" className="block text-sm font-medium text-muted-foreground">
              Your Annual Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="income"
                type="text"
                value={displayValue}
                onChange={handleIncomeChange}
                placeholder="Enter your annual income"
                className="pl-8 text-lg h-12 border-input bg-background"
                autoComplete="off"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Gross total income before any deductions
            </p>
          </div>

          <Button 
            onClick={calculateTaxLiability} 
            className="w-full h-12 text-lg font-medium transition-all"
          >
            Calculate
          </Button>
        </CardContent>

        {taxDetails && (
          <>
            <TaxSummary taxDetails={taxDetails} isVisible={showResult} />
            
            {showResult && !taxDetails.isExempted && (
              <div className="px-6 pb-4 mt-2">
                <Button 
                  variant="outline" 
                  onClick={toggleBreakdown} 
                  className="w-full"
                >
                  {showBreakdown ? "Hide Breakdown" : "Show Breakdown"}
                </Button>
              </div>
            )}
            
            <TaxBreakdown taxDetails={taxDetails} isVisible={showBreakdown} />
            
            <CardFooter className="flex justify-center pt-2 pb-6">
              <Button 
                variant="ghost" 
                onClick={handleReset} 
                className="text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default TaxCalculator;
