// src/components/SearchForm.jsx
import React from 'react';

const SearchForm = ({ studentId, setStudentId, onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(studentId);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <label htmlFor="studentIdInput" style={{ marginRight: '10px' }}>
                Mã số Sinh viên:
            </label>
            <input
                id="studentIdInput"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="VD: 20220000"
                required
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button
                onClick={handleSubmit}
                type="submit"
                style={{ marginLeft: '10px', padding: '8px 15px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
            >
                Tra cứu
            </button>
        </div>
    );
};

export default SearchForm;