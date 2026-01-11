import { useState } from 'react';
import { authApi } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authApi.register({ name, email, password });
      navigate('/login', { replace: true });
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Start your journey</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Register
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account? <Link to="/login">Login</Link>
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
    background: 'linear-gradient(135deg, #141e30, #243b55)'
  },
  card: {
    width: 400,
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
    background: '#243b55',
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
