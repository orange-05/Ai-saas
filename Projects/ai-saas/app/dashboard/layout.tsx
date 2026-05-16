import Sidebar from './_components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111827' }}>
      <Sidebar />

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{
          padding: '16px 32px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          background: '#111827',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>
              <span style={{ color: '#4ade80' }}>●</span>&nbsp; 5 free generations left
            </div>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
              color: '#fff',
            }}>U</div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
