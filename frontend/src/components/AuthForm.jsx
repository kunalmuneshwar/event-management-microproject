const AuthForm = ({
  heading,
  submitText,
  includeName = false,
  onSubmit,
  formData,
  onChange,
  isSubmitting,
  error,
  footer,
}) => {
  return (
    <section className="auth-card">
      <h1>{heading}</h1>
      <form onSubmit={onSubmit} className="stack">
        {includeName ? (
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Your name"
              required
            />
          </label>
        ) : null}

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="At least 6 characters"
            minLength={6}
            required
          />
        </label>

        {error ? <p className="error-text">{error}</p> : null}

        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : submitText}
        </button>
      </form>
      <div className="muted-row">{footer}</div>
    </section>
  )
}

export default AuthForm
