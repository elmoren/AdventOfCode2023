import {describe, expect, test} from '@jest/globals';
import { CamelHand } from './CamelHand';
import { BaseRules } from './CamelPoker';

let rules = new BaseRules();

describe('Verify Hand Scoring', () => {

    let tests: {[key: string]: string} = {
        "23456": "00203040506",
        "23452": "10203040502",
        "23552": "20203050502",
        "AAA52": "31414140502",
        "88AAA": "40808141414",
        "2QQQQ": "50212121212",
        "88888": "60808080808"
    };

    Object.keys(tests).forEach(k => {
        test(`Given hand '${k}, expect score is ${tests[k]}`, () => {
            expect(rules.calcRank(k.split(''))).toBe(tests[k]);
        })
    });

})

interface HandCompareTest {
    descr: string,
    a: CamelHand,
    b: CamelHand,
    compareResult: number
}

function makeTest(descr: string, a: string, b: string, result: number): HandCompareTest {
    return {
        descr: descr,
        a: new CamelHand(a, 0, rules.calcRank(a.split(''))),
        b: new CamelHand(b, 0, rules.calcRank(b.split(''))),
        compareResult: result
    }
}

describe('Verify Hand Comparison', () => {
    let tests: HandCompareTest[] = [
        makeTest("Equal Hands", "55872", "55872", 0),
        makeTest("Hand A rank better than B rank", "55572", "AA872", 1),
        makeTest("Hand A rank worse than B rank", "55872", "QQAAA", -1),
        makeTest("Equal ranks, a better second ordering", "A8A8K", "A8A8J", 1),
        makeTest("Equal ranks, b better second ordering", "2AAAA", "33332", -1),
    ];

    tests.forEach(t => {
        test(`Given '${t.descr}', compared ${t.a} to ${t.b} is ${t.compareResult}`, () => {
            expect(t.a.compareTo(t.b)).toBe(t.compareResult);
        })
    });
})