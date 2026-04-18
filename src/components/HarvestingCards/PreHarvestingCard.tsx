import type { CapitalGainsType } from '../../types';
import { formatCurrency } from '../../utils/format';

interface Props {
  stcg: CapitalGainsType;
  ltcg: CapitalGainsType;
  stcgNet: number;
  ltcgNet: number;
  realised: number;
}

export const PreHarvestingCard = ({ stcg, ltcg, stcgNet, ltcgNet, realised }: Props) => {
  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-text">Pre Harvesting</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="text-text-light font-medium col-span-1"></div>
        <div className="text-right font-medium text-text-light">Short-term</div>
        <div className="text-right font-medium text-text-light">Long-term</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 items-center">
        <div className="font-medium col-span-1">Profits</div>
        <div className="text-right font-semibold">{formatCurrency(stcg.profits)}</div>
        <div className="text-right font-semibold">{formatCurrency(ltcg.profits)}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 items-center">
        <div className="font-medium col-span-1">Losses</div>
        <div className="text-right font-semibold">{formatCurrency(-stcg.losses)}</div>
        <div className="text-right font-semibold">{formatCurrency(-ltcg.losses)}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4 border-t border-border/50 items-center">
        <div className="font-bold col-span-1">Net Capital Gains</div>
        <div className="text-right font-bold text-lg">{formatCurrency(stcgNet)}</div>
        <div className="text-right font-bold text-lg">{formatCurrency(ltcgNet)}</div>
      </div>

      <div className="mt-auto pt-6 flex justify-between items-end">
        <div className="font-bold text-lg">Realised Capital Gains:</div>
        <div className="text-3xl font-extrabold">{formatCurrency(realised)}</div>
      </div>
    </div>
  );
};
