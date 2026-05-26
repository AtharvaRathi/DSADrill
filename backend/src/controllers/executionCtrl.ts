import { Request, Response } from 'express';
import { executeJavaCode } from '../services/pistonService';

export const executeCode = async (req: Request, res: Response) => {
  try {
    const { code, testCases } = req.body;
    
    if (!code || !testCases || !Array.isArray(testCases)) {
      return res.status(400).json({ success: false, error: 'Please provide code and an array of testCases' });
    }

    const results = await executeJavaCode(code, testCases);
    
    return res.status(200).json({ success: true, data: results });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(400).json({ success: false, error: errorMessage });
  }
};
