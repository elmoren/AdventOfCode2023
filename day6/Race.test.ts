import {describe, expect, test} from '@jest/globals';
import {Race, calc_distance} from './Race';

describe('Test calc_distance', () => {
    let race: Race = {
        duration_ms: 10,
        distance_mm: 20
    };

  test('Given button held 1ms expect 0', () => {
    expect(calc_distance(0, race)).toBe(0);
  });

  test('Given button held 1ms expect 9', () => {
    expect(calc_distance(1, race)).toBe(9);
  });

  test('Given button held 10ms expect 0', () => {
    expect(calc_distance(10, race)).toBe(0);
  });

  test('Given button held greater than max expect 0', () => {
    expect(calc_distance(20, race)).toBe(0);
  });
});