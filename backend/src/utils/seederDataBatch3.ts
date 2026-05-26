export const batch3Enrichments: any = {
  "Reverse Linked List": {
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: [
      "The number of nodes in the list is in the range [0, 5000]",
      "-5000 <= Node.val <= 5000"
    ],
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The list is reversed."
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
        explanation: "Two node list reversed."
      }
    ],
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "[1,2]", expectedOutput: "[2,1]" },
      { input: "[]", expectedOutput: "[]" }
    ],
    hints: [
      "Use three pointers: prev, curr, and next",
      "At each step, reverse the arrow: curr.next = prev, then advance all three pointers"
    ],
    lineByLineExplanation: [
      {
        line: "ListNode prev = null, curr = head;",
        explanation: "prev starts as null because the new tail points to null. curr starts at head."
      },
      {
        line: "ListNode next = curr.next;",
        explanation: "Save the next node before we overwrite curr.next."
      },
      {
        line: "curr.next = prev;",
        explanation: "Reverse the pointer — current node now points backward."
      },
      {
        line: "prev = curr; curr = next;",
        explanation: "Advance both pointers forward to process the next node."
      },
      {
        line: "return prev;",
        explanation: "When curr is null, prev is at the new head of the reversed list."
      }
    ]
  },
  "Merge Two Sorted Lists": {
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    constraints: [
      "The number of nodes in both lists is in the range [0, 50]",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order"
    ],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Both lists merged in sorted order."
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
        explanation: "Both empty lists merge to empty."
      }
    ],
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[]\n[]", expectedOutput: "[]" }
    ],
    hints: [
      "Use a dummy head node to simplify edge cases",
      "Compare the current nodes of both lists and attach the smaller one"
    ],
    lineByLineExplanation: [
      {
        line: "ListNode dummy = new ListNode(0); ListNode curr = dummy;",
        explanation: "A dummy node gives us a stable starting point so we never deal with null head edge cases."
      },
      {
        line: "while (list1 != null && list2 != null)",
        explanation: "While both lists have nodes, keep picking the smaller one."
      },
      {
        line: "if (list1.val <= list2.val) { curr.next = list1; list1 = list1.next; }",
        explanation: "Attach the smaller node to our result and advance that list's pointer."
      },
      {
        line: "curr = curr.next;",
        explanation: "Advance the result pointer to the newly added node."
      },
      {
        line: "curr.next = (list1 != null) ? list1 : list2;",
        explanation: "One list is exhausted. Attach the remainder of the other list directly — it is already sorted."
      },
      {
        line: "return dummy.next;",
        explanation: "Return the node after dummy, which is the actual head of our merged list."
      }
    ]
  },
  "Linked List Cycle": {
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle if some node in the list can be reached again by continuously following the next pointer. Return true if there is a cycle, false otherwise.",
    constraints: [
      "The number of nodes is in the range [0, 10^4]",
      "-10^5 <= Node.val <= 10^5"
    ],
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "There is a cycle, tail connects back to node at index 1."
      },
      {
        input: "head = [1,2], pos = 0",
        output: "true",
        explanation: "Tail connects to head."
      },
      {
        input: "head = [1], pos = -1",
        output: "false",
        explanation: "No cycle."
      }
    ],
    testCases: [
      { input: "[3,2,0,-4] cycle at index 1", expectedOutput: "true" },
      { input: "[1] no cycle", expectedOutput: "false" }
    ],
    hints: [
      "Use Floyd's Cycle Detection — two pointers, one slow and one fast",
      "If there is a cycle, the fast pointer will eventually catch up to the slow pointer"
    ],
    lineByLineExplanation: [
      {
        line: "ListNode slow = head, fast = head;",
        explanation: "Both pointers start at head."
      },
      {
        line: "while (fast != null && fast.next != null)",
        explanation: "Fast pointer moves two steps at a time, so we need to check both fast and fast.next for null."
      },
      {
        line: "slow = slow.next; fast = fast.next.next;",
        explanation: "Slow moves one step, fast moves two. If there is a cycle, fast laps slow and they meet."
      },
      {
        line: "if (slow == fast) return true;",
        explanation: "If they point to the same node, a cycle exists."
      },
      {
        line: "return false;",
        explanation: "Fast reached null — no cycle, the list has a proper end."
      }
    ]
  },
  "Invert Binary Tree": {
    description: "Given the root of a binary tree, invert the tree, and return its root. Inverting means swapping the left and right children of every node.",
    constraints: [
      "The number of nodes in the tree is in the range [0, 100]",
      "-100 <= Node.val <= 100"
    ],
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]",
        explanation: "Left and right children are swapped at every level."
      },
      {
        input: "root = [2,1,3]",
        output: "[2,3,1]",
        explanation: "Children swapped."
      }
    ],
    testCases: [
      { input: "[4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]" },
      { input: "[2,1,3]", expectedOutput: "[2,3,1]" }
    ],
    hints: [
      "Think recursively — invert the left subtree, invert the right subtree, then swap them",
      "Base case: if node is null, return null"
    ],
    lineByLineExplanation: [
      {
        line: "if (root == null) return null;",
        explanation: "Base case — empty tree or leaf node's null child. Nothing to invert."
      },
      {
        line: "TreeNode left = invertTree(root.left);",
        explanation: "Recursively invert the entire left subtree."
      },
      {
        line: "TreeNode right = invertTree(root.right);",
        explanation: "Recursively invert the entire right subtree."
      },
      {
        line: "root.left = right; root.right = left;",
        explanation: "Now swap the two already-inverted subtrees at this node."
      },
      {
        line: "return root;",
        explanation: "Return the current node with its children now swapped."
      }
    ]
  },
  "Maximum Depth of Binary Tree": {
    description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    constraints: [
      "The number of nodes is in the range [0, 10^4]",
      "-100 <= Node.val <= 100"
    ],
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation: "Longest path is 3 -> 20 -> 15 or 3 -> 20 -> 7."
      },
      {
        input: "root = [1,null,2]",
        output: "2",
        explanation: "Path is 1 -> 2."
      }
    ],
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "3" },
      { input: "[1,null,2]", expectedOutput: "2" }
    ],
    hints: [
      "Recursion: depth = 1 + max(depth of left subtree, depth of right subtree)",
      "Base case: null node has depth 0"
    ],
    lineByLineExplanation: [
      {
        line: "if (root == null) return 0;",
        explanation: "A null node contributes 0 to depth."
      },
      {
        line: "int leftDepth = maxDepth(root.left);",
        explanation: "Recursively get the depth of the left subtree."
      },
      {
        line: "int rightDepth = maxDepth(root.right);",
        explanation: "Recursively get the depth of the right subtree."
      },
      {
        line: "return 1 + Math.max(leftDepth, rightDepth);",
        explanation: "Current node adds 1 to the depth of whichever subtree is deeper."
      }
    ]
  },
  "Climbing Stairs": {
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    constraints: [
      "1 <= n <= 45"
    ],
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "Two ways: 1+1 or 2."
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "Three ways: 1+1+1, 1+2, or 2+1."
      }
    ],
    testCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
      { input: "5", expectedOutput: "8" }
    ],
    hints: [
      "To reach step n, you came from either step n-1 or step n-2",
      "ways(n) = ways(n-1) + ways(n-2) — this is exactly the Fibonacci sequence"
    ],
    lineByLineExplanation: [
      {
        line: "if (n <= 2) return n;",
        explanation: "Base cases: 1 step = 1 way, 2 steps = 2 ways."
      },
      {
        line: "int prev2 = 1, prev1 = 2;",
        explanation: "We only need the last two values — no need for a full dp array."
      },
      {
        line: "for (int i = 3; i <= n; i++)",
        explanation: "Build up from step 3 to step n."
      },
      {
        line: "int curr = prev1 + prev2;",
        explanation: "Ways to reach current step = sum of ways to reach the two previous steps."
      },
      {
        line: "prev2 = prev1; prev1 = curr;",
        explanation: "Slide the window forward — current becomes the new prev1."
      }
    ]
  },
  "Maximum Subarray": {
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "Subarray [4,-1,2,1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "Single element."
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "Entire array is the maximum subarray."
      }
    ],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[5,4,-1,7,8]", expectedOutput: "23" }
    ],
    hints: [
      "Kadane's Algorithm: at each position, decide whether to extend the previous subarray or start fresh",
      "If the running sum becomes negative, it is better to start a new subarray from the current element"
    ],
    lineByLineExplanation: [
      {
        line: "int maxSum = nums[0], currentSum = nums[0];",
        explanation: "Initialize both with the first element since the subarray must be non-empty."
      },
      {
        line: "for (int i = 1; i < nums.length; i++)",
        explanation: "Scan through the array starting from the second element."
      },
      {
        line: "currentSum = Math.max(nums[i], currentSum + nums[i]);",
        explanation: "Either start fresh from this element or extend the existing subarray — whichever is larger."
      },
      {
        line: "maxSum = Math.max(maxSum, currentSum);",
        explanation: "Update the global maximum after each step."
      }
    ]
  },
  "Subsets": {
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    constraints: [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All numbers in nums are unique"
    ],
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
        explanation: "All 8 possible subsets of a 3-element array."
      },
      {
        input: "nums = [0]",
        output: "[[],[0]]",
        explanation: "Empty set and the set containing 0."
      }
    ],
    testCases: [
      { input: "[1,2,3]", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "[0]", expectedOutput: "[[],[0]]" }
    ],
    hints: [
      "Use backtracking — at each index, you have two choices: include the element or skip it",
      "Start with an empty current subset and build up recursively"
    ],
    lineByLineExplanation: [
      {
        line: "result.add(new ArrayList<>(current));",
        explanation: "At every recursive call, add a copy of the current subset to results — including the empty subset at the start."
      },
      {
        line: "for (int i = start; i < nums.length; i++)",
        explanation: "Try including each element from index 'start' onward to avoid duplicate subsets."
      },
      {
        line: "current.add(nums[i]);",
        explanation: "Include the current element in the subset."
      },
      {
        line: "backtrack(i + 1, current, nums, result);",
        explanation: "Recurse with i+1 to only consider elements after the current one (no repeats)."
      },
      {
        line: "current.remove(current.size() - 1);",
        explanation: "Backtrack — remove the last element to explore the branch where we skip this element."
      }
    ]
  },
  "Number of Islands": {
    description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'"
    ],
    examples: [
      {
        input: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]",
        output: "1",
        explanation: "All the 1s are connected, forming one island."
      },
      {
        input: "grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]",
        output: "3",
        explanation: "Three separate groups of connected 1s."
      }
    ],
    testCases: [
      { input: "[[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]", expectedOutput: "1" },
      { input: "[[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]", expectedOutput: "3" }
    ],
    hints: [
      "Use DFS or BFS from each unvisited land cell",
      "When you visit a land cell, mark it as visited (change to '0') and explore all 4 directions"
    ],
    lineByLineExplanation: [
      {
        line: "for (int i = 0; i < grid.length; i++) for (int j = 0; j < grid[0].length; j++)",
        explanation: "Scan every cell in the grid."
      },
      {
        line: "if (grid[i][j] == '1') { count++; dfs(grid, i, j); }",
        explanation: "Each unvisited land cell is the start of a new island. DFS marks the entire island as visited."
      },
      {
        line: "if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') return;",
        explanation: "DFS base cases: out of bounds or already water/visited."
      },
      {
        line: "grid[r][c] = '0';",
        explanation: "Mark current cell as visited by turning it to water so we never revisit it."
      },
      {
        line: "dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1);",
        explanation: "Explore all four cardinal directions to consume the entire connected island."
      }
    ]
  }
};
