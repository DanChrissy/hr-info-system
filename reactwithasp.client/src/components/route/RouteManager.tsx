import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { decodeToken, isTokenValid } from '@/lib/token';
import { DecodedToken } from '@/modules/token';
import { Role } from '@/modules/employee';

const RouteManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decodedToken = decodeToken(token!) as DecodedToken;

    if (decodedToken) {
      if (!isTokenValid(token!)) {
        navigate('/auth/login');
      } else {
        if (decodedToken.role === Role.Employee) {
          if (location.pathname !== `/employees/${decodedToken.id}`) {
            navigate(`/employees/${decodedToken.id}`);
          }
        }
      }
    } else {
      navigate('/auth/login');
    }
  }, [navigate, location, id]);

  return null;
};

export default RouteManager;
