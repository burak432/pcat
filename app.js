const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
var methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const { urlencoded } = require('express');
const app = express();
const Photo = require('./models/Photo');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test');

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//////////////////routes//////////////////
//index
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
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

//photos post handler
app.post('/photos', async (req, res) => {
  let myFile = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + myFile.name;

  const uploadsDir = __dirname + '/public/uploads';

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  myFile.mv(uploadPath);

  await Photo.create({
    ...req.body,
    image: '/uploads/' + myFile.name,
  });
  res.redirect('/');

  // myFile.mv(uploadPath, async () => {
  //   await Photo.create({
  //     ...req.body,
  //     image: '/uploads/' + myFile.name,
  //   });
  //   res.redirect('/');
  // });
});

//show photo
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo.ejs', { photo });
});

//edit photo form
app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('edit.ejs', { photo });
});

//edit photo form handler
app.put('/photos/:id', async (req, res) => {
  const { id } = req.params;
  await Photo.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.redirect(`/photos/${id}`);
});

//delete photo form handler
app.delete('/photos/:id', async (req, res) => {
  const photo1 = await Photo.findById(req.params.id);
  const fileForDelete = __dirname + '/public' + photo1.image;
  // fs.unlinkSync(fileForDelete);
  if(fs.existsSync(fileForDelete)){ fs.unlinkSync(fileForDelete) }
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.use(express.static('public'));

// listen function
const port = 3000;
app.listen(port, () => {
  console.log(`server is up and running on port : ${port}`);
});
