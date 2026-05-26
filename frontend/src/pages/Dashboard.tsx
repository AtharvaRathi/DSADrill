import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleStartDrill = () => {
    try {
      // Simulate checking user session or initial problem ID
      const initialProblemId = "1"; // e.g., Two Sum
      navigate(`/problem/${initialProblemId}`);
    } catch (err: any) {
      setError(err.message || "Failed to start AlgoDrill. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      {error && (
        <div className="absolute top-4 bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded-md z-50">
          {error}
        </div>
      )}
      
      <div className="max-w-2xl text-center space-y-8 z-10 relative">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          <span className="text-blue-500">DSA</span>Drill
        </h1>
        <p className="text-xl text-slate-400">
          Master Data Structures and Algorithms with dynamic pattern recognition and automated scheduling.
        </p>
        
        <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4">Your Next Drill Awaits</h2>
          <p className="text-slate-400 mb-6">Continue your journey through the NeetCode 150.</p>
          
          <button 
            onClick={handleStartDrill}
            className="cursor-pointer relative z-10 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-blue-500/25"
          >
            Start AlgoDrill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
