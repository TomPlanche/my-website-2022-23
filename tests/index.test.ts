/**
 * @file tests/index.test.ts
 * @description Tests for my utils functions.
 */
import {describe, expect, test} from '@jest/globals';

import {
  calcCssVar
} from "../src/assets/utils";

describe("Test of 'calcCssValue' function", () => {
  test("Test 1 - 5rem * 2", () => {
    expect(calcCssVar("5rem", (v: number) => v * 2)).toBe("10rem");
  })

  test("Test 2 - 5rem / 2", () => {
    expect(calcCssVar("5rem", (v: number) => v / 2)).toBe("2.5rem");
  })

  test("Test 3 - 5rem + 2", () => {
    expect(calcCssVar("5rem", (v: number) => v + 2)).toBe("7rem");
  });

  test("Test 4 - 5rem - 2", () => {
    expect(calcCssVar("5rem", (v: number) => v - 2)).toBe("3rem");
  })

  test("Test 5 - .5rem * 2", () => {
    expect(calcCssVar(".5rem", (v: number) => v * 2)).toBe("1rem");
  });

  test("Test 6 - .5rem / 2", () => {
    expect(calcCssVar(".5rem", (v: number) => v / 2)).toBe("0.25rem");
  });
});

