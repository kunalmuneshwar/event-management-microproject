const EventForm = ({ formData, onChange, onSubmit, onCancel, submitText, isBusy }) => {
  return (
    <form className="event-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Event Name</span>
        <input
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Hackathon 2026"
          required
        />
      </label>

      <label className="field">
        <span>Short Description</span>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={onChange}
          rows={3}
          placeholder="One-line to short summary"
          required
        />
      </label>

      <label className="field">
        <span>Date</span>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={onChange}
          required
        />
      </label>

      <label className="field">
        <span>Tags (comma separated)</span>
        <input
          name="tags"
          value={formData.tags}
          onChange={onChange}
          placeholder="tech, campus, networking"
        />
      </label>

      <label className="field">
        <span>Visibility</span>
        <select name="visibility" value={formData.visibility} onChange={onChange}>
          <option value="open">Open</option>
          <option value="private">Private</option>
        </select>
      </label>

      <div className="row-actions">
        <button className="primary-btn" type="submit" disabled={isBusy}>
          {isBusy ? 'Saving...' : submitText}
        </button>
        {onCancel ? (
          <button type="button" className="ghost-btn" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default EventForm
