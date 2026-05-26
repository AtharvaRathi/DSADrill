export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface ExecutionResult {
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  input: string;
}

export const executeJavaCode = async (code: string, testCases: TestCase[]): Promise<ExecutionResult[]> => {
  // Format the code: wrap in Main class if missing
  let formattedCode = code;
  if (!formattedCode.includes('public class Main')) {
    formattedCode = `public class Main {\n    public static void main(String[] args) {\n${code}\n    }\n}`;
  }

  const results: ExecutionResult[] = [];

  // Post to Piston API for each test case
  for (const testCase of testCases) {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: 'java',
        version: '15.0.2',
        files: [{ name: 'Main.java', content: formattedCode }],
        stdin: testCase.input || ''
      })
    });

    if (!response.ok) {
      throw new Error(`Piston API Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Strict Error Handling
    if (data.compile && data.compile.stderr) {
      throw new Error(data.compile.stderr);
    }

    if (data.run && data.run.stderr) {
      throw new Error(data.run.stderr);
    }

    // No stderr present, capture stdout
    const actualOutput = (data.run.stdout || '').trim();
    const expected = (testCase.expectedOutput || '').trim();
    
    results.push({
      input: testCase.input,
      expectedOutput: expected,
      actualOutput,
      passed: actualOutput === expected
    });
  }

  return results;
};
