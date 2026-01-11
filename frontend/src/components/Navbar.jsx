import LogoutButton from './LogoutButton';

export default function Navbar() {
  return (
    <div style={styles.nav}>
      <h3 style={styles.logo}>Career Roadmap 🚀</h3>
      <LogoutButton />
    </div>
  );
}

const styles = {
  nav: {
    width: '100%',
    padding: '16px 30px',
    background: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logo: {
    margin: 0,
    fontWeight: 700,
    color: '#243b55'
  }
};
