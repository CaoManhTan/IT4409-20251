import { useEffect, useState } from "react";
function SearchForm({ onSearch }) {
    const [studentID, setStudentId] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (studentID.trim().length > 0) {
            onSearch(studentID.trim());
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="studentId">Nhập mã số sinh viên: </label>
            <input
                type="text"
                id="studentId"
                placeholder="Nhập mssv"
                value={studentID}
                onChange={(e) => {
                    setStudentId(e.target.value)
                }}
            />
            <button type="submit">Tra cứu</button>
        </form>
    )
}

export default SearchForm