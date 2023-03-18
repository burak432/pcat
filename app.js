const express = require('express');
const app = express();
const urlencoded = require('express');

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

//models
const Photo = require('./models/Photo');

//npm packages
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

//modules
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test');

//////////////////routes//////////////////
//photoController
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.showPhoto);
app.post('/photos', photoController.postPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

//pageController
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.addPhotoForm);
app.get('/photos/edit/:id', pageController.editPhotoForm);

app.use(express.static('public'));

// listen function
const port = 3000;
app.listen(port, () => {
  console.log(`server is up and running on port : ${port}`);
});
