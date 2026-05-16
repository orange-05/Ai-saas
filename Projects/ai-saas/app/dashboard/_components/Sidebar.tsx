'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tools = [
  { href: '/dashboard', icon: '🏠', label: 'Dashboard', exact: true },
  { href: '/dashboard/conversation', icon: '💬', label: 'Conversation' },
  { href: '/dashboard/image', icon: '🖼️', label: 'Image Generation' },
  { href: '/dashboard/code', icon: '💻', label: 'Code Generation' },
  { href: '/dashboard/music', icon: '🎵', label: 'Music Generation', pro: true },
  { href: '/dashboard/video', icon: '🎬', label: 'Video Generation', pro: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 260,
      flexShrink: 0,
      background: '#0f172a',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#fff' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 11,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '1.1rem', color: '#fff',
          }}>G</div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Gbot</span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <p style={{
          color: '#374151', fontSize: '0.7rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          padding: '0 8px', marginBottom: 8,
        }}>
          Tools
        </p>

        {tools.map((tool) => {
          const isActive = tool.exact
            ? pathname === tool.href || pathname === tool.href + '/'
            : pathname.startsWith(tool.href);
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={`sidebar-link${isActive ? ' active' : ''}`}
            >
              <span style={{ fontSize: '1.1rem' }}>{tool.icon}</span>
              <span style={{ flex: 1 }}>{tool.label}</span>
              {tool.pro && (
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700,
                  background: 'linear-gradient(135deg,#f59e0b,#ef4444)',
                  color: '#fff', padding: '2px 6px', borderRadius: 6,
                  letterSpacing: '0.05em',
                }}>PRO</span>
              )}
            </Link>
          );
        })}

        <div style={{ marginTop: 24 }}>
          <p style={{
            color: '#374151', fontSize: '0.7rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '0 8px', marginBottom: 8,
          }}>
            Settings
          </p>
          <Link
            href="/dashboard/settings"
            className={`sidebar-link${pathname === '/dashboard/settings' || pathname === '/dashboard/settings/' ? ' active' : ''}`}
          >
            <span>⚙️</span> Settings
          </Link>
        </div>
      </nav>

      {/* Upgrade box */}
      <div style={{ padding: '16px 12px' }}>
        <div className="upgrade-box">
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>🚀 Upgrade to Pro</p>
          <p style={{ color: '#9ca3af', fontSize: '0.78rem', marginBottom: 12, lineHeight: 1.5 }}>
            Unlock unlimited generations & all AI tools.
          </p>
          <Link
            href="/dashboard/settings"
            className="btn-primary"
            style={{ width: '100%', display: 'block', textAlign: 'center', padding: '10px 16px', fontSize: '0.85rem' }}
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </aside>
  );
}
