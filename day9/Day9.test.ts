import { describe, expect, test } from '@jest/globals';
import { SensorData } from './SensorData';
import { inspect } from 'util';

describe('Verify example cases.', () => {

    const cases = [
        {
            input: [1, 3, 6, 10, 15, 21],
            expect: 28
        },
        {
            input: [10, 13, 16, 21, 30, 45],
            expect: 68
        }
    ];

    cases.forEach(c => {
        test('Expected value', () => {
            expect(new SensorData(c.input).getResult()).toBe(c.expect)
        }
    )
    })

})