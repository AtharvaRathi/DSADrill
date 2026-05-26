export const batch4Enrichments: any = {
  "Permutation in String": {
    description: "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is a substring of s2.",
    constraints: [
      "1 <= s1.length, s2.length <= 10^4",
      "s1 and s2 consist of lowercase English letters"
    ],
    examples: [
      {
        input: "s1 = 'ab', s2 = 'eidbaooo'",
        output: "true",
        explanation: "s2 contains 'ba' which is a permutation of 'ab'."
      },
      {
        input: "s1 = 'ab', s2 = 'eidboaoo'",
        output: "false",
        explanation: "No permutation of 'ab' exists as a substring."
      }
    ],
    testCases: [
      { input: "ab\neidbaooo", expectedOutput: "true" },
      { input: "ab\neidboaoo", expectedOutput: "false" }
    ],
    hints: [
      "Use a fixed-size sliding window of length s1.length on s2",
      "Track character frequencies — if both frequency arrays match, a permutation exists"
    ],
    lineByLineExplanation: [
      {
        line: "int[] count1 = new int[26], count2 = new int[26];",
        explanation: "Two frequency arrays track character counts for s1 and the current window in s2."
      },
      {
        line: "for (int i = 0; i < s1.length(); i++) { count1[s1.charAt(i)-'a']++; count2[s2.charAt(i)-'a']++; }",
        explanation: "Initialize both frequency arrays using the first window of size s1.length."
      },
      {
        line: "if (Arrays.equals(count1, count2)) return true;",
        explanation: "Check if the initial window is already a permutation."
      },
      {
        line: "count2[s2.charAt(i) - 'a']++; count2[s2.charAt(i - s1.length()) - 'a']--;",
        explanation: "Slide the window: add the new right character and remove the old left character."
      },
      {
        line: "if (Arrays.equals(count1, count2)) return true;",
        explanation: "After each slide, check if the window is now a permutation of s1."
      }
    ]
  },
  "Minimum Window Substring": {
    description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string.",
    constraints: [
      "m == s.length, n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters"
    ],
    examples: [
      {
        input: "s = 'ADOBECODEBANC', t = 'ABC'",
        output: "BANC",
        explanation: "The minimum window substring containing A, B, C is 'BANC'."
      },
      {
        input: "s = 'a', t = 'a'",
        output: "a",
        explanation: "The whole string is the minimum window."
      },
      {
        input: "s = 'a', t = 'aa'",
        output: "",
        explanation: "t requires two a's but s only has one."
      }
    ],
    testCases: [
      { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC" },
      { input: "a\na", expectedOutput: "a" },
      { input: "a\naa", expectedOutput: "" }
    ],
    hints: [
      "Use a sliding window with two frequency maps",
      "Track 'have' vs 'need' counts — expand right until valid, then shrink left to minimize"
    ],
    lineByLineExplanation: [
      {
        line: "Map<Character, Integer> need = new HashMap<>(), window = new HashMap<>();",
        explanation: "need stores required character frequencies from t. window tracks what our current window contains."
      },
      {
        line: "int have = 0, required = need.size();",
        explanation: "have tracks how many unique characters in t are satisfied. required is the total we need."
      },
      {
        line: "if (window.get(c).equals(need.get(c))) have++;",
        explanation: "When a character's window count matches its required count, increment have."
      },
      {
        line: "while (have == required)",
        explanation: "Window is valid — try shrinking from the left to find the minimum."
      },
      {
        line: "if (right - left + 1 < minLen) { minLen = right - left + 1; minLeft = left; }",
        explanation: "Update the best window found so far."
      },
      {
        line: "if (window.get(s.charAt(left)).equals(need.get(s.charAt(left)))) have--;",
        explanation: "When shrinking makes a required character insufficient, decrement have and stop shrinking."
      }
    ]
  },
  "Sliding Window Maximum": {
    description: "You are given an array of integers nums and an integer k. There is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position, return the max value in each window.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length"
    ],
    examples: [
      {
        input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        output: "[3,3,5,5,6,7]",
        explanation: "Maximum of each window of size 3 as it slides right."
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "Single element window."
      }
    ],
    testCases: [
      { input: "[1,3,-1,-3,5,3,6,7]\n3", expectedOutput: "[3,3,5,5,6,7]" },
      { input: "[1]\n1", expectedOutput: "[1]" }
    ],
    hints: [
      "Use a monotonic deque (decreasing) that stores indices",
      "Remove from the front if the index is out of the current window",
      "Remove from the back if the current element is larger than the back"
    ],
    lineByLineExplanation: [
      {
        line: "Deque<Integer> deque = new ArrayDeque<>();",
        explanation: "The deque stores indices in decreasing order of their values. Front always holds the index of the current window maximum."
      },
      {
        line: "if (!deque.isEmpty() && deque.peekFirst() < i - k + 1) deque.pollFirst();",
        explanation: "Remove indices that have fallen out of the current window from the front."
      },
      {
        line: "while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast();",
        explanation: "Remove smaller elements from the back — they can never be the maximum while nums[i] is in the window."
      },
      {
        line: "deque.offerLast(i);",
        explanation: "Add the current index to the back of the deque."
      },
      {
        line: "if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];",
        explanation: "Once our first full window is formed, record the maximum which is always at the front of the deque."
      }
    ]
  },
  "Min Stack": {
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class with push, pop, top, and getMin methods.",
    constraints: [
      "-2^31 <= val <= 2^31 - 1",
      "Methods pop, top and getMin will always be called on non-empty stacks",
      "At most 3 * 10^4 calls will be made"
    ],
    examples: [
      {
        input: "MinStack(), push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
        output: "[-3, 0, -2]",
        explanation: "getMin returns -3, then after pop, top is 0, and getMin is now -2."
      }
    ],
    testCases: [
      { input: "push(-2) push(0) push(-3) getMin pop top getMin", expectedOutput: "-3 0 -2" }
    ],
    hints: [
      "Use two stacks — one regular stack and one min stack",
      "The min stack always tracks the current minimum at each level"
    ],
    lineByLineExplanation: [
      {
        line: "Stack<Integer> stack = new Stack<>(); Stack<Integer> minStack = new Stack<>();",
        explanation: "Two parallel stacks. minStack's top always reflects the minimum value in the main stack at that point."
      },
      {
        line: "minStack.push(Math.min(val, minStack.isEmpty() ? val : minStack.peek()));",
        explanation: "When pushing, record the minimum between new value and current minimum."
      },
      {
        line: "stack.pop(); minStack.pop();",
        explanation: "Pop both stacks together to keep them synchronized."
      },
      {
        line: "return minStack.peek();",
        explanation: "The top of minStack is always the current minimum — O(1) retrieval."
      }
    ]
  },
  "Evaluate Reverse Polish Notation": {
    description: "You are given an array of strings tokens that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer that represents the value of the expression. Valid operators are +, -, *, and /. Each operand may be an integer or another expression. Division truncates toward zero.",
    constraints: [
      "1 <= tokens.length <= 10^4",
      "tokens[i] is either an operator or an integer in range [-200, 200]"
    ],
    examples: [
      {
        input: "tokens = ['2','1','+','3','*']",
        output: "9",
        explanation: "((2+1)*3) = 9"
      },
      {
        input: "tokens = ['4','13','5','/','+']",
        output: "6",
        explanation: "(4+(13/5)) = 6"
      }
    ],
    testCases: [
      { input: "2 1 + 3 *", expectedOutput: "9" },
      { input: "4 13 5 / +", expectedOutput: "6" }
    ],
    hints: [
      "Use a stack — push numbers, pop two when you see an operator",
      "Apply the operator to the two popped numbers and push the result"
    ],
    lineByLineExplanation: [
      {
        line: "Stack<Integer> stack = new Stack<>();",
        explanation: "Stack holds operands as we process tokens left to right."
      },
      {
        line: "if (token.equals(\"+\") || token.equals(\"-\") || ...)",
        explanation: "When we see an operator, we need to pop two operands."
      },
      {
        line: "int b = stack.pop(), a = stack.pop();",
        explanation: "b is the second operand (top of stack), a is the first. Order matters for subtraction and division."
      },
      {
        line: "if (token.equals(\"+\")) stack.push(a + b);",
        explanation: "Apply the operation and push the result back."
      },
      {
        line: "else stack.push(Integer.parseInt(token));",
        explanation: "If it is a number, just push it onto the stack."
      },
      {
        line: "return stack.pop();",
        explanation: "The final remaining value on the stack is the answer."
      }
    ]
  },
  "Daily Temperatures": {
    description: "Given an array of integers temperatures representing daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0.",
    constraints: [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    examples: [
      {
        input: "temperatures = [73,74,75,71,69,72,76,73]",
        output: "[1,1,4,2,1,1,0,0]",
        explanation: "Day 0 waits 1 day (74>73). Day 2 waits 4 days (76>75)."
      },
      {
        input: "temperatures = [30,40,50,60]",
        output: "[1,1,1,0]",
        explanation: "Each day the next day is warmer."
      }
    ],
    testCases: [
      { input: "[73,74,75,71,69,72,76,73]", expectedOutput: "[1,1,4,2,1,1,0,0]" },
      { input: "[30,40,50,60]", expectedOutput: "[1,1,1,0]" }
    ],
    hints: [
      "Use a monotonic decreasing stack that stores indices",
      "When a warmer temperature is found, pop all cooler days from the stack and calculate the wait"
    ],
    lineByLineExplanation: [
      {
        line: "Stack<Integer> stack = new Stack<>(); int[] result = new int[temperatures.length];",
        explanation: "Stack stores indices of days waiting for a warmer temperature."
      },
      {
        line: "while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()])",
        explanation: "Current temperature is warmer than the day at the top of the stack — resolve that waiting day."
      },
      {
        line: "int idx = stack.pop(); result[idx] = i - idx;",
        explanation: "The wait is the difference between current index and the popped index."
      },
      {
        line: "stack.push(i);",
        explanation: "Push current day's index — it is now waiting for a future warmer day."
      }
    ]
  },
  "Car Fleet": {
    description: "There are n cars going to the same destination along a one-lane road. The destination is target miles away. You are given two integer arrays position and speed, both of length n. A car fleet is some non-empty set of cars driving at the same position and same speed. Return the number of car fleets that will arrive at the destination.",
    constraints: [
      "n == position.length == speed.length",
      "1 <= n <= 10^5",
      "0 < target <= 10^6",
      "0 <= position[i] < target",
      "All positions are unique"
    ],
    examples: [
      {
        input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
        output: "3",
        explanation: "Cars at 10 and 8 form a fleet. Car at 0 is alone. Cars at 5 and 3 form a fleet."
      }
    ],
    testCases: [
      { input: "12\n[10,8,0,5,3]\n[2,4,1,1,3]", expectedOutput: "3" }
    ],
    hints: [
      "Sort cars by starting position in descending order",
      "Calculate time to reach target for each car. If a car behind takes less or equal time, it joins the fleet ahead."
    ],
    lineByLineExplanation: [
      {
        line: "double[][] cars = new double[n][2]; // [position, time]",
        explanation: "Store each car's position and time to reach target."
      },
      {
        line: "Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));",
        explanation: "Sort by position descending — process cars from closest to target first."
      },
      {
        line: "double time = (target - cars[i][0]) / cars[i][1];",
        explanation: "Time for this car to reach target at its own speed."
      },
      {
        line: "if (time > stack.peek()) stack.push(time);",
        explanation: "If this car takes longer than the car ahead, it cannot catch up — it forms a new fleet. Otherwise it joins the fleet ahead."
      },
      {
        line: "return stack.size();",
        explanation: "Number of distinct times on the stack equals number of fleets."
      }
    ]
  },
  "Largest Rectangle in Histogram": {
    description: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    constraints: [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4"
    ],
    examples: [
      {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation: "The largest rectangle has area 10 (bars at index 2 and 3, height 5, width 2)."
      },
      {
        input: "heights = [2,4]",
        output: "4",
        explanation: "Rectangle using just bar at index 1."
      }
    ],
    testCases: [
      { input: "[2,1,5,6,2,3]", expectedOutput: "10" },
      { input: "[2,4]", expectedOutput: "4" }
    ],
    hints: [
      "Use a monotonic increasing stack",
      "When a shorter bar is found, pop taller bars and calculate the rectangle they could form"
    ],
    lineByLineExplanation: [
      {
        line: "Stack<Integer> stack = new Stack<>(); int maxArea = 0;",
        explanation: "Stack stores indices of bars in increasing height order."
      },
      {
        line: "int[] h = Arrays.copyOf(heights, heights.length + 1);",
        explanation: "Append a 0 at the end to force all remaining bars to be popped at the end."
      },
      {
        line: "while (!stack.isEmpty() && h[stack.peek()] > h[i])",
        explanation: "Current bar is shorter — pop bars that cannot extend further right."
      },
      {
        line: "int height = h[stack.pop()];",
        explanation: "This is the height of the rectangle we are calculating."
      },
      {
        line: "int width = stack.isEmpty() ? i : i - stack.peek() - 1;",
        explanation: "Width extends from after the new stack top to current index i."
      },
      {
        line: "maxArea = Math.max(maxArea, height * width);",
        explanation: "Update maximum area found."
      }
    ]
  },
  "Search a 2D Matrix": {
    description: "You are given an m x n integer matrix with the following properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix, false otherwise. Must run in O(log(m * n)) time.",
    constraints: [
      "m == matrix.length, n == matrix[i].length",
      "1 <= m, n <= 100",
      "-10^4 <= matrix[i][j], target <= 10^4"
    ],
    examples: [
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        output: "true",
        explanation: "3 is at position [0][1]."
      },
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        output: "false",
        explanation: "13 does not exist in the matrix."
      }
    ],
    testCases: [
      { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3", expectedOutput: "true" },
      { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13", expectedOutput: "false" }
    ],
    hints: [
      "Treat the 2D matrix as a flattened sorted 1D array",
      "Map mid index back to 2D: row = mid / n, col = mid % n"
    ],
    lineByLineExplanation: [
      {
        line: "int left = 0, right = m * n - 1;",
        explanation: "Treat the entire matrix as a single sorted array of m*n elements."
      },
      {
        line: "int mid = left + (right - left) / 2;",
        explanation: "Standard binary search midpoint."
      },
      {
        line: "int val = matrix[mid / n][mid % n];",
        explanation: "Convert 1D index to 2D. mid/n gives the row, mid%n gives the column."
      },
      {
        line: "if (val == target) return true;",
        explanation: "Found it."
      },
      {
        line: "else if (val < target) left = mid + 1; else right = mid - 1;",
        explanation: "Standard binary search narrowing."
      }
    ]
  },
  "Koko Eating Bananas": {
    description: "Koko loves bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses a pile and eats k bananas from it. If the pile has fewer than k bananas, she eats all of them and does not eat any more bananas during this hour. Return the minimum integer k such that she can eat all the bananas within h hours.",
    constraints: [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9",
      "1 <= piles[i] <= 10^9"
    ],
    examples: [
      {
        input: "piles = [3,6,7,11], h = 8",
        output: "4",
        explanation: "At speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 hours."
      },
      {
        input: "piles = [30,11,23,4,20], h = 5",
        output: "30",
        explanation: "Must finish in exactly 5 hours, one pile per hour minimum."
      }
    ],
    testCases: [
      { input: "[3,6,7,11]\n8", expectedOutput: "4" },
      { input: "[30,11,23,4,20]\n5", expectedOutput: "30" }
    ],
    hints: [
      "Binary search on the answer — k ranges from 1 to max(piles)",
      "For a given k, calculate total hours needed using Math.ceil(pile/k)"
    ],
    lineByLineExplanation: [
      {
        line: "int left = 1, right = Arrays.stream(piles).max().getAsInt();",
        explanation: "Search space for k is 1 (slowest) to max pile size (eat largest pile in one hour)."
      },
      {
        line: "long hours = 0; for (int pile : piles) hours += Math.ceil((double) pile / mid);",
        explanation: "Calculate total hours needed at speed mid."
      },
      {
        line: "if (hours <= h) right = mid;",
        explanation: "Speed mid works — try slower speeds to find the minimum."
      },
      {
        line: "else left = mid + 1;",
        explanation: "Too slow — need to eat faster."
      }
    ]
  },
  "Find Minimum in Rotated Sorted Array": {
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted and rotated array nums of unique elements, return the minimum element of this array. Must run in O(log n) time.",
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All integers are unique",
      "nums is sorted and rotated between 1 and n times"
    ],
    examples: [
      {
        input: "nums = [3,4,5,1,2]",
        output: "1",
        explanation: "Original array was [1,2,3,4,5] rotated 3 times."
      },
      {
        input: "nums = [4,5,6,7,0,1,2]",
        output: "0",
        explanation: "Rotated 4 times."
      }
    ],
    testCases: [
      { input: "[3,4,5,1,2]", expectedOutput: "1" },
      { input: "[4,5,6,7,0,1,2]", expectedOutput: "0" },
      { input: "[1]", expectedOutput: "1" }
    ],
    hints: [
      "The minimum is at the rotation point",
      "If nums[mid] > nums[right], the minimum is in the right half. Otherwise it is in the left half including mid."
    ],
    lineByLineExplanation: [
      {
        line: "int left = 0, right = nums.length - 1;",
        explanation: "Binary search on the full array."
      },
      {
        line: "if (nums[mid] > nums[right]) left = mid + 1;",
        explanation: "Mid is in the larger left portion — minimum must be to the right."
      },
      {
        line: "else right = mid;",
        explanation: "Mid could be the minimum or it is in the right sorted portion — search left including mid."
      },
      {
        line: "return nums[left];",
        explanation: "When left equals right, we have found the minimum."
      }
    ]
  },
  "Search in Rotated Sorted Array": {
    description: "Given the integer array nums sorted in ascending order with distinct values, and possibly rotated at an unknown pivot index, and an integer target, return the index of target if it is in nums, or -1 if it is not.",
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values are unique",
      "nums is an ascending array possibly rotated"
    ],
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
        explanation: "0 is at index 4."
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1",
        explanation: "3 is not in the array."
      }
    ],
    testCases: [
      { input: "[4,5,6,7,0,1,2]\n0", expectedOutput: "4" },
      { input: "[4,5,6,7,0,1,2]\n3", expectedOutput: "-1" }
    ],
    hints: [
      "At every mid point, one half is always sorted",
      "Determine which half is sorted and check if target falls within it"
    ],
    lineByLineExplanation: [
      {
        line: "if (nums[left] <= nums[mid])",
        explanation: "Left half is sorted."
      },
      {
        line: "if (nums[left] <= target && target < nums[mid]) right = mid - 1;",
        explanation: "Target is within the sorted left half — search there."
      },
      {
        line: "else left = mid + 1;",
        explanation: "Target is in the unsorted right half."
      },
      {
        line: "else if (nums[mid] < target && target <= nums[right]) left = mid + 1;",
        explanation: "Right half is sorted and target falls within it."
      },
      {
        line: "else right = mid - 1;",
        explanation: "Target is in the unsorted left half."
      }
    ]
  }
};
