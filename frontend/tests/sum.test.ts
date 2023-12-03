import { expect, test } from "vitest";
import { sum } from "./sum";

test("The test runner system", () => {
    expect(sum(2, 2)).toBe(4);
    
})