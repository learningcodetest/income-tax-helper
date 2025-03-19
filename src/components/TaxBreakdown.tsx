
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TaxDetails, formatCurrency } from "@/utils/taxCalculator";

interface TaxBreakdownProps {
  taxDetails: TaxDetails;
  isVisible: boolean;
}

const TaxBreakdown: React.FC<TaxBreakdownProps> = ({ taxDetails, isVisible }) => {
  if (!isVisible || taxDetails.isExempted) return null;

  return (
    <div className={`w-full mt-8 overflow-hidden transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 max-h-[600px]' : 'opacity-0 max-h-0'}`}>
      <Card className="p-4 glass animate-fade-in">
        <h3 className="text-lg font-medium mb-4">Tax Breakdown</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Income Slab</TableHead>
              <TableHead className="text-right">Amount in Slab</TableHead>
              <TableHead className="text-right">Tax Rate</TableHead>
              <TableHead className="text-right">Tax Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxDetails.taxBreakdown.map((item, index) => (
              <TableRow key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                <TableCell>{item.slab}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                <TableCell className="text-right">{item.taxRate}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.tax)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-medium">
              <TableCell colSpan={3} className="text-right">Tax Before Cess:</TableCell>
              <TableCell className="text-right">{formatCurrency(taxDetails.taxBeforeCess)}</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell colSpan={3} className="text-right">Health & Education Cess (4%):</TableCell>
              <TableCell className="text-right">{formatCurrency(taxDetails.cessAmount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TaxBreakdown;
