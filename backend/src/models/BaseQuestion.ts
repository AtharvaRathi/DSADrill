import mongoose, { Document, Schema } from 'mongoose';

export interface ITestCase {
  input: string;
  expectedOutput: string;
}

export type NeetCodeCategory = 
  | 'Arrays & Hashing' | 'Two Pointers' | 'Sliding Window' | 'Stack' 
  | 'Binary Search' | 'Linked List' | 'Trees' | 'Tries' 
  | 'Heap / Priority Queue' | 'Backtracking' | 'Graphs' | 'Advanced Graphs' 
  | '1-D Dynamic Programming' | '2-D Dynamic Programming' | 'Greedy' 
  | 'Intervals' | 'Math & Geometry' | 'Bit Manipulation';

export interface IBaseQuestion extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: NeetCodeCategory;
  corePattern: string;
  starterCode: string;
  testCases: ITestCase[];
  createdAt: Date;
  updatedAt: Date;
}

const TestCaseSchema: Schema = new Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
}, { _id: false });

const BaseQuestionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    category: { 
      type: String, 
      required: true,
      enum: [
        'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 
        'Binary Search', 'Linked List', 'Trees', 'Tries', 
        'Heap / Priority Queue', 'Backtracking', 'Graphs', 'Advanced Graphs', 
        '1-D Dynamic Programming', '2-D Dynamic Programming', 'Greedy', 
        'Intervals', 'Math & Geometry', 'Bit Manipulation'
      ]
    },
    corePattern: { type: String, required: true },
    starterCode: { type: String, default: '' },
    testCases: [TestCaseSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IBaseQuestion>('BaseQuestion', BaseQuestionSchema);
