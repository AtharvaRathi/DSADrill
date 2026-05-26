import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import BaseQuestion from '../models/BaseQuestion';
import { batch1Enrichments } from './seederDataBatch1';
import { batch2Enrichments } from './seederDataBatch2';
import { batch3Enrichments } from './seederDataBatch3';
import { batch4Enrichments } from './seederDataBatch4';
import { batch5Enrichments } from './seederDataBatch5';
import { batch6Enrichments } from './seederDataBatch6';
import { batch7Enrichments } from './seederDataBatch7';
import { batch8Enrichments } from './seederDataBatch8';
import { batch9Enrichments } from './seederDataBatch9';
import { batch10Enrichments } from './seederDataBatch10';
import { batch11Enrichments } from './seederDataBatch11';

dotenv.config();

const mkQ = (
  t: string, n: number, d: 'Easy' | 'Medium' | 'Hard', c: string, 
  p: string, ms: string, tg: string[]
) => {
  let slug = t.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-');
  let ret = '';
  if (ms.includes('boolean ')) ret = 'return false;';
  else if (ms.includes('int ') && !ms.includes('int[]')) ret = 'return 0;';
  else if (ms.includes('double ')) ret = 'return 0.0;';
  else if (ms.includes('void ')) ret = '';
  else ret = 'return null;';

  return {
    title: t,
    difficulty: d,
    category: c,
    leetcodeNumber: n,
    leetcodeLink: `https://leetcode.com/problems/${slug}/`,
    corePattern: p,
    javaStarterCode: `public class Main {\n    public static void main(String[] args) {\n        // test your solution here\n    }\n    ${ms} {\n        ${ret}\n    }\n}`,
    tags: tg,
    isActive: true,
    testCases: []
  };
};

const allQuestions = [
  // Arrays & Hashing
  mkQ("Contains Duplicate", 217, "Easy", "Arrays & Hashing", "Use a HashSet to store seen elements for O(1) lookup.", "public boolean containsDuplicate(int[] nums)", ["array", "hash-table"]),
  mkQ("Valid Anagram", 242, "Easy", "Arrays & Hashing", "Use an array of size 26 to count character frequencies.", "public boolean isAnagram(String s, String t)", ["string", "hash-table"]),
  mkQ("Two Sum", 1, "Easy", "Arrays & Hashing", "Store value-to-index mapping in a HashMap to find complements.", "public int[] twoSum(int[] nums, int target)", ["array", "hash-table"]),
  mkQ("Group Anagrams", 49, "Medium", "Arrays & Hashing", "Use sorted string or char count string as HashMap keys.", "public List<List<String>> groupAnagrams(String[] strs)", ["array", "hash-table", "string"]),
  mkQ("Top K Frequent Elements", 347, "Medium", "Arrays & Hashing", "Count frequencies, then use a Min-Heap or Bucket Sort.", "public int[] topKFrequent(int[] nums, int k)", ["array", "hash-table", "heap"]),
  mkQ("Encode and Decode Strings", 271, "Medium", "Arrays & Hashing", "Prefix strings with their length and a delimiter (e.g. '5#hello').", "public String encode(List<String> strs) { return \"\"; }\n    public List<String> decode(String s)", ["array", "string", "design"]),
  mkQ("Product of Array Except Self", 238, "Medium", "Arrays & Hashing", "Compute prefix and suffix products in two passes without division.", "public int[] productExceptSelf(int[] nums)", ["array", "prefix-sum"]),
  mkQ("Valid Sudoku", 36, "Medium", "Arrays & Hashing", "Use HashSets for each row, column, and 3x3 sub-box to check duplicates.", "public boolean isValidSudoku(char[][] board)", ["array", "hash-table", "matrix"]),
  mkQ("Longest Consecutive Sequence", 128, "Medium", "Arrays & Hashing", "Add elements to HashSet, then only build sequences starting from left-most elements.", "public int longestConsecutive(int[] nums)", ["array", "hash-table"]),

  // Two Pointers
  mkQ("Valid Palindrome", 125, "Easy", "Two Pointers", "Use left and right pointers moving inward, skipping non-alphanumeric characters.", "public boolean isPalindrome(String s)", ["two-pointers", "string"]),
  mkQ("Two Sum II - Input Array Is Sorted", 167, "Medium", "Two Pointers", "Shrink the window from both ends based on the sum compared to the target.", "public int[] twoSum(int[] numbers, int target)", ["array", "two-pointers", "binary-search"]),
  mkQ("3Sum", 15, "Medium", "Two Pointers", "Sort the array and iterate, using Two Sum II logic for the remaining elements.", "public List<List<Integer>> threeSum(int[] nums)", ["array", "two-pointers"]),
  mkQ("Container With Most Water", 11, "Medium", "Two Pointers", "Use two pointers at the ends, moving the pointer with the smaller height.", "public int maxArea(int[] height)", ["array", "two-pointers", "greedy"]),
  mkQ("Trapping Rain Water", 42, "Hard", "Two Pointers", "Use left and right pointers tracking max heights to compute trapped water.", "public int trap(int[] height)", ["array", "two-pointers", "dynamic-programming"]),

  // Sliding Window
  mkQ("Best Time to Buy and Sell Stock", 121, "Easy", "Sliding Window", "Track the minimum price seen so far and calculate max profit.", "public int maxProfit(int[] prices)", ["array", "dynamic-programming"]),
  mkQ("Longest Substring Without Repeating Characters", 3, "Medium", "Sliding Window", "Use a sliding window and a HashSet/HashMap to track characters.", "public int lengthOfLongestSubstring(String s)", ["hash-table", "string", "sliding-window"]),
  mkQ("Longest Repeating Character Replacement", 424, "Medium", "Sliding Window", "Maintain a window where (window_len - max_freq_char) <= k.", "public int characterReplacement(String s, int k)", ["hash-table", "string", "sliding-window"]),
  mkQ("Permutation in String", 567, "Medium", "Sliding Window", "Use sliding window of fixed length with character frequency arrays.", "public boolean checkInclusion(String s1, String s2)", ["hash-table", "two-pointers", "string"]),
  mkQ("Minimum Window Substring", 76, "Hard", "Sliding Window", "Expand window to include all chars, then contract to find the minimum length.", "public String minWindow(String s, String t)", ["hash-table", "string", "sliding-window"]),
  mkQ("Sliding Window Maximum", 239, "Hard", "Sliding Window", "Use a monotonic decreasing deque to store indices of potential maximums.", "public int[] maxSlidingWindow(int[] nums, int k)", ["array", "sliding-window", "queue"]),

  // Stack
  mkQ("Valid Parentheses", 20, "Easy", "Stack", "Push opening brackets, pop and match on closing brackets.", "public boolean isValid(String s)", ["string", "stack"]),
  mkQ("Min Stack", 155, "Medium", "Stack", "Maintain a main stack and a parallel stack tracking minimums.", "public void push(int val) {}\n    public void pop() {}\n    public int top() { return 0; }\n    public int getMin()", ["stack", "design"]),
  mkQ("Evaluate Reverse Polish Notation", 150, "Medium", "Stack", "Push operands, pop two operands upon encountering an operator.", "public int evalRPN(String[] tokens)", ["array", "math", "stack"]),
  mkQ("Generate Parentheses", 22, "Medium", "Stack", "Use recursion tracking open and close counts.", "public List<String> generateParenthesis(int n)", ["string", "dynamic-programming", "backtracking"]),
  mkQ("Daily Temperatures", 739, "Medium", "Stack", "Use a monotonic decreasing stack to find the next greater element.", "public int[] dailyTemperatures(int[] temperatures)", ["array", "stack", "monotonic-stack"]),
  mkQ("Car Fleet", 853, "Medium", "Stack", "Sort by position, calculate time to destination, count strictly increasing times.", "public int carFleet(int target, int[] position, int[] speed)", ["array", "stack", "sorting"]),
  mkQ("Largest Rectangle in Histogram", 84, "Hard", "Stack", "Maintain a monotonic increasing stack of indices.", "public int largestRectangleArea(int[] heights)", ["array", "stack", "monotonic-stack"]),

  // Binary Search
  mkQ("Binary Search", 704, "Easy", "Binary Search", "Classic binary search on a sorted array.", "public int search(int[] nums, int target)", ["array", "binary-search"]),
  mkQ("Search a 2D Matrix", 74, "Medium", "Binary Search", "Treat the matrix as a 1D array and binary search.", "public boolean searchMatrix(int[][] matrix, int target)", ["array", "binary-search", "matrix"]),
  mkQ("Koko Eating Bananas", 875, "Medium", "Binary Search", "Binary search the eating speed between 1 and max(piles).", "public int minEatingSpeed(int[] piles, int h)", ["array", "binary-search"]),
  mkQ("Find Minimum in Rotated Sorted Array", 153, "Medium", "Binary Search", "Compare mid with the rightmost element to find the inflection point.", "public int findMin(int[] nums)", ["array", "binary-search"]),
  mkQ("Search in Rotated Sorted Array", 33, "Medium", "Binary Search", "Determine which half is properly sorted and search there.", "public int search(int[] nums, int target)", ["array", "binary-search"]),
  mkQ("Time Based Key-Value Store", 981, "Medium", "Binary Search", "Store lists of pairs and use binary search to find the correct timestamp.", "public void set(String key, String value, int timestamp) {}\n    public String get(String key, int timestamp)", ["hash-table", "string", "binary-search"]),
  mkQ("Median of Two Sorted Arrays", 4, "Hard", "Binary Search", "Binary search on the smaller array to partition both arrays correctly.", "public double findMedianSortedArrays(int[] nums1, int[] nums2)", ["array", "binary-search", "divide-and-conquer"]),

  // Linked List
  mkQ("Reverse Linked List", 206, "Easy", "Linked List", "Iterate through, changing next pointers to the previous node.", "public ListNode reverseList(ListNode head)", ["linked-list", "recursion"]),
  mkQ("Merge Two Sorted Lists", 21, "Easy", "Linked List", "Use a dummy head and attach the smaller nodes iteratively.", "public ListNode mergeTwoLists(ListNode list1, ListNode list2)", ["linked-list", "recursion"]),
  mkQ("Reorder List", 143, "Medium", "Linked List", "Find middle, reverse the second half, and merge the two halves.", "public void reorderList(ListNode head)", ["linked-list", "two-pointers"]),
  mkQ("Remove Nth Node From End of List", 19, "Medium", "Linked List", "Use a fast pointer N steps ahead, then move both to find the target.", "public ListNode removeNthFromEnd(ListNode head, int n)", ["linked-list", "two-pointers"]),
  mkQ("Copy List with Random Pointer", 138, "Medium", "Linked List", "Interweave copied nodes or use a HashMap to map original to copy.", "public Node copyRandomList(Node head)", ["hash-table", "linked-list"]),
  mkQ("Add Two Numbers", 2, "Medium", "Linked List", "Iterate and add node values plus carry, creating new nodes.", "public ListNode addTwoNumbers(ListNode l1, ListNode l2)", ["linked-list", "math"]),
  mkQ("Linked List Cycle", 141, "Easy", "Linked List", "Floyd's Tortoise and Hare algorithm (slow and fast pointers).", "public boolean hasCycle(ListNode head)", ["hash-table", "linked-list", "two-pointers"]),
  mkQ("Find the Duplicate Number", 287, "Medium", "Linked List", "Treat values as pointers and find the cycle entry point.", "public int findDuplicate(int[] nums)", ["array", "two-pointers", "binary-search"]),
  mkQ("LRU Cache", 146, "Medium", "Linked List", "Use a HashMap and a Doubly Linked List for O(1) operations.", "public int get(int key) { return 0; }\n    public void put(int key, int value)", ["hash-table", "linked-list", "design"]),
  mkQ("Merge K Sorted Lists", 23, "Hard", "Linked List", "Use a Min-Heap or divide and conquer to merge pairs.", "public ListNode mergeKLists(ListNode[] lists)", ["linked-list", "divide-and-conquer", "heap"]),
  mkQ("Reverse Nodes in K-Group", 25, "Hard", "Linked List", "Check if k nodes exist, reverse them, and reconnect.", "public ListNode reverseKGroup(ListNode head, int k)", ["linked-list", "recursion"]),

  // Trees
  mkQ("Invert Binary Tree", 226, "Easy", "Trees", "Recursively swap left and right children.", "public TreeNode invertTree(TreeNode root)", ["tree", "depth-first-search"]),
  mkQ("Maximum Depth of Binary Tree", 104, "Easy", "Trees", "Return 1 + max of left and right depths recursively.", "public int maxDepth(TreeNode root)", ["tree", "depth-first-search"]),
  mkQ("Diameter of Binary Tree", 543, "Easy", "Trees", "Calculate heights while updating a global max diameter.", "public int diameterOfBinaryTree(TreeNode root)", ["tree", "depth-first-search"]),
  mkQ("Balanced Binary Tree", 110, "Easy", "Trees", "Recursively check heights, returning -1 if unbalanced.", "public boolean isBalanced(TreeNode root)", ["tree", "depth-first-search"]),
  mkQ("Same Tree", 100, "Easy", "Trees", "Recursively check equality of values and subtrees.", "public boolean isSameTree(TreeNode p, TreeNode q)", ["tree", "depth-first-search"]),
  mkQ("Subtree of Another Tree", 572, "Easy", "Trees", "Traverse main tree, using same tree logic at each node.", "public boolean isSubtree(TreeNode root, TreeNode subRoot)", ["tree", "depth-first-search"]),
  mkQ("Lowest Common Ancestor of a BST", 235, "Medium", "Trees", "Traverse left or right based on split point of p and q.", "public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)", ["tree", "depth-first-search", "binary-search-tree"]),
  mkQ("Binary Tree Level Order Traversal", 102, "Medium", "Trees", "Use a queue and process level by level.", "public List<List<Integer>> levelOrder(TreeNode root)", ["tree", "breadth-first-search"]),
  mkQ("Binary Tree Right Side View", 199, "Medium", "Trees", "BFS taking the last element of each level, or modified DFS.", "public List<Integer> rightSideView(TreeNode root)", ["tree", "depth-first-search", "breadth-first-search"]),
  mkQ("Count Good Nodes in Binary Tree", 1448, "Medium", "Trees", "DFS carrying the maximum value seen so far on the path.", "public int goodNodes(TreeNode root)", ["tree", "depth-first-search"]),
  mkQ("Validate Binary Search Tree", 98, "Medium", "Trees", "DFS maintaining valid min and max boundaries.", "public boolean isValidBST(TreeNode root)", ["tree", "depth-first-search", "binary-search-tree"]),
  mkQ("Kth Smallest Element in a BST", 230, "Medium", "Trees", "Inorder traversal visits elements in sorted order.", "public int kthSmallest(TreeNode root, int k)", ["tree", "depth-first-search", "binary-search-tree"]),
  mkQ("Construct Binary Tree from Preorder and Inorder Traversal", 105, "Medium", "Trees", "Preorder gives root, inorder gives left/right subtree sizes.", "public TreeNode buildTree(int[] preorder, int[] inorder)", ["array", "hash-table", "divide-and-conquer", "tree"]),
  mkQ("Binary Tree Maximum Path Sum", 124, "Hard", "Trees", "DFS calculating max branch sum while updating global path sum.", "public int maxPathSum(TreeNode root)", ["dynamic-programming", "tree", "depth-first-search"]),
  mkQ("Serialize and Deserialize Binary Tree", 297, "Hard", "Trees", "Use preorder traversal with null markers for serialization.", "public String serialize(TreeNode root) { return \"\"; }\n    public TreeNode deserialize(String data)", ["string", "tree", "depth-first-search"]),

  // Heap / Priority Queue
  mkQ("Kth Largest Element in a Stream", 703, "Easy", "Heap / Priority Queue", "Maintain a min-heap of size K.", "public int add(int val)", ["tree", "design", "binary-search-tree", "heap"]),
  mkQ("Last Stone Weight", 1046, "Easy", "Heap / Priority Queue", "Use a max-heap to repeatedly smash the two largest stones.", "public int lastStoneWeight(int[] stones)", ["array", "heap"]),
  mkQ("K Closest Points to Origin", 973, "Medium", "Heap / Priority Queue", "Use a max-heap of size K or QuickSelect.", "public int[][] kClosest(int[][] points, int k)", ["array", "math", "divide-and-conquer", "heap"]),
  mkQ("Kth Largest Element in an Array", 215, "Medium", "Heap / Priority Queue", "Use QuickSelect or a min-heap of size K.", "public int findKthLargest(int[] nums, int k)", ["array", "divide-and-conquer", "sorting", "heap"]),
  mkQ("Task Scheduler", 621, "Medium", "Heap / Priority Queue", "Count frequencies, max instances dominate the formula.", "public int leastInterval(char[] tasks, int n)", ["array", "hash-table", "greedy", "sorting", "heap"]),
  mkQ("Design Twitter", 355, "Medium", "Heap / Priority Queue", "Merge K sorted lists approach for generating feeds.", "public void postTweet(int userId, int tweetId) {}\n    public List<Integer> getNewsFeed(int userId) { return null; }\n    public void follow(int followerId, int followeeId) {}\n    public void unfollow(int followerId, int followeeId)", ["hash-table", "linked-list", "design", "heap"]),
  mkQ("Find Median from Data Stream", 295, "Hard", "Heap / Priority Queue", "Use two heaps (max-heap for lower half, min-heap for upper half).", "public void addNum(int num) {}\n    public double findMedian()", ["two-pointers", "design", "sorting", "heap"]),

  // Backtracking
  mkQ("Subsets", 78, "Medium", "Backtracking", "Include or exclude each element in recursive tree.", "public List<List<Integer>> subsets(int[] nums)", ["array", "backtracking"]),
  mkQ("Combination Sum", 39, "Medium", "Backtracking", "Recursively choose element or skip to next, allowing repeats.", "public List<List<Integer>> combinationSum(int[] candidates, int target)", ["array", "backtracking"]),
  mkQ("Combination Sum II", 40, "Medium", "Backtracking", "Sort, then skip consecutive duplicates when branching.", "public List<List<Integer>> combinationSum2(int[] candidates, int target)", ["array", "backtracking"]),
  mkQ("Permutations", 46, "Medium", "Backtracking", "Swap elements or maintain a visited array during recursion.", "public List<List<Integer>> permute(int[] nums)", ["array", "backtracking"]),
  mkQ("Subsets II", 90, "Medium", "Backtracking", "Sort first, skip duplicates during recursive branching.", "public List<List<Integer>> subsetsWithDup(int[] nums)", ["array", "backtracking"]),
  mkQ("Word Search", 79, "Medium", "Backtracking", "DFS from each cell, marking visited temporarily.", "public boolean exist(char[][] board, String word)", ["array", "backtracking", "matrix"]),
  mkQ("Palindrome Partitioning", 131, "Medium", "Backtracking", "Branch on valid palindrome prefixes.", "public List<List<String>> partition(String s)", ["string", "dynamic-programming", "backtracking"]),
  mkQ("Letter Combinations of a Phone Number", 17, "Medium", "Backtracking", "Map digits to chars, recursively append to path.", "public List<String> letterCombinations(String digits)", ["hash-table", "string", "backtracking"]),
  mkQ("N-Queens", 51, "Hard", "Backtracking", "Place row by row, validating columns and diagonals.", "public List<List<String>> solveNQueens(int n)", ["array", "backtracking"]),
  mkQ("N-Queens II", 52, "Hard", "Backtracking", "Same as N-Queens but increment counter instead of storing boards.", "public int totalNQueens(int n)", ["backtracking"]),

  // Tries
  mkQ("Implement Trie (Prefix Tree)", 208, "Medium", "Tries", "Tree of maps/arrays linking characters to nodes with an isWord flag.", "public void insert(String word) {}\n    public boolean search(String word) { return false; }\n    public boolean startsWith(String prefix)", ["hash-table", "string", "design", "trie"]),
  mkQ("Design Add and Search Words Data Structure", 211, "Medium", "Tries", "DFS on Trie handling '.' as any child node.", "public void addWord(String word) {}\n    public boolean search(String word)", ["string", "depth-first-search", "design", "trie"]),
  mkQ("Word Search II", 212, "Hard", "Tries", "Build Trie from words, run DFS on board checking Trie branches.", "public List<String> findWords(char[][] board, String[] words)", ["array", "string", "backtracking", "trie"]),

  // Graphs
  mkQ("Number of Islands", 200, "Medium", "Graphs", "Iterate cells, run DFS/BFS to sink islands (mark visited).", "public int numIslands(char[][] grid)", ["array", "depth-first-search", "breadth-first-search", "union-find", "matrix"]),
  mkQ("Clone Graph", 133, "Medium", "Graphs", "DFS/BFS using HashMap to map original nodes to clones.", "public Node cloneGraph(Node node)", ["hash-table", "depth-first-search", "breadth-first-search", "graph"]),
  mkQ("Max Area of Island", 695, "Medium", "Graphs", "DFS accumulating area of connected 1s.", "public int maxAreaOfIsland(int[][] grid)", ["array", "depth-first-search", "breadth-first-search", "union-find", "matrix"]),
  mkQ("Pacific Atlantic Water Flow", 417, "Medium", "Graphs", "DFS inwards from the two oceans, tracking reachable cells.", "public List<List<Integer>> pacificAtlantic(int[][] heights)", ["array", "depth-first-search", "breadth-first-search", "matrix"]),
  mkQ("Surrounded Regions", 130, "Medium", "Graphs", "DFS from borders to save connected O's, then flip the rest.", "public void solve(char[][] board)", ["array", "depth-first-search", "breadth-first-search", "matrix"]),
  mkQ("Rotting Oranges", 994, "Medium", "Graphs", "Multi-source BFS from all rotten oranges.", "public int orangesRotting(int[][] grid)", ["array", "breadth-first-search", "matrix"]),
  mkQ("Walls and Gates", 286, "Medium", "Graphs", "Multi-source BFS from gates outward.", "public void wallsAndGates(int[][] rooms)", ["array", "breadth-first-search", "matrix"]),
  mkQ("Course Schedule", 207, "Medium", "Graphs", "Cycle detection in directed graph using DFS or Kahn's algorithm.", "public boolean canFinish(int numCourses, int[][] prerequisites)", ["depth-first-search", "breadth-first-search", "graph", "topological-sort"]),
  mkQ("Course Schedule II", 210, "Medium", "Graphs", "Topological sort using Kahn's algorithm or DFS post-order.", "public int[] findOrder(int numCourses, int[][] prerequisites)", ["depth-first-search", "breadth-first-search", "graph", "topological-sort"]),
  mkQ("Redundant Connection", 684, "Medium", "Graphs", "Use Union-Find to detect cycles when adding edges.", "public int[] findRedundantConnection(int[][] edges)", ["depth-first-search", "breadth-first-search", "union-find", "graph"]),
  mkQ("Number of Connected Components in an Undirected Graph", 323, "Medium", "Graphs", "DFS/BFS to count components or Union-Find.", "public int countComponents(int n, int[][] edges)", ["depth-first-search", "breadth-first-search", "union-find", "graph"]),
  mkQ("Graph Valid Tree", 261, "Medium", "Graphs", "Check for exactly n-1 edges and fully connected graph.", "public boolean validTree(int n, int[][] edges)", ["depth-first-search", "breadth-first-search", "union-find", "graph"]),
  mkQ("Word Ladder", 127, "Hard", "Graphs", "Bidirectional BFS or BFS using a wildcard pattern hashmap.", "public int ladderLength(String beginWord, String endWord, List<String> wordList)", ["hash-table", "string", "breadth-first-search"]),

  // Advanced Graphs
  mkQ("Reconstruct Itinerary", 332, "Hard", "Advanced Graphs", "Hierholzer's algorithm for Eulerian Path.", "public List<String> findItinerary(List<List<String>> tickets)", ["depth-first-search", "graph", "eulerian-circuit"]),
  mkQ("Min Cost to Connect All Points", 1584, "Medium", "Advanced Graphs", "Prim's or Kruskal's algorithm for Minimum Spanning Tree.", "public int minCostConnectPoints(int[][] points)", ["array", "union-find", "graph", "minimum-spanning-tree"]),
  mkQ("Network Delay Time", 743, "Medium", "Advanced Graphs", "Dijkstra's algorithm or Bellman-Ford.", "public int networkDelayTime(int[][] times, int n, int k)", ["depth-first-search", "breadth-first-search", "graph", "shortest-path"]),
  mkQ("Swim in Rising Water", 778, "Hard", "Advanced Graphs", "Dijkstra's algorithm or Union Find with sorted heights.", "public int swimInWater(int[][] grid)", ["array", "binary-search", "union-find", "heap"]),
  mkQ("Alien Dictionary", 269, "Hard", "Advanced Graphs", "Topological sort after building dependency graph.", "public String alienOrder(String[] words)", ["array", "string", "depth-first-search", "breadth-first-search", "graph", "topological-sort"]),
  mkQ("Cheapest Flights Within K Stops", 787, "Medium", "Advanced Graphs", "Bellman-Ford algorithm bounded by K iterations.", "public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k)", ["dynamic-programming", "depth-first-search", "breadth-first-search", "graph", "shortest-path"]),

  // 1-D Dynamic Programming
  mkQ("Climbing Stairs", 70, "Easy", "1-D Dynamic Programming", "Calculate Fibonacci numbers dynamically.", "public int climbStairs(int n)", ["math", "dynamic-programming", "memoization"]),
  mkQ("Min Cost Climbing Stairs", 746, "Easy", "1-D Dynamic Programming", "dp[i] = cost[i] + min(dp[i-1], dp[i-2]).", "public int minCostClimbingStairs(int[] cost)", ["array", "dynamic-programming"]),
  mkQ("House Robber", 198, "Medium", "1-D Dynamic Programming", "dp[i] = max(dp[i-1], dp[i-2] + nums[i]).", "public int rob(int[] nums)", ["array", "dynamic-programming"]),
  mkQ("House Robber II", 213, "Medium", "1-D Dynamic Programming", "Run House Robber twice (skip first, skip last).", "public int rob(int[] nums)", ["array", "dynamic-programming"]),
  mkQ("Longest Palindromic Substring", 5, "Medium", "1-D Dynamic Programming", "Expand around centers.", "public String longestPalindrome(String s)", ["string", "dynamic-programming"]),
  mkQ("Palindromic Substrings", 647, "Medium", "1-D Dynamic Programming", "Count expansions around every possible center.", "public int countSubstrings(String s)", ["string", "dynamic-programming"]),
  mkQ("Decode Ways", 91, "Medium", "1-D Dynamic Programming", "Count ways based on validity of 1-digit and 2-digit groups.", "public int numDecodings(String s)", ["string", "dynamic-programming"]),
  mkQ("Coin Change", 322, "Medium", "1-D Dynamic Programming", "Unbounded knapsack approach (dp[amt] = min(dp[amt-coin] + 1)).", "public int coinChange(int[] coins, int amount)", ["array", "dynamic-programming", "breadth-first-search"]),
  mkQ("Maximum Product Subarray", 152, "Medium", "1-D Dynamic Programming", "Track current max and current min products.", "public int maxProduct(int[] nums)", ["array", "dynamic-programming"]),
  mkQ("Word Break", 139, "Medium", "1-D Dynamic Programming", "Check valid prefixes against word dict at each index.", "public boolean wordBreak(String s, List<String> wordDict)", ["hash-table", "string", "dynamic-programming", "trie"]),
  mkQ("Longest Increasing Subsequence", 300, "Medium", "1-D Dynamic Programming", "dp[i] = max(dp[j] + 1) for j < i or binary search with tails.", "public int lengthOfLIS(int[] nums)", ["array", "binary-search", "dynamic-programming"]),
  mkQ("Partition Equal Subset Sum", 416, "Medium", "1-D Dynamic Programming", "0/1 Knapsack for target = sum/2 using boolean DP array.", "public boolean canPartition(int[] nums)", ["array", "dynamic-programming"]),

  // 2-D Dynamic Programming
  mkQ("Unique Paths", 62, "Medium", "2-D Dynamic Programming", "dp[r][c] = dp[r-1][c] + dp[r][c-1].", "public int uniquePaths(int m, int n)", ["math", "dynamic-programming", "combinatorics"]),
  mkQ("Longest Common Subsequence", 1143, "Medium", "2-D Dynamic Programming", "If match, dp[i][j] = dp[i-1][j-1]+1, else max of ignoring 1 char.", "public int longestCommonSubsequence(String text1, String text2)", ["string", "dynamic-programming"]),
  mkQ("Best Time to Buy and Sell Stock with Cooldown", 309, "Medium", "2-D Dynamic Programming", "State machine with hold, free, cooldown states.", "public int maxProfit(int[] prices)", ["array", "dynamic-programming"]),
  mkQ("Coin Change II", 518, "Medium", "2-D Dynamic Programming", "Unbounded Knapsack for counting combinations.", "public int change(int amount, int[] coins)", ["array", "dynamic-programming"]),
  mkQ("Target Sum", 494, "Medium", "2-D Dynamic Programming", "0/1 Knapsack to achieve specific subset sum derived from target.", "public int findTargetSumWays(int[] nums, int target)", ["array", "dynamic-programming", "backtracking"]),
  mkQ("Interleaving String", 97, "Medium", "2-D Dynamic Programming", "Verify combinations taking from s1 or s2 at index i,j.", "public boolean isInterleave(String s1, String s2, String s3)", ["string", "dynamic-programming"]),
  mkQ("Longest Increasing Path in a Matrix", 329, "Hard", "2-D Dynamic Programming", "DFS with memoization.", "public int longestIncreasingPath(int[][] matrix)", ["array", "dynamic-programming", "depth-first-search", "matrix"]),
  mkQ("Distinct Subsequences", 115, "Hard", "2-D Dynamic Programming", "Match counts, propagating previous totals.", "public int numDistinct(String s, String t)", ["string", "dynamic-programming"]),
  mkQ("Edit Distance", 72, "Medium", "2-D Dynamic Programming", "Transform via insert/delete/replace taking min costs.", "public int minDistance(String word1, String word2)", ["string", "dynamic-programming"]),
  mkQ("Burst Balloons", 312, "Hard", "2-D Dynamic Programming", "Reverse thinking: which balloon is burst last.", "public int maxCoins(int[] nums)", ["array", "dynamic-programming"]),
  mkQ("Regular Expression Matching", 10, "Hard", "2-D Dynamic Programming", "Complex DP for character and '*' matching.", "public boolean isMatch(String s, String p)", ["string", "dynamic-programming", "recursion"]),

  // Greedy
  mkQ("Maximum Subarray", 53, "Medium", "Greedy", "Kadane's algorithm. Drop negative prefixes.", "public int maxSubArray(int[] nums)", ["array", "divide-and-conquer", "dynamic-programming"]),
  mkQ("Jump Game", 55, "Medium", "Greedy", "Track max reachable index.", "public boolean canJump(int[] nums)", ["array", "dynamic-programming", "greedy"]),
  mkQ("Jump Game II", 45, "Medium", "Greedy", "BFS-like window tracking current jump bounds.", "public int jump(int[] nums)", ["array", "dynamic-programming", "greedy"]),
  mkQ("Gas Station", 134, "Medium", "Greedy", "If total gas > cost, valid. Greedily advance start if tank drops < 0.", "public int canCompleteCircuit(int[] gas, int[] cost)", ["array", "greedy"]),
  mkQ("Hand of Straights", 846, "Medium", "Greedy", "Count elements with TreeMap or HashMap + Heap, build straights.", "public boolean isNStraightHand(int[] hand, int groupSize)", ["array", "hash-table", "greedy", "sorting"]),
  mkQ("Merge Triplets to Form Target Triplet", 1899, "Medium", "Greedy", "Filter invalid triplets, check if remaining maxes meet target.", "public boolean mergeTriplets(int[][] triplets, int[] target)", ["array", "greedy"]),
  mkQ("Partition Labels", 763, "Medium", "Greedy", "Find last occurrence of each char to bound the current partition.", "public List<Integer> partitionLabels(String s)", ["hash-table", "two-pointers", "string", "greedy"]),
  mkQ("Valid Parenthesis String", 678, "Medium", "Greedy", "Track min and max possible open parenthesis.", "public boolean checkValidString(String s)", ["string", "dynamic-programming", "stack", "greedy"]),

  // Intervals
  mkQ("Insert Interval", 57, "Medium", "Intervals", "Iterate left, merge overlapping, add right.", "public int[][] insert(int[][] intervals, int[] newInterval)", ["array", "sorting"]),
  mkQ("Merge Intervals", 56, "Medium", "Intervals", "Sort by start times, merge if ends overlap.", "public int[][] merge(int[][] intervals)", ["array", "sorting"]),
  mkQ("Non-overlapping Intervals", 435, "Medium", "Intervals", "Sort by end times, greedily pick intervals ending earliest.", "public int eraseOverlapIntervals(int[][] intervals)", ["array", "dynamic-programming", "greedy", "sorting"]),
  mkQ("Meeting Rooms", 252, "Easy", "Intervals", "Sort by start time, check if consecutive intervals overlap.", "public boolean canAttendMeetings(int[][] intervals)", ["array", "sorting"]),
  mkQ("Meeting Rooms II", 253, "Medium", "Intervals", "Min-heap for end times, or sweep-line algorithm.", "public int minMeetingRooms(int[][] intervals)", ["array", "two-pointers", "greedy", "sorting", "heap"]),
  mkQ("Minimum Interval to Include Each Query", 1851, "Hard", "Intervals", "Sort queries, use Min-Heap of intervals ordered by size.", "public int[] minInterval(int[][] intervals, int[] queries)", ["array", "binary-search", "line-sweep", "sorting", "heap"]),

  // Math & Geometry
  mkQ("Rotate Image", 48, "Medium", "Math & Geometry", "Transpose matrix, then reverse each row.", "public void rotate(int[][] matrix)", ["array", "math", "matrix"]),
  mkQ("Spiral Matrix", 54, "Medium", "Math & Geometry", "Maintain 4 boundary pointers moving inward.", "public List<Integer> spiralOrder(int[][] matrix)", ["array", "matrix", "simulation"]),
  mkQ("Set Matrix Zeroes", 73, "Medium", "Math & Geometry", "Use first row and column as marker arrays.", "public void setZeroes(int[][] matrix)", ["array", "hash-table", "matrix"]),
  mkQ("Happy Number", 202, "Easy", "Math & Geometry", "Detect cycles using HashSet or Fast/Slow pointers.", "public boolean isHappy(int n)", ["hash-table", "math", "two-pointers"]),
  mkQ("Plus One", 66, "Easy", "Math & Geometry", "Iterate backward, handle carry-over logic.", "public int[] plusOne(int[] digits)", ["array", "math"]),
  mkQ("Pow(x, n)", 50, "Medium", "Math & Geometry", "Binary exponentiation (x^n = (x^2)^(n/2)).", "public double myPow(double x, int n)", ["math", "recursion"]),
  mkQ("Multiply Strings", 43, "Medium", "Math & Geometry", "Simulate multiplication in an array.", "public String multiply(String num1, String num2)", ["math", "string", "simulation"]),
  mkQ("Detect Squares", 2013, "Medium", "Math & Geometry", "Store point frequencies, search for valid diagonals.", "public void add(int[] point) {}\n    public int count(int[] point)", ["array", "hash-table", "math", "design"]),

  // Bit Manipulation
  mkQ("Single Number", 136, "Easy", "Bit Manipulation", "XOR all elements, duplicates cancel out.", "public int singleNumber(int[] nums)", ["array", "bit-manipulation"]),
  mkQ("Number of 1 Bits", 191, "Easy", "Bit Manipulation", "Repeatedly AND n with n-1.", "public int hammingWeight(int n)", ["divide-and-conquer", "bit-manipulation"]),
  mkQ("Counting Bits", 338, "Easy", "Bit Manipulation", "dp[i] = dp[i >> 1] + (i & 1).", "public int[] countBits(int n)", ["dynamic-programming", "bit-manipulation"]),
  mkQ("Reverse Bits", 190, "Easy", "Bit Manipulation", "Shift and OR bits into answer.", "public int reverseBits(int n)", ["divide-and-conquer", "bit-manipulation"]),
  mkQ("Missing Number", 268, "Easy", "Bit Manipulation", "XOR all numbers and indices, or math formula n(n+1)/2.", "public int missingNumber(int[] nums)", ["array", "hash-table", "math", "bit-manipulation", "sorting"]),
  mkQ("Sum of Two Integers", 371, "Medium", "Bit Manipulation", "Sum is a^b, Carry is (a&b)<<1.", "public int getSum(int a, int b)", ["math", "bit-manipulation"]),
  mkQ("Reverse Integer", 7, "Medium", "Bit Manipulation", "Extract and add digits checking for integer overflow limits.", "public int reverse(int x)", ["math"])
];

allQuestions.forEach(q => {
  if (batch1Enrichments[q.title]) {
    Object.assign(q, batch1Enrichments[q.title]);
  }
  if (batch2Enrichments[q.title]) {
    Object.assign(q, batch2Enrichments[q.title]);
  }
  if (batch3Enrichments[q.title]) {
    Object.assign(q, batch3Enrichments[q.title]);
  }
  if (batch4Enrichments[q.title]) {
    Object.assign(q, batch4Enrichments[q.title]);
  }
  if (batch5Enrichments[q.title]) {
    Object.assign(q, batch5Enrichments[q.title]);
  }
  if (batch6Enrichments[q.title]) {
    Object.assign(q, batch6Enrichments[q.title]);
  }
  if (batch7Enrichments[q.title]) {
    Object.assign(q, batch7Enrichments[q.title]);
  }
  if (batch8Enrichments[q.title]) {
    Object.assign(q, batch8Enrichments[q.title]);
  }
  if (batch9Enrichments[q.title]) {
    Object.assign(q, batch9Enrichments[q.title]);
  }
  if (batch10Enrichments[q.title]) {
    Object.assign(q, batch10Enrichments[q.title]);
  }
  if (batch11Enrichments[q.title]) {
    Object.assign(q, batch11Enrichments[q.title]);
  }
});

const seedData = async () => {
  try {
    await connectDB();
    console.log('Clearing existing data in BaseQuestion collection...');
    await BaseQuestion.deleteMany({});
    console.log('Existing questions cleared.');

    console.log('Inserting seed data...');
    await BaseQuestion.insertMany(allQuestions);
    console.log(`Successfully seeded ${allQuestions.length} questions!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
