// src/components/ResultTable.jsx
import React from 'react';

function scoreToGrade(score) {
    if (score >= 9.5) return 'A+';
    if (score >= 8.5) return 'A';
    if (score >= 8.0) return 'B+';
    if (score >= 7.0) return 'B';
    if (score >= 6.5) return 'C+';
    if (score >= 5.5) return 'C';
    if (score >= 5.0) return 'D+';
    if (score >= 4.0) return 'D';
    return 'F';
}

const ResultTable = ({ studentName, results }) => {
    // Lấy tổng số tín chỉ và điểm trung bình tích lũy (giả định tính toán đơn giản)
    const totalCredits = results.reduce((sum, item) => sum + item.credits, 0);
    const totalWeightedScore = results.reduce((sum, item) => sum + item.score * item.credits, 0);
    const gpa = totalCredits > 0 ? (totalWeightedScore / totalCredits).toFixed(2) : 'N/A';

    return (
        <div style={{ marginTop: '20px' }}>
            <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '5px' }}>
                Kết quả học tập của {studentName}
            </h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px' }}>STT</th>
                        <th style={{ padding: '10px' }}>Mã HP</th>
                        <th style={{ padding: '10px' }}>Tên Học phần</th>
                        <th style={{ padding: '10px' }}>Số TC</th>
                        <th style={{ padding: '10px' }}>Điểm Thang 10</th>
                        <th style={{ padding: '10px' }}>Điểm Thang 4</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((item, index) => (
                        <tr key={item.cid} style={{ textAlign: 'center' }}>
                            <td style={{ padding: '10px' }}>{index + 1}</td>
                            <td style={{ padding: '10px' }}>{item.cid}</td>
                            <td style={{ padding: '10px', textAlign: 'left' }}>{item.name}</td>
                            <td style={{ padding: '10px' }}>{item.credits}</td>
                            <td style={{ padding: '10px' }}>{item.score}</td>
                            <td style={{ padding: '10px' }}>{scoreToGrade(item.score)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '15px', fontWeight: 'bold' }}>
                Điểm TBC Tích lũy : {gpa}
            </div>
        </div>
    );
};

export default ResultTable;