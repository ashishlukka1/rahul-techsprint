import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout();
    navigate('/login', { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 600
      }}
    >
      Logout
    </button>
  );
}
