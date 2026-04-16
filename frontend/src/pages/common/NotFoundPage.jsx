import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="center-state">
      <h1>404</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="text-link">
        Back to home
      </Link>
    </main>
  )
}

export default NotFoundPage
