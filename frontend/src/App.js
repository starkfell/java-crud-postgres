import React, { useState, useEffect } from 'react';

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

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>User Entry Portal</h1>

      {/* --- FORM SECTION --- */}
      <section style={{ marginBottom: '40px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <h3>Add New Entry</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={{ marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required style={{ width: '300px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
          </div>
          <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      </section>

      {/* --- LIST ACTIONS --- */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={fetchEntries} style={{ marginRight: '10px' }}>Refresh Entries</button>
        <button onClick={fetchEntries}>List Existing Entries</button>
      </div>

      {/* --- DATA TABLE --- */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
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
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
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