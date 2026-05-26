import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyTask {
  date: Date;
  questionIds: mongoose.Types.ObjectId[];
  completed: boolean;
}

export interface IStudyPlan extends Document {
  userId: mongoose.Types.ObjectId;
  goal: string;
  startDate: Date;
  targetEndDate: Date;
  dailyTasks: IDailyTask[];
  createdAt: Date;
  updatedAt: Date;
}

const DailyTaskSchema: Schema = new Schema({
  date: { type: Date, required: true },
  questionIds: [{ type: Schema.Types.ObjectId, ref: 'BaseQuestion' }],
  completed: { type: Boolean, default: false },
}, { _id: false });

const StudyPlanSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: String, required: true },
    startDate: { type: Date, required: true },
    targetEndDate: { type: Date, required: true },
    dailyTasks: [DailyTaskSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IStudyPlan>('StudyPlan', StudyPlanSchema);
