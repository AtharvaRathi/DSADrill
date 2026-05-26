import mongoose, { Document, Schema } from 'mongoose';

export interface ITestCase {
  input: string;
  expectedOutput: string;
}

export interface IExample {
  input: string;
  output: string;
  explanation: string;
}

export interface ILineByLine {
  line: string;
  explanation: string;
}

export type NeetCodeCategory = 
  | 'Arrays & Hashing' | 'Two Pointers' | 'Sliding Window' | 'Stack' 
  | 'Binary Search' | 'Linked List' | 'Trees' | 'Tries' 
  | 'Heap / Priority Queue' | 'Backtracking' | 'Graphs' | 'Advanced Graphs' 
  | '1-D Dynamic Programming' | '2-D Dynamic Programming' | 'Greedy' 
  | 'Intervals' | 'Math & Geometry' | 'Bit Manipulation';

export interface IBaseQuestion extends Document {
  title: string;
  description?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: NeetCodeCategory;
  corePattern: string;
  starterCode?: string;
  javaStarterCode: string;
  leetcodeNumber: number;
  leetcodeLink: string;
  tags: string[];
  isActive: boolean;
  testCases: ITestCase[];
  constraints?: string[];
  examples?: IExample[];
  hints?: string[];
  lineByLineExplanation?: ILineByLine[];
  createdAt: Date;
  updatedAt: Date;
}

const TestCaseSchema: Schema = new Schema({
  input: { type: String, default: "" },
  expectedOutput: { type: String, default: "" },
}, { _id: false });

const ExampleSchema: Schema = new Schema({
  input: { type: String, default: "" },
  output: { type: String, default: "" },
  explanation: { type: String, default: "" }
}, { _id: false });

const LineByLineSchema: Schema = new Schema({
  line: { type: String, required: true },
  explanation: { type: String, required: true }
}, { _id: false });

const BaseQuestionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
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
    starterCode: { type: String, required: false },
    javaStarterCode: { type: String, required: true },
    leetcodeNumber: { type: Number, required: true },
    leetcodeLink: { type: String, required: true },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    testCases: [TestCaseSchema],
    constraints: { type: [String], default: [] },
    examples: [ExampleSchema],
    hints: { type: [String], default: [] },
    lineByLineExplanation: [LineByLineSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IBaseQuestion>('BaseQuestion', BaseQuestionSchema);
