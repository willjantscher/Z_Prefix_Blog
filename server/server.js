const express = require("express")
const bodyParser = require("body-parser")
const cors = require ("cors")
const app = express();
const mysql = require("mysql");
const {encrypt, decrypt} = require("./EncryptionHandler");

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


//register new user
app.post('/api/insert', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const password = req.body.password

    //convert password to identifier and encrypted password
    const hashedPassword = encrypt(password)

    //check if username already exists    
    const sqlInsertCheck = `SELECT id FROM users WHERE username = ?`
    const sqlInsert = `INSERT INTO users (firstName, lastName, username, password, iv) VALUES (?,?,?,?,?)`

    db.query(sqlInsertCheck, [username], (err, result) => {
        if(err) {
            throw err;
        }
        //check if username already exists
        if(result.length > 0){
            res.status(401).send(`username "${username}" already taken`)
        }
        else {
            db.query(sqlInsert, [firstName, lastName, username, hashedPassword.password, hashedPassword.iv], (err, result) => {

                res.status(200).send(`${username} registered successfully`);
            })
        }
    })
})

//login user
app.get('/api/get', (req, res) => {
    const username = req.query.username
    const password = req.query.password
    const sqlGet = `SELECT * FROM users WHERE username = ?`

    db.query(sqlGet, [username], (err, result) => {
        // console.log(result)
        
        if(result.length > 0) {
            const user = result;
            let encryption = new Object();
            encryption.password = user[0].password;
            encryption.iv = user[0].iv;

            if (decrypt( encryption ) == password) {
                console.log(`user ${user[0].username} authenticated`);
                res.status(200).send(user);
            } else {
                console.log(`incorrect password`);
                res.status(401).send(`incorrect password`);
            }
        } else {
            console.log(`username ${username} not found`);
            res.send(`username ${username} not found`)
        }
    })

})



















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