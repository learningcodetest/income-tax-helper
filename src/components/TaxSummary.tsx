
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/taxCalculator";
import type { TaxDetails } from "@/utils/taxCalculator";

interface TaxSummaryProps {
  taxDetails: TaxDetails;
  isVisible: boolean;
}

const TaxSummary: React.FC<TaxSummaryProps> = ({ taxDetails, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={`w-full mt-6 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
      <Card className="glass overflow-hidden animate-slide-in-up dark:bg-opacity-10">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Tax Summary</h3>
            <Badge variant={taxDetails.regime === "new" ? "default" : "secondary"}>
              {taxDetails.regime === "new" ? "New Regime" : "Old Regime"}
            </Badge>
          </div>
          
          <div className="grid gap-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Annual Income</span>
              <span className="font-medium">{formatCurrency(taxDetails.annualIncome)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Standard Deduction</span>
              <span className="font-medium">- {formatCurrency(taxDetails.standardDeduction)}</span>
            </div>
            
            {taxDetails.regime === "old" && taxDetails.exemptions > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Additional Exemptions</span>
                <span className="font-medium">- {formatCurrency(taxDetails.exemptions)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxable Income</span>
              <span className="font-medium">{formatCurrency(taxDetails.taxableIncome)}</span>
            </div>

            <Separator />
            
            {taxDetails.isExempted ? (
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Income Tax</span>
                <div className="flex flex-col items-end">
                  <span className="font-medium text-green-600">₹0</span>
                  <span className="text-xs text-muted-foreground">Income below exemption limit</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Income Tax</span>
                  <span className="font-medium">{formatCurrency(taxDetails.taxBeforeCess)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Health & Education Cess (4%)</span>
                  <span className="font-medium">{formatCurrency(taxDetails.cessAmount)}</span>
                </div>
              </>
            )}
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Tax Liability</span>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(taxDetails.totalTaxLiability)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxSummary;
