import { Request, Response } from 'express';
import StudyPlan from '../models/StudyPlan';
import BaseQuestion from '../models/BaseQuestion';
import UserProgress from '../models/UserProgress';

export const createStudyPlan = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { title, targetDate, dailyGoal } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: 'Plan title is required' });
    }
    if (dailyGoal !== undefined && (dailyGoal < 1 || dailyGoal > 20)) {
      return res.status(400).json({ success: false, error: 'Daily goal must be between 1 and 20' });
    }

    const existing = await StudyPlan.findOne({ user: userId, isActive: true });
    if (existing) {
      return res.status(400).json({ success: false, error: 'You already have an active study plan. Complete or deactivate it first.' });
    }

    const plan = await StudyPlan.create({
      user: userId,
      title,
      targetDate: targetDate ? new Date(targetDate) : null,
      dailyGoal: dailyGoal || 5,
      isActive: true,
      startDate: new Date()
    });

    return res.status(201).json({ success: true, data: plan });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

export const getMyStudyPlan = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const plan = await StudyPlan.findOne({ user: userId, isActive: true });

    if (!plan) {
      return res.status(404).json({ success: false, error: 'No active study plan found' });
    }

    return res.status(200).json({ success: true, data: plan });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

export const updateStudyPlan = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { title, targetDate, dailyGoal, isActive } = req.body;

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (targetDate !== undefined) updates.targetDate = new Date(targetDate);
    if (dailyGoal !== undefined) updates.dailyGoal = dailyGoal;
    if (isActive !== undefined) updates.isActive = isActive;

    const plan = await StudyPlan.findOneAndUpdate(
      { user: userId, isActive: true },
      updates,
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ success: false, error: 'No active study plan found to update' });
    }

    return res.status(200).json({ success: true, data: plan });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

export const getStudyPlanStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    const [plan, totalProgress] = await Promise.all([
      StudyPlan.findOne({ user: userId, isActive: true }),
      UserProgress.find({ user: userId })
    ]);

    if (!plan) {
      return res.status(404).json({ success: false, error: 'No active study plan found' });
    }

    const totalAttempted = totalProgress.length;
    const totalMastered = totalProgress.filter(p => p.repetitions >= 3).length;
    const averageRating = totalProgress.length > 0 
        ? parseFloat((totalProgress.reduce((sum, p) => sum + p.rating, 0) / totalProgress.length).toFixed(2))
        : 0;
    const daysUntilTarget = plan.targetDate 
        ? Math.ceil((plan.targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null;

    return res.status(200).json({
      success: true,
      data: {
        plan,
        stats: {
          totalAttempted,
          totalMastered,
          averageRating,
          daysUntilTarget
        }
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};
