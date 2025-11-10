// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import ResultTable from './components/ResultTable';

const App = () => {
    // 1. useState: Quản lý toàn bộ State của ứng dụng
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [results, setResults] = useState(null); // Lưu kết quả (null, array of results)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Lưu thông báo lỗi

    // Hàm mô phỏng việc tải dữ liệu (sử dụng async/await)
    const fetchData = async () => {
        try {
            const [resSV, resHP, resKQ] = await Promise.all([
                fetch('/sinhvien.json'),
                fetch('/hocphan.json'),
                fetch('/ketqua.json'),
            ]);

            const [svData, hpData, kqData] = await Promise.all([
                resSV.json(),
                resHP.json(),
                resKQ.json(),
            ]);

            return { svData, hpData, kqData };
        } catch (e) {
            console.error("Lỗi khi tải dữ liệu:", e);
            throw new Error("Không thể tải dữ liệu gốc từ server.");
        }
    };

    const handleSearch = useCallback(async (id) => {
        // Xóa kết quả/lỗi cũ, đặt trạng thái loading
        setResults(null);
        setError(null);
        if (!id) return;

        setIsLoading(true);

        try {
            // 1. Tải dữ liệu gốc (hoặc tải một lần và cache nếu muốn tối ưu hơn)
            const { svData, hpData, kqData } = await fetchData();

            // 2. Giả lập độ trễ khi gọi API (2 giây)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 3. Xử lý logic tìm kiếm
            const student = svData.find(s => s.sid.toUpperCase() === id.toUpperCase());

            if (!student) {
                throw new Error(`Không tìm thấy sinh viên có mã số: ${id}`);
            }

            setStudentName(student.name);

            const studentResults = kqData
                .filter(kq => kq.sid.toUpperCase() === id.toUpperCase())
                .map(kq => {
                    const course = hpData.find(hp => hp.cid === kq.cid);
                    return {
                        ...kq,
                        name: course ? course.name : 'N/A',
                        credits: course ? course.credits : 0,
                    };
                });

            if (studentResults.length === 0) {
                setError(`Sinh viên ${student.name} chưa có kết quả học tập nào.`);
            }

            setResults(studentResults);

        } catch (err) {
            setError(err.message);
            setStudentName('');
            setResults(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="app-container">
            <header>
                <h1>Tra cứu Kết quả Học tập</h1>
            </header>

            <SearchForm
                studentId={studentId}
                setStudentId={setStudentId}
                onSearch={() => handleSearch(studentId.trim())} // Gọi hàm tìm kiếm khi click
            />

            <hr />

            {/* Hiển thị Trạng thái */}
            <div className="result-area">
                {isLoading && (
                    <p style={{ color: '#007bff', fontWeight: 'bold' }}>
                        <span className="spinner"></span> Đang tải... Vui lòng chờ 2 giây.
                    </p>
                )}

                {error && !isLoading && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                        Lỗi: {error}
                    </p>
                )}

                {/* Hiển thị Kết quả */}
                {results && results.length > 0 && !isLoading && (
                    <ResultTable studentName={studentName} results={results} />
                )}

                {/* Trường hợp tìm thấy sinh viên nhưng chưa có kết quả học tập */}
                {results && results.length === 0 && !isLoading && !error && (
                    <p style={{ color: 'orange', fontWeight: 'bold' }}>
                        Thông báo: Sinh viên {studentName} chưa có kết quả học tập nào.
                    </p>
                )}
            </div>
        </div>
    );
};

export default App;