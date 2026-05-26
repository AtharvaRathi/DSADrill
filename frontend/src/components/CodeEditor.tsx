import { useState } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState<string>(`class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}`);
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditorMount: OnMount = (editor, monaco) => {
    // Additional Monaco configurations can go here
    editor.focus();
  };

  const handleRunCode = async () => {
    try {
      setError(null);
      setOutput('Executing...');
      setIsExecuting(true);

      // Java Execution Wrapper Template
      // The backend expects the logic to be wrapped in a public class Main
      const wrappedCode = `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Wrapper for testing user code
        Solution solution = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = solution.twoSum(nums, target);
        System.out.println("Result: " + Arrays.toString(result));
    }
}

${code}
      `.trim();

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${apiUrl}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: wrappedCode,
          testCases: [{ input: '', expectedOutput: 'Result: [0, 1]' }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Execution failed");
      }

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        setOutput(`${result.actualOutput}\n\nExecution ${result.passed ? 'Successful' : 'Failed'}.`);
      } else {
        setOutput("Execution finished, no output.");
      }
      
    } catch (err: any) {
      setError(err.message || "Failed to execute code. Please check your backend connection.");
      setOutput('');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Editor Header */}
      <div className="h-10 bg-slate-800 flex items-center justify-between px-4 shrink-0 border-b border-slate-700">
        <div className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <span className="text-orange-400 font-mono text-xs">Java</span>
        </div>
        <div>
          <button 
            onClick={handleRunCode}
            disabled={isExecuting}
            className="cursor-pointer relative z-10 bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white px-4 py-1 rounded text-sm font-semibold transition-colors flex items-center gap-2"
          >
            {isExecuting ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border-b border-red-500/50 text-red-400 p-3 text-sm font-mono shrink-0">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}

      {/* Monaco Editor Container */}
      <div className="flex-1 min-h-0 relative z-10">
        <Editor
          height="100%"
          defaultLanguage="java"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            roundedSelection: false,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          }}
        />
      </div>

      {/* Console Output Area */}
      <div className="h-48 border-t border-slate-700 bg-slate-950 flex flex-col shrink-0">
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Console Output
        </div>
        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto text-slate-300 whitespace-pre-wrap">
          {output || 'Run your code to see the output here.'}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
