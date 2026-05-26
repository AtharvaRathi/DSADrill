import mongoose, { Document, Schema } from 'mongoose';

export interface IStudyPlan extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  targetDate: Date | null;
  dailyGoal: number;
  isActive: boolean;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudyPlanSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    targetDate: { type: Date, default: null },
    dailyGoal: { type: Number, default: 5 },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IStudyPlan>('StudyPlan', StudyPlanSchema);
