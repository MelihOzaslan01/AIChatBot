import React from 'react';
import { Landmark, TrendingUp, ShieldCheck, HelpCircle } from 'lucide-react';

interface Props {
  onSuggestionClick: (text: string) => void;
  disabled: boolean;
}

export const Sidebar: React.FC<Props> = ({ onSuggestionClick, disabled }) => {
  const suggestions = [
    "What's the difference between a Roth and Traditional IRA?",
    "How does a 401(k) employer match work?",
    "What is a 529 College Savings Plan?",
    "Should I open a brokerage account or an IRA first?",
    "What are the tax benefits of a Health Savings Account (HSA)?"
  ];

  return (
    <div className="w-full md:w-80 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 flex-shrink-0">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-900/20">
          <Landmark size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Apex Financial</h1>
          <p className="text-xs text-slate-400 font-medium">Investment Assistant</p>
        </div>
      </div>

      <div className="p-6 flex-grow overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
            <ShieldCheck size={14} className="mr-2" /> Secure & Private
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            This assistant is designed to help you understand your investment options. Your conversations are secure and not stored permanently.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
            <HelpCircle size={14} className="mr-2" /> Suggested Topics
          </h2>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                disabled={disabled}
                className="w-full text-left p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 hover:border-slate-600 transition-all duration-200 text-sm flex items-start space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TrendingUp size={16} className="text-blue-400 mt-0.5 flex-shrink-0 group-hover:text-blue-300 transition-colors" />
                <span className="text-slate-300 group-hover:text-white transition-colors">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center bg-slate-900/50">
        For educational purposes only.<br/>Not personalized financial advice.
      </div>
    </div>
  );
};
