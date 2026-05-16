'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: msg }];
    setMessages(newMessages);
    setLoading(true);

    // Simulate AI response (replace with real API call)
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const reply = `I'm Gbot AI. You asked: "${msg}"\n\nThis is a demo response. Connect your OpenAI API key in the settings to enable real AI responses. The full Gbot platform supports multi-turn conversations, context memory, and much more!`;
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 130px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, background: 'rgba(99,102,241,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>💬</div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Conversation</h1>
            <p style={{ color: '#6b7280', fontSize: '0.82rem' }}>Chat with the most advanced AI model</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
        {messages.length === 0 && (
          <div style={{ margin: 'auto', textAlign: 'center', padding: 32 }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>💬</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8, color: '#e5e7eb' }}>Start a conversation</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: 28 }}>Ask me anything. I'm here to help.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, textAlign: 'left' }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12, padding: '12px 16px', color: '#9ca3af', fontSize: '0.82rem',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', lineHeight: 1.5
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'message-user' : 'message-ai'}
            style={{ whiteSpace: 'pre-wrap' }}>
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="message-ai" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#6366f1',
                  animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                  '@keyframes bounce': { '0%,80%,100%': { transform: 'scale(0)' }, '40%': { transform: 'scale(1)' } }
                } as any} />
              ))}
            </div>
            <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.5);opacity:0.5} 40%{transform:scale(1);opacity:1} }`}</style>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ flexShrink: 0, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <textarea
            className="chat-input"
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Gbot... (Enter to send, Shift+Enter for new line)"
          />
          <button className="btn-primary" onClick={() => send()} disabled={!input.trim() || loading}
            style={{ padding: '0 24px', alignSelf: 'flex-end', flexShrink: 0 }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
