const express = require("express")
const bodyParser = require("body-parser")
const cors = require ("cors")
const app = express();
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken"); 

const port = 3001;
const {encrypt, decrypt} = require("./EncryptionHandler");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "re5202lo",
    database: "blogDb",
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    key: "userId",
    secret: "asdfjkl2016asdfjkl",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,  //expires in 24 hours
    },
}))

app.listen(port, () => {
      console.log(`server is running on port ${port}`)
});
//node server.js to run server
//npm run devStart to use nodemon

//verify user is allowed to make request
const verifyJWT = (req, res, next) => {
    console.log("the request headers are: " + req.headers)
    const token = req.headers["x-access-token"] //pass token in header from front end

    if (!token) {
        res.send("no token exist")
    } else {
        jwt.verify(token, "asdfjklasdfjkllkjfdsa16", (err, decoded) => {
            if (err) {
                res.send(false)
            } else {
                req.userId = decoded.id;    //save token in req
                next();
            }
        });
    }
}


//register new user
app.post('/api/register', (req, res) => {
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

//check to see if user authenticated, apply middleware to verify user has correct web token
app.get(`/isUserAuth`, verifyJWT, (req, res) => {
    res.send(true)
})

//check to see if user already logged in
app.get(`/api/login`, (req, res) => {
    if (req.session.user) {
        // console.log("user logged in")
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

//login user
app.post('/api/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(req.body)
    const sqlLogin = `SELECT * FROM users WHERE username = ?`

    db.query(sqlLogin, [username], (err, result) => {
        
        if(result.length > 0) {
            console.log(result)
            let encryption = new Object();
            encryption.password = result[0].password;
            encryption.iv = result[0].iv;

            if (decrypt( encryption ) == password) {
                const id = result[0].id;
                const token = jwt.sign({id}, "asdfjklasdfjkllkjfdsa16", {
                    expiresIn: 300, //5 minutes
                }) //would want .env variable for security
                req.session.user = result
                res.status(200).json({auth: true, token: token, result: result}) //remove password from result when returning
            } else {
                console.log(`incorrect password`);
                res.json({ auth: false, message: "incorrect password" });
            }
        } else {
            console.log(`username ${username} not found`);
            res.json({ auth: false, message: `username ${username} not found`});
        }
    })
})

//make a post to the blog
app.post('/api/post', (req, res) => {
    let id = req.body.userId;
    let title = req.body.title;
    let content = req.body.content;
    let date = req.body.date;

    const sqlPost = `INSERT INTO posts (userId, title, content, creationDate) VALUES (?, ?, ?, ?)`;

    db.query(sqlPost, [id, title, content, date], (err, result) => {
        if(err) {
            throw err;
        }
        //check if username already exists
        res.status(200).send(`${title} posted`);
    })
})

app.get('/api/getallposts', (req, res) => {
    const sqlGet = `SELECT * FROM posts`

    db.query(sqlGet, (err, result) => {
        if(err) {
            throw err;
        }
        //check if username already exists
        res.json(result);
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