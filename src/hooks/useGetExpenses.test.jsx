import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import useGetExpenses from './useGetExpenses';

const mockUseAuth = vi.fn();
const mockGetDocs = vi.fn();
const mockWhere = vi.fn((...args) => ({ type: 'where', args }));

vi.mock('./../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('./../firebase/firebase.config', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  collection: (_db, name) => ({ type: 'collection', name }),
  query: (...args) => ({ type: 'query', args }),
  orderBy: (...args) => ({ type: 'orderBy', args }),
  where: (...args) => mockWhere(...args),
  limit: (...args) => ({ type: 'limit', args }),
  startAfter: (...args) => ({ type: 'startAfter', args }),
  getDocs: (...args) => mockGetDocs(...args),
}));

const fakeSnapshot = (docs) => ({
  docs: docs.map((data) => ({
    id: data.id,
    data: () => data,
  })),
});

describe('useGetExpenses', () => {
  beforeEach(() => {
    mockWhere.mockClear();
    mockGetDocs.mockReset();
    mockUseAuth.mockReturnValue({ user: { uid: 'userA' } });
  });

  it('always filters the query by the current user uid', async () => {
    mockGetDocs.mockResolvedValue(fakeSnapshot([{ id: '1', uidUser: 'userA', amount: 10 }]));

    renderHook(() => useGetExpenses());

    await waitFor(() => {
      expect(mockGetDocs).toHaveBeenCalled();
    });

    expect(mockWhere).toHaveBeenCalledWith('uidUser', '==', 'userA');
  });

  it('exposes the expenses returned for the current user', async () => {
    mockGetDocs.mockResolvedValue(
      fakeSnapshot([
        { id: '1', uidUser: 'userA', amount: 10 },
        { id: '2', uidUser: 'userA', amount: 20 },
      ])
    );

    const { result } = renderHook(() => useGetExpenses());

    await waitFor(() => {
      expect(result.current[0]).toHaveLength(2);
    });

    expect(result.current[0].map((e) => e.id)).toEqual(['1', '2']);
  });

  it('removeExpenseFromState removes only the targeted expense', async () => {
    mockGetDocs.mockResolvedValue(
      fakeSnapshot([
        { id: '1', uidUser: 'userA', amount: 10 },
        { id: '2', uidUser: 'userA', amount: 20 },
      ])
    );

    const { result } = renderHook(() => useGetExpenses());

    await waitFor(() => {
      expect(result.current[0]).toHaveLength(2);
    });

    act(() => {
      result.current[3]('1');
    });

    expect(result.current[0].map((e) => e.id)).toEqual(['2']);
  });

  it('does not query at all when there is no authenticated user', () => {
    mockUseAuth.mockReturnValue({ user: null });

    renderHook(() => useGetExpenses());

    expect(mockGetDocs).not.toHaveBeenCalled();
  });
});
