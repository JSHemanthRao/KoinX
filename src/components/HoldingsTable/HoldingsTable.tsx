import type { Holding } from '../../types';
import { formatCurrency, formatCrypto, formatCryptoMinimal } from '../../utils/format';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  holdings: Holding[];
  selectedHoldings: Set<string>;
  onToggleSelection: (coin: string) => void;
  onToggleAll: () => void;
  sortDirection: 'asc' | 'desc' | null;
  onSort: () => void;
}

import { useState } from 'react';

export const HoldingsTable = ({ holdings, selectedHoldings, onToggleSelection, onToggleAll, sortDirection, onSort }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const allSelected = holdings.length > 0 && selectedHoldings.size === holdings.length;
  const someSelected = selectedHoldings.size > 0 && selectedHoldings.size < holdings.length;
  
  const displayedHoldings = showAll ? holdings : holdings.slice(0, 4);

  return (
    <div className="bg-card rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50 overflow-hidden">
      <div className="p-6 md:px-8 py-5 border-b border-border/50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-text">Holdings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-table-header text-xs uppercase tracking-wider text-text-light font-medium">
            <tr>
              <th className="px-6 py-4 text-left font-medium w-12">
                <div 
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors",
                    allSelected ? "bg-card-blue border-card-blue text-white" : someSelected ? "bg-card-blue/20 border-card-blue text-card-blue" : "border-gray-300 hover:border-card-blue"
                  )}
                  onClick={onToggleAll}
                >
                  {(allSelected || someSelected) && <Check className="w-3.5 h-3.5" />}
                </div>
              </th>
              <th className="px-6 py-4 text-left font-medium">Asset</th>
              <th className="px-6 py-4 text-right font-medium">
                <div>Holdings</div>
                <div className="text-[10px] lowercase text-text-light/70 font-normal mt-0.5">Current Market Rate</div>
              </th>
              <th className="px-6 py-4 text-right font-medium">Total Current Value</th>
              <th 
                className="px-6 py-4 text-right font-medium cursor-pointer hover:text-text transition-colors select-none group"
                onClick={onSort}
              >
                <div className="flex items-center justify-end space-x-1">
                  {sortDirection === 'asc' ? (
                    <ChevronUp className="w-4 h-4 text-text-light group-hover:text-text" />
                  ) : sortDirection === 'desc' ? (
                    <ChevronDown className="w-4 h-4 text-text-light group-hover:text-text" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  <span>Short-term</span>
                </div>
              </th>
              <th className="px-6 py-4 text-right font-medium">Long-Term</th>
              <th className="px-6 py-4 text-right font-medium">Amount to Sell</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 text-sm">
            {displayedHoldings.map((holding) => {
              const isSelected = selectedHoldings.has(holding.coin);
              const currentTotalValue = holding.totalHolding * holding.currentPrice;
              
              return (
                <tr 
                  key={holding.coin} 
                  className={cn(
                    "transition-colors hover:bg-table-row-hover group cursor-pointer",
                    isSelected ? "bg-table-row-selected" : ""
                  )}
                  onClick={() => onToggleSelection(holding.coin)}
                >
                  <td className="px-6 py-4">
                    <div 
                      className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        isSelected ? "bg-card-blue border-card-blue text-white" : "border-gray-300 group-hover:border-card-blue"
                      )}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={holding.logo} alt={holding.coinName} className="w-8 h-8 rounded-full shadow-sm" />
                      <div>
                        <div className="font-semibold text-text">{holding.coinName}</div>
                        <div className="text-text-light text-xs font-medium">{holding.coin}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-semibold text-text">{formatCrypto(holding.totalHolding)} {holding.coin}</div>
                    <div className="text-text-light text-xs font-medium mt-0.5">{formatCurrency(holding.currentPrice)}/{holding.coin}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-text">
                    {formatCurrency(currentTotalValue)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={cn("font-semibold", holding.stcg.gain > 0 ? "text-success" : holding.stcg.gain < 0 ? "text-danger" : "text-text")}>
                      {holding.stcg.gain > 0 ? '+' : ''}{formatCurrency(holding.stcg.gain)}
                    </div>
                    {holding.stcg.balance > 0 && (
                      <div className="text-text-light text-[11px] font-medium mt-0.5">{formatCryptoMinimal(holding.stcg.balance)} {holding.coin}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={cn("font-semibold", holding.ltcg.gain > 0 ? "text-success" : holding.ltcg.gain < 0 ? "text-danger" : "text-text")}>
                      {holding.ltcg.gain > 0 ? '+' : ''}{formatCurrency(holding.ltcg.gain)}
                    </div>
                    {holding.ltcg.balance > 0 && (
                      <div className="text-text-light text-[11px] font-medium mt-0.5">{formatCryptoMinimal(holding.ltcg.balance)} {holding.coin}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {isSelected ? (
                      <span className="text-text bg-border/50 px-2.5 py-1 rounded-md">{formatCrypto(holding.totalHolding)} {holding.coin}</span>
                    ) : (
                      <span className="text-text-light">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-border/50">
        {holdings.length > 4 && (
          <button 
            className="text-card-blue font-semibold text-sm hover:underline focus:outline-none"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View less' : 'View all'}
          </button>
        )}
      </div>
    </div>
  );
};
