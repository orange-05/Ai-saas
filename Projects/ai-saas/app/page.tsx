'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const words = ['Conversation', 'Code Generation', 'Image Generation', 'Music Generation', 'Video Generation'];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Software Engineer', avatar: 'SJ', text: 'Gbot has completely transformed how I write code. The AI suggestions are incredibly accurate.' },
  { name: 'Michael Chen', role: 'UI/UX Designer', avatar: 'MC', text: 'The image generation feature is mind-blowing. I create stunning visuals in seconds.' },
  { name: 'Emily Rodriguez', role: 'Content Creator', avatar: 'ER', text: 'I use Gbot daily for my content. The conversation AI understands context perfectly.' },
  { name: 'David Kim', role: 'Product Manager', avatar: 'DK', text: 'From code reviews to brainstorming, Gbot covers everything my team needs.' },
  { name: 'Lisa Thompson', role: 'Freelance Writer', avatar: 'LT', text: 'My productivity tripled since using Gbot. It feels like having a genius co-pilot.' },
];

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .hero-bg {
          background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.08) 0%, transparent 50%),
                      #111827;
        }
        .typewriter {
          transition: opacity 0.4s, transform 0.4s;
          opacity: ${fade ? 1 : 0};
          transform: ${fade ? 'translateY(0)' : 'translateY(-8px)'};
          display: inline-block;
        }
        .nav-cta {
          background: #fff;
          color: #111827;
          padding: 10px 22px;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .nav-cta:hover { background: #f3f4f6; transform: scale(1.03); }
        .feature-icon-wrap {
          width: 60px; height: 60px; border-radius: 18px;
          display: flex; align-items: center; justify-content: center; font-size: 1.75rem;
          margin-bottom: 20px;
        }
        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px; padding: 36px;
          transition: all 0.3s;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(99,102,241,0.3);
          transform: translateY(-4px);
        }
        .testimonial-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 28px;
          transition: all 0.3s;
        }
        .testimonial-card:hover { border-color: rgba(99,102,241,0.25); }
        .avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .pricing-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px; padding: 40px;
          position: relative; transition: all 0.3s;
        }
        .pricing-card.popular {
          border: 2px solid rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.05);
        }
        .popular-tag {
          position: absolute; top: -1px; right: 24px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          font-size: 0.65rem; font-weight: 700; padding: 4px 16px;
          border-radius: 0 0 12px 12px; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .check-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.875rem; color: #d1d5db; margin-bottom: 12px;
        }
        footer { border-top: 1px solid rgba(255,255,255,0.08); }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(17,24,39,0.8)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#fff' }}>
          <div style={{
            width: 32, height: 32, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700
          }}>G</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Gbot</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="#features" style={{ color: '#9ca3af', textDecoration: 'none', padding: '8px 16px', fontSize: '0.875rem', borderRadius: 10, transition: 'color 0.2s' }}>Features</a>
          <a href="#pricing" style={{ color: '#9ca3af', textDecoration: 'none', padding: '8px 16px', fontSize: '0.875rem', borderRadius: 10, transition: 'color 0.2s' }}>Pricing</a>
          <Link href="/dashboard" className="nav-cta">Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 64px', textAlign: 'center', width: '100%' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
            padding: '8px 20px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 500, color: '#a5b4fc', marginBottom: 32
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
            AI-Powered Content Generation Platform
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
            The AI Tool for<br />
            <span className="gradient-text typewriter">{words[wordIndex]}</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem,2.5vw,1.2rem)', color: '#9ca3af', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Create content 10x faster with the most powerful AI platform. Generate conversations, code, images, music, and videos instantly.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
              Start For Free →
            </Link>
            <a href="#features" className="btn-ghost" style={{ padding: '16px 36px', fontSize: '1rem' }}>
              See How It Works
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', color: '#6b7280', fontSize: '0.85rem' }}>
            {['No Credit Card Required', '5 Free Generations', 'Cancel Anytime'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#34d399', fontWeight: 700 }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '96px 24px', background: '#0f172a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 12 }}>Everything You Need</h2>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>Five powerful AI tools, one platform.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              { icon: '💬', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', title: 'Conversation', desc: 'Chat with the smartest AI. Ask anything, get intelligent answers instantly.' },
              { icon: '🖼️', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', title: 'Image Generation', desc: 'Transform text into stunning visuals with our AI image generation engine.' },
              { icon: '💻', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', title: 'Code Generation', desc: 'Generate clean, efficient code in any programming language in seconds.' },
              { icon: '🎵', color: '#10b981', bg: 'rgba(16,185,129,0.1)', title: 'Music Generation', desc: 'Create unique music tracks and audio compositions with AI.' },
              { icon: '🎬', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', title: 'Video Generation', desc: 'Generate engaging video content and animations powered by AI.' },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon-wrap" style={{ background: f.bg }}>
                  <span>{f.icon}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 10, color: '#f9fafb' }}>{f.title}</h3>
                <p style={{ color: '#6b7280', lineHeight: 1.6, fontSize: '0.9rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '96px 24px', background: '#111827' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 12 }}>Loved by Creators</h2>
            <p style={{ color: '#6b7280' }}>Join thousands of professionals using Gbot every day.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <p style={{ color: '#d1d5db', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="avatar">{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '96px 24px', background: '#0f172a' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 12 }}>Simple Pricing</h2>
            <p style={{ color: '#6b7280' }}>Start free. Upgrade when you need more.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              {
                name: 'Free', price: '$0', period: 'forever', popular: false,
                features: ['5 AI Conversations', '5 Image Generations', '5 Code Completions', 'Basic Support'],
                cta: 'Get Started Free', ctaStyle: 'btn-ghost'
              },
              {
                name: 'Pro', price: '$20', period: '/month', popular: true,
                features: ['Unlimited Conversations', 'Unlimited Image Generation', 'Unlimited Code Generation', 'Music & Video Generation', 'Priority Support', 'API Access'],
                cta: 'Start Pro Trial', ctaStyle: 'btn-primary'
              },
            ].map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-tag">MOST POPULAR</div>}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
                <div style={{ marginTop: 20, marginBottom: 4 }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{plan.period}</span>
                </div>
                <div style={{ marginBottom: 28, marginTop: 24 }}>
                  {plan.features.map(f => (
                    <div key={f} className="check-item">
                      <span style={{ color: '#34d399', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className={plan.ctaStyle} style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '48px 24px', textAlign: 'center', background: '#111827' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>G</div>
          <span style={{ fontWeight: 700 }}>Gbot</span>
        </div>
        <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>© 2026 Gbot. All rights reserved. Powered by AI.</p>
      </footer>
    </>
  );
}
