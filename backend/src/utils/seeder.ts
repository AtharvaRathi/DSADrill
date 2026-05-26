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

    const questions = [
      {
        title: 'Two Sum',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
        difficulty: 'Easy',
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
      }
    ];

    console.log('Inserting seed data...');
    await BaseQuestion.insertMany(questions);
    console.log('Data seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
