const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  // const photos = await Photo.find({}).sort('-dateCreated');
  // res.render('index.ejs', { photos });

  const page = req.query.page || 1;
  const photosPerPage = 3;
  const totalPhotos = await Photo.find({}).countDocuments();

  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render("index.ejs", {
    photos,
    currentPage: page,
    pagesAll: Math.ceil(totalPhotos / photosPerPage),
  });
};

exports.postPhoto = async (req, res) => {
  let myFile = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + myFile.name;

  const uploadsDir = __dirname + '/../public/uploads';

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  myFile.mv(uploadPath);

  await Photo.create({
    ...req.body,
    image: '/uploads/' + myFile.name,
  });
  res.redirect('/');
};

exports.showPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo.ejs', { photo });
};

exports.updatePhoto = async (req, res) => {
  const { id } = req.params;
  await Photo.findByIdAndUpdate(id, {
    ...req.body,
  });
  res.redirect(`/photos/${id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo1 = await Photo.findById(req.params.id);
  const fileForDelete = __dirname + '/../public' + photo1.image;
  // fs.unlinkSync(fileForDelete);
  if (fs.existsSync(fileForDelete)) {
    fs.unlinkSync(fileForDelete);
  }
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
