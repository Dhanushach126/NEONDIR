import React, { useState } from 'react';
import { Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Tool } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AIConciergeProps {
  tools: Tool[];
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({ tools }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I\'m your AI Concierge. Tell me what you need to do (e.g., "create a video" or "write code"), and I\'ll recommend the best tools!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Prepare context about available tools
      const toolsContext = tools.map(t => 
        `- ${t.name} (${t.category}, ${t.pricing}): ${t.description}. Tags: ${t.tags}`
      ).join('\n');

      const prompt = `
        You are a helpful assistant for an AI Tool Directory.
        Here is the list of available tools:
        ${toolsContext}

        User Request: "${userMsg}"

        Recommend 1-3 most relevant tools from the list above. 
        Explain briefly why each tool fits the user's request.
        If no tool fits, suggest a general category they should look for.
        Keep the response concise and friendly.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const text = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0a0510] border border-[#00d2ff]/30 text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] hover:bg-[#00d2ff]/10 transition-all duration-300 hover:scale-105"
      >
        {isOpen ? <Sparkles className="h-6 w-6" /> : <Bot className="h-7 w-7" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 flex flex-col rounded-2xl glass-panel shadow-[0_0_30px_rgba(0,210,255,0.15)] overflow-hidden h-[500px]"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00d2ff]/10 border border-[#00d2ff]/30">
                <Sparkles className="h-5 w-5 text-[#00d2ff]" />
              </div>
              <h3 className="font-bold text-white font-[Syncopate] tracking-wide">AI Concierge</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0a0510]/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#00d2ff]/20 text-white border border-[#00d2ff]/30 rounded-br-none shadow-[0_0_10px_rgba(0,210,255,0.1)]'
                        : 'bg-white/5 text-gray-300 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-2xl rounded-bl-none px-4 py-3 border border-white/10">
                    <Loader2 className="h-4 w-4 animate-spin text-[#00d2ff]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white/5 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for a recommendation..."
                  className="flex-1 rounded-full border border-white/10 bg-[#0a0510]/50 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/30 hover:bg-[#00d2ff]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
