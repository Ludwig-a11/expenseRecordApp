import { getCategoryLabel } from './categoryLabels';
import convertToCurrency from './convertToCurrency';

const getTodayInsight = ({ categoryComparison = [], previousMonthLabel, budget = null }) => {
  const risers = categoryComparison
    .filter((item) => item.percentChange !== null && item.percentChange > 0 && item.amount > 0)
    .sort((a, b) => b.percentChange - a.percentChange);

  if (risers[0]) {
    const top = risers[0];
    return `Llevas ${Math.round(top.percentChange)}% más en ${getCategoryLabel(top.category)} que en ${previousMonthLabel}.`;
  }

  if (budget?.amount > 0) {
    const { remaining, percentUsed } = budget;
    if (remaining < 0) {
      return `Ya superaste tu presupuesto por ${convertToCurrency(Math.abs(remaining))}.`;
    }
    return `Llevas ${Math.round(percentUsed)}% de tu presupuesto usado. Te quedan ${convertToCurrency(remaining)}.`;
  }

  return 'Agrega gastos y configura un presupuesto para ver un análisis de tu mes.';
};

export default getTodayInsight;
