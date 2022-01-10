const express = require('express');
const app = express();
const port = 3001;

app.listen(port, () => {
      console.log(`server is running on port ${port}`)
});
//node server.js to run server
//npm run devStart to use nodemon

// app.get('/', (req, res) => {
//     res.send('hello there')
// })





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