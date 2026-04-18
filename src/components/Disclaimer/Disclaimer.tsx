import { Info, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const Disclaimer = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-disclaimer-bg border border-disclaimer-border rounded-lg overflow-hidden mb-8">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:opacity-80 transition-opacity focus:outline-none"
      >
        <div className="flex items-center text-card-blue font-semibold text-sm">
          <Info className="w-4 h-4 mr-2" />
          Important Notes & Disclaimers
        </div>
        <div className="text-card-blue">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      
      {expanded && (
        <div className="px-5 pb-5 pt-1 text-sm text-text-light space-y-1.5 list-disc pl-9">
          <li className="pl-1">Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
          <li className="pl-1">Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
          <li className="pl-1">Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
          <li className="pl-1">Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
          <li className="pl-1">Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
        </div>
      )}
    </div>
  );
};
