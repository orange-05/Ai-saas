'use client';

import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

type Message = { role: 'user' | 'assistant'; content: string };

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

const suggestions = [
  'Write a short story about a robot learning to feel emotions.',
  'Explain quantum computing in simple terms.',
  'Give me 5 startup ideas in the health tech space.',
  'What are the key principles of good UI design?',
];

export default function ConversationPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming, loading]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    const updated: Message[] = [...messages, { role: 'user', content: msg }];
    setMessages(updated);
    setLoading(true);
    setStreaming('');

    try {
      if (!API_KEY) {
        throw new Error('Gemini API key not configured.');
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Build chat history for multi-turn
      const history = updated.slice(0, -1).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessageStream(msg);

      let full = '';
      for await (const chunk of result.stream) {
        const text = chunk.text();
        full += text;
        setStreaming(full);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: full }]);
      setStreaming('');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred.';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ Error: ${errorMsg}` },
      ]);
      setStreaming('');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0.5); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #6366f1; animation: dot-bounce 1.2s ease-in-out infinite; display: inline-block; }
        .dot:nth-child(2) { animation-delay: 0.15s; }
        .dot:nth-child(3) { animation-delay: 0.3s; }
        .suggestion-btn:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(99,102,241,0.4) !important; }
        .message-ai pre { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; overflow-x: auto; margin: 8px 0; font-size: 0.82rem; }
        .message-ai code { font-family: 'Courier New', monospace; }
        .streaming-cursor::after { content: '▋'; animation: blink 1s infinite; color: #6366f1; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <div
        className="animate-fade-in"
        style={{
          maxWidth: 800, margin: '0 auto',
          display: 'flex', flexDirection: 'column',
          height: 'calc(100vh - 130px)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 24, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, background: 'rgba(99,102,241,0.15)',
            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
          }}>💬</div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Conversation</h1>
            <p style={{ color: '#6b7280', fontSize: '0.82rem' }}>
              Powered by <span style={{ color: '#a5b4fc' }}>Gemini 2.0 Flash</span>
            </p>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16,
        }}>
          {messages.length === 0 && !streaming && (
            <div style={{ margin: 'auto', textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>💬</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8, color: '#e5e7eb' }}>Start a conversation</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: 28 }}>
                Ask me anything — I&apos;m powered by Google Gemini AI.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12, textAlign: 'left',
              }}>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="suggestion-btn"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12, padding: '12px 16px',
                      color: '#9ca3af', fontSize: '0.82rem',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s', lineHeight: 1.5,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === 'user' ? 'message-user' : 'message-ai'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {m.content}
            </div>
          ))}

          {/* Streaming response */}
          {streaming && (
            <div className="message-ai streaming-cursor" style={{ whiteSpace: 'pre-wrap' }}>
              {streaming}
            </div>
          )}

          {/* Loading dots (before first token) */}
          {loading && !streaming && (
            <div className="message-ai" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gemini is thinking...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ flexShrink: 0, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {!API_KEY && (
            <div style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 10,
              color: '#fca5a5', fontSize: '0.8rem',
            }}>
              ⚠️ NEXT_PUBLIC_GEMINI_API_KEY is not set. Add it to .env.local to enable AI responses.
            </div>
          )}
          <div style={{ display: 'flex', gap: 12 }}>
            <textarea
              className="chat-input"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Gbot... (Enter to send, Shift+Enter for new line)"
            />
            <button
              className="btn-primary"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{ padding: '0 24px', alignSelf: 'flex-end', flexShrink: 0 }}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
