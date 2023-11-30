// ajax.js

// Tiszta JavaScript használata
document.addEventListener('DOMContentLoaded', () => {
    // Az oldal betöltésekor hozz létre egy XMLHttpRequest objektumot
    const xhr = new XMLHttpRequest();

    // Definiáld a kérés típusát és a végpontot
    const method = 'GET';
    const endpoint = 'http://localhost:3000/api/data';

    // Konfiguráld a kérést
    xhr.open(method, endpoint, true);

    // Állítsd be az eseményfigyelőt a kérés befejezésére
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                renderCards(responseData);
            } else {
                console.error('Hiba történt a kérés során. Státusz:', xhr.status, 'Hiba kódja:', xhr.statusText);
            }
        }
    };

    // Ellenőrzés a kérés küldése előtt
    if (xhr) {

        xhr.send();
    } else {
        console.error('Az XMLHttpRequest objektum nincs megfelelően inicializálva.');
    }
});
function renderCards(data) {
    const cardContainer = document.getElementById('cardContainer');

    data.forEach(record => {
        const card = document.createElement('div');
        card.className = 'card mb-3';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.innerText = record.name; // Itt feltételezem, hogy az adatbázis rekordnak van egy "name" mezője

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.innerText = record.description; // Itt feltételezem, hogy az adatbázis rekordnak van egy "description" mezője

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);

        cardContainer.appendChild(card);
    });
}
