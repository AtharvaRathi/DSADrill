export const batch11Enrichments: any = {
  "Reverse Integer": {
    description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    examples: [
      { input: "x = 123", output: "321", explanation: "Standard positive reversal." },
      { input: "x = -123", output: "-321", explanation: "Standard negative reversal." },
      { input: "x = 120", output: "21", explanation: "Trailing zeros are dropped." }
    ],
    testCases: [{ input: "123", expectedOutput: "321" }, { input: "-123", expectedOutput: "-321" }],
    hints: ["Pop the last digit using x % 10", "Push the digit to the result using res * 10 + pop", "Check for overflow BEFORE pushing the digit"],
    lineByLineExplanation: [
      { line: "int res = 0;", explanation: "Result variable." },
      { line: "while (x != 0)", explanation: "Works for both positive and negative numbers in Java." },
      { line: "int pop = x % 10; x /= 10;", explanation: "Extract the last digit and reduce x." },
      { line: "if (res > Integer.MAX_VALUE/10 || (res == Integer.MAX_VALUE / 10 && pop > 7)) return 0;", explanation: "Check positive overflow before multiplying." },
      { line: "if (res < Integer.MIN_VALUE/10 || (res == Integer.MIN_VALUE / 10 && pop < -8)) return 0;", explanation: "Check negative overflow." },
      { line: "res = res * 10 + pop;", explanation: "Append digit." },
      { line: "return res;", explanation: "Return successfully reversed integer." }
    ]
  }
};
