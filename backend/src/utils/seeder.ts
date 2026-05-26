import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import BaseQuestion from '../models/BaseQuestion';

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('Clearing existing data in BaseQuestion collection...');
    await BaseQuestion.deleteMany({});
    console.log('Existing questions cleared.');

    const neetcode150Problems = [
      {
        title: 'Two Sum',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
        difficulty: 'Easy',
        category: 'Arrays & Hashing',
        corePattern: 'Use a HashMap to store complements',
        starterCode: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        if(!scanner.hasNextInt()) return;\n        int n = scanner.nextInt();\n        int[] nums = new int[n];\n        for(int i = 0; i < n; i++) {\n            nums[i] = scanner.nextInt();\n        }\n        int target = scanner.nextInt();\n        \n        int[] result = twoSum(nums, target);\n        System.out.println(Arrays.toString(result));\n    }\n\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}`,
        testCases: [
          {
            input: '4\n2 7 11 15\n9',
            expectedOutput: '[0, 1]'
          },
          {
            input: '3\n3 2 4\n6',
            expectedOutput: '[1, 2]'
          }
        ]
      },
      {
        title: 'Valid Anagram',
        description: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.',
        difficulty: 'Easy',
        category: 'Arrays & Hashing',
        corePattern: 'Use a frequency array or hash map to count character occurrences',
        starterCode: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        if(!scanner.hasNext()) return;\n        String s = scanner.next();\n        String t = scanner.next();\n        System.out.println(isAnagram(s, t));\n    }\n\n    public static boolean isAnagram(String s, String t) {\n        // Write your code here\n        return false;\n    }\n}`,
        testCases: [
          {
            input: 'anagram\nnagaram',
            expectedOutput: 'true'
          },
          {
            input: 'rat\ncar',
            expectedOutput: 'false'
          }
        ]
      },
      {
        title: 'Contains Duplicate',
        description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
        difficulty: 'Easy',
        category: 'Arrays & Hashing',
        corePattern: 'Use a HashSet to track seen elements.',
        starterCode: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        if(!scanner.hasNextInt()) return;\n        int n = scanner.nextInt();\n        int[] nums = new int[n];\n        for(int i = 0; i < n; i++) {\n            nums[i] = scanner.nextInt();\n        }\n        System.out.println(containsDuplicate(nums));\n    }\n\n    public static boolean containsDuplicate(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}`,
        testCases: [
          {
            input: '4\n1 2 3 1',
            expectedOutput: 'true'
          },
          {
            input: '4\n1 2 3 4',
            expectedOutput: 'false'
          }
        ]
      },
      {
        title: 'Valid Palindrome',
        description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
        difficulty: 'Easy',
        category: 'Two Pointers',
        corePattern: 'Use left and right pointers moving inward, skipping non-alphanumeric characters.',
        starterCode: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        if(!scanner.hasNextLine()) return;\n        String s = scanner.nextLine();\n        System.out.println(isPalindrome(s));\n    }\n\n    public static boolean isPalindrome(String s) {\n        // Write your code here\n        return false;\n    }\n}`,
        testCases: [
          {
            input: 'A man, a plan, a canal: Panama',
            expectedOutput: 'true'
          },
          {
            input: 'race a car',
            expectedOutput: 'false'
          }
        ]
      },
      {
        title: 'Best Time to Buy and Sell Stock',
        description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
        difficulty: 'Easy',
        category: 'Sliding Window',
        corePattern: 'Track the minimum price seen so far and calculate the max profit at each step.',
        starterCode: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        if(!scanner.hasNextInt()) return;\n        int n = scanner.nextInt();\n        int[] prices = new int[n];\n        for(int i = 0; i < n; i++) {\n            prices[i] = scanner.nextInt();\n        }\n        System.out.println(maxProfit(prices));\n    }\n\n    public static int maxProfit(int[] prices) {\n        // Write your code here\n        return 0;\n    }\n}`,
        testCases: [
          {
            input: '6\n7 1 5 3 6 4',
            expectedOutput: '5'
          },
          {
            input: '5\n7 6 4 3 1',
            expectedOutput: '0'
          }
        ]
      }
    ];

    console.log('Inserting seed data...');
    await BaseQuestion.insertMany(neetcode150Problems);
    console.log('Data seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
