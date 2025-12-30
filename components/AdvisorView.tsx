
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { User, VaultEntry, ChatMessage } from '../types';
import { supabase } from '../supabase';

interface AdvisorViewProps {
  user: User | null;
  onSaveToVault: (entry: Omit<VaultEntry, 'id' | 'timestamp'>) => void;
}

const AdvisorView: React.FC<AdvisorViewProps> = ({ user, onSaveToVault }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const fetchHistory = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('advisor_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    
    if (data && data.length > 0) {
      setMessages(data);
    } else {
      setMessages([{
        id: 'welcome',
        user_id: user.id,
        role: 'assistant',
        content: `Cloud Protocol Initialized. Welcome back, ${user.name}. I am monitoring the strategic convergence for ${user.companyName}. How shall we pivot today?`,
        created_at: new Date().toISOString()
      }]);
    }
    setIsSyncing(false);
  };

  const handleSaveToVault = (content: string, id: string) => {
    onSaveToVault({
      category: 'STRATEGIC CAPTURE',
      title: content.split('\n')[0].substring(0, 30) + '...',
      content: content
    });
    setSavedStatus(id);
    setTimeout(() => setSavedStatus(null), 2000);
  };

  const handleSendMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const userMessage = customPrompt || input.trim();
    if (!userMessage || isTyping || !user) return;

    if (!customPrompt) setInput('');
    
    const newUserMsg: ChatMessage = {
      id: Math.random().toString(),
      user_id: user.id,
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    const assistantId = Math.random().toString();
    setMessages(prev => [...prev, {
      id: assistantId,
      user_id: user.id,
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString()
    }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `
        You are the "Strategic Sync Advisor," the world's leading AI B2B Strategy Consultant.
        User Context: ${user.name}, ${user.companyName}.
        Style: Highly technical, concise, authoritative.
        Format: Always use Markdown.
      `;

      const result = await ai.models.generateContentStream({
        model: 'gemini-3-pro-preview',
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: { systemInstruction }
      });

      let fullText = "";
      for await (const chunk of result) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], content: fullText };
            return newMessages;
          });
        }
      }

      // Persist to DB after streaming completes
      await supabase.from('advisor_history').insert([
        { user_id: user.id, role: 'user', content: userMessage },
        { user_id: user.id, role: 'assistant', content: fullText }
      ]);

    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], content: "Error: Cloud sync interrupted." };
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-220px)] flex flex-col max-w-5xl mx-auto">
      <div className="flex-1 overflow-y-auto mb-6 pr-4 space-y-8 scrollbar-hide" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative group max-w-[85%] ${
              msg.role === 'user' ? 'bg-blue-600/5 border border-blue-500/20 p-6 rounded-3xl' : 'glass-panel border-slate-800 p-8 rounded-[40px]'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-1.5 h-1.5 rounded-full ${msg.role === 'user' ? 'bg-blue-500' : 'bg-cyan-400 animate-pulse'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {msg.role === 'user' ? 'PARTNER AUTHENTICATED' : 'STRATEGIC SYNC AI'}
                </span>
                
                {msg.role === 'assistant' && msg.content && !isTyping && (
                  <button onClick={() => handleSaveToVault(msg.content, msg.id)} className={`ml-auto px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${savedStatus === msg.id ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-800 text-slate-500 hover:text-white border border-slate-700'}`}>
                    {savedStatus === msg.id ? 'VAULTED' : 'COMMIT TO VAULT'}
                  </button>
                )}
              </div>
              <div className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'assistant' ? 'font-mono text-slate-300' : 'text-slate-200'}`}>
                {msg.content || "..."}
              </div>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-[10px] font-black text-cyan-500 animate-pulse tracking-widest uppercase pl-4">Advisor thinking...</div>}
      </div>

      <form onSubmit={handleSendMessage} className="relative group">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isTyping} placeholder="Enter strategic command..." className="w-full px-8 py-6 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono text-sm" />
        <button type="submit" disabled={isTyping} className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all">
          EXECUTE
        </button>
      </form>
    </div>
  );
};

export default AdvisorView;
