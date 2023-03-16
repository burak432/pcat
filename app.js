const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('public'));

//index
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// listen function
app.listen(port, () => {
  console.log(`server is up and running on port : ${port}`);
});
