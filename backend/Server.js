const port = 3000;
const  express  = require('express');
const app = express();

const mysql = require('mysql');

const cors = require('cors');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // bodyParser használata
app.use(bodyParser.json()); // a bodyban mindig próbálja az adatokat json-é alakítani


const connection = mysql.createConnection({ //Database létrehozása
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij' //ezt az adatbázist használtuk órán
}
);
connection.connect((err) => { //Csatlakozás megpróbálása
    if (err) throw err; //nem sikerült
    console.log('Connected');//sikerült
});


app.get('/', (req, res) => { 
           
});
app.get('/api/data', (req, res) => {                   
    let sqlcommand = 'SELECT * FROM `ugyfel`';   //Lekérdezés parancs tárolás
    database.query(sqlcommand, (err, rows) => {    //Meghívás lekérdezés
        if (err) throw err;  //nem sikerült
        res.send(rows); //Sikerült
    });
    
});
app.listen(3000, () => {
    console.log(`A szerver fut a http://localhost:${port} -s porton`); //localhost:3000
});