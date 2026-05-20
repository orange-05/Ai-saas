'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

const languages = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'SQL', 'Bash'];

const examples = [
  { title: 'REST API endpoint', lang: 'TypeScript', prompt: 'Create a REST API endpoint for user authentication with JWT tokens' },
  { title: 'Binary search', lang: 'Python', prompt: 'Write a binary search algorithm with O(log n) complexity and add comments' },
  { title: 'React hook', lang: 'TypeScript', prompt: 'Create a custom React hook for fetching data with loading and error states' },
  { title: 'SQL query', lang: 'SQL', prompt: 'Write a SQL query to find the top 10 customers by total order value with joins' },
];

export default function CodePage() {
  const [prompt, setPrompt] = useState('');
  const [lang, setLang] = useState('TypeScript');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generate = async (customPrompt?: string, customLang?: string) => {
    const p = (customPrompt || prompt).trim();
    const l = customLang || lang;
    if (!p || loading) return;
    if (customPrompt) setPrompt(customPrompt);
    if (customLang) setLang(customLang);
    setLoading(true);
    setCode('');
    setError('');

    try {
      if (!API_KEY) throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set.');

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const fullPrompt = `Write clean, well-commented ${l} code for the following task:

"${p}"

Requirements:
- Use ${l} best practices
- Add brief inline comments explaining key logic
- Return ONLY the code block, no explanations outside the code
- Start with a comment line describing what the code does`;

      const result = await model.generateContent(fullPrompt);
      let raw = result.response.text().trim();

      // Strip markdown code fences if present
      raw = raw.replace(/^```[\w]*\n?/, '').replace(/```\s*$/, '').trim();
      setCode(raw);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{
          width: 44, height: 44, background: 'rgba(6,182,212,0.15)',
          borderRadius: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1.3rem',
        }}>💻</div>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Code Generation</h1>
          <p style={{ color: '#6b7280', fontSize: '0.82rem' }}>
            Powered by <span style={{ color: '#67e8f9' }}>Gemini 2.5 Flash</span>
          </p>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: 28, marginBottom: 24,
      }}>
        {/* Language selector */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: '#9ca3af', fontSize: '0.8rem', display: 'block', marginBottom: 10, fontWeight: 500 }}>
            Language
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '6px 14px', borderRadius: 8,
                  border: `1px solid ${lang === l ? '#06b6d4' : 'rgba(255,255,255,0.1)'}`,
                  background: lang === l ? 'rgba(6,182,212,0.12)' : 'transparent',
                  color: lang === l ? '#67e8f9' : '#6b7280',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                  transition: 'all 0.15s',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="chat-input"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); }}}
          placeholder={`Describe the ${lang} code you want to generate...`}
          style={{ marginBottom: 16 }}
        />

        <button
          className="btn-primary"
          onClick={() => generate()}
          disabled={!prompt.trim() || loading}
          style={{
            width: '100%', padding: '14px', fontSize: '1rem',
            background: 'linear-gradient(135deg,#0891b2,#06b6d4)',
          }}
        >
          {loading ? '⚡ Generating...' : '⚡ Generate Code'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 12, padding: '14px 18px', marginBottom: 20, color: '#fca5a5', fontSize: '0.875rem',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Code output */}
      {(loading || code) && (
        <div style={{
          background: '#0d1117',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, overflow: 'hidden',
        }}>
          {/* Terminal bar */}
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ color: '#6b7280', fontSize: '0.8rem', marginLeft: 8 }}>
                {lang} — Gemini 2.5 Flash
              </span>
            </div>
            {code && (
              <button
                onClick={copy}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: '6px 14px',
                  color: copied ? '#4ade80' : '#9ca3af',
                  cursor: 'pointer', fontSize: '0.8rem', transition: 'color 0.2s',
                }}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            )}
          </div>
          <pre style={{
            padding: 24, overflowX: 'auto',
            fontSize: '0.85rem', lineHeight: 1.8,
            color: loading ? '#374151' : '#e2e8f0',
            minHeight: 180, margin: 0,
          }}>
            {loading
              ? '// ⚡ Gemini is generating your code...\n// Please wait a moment...'
              : code}
          </pre>
        </div>
      )}

      {/* Examples */}
      {!code && !loading && (
        <div>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: 16 }}>Quick examples:</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {examples.map((ex) => (
              <button
                key={ex.title}
                onClick={() => generate(ex.prompt, ex.lang)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '16px 20px',
                  color: '#e5e7eb', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <p style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.875rem' }}>{ex.title}</p>
                <p style={{ color: '#6b7280', fontSize: '0.78rem', lineHeight: 1.4, marginBottom: 8 }}>
                  {ex.prompt}
                </p>
                <span style={{ color: '#06b6d4', fontSize: '0.75rem' }}>{ex.lang}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
