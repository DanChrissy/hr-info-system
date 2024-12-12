import { isTokenValid } from '@/lib/token';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    if (!isTokenValid(token!)) {
        navigate('/auth/login');
    }

    return children;
};
