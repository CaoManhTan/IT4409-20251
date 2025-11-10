const sinhvienData = [
    {
        sid: '20225227',
        name: 'Cao Mạnh Tân',
        dob: '22/06/2004'
    }
];

const hocphanData = [
    { cid: 'IT3040', name: 'Kỹ thuật lập trình', credits: 2 },
    { cid: 'IT3070', name: 'Nguyên lý hệ điều hành', credits: 3 },
    { cid: 'IT3080', name: 'Mạng máy tính', credits: 3 },
    { cid: 'IT3090', name: 'Cơ sở dữ liệu', credits: 3 },
    { cid: 'IT3150', name: 'Project I', credits: 2 },
    { cid: 'IT3180', name: 'Nhập môn công nghệ phần mềm', credits: 3 },
    { cid: 'IT4172', name: 'Xử lý tín hiệu', credits: 2 },
    { cid: 'IT4593', name: 'Nhập môn kỹ thuật truyền thông', credits: 2 },
    { cid: 'IT3120', name: 'Phân tích và thiết kế hệ thống', credits: 2 },
    { cid: 'IT3170', name: 'Thuật toán ứng dụng', credits: 2 },
    { cid: 'IT3931', name: 'Project II', credits: 2 },
    { cid: 'IT4015', name: 'Nhập môn an toàn thông tin', credits: 3 },
    { cid: 'IT4060', name: 'Lập trình mạng', credits: 2 },
    { cid: 'IT4210', name: 'Hệ nhúng', credits: 3 },
    { cid: 'PE2102', name: 'Bóng chuyền 2', credits: 0 },
    { cid: 'IT4651', name: 'Thiết kế và triển khai mạng IP', credits: 3 }
];

const ketquaData = [
    // Học kỳ 2024.1
    { sid: '20225227', cid: 'IT3040', term: '20241', score: 6.5 },
    { sid: '20225227', cid: 'IT3070', term: '20241', score: 7.8 },
    { sid: '20225227', cid: 'IT3080', term: '20241', score: 7.2 },
    { sid: '20225227', cid: 'IT3090', term: '20241', score: 7.7 },
    { sid: '20225227', cid: 'IT3150', term: '20241', score: 9.0 },
    { sid: '20225227', cid: 'IT3180', term: '20241', score: 8.3 },
    { sid: '20225227', cid: 'IT4172', term: '20241', score: 7.0 },
    { sid: '20225227', cid: 'IT4593', term: '20241', score: 7.9 },

    // Học kỳ 2024.2
    { sid: '20225227', cid: 'IT3120', term: '20242', score: 8.0 },
    { sid: '20225227', cid: 'IT3170', term: '20242', score: 8.5 },
    { sid: '20225227', cid: 'IT3931', term: '20242', score: 9.3 },
    { sid: '20225227', cid: 'IT4015', term: '20242', score: 7.5 },
    { sid: '20225227', cid: 'IT4060', term: '20242', score: 8.8 },
    { sid: '20225227', cid: 'IT4210', term: '20242', score: 9.5 },
    { sid: '20225227', cid: 'PE2102', term: '20242', score: 9.0 },
    { sid: '20225227', cid: 'IT4651', term: '20242', score: 7.6 },
];

function scoreToGrade(score) {
    if (score >= 9.0) return 'A+';
    if (score >= 8.5) return 'A';
    if (score >= 8.0) return 'B+';
    if (score >= 7.0) return 'B';
    if (score >= 6.0) return 'C+';
    if (score >= 5.0) return 'C';
    if (score >= 4.0) return 'D';
    return 'F';
}


function fetchData(dataArray, key, value, delay = 500) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = dataArray.filter(item => item[key] === value);
            if (result.length > 0) {
                resolve(result);
            } else {
                reject(new Error(`Không tìm thấy dữ liệu cho ${key}: ${value}`));
            }
        }, delay);
    });
}

// Hàm hiển thị kết quả
function displayResults(studentInfo, results) {
    const infoDiv = document.getElementById('student-info');
    const tbody = document.getElementById('results-body');

    infoDiv.innerHTML = `<p class="success">Sinh viên: ${studentInfo.name} | Mã số: ${studentInfo.sid} | Ngày sinh: ${studentInfo.dob}</p>`;

    tbody.innerHTML = ''; // Xóa kết quả cũ
    if (results.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Không có kết quả học tập nào.</td></tr>';
        return;
    }

    results.forEach(kq => {
        const row = tbody.insertRow();
        row.insertCell().textContent = kq.cid;
        row.insertCell().textContent = kq.name; // Tên học phần
        row.insertCell().textContent = kq.credits; // Số tín chỉ
        row.insertCell().textContent = kq.term;
        row.insertCell().textContent = kq.score.toFixed(2);
        row.insertCell().textContent = scoreToGrade(kq.score);
    });
}

// Hàm chính xử lý tra cứu bất đồng bộ
async function lookupStudentResults() {
    const studentId = document.getElementById('student-id').value.trim();
    const statusP = document.getElementById('loading-status');
    const infoDiv = document.getElementById('student-info');
    const tbody = document.getElementById('results-body');

    // Reset giao diện
    statusP.textContent = '';
    infoDiv.innerHTML = '';
    tbody.innerHTML = '';

    if (!studentId) {
        statusP.textContent = 'Vui lòng nhập Mã số sinh viên.';
        return;
    }

    // Cache data
    const cacheKey = `results_${studentId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        try {
            const data = JSON.parse(cachedData);
            displayResults(data.studentInfo, data.results);
            statusP.textContent = 'Đã tải kết quả từ Cache (localStorage).';
            return;
        } catch (e) {
            console.error("Lỗi phân tích cú pháp cache:", e);
            localStorage.removeItem(cacheKey); // Xóa cache lỗi
        }
    }

    //Mô phỏng bất đồng bộ
    statusP.textContent = ' Đang tải dữ liệu từ server...';

    try {
        const studentInfoArray = await fetchData(sinhvienData, 'sid', studentId);
        const studentInfo = studentInfoArray[0];

        const ketquaList = await fetchData(ketquaData, 'sid', studentId);

        const finalResults = await Promise.all(
            ketquaList.map(async (kq) => {
                // Giả lập tra cứu từng học phần
                const hpArray = await fetchData(hocphanData, 'cid', kq.cid, 200); // delay ngắn hơn
                const hp = hpArray[0];
                return {
                    ...kq,
                    name: hp.name,
                    credits: hp.credits
                };
            })
        );

        displayResults(studentInfo, finalResults);
        statusP.textContent = 'Tra cứu thành công!';

        const dataToCache = {
            timestamp: new Date().toISOString(),
            studentInfo,
            results: finalResults
        };
        localStorage.setItem(cacheKey, JSON.stringify(dataToCache));

    } catch (error) {
        // Xử lý lỗi bằng try...catch
        console.error("Lỗi tra cứu:", error);
        statusP.className = 'error';
        statusP.textContent = ` Lỗi: ${error.message}. Vui lòng kiểm tra lại Mã số sinh viên.`;
        infoDiv.innerHTML = '';
        tbody.innerHTML = '<tr><td colspan="6">Không tìm thấy thông tin hoặc có lỗi xảy ra.</td></tr>';
    }
}

document.getElementById('search-btn').addEventListener('click', lookupStudentResults);

document.getElementById('student-id').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        lookupStudentResults();
    }
});