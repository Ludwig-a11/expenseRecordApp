import formatRelativeDay from './formatRelativeDay';

const groupExpensesByDay = (expenses) => {
  const groups = [];

  expenses.forEach((expense) => {
    const label = formatRelativeDay(expense.date);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.label === label) {
      lastGroup.items.push(expense);
    } else {
      groups.push({ label, items: [expense] });
    }
  });

  return groups;
};

export default groupExpensesByDay;
