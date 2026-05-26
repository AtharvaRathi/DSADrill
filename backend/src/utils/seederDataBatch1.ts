export const batch1Enrichments: any = {
  "Contains Duplicate": {
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
        explanation: "The value 1 appears at index 0 and index 3."
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false",
        explanation: "All values are distinct."
      },
      {
        input: "nums = [1,1,1,3,3,4,3,2,4,2]",
        output: "true",
        explanation: "Multiple duplicates exist."
      }
    ],
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true" },
      { input: "[1,2,3,4]", expectedOutput: "false" },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true" }
    ],
    hints: [
      "Think about what data structure lets you check membership in O(1)",
      "A HashSet stores unique elements — try adding each number and checking if it already exists"
    ],
    lineByLineExplanation: [
      {
        line: "Set<Integer> seen = new HashSet<>();",
        explanation: "We create a HashSet to store every number we have visited so far. HashSet gives O(1) average lookup time."
      },
      {
        line: "for (int num : nums)",
        explanation: "We iterate through every number in the array one by one."
      },
      {
        line: "if (seen.contains(num)) return true;",
        explanation: "Before adding, we check if this number already exists in our set. If yes, we found a duplicate — return true immediately."
      },
      {
        line: "seen.add(num);",
        explanation: "If the number was not a duplicate, we add it to our set so future numbers can check against it."
      },
      {
        line: "return false;",
        explanation: "If we finish the entire loop without finding a duplicate, every element is distinct — return false."
      }
    ]
  },
  "Valid Anagram": {
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.",
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters"
    ],
    examples: [
      {
        input: "s = 'anagram', t = 'nagaram'",
        output: "true",
        explanation: "Both strings contain exactly a:3, n:1, g:1, r:1, m:1."
      },
      {
        input: "s = 'rat', t = 'car'",
        output: "false",
        explanation: "s has r:1,a:1,t:1 but t has c:1,a:1,r:1. t is missing, c is extra."
      }
    ],
    testCases: [
      { input: "anagram\nnagaram", expectedOutput: "true" },
      { input: "rat\ncar", expectedOutput: "false" },
      { input: "a\na", expectedOutput: "true" },
      { input: "ab\nba", expectedOutput: "true" }
    ],
    hints: [
      "If lengths differ, they cannot be anagrams",
      "Count the frequency of each character in s, then subtract for each character in t"
    ],
    lineByLineExplanation: [
      {
        line: "if (s.length() != t.length()) return false;",
        explanation: "Anagrams must use all original letters exactly once, so lengths must match. This is a fast early exit."
      },
      {
        line: "int[] count = new int[26];",
        explanation: "We create an array of 26 integers, one slot per lowercase English letter (a=0, b=1, ... z=25)."
      },
      {
        line: "for (int i = 0; i < s.length(); i++)",
        explanation: "We iterate through both strings simultaneously using one loop since they are the same length."
      },
      {
        line: "count[s.charAt(i) - 'a']++;",
        explanation: "We increment the count for each character in s. Subtracting 'a' maps 'a' to index 0, 'b' to 1, etc."
      },
      {
        line: "count[t.charAt(i) - 'a']--;",
        explanation: "We decrement the count for each character in t. If t is an anagram, every increment will be cancelled."
      },
      {
        line: "for (int c : count) if (c != 0) return false;",
        explanation: "After processing both strings, every count should be zero. Any non-zero means a character appeared more in one string than the other."
      },
      {
        line: "return true;",
        explanation: "All counts balanced out — t is a valid anagram of s."
      }
    ]
  },
  "Two Sum": {
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists"
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9, so return [0,1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 3 + 3 = 6."
      }
    ],
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]" },
      { input: "[3,3]\n6", expectedOutput: "[0,1]" }
    ],
    hints: [
      "A brute force O(n^2) solution checks every pair — can you do better?",
      "For each number, you need to find target - number. Use a HashMap to look that up in O(1).",
      "Store the number as the key and its index as the value in your map."
    ],
    lineByLineExplanation: [
      {
        line: "Map<Integer, Integer> map = new HashMap<>();",
        explanation: "We create a HashMap where key = number we have seen, value = its index in the array."
      },
      {
        line: "for (int i = 0; i < nums.length; i++)",
        explanation: "We scan through the array once — this gives us O(n) time complexity."
      },
      {
        line: "int complement = target - nums[i];",
        explanation: "For the current number, we calculate what other number we need to reach the target. Example: target=9, current=2, complement=7."
      },
      {
        line: "if (map.containsKey(complement))",
        explanation: "We check if we have already seen the complement in a previous iteration. If yes, we have our answer."
      },
      {
        line: "return new int[]{map.get(complement), i};",
        explanation: "We return the index of the complement (stored in map) and the current index i."
      },
      {
        line: "map.put(nums[i], i);",
        explanation: "If no complement found yet, we store the current number and its index for future iterations to check against."
      }
    ]
  },
  "Group Anagrams": {
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An anagram is a word or phrase formed by rearranging the letters of a different word, using all the original letters exactly once.",
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters"
    ],
    examples: [
      {
        input: "strs = ['eat','tea','tan','ate','nat','bat']",
        output: "[['bat'],['nat','tan'],['ate','eat','tea']]",
        explanation: "eat, tea, and ate are anagrams. tan and nat are anagrams. bat has no anagram partner."
      },
      {
        input: "strs = ['']",
        output: "[['']]",
        explanation: "Single empty string forms its own group."
      }
    ],
    testCases: [
      { input: "eat tea tan ate nat bat", expectedOutput: "[['bat'],['nat','tan'],['ate','eat','tea']]" },
      { input: "", expectedOutput: "[['']]" },
      { input: "a", expectedOutput: "[['a']]" }
    ],
    hints: [
      "Two strings are anagrams if their sorted characters are identical",
      "Use the sorted string as a HashMap key to group anagrams together"
    ],
    lineByLineExplanation: [
      {
        line: "Map<String, List<String>> map = new HashMap<>();",
        explanation: "Our map key will be the sorted version of a word, and the value will be a list of all words that sort to that key."
      },
      {
        line: "for (String str : strs)",
        explanation: "We process each word one at a time."
      },
      {
        line: "char[] chars = str.toCharArray(); Arrays.sort(chars);",
        explanation: "We convert the word to a char array and sort it. 'eat' becomes 'aet', 'tea' becomes 'aet' — they share the same key."
      },
      {
        line: "String key = new String(chars);",
        explanation: "We convert the sorted char array back to a string to use as our HashMap key."
      },
      {
        line: "map.putIfAbsent(key, new ArrayList<>());",
        explanation: "If this sorted key does not exist in the map yet, we create a new empty list for it."
      },
      {
        line: "map.get(key).add(str);",
        explanation: "We add the original word to the list under its sorted key."
      },
      {
        line: "return new ArrayList<>(map.values());",
        explanation: "We return all the grouped lists as our final answer."
      }
    ]
  },
  "Top K Frequent Elements": {
    description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, number of unique elements in nums]",
      "It is guaranteed that the answer is unique"
    ],
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]",
        explanation: "1 appears 3 times, 2 appears 2 times. Top 2 frequent are 1 and 2."
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "Only one element, it is trivially the most frequent."
      }
    ],
    testCases: [
      { input: "[1,1,1,2,2,3]\n2", expectedOutput: "[1,2]" },
      { input: "[1]\n1", expectedOutput: "[1]" }
    ],
    hints: [
      "First count the frequency of each number using a HashMap",
      "Use a bucket sort approach: create an array where index = frequency, value = list of numbers with that frequency",
      "Iterate from highest frequency bucket down to collect k elements"
    ],
    lineByLineExplanation: [
      {
        line: "Map<Integer, Integer> count = new HashMap<>();",
        explanation: "We first count how many times each number appears in the array."
      },
      {
        line: "for (int num : nums) count.put(num, count.getOrDefault(num, 0) + 1);",
        explanation: "For each number, increment its count. getOrDefault returns 0 if the number has not been seen yet."
      },
      {
        line: "List<Integer>[] bucket = new List[nums.length + 1];",
        explanation: "We create a bucket array where index represents frequency. Index 3 holds all numbers that appear exactly 3 times. Max frequency is nums.length."
      },
      {
        line: "for (int key : count.keySet())",
        explanation: "We iterate over each unique number and place it in the correct frequency bucket."
      },
      {
        line: "int freq = count.get(key); bucket[freq].add(key);",
        explanation: "We look up how frequent this number is, then add it to that frequency bucket."
      },
      {
        line: "for (int i = bucket.length - 1; i >= 0 && result.size() < k; i--)",
        explanation: "We iterate from the highest frequency bucket downward, collecting elements until we have k results."
      }
    ]
  },
  "Encode and Decode Strings": {
    description: "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings. Implement encode and decode methods.",
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] contains any possible characters including special characters"
    ],
    examples: [
      {
        input: "strs = ['Hello','World']",
        output: "['Hello','World']",
        explanation: "Encode to a single string, then decode back to the original list."
      },
      {
        input: "strs = ['']",
        output: "['']",
        explanation: "Empty string should encode and decode correctly."
      }
    ],
    testCases: [
      { input: "Hello World", expectedOutput: "Hello\nWorld" },
      { input: "", expectedOutput: "" }
    ],
    hints: [
      "You cannot use a simple delimiter like comma because strings can contain any character",
      "Prefix each string with its length followed by a special separator like '#'"
    ],
    lineByLineExplanation: [
      {
        line: "sb.append(s.length()).append('#').append(s);",
        explanation: "For each string, we encode it as: length + '#' + actual string. So 'Hello' becomes '5#Hello'. This way we always know exactly how many characters to read."
      },
      {
        line: "int j = i + 1; while (encoded.charAt(j) != '#') j++;",
        explanation: "During decode, we scan forward from position i to find the '#' delimiter, which tells us where the length number ends."
      },
      {
        line: "int len = Integer.parseInt(encoded.substring(i, j));",
        explanation: "We parse the length number between i and j."
      },
      {
        line: "result.add(encoded.substring(j + 1, j + 1 + len));",
        explanation: "We extract exactly 'len' characters starting after the '#'. This gives us the original string, even if it contains '#' or any other character."
      }
    ]
  },
  "Product of Array Except Self": {
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix fits in a 32-bit integer"
    ],
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation: "answer[0]=2*3*4=24, answer[1]=1*3*4=12, answer[2]=1*2*4=8, answer[3]=1*2*3=6."
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]",
        explanation: "The zero makes most products zero."
      }
    ],
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]" },
      { input: "[-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]" }
    ],
    hints: [
      "For each position i, you need: product of everything to the LEFT times product of everything to the RIGHT",
      "Do two passes: first build a prefix products array left to right, then multiply by suffix products right to left"
    ],
    lineByLineExplanation: [
      {
        line: "int[] result = new int[nums.length]; result[0] = 1;",
        explanation: "We initialize the result array. result[0] starts as 1 because there is nothing to the left of index 0."
      },
      {
        line: "for (int i = 1; i < nums.length; i++) result[i] = result[i-1] * nums[i-1];",
        explanation: "First pass: fill result with prefix products. result[i] = product of all numbers before index i."
      },
      {
        line: "int suffix = 1;",
        explanation: "We use a single variable to track the running product from the right side."
      },
      {
        line: "for (int i = nums.length - 1; i >= 0; i--)",
        explanation: "Second pass: we go right to left, multiplying each position by the suffix product."
      },
      {
        line: "result[i] *= suffix; suffix *= nums[i];",
        explanation: "We multiply the current prefix product by the current suffix product to get the full answer. Then update suffix for the next iteration."
      }
    ]
  },
  "Valid Sudoku": {
    description: "Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: Each row must contain the digits 1-9 without repetition. Each column must contain the digits 1-9 without repetition. Each of the nine 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition. Note: A Sudoku board could be partially filled, where empty cells are filled with the character dot.",
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit 1-9 or '.'"
    ],
    examples: [
      {
        input: "board = [['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]",
        output: "true",
        explanation: "The board is valid according to all three rules."
      }
    ],
    testCases: [
      { input: "valid_board", expectedOutput: "true" }
    ],
    hints: [
      "Use three sets of HashSets: one for rows, one for columns, one for 3x3 boxes",
      "The box index for cell (r,c) is (r/3)*3 + (c/3)"
    ],
    lineByLineExplanation: [
      {
        line: "Set<String>[] rows = new HashSet[9], cols = new HashSet[9], boxes = new HashSet[9];",
        explanation: "We create 9 HashSets each for rows, columns, and 3x3 boxes. Each set tracks which digits have appeared."
      },
      {
        line: "if (board[r][c] == '.') continue;",
        explanation: "Empty cells (marked with dot) are skipped — they do not need validation."
      },
      {
        line: "int box = (r / 3) * 3 + (c / 3);",
        explanation: "This formula maps any (row, col) pair to its 3x3 box index 0-8. Row 0-2 and Col 0-2 maps to box 0, for example."
      },
      {
        line: "if (!rows[r].add(val) || !cols[c].add(val) || !boxes[box].add(val)) return false;",
        explanation: "HashSet.add() returns false if the element already exists. If any set rejects the digit, it is a duplicate — board is invalid."
      }
    ]
  },
  "Longest Consecutive Sequence": {
    description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    examples: [
      {
        input: "nums = [100,4,200,1,3,2]",
        output: "4",
        explanation: "The longest consecutive sequence is [1,2,3,4]. Its length is 4."
      },
      {
        input: "nums = [0,3,7,2,5,8,4,6,0,1]",
        output: "9",
        explanation: "The sequence [0,1,2,3,4,5,6,7,8] has length 9."
      }
    ],
    testCases: [
      { input: "[100,4,200,1,3,2]", expectedOutput: "4" },
      { input: "[0,3,7,2,5,8,4,6,0,1]", expectedOutput: "9" },
      { input: "[]", expectedOutput: "0" }
    ],
    hints: [
      "Put all numbers in a HashSet for O(1) lookup",
      "Only start counting a sequence from numbers that have no left neighbor (num-1 is not in set)"
    ],
    lineByLineExplanation: [
      {
        line: "Set<Integer> set = new HashSet<>(Arrays.asList(nums));",
        explanation: "We load all numbers into a HashSet for O(1) membership checks. Duplicates are automatically removed."
      },
      {
        line: "if (!set.contains(num - 1))",
        explanation: "We only start counting a sequence if this is the beginning of one. If num-1 exists, this number is in the middle of a sequence — skip it to avoid redundant work."
      },
      {
        line: "int length = 1; while (set.contains(num + length)) length++;",
        explanation: "We extend the sequence as far as possible by checking if the next consecutive number exists in our set."
      },
      {
        line: "longest = Math.max(longest, length);",
        explanation: "We update our best answer after each sequence is fully counted."
      }
    ]
  }
};
