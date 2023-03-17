const express = require('express');
const ejs = require('ejs');
const path = require('path');
const { urlencoded } = require('express');
const app = express();
const Photo = require('./models/Photo');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test');

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//////////////////routes//////////////////
//index
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index.ejs', { photos });
});

//about
app.get('/about', (req, res) => {
  res.render('about.ejs');
});

//add
app.get('/add', (req, res) => {
  res.render('add.ejs');
});

//photos post
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

app.use(express.static('public'));

// listen function
const port = 3000;
app.listen(port, () => {
  console.log(`server is up and running on port : ${port}`);
});
