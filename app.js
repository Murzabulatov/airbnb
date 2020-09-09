const express = require('express');
const path = require('path');
require('dotenv').config();
const dbConnect = require('./dbConnect.js');
const hbs = require('hbs');

const indexRouter = require('./src/routes/index.js');
const searchRouter = require('./src/routes/search.js');
const carRouter = require('./src/routes/car.js');

const app = express();
dbConnect();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/car', carRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${process.env.PORT}`);
});
