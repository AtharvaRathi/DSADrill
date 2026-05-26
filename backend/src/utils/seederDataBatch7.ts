export const batch7Enrichments: any = {
  "Generate Parentheses": {
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    constraints: ["1 <= n <= 8"],
    examples: [
      { input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]", explanation: "All 5 valid combinations of 3 pairs." },
      { input: "n = 1", output: "[\"()\"]", explanation: "Only one pair possible." }
    ],
    testCases: [{ input: "3", expectedOutput: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]" }, { input: "1", expectedOutput: "[\"()\"]" }],
    hints: ["Use backtracking", "Keep track of open and close parenthesis counts", "Can add '(' if open < n, can add ')' if close < open"],
    lineByLineExplanation: [
      { line: "if (path.length() == n * 2) { result.add(path.toString()); return; }", explanation: "Base case: if path length is 2*n, we have a complete valid string." },
      { line: "if (open < n) { path.append('('); backtrack(open+1, close, n); path.deleteCharAt(path.length()-1); }", explanation: "We can always add an opening parenthesis if we haven't reached n." },
      { line: "if (close < open) { path.append(')'); backtrack(open, close+1, n); path.deleteCharAt(path.length()-1); }", explanation: "We can only add a closing parenthesis if it matches an unmatched opening one." }
    ]
  },
  "Time Based Key-Value Store": {
    description: "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.",
    constraints: ["1 <= key.length, value.length <= 100", "1 <= timestamp <= 10^7", "All timestamps for the same key are strictly increasing."],
    examples: [
      { input: "set(\"foo\", \"bar\", 1); get(\"foo\", 1); get(\"foo\", 3); set(\"foo\", \"bar2\", 4); get(\"foo\", 4);", output: "[null, \"bar\", \"bar\", null, \"bar2\"]", explanation: "Values change dynamically based on timestamp." }
    ],
    testCases: [{ input: "set foo bar 1\nget foo 1\nget foo 3", expectedOutput: "null\nbar\nbar" }],
    hints: ["Use a HashMap where keys map to a list of (timestamp, value) pairs", "Since timestamps are strictly increasing, use Binary Search to retrieve the value"],
    lineByLineExplanation: [
      { line: "Map<String, List<Pair<Integer, String>>> map = new HashMap<>();", explanation: "Store pairs of timestamp and value for each key." },
      { line: "map.putIfAbsent(key, new ArrayList<>()); map.get(key).add(new Pair<>(timestamp, value));", explanation: "Appending is O(1) since timestamps are increasing." },
      { line: "int left = 0, right = list.size() - 1;", explanation: "Binary search in the list of pairs for the requested timestamp." },
      { line: "if (list.get(mid).getKey() <= timestamp) left = mid + 1; else right = mid - 1;", explanation: "Find the largest timestamp <= requested timestamp." }
    ]
  },
  "Median of Two Sorted Arrays": {
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    constraints: ["nums1.length == m, nums2.length == n", "0 <= m, n <= 1000", "1 <= m + n <= 2000"],
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", explanation: "Merged array = [1,2,3] and median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000", explanation: "Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." }
    ],
    testCases: [{ input: "[1,3]\n[2]", expectedOutput: "2.0" }, { input: "[1,2]\n[3,4]", expectedOutput: "2.5" }],
    hints: ["Run binary search on the smaller array to partition both arrays", "Check if max(left_A) <= min(right_B) and max(left_B) <= min(right_A)"],
    lineByLineExplanation: [
      { line: "if (A.length > B.length) return findMedianSortedArrays(B, A);", explanation: "Ensure binary search is always on the smaller array for O(log(min(m,n)))." },
      { line: "int i = (l + r) / 2; int j = half - i;", explanation: "i is partition of A, j is partition of B." },
      { line: "if (Aleft <= Bright && Bleft <= Aright) return ...", explanation: "Valid partition found. Compute median based on total length parity." },
      { line: "else if (Aleft > Bright) r = i - 1;", explanation: "Partition in A is too far right, move left." }
    ]
  },
  "Reorder List": {
    description: "You are given the head of a singly linked-list. Reorder it so that it alternates between the first node, last node, second node, second to last node, etc.",
    constraints: ["The number of nodes is in the range [1, 5 * 10^4]", "1 <= Node.val <= 1000"],
    examples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]", explanation: "1->2->3->4 becomes 1->4->2->3." },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]", explanation: "1->2->3->4->5 becomes 1->5->2->4->3." }
    ],
    testCases: [{ input: "[1,2,3,4]", expectedOutput: "[1,4,2,3]" }, { input: "[1,2,3,4,5]", expectedOutput: "[1,5,2,4,3]" }],
    hints: ["Find the middle using slow/fast pointers", "Reverse the second half of the list", "Merge the two halves alternating nodes"],
    lineByLineExplanation: [
      { line: "ListNode slow = head, fast = head.next;", explanation: "Find the middle of the linked list." },
      { line: "while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }", explanation: "Slow will stop at the end of the first half." },
      { line: "ListNode second = slow.next; slow.next = null; ListNode prev = null;", explanation: "Split the list into two halves and begin reversing the second half." },
      { line: "while (second != null) { ListNode tmp = second.next; second.next = prev; prev = second; second = tmp; }", explanation: "Reverse the second half in place." },
      { line: "ListNode first = head; second = prev;", explanation: "Merge first half and reversed second half." }
    ]
  },
  "Remove Nth Node From End of List": {
    description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    constraints: ["The number of nodes in the list is sz", "1 <= sz <= 30", "0 <= Node.val <= 100", "1 <= n <= sz"],
    examples: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]", explanation: "Remove the 4th node." },
      { input: "head = [1], n = 1", output: "[]", explanation: "Remove the only node." }
    ],
    testCases: [{ input: "[1,2,3,4,5]\n2", expectedOutput: "[1,2,3,5]" }, { input: "[1]\n1", expectedOutput: "[]" }],
    hints: ["Use two pointers separated by n nodes", "Advance both pointers together until the fast pointer hits the end"],
    lineByLineExplanation: [
      { line: "ListNode dummy = new ListNode(0, head);", explanation: "Dummy node handles edge cases like removing the head." },
      { line: "ListNode left = dummy, right = head;", explanation: "Two pointers." },
      { line: "while (n > 0 && right != null) { right = right.next; n--; }", explanation: "Move right pointer n steps ahead." },
      { line: "while (right != null) { left = left.next; right = right.next; }", explanation: "Move both pointers until right reaches the end. Left is now just before the node to remove." },
      { line: "left.next = left.next.next;", explanation: "Remove the target node by skipping it." }
    ]
  },
  "Copy List with Random Pointer": {
    description: "A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null. Return a deep copy of the list.",
    constraints: ["0 <= n <= 1000", "-10^4 <= Node.val <= 10^4"],
    examples: [
      { input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]", explanation: "Exact deep copy structure." }
    ],
    testCases: [{ input: "[[7,null],[13,0],[11,4],[10,2],[1,0]]", expectedOutput: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" }],
    hints: ["Use a HashMap linking old nodes to new nodes", "Do it in two passes: first create all nodes, then connect their next and random pointers"],
    lineByLineExplanation: [
      { line: "Map<Node, Node> oldToNew = new HashMap<>();", explanation: "Maps original nodes to their copies." },
      { line: "Node curr = head; while (curr != null) { oldToNew.put(curr, new Node(curr.val)); curr = curr.next; }", explanation: "Pass 1: Create a clone of every node without connecting." },
      { line: "curr = head; while (curr != null) { oldToNew.get(curr).next = oldToNew.get(curr.next); oldToNew.get(curr).random = oldToNew.get(curr.random); curr = curr.next; }", explanation: "Pass 2: Connect the cloned nodes using the map." }
    ]
  },
  "Add Two Numbers": {
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    constraints: ["The number of nodes in each linked list is in the range [1, 100]", "0 <= Node.val <= 9"],
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." }
    ],
    testCases: [{ input: "[2,4,3]\n[5,6,4]", expectedOutput: "[7,0,8]" }],
    hints: ["Iterate both lists simultaneously, adding values and the carry", "Create new nodes for the result list"],
    lineByLineExplanation: [
      { line: "ListNode dummy = new ListNode(); ListNode curr = dummy;", explanation: "Dummy head for result list." },
      { line: "int carry = 0;", explanation: "Track overflow from previous additions." },
      { line: "while (l1 != null || l2 != null || carry != 0)", explanation: "Continue if there are digits left or a carry remaining." },
      { line: "int val = (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0) + carry;", explanation: "Sum digits and carry." },
      { line: "carry = val / 10; curr.next = new ListNode(val % 10);", explanation: "Update carry for next position and save single digit." }
    ]
  },
  "Find the Duplicate Number": {
    description: "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, there is only one repeated number. Return this repeated number. Must use constant space.",
    constraints: ["1 <= n <= 10^5", "nums.length == n + 1", "1 <= nums[i] <= n"],
    examples: [
      { input: "nums = [1,3,4,2,2]", output: "2", explanation: "2 is repeated." }
    ],
    testCases: [{ input: "[1,3,4,2,2]", expectedOutput: "2" }],
    hints: ["Treat array values as indices to form a linked list", "Use Floyd's Tortoise and Hare algorithm to find the cycle"],
    lineByLineExplanation: [
      { line: "int slow = 0, fast = 0;", explanation: "Initialize pointers." },
      { line: "do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow != fast);", explanation: "Phase 1: Find the intersection point inside the cycle." },
      { line: "int slow2 = 0; while (slow != slow2) { slow = nums[slow]; slow2 = nums[slow2]; }", explanation: "Phase 2: Find the entry point of the cycle, which is the duplicate number." },
      { line: "return slow;", explanation: "Cycle entry point found." }
    ]
  },
  "LRU Cache": {
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5"],
    examples: [
      { input: "LRUCache c = new LRUCache(2); c.put(1,1); c.put(2,2); c.get(1); c.put(3,3);", output: "get(1)->1, get(2)->-1 (evicted)", explanation: "Standard LRU behavior." }
    ],
    testCases: [{ input: "2\nput 1 1\nput 2 2\nget 1\nput 3 3", expectedOutput: "null\nnull\n1\nnull" }],
    hints: ["Use a HashMap alongside a Doubly Linked List", "HashMap provides O(1) lookup to nodes", "Doubly Linked List handles O(1) insertion and removal"],
    lineByLineExplanation: [
      { line: "class Node { int key, val; Node prev, next; }", explanation: "Doubly linked list node definition." },
      { line: "Map<Integer, Node> cache = new HashMap<>();", explanation: "Map to find nodes in O(1) time." },
      { line: "private void insert(Node node) { ... }", explanation: "Insert node right before the right dummy node (most recent)." },
      { line: "private void remove(Node node) { ... }", explanation: "Remove node by connecting its prev and next." },
      { line: "if (cache.containsKey(key)) { remove(cache.get(key)); insert(cache.get(key)); }", explanation: "On get(), move node to most recent position." }
    ]
  },
  "Merge K Sorted Lists": {
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500", "-10^4 <= lists[i][j] <= 10^4"],
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "Combined and sorted." }
    ],
    testCases: [{ input: "[[1,4,5],[1,3,4],[2,6]]", expectedOutput: "[1,1,2,3,4,4,5,6]" }],
    hints: ["Use a Min-Heap (PriorityQueue) to track the minimum heads of the lists", "Alternatively, recursively merge pairs of lists (Divide and Conquer)"],
    lineByLineExplanation: [
      { line: "PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);", explanation: "Min-heap for O(log K) extractions." },
      { line: "for (ListNode node : lists) if (node != null) pq.offer(node);", explanation: "Initialize heap with the head of every list." },
      { line: "ListNode dummy = new ListNode(0), curr = dummy;", explanation: "Dummy node for result list." },
      { line: "while (!pq.isEmpty()) { ListNode node = pq.poll(); curr.next = node; curr = curr.next; if (node.next != null) pq.offer(node.next); }", explanation: "Continuously extract min node and push its next node." }
    ]
  },
  "Reverse Nodes in K-Group": {
    description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. If number of nodes is not a multiple of k then left-out nodes remain as is.",
    constraints: ["The number of nodes in the list is n", "1 <= k <= n <= 5000", "0 <= Node.val <= 1000"],
    examples: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]", explanation: "Groups of 2 reversed. 5 is left as is." }
    ],
    testCases: [{ input: "[1,2,3,4,5]\n2", expectedOutput: "[2,1,4,3,5]" }],
    hints: ["Find the k-th node to identify a full group", "Reverse the segment, update connections, move to next segment"],
    lineByLineExplanation: [
      { line: "ListNode dummy = new ListNode(0, head); ListNode groupPrev = dummy;", explanation: "groupPrev tracks the node before the current k-group." },
      { line: "ListNode kth = getKth(groupPrev, k);", explanation: "Find the end of the k-group." },
      { line: "if (kth == null) break;", explanation: "If not enough nodes, stop reversing." },
      { line: "ListNode groupNext = kth.next;", explanation: "Save the start of the next group." },
      { line: "ListNode prev = kth.next, curr = groupPrev.next;", explanation: "Reverse the current group in-place." },
      { line: "groupPrev.next = kth; groupPrev = tmp;", explanation: "Fix connections for the reversed group and advance." }
    ]
  },
  "Diameter of Binary Tree": {
    description: "Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree.",
    constraints: ["The number of nodes in the tree is in the range [1, 10^4]", "-100 <= Node.val <= 100"],
    examples: [
      { input: "root = [1,2,3,4,5]", output: "3", explanation: "Path is [4,2,1,3] or [5,2,1,3], length is 3." }
    ],
    testCases: [{ input: "[1,2,3,4,5]", expectedOutput: "3" }],
    hints: ["The diameter at any node is left_height + right_height", "Update a global max diameter variable during DFS"],
    lineByLineExplanation: [
      { line: "int maxD = 0;", explanation: "Global tracker for diameter." },
      { line: "private int dfs(TreeNode node)", explanation: "Helper function returns height of current subtree." },
      { line: "if (node == null) return -1;", explanation: "Base case height is -1 (edges) or 0 (nodes)." },
      { line: "int left = dfs(node.left); int right = dfs(node.right);", explanation: "Recursively get heights of children." },
      { line: "maxD = Math.max(maxD, left + right + 2);", explanation: "Diameter through this node is left + right + 2 edges." },
      { line: "return 1 + Math.max(left, right);", explanation: "Height of current node." }
    ]
  },
  "Balanced Binary Tree": {
    description: "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.",
    constraints: ["The number of nodes in the tree is in the range [0, 5000]", "-10^4 <= Node.val <= 10^4"],
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "true", explanation: "Every node is balanced." }
    ],
    testCases: [{ input: "[3,9,20,null,null,15,7]", expectedOutput: "true" }],
    hints: ["DFS returning height of tree", "If any subtree is unbalanced, return -1 to signal failure up the chain"],
    lineByLineExplanation: [
      { line: "private int dfs(TreeNode root)", explanation: "Helper returns height, or -1 if unbalanced." },
      { line: "if (root == null) return 0;", explanation: "Null trees are balanced with height 0." },
      { line: "int left = dfs(root.left); int right = dfs(root.right);", explanation: "Check subtrees." },
      { line: "if (left == -1 || right == -1 || Math.abs(left - right) > 1) return -1;", explanation: "If difference > 1 or child is unbalanced, fail immediately." },
      { line: "return 1 + Math.max(left, right);", explanation: "Otherwise return actual height." }
    ]
  },
  "Same Tree": {
    description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.",
    constraints: ["The number of nodes in both trees is in the range [0, 100]", "-10^4 <= Node.val <= 10^4"],
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true", explanation: "Identical trees." }
    ],
    testCases: [{ input: "[1,2,3]\n[1,2,3]", expectedOutput: "true" }],
    hints: ["Traverse both trees simultaneously", "Check node values and recursively check left and right children"],
    lineByLineExplanation: [
      { line: "if (p == null && q == null) return true;", explanation: "Both null means they match here." },
      { line: "if (p == null || q == null || p.val != q.val) return false;", explanation: "Mismatched structure or values." },
      { line: "return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);", explanation: "Recursively ensure left and right subtrees match." }
    ]
  },
  "Subtree of Another Tree": {
    description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.",
    constraints: ["The number of nodes in the root tree is in the range [1, 2000]", "The number of nodes in the subRoot tree is in the range [1, 1000]"],
    examples: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true", explanation: "subRoot is an exact match for root's left child." }
    ],
    testCases: [{ input: "[3,4,5,1,2]\n[4,1,2]", expectedOutput: "true" }],
    hints: ["Use Same Tree logic", "For every node in root, check if the tree starting there is the same as subRoot"],
    lineByLineExplanation: [
      { line: "if (subRoot == null) return true;", explanation: "Null subRoot is a subtree of everything." },
      { line: "if (root == null) return false;", explanation: "Root ran out but subRoot didn't." },
      { line: "if (isSameTree(root, subRoot)) return true;", explanation: "Check if exact match starts here." },
      { line: "return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);", explanation: "Recursively check left and right subtrees." }
    ]
  },
  "Lowest Common Ancestor of a BST": {
    description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.",
    constraints: ["The number of nodes is in [2, 10^5]", "-10^9 <= Node.val <= 10^9"],
    examples: [
      { input: "root = [6,2,8,0,4,7,9], p = 2, q = 8", output: "6", explanation: "LCA of 2 and 8 is 6." }
    ],
    testCases: [{ input: "[6,2,8,0,4,7,9]\n2\n8", expectedOutput: "6" }],
    hints: ["If p and q are both less than root, LCA is in left subtree", "If p and q are both greater than root, LCA is in right subtree", "Otherwise, root is the LCA"],
    lineByLineExplanation: [
      { line: "if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);", explanation: "Both smaller, go left." },
      { line: "if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);", explanation: "Both larger, go right." },
      { line: "return root;", explanation: "Split occurs here, this is the LCA." }
    ]
  }
};
