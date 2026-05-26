export const batch10Enrichments: any = {
  "Coin Change II": {
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount.",
    constraints: ["1 <= coins.length <= 300", "1 <= coins[i] <= 5000", "0 <= amount <= 5000"],
    examples: [
      { input: "amount = 5, coins = [1,2,5]", output: "4", explanation: "Four ways: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1." }
    ],
    testCases: [{ input: "5\n[1,2,5]", expectedOutput: "4" }],
    hints: ["Use a 1D DP array of size amount+1", "dp[i] represents the number of ways to make amount i", "For each coin, update the dp array from coin to amount"],
    lineByLineExplanation: [
      { line: "int[] dp = new int[amount + 1]; dp[0] = 1;", explanation: "1 way to make amount 0 (use no coins)." },
      { line: "for (int coin : coins)", explanation: "Iterate through each coin denomination." },
      { line: "for (int i = coin; i <= amount; i++) dp[i] += dp[i - coin];", explanation: "Add the combinations of the remaining amount after using the current coin." },
      { line: "return dp[amount];", explanation: "Final accumulated combinations for the target amount." }
    ]
  },
  "Target Sum": {
    description: "You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers. Return the number of different expressions that you can build, which evaluates to target.",
    constraints: ["1 <= nums.length <= 20", "0 <= nums[i] <= 1000", "-1000 <= target <= 1000"],
    examples: [
      { input: "nums = [1,1,1,1,1], target = 3", output: "5", explanation: "There are 5 ways to assign symbols to make the sum 3." }
    ],
    testCases: [{ input: "[1,1,1,1,1]\n3", expectedOutput: "5" }],
    hints: ["This can be converted to a subset sum problem: Sum(P) - Sum(N) = target", "Sum(P) = (target + Sum(all)) / 2", "Use DP or recursion with memoization"],
    lineByLineExplanation: [
      { line: "int sum = 0; for (int n : nums) sum += n;", explanation: "Calculate total sum of elements." },
      { line: "if (Math.abs(target) > sum || (sum + target) % 2 != 0) return 0;", explanation: "Invalid target or fractional subset sum required." },
      { line: "int s = (sum + target) / 2; int[] dp = new int[s + 1]; dp[0] = 1;", explanation: "Initialize DP for subset sum 's'." },
      { line: "for (int num : nums) for (int i = s; i >= num; i--) dp[i] += dp[i - num];", explanation: "Update combinations iterating backwards to prevent reusing the same element." },
      { line: "return dp[s];", explanation: "Total ways to form the required positive subset." }
    ]
  },
  "Interleaving String": {
    description: "Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.",
    constraints: ["0 <= s1.length, s2.length <= 100", "0 <= s3.length <= 200", "s1, s2, and s3 consist of lowercase English letters."],
    examples: [
      { input: "s1 = 'aabcc', s2 = 'dbbca', s3 = 'aadbbcbcac'", output: "true", explanation: "Interleaved string matches." }
    ],
    testCases: [{ input: "'aabcc'\n'dbbca'\n'aadbbcbcac'", expectedOutput: "true" }],
    hints: ["Use a 2D DP table where dp[i][j] is true if s1[0..i] and s2[0..j] interleave to form s3[0..i+j]", "Can be optimized to a 1D DP array"],
    lineByLineExplanation: [
      { line: "if (s1.length() + s2.length() != s3.length()) return false;", explanation: "Length mismatch is an automatic failure." },
      { line: "boolean[] dp = new boolean[s2.length() + 1]; dp[0] = true;", explanation: "Optimize 2D DP into 1D tracking the previous row." },
      { line: "for (int j = 1; j <= s2.length(); j++) dp[j] = dp[j-1] && s2.charAt(j-1) == s3.charAt(j-1);", explanation: "Initialize first row (using only s2)." },
      { line: "for (int i = 1; i <= s1.length(); i++) { dp[0] = dp[0] && s1.charAt(i-1) == s3.charAt(i-1); ... }", explanation: "Update using s1 and s2." },
      { line: "for (int j = 1; j <= s2.length(); j++) dp[j] = (dp[j] && s1.charAt(i-1) == s3.charAt(i+j-1)) || (dp[j-1] && s2.charAt(j-1) == s3.charAt(i+j-1));", explanation: "True if we can pull from s1 (above) or s2 (left)." }
    ]
  },
  "Longest Increasing Path in a Matrix": {
    description: "Given an m x n integers matrix, return the length of the longest increasing path in matrix. From each cell, you can either move in four directions: left, right, up, or down.",
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 200", "0 <= matrix[i][j] <= 2^31 - 1"],
    examples: [
      { input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]", output: "4", explanation: "Longest path is [1, 2, 6, 9]." }
    ],
    testCases: [{ input: "[[9,9,4],[6,6,8],[2,1,1]]", expectedOutput: "4" }],
    hints: ["Use DFS with Memoization", "dp[i][j] represents the longest path starting from cell (i, j)"],
    lineByLineExplanation: [
      { line: "int[][] memo = new int[m][n]; int max = 1;", explanation: "Cache for DFS to prevent redundant recalculations." },
      { line: "for (int i=0; i<m; i++) for (int j=0; j<n; j++) max = Math.max(max, dfs(matrix, i, j, memo));", explanation: "Try starting a path from every cell." },
      { line: "if (memo[i][j] != 0) return memo[i][j];", explanation: "Return cached result." },
      { line: "int cur = matrix[i][j]; int res = 1;", explanation: "Path length is at least 1 (the cell itself)." },
      { line: "if (i > 0 && matrix[i-1][j] > cur) res = Math.max(res, 1 + dfs(matrix, i-1, j, memo));", explanation: "Explore upwards if strictly increasing." },
      { line: "memo[i][j] = res; return res;", explanation: "Save result and return." }
    ]
  },
  "Distinct Subsequences": {
    description: "Given two strings s and t, return the number of distinct subsequences of s which equals t.",
    constraints: ["1 <= s.length, t.length <= 1000", "s and t consist of English letters."],
    examples: [
      { input: "s = 'rabbbit', t = 'rabbit'", output: "3", explanation: "3 different ways to form 'rabbit' by deleting a 'b'." }
    ],
    testCases: [{ input: "'rabbbit'\n'rabbit'", expectedOutput: "3" }],
    hints: ["Use 2D DP: dp[i][j] is the number of ways s[0..i] matches t[0..j]", "If characters match, we can either use the character or skip it", "If they don't match, we must skip the character in s"],
    lineByLineExplanation: [
      { line: "int m = s.length(), n = t.length(); int[][] dp = new int[m + 1][n + 1];", explanation: "DP table." },
      { line: "for (int i = 0; i <= m; i++) dp[i][0] = 1;", explanation: "Empty string t can be formed from any prefix of s exactly 1 way (by deleting everything)." },
      { line: "for (int i = 1; i <= m; i++) for (int j = 1; j <= n; j++)", explanation: "Fill DP table." },
      { line: "if (s.charAt(i - 1) == t.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];", explanation: "Match: sum of using the character and not using it." },
      { line: "else dp[i][j] = dp[i - 1][j];", explanation: "Mismatch: must skip the character in s." },
      { line: "return dp[m][n];", explanation: "Total distinct subsequences." }
    ]
  },
  "Edit Distance": {
    description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.",
    constraints: ["0 <= word1.length, word2.length <= 500", "word1 and word2 consist of lowercase English letters."],
    examples: [
      { input: "word1 = 'horse', word2 = 'ros'", output: "3", explanation: "horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e')." }
    ],
    testCases: [{ input: "'horse'\n'ros'", expectedOutput: "3" }],
    hints: ["Use 2D DP: dp[i][j] is min operations for word1[0..i] to word2[0..j]", "Cost is 1 + min(insert, delete, replace)"],
    lineByLineExplanation: [
      { line: "int[][] dp = new int[m + 1][n + 1];", explanation: "DP table for lengths m and n." },
      { line: "for (int i = 0; i <= m; i++) dp[i][0] = i; for (int j = 0; j <= n; j++) dp[0][j] = j;", explanation: "Base cases: converting to/from empty strings requires entirely deletions/insertions." },
      { line: "for (int i = 1; i <= m; i++) for (int j = 1; j <= n; j++)", explanation: "Process each prefix." },
      { line: "if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];", explanation: "Characters match, cost is the same as prefix without these chars." },
      { line: "else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));", explanation: "Mismatch: 1 + min(replace, delete, insert)." }
    ]
  },
  "Burst Balloons": {
    description: "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. Return the maximum coins you can collect by bursting the balloons wisely.",
    constraints: ["n == nums.length", "1 <= n <= 300", "0 <= nums[i] <= 100"],
    examples: [
      { input: "nums = [3,1,5,8]", output: "167", explanation: "Burst sequence: 1 (15) -> 5 (120) -> 3 (24) -> 8 (8) = 167." }
    ],
    testCases: [{ input: "[3,1,5,8]", expectedOutput: "167" }],
    hints: ["Reverse the process: Think of which balloon is the LAST one to burst", "Use DP: dp[left][right] is the max coins collected in that subarray segment exclusively"],
    lineByLineExplanation: [
      { line: "int[] A = new int[n + 2]; A[0] = 1; A[n + 1] = 1; for (int i = 0; i < n; i++) A[i + 1] = nums[i];", explanation: "Pad array with 1s at ends for boundary multipliers." },
      { line: "int[][] dp = new int[n + 2][n + 2];", explanation: "DP table for subarray intervals." },
      { line: "for (int len = 1; len <= n; len++)", explanation: "Length of the subarray segment." },
      { line: "for (int L = 1; L <= n - len + 1; L++) { int R = L + len - 1;", explanation: "Define Left and Right boundaries." },
      { line: "for (int i = L; i <= R; i++)", explanation: "Pick balloon 'i' to be the LAST one burst in this segment." },
      { line: "dp[L][R] = Math.max(dp[L][R], dp[L][i - 1] + A[L - 1] * A[i] * A[R + 1] + dp[i + 1][R]);", explanation: "Max coins = left segment + right segment + bursting 'i' last with padded boundaries." }
    ]
  },
  "Regular Expression Matching": {
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where: '.' Matches any single character. '*' Matches zero or more of the preceding element.",
    constraints: ["1 <= s.length <= 20", "1 <= p.length <= 20", "s contains only lowercase English letters.", "p contains only lowercase English letters, '.', and '*'."],
    examples: [
      { input: "s = 'aa', p = 'a*'", output: "true", explanation: "'*' repeats 'a' twice." },
      { input: "s = 'ab', p = '.*'", output: "true", explanation: "'.*' matches any string." }
    ],
    testCases: [{ input: "'aa'\n'a*'", expectedOutput: "true" }],
    hints: ["Use 2D DP or DFS with memoization", "For '*', branch into two cases: use the '*' (if previous char matches) or ignore the '*' and its preceding char"],
    lineByLineExplanation: [
      { line: "boolean[][] dp = new boolean[s.length() + 1][p.length() + 1]; dp[0][0] = true;", explanation: "DP table. Empty matches empty." },
      { line: "for (int j = 1; j <= p.length(); j++) if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];", explanation: "Initialize '*' patterns matching an empty string." },
      { line: "for (int i = 1; i <= s.length(); i++) for (int j = 1; j <= p.length(); j++)", explanation: "Fill DP matrix." },
      { line: "if (p.charAt(j - 1) == '.' || p.charAt(j - 1) == s.charAt(i - 1)) dp[i][j] = dp[i - 1][j - 1];", explanation: "Exact match or '.' wildcard — carry over diagonal value." },
      { line: "else if (p.charAt(j - 1) == '*') { dp[i][j] = dp[i][j - 2]; if (p.charAt(j - 2) == '.' || p.charAt(j - 2) == s.charAt(i - 1)) dp[i][j] = dp[i][j] || dp[i - 1][j]; }", explanation: "For '*': 1) zero matches (skip 2 chars in p). 2) one/more matches if preceding char aligns." }
    ]
  },
  "Jump Game II": {
    description: "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum length of a forward jump from index i. Return the minimum number of jumps to reach nums[n - 1].",
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 1000", "It's guaranteed that you can reach nums[n - 1]."],
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "2", explanation: "Jump 1 step from 0 to 1, then 3 steps to the end." }
    ],
    testCases: [{ input: "[2,3,1,1,4]", expectedOutput: "2" }],
    hints: ["Use a Greedy approach tracking the farthest you can reach in the current jump window", "When you reach the end of the current window, increment jump count and update window end"],
    lineByLineExplanation: [
      { line: "int jumps = 0, currentEnd = 0, farthest = 0;", explanation: "Initialize counters." },
      { line: "for (int i = 0; i < nums.length - 1; i++)", explanation: "Iterate up to the second to last element." },
      { line: "farthest = Math.max(farthest, i + nums[i]);", explanation: "Track the max distance reachable." },
      { line: "if (i == currentEnd) { jumps++; currentEnd = farthest; }", explanation: "Reached the end of the current jump boundary, must jump again." },
      { line: "return jumps;", explanation: "Return total jumps required." }
    ]
  },
  "Gas Station": {
    description: "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.",
    constraints: ["n == gas.length == cost.length", "1 <= n <= 10^5", "0 <= gas[i], cost[i] <= 10^4"],
    examples: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3", explanation: "Start at station 3 (index 3) and you will have enough gas for the full loop." }
    ],
    testCases: [{ input: "[1,2,3,4,5]\n[3,4,5,1,2]", expectedOutput: "3" }],
    hints: ["If total gas < total cost, it's impossible (return -1)", "Iterate and track current gas tank. If tank dips below 0, the start station must be the NEXT station"],
    lineByLineExplanation: [
      { line: "int totalGas = 0, totalCost = 0, tank = 0, start = 0;", explanation: "Initialize accumulators." },
      { line: "for (int i = 0; i < gas.length; i++)", explanation: "Single pass." },
      { line: "totalGas += gas[i]; totalCost += cost[i]; tank += gas[i] - cost[i];", explanation: "Update global totals and current tank." },
      { line: "if (tank < 0) { start = i + 1; tank = 0; }", explanation: "If we run out, any station from previous start to here is invalid. Reset start to next station." },
      { line: "return totalGas >= totalCost ? start : -1;", explanation: "If globally possible, the identified start is guaranteed to work." }
    ]
  },
  "Hand of Straights": {
    description: "Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards. Return true if she can, or false otherwise.",
    constraints: ["1 <= hand.length <= 10^4", "0 <= hand[i] <= 10^9", "1 <= groupSize <= hand.length"],
    examples: [
      { input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3", output: "true", explanation: "Groups are [1,2,3], [2,3,4], [6,7,8]." }
    ],
    testCases: [{ input: "[1,2,3,6,2,3,4,7,8]\n3", expectedOutput: "true" }],
    hints: ["Use a TreeMap (Min-Heap also works) to count frequencies and access the smallest card", "For every smallest available card, check if the next groupSize - 1 consecutive cards exist"],
    lineByLineExplanation: [
      { line: "if (hand.length % groupSize != 0) return false;", explanation: "Must be perfectly divisible." },
      { line: "TreeMap<Integer, Integer> counts = new TreeMap<>();", explanation: "Sorted map tracks frequencies." },
      { line: "for (int card : hand) counts.put(card, counts.getOrDefault(card, 0) + 1);", explanation: "Populate frequencies." },
      { line: "while (counts.size() > 0)", explanation: "Process until all cards grouped." },
      { line: "int first = counts.firstKey();", explanation: "Get the lowest remaining card." },
      { line: "for (int i = first; i < first + groupSize; i++) { if (!counts.containsKey(i)) return false; ... }", explanation: "Attempt to form a consecutive sequence. Fail if a needed card is missing." }
    ]
  },
  "Merge Triplets to Form Target Triplet": {
    description: "A triplet is an array of three integers. You are given a 2D integer array triplets and a target triplet. To obtain the target, you can select any two triplets and update one of them to be the element-wise maximum of the two. Return true if it is possible to obtain the target.",
    constraints: ["1 <= triplets.length <= 10^5", "triplets[i].length == target.length == 3", "1 <= triplets[i][j], target[i] <= 1000"],
    examples: [
      { input: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]", output: "true", explanation: "Merge [2,5,3] and [1,7,5] to get [2,7,5]." }
    ],
    testCases: [{ input: "[[2,5,3],[1,8,4],[1,7,5]]\n[2,7,5]", expectedOutput: "true" }],
    hints: ["Ignore any triplet that has a value strictly greater than the target in ANY position", "For valid triplets, track the maximums you can build", "If the constructed max equals target, return true"],
    lineByLineExplanation: [
      { line: "boolean[] found = new boolean[3];", explanation: "Track if we found the target values." },
      { line: "for (int[] t : triplets)", explanation: "Iterate over all triplets." },
      { line: "if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;", explanation: "Discard triplet if it exceeds the target anywhere." },
      { line: "if (t[0] == target[0]) found[0] = true;", explanation: "Check if it provides the required first value." },
      { line: "return found[0] && found[1] && found[2];", explanation: "Return true if all three target values are matched by valid triplets." }
    ]
  },
  "Partition Labels": {
    description: "You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.",
    constraints: ["1 <= s.length <= 500", "s consists of lowercase English letters."],
    examples: [
      { input: "s = 'ababcbacadefegdehijhklij'", output: "[9,7,8]", explanation: "Partitions are 'ababcbaca', 'defegde', 'hijhklij'." }
    ],
    testCases: [{ input: "'ababcbacadefegdehijhklij'", expectedOutput: "[9,7,8]" }],
    hints: ["Find the last occurrence index of every character in the string", "Iterate over string, keeping track of the furthest last occurrence seen", "When index reaches the furthest last occurrence, a partition is complete"],
    lineByLineExplanation: [
      { line: "int[] last = new int[26]; for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;", explanation: "Store the last index for each character." },
      { line: "int end = 0, start = 0;", explanation: "Pointers for current partition." },
      { line: "for (int i = 0; i < s.length(); i++)", explanation: "Pass through string." },
      { line: "end = Math.max(end, last[s.charAt(i) - 'a']);", explanation: "Expand partition boundary if character occurs later." },
      { line: "if (i == end) { result.add(end - start + 1); start = i + 1; }", explanation: "Reached boundary, seal partition, record length, update start." }
    ]
  },
  "Valid Parenthesis String": {
    description: "Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid. '*' could be treated as a single right parenthesis ')', a single left parenthesis '(', or an empty string.",
    constraints: ["1 <= s.length <= 100", "s[i] is '(', ')' or '*'."],
    examples: [
      { input: "s = '(*))'", output: "true", explanation: "'*' becomes empty string." }
    ],
    testCases: [{ input: "'(*))'", expectedOutput: "true" }],
    hints: ["Use a Greedy approach tracking the minimum and maximum possible open parenthesis counts", "If maxOpen falls below 0, return false. If minOpen falls below 0, reset to 0"],
    lineByLineExplanation: [
      { line: "int minOpen = 0, maxOpen = 0;", explanation: "Track range of possible open parentheses." },
      { line: "for (char c : s.toCharArray())", explanation: "Process each char." },
      { line: "if (c == '(') { minOpen++; maxOpen++; }", explanation: "Must increment both counts." },
      { line: "else if (c == ')') { minOpen--; maxOpen--; }", explanation: "Must decrement both counts." },
      { line: "else { minOpen--; maxOpen++; }", explanation: "For '*', it could close, or open." },
      { line: "if (maxOpen < 0) return false; minOpen = Math.max(minOpen, 0);", explanation: "Fail if definitely too many closed. Floor minOpen to 0 because negative open is invalid." },
      { line: "return minOpen == 0;", explanation: "Must be able to achieve exactly 0 open parentheses." }
    ]
  },
  "Non-overlapping Intervals": {
    description: "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    constraints: ["1 <= intervals.length <= 10^5", "intervals[i].length == 2", "-5 * 10^4 <= starti < endi <= 5 * 10^4"],
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3] to make the rest non-overlapping." }
    ],
    testCases: [{ input: "[[1,2],[2,3],[3,4],[1,3]]", expectedOutput: "1" }],
    hints: ["Sort intervals by their END times", "Greedily pick non-overlapping intervals; count how many are dropped"],
    lineByLineExplanation: [
      { line: "Arrays.sort(intervals, (a, b) -> a[1] - b[1]);", explanation: "Sort by end times to finish intervals as early as possible." },
      { line: "int count = 0, end = intervals[0][1];", explanation: "Initialize removal count and tracking pointer." },
      { line: "for (int i = 1; i < intervals.length; i++)", explanation: "Iterate remaining intervals." },
      { line: "if (intervals[i][0] < end) count++;", explanation: "Overlap detected: remove the interval that ends later." },
      { line: "else end = intervals[i][1];", explanation: "No overlap: update the end time." },
      { line: "return count;", explanation: "Total removals." }
    ]
  },
  "Meeting Rooms": {
    description: "Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.",
    constraints: ["0 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti < endi <= 10^6"],
    examples: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "false", explanation: "Overlaps exist." },
      { input: "intervals = [[7,10],[2,4]]", output: "true", explanation: "No overlaps." }
    ],
    testCases: [{ input: "[[0,30],[5,10],[15,20]]", expectedOutput: "false" }],
    hints: ["Sort intervals by start time", "Iterate and check if any interval's start is before the previous interval's end"],
    lineByLineExplanation: [
      { line: "Arrays.sort(intervals, (a, b) -> a[0] - b[0]);", explanation: "Sort by start times." },
      { line: "for (int i = 0; i < intervals.length - 1; i++)", explanation: "Compare adjacent intervals." },
      { line: "if (intervals[i][1] > intervals[i + 1][0]) return false;", explanation: "Overlap means person can't attend both." },
      { line: "return true;", explanation: "Checked all, no overlaps." }
    ]
  },
  "Meeting Rooms II": {
    description: "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
    constraints: ["1 <= intervals.length <= 10^4", "0 <= starti < endi <= 10^6"],
    examples: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2", explanation: "Rooms required: 1 for [0,30], 1 for [5,10] and [15,20]." }
    ],
    testCases: [{ input: "[[0,30],[5,10],[15,20]]", expectedOutput: "2" }],
    hints: ["Extract all start times and end times into separate arrays, then sort them", "Use two pointers (start and end), incrementing active rooms if start < end"],
    lineByLineExplanation: [
      { line: "int[] starts = new int[intervals.length]; int[] ends = new int[intervals.length];", explanation: "Extract starts and ends." },
      { line: "Arrays.sort(starts); Arrays.sort(ends);", explanation: "Sort independently to process chronological events." },
      { line: "int rooms = 0, endIdx = 0;", explanation: "Track active rooms and pointer for earliest end time." },
      { line: "for (int i = 0; i < starts.length; i++) { if (starts[i] < ends[endIdx]) rooms++; else endIdx++; }", explanation: "If meeting starts before earliest end, new room needed. Else, reuse a freed room." },
      { line: "return rooms;", explanation: "Minimum total rooms." }
    ]
  },
  "Minimum Interval to Include Each Query": {
    description: "You are given a 2D integer array intervals and an integer array queries. The size of an interval is endi - starti + 1. For each query, return the size of the smallest interval that contains the query, or -1 if no such interval exists.",
    constraints: ["1 <= intervals.length <= 10^5", "1 <= queries.length <= 10^5", "1 <= starti <= endi <= 10^7", "1 <= queries[j] <= 10^7"],
    examples: [
      { input: "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]", output: "[3,3,1,4]", explanation: "Smallest matching sizes." }
    ],
    testCases: [{ input: "[[1,4],[2,4],[3,6],[4,4]]\n[2,3,4,5]", expectedOutput: "[3,3,1,4]" }],
    hints: ["Sort intervals by start time", "Sort queries, but keep track of their original indices", "Use a Min-Heap based on interval length to track valid overlapping intervals"],
    lineByLineExplanation: [
      { line: "int[][] sortedQueries = new int[queries.length][2]; for(int i=0; i<queries.length; i++) sortedQueries[i] = new int[]{queries[i], i};", explanation: "Keep original index for result." },
      { line: "Arrays.sort(intervals, (a, b) -> a[0] - b[0]); Arrays.sort(sortedQueries, (a, b) -> a[0] - b[0]);", explanation: "Sort both arrays." },
      { line: "PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);", explanation: "Min-heap storing [size, end_time]." },
      { line: "while (i < intervals.length && intervals[i][0] <= q) { pq.offer(new int[]{...}); i++; }", explanation: "Add all intervals starting before the query to heap." },
      { line: "while (!pq.isEmpty() && pq.peek()[1] < q) pq.poll();", explanation: "Remove intervals that ended before the current query." },
      { line: "result[originalIdx] = pq.isEmpty() ? -1 : pq.peek()[0];", explanation: "Smallest valid interval is at the top." }
    ]
  },
  "Spiral Matrix": {
    description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]", explanation: "Spirals inward." }
    ],
    testCases: [{ input: "[[1,2,3],[4,5,6],[7,8,9]]", expectedOutput: "[1,2,3,6,9,8,7,4,5]" }],
    hints: ["Maintain 4 boundary pointers: top, bottom, left, right", "Traverse left->right, top->bottom, right->left, bottom->top and tighten boundaries"],
    lineByLineExplanation: [
      { line: "int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;", explanation: "Initialize boundaries." },
      { line: "while (top <= bottom && left <= right)", explanation: "Continue until boundaries cross." },
      { line: "for (int i = left; i <= right; i++) result.add(matrix[top][i]); top++;", explanation: "Traverse top row, shift boundary down." },
      { line: "for (int i = top; i <= bottom; i++) result.add(matrix[i][right]); right--;", explanation: "Traverse right column, shift boundary left." },
      { line: "if (top <= bottom) { for (int i = right; i >= left; i--) result.add(matrix[bottom][i]); bottom--; }", explanation: "Traverse bottom row backwards, shift boundary up." },
      { line: "if (left <= right) { for (int i = bottom; i >= top; i--) result.add(matrix[i][left]); left++; }", explanation: "Traverse left column upwards, shift boundary right." }
    ]
  },
  "Set Matrix Zeroes": {
    description: "Given an m x n integer matrix board, if an element is 0, set its entire row and column to 0's. You must do it in place.",
    constraints: ["m == matrix.length", "n == matrix[0].length", "1 <= m, n <= 200", "-2^31 <= matrix[i][j] <= 2^31 - 1"],
    examples: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]", explanation: "Center 0 zeroes out middle row/col." }
    ],
    testCases: [{ input: "[[1,1,1],[1,0,1],[1,1,1]]", expectedOutput: "[[1,0,1],[0,0,0],[1,0,1]]" }],
    hints: ["Use the first row and first column as markers to store zero states", "Use a separate boolean flag for the first row to avoid overlap issues"],
    lineByLineExplanation: [
      { line: "boolean rowZero = false;", explanation: "Flag for the first row specifically." },
      { line: "for (int i=0; i<m; i++) for (int j=0; j<n; j++) if (matrix[i][j] == 0) { matrix[0][j] = 0; if (i > 0) matrix[i][0] = 0; else rowZero = true; }", explanation: "Mark columns and rows using first col/row." },
      { line: "for (int i=1; i<m; i++) for (int j=1; j<n; j++) if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;", explanation: "Zero out inner matrix based on markers." },
      { line: "if (matrix[0][0] == 0) for (int i=0; i<m; i++) matrix[i][0] = 0;", explanation: "Zero out first column." },
      { line: "if (rowZero) for (int j=0; j<n; j++) matrix[0][j] = 0;", explanation: "Zero out first row." }
    ]
  },
  "Plus One": {
    description: "You are given a large integer represented as an integer array digits. Increment the large integer by one and return the resulting array of digits.",
    constraints: ["1 <= digits.length <= 100", "0 <= digits[i] <= 9"],
    examples: [
      { input: "digits = [1,2,3]", output: "[1,2,4]", explanation: "123 + 1 = 124." },
      { input: "digits = [9,9]", output: "[1,0,0]", explanation: "99 + 1 = 100." }
    ],
    testCases: [{ input: "[1,2,3]", expectedOutput: "[1,2,4]" }],
    hints: ["Iterate from right to left", "If digit < 9, increment it and return", "If digit is 9, set to 0. If you finish the loop, prepend a 1"],
    lineByLineExplanation: [
      { line: "for (int i = digits.length - 1; i >= 0; i--)", explanation: "Start from least significant digit." },
      { line: "if (digits[i] < 9) { digits[i]++; return digits; }", explanation: "No carry over needed, return immediately." },
      { line: "digits[i] = 0;", explanation: "Carry over, set to 0 and continue to next digit." },
      { line: "int[] res = new int[digits.length + 1]; res[0] = 1; return res;", explanation: "If we exit the loop, all digits were 9s. Create new array with 1 at front." }
    ]
  },
  "Pow(x, n)": {
    description: "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).",
    constraints: ["-100.0 < x < 100.0", "-2^31 <= n <= 2^31-1"],
    examples: [
      { input: "x = 2.00000, n = 10", output: "1024.00000", explanation: "2^10 = 1024." }
    ],
    testCases: [{ input: "2.00000\n10", expectedOutput: "1024.0" }],
    hints: ["Use Exponentiation by Squaring", "Recursively or iteratively calculate half = pow(x, n/2). Then return half * half (* x if n is odd)", "Handle negative n carefully, converting to 1/x"],
    lineByLineExplanation: [
      { line: "long N = n; if (N < 0) { x = 1 / x; N = -N; }", explanation: "Handle negative exponents and prevent integer overflow for MIN_VALUE." },
      { line: "double res = 1, curr = x;", explanation: "Initialize." },
      { line: "while (N > 0) { if ((N % 2) == 1) res *= curr; curr *= curr; N /= 2; }", explanation: "Iterative fast exponentiation: square the base, divide exponent by 2." },
      { line: "return res;", explanation: "Final computed result." }
    ]
  },
  "Multiply Strings": {
    description: "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string. You must not use any built-in BigInteger library.",
    constraints: ["1 <= num1.length, num2.length <= 200", "Strings contain only digits 0-9."],
    examples: [
      { input: "num1 = '2', num2 = '3'", output: "'6'", explanation: "2 * 3 = 6." }
    ],
    testCases: [{ input: "'2'\n'3'", expectedOutput: "'6'" }],
    hints: ["Simulate long multiplication", "The product of digit at index i and j goes into positions i+j and i+j+1 in the result array"],
    lineByLineExplanation: [
      { line: "if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";", explanation: "Handle zero case." },
      { line: "int[] res = new int[num1.length() + num2.length()];", explanation: "Max possible digits for product." },
      { line: "for (int i = num1.length() - 1; i >= 0; i--) for (int j = num2.length() - 1; j >= 0; j--)", explanation: "Iterate from right to left." },
      { line: "int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');", explanation: "Multiply individual digits." },
      { line: "int sum = mul + res[i + j + 1];", explanation: "Add to whatever carry is already at this position." },
      { line: "res[i + j] += sum / 10; res[i + j + 1] = sum % 10;", explanation: "Update current position and propagate carry." },
      { line: "StringBuilder sb = new StringBuilder(); for (int num : res) if (!(sb.length() == 0 && num == 0)) sb.append(num);", explanation: "Skip leading zeros and convert back to string." }
    ]
  },
  "Detect Squares": {
    description: "You are given a stream of points on the X-Y plane. Design an algorithm that adds points and counts the number of ways to choose three points from the stream such that they form an axis-aligned square with a given query point.",
    constraints: ["1 <= x, y <= 1000", "At most 5000 calls will be made to add and count"],
    examples: [
      { input: "add([3, 10]); add([11, 2]); add([3, 2]); count([11, 10]);", output: "1", explanation: "A perfect square is formed." }
    ],
    testCases: [{ input: "add 3 10\nadd 11 2\nadd 3 2\ncount 11 10", expectedOutput: "1" }],
    hints: ["Use a HashMap or 2D array to count frequencies of points", "For a count(x,y), iterate over all added points acting as the diagonal point", "Check if the two other required corners exist and multiply their frequencies"],
    lineByLineExplanation: [
      { line: "Map<String, Integer> points = new HashMap<>(); List<int[]> list = new ArrayList<>();", explanation: "Track counts and keep list for fast iteration." },
      { line: "public void add(int[] p) { points.put(p[0]+\"@\"+p[1], ...); list.add(p); }", explanation: "Store point frequency and add to list." },
      { line: "public int count(int[] pt) { int res = 0; ... }", explanation: "Count squares." },
      { line: "if (Math.abs(p[0] - pt[0]) != Math.abs(p[1] - pt[1]) || p[0] == pt[0] || p[1] == pt[1]) continue;", explanation: "Verify if point 'p' forms a valid diagonal (same x and y distance, non-zero area)." },
      { line: "res += points.getOrDefault(p[0]+\"@\"+pt[1], 0) * points.getOrDefault(pt[0]+\"@\"+p[1], 0);", explanation: "Multiply frequencies of the required other two corners." }
    ]
  },
  "Sum of Two Integers": {
    description: "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
    constraints: ["-1000 <= a, b <= 1000"],
    examples: [
      { input: "a = 1, b = 2", output: "3", explanation: "Bitwise sum is 3." }
    ],
    testCases: [{ input: "1\n2", expectedOutput: "3" }],
    hints: ["Use XOR (^) to add bits where there is no carry", "Use AND (&) to find bits that generate a carry", "Shift the carry left by 1 (<< 1) and add it back until carry is 0"],
    lineByLineExplanation: [
      { line: "while (b != 0)", explanation: "Repeat until no carry remains." },
      { line: "int carry = (a & b) << 1;", explanation: "Identify carried bits and shift them to the next position." },
      { line: "a = a ^ b;", explanation: "Sum bits where there is no carry." },
      { line: "b = carry;", explanation: "Set b to the carry to be added in the next iteration." },
      { line: "return a;", explanation: "Result accumulates in a." }
    ]
  }
};
