import { describe, expect, it } from 'vitest';
import { generateToken } from './generateToken';

describe('Generate Token', () => {
  it('should be able generate token', () => {
    const token = generateToken();

    expect(token).toBeDefined();
    expect(token).not.toBe('');
  });

  it('should be able generate token with specifically length', () => {
    const tokenLength = 10;
    const token = generateToken(10);

    expect(token).toHaveLength(tokenLength);
  });
});
