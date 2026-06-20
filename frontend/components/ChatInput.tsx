import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Props {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<Props> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount and when re-enabled
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
      <div className="max-w-4xl mx-auto relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about investment accounts..."
          disabled={disabled}
          className="w-full pl-5 pr-14 py-3.5 rounded-full border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-400 transition-all shadow-sm text-sm"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="absolute right-2 p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-sm"
          aria-label="Send message"
        >
          <Send size={18} className={input.trim() && !disabled ? 'translate-x-0.5' : ''} />
        </button>
      </div>
      <div className="max-w-4xl mx-auto mt-2 text-center">
        <p className="text-[10px] text-slate-400">
          AI-generated responses may contain inaccuracies. Always verify important financial information.
        </p>
      </div>
    </div>
  );
};
