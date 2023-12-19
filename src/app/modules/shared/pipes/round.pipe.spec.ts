import { RoundPipe } from './round.pipe';

describe('RoundPipe', () => {
  let pipe: RoundPipe;

  beforeEach(() => {
    pipe = new RoundPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should round a number to 0 decimal places by default', () => {
    expect(pipe.transform(123.456)).toBe(123);
    expect(pipe.transform(123.556)).toBe(124); // Testing rounding up
  });

  it('should round a number to specified decimal places', () => {
    expect(pipe.transform(123.456, 1)).toBe(123.5);
    expect(pipe.transform(123.444, 2)).toBe(123.44);
  });

  it('should handle large numbers correctly', () => {
    expect(pipe.transform(123456789.98765, 3)).toBe(123456789.988);
  });

  it('should handle negative numbers correctly', () => {
    expect(pipe.transform(-123.456, 1)).toBe(-123.5);
  });

  it('should not change already rounded numbers', () => {
    expect(pipe.transform(100, 2)).toBe(100);
  });
});
