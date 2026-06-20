import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Building2 } from 'lucide-react';
import { Message } from '../types';

interface Props {
  message: Message;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-6`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 ${
          isBot 
            ? 'bg-white border border-slate-200 text-blue-600 mr-3 shadow-sm' 
            : 'bg-blue-600 text-white ml-3 shadow-sm'
        }`}>
          {isBot ? <Building2 size={16} /> : <User size={16} />}
        </div>
        
        {/* Message Bubble */}
        <div className={`p-4 rounded-2xl shadow-sm ${
          isBot 
            ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none' 
            : 'bg-blue-600 text-white rounded-tr-none'
        }`}>
          {isBot ? (
            <div className="text-sm leading-relaxed">
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-lg font-bold mt-4 mb-2 text-slate-900" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-md font-bold mt-3 mb-2 text-slate-900" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-2 mb-1 text-slate-900" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />,
                  a: ({node, ...props}) => <a className="text-blue-600 hover:underline font-medium" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-slate-600" {...props} />,
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
          )}
          
          {/* Timestamp */}
          <span className={`text-[10px] mt-2 block font-medium ${
            isBot ? 'text-slate-400' : 'text-blue-200 text-right'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
