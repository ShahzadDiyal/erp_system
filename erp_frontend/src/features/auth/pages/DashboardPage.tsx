import { useAppSelector } from '../../../app/hooks';

export default function DashboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);

  return (
    <div>
      <h2>Dashboard</h2>

      {user ? (
        <div>
          <p><b>User:</b> {user.name}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Token:</b> {token}</p>
        </div>
      ) : (
        <p>Not logged in. Go to Login.</p>
      )}
    </div>
  );
}
