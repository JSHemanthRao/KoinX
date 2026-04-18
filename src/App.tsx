import { Layout } from './components/Layout/Layout';
import { Disclaimer } from './components/Disclaimer/Disclaimer';
import { PreHarvestingCard } from './components/HarvestingCards/PreHarvestingCard';
import { AfterHarvestingCard } from './components/HarvestingCards/AfterHarvestingCard';
import { HoldingsTable } from './components/HoldingsTable/HoldingsTable';
import { useTaxHarvesting } from './hooks/useTaxHarvesting';

function App() {
  const {
    holdings,
    baseCapitalGains,
    loading,
    selectedHoldings,
    toggleSelection,
    toggleAll,
    afterHarvestingGains,
    preCalculations,
    postCalculations,
    potentialSavings,
    isSaving,
    sortDirection,
    handleSort
  } = useTaxHarvesting();

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text tracking-tight">Tax Optimisation</h1>
          
          <div className="relative group pt-1">
            <span className="text-card-blue text-sm font-medium hover:underline cursor-pointer">How it works?</span>
            
            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[340px] bg-white text-[#1e293b] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
              {/* Arrow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
              
              <div className="relative z-10 text-[13px] leading-relaxed">
                <ul className="space-y-1.5 list-disc pl-4 mb-4">
                  <li>See your capital gains for FY 2024-25 in the left card</li>
                  <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
                  <li>Instantly see your updated tax liability in the right card</li>
                </ul>
                <p>
                  <span className="font-bold">Pro tip:</span> Experiment with different combinations of your holdings to optimize your tax liability
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Disclaimer />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-card-blue"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
            {baseCapitalGains && (
              <PreHarvestingCard 
                stcg={baseCapitalGains.capitalGains.stcg}
                ltcg={baseCapitalGains.capitalGains.ltcg}
                stcgNet={preCalculations.stcgNet}
                ltcgNet={preCalculations.ltcgNet}
                realised={preCalculations.realised}
              />
            )}
            
            {afterHarvestingGains && (
              <AfterHarvestingCard 
                stcg={afterHarvestingGains.stcg}
                ltcg={afterHarvestingGains.ltcg}
                stcgNet={postCalculations.stcgNet}
                ltcgNet={postCalculations.ltcgNet}
                realised={postCalculations.realised}
                potentialSavings={potentialSavings}
                isSaving={isSaving}
              />
            )}
          </div>

          <HoldingsTable 
            holdings={holdings}
            selectedHoldings={selectedHoldings}
            onToggleSelection={toggleSelection}
            onToggleAll={toggleAll}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </>
      )}
    </Layout>
  );
}

export default App;
