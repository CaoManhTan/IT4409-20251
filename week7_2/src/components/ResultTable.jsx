import React from "react";
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
function ResultTable({ results }) {
    return (
        <div>
            <table border={'1'} style={{ borderCollapse: 'collapse', border: 'solid grey' }}>
                <thead>
                    <th>STT</th>
                    <th>Ma HP</th>
                    <th>Ten HP</th>
                    <th>So TC</th>
                    <th>Diem thang 10</th>
                    <th>Diem thang 4</th>
                </thead>
                <tbody>
                    {results.map((item, index) => (
                        <tr key={item.cid}>
                            <td>{index + 1}</td>
                            <td>{item.cid}</td>
                            <td>{item.name}</td>
                            <td>{item.credits}</td>
                            <td>{item.score}</td>
                            <td>{scoreToGrade(item.score)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            This is ResultTable !
        </div>
    )
}

export default ResultTable