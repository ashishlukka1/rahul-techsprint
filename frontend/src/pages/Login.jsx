import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authApi.login({ email, password });
      navigate('/app', { replace: true });
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
  },
  card: {
    width: 380,
    padding: 30,
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
    textAlign: 'center'
  },
  title: {
    marginBottom: 5
  },
  subtitle: {
    marginBottom: 20,
    color: '#666'
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 14
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    border: 'none',
    background: '#2c5364',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginBottom: 10
  },
  footer: {
    marginTop: 15,
    fontSize: 14
  }
};
