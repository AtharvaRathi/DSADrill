import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';

const ProblemArea = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    try {
      navigate('/');
    } catch (err: any) {
      setError("Failed to navigate back.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-slate-900 text-slate-300 overflow-hidden">
      {/* Navbar */}
      <nav className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-950 shrink-0 relative z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="cursor-pointer text-slate-400 hover:text-white transition-colors p-2"
          >
            ← Back
          </button>
          <div className="font-bold text-lg">
            <span className="text-blue-500">DSA</span>Drill
          </div>
        </div>
        <div className="text-sm font-medium px-3 py-1 bg-slate-800 rounded-full">
          Problem #{id || 'Unknown'}
        </div>
      </nav>

      {error && (
        <div className="bg-red-500/20 border-b border-red-500 text-red-200 p-2 text-center text-sm">
          {error}
        </div>
      )}

      {/* Split Pane Layout using Native Flexbox */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Pane: Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-slate-800 bg-slate-900 overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Two Sum</h1>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                Given an array of integers <code>nums</code> and an integer <code>target</code>, 
                return indices of the two numbers such that they add up to <code>target</code>.
              </p>
              <p>
                You may assume that each input would have <strong>exactly one solution</strong>, 
                and you may not use the same element twice.
              </p>
              <p>You can return the answer in any order.</p>

              <div className="mt-8">
                <h3 className="font-bold text-white mb-2">Example 1:</h3>
                <pre className="bg-slate-800 p-4 rounded-md">
                  <code>
                    Input: nums = [2,7,11,15], target = 9{'\n'}
                    Output: [0,1]{'\n'}
                    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Code Editor */}
        <div className="w-1/2 flex flex-col bg-[#1e1e1e] relative z-10">
          <CodeEditor />
        </div>

      </div>
    </div>
  );
};

export default ProblemArea;
