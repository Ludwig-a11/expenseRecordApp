import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useGetExpense from './useGetExpense';

const mockNavigate = vi.fn();
const mockUseAuth = vi.fn();
const mockGetDoc = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('./../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('./../firebase/firebase.config', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: (_db, _collection, id) => ({ id }),
  getDoc: (...args) => mockGetDoc(...args),
}));

describe('useGetExpense', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGetDoc.mockClear();
    mockUseAuth.mockReturnValue({ user: { uid: 'userA' } });
  });

  it('sets the expense when it exists and belongs to the current user', async () => {
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ uidUser: 'userA', category: 'Home' }),
      id: 'expense1',
    });

    const { result } = renderHook(() => useGetExpense('expense1'));

    await waitFor(() => {
      expect(result.current[0]).not.toBe('');
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('redirects instead of exposing a document owned by another user', async () => {
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ uidUser: 'userB', category: 'Home' }),
      id: 'expense1',
    });

    renderHook(() => useGetExpense('expense1'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/list-of-expenses');
    });
  });

  it('redirects when the document does not exist (regression: exists must be called, not referenced)', async () => {
    mockGetDoc.mockResolvedValue({
      exists: () => false,
      data: () => undefined,
      id: 'missing',
    });

    renderHook(() => useGetExpense('missing'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/list-of-expenses');
    });
  });
});
