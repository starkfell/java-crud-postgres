import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    description: '',
    location: ''
  });

  // State for the list of entries
  const [entries, setEntries] = useState([]);

  // API URL - In production/Azure, this would be an environment variable
  const API_URL = "http://localhost:8080/api/entries";

  // Dark mode state
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(saved === 'true');
  }, []);
  
  // 1. Load entries on page load
  useEffect(() => {
    fetchEntries();
  }, []);

  // 2. Function to fetch entries (used for Load, Refresh, and List buttons)
  const fetchEntries = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch entries. Is the backend running?");
    }
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Clear form and refresh list
        setFormData({ firstName: '', lastName: '', description: '', location: '' });
        fetchEntries();
      }
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchEntries(); // Refresh list after deletion
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDarkMode = () => {
    setDarkMode((d) => {
      localStorage.setItem('darkMode', String(!d));
      return !d;
    });
  };

  // width used for lastName, description and location (keeps them aligned)
  const secondaryWidth = '300px';
  const gap = 10; // px gap between the two fields
  const containerWidth = `${parseInt(secondaryWidth, 10) * 2 + gap}px`; // combined width for description/location

  const theme = {
    background: darkMode ? '#1e1e1e' : '#ffffff',
    text: darkMode ? '#e6e6e6' : '#111111',
    panel: darkMode ? '#2a2a2a' : '#ffffff',
    border: darkMode ? '#3a3a3a' : '#ddd',
    muted: darkMode ? '#8a8a8a' : '#666'
  };

  const inputBase = {
    padding: '8px',
    borderRadius: '4px',
    border: `1px solid ${theme.border}`,
    background: theme.panel,
    color: theme.text
  };

  // button color variables
  const listBg = '#0e54ebff';
  const listHover = '#0a4bd6ff';
  const submitBg = '#28a745';
  const submitHover = '#218838';
  const deleteBg = '#dc3545';
  const deleteHover = '#c82333';

  return (
    <div className="app-root" style={{ background: theme.background, color: theme.text,
                  ['--btn-submit-bg']: submitBg,
                  ['--btn-submit-hover']: submitHover,
                  ['--btn-delete-bg']: deleteBg,
                  ['--btn-delete-hover']: deleteHover,
                  ['--theme-text']: theme.text,
                  ['--theme-border']: theme.border,
                  ['--theme-panel']: theme.panel,
                  ['--secondary-hover-bg']: (darkMode ? '#333' : '#f0f0f0'),
                  ['--secondary-width']: secondaryWidth, 
                  ['--gap']: `${gap}px`,
                  ['--container-width']: containerWidth,
                  ['--table-header-bg']: (darkMode ? '#2b2b2b' : '#f4f4f4') }}>
      <div className="app-header">
        <h1 className="title">User Entry Portal</h1>
        <button onClick={toggleDarkMode} className="toggle-btn">{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>

      {/* --- FORM SECTION --- */}
      <section className="form-section">
        <h3>Add New Entry</h3>
        <form onSubmit={handleSubmit} className="entry-form">
          <div className="row">
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="text-input text-input--secondary" />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="text-input text-input--secondary" />
          </div>

          {/* Description below and same combined width as both fields */}
          <div style={{ marginBottom: '10px' }}>
            <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="text-input text-input--full" />
          </div>

          {/* Location below and same combined width as both fields */}
          <div style={{ marginBottom: '10px' }}>
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="text-input text-input--full" />
          </div>
          <button type="submit" className="btn btn-submit">
            Submit
          </button>
        </form>
      </section>

      {/* --- LIST ACTIONS --- */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={fetchEntries} className="btn btn-secondary mr-10">Refresh Entries</button>
        <button onClick={fetchEntries} className="btn btn-secondary">List Existing Entries</button>
      </div>

      {/* --- DATA TABLE --- */}
      <table border="1" cellPadding="10" className="data-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{entry.description}</td>
                <td>{entry.location}</td>
                <td>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No entries found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;