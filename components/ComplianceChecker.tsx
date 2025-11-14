import React, { useState, useCallback } from 'react';
import { analyzeCompliance } from '../services/geminiService';
import { SparklesIcon } from './icons';

// A simple function to convert the AI's markdown-like output to HTML
const renderAnalysisResult = (text: string) => {
  // Bolding for headings
  let html = text.replace(/\*\*(.*?)\*\*/g, '<h4 class="text-lg font-semibold text-brand-blue mt-4">$1</h4>');
  
  // Bullet points
  html = html.replace(/^\s*-\s*(.*)/gm, '<li class="text-text-secondary">$1</li>');

  // Wrap consecutive list items in a <ul>
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc pl-5 mt-2 mb-4">$1</ul>');
  
  // Cleanup any weird spacing between list items caused by the regex
  html = html.replace(/<\/li>\s*<ul/g, '</li><ul');

  return html.replace(/\n/g, '<br/>');
};

const ComplianceChecker: React.FC = () => {
  const [policyText, setPolicyText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = useCallback(async () => {
    if (!policyText.trim()) {
      setError('Please enter a policy or data processing action to analyze.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysisResult('');
    try {
      const result = await analyzeCompliance(policyText);
      setAnalysisResult(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to get analysis. Please try again.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [policyText]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-blue mb-2">Automated Compliance Tool</h1>
      <p className="text-text-secondary mb-6">
        Leverage AI to analyze your data processing activities against NDPR and global standards.
      </p>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label htmlFor="policy-text" className="block text-sm font-medium text-text-primary mb-2">
            Enter Data Processing Policy or Action Log
          </label>
          <textarea
            id="policy-text"
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue transition"
            placeholder="e.g., User ID 123's phone number was shared with Marketing Partner XYZ for a promotional campaign..."
            value={policyText}
            onChange={(e) => setPolicyText(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
             <>
               <SparklesIcon />
               <span className="ml-2">Analyze with AI</span>
             </>
          )}
        </button>
        {analysisResult && (
          <div className="mt-6 p-4 bg-light-gray border-l-4 border-brand-blue rounded-r-lg">
            <h3 className="text-xl font-bold text-brand-blue mb-2">AI Compliance Analysis</h3>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: renderAnalysisResult(analysisResult) }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceChecker;