const express = require('express');
const session = require('express-session');
const sessionFileStore = require('session-file-store');

const FileStore = sessionFileStore(session);
const path = require('path');
require('dotenv').config();
const hbs = require('hbs');
const dbConnect = require('./dbConnect.js');

const username = require('./src/middlewears/user.js');

const indexRouter = require('./src/routes/index.js');
const searchRouter = require('./src/routes/search.js');
const signupRouter = require('./src/routes/signup.js');
const signinRouter = require('./src/routes/signin.js');
const signoutRouter = require('./src/routes/signout.js');
const carRouter = require('./src/routes/car.js');
const dealRouter = require('./src/routes/deal.js');
const profileRouter = require('./src/routes/profile.js');


const app = express();
dbConnect();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('session cookie name', 'sid');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: app.get('session cookie name'),
    secret: process.env.SECRET_KEY,
    store: new FileStore({
      secret: process.env.SECRET_KEY,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);

app.use(username);
app.use('/', indexRouter);
app.use('/search', searchRouter);

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/signout', signoutRouter);
app.use('/car', carRouter);
app.use('/deal', dealRouter);
app.use('/profile', profileRouter);


app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${process.env.PORT}`);
});
