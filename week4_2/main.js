const highlightDocument = document.getElementById('Highlight');
const gpaDocument = document.getElementById('GPA');
const sortBtn = document.getElementById('Sort');
const filterBtn = document.getElementById('Filter');
const rowDocument = document.querySelectorAll('#resultTable tbody tr');
const oriTableHTML = document.querySelector('#resultTable tbody').innerHTML;

highlightDocument.addEventListener('click', () => {
    const isActive = highlightDocument.classList.toggle('active');
    if (isActive) {
        rowDocument.forEach(row => {
            let grade = row.cells[5].innerText;
            if (grade.includes('A')) row.classList.add('grade-a');
            else if (grade.includes('F')) row.classList.add('grade-f');
        })
    }
    else {
        rowDocument.forEach(row => {
            let grade = row.cells[5].innerText;
            if (grade.includes('A')) row.classList.remove('grade-a');
            else if (grade.includes('F')) row.classList.remove('grade-f');
        })
    }


});

gpaDocument.addEventListener('click', () => {
    const isActive = gpaDocument.classList.toggle('active');
    if (isActive) {
        const semesters = { '2024.1': [], '2024.2': [] };
        rowDocument.forEach(row => {
            const grade = parseFloat(row.cells[4].innerText);
            const semester = row.cells[0].innerText;
            const credits = parseFloat(row.cells[3].innerText);
            semesters[semester].push({ grade, credits });
        });
        let output = '';
        for (let sem in semesters) {
            let totalCredits = 0;
            let totalPoints = 0;
            semesters[sem].forEach(({ grade, credits }) => {
                totalCredits += credits;
                totalPoints += grade * credits;
            })
            let gpa = (totalPoints / totalCredits).toFixed(2);
            output += `CPA ki ${sem}: ${gpa}<br>`;
        }
        document.getElementById('output').innerHTML = output;
    }
    else document.getElementById('output').innerHTML = '';
});

const tBody = document.querySelector('#resultTable tbody');
const Rows = Array.from(tBody.rows);
sortBtn.addEventListener('click', () => {
    const isActive = sortBtn.classList.toggle('active');
    if (isActive) {
        const sortedRows = [...Rows];
        sortedRows.sort((a, b) => {
            let delta = parseFloat(a.cells[4].innerText) - parseFloat(b.cells[4].innerText);
            if (delta != 0) return delta;
            else return a.cells[5].innerText.length - b.cells[5].innerText.length;
        })
        sortedRows.forEach(row => tBody.appendChild(row));
    }
    else Rows.forEach(row => tBody.appendChild(row));
})

filterBtn.addEventListener('click', () => {
    const isActive = filterBtn.classList.toggle('active');
    const tbody = document.querySelector('#resultTable tbody');
    const rows = Array.from(tbody.rows);
    if (isActive) {
        const filteredRow = rows.filter(row => {
            let grade = row.cells[5].innerText;
            return grade.includes('A');
        })
        rows.forEach(row => {
            if (filteredRow.includes(row)) row.style.display = '';
            else row.style.display = 'none';
        })
    }
    else {
        rows.forEach(row => {
            row.style.display = '';
        })
    }
})




