import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseForm from './ExpenseForm';

const mockNavigate = vi.fn();
const mockAddExpense = vi.fn();
const mockEditExpense = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('./../context/AuthContext', () => ({
  useAuth: () => ({ user: { uid: 'userA' } }),
}));

vi.mock('./../firebase/addExpense', () => ({
  default: (...args) => mockAddExpense(...args),
}));

vi.mock('./../firebase/editExpense', () => ({
  default: (...args) => mockEditExpense(...args),
}));

describe('ExpenseForm', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockAddExpense.mockClear();
    mockEditExpense.mockClear();
  });

  it('shows a validation error and does not submit when fields are empty', async () => {
    const user = userEvent.setup();
    render(<ExpenseForm />);

    await user.click(screen.getByRole('button', { name: /add expense/i }));

    expect(await screen.findByText(/fill in all the fields/i)).toBeInTheDocument();
    expect(mockAddExpense).not.toHaveBeenCalled();
  });

  it('submits a new expense with the current user uid', async () => {
    mockAddExpense.mockResolvedValue();
    const user = userEvent.setup();
    render(<ExpenseForm />);

    await user.type(screen.getByPlaceholderText(/weekly groceries/i), 'Coffee');
    await user.type(screen.getByPlaceholderText('$0.00'), '4.5');
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    await waitFor(() => expect(mockAddExpense).toHaveBeenCalledTimes(1));
    expect(mockAddExpense).toHaveBeenCalledWith(
      expect.objectContaining({ uidUser: 'userA', description: 'Coffee' })
    );
  });

  it('disables the submit button while a request is in flight to prevent double-submit', async () => {
    let resolveAddExpense;
    mockAddExpense.mockReturnValue(
      new Promise((resolve) => {
        resolveAddExpense = resolve;
      })
    );

    const user = userEvent.setup();
    render(<ExpenseForm />);

    await user.type(screen.getByPlaceholderText(/weekly groceries/i), 'Coffee');
    await user.type(screen.getByPlaceholderText('$0.00'), '4.5');

    const submitButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(mockAddExpense).toHaveBeenCalledTimes(1);

    resolveAddExpense();
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });
});
