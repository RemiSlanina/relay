import { testFunc } from "../../../domain/cards/cards.testfunc";

describe("testFunc", () => {
  it("should do add two numbers correctly", async () => {
    const result = await testFunc(2, 3);
    expect(result).toBe(5);
  });
});
