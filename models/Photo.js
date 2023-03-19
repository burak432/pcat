const mongoose = require('mongoose');
const Schema = mongoose.Schema();

//mongoose
mongoose
  .connect(
    'mongodb+srv://burak432:UK5QbMHUFPEJfsAu@mycluster.byoeg4t.mongodb.net/pcat-db?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('mongo-db connected');
  })
  .catch((err) => console.log(err));

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
