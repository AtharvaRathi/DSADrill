export const batch9Enrichments: any = {
  "Max Area of Island": {
    description: "You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally. Return the maximum area of an island in grid. If there is no island, return 0.",
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 50", "grid[i][j] is either 0 or 1."],
    examples: [
      { input: "grid = [[0,0,1,0,0],[0,1,1,1,0],[0,0,0,0,0]]", output: "4", explanation: "The central island has an area of 4." }
    ],
    testCases: [{ input: "[[0,0,1,0,0],[0,1,1,1,0],[0,0,0,0,0]]", expectedOutput: "4" }],
    hints: ["Use DFS or BFS to traverse the grid", "Keep track of visited cells by modifying the grid in-place (change 1 to 0)"],
    lineByLineExplanation: [
      { line: "int maxArea = 0;", explanation: "Global maximum tracker." },
      { line: "for (int i=0; i<m; i++) for (int j=0; j<n; j++) if (grid[i][j] == 1) maxArea = Math.max(maxArea, dfs(grid, i, j));", explanation: "Start DFS from any unvisited land." },
      { line: "if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] == 0) return 0;", explanation: "Base case for recursion." },
      { line: "grid[i][j] = 0;", explanation: "Mark cell as visited." },
      { line: "return 1 + dfs(grid, i+1, j) + dfs(grid, i-1, j) + dfs(grid, i, j+1) + dfs(grid, i, j-1);", explanation: "Sum the area of the current cell and all connected cells." }
    ]
  },
  "Pacific Atlantic Water Flow": {
    description: "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. Water can only flow in four directions to neighboring cells with heights less than or equal to the current cell's height. Return a 2D list of grid coordinates where water can flow to both oceans.",
    constraints: ["m == heights.length", "n == heights[r].length", "1 <= m, n <= 200", "0 <= heights[r][c] <= 10^5"],
    examples: [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", explanation: "These coordinates can flow to both oceans." }
    ],
    testCases: [{ input: "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", expectedOutput: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" }],
    hints: ["Run DFS/BFS from the ocean borders inwards", "Inward flow means going to cells with height >= current cell", "Find the intersection of cells that can reach both oceans"],
    lineByLineExplanation: [
      { line: "boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];", explanation: "Track which cells can reach which ocean." },
      { line: "for (int i=0; i<m; i++) { dfs(heights, pac, i, 0); dfs(heights, atl, i, n-1); }", explanation: "Start DFS from the left (Pacific) and right (Atlantic) edges." },
      { line: "for (int j=0; j<n; j++) { dfs(heights, pac, 0, j); dfs(heights, atl, m-1, j); }", explanation: "Start DFS from top (Pacific) and bottom (Atlantic) edges." },
      { line: "if (pac[i][j] && atl[i][j]) result.add(Arrays.asList(i, j));", explanation: "Intersection of both reachability matrices is the answer." }
    ]
  },
  "Surrounded Regions": {
    description: "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region.",
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 200"],
    examples: [
      { input: "board = [['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]", output: "[['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']]", explanation: "Bottom 'O' is on the edge, so it is not surrounded." }
    ],
    testCases: [{ input: "[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]", expectedOutput: "[['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']]" }],
    hints: ["Any 'O' connected to the border cannot be surrounded", "Run DFS from all border 'O's and mark them as safe", "Flip all remaining 'O's to 'X', then restore safe cells to 'O'"],
    lineByLineExplanation: [
      { line: "for (int i = 0; i < m; i++) { dfs(board, i, 0); dfs(board, i, n-1); }", explanation: "Mark border 'O's as safe (e.g., change to 'T')." },
      { line: "for (int j = 0; j < n; j++) { dfs(board, 0, j); dfs(board, m-1, j); }", explanation: "Mark border 'O's on top and bottom." },
      { line: "if (board[i][j] == 'O') board[i][j] = 'X';", explanation: "Unmarked 'O's are surrounded, capture them." },
      { line: "if (board[i][j] == 'T') board[i][j] = 'O';", explanation: "Restore safe 'O's back to their original state." }
    ]
  },
  "Rotting Oranges": {
    description: "You are given an m x n grid where each cell can have one of three values: 0 (empty), 1 (fresh), or 2 (rotten). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 10"],
    examples: [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4", explanation: "It takes 4 minutes for all oranges to rot." }
    ],
    testCases: [{ input: "[[2,1,1],[1,1,0],[0,1,1]]", expectedOutput: "4" }],
    hints: ["Use multi-source BFS", "Push all initially rotten oranges into the queue", "Track the number of fresh oranges; if it hits 0 before BFS ends, return the time"],
    lineByLineExplanation: [
      { line: "Queue<int[]> q = new LinkedList<>(); int fresh = 0;", explanation: "Initialize BFS queue and counter." },
      { line: "if (grid[i][j] == 2) q.offer(new int[]{i, j}); else if (grid[i][j] == 1) fresh++;", explanation: "Load initial state." },
      { line: "if (fresh == 0) return 0;", explanation: "Already fully rotten." },
      { line: "while (!q.isEmpty() && fresh > 0) { ... minutes++; }", explanation: "Process level by level (minute by minute)." },
      { line: "if (grid[nr][nc] == 1) { grid[nr][nc] = 2; q.offer(new int[]{nr, nc}); fresh--; }", explanation: "Rot adjacent oranges and add them to the queue for the next minute." },
      { line: "return fresh == 0 ? minutes : -1;", explanation: "Check if any fresh oranges survived." }
    ]
  },
  "Walls and Gates": {
    description: "You are given an m x n grid rooms initialized with these three possible values: -1 (wall), 0 (gate), INF (empty). Fill each empty room with the distance to its nearest gate.",
    constraints: ["m == rooms.length", "n == rooms[i].length", "1 <= m, n <= 250"],
    examples: [
      { input: "rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]", output: "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]", explanation: "Distances to nearest gates updated." }
    ],
    testCases: [{ input: "[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]", expectedOutput: "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]" }],
    hints: ["Use multi-source BFS starting from all gates", "The distance increases by 1 for each level of BFS", "Update INF cells as they are reached"],
    lineByLineExplanation: [
      { line: "Queue<int[]> q = new LinkedList<>();", explanation: "BFS queue." },
      { line: "for (int i=0; i<m; i++) for (int j=0; j<n; j++) if (rooms[i][j] == 0) q.offer(new int[]{i, j});", explanation: "Start BFS from all gates simultaneously to ensure shortest paths." },
      { line: "int[] curr = q.poll(); int r = curr[0], c = curr[1];", explanation: "Process next room." },
      { line: "if (nr < 0 || nc < 0 || nr >= m || nc >= n || rooms[nr][nc] != Integer.MAX_VALUE) continue;", explanation: "Skip bounds, walls, and already visited rooms." },
      { line: "rooms[nr][nc] = rooms[r][c] + 1; q.offer(new int[]{nr, nc});", explanation: "Set shortest distance and queue it." }
    ]
  },
  "Course Schedule": {
    description: "There are a total of numCourses courses you have to take. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses.",
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "prerequisites[i].length == 2"],
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "Take 0, then 1." },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "Cycle detected, impossible." }
    ],
    testCases: [{ input: "2\n[[1,0]]", expectedOutput: "true" }],
    hints: ["This is a cycle detection problem in a directed graph", "Use Topological Sort (Kahn's Algorithm) counting in-degrees", "Alternatively use DFS with a visiting state array"],
    lineByLineExplanation: [
      { line: "List<List<Integer>> adj = new ArrayList<>(); int[] inDegree = new int[numCourses];", explanation: "Adjacency list and in-degree array for Kahn's algorithm." },
      { line: "for (int[] pre : prerequisites) { adj.get(pre[1]).add(pre[0]); inDegree[pre[0]]++; }", explanation: "Build graph." },
      { line: "Queue<Integer> q = new LinkedList<>(); for (int i=0; i<numCourses; i++) if (inDegree[i] == 0) q.offer(i);", explanation: "Start with courses having no prerequisites." },
      { line: "int count = 0; while (!q.isEmpty()) { int curr = q.poll(); count++; ... }", explanation: "Process available courses." },
      { line: "for (int next : adj.get(curr)) if (--inDegree[next] == 0) q.offer(next);", explanation: "Unlock dependent courses." },
      { line: "return count == numCourses;", explanation: "If we took all courses, there was no cycle." }
    ]
  },
  "Course Schedule II": {
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return the ordering of courses you should take to finish all courses.",
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= numCourses * (numCourses - 1)"],
    examples: [
      { input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "[0,1,2,3]", explanation: "0 -> 1/2 -> 3." }
    ],
    testCases: [{ input: "4\n[[1,0],[2,0],[3,1],[3,2]]", expectedOutput: "[0,1,2,3]" }],
    hints: ["Same as Course Schedule, but instead of just counting, append to a result array", "Return an empty array if a cycle is detected"],
    lineByLineExplanation: [
      { line: "int[] result = new int[numCourses]; int idx = 0;", explanation: "Array to store the topological order." },
      { line: "Queue<Integer> q = new LinkedList<>(); for (int i=0; i<numCourses; i++) if (inDegree[i] == 0) q.offer(i);", explanation: "Initialize Kahn's algorithm queue." },
      { line: "while (!q.isEmpty()) { int curr = q.poll(); result[idx++] = curr; ... }", explanation: "Add to result list as courses become available." },
      { line: "return idx == numCourses ? result : new int[0];", explanation: "Return result only if all courses were processed." }
    ]
  },
  "Redundant Connection": {
    description: "In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. Return an edge that can be removed so that the resulting graph is a tree of n nodes.",
    constraints: ["n == edges.length", "3 <= n <= 1000", "edges[i].length == 2"],
    examples: [
      { input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]", explanation: "Removing [2,3] breaks the cycle." }
    ],
    testCases: [{ input: "[[1,2],[1,3],[2,3]]", expectedOutput: "[2,3]" }],
    hints: ["Use a Disjoint Set Union (DSU) or Union-Find structure", "If both nodes of an edge are already in the same set, adding this edge creates the cycle"],
    lineByLineExplanation: [
      { line: "int[] parent = new int[n + 1]; for (int i=1; i<=n; i++) parent[i] = i;", explanation: "Initialize Union-Find parents." },
      { line: "public int find(int i) { if (parent[i] == i) return i; return parent[i] = find(parent[i]); }", explanation: "Find with path compression." },
      { line: "for (int[] edge : edges)", explanation: "Iterate over edges in given order." },
      { line: "int p1 = find(edge[0]), p2 = find(edge[1]);", explanation: "Find representatives of both nodes." },
      { line: "if (p1 == p2) return edge;", explanation: "Cycle detected! This edge is redundant." },
      { line: "parent[p1] = p2;", explanation: "Union the two sets." }
    ]
  },
  "Number of Connected Components in an Undirected Graph": {
    description: "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph. Return the number of connected components in the graph.",
    constraints: ["1 <= n <= 2000", "1 <= edges.length <= 5000", "edges[i].length == 2"],
    examples: [
      { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2", explanation: "Component 1: {0,1,2}, Component 2: {3,4}." }
    ],
    testCases: [{ input: "5\n[[0,1],[1,2],[3,4]]", expectedOutput: "2" }],
    hints: ["Can use DFS to count isolated subgraphs", "Alternatively, use Union-Find starting with n components and decrementing for every successful union"],
    lineByLineExplanation: [
      { line: "int[] parent = new int[n]; for (int i=0; i<n; i++) parent[i] = i;", explanation: "Initialize DSU." },
      { line: "int count = n;", explanation: "Start with maximum possible components (every node isolated)." },
      { line: "int p1 = find(edge[0]), p2 = find(edge[1]);", explanation: "Find representatives." },
      { line: "if (p1 != p2) { parent[p1] = p2; count--; }", explanation: "If in different sets, union them and reduce total component count." },
      { line: "return count;", explanation: "Final answer." }
    ]
  },
  "Graph Valid Tree": {
    description: "You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges. Write a function to check whether these edges make up a valid tree.",
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000"],
    examples: [
      { input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true", explanation: "Connected and cycle-free." },
      { input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", output: "false", explanation: "Contains cycle [1,2,3]." }
    ],
    testCases: [{ input: "5\n[[0,1],[0,2],[0,3],[1,4]]", expectedOutput: "true" }],
    hints: ["A valid tree has exactly n-1 edges", "Use Union-Find to detect cycles", "Check that there is exactly 1 connected component"],
    lineByLineExplanation: [
      { line: "if (edges.length != n - 1) return false;", explanation: "A tree must have exactly n-1 edges. Quick fail." },
      { line: "int[] parent = new int[n]; for (int i=0; i<n; i++) parent[i] = i;", explanation: "Initialize Union-Find." },
      { line: "for (int[] edge : edges)", explanation: "Process edges." },
      { line: "int p1 = find(edge[0]), p2 = find(edge[1]);", explanation: "Find roots." },
      { line: "if (p1 == p2) return false;", explanation: "Cycle detected, impossible to be a tree." },
      { line: "parent[p1] = p2;", explanation: "Union the components." },
      { line: "return true;", explanation: "Passed both edge count and cycle checks." }
    ]
  },
  "Word Ladder": {
    description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter. Return the number of words in the shortest transformation sequence, or 0 if none exists.",
    constraints: ["1 <= beginWord.length <= 10", "endWord.length == beginWord.length", "1 <= wordList.length <= 5000"],
    examples: [
      { input: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']", output: "5", explanation: "hit -> hot -> dot -> dog -> cog." }
    ],
    testCases: [{ input: "hit\ncog\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", expectedOutput: "5" }],
    hints: ["Use BFS to find the shortest path", "For each word, try changing each character to 'a'-'z' and check if the result is in the unvisited wordList set"],
    lineByLineExplanation: [
      { line: "Set<String> set = new HashSet<>(wordList); if (!set.contains(endWord)) return 0;", explanation: "Quick exit if target is impossible." },
      { line: "Queue<String> q = new LinkedList<>(); q.offer(beginWord); int level = 1;", explanation: "Initialize BFS." },
      { line: "char[] chars = curr.toCharArray();", explanation: "Convert string to manipulate characters." },
      { line: "for (int i=0; i<chars.length; i++) { char tmp = chars[i]; for (char c='a'; c<='z'; c++) { ... } chars[i] = tmp; }", explanation: "Generate all possible 1-character edits." },
      { line: "if (set.contains(nextWord)) { q.offer(nextWord); set.remove(nextWord); }", explanation: "If edit exists in dict, queue it and remove to avoid revisiting." }
    ]
  },
  "Reconstruct Itinerary": {
    description: "You are given a list of airline tickets where tickets[i] = [fromi, toi]. Reconstruct the itinerary in order and return it. All of the tickets belong to a man who departs from 'JFK'. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.",
    constraints: ["1 <= tickets.length <= 300", "tickets[i].length == 2"],
    examples: [
      { input: "tickets = [['MUC','LHR'],['JFK','MUC'],['SFO','SJC'],['LHR','SFO']]", output: "['JFK','MUC','LHR','SFO','SJC']", explanation: "Follow the only valid path." }
    ],
    testCases: [{ input: "[[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]", expectedOutput: "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]" }],
    hints: ["Use an Eulerian path algorithm (Hierholzer's Algorithm)", "Use a Map<String, PriorityQueue<String>> to store destinations in lexical order", "Run DFS and add nodes to the result list AFTER returning from DFS (post-order), then reverse the list"],
    lineByLineExplanation: [
      { line: "Map<String, PriorityQueue<String>> map = new HashMap<>();", explanation: "Map airports to a min-heap of destinations for lexical ordering." },
      { line: "for (List<String> t : tickets) map.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).offer(t.get(1));", explanation: "Build the graph." },
      { line: "dfs(\"JFK\");", explanation: "Start DFS from JFK." },
      { line: "PriorityQueue<String> pq = map.get(curr); while (pq != null && !pq.isEmpty()) dfs(pq.poll());", explanation: "Greedily visit destinations in lexical order." },
      { line: "result.addFirst(curr);", explanation: "Add to front of result list in post-order to get the correct Eulerian path." }
    ]
  },
  "Min Cost to Connect All Points": {
    description: "You are given an array points representing integer coordinates of some points on a 2D-plane. The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance. Return the minimum cost to make all points connected.",
    constraints: ["1 <= points.length <= 1000", "-10^6 <= xi, yi <= 10^6"],
    examples: [
      { input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]", output: "20", explanation: "Minimum spanning tree cost." }
    ],
    testCases: [{ input: "[[0,0],[2,2],[3,10],[5,2],[7,0]]", expectedOutput: "20" }],
    hints: ["This is a Minimum Spanning Tree (MST) problem", "Use Prim's Algorithm (Min-Heap of edge weights) or Kruskal's (sort all edges and Union-Find)"],
    lineByLineExplanation: [
      { line: "PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);", explanation: "Min-heap for Prim's storing [node, cost]." },
      { line: "pq.offer(new int[]{0, 0});", explanation: "Start at node 0 with 0 cost." },
      { line: "while (connected < n) { int[] curr = pq.poll(); if (visited[curr[0]]) continue; ... }", explanation: "Process shortest edges." },
      { line: "visited[curr[0]] = true; cost += curr[1]; connected++;", explanation: "Add node to MST." },
      { line: "for (int i=0; i<n; i++) if (!visited[i]) pq.offer(new int[]{i, manhattan(points[curr[0]], points[i])});", explanation: "Queue all unvisited neighbors." }
    ]
  },
  "Network Delay Time": {
    description: "You are given a network of n nodes, labeled from 1 to n. You are given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal.",
    constraints: ["1 <= k <= n <= 100", "1 <= times.length <= 6000", "times[i].length == 3", "0 <= wi <= 100"],
    examples: [
      { input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", output: "2", explanation: "Signal takes 2 seconds to reach node 4." }
    ],
    testCases: [{ input: "[[2,1,1],[2,3,1],[3,4,1]]\n4\n2", expectedOutput: "2" }],
    hints: ["Use Dijkstra's Algorithm", "Keep track of the maximum distance reached across all nodes", "Return -1 if any node remains unreachable"],
    lineByLineExplanation: [
      { line: "PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);", explanation: "Min-heap of [node, distance]." },
      { line: "pq.offer(new int[]{k, 0});", explanation: "Start from node k." },
      { line: "if (visited.contains(currNode)) continue; visited.add(currNode); res = Math.max(res, currDist);", explanation: "Process unvisited node and update max distance seen so far." },
      { line: "for (int[] edge : adj.getOrDefault(currNode, new ArrayList<>())) pq.offer(new int[]{edge[0], currDist + edge[1]});", explanation: "Add neighbors with accumulated distance." },
      { line: "return visited.size() == n ? res : -1;", explanation: "Ensure all nodes were visited." }
    ]
  },
  "Swim in Rising Water": {
    description: "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point. Water levels rise over time. You can swim to adjacent squares if both are below the current water level. Return the least time until you can reach the bottom right square (n - 1, n - 1).",
    constraints: ["n == grid.length", "n == grid[i].length", "1 <= n <= 50", "0 <= grid[i][j] < n^2"],
    examples: [
      { input: "grid = [[0,2],[1,3]]", output: "3", explanation: "At time 3, you can swim everywhere." }
    ],
    testCases: [{ input: "[[0,2],[1,3]]", expectedOutput: "3" }],
    hints: ["Use Dijkstra's Algorithm with a Min-Heap", "Instead of accumulating path lengths, path cost is the maximum height encountered so far on the path"],
    lineByLineExplanation: [
      { line: "PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);", explanation: "Min-heap of [max_height_on_path, r, c]." },
      { line: "pq.offer(new int[]{grid[0][0], 0, 0});", explanation: "Start at top-left." },
      { line: "if (r == n - 1 && c == n - 1) return t;", explanation: "Reached destination, this is the minimum possible max height." },
      { line: "int newMax = Math.max(t, grid[nr][nc]); pq.offer(new int[]{newMax, nr, nc});", explanation: "Push neighbors, tracking the bottleneck (highest) elevation." }
    ]
  },
  "Alien Dictionary": {
    description: "There is a new alien language that uses the English alphabet. However, the order of the letters is unknown. You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules.",
    constraints: ["1 <= words.length <= 100", "1 <= words[i].length <= 100"],
    examples: [
      { input: "words = ['wrt','wrf','er','ett','rftt']", output: "'wertf'", explanation: "Order inferred from character comparisons." }
    ],
    testCases: [{ input: "[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]", expectedOutput: "\"wertf\"" }],
    hints: ["Compare adjacent words to find the first differing character to build directed edges", "Run Topological Sort on the resulting graph", "Detect invalid input (e.g., 'abc' comes after 'ab') and cycles"],
    lineByLineExplanation: [
      { line: "Map<Character, Set<Character>> adj = new HashMap<>();", explanation: "Adjacency list for graph of characters." },
      { line: "for (int i=0; i<words.length-1; i++) { String w1 = words[i], w2 = words[i+1]; ... }", explanation: "Compare adjacent words." },
      { line: "if (w1.length() > w2.length() && w1.startsWith(w2)) return \"\";", explanation: "Invalid case: longer word before prefix." },
      { line: "if (w1.charAt(j) != w2.charAt(j)) { adj.get(w1.charAt(j)).add(w2.charAt(j)); break; }", explanation: "First difference creates a directed edge." },
      { line: "return topSort(adj);", explanation: "Topological sort returns valid order, or empty string if cycle exists." }
    ]
  },
  "Cheapest Flights Within K Stops": {
    description: "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei]. Return the cheapest price from src to dst with at most k stops.",
    constraints: ["1 <= n <= 100", "0 <= flights.length <= (n * (n - 1) / 2)", "flights[i].length == 3"],
    examples: [
      { input: "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1", output: "700", explanation: "Path 0->1->3 costs 700 with 1 stop." }
    ],
    testCases: [{ input: "4\n[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]\n0\n3\n1", expectedOutput: "700" }],
    hints: ["Use Bellman-Ford algorithm with K+1 iterations", "Alternatively, use BFS maintaining an array of minimum costs to each node"],
    lineByLineExplanation: [
      { line: "int[] prices = new int[n]; Arrays.fill(prices, Integer.MAX_VALUE); prices[src] = 0;", explanation: "Initialize prices array." },
      { line: "for (int i = 0; i <= k; i++)", explanation: "Run exactly K + 1 rounds (K stops means K+1 edges)." },
      { line: "int[] tmpPrices = Arrays.copyOf(prices, n);", explanation: "Copy array to ensure we only use distances from the previous step." },
      { line: "for (int[] flight : flights) if (prices[u] != Integer.MAX_VALUE) tmpPrices[v] = Math.min(tmpPrices[v], prices[u] + w);", explanation: "Relax edges." },
      { line: "prices = tmpPrices;", explanation: "Apply updates for the next step." }
    ]
  },
  "Min Cost Climbing Stairs": {
    description: "You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps. You can either start from the step with index 0, or the step with index 1. Return the minimum cost to reach the top of the floor.",
    constraints: ["2 <= cost.length <= 1000", "0 <= cost[i] <= 999"],
    examples: [
      { input: "cost = [10,15,20]", output: "15", explanation: "Start at index 1, pay 15, climb 2 steps to the top." }
    ],
    testCases: [{ input: "[10,15,20]", expectedOutput: "15" }],
    hints: ["Dynamic Programming: dp[i] = cost[i] + min(dp[i+1], dp[i+2])", "Optimize to O(1) space using two variables"],
    lineByLineExplanation: [
      { line: "int one = cost[cost.length - 1]; int two = 0;", explanation: "one is cost to reach top from last step, two is from 'top' (0 cost)." },
      { line: "for (int i = cost.length - 2; i >= 0; i--) { int tmp = cost[i] + Math.min(one, two); two = one; one = tmp; }", explanation: "Iterate backwards, calculating min cost to reach top from index i." },
      { line: "return Math.min(one, two);", explanation: "Return the min of starting at index 0 or index 1." }
    ]
  },
  "House Robber II": {
    description: "You are a professional robber planning to rob houses along a street. This street is arranged in a circle. That means the first house is the neighbor of the last one. Return the maximum amount of money you can rob tonight without alerting the police.",
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 1000"],
    examples: [
      { input: "nums = [2,3,2]", output: "3", explanation: "Cannot rob 2 and 2 because they are adjacent in the circle." }
    ],
    testCases: [{ input: "[2,3,2]", expectedOutput: "3" }],
    hints: ["Break the circle into two linear arrays: [0 to n-2] and [1 to n-1]", "Run the standard House Robber algorithm on both arrays and take the max"],
    lineByLineExplanation: [
      { line: "if (nums.length == 1) return nums[0];", explanation: "Edge case for a single house." },
      { line: "return Math.max(robHelper(nums, 0, nums.length - 2), robHelper(nums, 1, nums.length - 1));", explanation: "Max of robbing without the last house, or without the first house." },
      { line: "private int robHelper(int[] nums, int start, int end) { ... int temp = Math.max(rob1 + nums[i], rob2); rob1 = rob2; rob2 = temp; }", explanation: "Standard house robber linear logic." }
    ]
  },
  "Longest Palindromic Substring": {
    description: "Given a string s, return the longest palindromic substring in s.",
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
    examples: [
      { input: "s = 'babad'", output: "'bab'", explanation: "'aba' is also a valid answer." }
    ],
    testCases: [{ input: "'babad'", expectedOutput: "'bab'" }],
    hints: ["Expand around center for every index i", "Handle both odd (center is i) and even (center is i, i+1) length palindromes"],
    lineByLineExplanation: [
      { line: "int start = 0, end = 0;", explanation: "Track boundaries of longest palindrome." },
      { line: "for (int i = 0; i < s.length(); i++)", explanation: "Treat every index as a potential center." },
      { line: "int len1 = expand(s, i, i); int len2 = expand(s, i, i + 1);", explanation: "Expand for odd and even length centers." },
      { line: "int len = Math.max(len1, len2); if (len > end - start) { start = i - (len - 1) / 2; end = i + len / 2; }", explanation: "Update longest boundaries." },
      { line: "private int expand(String s, int L, int R) { while (L>=0 && R<s.length() && s.charAt(L)==s.charAt(R)) { L--; R++; } return R - L - 1; }", explanation: "Expand logic." }
    ]
  },
  "Palindromic Substrings": {
    description: "Given a string s, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.",
    constraints: ["1 <= s.length <= 1000", "s consists of lowercase English letters."],
    examples: [
      { input: "s = 'aaa'", output: "6", explanation: "Six palindromes: 'a','a','a','aa','aa','aaa'." }
    ],
    testCases: [{ input: "'aaa'", expectedOutput: "6" }],
    hints: ["Very similar to Longest Palindromic Substring", "Expand around center and increment a counter for every valid expansion step"],
    lineByLineExplanation: [
      { line: "int count = 0;", explanation: "Counter for all palindromes." },
      { line: "for (int i = 0; i < s.length(); i++)", explanation: "Iterate over all potential centers." },
      { line: "count += countPalindromes(s, i, i); count += countPalindromes(s, i, i + 1);", explanation: "Count both odd and even length palindromes." },
      { line: "while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { count++; l--; r++; }", explanation: "Increment counter for each valid expansion." }
    ]
  },
  "Decode Ways": {
    description: "A message containing letters from A-Z can be encoded into numbers using 'A' -> '1', 'B' -> '2', ... 'Z' -> '26'. Given a string s containing only digits, return the number of ways to decode it.",
    constraints: ["1 <= s.length <= 100", "s contains only digits and may contain leading zero(s)."],
    examples: [
      { input: "s = '226'", output: "3", explanation: "'BZ' (2 26), 'VF' (22 6), or 'BBF' (2 2 6)." }
    ],
    testCases: [{ input: "'226'", expectedOutput: "3" }],
    hints: ["Dynamic Programming: dp[i] = dp[i-1] (if valid single digit) + dp[i-2] (if valid double digit)"],
    lineByLineExplanation: [
      { line: "int[] dp = new int[s.length() + 1]; dp[0] = 1;", explanation: "Empty string has 1 way to decode." },
      { line: "dp[1] = s.charAt(0) == '0' ? 0 : 1;", explanation: "First character valid if not '0'." },
      { line: "for (int i = 2; i <= s.length(); i++)", explanation: "Build up answers." },
      { line: "int oneDigit = Integer.valueOf(s.substring(i - 1, i)); if (oneDigit >= 1) dp[i] += dp[i - 1];", explanation: "Check if valid single digit." },
      { line: "int twoDigits = Integer.valueOf(s.substring(i - 2, i)); if (twoDigits >= 10 && twoDigits <= 26) dp[i] += dp[i - 2];", explanation: "Check if valid double digit (10 to 26)." }
    ]
  },
  "Maximum Product Subarray": {
    description: "Given an integer array nums, find a subarray that has the largest product, and return the product.",
    constraints: ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10"],
    examples: [
      { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." }
    ],
    testCases: [{ input: "[2,3,-2,4]", expectedOutput: "6" }],
    hints: ["Track both the current max and current min product", "A negative number multiplied by a large negative min product becomes a large max product"],
    lineByLineExplanation: [
      { line: "int curMax = 1, curMin = 1, res = nums[0];", explanation: "Track max, min, and global result." },
      { line: "for (int n : nums)", explanation: "Iterate array." },
      { line: "int tmp = curMax * n;", explanation: "Store max temporarily because it will be mutated." },
      { line: "curMax = Math.max(Math.max(n * curMax, n * curMin), n);", explanation: "New max could come from max, min, or restarting at n." },
      { line: "curMin = Math.min(Math.min(tmp, n * curMin), n);", explanation: "New min could come from old max, min, or restarting at n." },
      { line: "res = Math.max(res, curMax);", explanation: "Update global result." }
    ]
  },
  "Partition Equal Subset Sum": {
    description: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.",
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 100"],
    examples: [
      { input: "nums = [1,5,11,5]", output: "true", explanation: "The array can be partitioned as [1, 5, 5] and [11]." }
    ],
    testCases: [{ input: "[1,5,11,5]", expectedOutput: "true" }],
    hints: ["Calculate total sum; if it's odd, return false", "Target is sum/2", "Use a 1D DP array (or Set) to track achievable subset sums"],
    lineByLineExplanation: [
      { line: "int target = sum / 2;", explanation: "We need to find a subset that sums to exactly half of the total." },
      { line: "Set<Integer> dp = new HashSet<>(); dp.add(0);", explanation: "Track all achievable sums. 0 is always achievable." },
      { line: "for (int num : nums) { Set<Integer> nextDp = new HashSet<>(dp); for (int t : dp) nextDp.add(t + num); dp = nextDp; }", explanation: "For each number, add it to all previously achievable sums." },
      { line: "return dp.contains(target);", explanation: "Check if the half-sum is achievable." }
    ]
  },
  "Best Time to Buy and Sell Stock with Cooldown": {
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve. You may complete as many transactions as you like with the following restriction: After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).",
    constraints: ["1 <= prices.length <= 5000", "0 <= prices[i] <= 1000"],
    examples: [
      { input: "prices = [1,2,3,0,2]", output: "3", explanation: "Buy at 1, sell at 3 (profit 2), cooldown at 0, buy at 0, sell at 2 (profit 2)." }
    ],
    testCases: [{ input: "[1,2,3,0,2]", expectedOutput: "3" }],
    hints: ["Use State Machine DP with 3 states: Hold, Sold, Reset (Cooldown)"],
    lineByLineExplanation: [
      { line: "int hold = Integer.MIN_VALUE, sold = 0, reset = 0;", explanation: "hold is max profit if we have a stock. sold is max if we just sold today. reset is max if we are idle." },
      { line: "for (int price : prices) { int preSold = sold; sold = hold + price; hold = Math.max(hold, reset - price); reset = Math.max(reset, preSold); }", explanation: "Transitions: sold from hold, hold from reset, reset from sold or previous reset." },
      { line: "return Math.max(sold, reset);", explanation: "Max profit must end in sold or reset state." }
    ]
  }
};
