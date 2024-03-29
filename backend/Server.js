const port = 3002;
const express = require('express'); //express létrehozása
const app = express(); //-- http szervert tudunk vele indítani

const bodyParser = require('body-parser'); //bodyParser létrehozása

const cors = require('cors');  //cors létrehozása
app.use(cors());                  //cors használata

app.use(bodyParser.urlencoded({ extended: false })); // bodyParser használata
app.use(bodyParser.json()); // a bodyban mindig próbálja az adatokat json-é alakítani

const mysql = require('mysql'); //mysql létrehozása
const { throws } = require('assert');
const database = mysql.createConnection({ //Database létrehozása
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij' //ezt az adatbázist használtuk órán
}
);
database.connect((err) => { //Csatlakozás megpróbálása
    if (err) throw err; //nem sikerült
    console.log('Connected');//sikerült
});

app.get('/', (req, res) => { // http://localhost:3000 esetén
    res.send("KALAPÁCS"); // ezt írja ki
});

//Adatbázis lekérdezése
app.get('/tagok', (req, res) => {                   //http://localhost:3000/tagok
  let sqlcommand = 'SELECT * FROM `ugyfel`';   //Lekérdezés parancs tárolás
  database.query(sqlcommand, (err, rows) => {    //Meghívás lekérdezés
      if (err) throw err;  //nem sikerült
      res.send(rows);
  });
});
app.get('/tagok/:id', (req, res) => {   
  let sqlcommand = `SELECT ugyfel.nev, ugyfel.azon FROM ugyfel WHERE azon=${req.params.id}`;   //Lekérdezés azonosító szerint parancs tárolás
  database.query(sqlcommand, (err, rows) => {                           //Meghívás lekérdezés
      if (err) throw err;  //nem sikerült
      res.send(rows); //Sikerült
  });
});

app.listen(3002, () => {
    console.log(`A szerver fut a http://localhost:${port} -s porton`); 
});
