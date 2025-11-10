let soGiay;
const inSo = () => {
    console.log('1');

    const promise = new Promise((resolve, reject) => {
        console.log('2');
        setTimeout(() => {
            resolve('4');
        }, soGiay * 1000)
        console.log('3');
        demNguoc(soGiay);
    })

    promise.then(data => {
        console.log(data);
    })

}


document.getElementById('so-giay').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        soGiay = parseInt(document.getElementById('so-giay').value);
        inSo();
    }
})

function demNguoc() {
    if (soGiay > 0) {
        console.log(`Ket qua se hien ra sau ${soGiay} giay`)
        soGiay--;
        setTimeout(demNguoc, 1000);
    }
}