"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Code, Loader2, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isCode?: boolean;
}

export default function JoxCoderChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/joxcoder/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationId: conversationId,
          context: {
            projectInfo: 'AUTOCREA V2.0 - Plataforma de desarrollo autónomo full-stack'
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          isCode: detectCodeInMessage(data.response),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(data.conversationId);
      } else {
        throw new Error(data.error || 'Error al comunicarse con JoxCoder');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const detectCodeInMessage = (content: string): boolean => {
    return content.includes('```') || 
           content.includes('function') || 
           content.includes('const ') ||
           content.includes('import ');
  };

  const formatMessage = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```(\w+)?\n?/g, '').replace(/```$/g, '');
        return (
          <pre key={index} className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto my-2 border border-slate-800">
            <code className="text-sm">{code}</code>
          </pre>
        );
      } else {
        return <p key={index} className="whitespace-pre-wrap text-sm leading-relaxed">{part}</p>;
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-slate-900/50 rounded-xl shadow-2xl border border-slate-800 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 p-6 rounded-t-xl">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
            <Bot size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              JoxCoder Assistant
              <Sparkles size={20} className="text-cyan-300" />
            </h2>
            <p className="text-sm text-cyan-100">Especialista en desarrollo AUTOCREA</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900/30">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-full mb-6 border border-cyan-500/30">
              <Code size={48} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">¡Hola! Soy JoxCoder</h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Puedo ayudarte con desarrollo en Next.js, React, TypeScript, y más.<br/>
              ¿En qué estás trabajando hoy?
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-100 shadow-lg border border-slate-700/50 backdrop-blur-sm'
                }`}
              >
                <div className="text-xs font-semibold mb-2 flex items-center gap-2 opacity-80">
                  {message.role === 'user' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-cyan-300" />
                      Tú
                    </>
                  ) : (
                    <>
                      <Bot size={14} />
                      JoxCoder
                    </>
                  )}
                </div>
                <div>
                  {formatMessage(message.content)}
                </div>
                <div className="text-xs opacity-60 mt-3">
                  {message.timestamp.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/80 rounded-xl p-4 shadow-lg border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <Loader2 size={18} className="animate-spin text-cyan-400" />
                <span className="text-sm">JoxCoder está pensando...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-slate-900/50 border-t border-slate-800 rounded-b-xl">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pregúntale a JoxCoder sobre desarrollo..."
            className="flex-1 resize-none bg-slate-800/80 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white px-6 rounded-lg hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:shadow-none"
          >
            {isLoading ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <Send size={22} />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Presiona <kbd className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Enter</kbd> para enviar, <kbd className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Shift+Enter</kbd> para nueva línea
        </p>
      </div>
    </div>
  );
}
