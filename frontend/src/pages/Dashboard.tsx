import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchQuestions } from '../utils/api';

interface Question {
  _id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  leetcodeNumber: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchQuestions();
        if (response.success) {
          setQuestions(response.data);
        } else {
          setError('Failed to load questions.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to connect to the server.');
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleStartDrill = (id: string) => {
    navigate(`/problem/${id}`);
  };

  const getDifficultyColor = (diff: string) => {
    if (diff === 'Easy') return 'text-green-400';
    if (diff === 'Medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-8">
      {error && (
        <div className="absolute top-4 bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded-md z-50">
          {error}
        </div>
      )}
      
      <div className="w-full max-w-5xl space-y-8 z-10 relative mt-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
            <span className="text-blue-500">DSA</span>Drill
          </h1>
          <p className="text-xl text-slate-400">
            Master Data Structures and Algorithms with dynamic pattern recognition.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center text-slate-400 py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            Loading problems...
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Problem Set</h2>
                <p className="text-slate-400 mt-1">Select a problem to start practicing.</p>
              </div>
              <div className="text-sm font-medium text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                {questions.length} Questions Available
              </div>
            </div>
            
            <div className="divide-y divide-slate-700/50 max-h-[600px] overflow-y-auto custom-scrollbar">
              {questions.map((q) => (
                <div 
                  key={q._id} 
                  className="p-4 hover:bg-slate-700/50 transition-colors flex items-center justify-between group cursor-pointer"
                  onClick={() => handleStartDrill(q._id)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 font-mono w-8 text-right">{q.leetcodeNumber}.</span>
                    <span className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{q.title}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-slate-400 hidden sm:block bg-slate-900/50 px-2 py-1 rounded">{q.category}</span>
                    <span className={`text-sm font-semibold w-16 text-right ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>
                </div>
              ))}
              {questions.length === 0 && !error && (
                <div className="p-12 text-center text-slate-500">
                  No questions found. Please ensure the database is seeded.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
