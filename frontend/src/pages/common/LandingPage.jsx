import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <main className="landing-wrap">
      <section className="landing-card">
        <p className="eyebrow">MERN Event Management</p>
        <h1>Run open and approval-based events from one hub.</h1>
        <p>
          Admins create and manage events, while users discover events and register in
          seconds.
        </p>
        <div className="landing-actions">
          <Link to="/admin/login" className="primary-btn">
            Admin Login
          </Link>
          <Link to="/admin/signup" className="ghost-btn">
            Admin Signup
          </Link>
          <Link to="/user/login" className="primary-btn alt-btn">
            User Login
          </Link>
          <Link to="/user/signup" className="ghost-btn">
            User Signup
          </Link>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
