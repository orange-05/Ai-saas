import Link from 'next/link';

const tools = [
  { href: '/dashboard/conversation', icon: '💬', label: 'Conversation', desc: 'Chat with the most advanced AI', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  { href: '/dashboard/image', icon: '🖼️', label: 'Image Generation', desc: 'Turn your prompt into stunning art', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { href: '/dashboard/code', icon: '💻', label: 'Code Generation', desc: 'Generate code in any language', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  { href: '/dashboard/music', icon: '🎵', label: 'Music Generation', desc: 'Create original music tracks', color: '#10b981', bg: 'rgba(16,185,129,0.1)', pro: true },
  { href: '/dashboard/video', icon: '🎬', label: 'Video Generation', desc: 'Generate compelling video content', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', pro: true },
];

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      {/* Free counter warning */}
      <div style={{
        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 14, padding: '14px 20px', marginBottom: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>⚠️</span>
          <span style={{ color: '#fca5a5', fontSize: '0.875rem' }}>
            <strong>5 free generations remaining.</strong> Upgrade to Pro for unlimited access.
          </span>
        </div>
        <Link href="/dashboard/settings" style={{
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
          padding: '8px 20px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none'
        }}>
          Upgrade
        </Link>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>
          Welcome to Gbot 👋
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
          Which AI tool would you like to use today?
        </p>
      </div>

      {/* Tools Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="tool-card" style={{ position: 'relative' }}>
            {tool.pro && (
              <span style={{
                position: 'absolute', top: 16, right: 16,
                fontSize: '0.6rem', fontWeight: 700, background: 'linear-gradient(135deg,#f59e0b,#ef4444)',
                color: '#fff', padding: '2px 8px', borderRadius: 6, letterSpacing: '0.05em'
              }}>PRO</span>
            )}
            <div style={{
              width: 52, height: 52, borderRadius: 16, background: tool.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0
            }}>
              {tool.icon}
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 4, color: '#f9fafb' }}>{tool.label}</p>
              <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.5 }}>{tool.desc}</p>
            </div>
            <div style={{ marginLeft: 'auto', color: '#374151', fontSize: '1.2rem' }}>→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
