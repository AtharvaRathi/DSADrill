export const batch6Enrichments: any = {
  "Jump Game": {
    description: "You are given an integer array nums. You are initially positioned at the first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 10^5"
    ],
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation: "Jump 1 from index 0 to 1, then 3 to the last index."
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation: "Always reach index 3 with value 0, stuck."
      }
    ],
    testCases: [
      { input: "[2,3,1,1,4]", expectedOutput: "true" },
      { input: "[3,2,1,0,4]", expectedOutput: "false" }
    ],
    hints: [
      "Track the farthest index reachable at each step",
      "If current index exceeds farthest reachable, return false"
    ],
    lineByLineExplanation: [
      {
        line: "int maxReach = 0;",
        explanation: "Track the farthest index we can currently reach."
      },
      {
        line: "for (int i = 0; i < nums.length; i++)",
        explanation: "Visit each index."
      },
      {
        line: "if (i > maxReach) return false;",
        explanation: "Current index is beyond what we can reach — stuck."
      },
      {
        line: "maxReach = Math.max(maxReach, i + nums[i]);",
        explanation: "Update the farthest reachable index from here."
      },
      {
        line: "return true;",
        explanation: "Successfully iterated through all reachable positions."
      }
    ]
  },
  "Merge Intervals": {
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "[1,3] and [2,6] overlap so merge to [1,6]."
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Touching intervals merge."
      }
    ],
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]" },
      { input: "[[1,4],[4,5]]", expectedOutput: "[[1,5]]" }
    ],
    hints: [
      "Sort by start time first",
      "For each interval, if it overlaps with the last merged interval, extend it. Otherwise add new."
    ],
    lineByLineExplanation: [
      {
        line: "Arrays.sort(intervals, (a, b) -> a[0] - b[0]);",
        explanation: "Sort by start time so overlapping intervals are adjacent."
      },
      {
        line: "int[] last = result.get(result.size() - 1);",
        explanation: "Get the last merged interval to compare against."
      },
      {
        line: "if (interval[0] <= last[1]) last[1] = Math.max(last[1], interval[1]);",
        explanation: "Overlap detected — extend the end of the last interval."
      },
      {
        line: "else result.add(interval);",
        explanation: "No overlap — this is a new distinct interval."
      }
    ]
  },
  "Rotate Image": {
    description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. Do not allocate another 2D matrix and do the rotation.",
    constraints: [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[[7,4,1],[8,5,2],[9,6,3]]",
        explanation: "90 degree clockwise rotation."
      }
    ],
    testCases: [
      { input: "[[1,2,3],[4,5,6],[7,8,9]]", expectedOutput: "[[7,4,1],[8,5,2],[9,6,3]]" }
    ],
    hints: [
      "Transpose the matrix first (swap matrix[i][j] with matrix[j][i])",
      "Then reverse each row"
    ],
    lineByLineExplanation: [
      {
        line: "for (int i = 0; i < n; i++) for (int j = i+1; j < n; j++) { int tmp = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = tmp; }",
        explanation: "Transpose: swap element at (i,j) with element at (j,i) for all i < j."
      },
      {
        line: "for (int i = 0; i < n; i++) { int l = 0, r = n-1; while (l < r) { int tmp = matrix[i][l]; matrix[i][l++] = matrix[i][r]; matrix[i][r--] = tmp; } }",
        explanation: "Reverse each row. Together with transpose, this achieves a 90-degree clockwise rotation."
      }
    ]
  },
  "Single Number": {
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.",
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Every element appears twice except for exactly one element"
    ],
    examples: [
      {
        input: "nums = [2,2,1]",
        output: "1",
        explanation: "1 appears only once."
      },
      {
        input: "nums = [4,1,2,1,2]",
        output: "4",
        explanation: "4 appears only once."
      }
    ],
    testCases: [
      { input: "[2,2,1]", expectedOutput: "1" },
      { input: "[4,1,2,1,2]", expectedOutput: "4" },
      { input: "[1]", expectedOutput: "1" }
    ],
    hints: [
      "XOR of a number with itself is 0",
      "XOR all numbers together — pairs cancel out, leaving the single number"
    ],
    lineByLineExplanation: [
      {
        line: "int result = 0;",
        explanation: "Start with 0 since XOR with 0 returns the number itself."
      },
      {
        line: "for (int num : nums) result ^= num;",
        explanation: "XOR every number. Duplicates cancel (a XOR a = 0). Only the unique number remains."
      },
      {
        line: "return result;",
        explanation: "The accumulated XOR is the single non-duplicate number."
      }
    ]
  },
  "Missing Number": {
    description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    constraints: [
      "n == nums.length",
      "1 <= n <= 10^4",
      "0 <= nums[i] <= n",
      "All numbers are distinct"
    ],
    examples: [
      {
        input: "nums = [3,0,1]",
        output: "2",
        explanation: "n=3, range [0,3], missing is 2."
      },
      {
        input: "nums = [0,1]",
        output: "2",
        explanation: "n=2, range [0,2], missing is 2."
      }
    ],
    testCases: [
      { input: "[3,0,1]", expectedOutput: "2" },
      { input: "[0,1]", expectedOutput: "2" },
      { input: "[9,6,4,2,3,5,7,0,1]", expectedOutput: "8" }
    ],
    hints: [
      "Expected sum of [0..n] is n*(n+1)/2",
      "Subtract actual sum from expected sum to find the missing number"
    ],
    lineByLineExplanation: [
      {
        line: "int n = nums.length;",
        explanation: "n is both the array length and the upper bound of the range."
      },
      {
        line: "int expected = n * (n + 1) / 2;",
        explanation: "Gauss formula for sum of 0 through n."
      },
      {
        line: "int actual = 0; for (int num : nums) actual += num;",
        explanation: "Sum all numbers actually present in the array."
      },
      {
        line: "return expected - actual;",
        explanation: "The difference is the missing number."
      }
    ]
  },
  "Number of 1 Bits": {
    description: "Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).",
    constraints: [
      "1 <= n <= 2^31 - 1"
    ],
    examples: [
      {
        input: "n = 11 (binary: 00000000000000000000000000001011)",
        output: "3",
        explanation: "Three bits are set."
      },
      {
        input: "n = 128 (binary: 00000000000000000000000010000000)",
        output: "1",
        explanation: "One bit is set."
      }
    ],
    testCases: [
      { input: "11", expectedOutput: "3" },
      { input: "128", expectedOutput: "1" }
    ],
    hints: [
      "Use n & 1 to check the last bit, then right shift",
      "Or use n & (n-1) trick to clear the lowest set bit each iteration"
    ],
    lineByLineExplanation: [
      {
        line: "int count = 0;",
        explanation: "Counter for set bits."
      },
      {
        line: "while (n != 0)",
        explanation: "Process until no bits remain."
      },
      {
        line: "count += (n & 1);",
        explanation: "Check if the least significant bit is set."
      },
      {
        line: "n >>>= 1;",
        explanation: "Unsigned right shift — move to the next bit. Use >>> to handle Java's signed integers correctly."
      }
    ]
  },
  "Reverse Bits": {
    description: "Reverse bits of a given 32 bits unsigned integer.",
    constraints: [
      "The input must be a binary string of length 32"
    ],
    examples: [
      {
        input: "n = 43261596 (binary: 00000010100101000001111010011100)",
        output: "964176192 (binary: 00111001011110000010100101000000)",
        explanation: "Bits reversed."
      }
    ],
    testCases: [
      { input: "43261596", expectedOutput: "964176192" }
    ],
    hints: [
      "Process bit by bit — extract the last bit of n and append it to result",
      "Left shift result by 1 each time, right shift n by 1"
    ],
    lineByLineExplanation: [
      {
        line: "int result = 0;",
        explanation: "Will hold the reversed bits."
      },
      {
        line: "for (int i = 0; i < 32; i++)",
        explanation: "Process all 32 bits."
      },
      {
        line: "result = (result << 1) | (n & 1);",
        explanation: "Shift result left to make room, then append the last bit of n."
      },
      {
        line: "n >>>= 1;",
        explanation: "Remove the processed bit from n."
      }
    ]
  },
  "Counting Bits": {
    description: "Given an integer n, return an array ans of length n+1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    constraints: [
      "0 <= n <= 10^5"
    ],
    examples: [
      {
        input: "n = 2",
        output: "[0,1,1]",
        explanation: "0 has 0 ones, 1 has 1 one, 2 has 1 one."
      },
      {
        input: "n = 5",
        output: "[0,1,1,2,1,2]",
        explanation: "Bit counts for 0 through 5."
      }
    ],
    testCases: [
      { input: "2", expectedOutput: "[0,1,1]" },
      { input: "5", expectedOutput: "[0,1,1,2,1,2]" }
    ],
    hints: [
      "dp[i] = dp[i >> 1] + (i & 1)",
      "Right shift drops the last bit — use the already computed count for that"
    ],
    lineByLineExplanation: [
      {
        line: "int[] dp = new int[n + 1];",
        explanation: "dp[i] will store the number of set bits in i."
      },
      {
        line: "for (int i = 1; i <= n; i++)",
        explanation: "Build answers from 1 to n using previously computed values."
      },
      {
        line: "dp[i] = dp[i >> 1] + (i & 1);",
        explanation: "i >> 1 is i with last bit removed. dp[i>>1] already computed. Add 1 if last bit of i is set."
      }
    ]
  },
  "Insert Interval": {
    description: "You are given an array of non-overlapping intervals intervals sorted in ascending order by start time and a new interval newInterval. Insert newInterval into intervals such that intervals is still sorted and non-overlapping (merge if necessary).",
    constraints: [
      "0 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^5",
      "newInterval.length == 2"
    ],
    examples: [
      {
        input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        output: "[[1,5],[6,9]]",
        explanation: "[2,5] overlaps [1,3] so merge to [1,5]."
      },
      {
        input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        output: "[[1,2],[3,10],[12,16]]",
        explanation: "[4,8] overlaps [3,5],[6,7],[8,10]."
      }
    ],
    testCases: [
      { input: "[[1,3],[6,9]]\n[2,5]", expectedOutput: "[[1,5],[6,9]]" },
      { input: "[[1,2],[3,5],[6,7],[8,10],[12,16]]\n[4,8]", expectedOutput: "[[1,2],[3,10],[12,16]]" }
    ],
    hints: [
      "Add all intervals that end before newInterval starts",
      "Merge all overlapping intervals, then add the rest"
    ],
    lineByLineExplanation: [
      {
        line: "while (i < n && intervals[i][1] < newInterval[0]) result.add(intervals[i++]);",
        explanation: "Add all intervals completely before the new one (end < new start)."
      },
      {
        line: "while (i < n && intervals[i][0] <= newInterval[1])",
        explanation: "Merge all overlapping intervals into newInterval."
      },
      {
        line: "newInterval[0] = Math.min(newInterval[0], intervals[i][0]); newInterval[1] = Math.max(newInterval[1], intervals[i++][1]);",
        explanation: "Expand newInterval to cover the overlapping interval."
      },
      {
        line: "result.add(newInterval);",
        explanation: "Add the merged interval."
      },
      {
        line: "while (i < n) result.add(intervals[i++]);",
        explanation: "Add all remaining non-overlapping intervals after the new one."
      }
    ]
  },
  "Happy Number": {
    description: "Write an algorithm to determine if a number n is happy. A happy number is defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat until the number equals 1 (happy) or loops endlessly in a cycle that does not include 1 (not happy). Return true if n is happy.",
    constraints: [
      "1 <= n <= 2^31 - 1"
    ],
    examples: [
      {
        input: "n = 19",
        output: "true",
        explanation: "1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0 + 0 = 1."
      },
      {
        input: "n = 2",
        output: "false",
        explanation: "2 eventually enters a cycle that never reaches 1."
      }
    ],
    testCases: [
      { input: "19", expectedOutput: "true" },
      { input: "2", expectedOutput: "false" }
    ],
    hints: [
      "Detect cycle using Floyd's or a HashSet",
      "If we reach 1 it is happy; if we repeat a number it is not happy"
    ],
    lineByLineExplanation: [
      {
        line: "Set<Integer> seen = new HashSet<>();",
        explanation: "Track all numbers we have visited to detect cycles."
      },
      {
        line: "while (n != 1 && !seen.contains(n))",
        explanation: "Continue until we hit 1 (happy) or repeat a number (cycle)."
      },
      {
        line: "seen.add(n); n = sumOfSquares(n);",
        explanation: "Record current number then compute next."
      },
      {
        line: "int sum = 0; while (n > 0) { int d = n % 10; sum += d*d; n /= 10; } return sum;",
        explanation: "Extract each digit, square it, and sum them up."
      },
      {
        line: "return n == 1;",
        explanation: "If loop ended because n==1, it is happy. Otherwise a cycle was found."
      }
    ]
  }
};
