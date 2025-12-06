'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import { ChatMessage } from '@/app/types';
import { generateId, formatTime } from '@/app/utils/helpers';

const AIChatAssistant: React.FC<{ geminiApiKey?: string }> = ({ geminiApiKey = '' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: 'assistant',
      content:
        "Hey! 👋 I'm your AI Productivity Assistant. I can help you plan your day, optimize your schedule, and boost your productivity. Try asking me things like: 'Help me plan my Sunday' or 'I'm overwhelmed, fix my schedule'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        plan: `Here's your personalized plan for the day:
        
📅 Morning (9am-12pm):
- Deep work: Design dashboard UI
- Break: 10:30am (15 min)

📅 Afternoon (1pm-5pm):
- Meetings & review
- Break: 3pm (15 min)

📅 Evening (6pm-8pm):
- Light tasks
- Personal time

💡 Pro tips: Start with the hardest task, you're most focused in the morning!`,
        overwhelmed: `I hear you! Let's simplify:

🎯 Focus on these 3 tasks only today:
1. Design dashboard (2 hrs) - Most important
2. Write docs (1 hr)
3. Code review (30 min)

✨ Move everything else to tomorrow or next week.

🧘 Take 5-minute breaks between tasks.

You got this! One task at a time.`,
        optimize: `🚀 Here's how to optimize your schedule:

⏰ Your peak hours: 10am-1pm
📊 Best task types:
- Creative work: Morning
- Admin tasks: Afternoon
- Meetings: Late morning

💤 Recommended sleep: 11pm-7am
🎯 Pomodoro sessions: 4 per day (2 hours focused work)`,
        default: `That's a great question! Let me help you out:

Based on your patterns, here's my suggestion:
- Try blocking your calendar for focused work
- Use the Pomodoro technique (25 min sessions)
- Take breaks between tasks
- Track your productivity to find your peak hours

What specific area would you like help with?`,
      };

      const responseKey = Object.keys(aiResponses).find((key) =>
        input.toLowerCase().includes(key)
      ) || 'default';

      const aiMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: aiResponses[responseKey],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px] glass p-6 rounded-lg space-y-4">
      {/* Header */}
      <div className="border-b border-gray-700/50 pb-4">
        <h3 className="text-lg font-semibold text-white">🤖 AI Productivity Assistant</h3>
        <p className="text-xs text-gray-400">Your personal AI coach</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg ${message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700/50 text-gray-100'
                }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.content}
              </p>
              <p className="text-xs mt-2 opacity-70">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700/50 px-4 py-3 rounded-lg">
              <Loader className="w-4 h-4 text-blue-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400">Quick suggestions:</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Help me plan my day',
              "I'm overwhelmed",
              'Optimize my schedule',
              'Focus mode tips',
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setInput(suggestion)}
                className="text-xs glass-sm p-2 rounded hover:bg-white/15 transition-colors text-left text-gray-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 pt-4 border-t border-gray-700/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="btn btn-primary disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AIChatAssistant;
