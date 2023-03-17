const mongoose = require('mongoose');
const Schema = mongoose.Schema();

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test');

const PhotoSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = new mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
