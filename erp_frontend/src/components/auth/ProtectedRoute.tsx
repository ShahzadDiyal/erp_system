// src/components/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';

interface ProtectedRouteProps {
  children: React.ReactNode; // Change JSX.Element to React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAppSelector((state: RootState) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}