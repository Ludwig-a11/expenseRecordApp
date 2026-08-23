const getPercentChange = (current, previous) => {
  const currentAmount = Number(current) || 0;
  const previousAmount = Number(previous) || 0;

  if (!Number.isFinite(previousAmount) || previousAmount === 0) {
    return null;
  }

  return ((currentAmount - previousAmount) / previousAmount) * 100;
};

export default getPercentChange;
