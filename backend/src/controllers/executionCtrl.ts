import { Request, Response } from 'express';
import { executeJavaCode } from '../services/pistonService';

export const executeCode = async (req: Request, res: Response) => {
  try {
    const { code, testCases } = req.body;
    
    if (!code || !testCases || !Array.isArray(testCases)) {
      return res.status(400).json({ error: 'Please provide code and an array of testCases' });
    }

    const results = await executeJavaCode(code, testCases);
    
    return res.status(200).json({ results });
  } catch (error: any) {
    // If the service throws an error (e.g. stderr was detected), return a 400 with the exact error string
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(400).json({ error: errorMessage });
  }
};
