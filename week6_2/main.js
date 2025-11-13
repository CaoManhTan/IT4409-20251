const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
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

//lay data
const fetchData = async (url, key, value) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.filter(object => object[key] === value);
    }
    catch (e) {
        throw new Error(e)
    }
}


const searchStudent = async () => {
    const studentId = document.getElementById('studentId').value.trim();
    const status = document.getElementById('status');
    const studentInfo = document.getElementById('student-info');
    const tbody = document.getElementById('result-body');
    status.innerText = 'loading .......';

    tbody.innerHTML = '';
    studentInfo.innerHTML = '';
    document.getElementById('resultTable').style.visibility = 'hidden';
    document.getElementById('thead').style.visibility = 'hidden';

    await sleep(800);
    try {
        const sinhvien = await fetchData('public/sinhvien.json', 'sid', studentId);
        const sinhvienData = sinhvien[0];
        if (!sinhvienData) {
            studentInfo.innerHTML = `Khong tim thay sinh vien co MSSV la ${studentId}`;
            return;
        }

        const ketqua = await fetchData('public/ketqua.json', 'sid', studentId);
        const resultbody = await Promise.all(
            ketqua.map(async kq => {
                const hocphan = await fetchData('public/hocphan.json', 'cid', kq.cid);
                const hp = hocphan[0];
                return {
                    ...kq,
                    name: hp.name,
                    credits: hp.credits
                };
            })
        );

        status.innerText = 'Da tai xong du lieu';
        display(sinhvienData, resultbody);

    }
    catch (error) {
        throw new Error(error);
    }


}

const display = (sinhvienData, resultbody) => {
    const studentInfo = document.getElementById('student-info');
    const tbody = document.getElementById('result-body');
    studentInfo.innerHTML = `<hr>Thong tin sinh vien: <br>
    <p>Hoten: ${sinhvienData.name}</p><br>
    <p>MSSV: ${sinhvienData.sid}</p><br>
    <p>Ngay thang nam sinh: ${sinhvienData.dob}</p>`;
    tbody.style.visibility = 'visible';
    if (resultbody.length === 0) {
        tbody.innerHTML = '<p>Không có kết quả học tập nào.</p>';
        return;
    }
    document.getElementById('thead').style.visibility = 'visible';
    document.getElementById('resultTable').style.visibility = 'visible';
    resultbody.forEach(kq => {
        const row = tbody.insertRow();
        row.insertCell().innerHTML = `<td>${kq.cid}</td>`;
        row.insertCell().innerHTML = `<td>${kq.name}</td>`;
        row.insertCell().innerHTML = `<td>${kq.credits}</td>`; // Số tín chỉ
        row.insertCell().innerHTML = `<td>${kq.term}</td>`;
        row.insertCell().innerHTML = `<td>${kq.score.toFixed(2)}</td>`;
        row.insertCell().innerHTML = `<td>${scoreToGrade(kq.score)}</td>`;
    })


}
const reset = () => {

}
const searchButton = document.getElementById('search');
searchButton.addEventListener('click', () => {
    searchStudent();
});
document.getElementById('studentId').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchStudent();
});


