import React, { useState, useEffect } from "react";
import axios from "axios";
import Update from "../components/Update.jsx";

const List = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [text, setText] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = () => {
    setLoading(true);
    axios.get("/card/cards").then((res) => {
      setLoading(false);
      setData(res.data);
    });
  };

  useEffect(() => {
    fetch();
  }, [updateId]);

  useEffect(() => {
    if (text) {
      let newArr = data.filter(
        (d) =>
          d.name.toLowerCase().includes(text.toLowerCase()) ||
          d.last_name.toLowerCase().includes(text.toLowerCase()) ||
          d.identification_number.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(newArr);
    } else {
      setFiltered(data);
    }
  }, [data, text]);

  const handleDelete = (id) => {
    axios.delete(`/card/cards/${id}`).then(() => fetch());
  };

  if (loading) return <div>Loading...</div>;

  if (updateId) {
    return <Update id={updateId} setUpdateId={setUpdateId} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.filterContainer}>
        <label style={styles.filterLabel} htmlFor="text">
          Filter
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.filterInput}
        />
      </div>
      {filtered.map((d) => (
        <div key={d._id} style={styles.cardContainer}>
          <div style={styles.cardContent}>
            {`{`}
            "identification_number": "{d.identification_number}", "name": "
            {d.name}", "last_name": "{d.last_name}", "date-of-birth": "
            {d.date_of_birth}", "date-of-issue": "{d.date_of_issue}",
            "date-of-expiry": "{d.date_of_expiry}"{`}`}
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.deleteButton} onClick={() => handleDelete(d._id)}>
              Delete
            </button>
            <button style={styles.updateButton} onClick={() => setUpdateId(d._id)}>
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    margin: '10px',
  },
  filterContainer: {
    display: "flex",
    alignItems: 'center',
    padding: '10px',
  },
  filterLabel: {
    margin: '10px',
    color: "whitesmoke",
  },
  filterInput: {
    marginLeft: '10px',
  },
  cardContainer: {
    color: "whitesmoke",
    margin: "10px",
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
  },
  cardContent: {
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    cursor: 'pointer',
    paddingInline: '10px',
    marginInline: '5px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  updateButton: {
    cursor: 'pointer',
    paddingInline: '10px',
    marginInline: '5px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
};

export default List;
