import { Request, Response } from 'express';
import BaseQuestion from '../models/BaseQuestion';

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const { category, difficulty } = req.query;
    
    const query: any = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    
    const questions = await BaseQuestion.find(query);
    return res.status(200).json({ success: true, data: questions });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: errorMessage });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await BaseQuestion.findById(id);
    
    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }
    
    return res.status(200).json({ success: true, data: question });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ success: false, error: errorMessage });
  }
};
