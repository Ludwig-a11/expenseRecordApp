import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Budget from './Budget';

const mockSaveBudget = vi.fn();
let mockUseBudgetReturn;

vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

vi.mock('./../context/BudgetContext', () => ({
  useBudget: () => mockUseBudgetReturn,
}));

describe('Budget', () => {
  beforeEach(() => {
    mockSaveBudget.mockClear();
    mockUseBudgetReturn = {
      budget: null,
      loading: false,
      periodLabel: 'August 2026',
      spent: 0,
      remaining: 0,
      percentUsed: 0,
      isOverBudget: false,
      saveBudget: mockSaveBudget,
      clearBudget: vi.fn(),
    };
  });

  it('shows an empty state when no budget has been set yet', () => {
    render(<Budget />);
    expect(screen.getByText(/no budget set yet/i)).toBeInTheDocument();
  });

  it('shows a validation error and does not save when the amount is empty', async () => {
    const user = userEvent.setup();
    render(<Budget />);

    await user.click(screen.getByRole('button', { name: /set budget/i }));

    expect(await screen.findByText(/enter a valid budget amount/i)).toBeInTheDocument();
    expect(mockSaveBudget).not.toHaveBeenCalled();
  });

  it('saves a global budget amount with the selected period type', async () => {
    mockSaveBudget.mockResolvedValue();
    const user = userEvent.setup();
    render(<Budget />);

    await user.click(screen.getByRole('button', { name: /biweekly/i }));
    await user.type(screen.getByPlaceholderText('$0.00'), '500');
    await user.click(screen.getByRole('button', { name: /set budget/i }));

    await waitFor(() => expect(mockSaveBudget).toHaveBeenCalledTimes(1));
    expect(mockSaveBudget).toHaveBeenCalledWith({ periodType: 'biweekly', amount: 500 });
  });

  it('renders spent/remaining progress when a budget already exists', () => {
    mockUseBudgetReturn = {
      ...mockUseBudgetReturn,
      budget: { periodType: 'monthly', amount: 1000 },
      spent: 400,
      remaining: 600,
      percentUsed: 40,
    };

    render(<Budget />);

    expect(screen.getByText('$400.00')).toBeInTheDocument();
    expect(screen.getByText('$600.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });
});
