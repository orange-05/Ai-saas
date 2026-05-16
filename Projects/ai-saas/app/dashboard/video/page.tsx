import Link from 'next/link';

export default function VideoPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', paddingTop: 60 }}>
      <div style={{ fontSize: '4rem', marginBottom: 24 }}>🎬</div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>Video Generation</h1>
      <p style={{ color: '#6b7280', marginBottom: 32, lineHeight: 1.7 }}>
        Generate compelling video content and animations from text prompts.<br/>
        This feature is available on the <strong style={{ color: '#f59e0b' }}>Pro plan</strong>.
      </p>
      <div style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.1))',
        border: '1px solid rgba(245,158,11,0.2)', borderRadius: 20, padding: 32, marginBottom: 32
      }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>🚀 Upgrade to Pro</p>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: 20 }}>Get access to Video & Music generation plus unlimited usage of all AI tools.</p>
        <Link href="/dashboard/settings" className="btn-primary" style={{ display: 'inline-flex', padding: '12px 32px' }}>
          Upgrade Now — $20/month
        </Link>
      </div>
      <Link href="/dashboard" style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none' }}>
        ← Back to Dashboard
      </Link>
    </div>
  );
}
