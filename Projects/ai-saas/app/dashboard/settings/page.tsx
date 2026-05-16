import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>Settings</h1>
      <p style={{ color: '#6b7280', marginBottom: 36 }}>Manage your account and subscription.</p>

      {/* Current Plan */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28, marginBottom: 20 }}>
        <h2 style={{ fontWeight: 700, marginBottom: 20 }}>Current Plan</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>Free Plan</p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>5 generations remaining this month</p>
          </div>
          <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '6px 16px', color: '#a5b4fc', fontSize: '0.8rem', fontWeight: 600 }}>
            FREE
          </div>
        </div>
        <div style={{ margin: '20px 0', background: 'rgba(255,255,255,0.06)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
          <div style={{ width: '0%', height: '100%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 8 }} />
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>0 of 5 generations used</p>
      </div>

      {/* Pro Plan */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08))',
        border: '2px solid rgba(99,102,241,0.3)', borderRadius: 20, padding: 28, marginBottom: 20
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 4 }}>✨ Pro Plan</p>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: 16 }}>Everything you need to create without limits</p>
            {[
              'Unlimited Conversations',
              'Unlimited Image Generation',
              'Unlimited Code Generation',
              'Music & Video Generation',
              'Priority Support',
              'API Access'
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#34d399' }}>✓</span>
                <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em' }}>$20</p>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: 16 }}>/month</p>
            <button className="btn-primary" style={{ padding: '12px 28px' }}>
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* Account */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28 }}>
        <h2 style={{ fontWeight: 700, marginBottom: 20 }}>Account</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <p style={{ fontWeight: 500, marginBottom: 2 }}>Email</p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>user@example.com</p>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 16px', color: '#9ca3af', cursor: 'pointer', fontSize: '0.8rem' }}>
            Change
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div>
            <p style={{ fontWeight: 500, marginBottom: 2 }}>Password</p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Last changed 30 days ago</p>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 16px', color: '#9ca3af', cursor: 'pointer', fontSize: '0.8rem' }}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
}
