import { Outlet, Link } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <strong>ERP</strong>
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
      </header>

      <hr style={{ margin: '12px 0' }} />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
