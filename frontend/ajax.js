const cards = document.getElementById("cards");
window.addEventListener("load", getAllUsers);//a lap betöltésekor jelennek meg az adatok (false kikapcsolva)

async function getUserName() {
    try {
        let endPoint = "http://localhost:3002/tagok/id";
        const response = await fetch(endPoint); //nohead és body
        const users = await response.json(); //body to JSON
    } catch (error) {
        console.log(error);
    }
}

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
                <h5 class="card-title">${user.id}. ${getUserName()}</h5>
                <p class="card-text">Szám: ${user.darab} db</p>
                <button class="btn btn-info" onclick="betoltInputMezobe(${user.id})">Select</button>
                </div></div>`;
        cards.innerHTML = html;
        
    });
}

