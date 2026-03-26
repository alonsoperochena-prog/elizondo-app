import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SmartPercentageController = ({ components, onChange }) => {
  
  const handleAdjust = (index, delta) => {
    const newComps = [...components];
    const currentVal = newComps[index].currentPercentage;
    
    if (delta > 0 && currentVal < 100) {
      // Find the highest other component to decrease
      let maxIdx = -1;
      let maxVal = -1;
      for (let i = 0; i < newComps.length; i++) {
        if (i !== index && newComps[i].currentPercentage > maxVal) {
          maxVal = newComps[i].currentPercentage;
          maxIdx = i;
        }
      }
      
      if (maxIdx !== -1 && maxVal > 0) {
        newComps[maxIdx].currentPercentage -= 1;
        newComps[index].currentPercentage += 1;
        onChange(newComps);
      }
    } else if (delta < 0 && currentVal > 0) {
      // Find the highest other component to increase (to keep total 100%)
      let maxIdx = -1;
      let maxVal = -1;
      for (let i = 0; i < newComps.length; i++) {
        if (i !== index && newComps[i].currentPercentage > maxVal) {
          maxVal = newComps[i].currentPercentage;
          maxIdx = i;
        }
      }
      
      if (maxIdx !== -1) {
        newComps[maxIdx].currentPercentage += 1;
        newComps[index].currentPercentage -= 1;
        onChange(newComps);
      }
    }
  };

  const total = components.reduce((sum, c) => sum + c.currentPercentage, 0);

  return (
    <div className="flex flex-col bg-card rounded-2xl p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-6 border-b border-border pb-4">Ajuste Inteligente</h3>
      <div className="space-y-4">
        {components.map((comp, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: comp.color }} />
              <span className="font-medium text-sm">{comp.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full border-border hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleAdjust(idx, -1)}
                disabled={comp.currentPercentage <= 0}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              <div className="relative w-16">
                <Input
                  type="text"
                  readOnly
                  value={comp.currentPercentage}
                  className="h-8 text-center pr-4 font-medium bg-background border-border cursor-default"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">%</span>
              </div>

              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full border-border hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleAdjust(idx, 1)}
                disabled={comp.currentPercentage >= 100}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-sm font-medium">
        <span className="text-muted-foreground">Total Balanceado:</span>
        <span className={total !== 100 ? "text-destructive font-bold" : "text-primary font-bold"}>
          {total}%
        </span>
      </div>
    </div>
  );
};

export default SmartPercentageController;