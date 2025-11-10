let originalTableBodyHTML = '';
const tbody = document.getElementById('resultTable').querySelector('tbody');
// Lưu trữ nội dung HTML ban đầu
originalTableBodyHTML = tbody.innerHTML;
const gradeToPoint = { "A+": 4.0, "A": 4.0, "B+": 3.5, "B": 3.0, "C+": 2.5, "C": 2.0, "D+": 1.5, "D": 1.0, "F": 0.0 };


function highlight() {
    const rows = document.querySelectorAll("#resultTable tbody tr");
    rows.forEach(row => {
        const grade = row.cells[5].innerText;
        row.classList.remove("highlight-a", "highlight-f");
        if (grade === "A" || grade === "A+") {
            row.classList.add("highlight-a");
        } else if (grade === "F") {
            row.classList.add("highlight-f");
        }
    });
}

function calculateGPA() {
    const rows = document.querySelectorAll("#resultTable tbody tr");
    let semesters = { "2024.1": [], "2024.2": [] };

    rows.forEach(row => {
        const semester = row.cells[0].innerText;//học kì
        const credits = parseFloat(row.cells[3].innerText);// số TC
        const letter = row.cells[5].innerText;//điểm chữ
        const point = gradeToPoint[letter];//đổi điểm chữ ra điểm số
        if (point !== undefined) {
            semesters[semester].push({ credits, point });
        }
    });

    let output = "";
    for (let sem in semesters) {
        let totalCredits = 0, totalPoints = 0;
        semesters[sem].forEach(({ credits, point }) => {
            totalCredits += credits;
            totalPoints += credits * point;
        });
        let gpa = (totalCredits > 0) ? (totalPoints / totalCredits).toFixed(2) : "N/A";
        output += `GPA học kỳ ${sem}: ${gpa}<br>`;
    }
    document.getElementById("gpaOutput").innerHTML = output;
}

function filterA() {
    const rows = document.querySelectorAll("#resultTable tbody tr");
    rows.forEach(row => {
        const grade = row.cells[5].innerText;
        if (grade !== "A" && grade !== "A+") {
            row.style.display = "none";
        } else {
            row.style.display = "";
        }
    });
}

function sortScores() {
    const tbody = document.querySelector("#resultTable tbody");
    const rows = Array.from(tbody.rows);
    rows.sort((a, b) => {
        let delta = gradeToPoint[a.cells[5].innerText] - gradeToPoint[b.cells[5].innerText];
        if (delta == 0) {
            return a.cells[5].innerText.length - b.cells[5].innerText.length;
        }
        else return delta;
    });
    rows.forEach(row => tbody.appendChild(row));
}

function resetTable() {
    const tbody = document.getElementById('resultTable').querySelector('tbody');
    tbody.innerHTML = originalTableBodyHTML;
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
        row.style.display = ''; // Hiện lại tất cả
        row.classList.remove('highlight-a', 'highlight-f'); // Xóa highlight
    });
    document.getElementById('gpaOutput').innerHTML = '';

}
