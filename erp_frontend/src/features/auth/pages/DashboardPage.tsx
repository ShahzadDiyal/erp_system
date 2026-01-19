// src/features/auth/pages/DashboardPage.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  // const token = useSelector((state: RootState) => state.auth.token);

  return (
    <div>
      <h2>Dashboard</h2>

      {user ? (
        <div>
          <p><b>User:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Roles:</b> {user.roles?.join(', ') || 'None'}</p>
          {user.isSuperAdmin && <p><b>Status:</b> Super Administrator</p>}
        </div>
      ) : (
        <p>Not logged in. Go to Login.</p>
      )}
    </div>
  );
}