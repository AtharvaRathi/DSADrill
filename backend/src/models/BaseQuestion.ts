import mongoose, { Document, Schema } from 'mongoose';

export interface ITestCase {
  input: string;
  expectedOutput: string;
}

export interface IBaseQuestion extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
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
    starterCode: { type: String, default: '' },
    testCases: [TestCaseSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IBaseQuestion>('BaseQuestion', BaseQuestionSchema);
