import { Request, Response } from 'express';
import UserProgress from '../models/UserProgress';
import BaseQuestion from '../models/BaseQuestion';
import calculateSM2 from '../utils/sm2';

export const submitProgress = async (req: Request, res: Response) => {
  try {
    const { questionId, rating } = req.body;
    const userId = (req as any).user._id;

    if (questionId === undefined || rating === undefined) {
      return res.status(400).json({ success: false, error: 'questionId and rating are required' });
    }
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ success: false, error: 'Rating must be between 0 and 5' });
    }

    const question = await BaseQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }

    let progress = await UserProgress.findOne({ user: userId, question: questionId });
    let currentData;
    
    if (!progress) {
      currentData = { repetitions: 0, easeFactor: 2.5, interval: 1 };
    } else {
      currentData = { 
        repetitions: progress.repetitions, 
        easeFactor: progress.easeFactor, 
        interval: progress.interval 
      };
    }

    const sm2Result = calculateSM2({ rating, ...currentData });

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { user: userId, question: questionId },
      {
        user: userId,
        question: questionId,
        rating,
        repetitions: sm2Result.repetitions,
        easeFactor: sm2Result.easeFactor,
        interval: sm2Result.interval,
        nextReviewDate: sm2Result.nextReviewDate,
        lastReviewedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, data: updatedProgress });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const progressList = await UserProgress.find({ user: userId })
      .populate('question', 'title category difficulty leetcodeLink')
      .sort({ nextReviewDate: 1 });

    return res.status(200).json({ success: true, count: progressList.length, data: progressList });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

export const getDueQuestions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const today = new Date();

    const due = await UserProgress.find({
      user: userId,
      nextReviewDate: { $lte: today }
    })
      .populate('question', 'title category difficulty leetcodeLink javaStarterCode corePattern')
      .sort({ nextReviewDate: 1 });

    const attemptedIds = due.map(p => p.question);
    const newQuestions = await BaseQuestion.find({
      _id: { $nin: attemptedIds },
      isActive: true
    })
      .limit(5)
      .select('title category difficulty leetcodeLink javaStarterCode corePattern');

    return res.status(200).json({
      success: true,
      data: {
        dueForReview: due,
        newToday: newQuestions
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

export const getQuestionProgress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { questionId } = req.params;

    const progress = await UserProgress.findOne({ user: userId, question: questionId });
    
    return res.status(200).json({ success: true, data: progress });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};
