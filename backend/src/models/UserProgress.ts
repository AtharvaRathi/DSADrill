import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
  user: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  rating: number;
  easeFactor: number;
  interval: number;
  nextReviewDate: Date;
  repetitions: number;
  lastReviewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'BaseQuestion', required: true },
    rating: { type: Number, required: true },
    easeFactor: { type: Number, default: 2.5 },
    interval: { type: Number, default: 1 },
    nextReviewDate: { type: Date, default: Date.now },
    repetitions: { type: Number, default: 0 },
    lastReviewedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

UserProgressSchema.index({ user: 1, question: 1 }, { unique: true });
export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
