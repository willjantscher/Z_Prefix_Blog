const express = require("express")
const bodyParser = require("body-parser")
const cors = require ("cors")
const app = express();
const mysql = require("mysql");
const { password } = require("pg/lib/defaults");
const port = 3001;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "re5202lo",
    database: "blogDb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
      console.log(`server is running on port ${port}`)
});
//node server.js to run server
//npm run devStart to use nodemon




app.post('/api/insert', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const password = req.body.password

    const sqlInsert = "INSERT INTO users (firstName, lastName, username, password) VALUES (?,?,?,?)"
    db.query(sqlInsert, [firstName, lastName, username, password], (err, res) =>{
        console.log(username + " registered");
    })
});


app.get('/', (req, res) => {})



// root@localhost
// 3g6lh?Pwwd(z



// CREATE SCHEMA IF NOT EXISTS `blogdb` 

// CREATE TABLE IF NOT EXISTS `new_schema1`.`Posts` (
//     `id` INT NOT NULL AUTO_INCREMENT,
//     `userId` INT NULL,
//     `title` VARCHAR(100) NULL,
//     `content` VARCHAR(10000) NULL,
//     PRIMARY KEY (`id`))
//   ENGINE = InnoDB

// CREATE TABLE IF NOT EXISTS `new_schema1`.`Users` (
//     `id` INT NOT NULL AUTO_INCREMENT,
//     `firstName` VARCHAR(45) NOT NULL,
//     `lastName` VARCHAR(45) NOT NULL,
//     `username` VARCHAR(45) NOT NULL,
//     `password` VARCHAR(45) NOT NULL,
//     PRIMARY KEY (`id`))
//   ENGINE = InnoDB