import { Link } from 'react-router-dom'

const LoginHubPage = () => {
  return (
    <div className="public-shell">
      <header className="public-header">
        <Link to="/" className="brand">
          EventSphere
        </Link>
        <nav className="public-nav">
          <Link to="/" className="top-link">
            Home
          </Link>
          <Link to="/login" className="top-link">
            Login
          </Link>
          <Link to="/admin/login" className="top-link">
            Admin Login
          </Link>
          <Link to="/user/login" className="top-link">
            User Login
          </Link>
        </nav>
      </header>

      <main className="landing-wrap">
        <section className="landing-card">
          <p className="eyebrow">Authentication Hub</p>
          <h1>Choose your sign in or registration flow.</h1>
          <p>
            Use the links below to login or register as an admin or as a user.
          </p>

          <div className="auth-hub-grid">
            <article className="hub-card">
              <h2>Admin</h2>
              <p>Manage events, review private requests, and control approvals.</p>
              <div className="row-actions">
                <Link to="/admin/login" className="primary-btn">
                  Admin Login
                </Link>
                <Link to="/admin/signup" className="ghost-btn">
                  Admin Register
                </Link>
              </div>
            </article>

            <article className="hub-card">
              <h2>User</h2>
              <p>Browse events, register quickly, and track your approval status.</p>
              <div className="row-actions">
                <Link to="/user/login" className="primary-btn alt-btn">
                  User Login
                </Link>
                <Link to="/user/signup" className="ghost-btn">
                  User Register
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LoginHubPage
