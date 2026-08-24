import { describe, it, expect } from 'vitest';
import getPercentChange from './getPercentChange';

describe('getPercentChange', () => {
  it('returns a positive percentage when the amount increased', () => {
    expect(getPercentChange(120, 100)).toBe(20);
  });

  it('returns a negative percentage when the amount decreased', () => {
    expect(getPercentChange(80, 100)).toBe(-20);
  });

  it('returns null when there is no previous amount to compare against', () => {
    expect(getPercentChange(50, 0)).toBeNull();
  });

  it('returns null when the previous amount is not provided', () => {
    expect(getPercentChange(50, undefined)).toBeNull();
  });

  it('treats missing current amount as zero', () => {
    expect(getPercentChange(undefined, 100)).toBe(-100);
  });
});
