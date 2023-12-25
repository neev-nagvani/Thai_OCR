import React, { useState } from 'react';
import axios from 'axios';

const Ocr = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      const res = await axios.post('/upload', formData);
      setResponse(res.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Optical Character Recognition Application</h1>
      </div>

      <div style={styles.uploader}>
        <div style={styles.uploadForm}>
          <input type="file" name="image" id="image" onChange={(e) => setFile(e.target.files[0])} />
          <button style={styles.uploadButton} onClick={handleSubmit}>
            Upload
          </button>
        </div>
      </div>

      {response && (
        <div style={styles.responseContainer}>
          {`{
            "identification_number": "${response.identification_number}",
            "name": "${response.name}",
            "last_name": "${response.last_name}",
            "date-of-birth": "${response.date_of_birth}",
            "date-of-issue": "${response.date_of_issue}",
            "date-of-expiry": "${response.date_of_expiry}"
          }`}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    color: 'whitesmoke',
    margin: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  uploader: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  uploadForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  uploadButton: {
    cursor: 'pointer',
    borderRadius: '10px',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
  },
  responseContainer: {
    margin: '20px',
    textAlign: 'center',
    display: 'block',
  },
};

export default Ocr;
