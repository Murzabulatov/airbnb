const express = require('express');
const path = require('path');
require('dotenv').config();
const dbConnect = require('./dbConnect.js');

const indexRouter = require('./src/routes/index.js');
const searchRouter = require('./src/routes/search.js');

const app = express();
dbConnect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/search', searchRouter);


app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${process.env.PORT}`);
});
