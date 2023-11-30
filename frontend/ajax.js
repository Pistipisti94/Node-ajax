const cards = document.getElementById("cards");
const buttonUpdate = document.querySelector("#update");
const inputazon = document.querySelector("#azon");
const inputnev = document.querySelector("#nev");
const inputszulev = document.querySelector("#szulev");
const inputirszam = document.querySelector("#irszam");
const inputorsz = document.querySelector("#orsz");
window.addEventListener("load", getAllUsers);//a lap betöltésekor jelennek meg az adatok (false kikapcsolva)




async function getAllUsers() {
    try {
        let endPoint = "http://localhost:3002/tagok";
        const response = await fetch(endPoint); //nohead és body
        const users = await response.json(); //body to JSON
        showAllUsers(users);
    } catch (error) {
        console.log(error);
    }
}
function showAllUsers(params) {
    let html = "";
    params.forEach(user => {
        html += ` <div class="card" style="width: 18rem;">
            <img src="noImages.png" class="card-img-top" alt="noImages.png">
            <div class="card-body">
                <h5 class="card-title">Id:${user.azon} ${user.nev}</h5>
                <p class="card-text">Irányítószám: ${user.irszam} </p>
                <p class="card-text">Született: ${user.szulev} </p>
                <p class="card-text">Nemzetiség: ${user.orsz} </p>
                <button class="btn btn-info" onclick="betoltInputMezobe(${user.azon})">Select</button>
                </div></div>`;
        cards.innerHTML = html; 
    });
}
async function betoltInputMezobe(id){
    try {
        let endPoint = `http://localhost:3002/tagok/${id}`;
        const response = await fetch(endPoint); //nohead és body
        const users = await response.json(); //body to JSON
        mutat(users);
    } catch (error) {
        console.log(error);
    }
}
buttonUpdate.addEventListener("click", async () => {
    let data = {
        username: inputusername.value,
        darab: inputdarab.value
    };
    console.log(data);
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        await response.json();
        beviteliMezoAlaphelyzetbe();
        getAllUsers();
    } catch (error) {
        alert(error);
    }
});