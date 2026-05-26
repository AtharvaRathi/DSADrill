export const batch2Enrichments: any = {
  "Valid Palindrome": {
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.",
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters"
    ],
    examples: [
      {
        input: "s = 'A man, a plan, a canal: Panama'",
        output: "true",
        explanation: "After cleaning: 'amanaplanacanalpanama' which is a palindrome."
      },
      {
        input: "s = 'race a car'",
        output: "false",
        explanation: "After cleaning: 'raceacar' which is not a palindrome."
      }
    ],
    testCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "true" },
      { input: "race a car", expectedOutput: "false" },
      { input: " ", expectedOutput: "true" }
    ],
    hints: [
      "Use two pointers — one from the left and one from the right",
      "Skip non-alphanumeric characters using Character.isLetterOrDigit()"
    ],
    lineByLineExplanation: [
      {
        line: "int left = 0, right = s.length() - 1;",
        explanation: "We start two pointers at opposite ends of the string and move them toward each other."
      },
      {
        line: "while (!Character.isLetterOrDigit(s.charAt(left))) left++;",
        explanation: "We skip any non-alphanumeric characters from the left (spaces, punctuation, etc.)."
      },
      {
        line: "while (!Character.isLetterOrDigit(s.charAt(right))) right--;",
        explanation: "Similarly skip non-alphanumeric characters from the right."
      },
      {
        line: "if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;",
        explanation: "We compare both characters case-insensitively. If they differ, it is not a palindrome."
      },
      {
        line: "left++; right--;",
        explanation: "Move both pointers inward to check the next pair of characters."
      }
    ]
  },
  "Two Sum II - Input Array Is Sorted": {
    description: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2]. The tests are generated such that there is exactly one solution. You may not use the same element twice. Your solution must use only constant extra space.",
    constraints: [
      "2 <= numbers.length <= 3 * 10^4",
      "-1000 <= numbers[i] <= 1000",
      "-1000 <= target <= 1000",
      "Exactly one valid answer exists"
    ],
    examples: [
      {
        input: "numbers = [2,7,11,15], target = 9",
        output: "[1,2]",
        explanation: "2 + 7 = 9. index1 = 1, index2 = 2. Return [1,2]."
      },
      {
        input: "numbers = [2,3,4], target = 6",
        output: "[1,3]",
        explanation: "2 + 4 = 6."
      }
    ],
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[1,2]" },
      { input: "[2,3,4]\n6", expectedOutput: "[1,3]" }
    ],
    hints: [
      "The array is sorted — use this to your advantage with two pointers",
      "If the sum is too big, move the right pointer left. If too small, move left pointer right."
    ],
    lineByLineExplanation: [
      {
        line: "int left = 0, right = numbers.length - 1;",
        explanation: "Start pointers at both ends of the sorted array."
      },
      {
        line: "int sum = numbers[left] + numbers[right];",
        explanation: "Calculate the sum of the two pointer values."
      },
      {
        line: "if (sum == target) return new int[]{left + 1, right + 1};",
        explanation: "Found the pair. Add 1 to convert from 0-indexed to 1-indexed."
      },
      {
        line: "else if (sum < target) left++;",
        explanation: "Sum is too small. Moving left pointer right increases the sum since array is sorted."
      },
      {
        line: "else right--;",
        explanation: "Sum is too large. Moving right pointer left decreases the sum."
      }
    ]
  },
  "3Sum": {
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "The distinct triplets that sum to zero."
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "No triplet sums to zero."
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
        explanation: "Only one valid triplet."
      }
    ],
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[0,0,0]", expectedOutput: "[[0,0,0]]" }
    ],
    hints: [
      "Sort the array first — this makes duplicate handling easy",
      "Fix one element and use two pointers on the rest of the array",
      "Skip duplicate values to avoid duplicate triplets in the output"
    ],
    lineByLineExplanation: [
      {
        line: "Arrays.sort(nums);",
        explanation: "Sorting is essential. It lets us use two pointers and easily skip duplicates."
      },
      {
        line: "for (int i = 0; i < nums.length - 2; i++)",
        explanation: "We fix the first element of the triplet and find the other two using two pointers."
      },
      {
        line: "if (i > 0 && nums[i] == nums[i-1]) continue;",
        explanation: "Skip duplicate values for the fixed element to avoid adding the same triplet twice."
      },
      {
        line: "int left = i + 1, right = nums.length - 1;",
        explanation: "Set two pointers on the remaining subarray after position i."
      },
      {
        line: "int sum = nums[i] + nums[left] + nums[right];",
        explanation: "Calculate sum of current triplet."
      },
      {
        line: "while (left < right && nums[left] == nums[left+1]) left++;",
        explanation: "After finding a valid triplet, skip duplicate left values before moving pointers."
      }
    ]
  },
  "Container With Most Water": {
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "Lines at index 1 (height 8) and index 8 (height 7). Width = 7, min height = 7. Area = 49."
      },
      {
        input: "height = [1,1]",
        output: "1",
        explanation: "Only two lines. Area = 1 * min(1,1) = 1."
      }
    ],
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
      { input: "[1,1]", expectedOutput: "1" }
    ],
    hints: [
      "Area = width * min(left height, right height)",
      "Use two pointers. Always move the pointer with the shorter height inward — moving the taller one can only decrease area."
    ],
    lineByLineExplanation: [
      {
        line: "int left = 0, right = height.length - 1, maxWater = 0;",
        explanation: "Start pointers at the widest possible container."
      },
      {
        line: "int water = Math.min(height[left], height[right]) * (right - left);",
        explanation: "Water is limited by the shorter wall. Width is the distance between pointers."
      },
      {
        line: "maxWater = Math.max(maxWater, water);",
        explanation: "Track the maximum water seen so far."
      },
      {
        line: "if (height[left] < height[right]) left++; else right--;",
        explanation: "Move the shorter pointer inward. Moving the taller pointer would only reduce the width without gaining height — guaranteed to reduce area."
      }
    ]
  },
  "Trapping Rain Water": {
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "6 units of water are trapped between the bars."
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
        explanation: "9 units of water are trapped."
      }
    ],
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" },
      { input: "[4,2,0,3,2,5]", expectedOutput: "9" }
    ],
    hints: [
      "Water at any index = min(maxLeft, maxRight) - height[index]",
      "Use two pointers with running max from each side to avoid the O(n) space of precomputing max arrays"
    ],
    lineByLineExplanation: [
      {
        line: "int left = 0, right = height.length - 1;",
        explanation: "Two pointers start at opposite ends."
      },
      {
        line: "int leftMax = 0, rightMax = 0, water = 0;",
        explanation: "Track the highest bar seen from each side and accumulate total water."
      },
      {
        line: "if (leftMax <= rightMax)",
        explanation: "We process from whichever side has the smaller max. This is safe because water is bounded by the minimum of the two sides."
      },
      {
        line: "leftMax = Math.max(leftMax, height[left]);",
        explanation: "Update the max height seen from the left."
      },
      {
        line: "water += leftMax - height[left]; left++;",
        explanation: "Water trapped at this cell = leftMax - current height. Add it to total and move pointer inward."
      }
    ]
  },
  "Best Time to Buy and Sell Stock": {
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6-1 = 5."
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "Prices only decrease. No profitable transaction possible."
      }
    ],
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "[7,6,4,3,1]", expectedOutput: "0" }
    ],
    hints: [
      "Track the minimum price seen so far as you scan left to right",
      "At each day, calculate profit if you sold today: price - minPrice"
    ],
    lineByLineExplanation: [
      {
        line: "int minPrice = Integer.MAX_VALUE, maxProfit = 0;",
        explanation: "Start with the highest possible min price and zero profit."
      },
      {
        line: "if (prices[i] < minPrice) minPrice = prices[i];",
        explanation: "Update the cheapest buying day seen so far."
      },
      {
        line: "else if (prices[i] - minPrice > maxProfit) maxProfit = prices[i] - minPrice;",
        explanation: "If selling today gives better profit than our current best, update maxProfit."
      },
      {
        line: "return maxProfit;",
        explanation: "Return the best profit found. Returns 0 if prices only decreased."
      }
    ]
  },
  "Longest Substring Without Repeating Characters": {
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces"
    ],
    examples: [
      {
        input: "s = 'abcabcbb'",
        output: "3",
        explanation: "The answer is 'abc', with length 3."
      },
      {
        input: "s = 'bbbbb'",
        output: "1",
        explanation: "The answer is 'b', with length 1."
      },
      {
        input: "s = 'pwwkew'",
        output: "3",
        explanation: "The answer is 'wke', with length 3."
      }
    ],
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" }
    ],
    hints: [
      "Use a sliding window with a HashSet to track characters in the current window",
      "When a duplicate is found, shrink the window from the left until the duplicate is removed"
    ],
    lineByLineExplanation: [
      {
        line: "Set<Character> set = new HashSet<>(); int left = 0, maxLen = 0;",
        explanation: "The set tracks characters in our current window. Left pointer marks window start."
      },
      {
        line: "for (int right = 0; right < s.length(); right++)",
        explanation: "Right pointer expands the window one character at a time."
      },
      {
        line: "while (set.contains(s.charAt(right)))",
        explanation: "If the new character is already in our window, we shrink from the left until it is gone."
      },
      {
        line: "set.remove(s.charAt(left++));",
        explanation: "Remove the leftmost character and advance the left pointer."
      },
      {
        line: "set.add(s.charAt(right)); maxLen = Math.max(maxLen, right - left + 1);",
        explanation: "Add the new character to the window and update the maximum length."
      }
    ]
  },
  "Longest Repeating Character Replacement": {
    description: "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.",
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of only uppercase English letters",
      "0 <= k <= s.length"
    ],
    examples: [
      {
        input: "s = 'ABAB', k = 2",
        output: "4",
        explanation: "Replace the two A's with B's or vice versa. 'BBBB' has length 4."
      },
      {
        input: "s = 'AABABBA', k = 1",
        output: "4",
        explanation: "Replace the one B at index 5 to get 'AABAAAA' or similar."
      }
    ],
    testCases: [
      { input: "ABAB\n2", expectedOutput: "4" },
      { input: "AABABBA\n1", expectedOutput: "4" }
    ],
    hints: [
      "A window is valid if: windowSize - maxFrequencyChar <= k",
      "Track the frequency of each character in the window. The most frequent character does not need to change."
    ],
    lineByLineExplanation: [
      {
        line: "int[] count = new int[26]; int left = 0, maxFreq = 0, result = 0;",
        explanation: "count tracks frequency of each character in the window. maxFreq is the highest frequency seen."
      },
      {
        line: "count[s.charAt(right) - 'A']++;",
        explanation: "Expand window to the right and update character frequency."
      },
      {
        line: "maxFreq = Math.max(maxFreq, count[s.charAt(right) - 'A']);",
        explanation: "Update the maximum frequency of any single character in the window."
      },
      {
        line: "if ((right - left + 1) - maxFreq > k)",
        explanation: "Window size minus the count of the most frequent character = characters we need to change. If this exceeds k, window is invalid."
      },
      {
        line: "count[s.charAt(left) - 'A']--; left++;",
        explanation: "Shrink window from left to make it valid again."
      }
    ]
  },
  "Valid Parentheses": {
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'"
    ],
    examples: [
      {
        input: "s = '()'",
        output: "true",
        explanation: "Single matched pair."
      },
      {
        input: "s = '()[]{}'",
        output: "true",
        explanation: "Three matched pairs in sequence."
      },
      {
        input: "s = '(]'",
        output: "false",
        explanation: "Mismatched bracket types."
      }
    ],
    testCases: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" },
      { input: "([)]", expectedOutput: "false" },
      { input: "{[]}", expectedOutput: "true" }
    ],
    hints: [
      "Use a stack — push opening brackets, pop when you see a closing bracket",
      "If the popped bracket does not match the closing bracket, return false"
    ],
    lineByLineExplanation: [
      {
        line: "Stack<Character> stack = new Stack<>();",
        explanation: "A stack naturally handles nesting — the most recently opened bracket must close first."
      },
      {
        line: "if (c == '(' || c == '{' || c == '[') stack.push(c);",
        explanation: "Push all opening brackets onto the stack."
      },
      {
        line: "if (stack.isEmpty()) return false;",
        explanation: "If we see a closing bracket but the stack is empty, there is no matching opener — invalid."
      },
      {
        line: "char top = stack.pop();",
        explanation: "Pop the most recent opening bracket to check if it matches the current closing bracket."
      },
      {
        line: "if (c == ')' && top != '(' || c == '}' && top != '{' || c == ']' && top != '[') return false;",
        explanation: "If the types do not match (like opening '{' but closing ')'), the string is invalid."
      },
      {
        line: "return stack.isEmpty();",
        explanation: "At the end, if the stack is empty all brackets matched. If not, some were never closed."
      }
    ]
  },
  "Binary Search": {
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.",
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All integers in nums are unique",
      "nums is sorted in ascending order"
    ],
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums at index 4."
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums."
      }
    ],
    testCases: [
      { input: "[-1,0,3,5,9,12]\n9", expectedOutput: "4" },
      { input: "[-1,0,3,5,9,12]\n2", expectedOutput: "-1" }
    ],
    hints: [
      "Start with left=0 and right=length-1. Check the middle element each iteration.",
      "If middle is too small, search the right half. If too large, search the left half."
    ],
    lineByLineExplanation: [
      {
        line: "int left = 0, right = nums.length - 1;",
        explanation: "Initialize search boundaries to the full array."
      },
      {
        line: "int mid = left + (right - left) / 2;",
        explanation: "Calculate midpoint. We use left + (right-left)/2 instead of (left+right)/2 to prevent integer overflow."
      },
      {
        line: "if (nums[mid] == target) return mid;",
        explanation: "Found the target at the midpoint."
      },
      {
        line: "else if (nums[mid] < target) left = mid + 1;",
        explanation: "Target is in the right half. Discard everything up to and including mid."
      },
      {
        line: "else right = mid - 1;",
        explanation: "Target is in the left half. Discard everything from mid onward."
      },
      {
        line: "return -1;",
        explanation: "Search space exhausted without finding target."
      }
    ]
  }
};
