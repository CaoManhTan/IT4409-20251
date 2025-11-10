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

