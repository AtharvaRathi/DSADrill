export const batch8Enrichments: any = {
  "Binary Tree Right Side View": {
    description: "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
    constraints: ["The number of nodes in the tree is in the range [0, 100]", "-100 <= Node.val <= 100"],
    examples: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]", explanation: "The rightmost nodes at each level." }
    ],
    testCases: [{ input: "[1,2,3,null,5,null,4]", expectedOutput: "[1,3,4]" }],
    hints: ["Use BFS (level order traversal)", "At each level, add the last processed node's value to the result list"],
    lineByLineExplanation: [
      { line: "Queue<TreeNode> queue = new LinkedList<>(); queue.offer(root);", explanation: "Start BFS queue." },
      { line: "for (int i = 0; i < size; i++)", explanation: "Iterate exactly over the nodes in the current level." },
      { line: "if (i == size - 1) result.add(curr.val);", explanation: "Only add the last node of this level." }
    ]
  },
  "Count Good Nodes in Binary Tree": {
    description: "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.",
    constraints: ["The number of nodes in the tree is in the range [1, 10^5]", "-10^4 <= Node.val <= 10^4"],
    examples: [
      { input: "root = [3,1,4,3,null,1,5]", output: "4", explanation: "Nodes with values 3, 4, 3, and 5 are good." }
    ],
    testCases: [{ input: "[3,1,4,3,null,1,5]", expectedOutput: "4" }],
    hints: ["Use DFS and track the maximum value seen so far on the path from the root"],
    lineByLineExplanation: [
      { line: "private int dfs(TreeNode node, int maxSoFar)", explanation: "Helper carries the max value seen." },
      { line: "if (node == null) return 0;", explanation: "Base case." },
      { line: "int res = node.val >= maxSoFar ? 1 : 0;", explanation: "Count this node if it equals or exceeds the max." },
      { line: "return res + dfs(node.left, Math.max(maxSoFar, node.val)) + dfs(node.right, Math.max(maxSoFar, node.val));", explanation: "Add good nodes from subtrees, passing the updated max." }
    ]
  },
  "Construct Binary Tree from Preorder and Inorder Traversal": {
    description: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
    constraints: ["1 <= preorder.length <= 3000", "inorder.length == preorder.length", "All values are unique"],
    examples: [
      { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]", explanation: "Constructs the tree correctly." }
    ],
    testCases: [{ input: "[3,9,20,15,7]\n[9,3,15,20,7]", expectedOutput: "[3,9,20,null,null,15,7]" }],
    hints: ["The first element in preorder is always the root", "Find this root in inorder array to split the tree into left and right subtrees"],
    lineByLineExplanation: [
      { line: "Map<Integer, Integer> inMap = new HashMap<>();", explanation: "Map inorder values to their indices for O(1) lookups." },
      { line: "TreeNode root = new TreeNode(preorder[preStart]);", explanation: "The first element of the current preorder segment is the root." },
      { line: "int inRoot = inMap.get(root.val); int numsLeft = inRoot - inStart;", explanation: "Find the root's index in inorder to count elements in the left subtree." },
      { line: "root.left = build(preStart + 1, preStart + numsLeft, inStart, inRoot - 1);", explanation: "Recursively build left subtree." },
      { line: "root.right = build(preStart + numsLeft + 1, preEnd, inRoot + 1, inEnd);", explanation: "Recursively build right subtree." }
    ]
  },
  "Binary Tree Maximum Path Sum": {
    description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Return the maximum path sum of any non-empty path.",
    constraints: ["The number of nodes is in the range [1, 3 * 10^4]", "-1000 <= Node.val <= 1000"],
    examples: [
      { input: "root = [1,2,3]", output: "6", explanation: "The optimal path is 2 -> 1 -> 3." },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "The optimal path is 15 -> 20 -> 7 with a sum of 42." }
    ],
    testCases: [{ input: "[1,2,3]", expectedOutput: "6" }],
    hints: ["DFS calculating maximum single path sum (branch)", "A node can act as the 'arch' connecting its left and right subtrees for a global max"],
    lineByLineExplanation: [
      { line: "int maxSum = Integer.MIN_VALUE;", explanation: "Global max path sum tracker." },
      { line: "int left = Math.max(0, dfs(node.left));", explanation: "Max branch sum of left child. Ignore if negative (use 0)." },
      { line: "int right = Math.max(0, dfs(node.right));", explanation: "Max branch sum of right child." },
      { line: "maxSum = Math.max(maxSum, left + right + node.val);", explanation: "Update global max considering this node as the arch." },
      { line: "return Math.max(left, right) + node.val;", explanation: "Return the best single branch sum going down to be used by the parent." }
    ]
  },
  "Serialize and Deserialize Binary Tree": {
    description: "Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your algorithm should work.",
    constraints: ["The number of nodes is in the range [0, 10^4]", "-1000 <= Node.val <= 1000"],
    examples: [
      { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]", explanation: "Tree is successfully serialized and deserialized." }
    ],
    testCases: [{ input: "[1,2,3,null,null,4,5]", expectedOutput: "[1,2,3,null,null,4,5]" }],
    hints: ["Use preorder traversal (DFS)", "Add a special character (like 'N') for null nodes to preserve structure"],
    lineByLineExplanation: [
      { line: "if (root == null) return \"N,\";", explanation: "Serialize null nodes." },
      { line: "return root.val + \",\" + serialize(root.left) + serialize(root.right);", explanation: "Preorder serialization." },
      { line: "Queue<String> q = new LinkedList<>(Arrays.asList(data.split(\",\")));", explanation: "Split string into queue for deserialization." },
      { line: "String val = q.poll(); if (val.equals(\"N\")) return null;", explanation: "Handle null markers." },
      { line: "TreeNode node = new TreeNode(Integer.parseInt(val)); node.left = deserialize(q); node.right = deserialize(q);", explanation: "Reconstruct preorder." }
    ]
  },
  "Kth Largest Element in a Stream": {
    description: "Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
    constraints: ["1 <= k <= 10^4", "0 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "KthLargest(3, [4,5,8,2]); add(3);", output: "4", explanation: "The stream is [2,3,4,5,8]. 3rd largest is 4." }
    ],
    testCases: [{ input: "3\n[4,5,8,2]\nadd 3", expectedOutput: "4" }],
    hints: ["Use a Min-Heap (PriorityQueue) of size K", "The top of the heap will always be the Kth largest element"],
    lineByLineExplanation: [
      { line: "PriorityQueue<Integer> pq = new PriorityQueue<>();", explanation: "Min-heap to track the largest k elements." },
      { line: "pq.offer(val); if (pq.size() > k) pq.poll();", explanation: "Add element and maintain heap size exactly k." },
      { line: "return pq.peek();", explanation: "The minimum of the k largest elements is exactly the kth largest overall." }
    ]
  },
  "Last Stone Weight": {
    description: "You are given an array of integers stones where stones[i] is the weight of the ith stone. Smash the two heaviest stones together. Return the weight of the last remaining stone, or 0 if none remain.",
    constraints: ["1 <= stones.length <= 30", "1 <= stones[i] <= 1000"],
    examples: [
      { input: "stones = [2,7,4,1,8,1]", output: "1", explanation: "Smash 8 and 7 (1 left). Smash 4 and 2 (2 left)... final is 1." }
    ],
    testCases: [{ input: "[2,7,4,1,8,1]", expectedOutput: "1" }],
    hints: ["Use a Max-Heap to efficiently grab the two largest stones", "Pop two, subtract, and push the difference if > 0"],
    lineByLineExplanation: [
      { line: "PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);", explanation: "Max-heap based on stone weight." },
      { line: "while (pq.size() > 1) { int y = pq.poll(); int x = pq.poll(); if (y != x) pq.offer(y - x); }", explanation: "Smash the two heaviest stones until 0 or 1 remains." },
      { line: "return pq.isEmpty() ? 0 : pq.poll();", explanation: "Return the final stone or 0." }
    ]
  },
  "K Closest Points to Origin": {
    description: "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).",
    constraints: ["1 <= k <= points.length <= 10^4", "-10^4 <= xi, yi <= 10^4"],
    examples: [
      { input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]", explanation: "Distance to [1,3] is sqrt(10). Distance to [-2,2] is sqrt(8)." }
    ],
    testCases: [{ input: "[[1,3],[-2,2]]\n1", expectedOutput: "[[-2,2]]" }],
    hints: ["Use a Max-Heap of size k", "Store points based on their distance (x^2 + y^2)", "When heap exceeds size k, pop the farthest point"],
    lineByLineExplanation: [
      { line: "PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1]));", explanation: "Max-heap ordered by squared distance." },
      { line: "for (int[] pt : points) { pq.offer(pt); if (pq.size() > k) pq.poll(); }", explanation: "Maintain k closest points." },
      { line: "return pq.toArray(new int[0][0]);", explanation: "Extract remaining k points." }
    ]
  },
  "Kth Largest Element in an Array": {
    description: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "Sorted: [1,2,3,4,5,6]. 2nd largest is 5." }
    ],
    testCases: [{ input: "[3,2,1,5,6,4]\n2", expectedOutput: "5" }],
    hints: ["Can use a Min-Heap of size k", "Alternatively use QuickSelect for O(N) average time complexity"],
    lineByLineExplanation: [
      { line: "PriorityQueue<Integer> pq = new PriorityQueue<>();", explanation: "Min-heap." },
      { line: "for (int num : nums) { pq.offer(num); if (pq.size() > k) pq.poll(); }", explanation: "Maintain k largest." },
      { line: "return pq.peek();", explanation: "Top is the kth largest." }
    ]
  },
  "Task Scheduler": {
    description: "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task, and a cooling time n, return the least number of units of times that the CPU will take to finish all the given tasks.",
    constraints: ["1 <= task.length <= 10^4", "tasks[i] is upper-case English letter", "0 <= n <= 100"],
    examples: [
      { input: "tasks = ['A','A','A','B','B','B'], n = 2", output: "8", explanation: "A -> B -> idle -> A -> B -> idle -> A -> B." }
    ],
    testCases: [{ input: "['A','A','A','B','B','B']\n2", expectedOutput: "8" }],
    hints: ["Find the maximum frequency task", "Calculate idle slots based on max frequency and n", "Total time is tasks.length + remaining idle slots (if > 0)"],
    lineByLineExplanation: [
      { line: "int[] counts = new int[26]; for (char t : tasks) counts[t - 'A']++;", explanation: "Count task frequencies." },
      { line: "Arrays.sort(counts); int maxFreq = counts[25] - 1;", explanation: "Find frequency of most common task (minus one for final execution)." },
      { line: "int idleSlots = maxFreq * n;", explanation: "Initial required idle slots between the most frequent tasks." },
      { line: "for (int i = 24; i >= 0 && counts[i] > 0; i--) idleSlots -= Math.min(counts[i], maxFreq);", explanation: "Fill idle slots with other tasks." },
      { line: "return idleSlots > 0 ? idleSlots + tasks.length : tasks.length;", explanation: "Add remaining idle slots to the base length." }
    ]
  },
  "Design Twitter": {
    description: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.",
    constraints: ["1 <= userId, followerId, followeeId <= 500", "0 <= tweetId <= 10^4"],
    examples: [
      { input: "Twitter t = new Twitter(); t.postTweet(1, 5); t.getNewsFeed(1); t.follow(1, 2); t.postTweet(2, 6); t.getNewsFeed(1);", output: "[5], [6, 5]", explanation: "Standard timeline logic." }
    ],
    testCases: [{ input: "post 1 5\nget 1", expectedOutput: "[5]" }],
    hints: ["Use a global timestamp to order tweets", "Each user tracks their own tweets and who they follow", "Use a Max-Heap to merge the K most recent tweets from followed users"],
    lineByLineExplanation: [
      { line: "Map<Integer, Set<Integer>> follows = new HashMap<>();", explanation: "Maps users to the list of user IDs they follow." },
      { line: "Map<Integer, List<Tweet>> tweets = new HashMap<>();", explanation: "Maps users to their personal list of tweets." },
      { line: "PriorityQueue<Tweet> pq = new PriorityQueue<>((a, b) -> b.time - a.time);", explanation: "Max-heap to merge tweets chronologically." },
      { line: "pq.addAll(followedUserTweets);", explanation: "Add the most recent tweets of everyone the user follows." },
      { line: "while (!pq.isEmpty() && feed.size() < 10) feed.add(pq.poll().id);", explanation: "Extract exactly 10 most recent tweets." }
    ]
  },
  "Find Median from Data Stream": {
    description: "The median is the middle value in an ordered integer list. Implement the MedianFinder class to support adding numbers and retrieving the current median.",
    constraints: ["-10^5 <= num <= 10^5", "At most 5 * 10^4 calls will be made"],
    examples: [
      { input: "addNum(1); addNum(2); findMedian(); addNum(3); findMedian();", output: "1.5, 2.0", explanation: "Median of [1,2] is 1.5, of [1,2,3] is 2." }
    ],
    testCases: [{ input: "add 1\nadd 2\nget\nadd 3\nget", expectedOutput: "1.5\n2.0" }],
    hints: ["Use two heaps: a max-heap for the smaller half and a min-heap for the larger half", "Maintain the size property where maxHeap size >= minHeap size"],
    lineByLineExplanation: [
      { line: "PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());", explanation: "Max-heap holds the smaller half of numbers." },
      { line: "PriorityQueue<Integer> large = new PriorityQueue<>();", explanation: "Min-heap holds the larger half." },
      { line: "small.add(num); large.add(small.poll());", explanation: "Add to small first, then move the largest of the small half to the large half." },
      { line: "if (small.size() < large.size()) small.add(large.poll());", explanation: "Balance heaps so small holds the extra element if odd." },
      { line: "return small.size() > large.size() ? small.peek() : (small.peek() + large.peek()) / 2.0;", explanation: "Extract median." }
    ]
  },
  "Combination Sum": {
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited number of times.",
    constraints: ["1 <= candidates.length <= 30", "2 <= candidates[i] <= 40", "1 <= target <= 40"],
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]", explanation: "2 and 3 can be combined." }
    ],
    testCases: [{ input: "[2,3,6,7]\n7", expectedOutput: "[[2,2,3],[7]]" }],
    hints: ["Use backtracking", "At each index, branch into picking the current candidate (allowing it again) or skipping to the next candidate"],
    lineByLineExplanation: [
      { line: "if (target == 0) { result.add(new ArrayList<>(path)); return; }", explanation: "Found a valid combination." },
      { line: "if (target < 0 || i == candidates.length) return;", explanation: "Base case: exceeded target or exhausted candidates." },
      { line: "path.add(candidates[i]); backtrack(i, target - candidates[i], ...);", explanation: "Branch 1: Use the current candidate (don't increment index)." },
      { line: "path.remove(path.size() - 1); backtrack(i + 1, target, ...);", explanation: "Branch 2: Skip the candidate and move to the next index." }
    ]
  },
  "Combination Sum II": {
    description: "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination.",
    constraints: ["1 <= candidates.length <= 100", "1 <= candidates[i] <= 50", "1 <= target <= 30"],
    examples: [
      { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]", explanation: "Unique combinations forming 8." }
    ],
    testCases: [{ input: "[10,1,2,7,6,1,5]\n8", expectedOutput: "[[1,1,6],[1,2,5],[1,7],[2,6]]" }],
    hints: ["Sort candidates first to easily skip duplicates", "In the backtracking loop, if i > start and candidates[i] == candidates[i-1], continue to avoid duplicates"],
    lineByLineExplanation: [
      { line: "Arrays.sort(candidates);", explanation: "Crucial step to identify adjacent duplicates." },
      { line: "for (int i = start; i < candidates.length; i++)", explanation: "Iterate through remaining candidates." },
      { line: "if (i > start && candidates[i] == candidates[i-1]) continue;", explanation: "Skip duplicate elements at the same tree level to avoid duplicate sets." },
      { line: "path.add(candidates[i]); backtrack(i + 1, target - candidates[i], ...); path.remove(path.size() - 1);", explanation: "Proceed with the candidate and move to index i+1." }
    ]
  },
  "Permutations": {
    description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All integers of nums are unique."],
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "All 6 permutations." }
    ],
    testCases: [{ input: "[1,2,3]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }],
    hints: ["Use backtracking with a boolean visited array, or check if the list already contains the number"],
    lineByLineExplanation: [
      { line: "if (path.size() == nums.length) { result.add(new ArrayList<>(path)); return; }", explanation: "Permutation is complete when length equals nums length." },
      { line: "for (int num : nums)", explanation: "Iterate over all elements." },
      { line: "if (path.contains(num)) continue;", explanation: "Skip already used numbers (O(N) check, manageable since N <= 6)." },
      { line: "path.add(num); backtrack(...); path.remove(path.size() - 1);", explanation: "Add number, recurse, then backtrack." }
    ]
  },
  "Subsets II": {
    description: "Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10"],
    examples: [
      { input: "nums = [1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]", explanation: "All valid distinct subsets." }
    ],
    testCases: [{ input: "[1,2,2]", expectedOutput: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" }],
    hints: ["Sort the array first", "If choosing to skip a number, also skip all adjacent duplicates of that number"],
    lineByLineExplanation: [
      { line: "Arrays.sort(nums);", explanation: "Sort to place duplicates adjacently." },
      { line: "result.add(new ArrayList<>(path));", explanation: "Every path state represents a valid subset." },
      { line: "for (int i = start; i < nums.length; i++)", explanation: "Explore adding elements starting from index." },
      { line: "if (i > start && nums[i] == nums[i-1]) continue;", explanation: "Skip duplicates in the same position to prevent duplicate subsets." },
      { line: "path.add(nums[i]); backtrack(i + 1, ...); path.remove(path.size() - 1);", explanation: "Backtrack." }
    ]
  },
  "Word Search": {
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontal or vertical).",
    constraints: ["m == board.length", "n = board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15"],
    examples: [
      { input: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'", output: "true", explanation: "The path follows the word." }
    ],
    testCases: [{ input: "[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]\n'ABCCED'", expectedOutput: "true" }],
    hints: ["Run DFS backtracking from every cell that matches the first letter", "Temporarily mark cells as visited by changing their character (e.g. to '#')"],
    lineByLineExplanation: [
      { line: "for (int i=0; i<m; i++) for(int j=0; j<n; j++) if (dfs(i, j, 0)) return true;", explanation: "Attempt DFS from every cell." },
      { line: "if (idx == word.length()) return true;", explanation: "Entire word matched successfully." },
      { line: "if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] != word.charAt(idx)) return false;", explanation: "Out of bounds or character mismatch." },
      { line: "char tmp = board[i][j]; board[i][j] = '#';", explanation: "Mark cell as visited temporarily." },
      { line: "boolean res = dfs(i+1, j) || dfs(i-1, j) || dfs(i, j+1) || dfs(i, j-1); board[i][j] = tmp;", explanation: "Explore 4 directions, then restore character." }
    ]
  },
  "Palindrome Partitioning": {
    description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    constraints: ["1 <= s.length <= 16", "s contains only lowercase English letters."],
    examples: [
      { input: "s = 'aab'", output: "[['a','a','b'],['aa','b']]", explanation: "Both partitions form only palindromes." }
    ],
    testCases: [{ input: "'aab'", expectedOutput: "[['a','a','b'],['aa','b']]" }],
    hints: ["Use backtracking over the string length", "At each index i, check if substring s(start, i) is a palindrome. If yes, add to path and recurse"],
    lineByLineExplanation: [
      { line: "if (start == s.length()) { result.add(new ArrayList<>(path)); return; }", explanation: "When start reaches the end, a valid full partition is found." },
      { line: "for (int i = start; i < s.length(); i++)", explanation: "Try every possible ending position for a partition." },
      { line: "if (isPalindrome(s, start, i)) { path.add(s.substring(start, i+1)); backtrack(i + 1, ...); path.remove(path.size() - 1); }", explanation: "If it's a palindrome, choose it and continue partitioning the rest of the string." }
    ]
  },
  "Letter Combinations of a Phone Number": {
    description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.",
    constraints: ["0 <= digits.length <= 4", "digits[i] is a digit in the range ['2', '9']"],
    examples: [
      { input: "digits = '23'", output: "['ad','ae','af','bd','be','bf','cd','ce','cf']", explanation: "Standard dialpad mapping." }
    ],
    testCases: [{ input: "'23'", expectedOutput: "['ad','ae','af','bd','be','bf','cd','ce','cf']" }],
    hints: ["Create an array mapping digits to string of letters", "Use recursive backtracking appending each mapped character"],
    lineByLineExplanation: [
      { line: "String[] mapping = {\"\", \"\", \"abc\", \"def\", ... };", explanation: "Map digit indices to their corresponding characters." },
      { line: "if (idx == digits.length()) { result.add(path.toString()); return; }", explanation: "Base case: all digits processed." },
      { line: "String letters = mapping[digits.charAt(idx) - '0'];", explanation: "Get characters for current digit." },
      { line: "for (char c : letters.toCharArray()) { path.append(c); backtrack(idx + 1, ...); path.deleteCharAt(path.length() - 1); }", explanation: "Try each character and recurse." }
    ]
  },
  "N-Queens": {
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.",
    constraints: ["1 <= n <= 9"],
    examples: [
      { input: "n = 4", output: "[[.Q.., ...], [..Q., ...]]", explanation: "Returns all valid board layouts." }
    ],
    testCases: [{ input: "4", expectedOutput: "[[.Q.., ...]]" }],
    hints: ["Process row by row", "Keep track of columns, positive diagonals, and negative diagonals currently occupied by queens using HashSets"],
    lineByLineExplanation: [
      { line: "Set<Integer> cols = new HashSet<>(), posDiag = new HashSet<>(), negDiag = new HashSet<>();", explanation: "Track attacked lines." },
      { line: "if (row == n) { result.add(construct(board)); return; }", explanation: "All N queens successfully placed." },
      { line: "if (cols.contains(c) || posDiag.contains(row + c) || negDiag.contains(row - c)) continue;", explanation: "Check if placement is under attack." },
      { line: "board[row][c] = 'Q'; cols.add(c); posDiag.add(row + c); negDiag.add(row - c);", explanation: "Place queen and mark lines attacked." },
      { line: "backtrack(row + 1);", explanation: "Move to next row." },
      { line: "board[row][c] = '.'; cols.remove(c); ...", explanation: "Backtrack to try next column." }
    ]
  },
  "N-Queens II": {
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return the number of distinct solutions.",
    constraints: ["1 <= n <= 9"],
    examples: [
      { input: "n = 4", output: "2", explanation: "There are two distinct solutions to the 4-queens puzzle." }
    ],
    testCases: [{ input: "4", expectedOutput: "2" }],
    hints: ["Process row by row just like N-Queens", "Keep an integer count instead of constructing the full board"],
    lineByLineExplanation: [
      { line: "Set<Integer> cols = new HashSet<>(), posDiag = new HashSet<>(), negDiag = new HashSet<>();", explanation: "Track attacked lines." },
      { line: "if (row == n) return 1;", explanation: "Found a valid placement, return 1 to count it." },
      { line: "int count = 0; for (int c = 0; c < n; c++) { ... count += backtrack(row + 1); ... }", explanation: "Accumulate valid solution counts from child branches." }
    ]
  },
  "Implement Trie (Prefix Tree)": {
    description: "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class with insert, search, and startsWith methods.",
    constraints: ["1 <= word.length <= 2000", "word consists of only lowercase English letters."],
    examples: [
      { input: "Trie t = new Trie(); t.insert('apple'); t.search('apple'); t.search('app'); t.startsWith('app');", output: "true, false, true", explanation: "Validates trie logic." }
    ],
    testCases: [{ input: "insert apple\nsearch apple\nstartsWith app", expectedOutput: "true\ntrue" }],
    hints: ["Use a TrieNode class containing a boolean isWord and an array of 26 child TrieNodes", "Walk down the tree letter by letter"],
    lineByLineExplanation: [
      { line: "class TrieNode { TrieNode[] children = new TrieNode[26]; boolean isWord; }", explanation: "Basic unit of the trie structure." },
      { line: "TrieNode curr = root; for (char c : word.toCharArray()) { if (curr.children[c-'a'] == null) curr.children[c-'a'] = new TrieNode(); curr = curr.children[c-'a']; }", explanation: "Insert word by creating nodes along the path." },
      { line: "curr.isWord = true;", explanation: "Mark end of valid word." },
      { line: "TrieNode curr = root; for (char c : word.toCharArray()) { if (curr.children[c-'a'] == null) return false; curr = curr.children[c-'a']; } return curr.isWord;", explanation: "Search requires path to exist and end marker to be true." }
    ]
  },
  "Design Add and Search Words Data Structure": {
    description: "Design a data structure that supports adding new words and finding if a string matches any previously added string. The string may contain dots '.' where dots can be matched with any letter.",
    constraints: ["1 <= word.length <= 25", "word consists of lowercase letters and '.'"],
    examples: [
      { input: "addWord('bad'); addWord('dad'); search('.ad'); search('b..');", output: "true, true", explanation: "Dots act as wildcards." }
    ],
    testCases: [{ input: "addWord bad\nsearch .ad", expectedOutput: "true" }],
    hints: ["Use a Trie", "If a '.' is encountered, run DFS search on all non-null children"],
    lineByLineExplanation: [
      { line: "public boolean dfs(String word, int index, TrieNode node)", explanation: "Recursive helper to handle '.' wildcard." },
      { line: "if (index == word.length()) return node.isWord;", explanation: "Base case: checked all characters." },
      { line: "char c = word.charAt(index);", explanation: "Current character to process." },
      { line: "if (c == '.') { for (TrieNode child : node.children) if (child != null && dfs(word, index + 1, child)) return true; return false; }", explanation: "Wildcard: branch out to all existing children." },
      { line: "else return node.children[c-'a'] != null && dfs(word, index + 1, node.children[c-'a']);", explanation: "Standard letter: proceed if path exists." }
    ]
  },
  "Word Search II": {
    description: "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells.",
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 12", "1 <= words.length <= 3 * 10^4"],
    examples: [
      { input: "board = [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], words = ['oath','pea','eat','rain']", output: "['eat','oath']", explanation: "Both words are found on the board." }
    ],
    testCases: [{ input: "[['o','a'],['e','t']]\n['oath','eat']", expectedOutput: "['eat']" }],
    hints: ["Insert all words into a Trie", "Run DFS from every cell on the board, walking down the Trie simultaneously", "Avoid duplicate matches by modifying the Trie (e.g. setting node.word = null after finding it)"],
    lineByLineExplanation: [
      { line: "TrieNode root = new TrieNode(); for (String w : words) insert(w);", explanation: "Build Trie of all target words." },
      { line: "for (int i=0; i<m; i++) for (int j=0; j<n; j++) dfs(board, i, j, root);", explanation: "Start DFS from each grid cell." },
      { line: "char c = board[r][c]; if (c == '#' || node.children[c-'a'] == null) return;", explanation: "Stop if visited or path doesn't exist in Trie." },
      { line: "node = node.children[c-'a']; if (node.word != null) { res.add(node.word); node.word = null; }", explanation: "If we complete a word in the Trie, add it and remove it from Trie to prevent duplicates." },
      { line: "board[r][c] = '#'; dfs(...); board[r][c] = c;", explanation: "Standard board backtracking." }
    ]
  },
  "Clone Graph": {
    description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    constraints: ["The number of nodes in the graph is in the range [0, 100]", "1 <= Node.val <= 100"],
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]", explanation: "Exact identical structure via deep clone." }
    ],
    testCases: [{ input: "[[2,4],[1,3],[2,4],[1,3]]", expectedOutput: "[[2,4],[1,3],[2,4],[1,3]]" }],
    hints: ["Use a HashMap to map original nodes to their copies", "Use DFS or BFS to traverse the graph"],
    lineByLineExplanation: [
      { line: "Map<Node, Node> map = new HashMap<>();", explanation: "Stores cloned nodes to prevent infinite loops on cycles." },
      { line: "private Node dfs(Node node)", explanation: "Recursive cloning helper." },
      { line: "if (node == null) return null; if (map.containsKey(node)) return map.get(node);", explanation: "Return early if already cloned." },
      { line: "Node clone = new Node(node.val); map.put(node, clone);", explanation: "Create clone and save it immediately." },
      { line: "for (Node neighbor : node.neighbors) clone.neighbors.add(dfs(neighbor));", explanation: "Recursively clone and attach all neighbors." },
      { line: "return clone;", explanation: "Return the completed deep copy." }
    ]
  }
};
