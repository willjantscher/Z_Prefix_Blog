const express = require("express")
const mysql = require("mysql");
const bodyParser = require("body-parser")
const cors = require ("cors")
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken"); 
require('dotenv').config()
// "build": "cd ../client && npm run build",
// "install-client": "cd ../client && npm install",
// "heroku-postbuild": "npm run install-client && npm run build",

// port during dev
// const PORT = 3001;
//rm -rf .git     

// port for deployment
const PORT = process.env.PORT || 8080;
const {encrypt, decrypt} = require("./EncryptionHandler");

//access internet db
//mysql://b76457c30cc8ea:7dfff6d3@us-cdbr-east-05.cleardb.net/heroku_a4405003a2a182f?reconnect=true
const pool = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b76457c30cc8ea",
    password: "7dfff6d3",
    database: "heroku_a4405003a2a182f",
})
//local db
// const db = mysql.createPool({
//     host: "localhost", 
//     user: "root",
//     password: "re5202lo",
//     database: "blogDb",
// });
// console.log("server.js called")


//if it is on heroku, access build here
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
//http://localhost:3000

const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://jantscher-z-prefix-blog.herokuapp.com'];
app.use(cors({
    origin: whitelist,
    methods: ["GET", "POST", "DELETE", "PATCH"],
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

app.listen(PORT, (err) => {
    if(err) {return console.log(err)}
      console.log(`server is running on port ${PORT}`)
});
//node server.js to run server
//npm run devStart to use nodemon

//verify user is allowed to make request
const verifyJWT = (req, res, next) => {
    // console.log("the request headers are: " + req.headers)
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

app.get('/test', (req, res) => {
    res.json({ message: "test success"})
})


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

    pool.query(sqlInsertCheck, [username], (err, result) => {
        if(err) {
            throw err;
        }
        //check if username already exists
        if(result.length > 0){
            res.status(401).send(`username "${username}" already taken`)
        }
        else {
            pool.query(sqlInsert, [firstName, lastName, username, hashedPassword.password, hashedPassword.iv], (err, result) => {
                if(err) {
                    throw err;
                }
                // console.log(result)
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

    pool.query(sqlLogin, [username], (err, result) => {
        
        if(result.length > 0) {
            console.log(result)
            let encryption = new Object();
            encryption.password = result[0].password;
            encryption.iv = result[0].iv;

            if (decrypt( encryption ) == password) {
                const id = result[0].id;
                const token = jwt.sign({id}, "asdfjklasdfjkllkjfdsa16", {
                    expiresIn: 60*30, //30 min
                }) //would want .env variable for security
                req.session.user = result
                res.status(200).json({auth: true, token: token, result: result, message: `username ${username} logged in`}) //remove password from result when returning for better security (although hashed)
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

    pool.query(sqlPost, [id, title, content, date], (err, result) => {
        if(err) {
            throw err;
        }
        //check if username already exists
        res.status(200).send(`${title} posted`);
    })
})

app.post('/api/getallposts', (req, res) => {
    const sqlGet = `SELECT * FROM posts`

    pool.query(sqlGet, (err, result) => {
        if(err) {
            throw err;
        }
        //check if username already exists
        res.json(result);
    })
})

app.post('/api/getallusers', (req, res) => {
    const sqlGet = `SELECT id, username FROM users`

    pool.query(sqlGet, (err, result) => {
        if(err) {
            throw err;
        }
        //check if username already exists
        res.json(result);
    })
})

app.post('/api/getuserposts', (req, res) => {
    const sqlGet = `SELECT * FROM posts WHERE userId = ?`

    pool.query(sqlGet, [req.body.id],(err, result) => {
        if(err) {
            throw err;
        }
        // console.log(result)
        res.json(result);
    })
})

app.delete('/api/deletepost', (req, res) => {
    const sqlDelete = `DELETE FROM posts WHERE id = ?`
    // console.log(req.body.id)

    pool.query(sqlDelete, [req.body.id],(err, result) => {
        if(err) {
            throw err;
        }
        // console.log("Delete posts" + result)
        res.send(result);
    })
})

app.patch('/api/updatepost', (req,res) => {
    const sqlUpdate = `UPDATE posts SET content = ? WHERE id = ?`
    // console.log(req.body)

    pool.query(sqlUpdate, [req.body.content, req.body.id,],(err, result) => {
        if(err) {
            throw err;
        }
        res.send(result);
    })
})
