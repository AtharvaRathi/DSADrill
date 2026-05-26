export const batch5Enrichments: any = {
  "Binary Tree Level Order Traversal": {
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    constraints: [
      "The number of nodes is in range [0, 2000]",
      "-1000 <= Node.val <= 1000"
    ],
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Level 0: [3], Level 1: [9,20], Level 2: [15,7]."
      }
    ],
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]" }
    ],
    hints: [
      "Use a queue (BFS)",
      "At each level, record the current queue size — process exactly that many nodes"
    ],
    lineByLineExplanation: [
      {
        line: "Queue<TreeNode> queue = new LinkedList<>(); queue.offer(root);",
        explanation: "BFS queue initialized with root."
      },
      {
        line: "int size = queue.size();",
        explanation: "Snapshot the queue size at start of each level — this is exactly how many nodes are on this level."
      },
      {
        line: "for (int i = 0; i < size; i++)",
        explanation: "Process exactly 'size' nodes — all nodes on the current level."
      },
      {
        line: "if (node.left != null) queue.offer(node.left);",
        explanation: "Add children for the next level."
      },
      {
        line: "result.add(level);",
        explanation: "Add the completed level list to the result."
      }
    ]
  },
  "Validate Binary Search Tree": {
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree contains only nodes with keys greater than the node's key. Both left and right subtrees must also be binary search trees.",
    constraints: [
      "The number of nodes is in range [1, 10^4]",
      "-2^31 <= Node.val <= 2^31 - 1"
    ],
    examples: [
      {
        input: "root = [2,1,3]",
        output: "true",
        explanation: "1 < 2 < 3 satisfies BST property."
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation: "Root is 5 but right child is 4, which violates BST property."
      }
    ],
    testCases: [
      { input: "[2,1,3]", expectedOutput: "true" },
      { input: "[5,1,4,null,null,3,6]", expectedOutput: "false" }
    ],
    hints: [
      "Pass min and max bounds down through recursion",
      "Every node must be strictly between its inherited min and max bounds"
    ],
    lineByLineExplanation: [
      {
        line: "return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);",
        explanation: "Start with no bounds — root can be any value."
      },
      {
        line: "if (node == null) return true;",
        explanation: "Null nodes are valid."
      },
      {
        line: "if (node.val <= min || node.val >= max) return false;",
        explanation: "Node must be strictly within its inherited bounds."
      },
      {
        line: "return validate(node.left, min, node.val) && validate(node.right, node.val, max);",
        explanation: "Left children get an updated max bound. Right children get an updated min bound."
      }
    ]
  },
  "Lowest Common Ancestor of a Binary Search Tree": {
    description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q. The lowest common ancestor is defined as the lowest node in T that has both p and q as descendants.",
    constraints: [
      "The number of nodes is in [2, 10^5]",
      "-10^9 <= Node.val <= 10^9",
      "All values are unique",
      "p != q, p and q will exist in the BST"
    ],
    examples: [
      {
        input: "root = [6,2,8,0,4,7,9], p = 2, q = 8",
        output: "6",
        explanation: "LCA of 2 and 8 is the root 6."
      },
      {
        input: "root = [6,2,8,0,4,7,9], p = 2, q = 4",
        output: "2",
        explanation: "LCA of 2 and 4 is 2 itself."
      }
    ],
    testCases: [
      { input: "[6,2,8,0,4,7,9]\np=2 q=8", expectedOutput: "6" },
      { input: "[6,2,8,0,4,7,9]\np=2 q=4", expectedOutput: "2" }
    ],
    hints: [
      "Use BST property — if both p and q are less than root, LCA is in left subtree",
      "If both are greater, LCA is in right subtree. Otherwise root is the LCA."
    ],
    lineByLineExplanation: [
      {
        line: "if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);",
        explanation: "Both nodes are in the left subtree — recurse left."
      },
      {
        line: "if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);",
        explanation: "Both nodes are in the right subtree — recurse right."
      },
      {
        line: "return root;",
        explanation: "p and q are on opposite sides, or one equals root — this is the LCA."
      }
    ]
  },
  "Kth Smallest Element in a BST": {
    description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
    constraints: [
      "1 <= k <= n <= 10^4",
      "0 <= Node.val <= 10^4"
    ],
    examples: [
      {
        input: "root = [3,1,4,null,2], k = 1",
        output: "1",
        explanation: "In-order traversal gives [1,2,3,4]. 1st smallest is 1."
      },
      {
        input: "root = [5,3,6,2,4,null,null,1], k = 3",
        output: "3",
        explanation: "In-order gives [1,2,3,4,5,6]. 3rd smallest is 3."
      }
    ],
    testCases: [
      { input: "[3,1,4,null,2]\n1", expectedOutput: "1" },
      { input: "[5,3,6,2,4,null,null,1]\n3", expectedOutput: "3" }
    ],
    hints: [
      "In-order traversal of a BST visits nodes in ascending order",
      "Count nodes visited — the kth one is the answer"
    ],
    lineByLineExplanation: [
      {
        line: "Stack<TreeNode> stack = new Stack<>();",
        explanation: "Iterative in-order traversal using explicit stack."
      },
      {
        line: "while (curr != null) { stack.push(curr); curr = curr.left; }",
        explanation: "Go as far left as possible, pushing all nodes."
      },
      {
        line: "curr = stack.pop(); k--;",
        explanation: "Visit the next smallest node and decrement k."
      },
      {
        line: "if (k == 0) return curr.val;",
        explanation: "When k reaches 0, this is the kth smallest."
      },
      {
        line: "curr = curr.right;",
        explanation: "Move to right subtree to continue in-order traversal."
      }
    ]
  },
  "House Robber": {
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses are broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400"
    ],
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (1) then house 3 (3). Total = 4."
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob houses 1, 3, 5 for total 2+9+1=12."
      }
    ],
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "4" },
      { input: "[2,7,9,3,1]", expectedOutput: "12" }
    ],
    hints: [
      "At each house, you choose to rob it or skip it",
      "dp[i] = max(dp[i-1], dp[i-2] + nums[i])"
    ],
    lineByLineExplanation: [
      {
        line: "int prev2 = 0, prev1 = 0;",
        explanation: "prev2 = max rob ending two houses ago, prev1 = max rob ending one house ago."
      },
      {
        line: "int curr = Math.max(prev1, prev2 + num);",
        explanation: "Either skip this house (take prev1) or rob it (prev2 + current value)."
      },
      {
        line: "prev2 = prev1; prev1 = curr;",
        explanation: "Slide the window forward."
      },
      {
        line: "return prev1;",
        explanation: "Maximum loot achievable."
      }
    ]
  },
  "Coin Change": {
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume you have an infinite number of each kind of coin.",
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1."
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
        explanation: "Cannot make 3 with only coin of value 2."
      }
    ],
    testCases: [
      { input: "[1,2,5]\n11", expectedOutput: "3" },
      { input: "[2]\n3", expectedOutput: "-1" },
      { input: "[1]\n0", expectedOutput: "0" }
    ],
    hints: [
      "Build dp array where dp[i] = minimum coins to make amount i",
      "For each amount, try all coins: dp[i] = min(dp[i], dp[i-coin] + 1)"
    ],
    lineByLineExplanation: [
      {
        line: "int[] dp = new int[amount + 1]; Arrays.fill(dp, amount + 1);",
        explanation: "Initialize with amount+1 as infinity sentinel. dp[0] = 0 since no coins needed for amount 0."
      },
      {
        line: "dp[0] = 0;",
        explanation: "Base case — zero coins needed for zero amount."
      },
      {
        line: "for (int i = 1; i <= amount; i++)",
        explanation: "Build solution bottom-up for each amount from 1 to target."
      },
      {
        line: "for (int coin : coins) if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);",
        explanation: "Try using each coin. If we used this coin, we need dp[i-coin] coins for the remainder plus 1 for this coin."
      },
      {
        line: "return dp[amount] > amount ? -1 : dp[amount];",
        explanation: "If still infinity sentinel, amount is unreachable. Otherwise return minimum coins."
      }
    ]
  },
  "Longest Increasing Subsequence": {
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "LIS is [2,3,7,101] with length 4."
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4",
        explanation: "LIS is [0,1,2,3] with length 4."
      }
    ],
    testCases: [
      { input: "[10,9,2,5,3,7,101,18]", expectedOutput: "4" },
      { input: "[0,1,0,3,2,3]", expectedOutput: "4" }
    ],
    hints: [
      "dp[i] = length of LIS ending at index i",
      "For each i, check all j < i where nums[j] < nums[i]: dp[i] = max(dp[i], dp[j]+1)"
    ],
    lineByLineExplanation: [
      {
        line: "int[] dp = new int[nums.length]; Arrays.fill(dp, 1);",
        explanation: "Every element is at minimum a subsequence of length 1 by itself."
      },
      {
        line: "for (int i = 1; i < nums.length; i++)",
        explanation: "For each element, find the best LIS ending here."
      },
      {
        line: "for (int j = 0; j < i; j++)",
        explanation: "Check all previous elements."
      },
      {
        line: "if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);",
        explanation: "If previous element is smaller, we can extend its subsequence."
      },
      {
        line: "for (int val : dp) result = Math.max(result, val);",
        explanation: "Answer is the maximum value in the dp array."
      }
    ]
  },
  "Unique Paths": {
    description: "There is a robot on an m x n grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point in time. Given integers m and n, return the number of possible unique paths from top-left to bottom-right.",
    constraints: [
      "1 <= m, n <= 100"
    ],
    examples: [
      {
        input: "m = 3, n = 7",
        output: "28",
        explanation: "28 unique paths from top-left to bottom-right of 3x7 grid."
      },
      {
        input: "m = 3, n = 2",
        output: "3",
        explanation: "Three paths: right-down-down, down-right-down, down-down-right."
      }
    ],
    testCases: [
      { input: "3\n7", expectedOutput: "28" },
      { input: "3\n2", expectedOutput: "3" }
    ],
    hints: [
      "dp[i][j] = number of ways to reach cell (i,j)",
      "dp[i][j] = dp[i-1][j] + dp[i][j-1] since you can only come from top or left"
    ],
    lineByLineExplanation: [
      {
        line: "int[] dp = new int[n]; Arrays.fill(dp, 1);",
        explanation: "Use 1D dp. Initialize to 1 since there is only one way to reach any cell in the first row."
      },
      {
        line: "for (int i = 1; i < m; i++)",
        explanation: "Process each row after the first."
      },
      {
        line: "for (int j = 1; j < n; j++) dp[j] += dp[j-1];",
        explanation: "Each cell = paths from above (dp[j] unchanged) + paths from left (dp[j-1] already updated)."
      },
      {
        line: "return dp[n-1];",
        explanation: "Bottom-right cell contains the answer."
      }
    ]
  },
  "Longest Common Subsequence": {
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence is a string generated from the original string with some characters deleted without changing the relative order.",
    constraints: [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of only lowercase English characters"
    ],
    examples: [
      {
        input: "text1 = 'abcde', text2 = 'ace'",
        output: "3",
        explanation: "LCS is 'ace' with length 3."
      },
      {
        input: "text1 = 'abc', text2 = 'abc'",
        output: "3",
        explanation: "LCS is 'abc'."
      },
      {
        input: "text1 = 'abc', text2 = 'def'",
        output: "0",
        explanation: "No common characters."
      }
    ],
    testCases: [
      { input: "abcde\nace", expectedOutput: "3" },
      { input: "abc\nabc", expectedOutput: "3" }
    ],
    hints: [
      "dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]",
      "If characters match: dp[i][j] = dp[i-1][j-1] + 1. Otherwise: max(dp[i-1][j], dp[i][j-1])"
    ],
    lineByLineExplanation: [
      {
        line: "int[][] dp = new int[m+1][n+1];",
        explanation: "Extra row and column of zeros represent empty string base cases."
      },
      {
        line: "if (text1.charAt(i-1) == text2.charAt(j-1)) dp[i][j] = dp[i-1][j-1] + 1;",
        explanation: "Characters match — extend the LCS found before both characters."
      },
      {
        line: "else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);",
        explanation: "Characters differ — take the best LCS from skipping either character."
      },
      {
        line: "return dp[m][n];",
        explanation: "Bottom-right cell has LCS of full strings."
      }
    ]
  },
  "Word Break": {
    description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    constraints: [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 20"
    ],
    examples: [
      {
        input: "s = 'leetcode', wordDict = ['leet','code']",
        output: "true",
        explanation: "'leetcode' = 'leet' + 'code'."
      },
      {
        input: "s = 'applepenapple', wordDict = ['apple','pen']",
        output: "true",
        explanation: "'apple' + 'pen' + 'apple'."
      },
      {
        input: "s = 'catsandog', wordDict = ['cats','dog','sand','and','cat']",
        output: "false",
        explanation: "Cannot segment completely."
      }
    ],
    testCases: [
      { input: "leetcode\nleet code", expectedOutput: "true" },
      { input: "catsandog\ncats dog sand and cat", expectedOutput: "false" }
    ],
    hints: [
      "dp[i] = true if s[0..i-1] can be segmented",
      "For each position i, check all substrings ending at i"
    ],
    lineByLineExplanation: [
      {
        line: "boolean[] dp = new boolean[s.length() + 1]; dp[0] = true;",
        explanation: "dp[0] is true — empty string can always be segmented."
      },
      {
        line: "for (int i = 1; i <= s.length(); i++)",
        explanation: "For each end position in the string."
      },
      {
        line: "for (int j = 0; j < i; j++)",
        explanation: "Try all starting positions for a word ending at i."
      },
      {
        line: "if (dp[j] && wordDict.contains(s.substring(j, i))) { dp[i] = true; break; }",
        explanation: "If we can reach position j AND the substring j to i is in dictionary, we can reach i."
      }
    ]
  }
};
