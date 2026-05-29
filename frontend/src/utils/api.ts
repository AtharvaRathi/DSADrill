const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchQuestions = async () => {
  const response = await fetch(`${API_URL}/questions`);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
};

export const fetchQuestionById = async (id: string) => {
  const response = await fetch(`${API_URL}/questions/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch question');
  }
  return response.json();
};
