'use client';

import { useState } from 'react';

const amounts = [1, 2, 3, 4];
const resolutions = ['256x256', '512x512', '1024x1024'];
const styleOptions = ['Realistic', 'Anime', 'Oil Painting', 'Watercolor', 'Digital Art', 'Cinematic'];

const GRADIENTS = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#11998e,#38ef7d)',
  'linear-gradient(135deg,#0c3483,#a2b6df)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#fa709a,#fee140)',
  'linear-gradient(135deg,#a18cd1,#fbc2eb)',
  'linear-gradient(135deg,#fda085,#f6d365)',
];

const examples = [
  { prompt: 'A futuristic cityscape at sunset', gradient: GRADIENTS[0] },
  { prompt: 'A magical forest with glowing trees', gradient: GRADIENTS[1] },
  { prompt: 'An astronaut floating in space', gradient: GRADIENTS[2] },
  { prompt: 'A dragon made of crystal', gradient: GRADIENTS[3] },
];

type GeneratedImage = { prompt: string; gradient: string };

export default function ImagePage() {
  const [prompt, setPrompt] = useState('');
  const [amount, setAmount] = useState(1);
  const [resolution, setResolution] = useState('512x512');
  const [style, setStyle] = useState('Realistic');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<GeneratedImage[]>([]);

  const generate = async (customPrompt?: string) => {
    const p = (customPrompt || prompt).trim();
    if (!p || loading) return;
    if (customPrompt) setPrompt(customPrompt);
    setLoading(true);
    setGenerated([]);

    await new Promise((r) => setTimeout(r, 2000));

    const images: GeneratedImage[] = Array.from({ length: amount }, (_, i) => ({
      prompt: p,
      gradient: GRADIENTS[i % GRADIENTS.length],
    }));
    setGenerated(images);
    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{
          width: 44, height: 44, background: 'rgba(139,92,246,0.15)',
          borderRadius: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1.3rem'
        }}>🖼️</div>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Image Generation</h1>
          <p style={{ color: '#6b7280', fontSize: '0.82rem' }}>Turn your imagination into stunning visuals</p>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: 28, marginBottom: 28
      }}>
        <textarea
          className="chat-input"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A stunning sunset over the ocean with dramatic clouds..."
          style={{ marginBottom: 20 }}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 16, marginBottom: 20
        }}>
          {/* Amount */}
          <div>
            <label style={{ color: '#9ca3af', fontSize: '0.8rem', display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Number of images
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {amounts.map((n) => (
                <button
                  key={n}
                  onClick={() => setAmount(n)}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    border: `1px solid ${amount === n ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                    background: amount === n ? 'rgba(139,92,246,0.15)' : 'transparent',
                    color: amount === n ? '#c4b5fd' : '#6b7280',
                    fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem'
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution */}
          <div>
            <label style={{ color: '#9ca3af', fontSize: '0.8rem', display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Resolution
            </label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '10px 14px',
                color: '#e5e7eb', fontSize: '0.875rem', width: '100%', outline: 'none'
              }}
            >
              {resolutions.map((r) => (
                <option key={r} value={r} style={{ background: '#1f2937' }}>{r}</option>
              ))}
            </select>
          </div>

          {/* Style */}
          <div>
            <label style={{ color: '#9ca3af', fontSize: '0.8rem', display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '10px 14px',
                color: '#e5e7eb', fontSize: '0.875rem', width: '100%', outline: 'none'
              }}
            >
              {styleOptions.map((s) => (
                <option key={s} value={s} style={{ background: '#1f2937' }}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={() => generate()}
          disabled={!prompt.trim() || loading}
          style={{ width: '100%', padding: '14px', fontSize: '1rem', background: 'linear-gradient(135deg,#7c3aed,#8b5cf6)' }}
        >
          {loading ? '✨ Generating...' : '✨ Generate Images'}
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {Array.from({ length: amount }).map((_, i) => (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '2rem', marginBottom: 8, display: 'inline-block', animation: 'spin 2s linear infinite' }}>✨</div>
                <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
                <p style={{ fontSize: '0.8rem' }}>Generating...</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {generated.length > 0 && !loading && (
        <div>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: 16 }}>
            Generated {generated.length} image{generated.length > 1 ? 's' : ''} · {resolution} · {style}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {generated.map((img, i) => (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: 16, background: img.gradient,
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 16, cursor: 'pointer',
                transition: 'transform 0.2s',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.4 }}>
                  {img.prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      {generated.length === 0 && !loading && (
        <div>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: 16 }}>Try these examples:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {examples.map((img) => (
              <button
                key={img.prompt}
                onClick={() => generate(img.prompt)}
                style={{
                  aspectRatio: '1', borderRadius: 16, background: img.gradient,
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
                }}
              >
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', textAlign: 'center', lineHeight: 1.4 }}>
                  {img.prompt}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
