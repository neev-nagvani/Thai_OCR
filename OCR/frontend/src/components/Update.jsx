import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Update = ({ id, setUpdateId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(() => {
    setLoading(true);
    axios.get(`/card/cards/${id}`).then((res) => {
      setLoading(false);
      setData(res.data);
    });
  }, [id]);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fetch]);

  const handleSubmit = () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    axios.post(`/card/cards/${id}`, data, config).then(() => setUpdateId(null));
  };

  if (loading || !data) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={() => setUpdateId(null)}>
        Back to List
      </button>
      <div style={styles.inputContainer}>
        <label>"Identification Number":</label>
        <input
          type="text"
          value={data.identification_number}
          onChange={(e) => handleInputChange('identification_number', e.target.value)}
        />
      </div>
      <div style={styles.inputContainer}>
        <label>"Name":</label>
        <input type="text" value={data.name} onChange={(e) => handleInputChange('name', e.target.value)} />
      </div>
      <div style={styles.inputContainer}>
        <label>"Last Name":</label>
        <input type="text" value={data.last_name} onChange={(e) => handleInputChange('last_name', e.target.value)} />
      </div>
      <div style={styles.inputContainer}>
        <label>"Date of Birth":</label>
        <input type="text" value={data.date_of_birth} onChange={(e) => handleInputChange('date_of_birth', e.target.value)} />
      </div>
      <div style={styles.inputContainer}>
        <label>"Date of Issue":</label>
        <input type="text" value={data.date_of_issue} onChange={(e) => handleInputChange('date_of_issue', e.target.value)} />
      </div>
      <div style={styles.inputContainer}>
        <label>"Date of Expiry":</label>
        <input type="text" value={data.date_of_expiry} onChange={(e) => handleInputChange('date_of_expiry', e.target.value)} />
      </div>

      <button style={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );

  function handleInputChange(field, value) {
    let newData = { ...data };
    newData[field] = value;
    setData(newData);
  }
};

const styles = {
  container: {
    color: 'whitesmoke',
    padding: '20px',
    margin: '20px',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    cursor: 'pointer',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  submitButton: {
    cursor: 'pointer',
    borderRadius: '10px',
    padding: '10px',
    marginTop: '20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
  },
};

export default Update;
