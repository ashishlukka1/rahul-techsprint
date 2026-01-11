import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.title}>Design Your Future 🚀</h1>

          <p style={styles.quote}>
            “Success is not about luck. It’s about planning, consistency, and execution.”
          </p>

          <p style={styles.subquote}>
            Build a personalized career roadmap and track your growth step by step.
          </p>

          <div style={styles.buttonGroup}>
            <Link to="/login" style={{ ...styles.button, ...styles.login }}>
              Login
            </Link>

            <Link to="/register" style={{ ...styles.button, ...styles.register }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #141e30, #243b55)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    width: '100%',
    padding: '20px'
  },
  card: {
    maxWidth: '650px',
    margin: 'auto',
    padding: '50px 40px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '18px',
    boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.6rem',
    fontWeight: '800',
    marginBottom: '20px',
    color: '#243b55'
  },
  quote: {
    fontSize: '1.3rem',
    fontStyle: 'italic',
    color: '#333',
    marginBottom: '15px'
  },
  subquote: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '35px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  button: {
    padding: '14px 36px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  login: {
    background: '#243b55',
    color: '#fff'
  },
  register: {
    background: '#667eea',
    color: '#fff'
  }
};
