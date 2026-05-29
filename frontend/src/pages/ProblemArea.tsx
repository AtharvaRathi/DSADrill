import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { fetchQuestionById } from '../utils/api';

const ProblemArea = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProblem = async () => {
      if (!id) return;
      try {
        const response = await fetchQuestionById(id);
        if (response.success) {
          setProblem(response.data);
        } else {
          setError('Failed to load problem details.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to connect to the server.');
      } finally {
        setLoading(false);
      }
    };
    loadProblem();
  }, [id]);

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
        <div className="text-sm font-medium px-3 py-1 bg-slate-800 rounded-full flex items-center gap-2">
          {problem && <span className={`w-2 h-2 rounded-full ${
            problem.difficulty === 'Easy' ? 'bg-green-400' :
            problem.difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
          }`}></span>}
          Problem #{problem?.leetcodeNumber || 'Unknown'}
        </div>
      </nav>

      {error && (
        <div className="bg-red-500/20 border-b border-red-500 text-red-200 p-2 text-center text-sm z-20">
          {error}
        </div>
      )}

      {/* Split Pane Layout using Native Flexbox */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Pane: Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-slate-800 bg-slate-900 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
              Loading problem...
            </div>
          ) : problem ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{problem.category}</span>
              </div>
              
              <div className="space-y-6 text-sm leading-relaxed">
                {problem.description ? (
                  <div className="prose prose-invert max-w-none text-slate-300" dangerouslySetInnerHTML={{ __html: problem.description }} />
                ) : (
                  <p>No description available for this problem.</p>
                )}

                {problem.examples && problem.examples.length > 0 && (
                  <div className="mt-8 space-y-4">
                    {problem.examples.map((ex: any, idx: number) => (
                      <div key={idx}>
                        <h3 className="font-bold text-white mb-2">Example {idx + 1}:</h3>
                        <pre className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-md overflow-x-auto">
                          <code>
                            <span className="text-slate-400">Input:</span> {ex.input}{'\n'}
                            <span className="text-slate-400">Output:</span> {ex.output}
                            {ex.explanation && (
                              <>{'\n'}<span className="text-slate-400">Explanation:</span> {ex.explanation}</>
                            )}
                          </code>
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
                
                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-bold text-white mb-2">Constraints:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 marker:text-slate-600">
                      {problem.constraints.map((c: string, idx: number) => (
                        <li key={idx}><code className="bg-slate-800 px-1 py-0.5 rounded">{c}</code></li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {problem.hints && problem.hints.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <details className="group">
                      <summary className="cursor-pointer text-blue-400 font-medium hover:text-blue-300">Show Hints</summary>
                      <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-400">
                        {problem.hints.map((hint: string, idx: number) => (
                          <li key={idx}>{hint}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              Problem not found.
            </div>
          )}
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
