import type { CapitalGainsType } from '../../types';
import { formatCurrency } from '../../utils/format';
import { Sparkles } from 'lucide-react';

interface Props {
  stcg: CapitalGainsType;
  ltcg: CapitalGainsType;
  stcgNet: number;
  ltcgNet: number;
  realised: number;
  potentialSavings: number;
  isSaving: boolean;
}

export const AfterHarvestingCard = ({ stcg, ltcg, stcgNet, ltcgNet, realised, potentialSavings, isSaving }: Props) => {
  return (
    <div className="bg-gradient-to-br from-[#1e68f6] to-[#0b51d8] text-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(30,104,246,0.3)] h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <h2 className="text-xl font-bold mb-6 relative z-10">After Harvesting</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm relative z-10">
        <div className="text-white/80 font-medium col-span-1"></div>
        <div className="text-right font-medium text-white/80">Short-term</div>
        <div className="text-right font-medium text-white/80">Long-term</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 items-center relative z-10">
        <div className="font-medium col-span-1 text-white/90">Profits</div>
        <div className="text-right font-semibold">{formatCurrency(stcg.profits)}</div>
        <div className="text-right font-semibold">{formatCurrency(ltcg.profits)}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 items-center relative z-10">
        <div className="font-medium col-span-1 text-white/90">Losses</div>
        <div className="text-right font-semibold">{formatCurrency(-stcg.losses)}</div>
        <div className="text-right font-semibold">{formatCurrency(-ltcg.losses)}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/20 items-center relative z-10">
        <div className="font-bold col-span-1">Net Capital Gains</div>
        <div className="text-right font-bold text-lg">{formatCurrency(stcgNet)}</div>
        <div className="text-right font-bold text-lg">{formatCurrency(ltcgNet)}</div>
      </div>

      <div className="mt-auto pt-6 flex justify-between items-end relative z-10">
        <div className="font-bold text-lg text-white/90">Effective Capital Gains:</div>
        <div className="text-3xl font-extrabold">{formatCurrency(realised)}</div>
      </div>

      {isSaving && (
        <div className="mt-6 pt-4 border-t border-white/20 flex items-center text-green-300 font-medium text-sm relative z-10">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
          You are going to save up to <span className="font-bold ml-1 text-white">{formatCurrency(potentialSavings)}</span>
        </div>
      )}
    </div>
  );
};
