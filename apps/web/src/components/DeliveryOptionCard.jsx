import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const DeliveryOptionCard = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  selected, 
  onClick, 
  children 
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(id)}
      className={cn(
        "relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col h-full",
        selected 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
      )}
    >
      {selected && (
        <div className="absolute top-4 right-4 text-primary">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      )}
      
      <div className="flex items-center space-x-4 mb-4">
        <div className={cn(
          "p-3 rounded-xl",
          selected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className={cn(
        "mt-4 flex-1 transition-all duration-300 overflow-hidden",
        selected ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
      )}>
        {children}
      </div>
    </motion.div>
  );
};

export default DeliveryOptionCard;