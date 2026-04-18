import { useState, useEffect, useMemo } from 'react';
import type { Holding, CapitalGainsResponse, CapitalGainsType } from '../types';
import { fetchHoldings, fetchCapitalGains } from '../services/api';

export const useTaxHarvesting = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [baseCapitalGains, setBaseCapitalGains] = useState<CapitalGainsResponse | null>(null);
  const [selectedHoldings, setSelectedHoldings] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        setHoldings(holdingsData);
        setBaseCapitalGains(gainsData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleSelection = (coin: string) => {
    const newSelection = new Set(selectedHoldings);
    if (newSelection.has(coin)) {
      newSelection.delete(coin);
    } else {
      newSelection.add(coin);
    }
    setSelectedHoldings(newSelection);
  };

  const toggleAll = () => {
    if (selectedHoldings.size === holdings.length) {
      setSelectedHoldings(new Set());
    } else {
      setSelectedHoldings(new Set(holdings.map(h => h.coin)));
    }
  };

  const handleSort = () => {
    if (sortDirection === null || sortDirection === 'desc') {
      setSortDirection('asc');
    } else {
      setSortDirection('desc');
    }
  };

  const sortedHoldings = useMemo(() => {
    if (!sortDirection) return holdings;
    
    return [...holdings].sort((a, b) => {
      const valA = a.stcg.gain;
      const valB = b.stcg.gain;
      if (sortDirection === 'asc') {
        return valA - valB;
      } else {
        return valB - valA;
      }
    });
  }, [holdings, sortDirection]);

  const afterHarvestingGains = useMemo(() => {
    if (!baseCapitalGains) return null;

    const computed = {
      stcg: { ...baseCapitalGains.capitalGains.stcg },
      ltcg: { ...baseCapitalGains.capitalGains.ltcg }
    };

    holdings.forEach(holding => {
      if (selectedHoldings.has(holding.coin)) {
        // Handle STCG
        if (holding.stcg.gain > 0) {
          computed.stcg.profits += holding.stcg.gain;
        } else if (holding.stcg.gain < 0) {
          computed.stcg.losses += Math.abs(holding.stcg.gain);
        }

        // Handle LTCG
        if (holding.ltcg.gain > 0) {
          computed.ltcg.profits += holding.ltcg.gain;
        } else if (holding.ltcg.gain < 0) {
          computed.ltcg.losses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    return computed;
  }, [baseCapitalGains, holdings, selectedHoldings]);

  const calculateNetAndRealised = (gains: { stcg: CapitalGainsType, ltcg: CapitalGainsType } | null) => {
    if (!gains) return { stcgNet: 0, ltcgNet: 0, realised: 0 };
    
    const stcgNet = gains.stcg.profits - gains.stcg.losses;
    const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;
    const realised = stcgNet + ltcgNet;

    return { stcgNet, ltcgNet, realised };
  };

  const preCalculations = calculateNetAndRealised(baseCapitalGains?.capitalGains || null);
  const postCalculations = calculateNetAndRealised(afterHarvestingGains);

  const potentialSavings = preCalculations.realised - postCalculations.realised;
  const isSaving = potentialSavings > 0;

  return {
    holdings: sortedHoldings,
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
  };
};
