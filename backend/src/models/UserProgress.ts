import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  easeFactor: number;
  interval: number;
  nextReviewDate: Date;
  repetitionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'BaseQuestion', required: true },
    easeFactor: { type: Number, default: 2.5 },
    interval: { type: Number, default: 0 },
    nextReviewDate: { type: Date, default: Date.now },
    repetitionCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Compound index to ensure a user has only one progress record per question
UserProgressSchema.index({ userId: 1, questionId: 1 }, { unique: true });

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
