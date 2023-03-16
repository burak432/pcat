const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

//ejs
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

//************routes ***************
//index
app.get('/', (req, res) => {
  res.render('index.ejs');
});

//about
app.get('/about', (req, res) => {
  res.render('about.ejs');
});

//add
app.get('/add', (req, res) => {
  res.render('add.ejs');
});

app.use(express.static('public'));

// listen function
app.listen(port, () => {
  console.log(`server is up and running on port : ${port}`);
});
