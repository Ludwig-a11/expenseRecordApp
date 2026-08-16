import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogIn from './LogIn';

const mockNavigate = vi.fn();
const mockSignIn = vi.fn();
const mockSendPasswordResetEmail = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: (...args) => mockSignIn(...args),
  sendPasswordResetEmail: (...args) => mockSendPasswordResetEmail(...args),
}));

vi.mock('./../firebase/firebase.config', () => ({
  auth: {},
}));

describe('LogIn', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockSignIn.mockClear();
    mockSendPasswordResetEmail.mockClear();
  });

  it('shows an error and does not call Firebase when the email is invalid', async () => {
    const user = userEvent.setup();
    render(<LogIn />);

    await user.type(screen.getByPlaceholderText('you@email.com'), 'not-an-email');

    // The native type="email" input blocks a click-triggered submit before
    // React ever sees it (jsdom enforces HTML5 constraint validation), so
    // dispatch the submit event directly to exercise the app's own regex
    // check instead of the browser's built-in one.
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }).closest('form'));

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it('asks for an email before sending a reset link', async () => {
    const user = userEvent.setup();
    render(<LogIn />);

    await user.click(screen.getByRole('button', { name: /forgot your password/i }));

    expect(await screen.findByText(/enter your email above first/i)).toBeInTheDocument();
    expect(mockSendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it('sends a reset email and warns the user to check spam', async () => {
    mockSendPasswordResetEmail.mockResolvedValue();
    const user = userEvent.setup();
    render(<LogIn />);

    await user.type(screen.getByPlaceholderText('you@email.com'), 'user@example.com');
    await user.click(screen.getByRole('button', { name: /forgot your password/i }));

    await waitFor(() => expect(mockSendPasswordResetEmail).toHaveBeenCalledWith({}, 'user@example.com'));
    expect(await screen.findByText(/spam\/junk folder/i)).toBeInTheDocument();
  });
});
