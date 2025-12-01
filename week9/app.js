const url = "http://localhost:3000/users"

let allUsers = [];
let dem = 1;

const getUser = async () => {
    try {
        const response = await axios.get(url);
        allUsers = response.data;
        renderTable(allUsers);
    }
    catch (e) {
        throw new Error(e);
    }

}
document.getElementById("createForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUSer = {
        id: allUsers.length + 1,
        name: document.getElementById("newName").value,
        email: document.getElementById("newEmail").value,
        phone: document.getElementById("newPhone").value
    }
    const res = await axios.post(url, newUSer);
    console.log(res);

})

const renderTable = (userr) => {
    const tbody = document.getElementById("userTableBody");
    userr.forEach(user => {
        const row = tbody.insertRow();
        row.insertCell().innerHTML = `<td>${user.id}</td>`
        row.insertCell().innerHTML = `<td>${user.name}</td>`
        row.insertCell().innerHTML = `<td>${user.email}</td>`
        row.insertCell().innerHTML = `<td>${user.phone}</td>`
    })
    console.log(`rendered${dem}times`);
    dem++;
}

getUser();



