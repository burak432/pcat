const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  res.render('about.ejs');
};

exports.editPhotoForm = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('edit.ejs', { photo });
};

exports.addPhotoForm = (req, res) => {
  res.render('add.ejs');
};
