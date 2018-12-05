require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require("./middleware/passport");
const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");


mongoose
    .connect(process.env.DB, {useNewUrlParser: true})
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(passport.initialize());
app.use(passport.session());


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});

hbs.registerPartials(__dirname+'/views/partials')

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());

//tener user en locals
app.use(function(req, res, next){
    res.locals.user = req.user;
    /*res.locals.authenticated = ! req.user.anonymous;*/
    next();
});

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth/auth');
app.use('/auth', authRoutes);

const albumsRoutes = require('./routes/spotify/albums')
const artistRoutes = require('./routes/spotify/artists')
const spotifyRoutes = require('./routes/spotify/spotify')
const examplesRoutes = require('./routes/spotify/examples')
const carlosRoutes = require('./routes/spotify/rutascarlos')
const listRoutes = require('./routes/spotify/createList')
app.use('/albums',albumsRoutes)
app.use('/artists',artistRoutes)
app.use('/spotify',spotifyRoutes)
app.use('/rutascarlos',carlosRoutes)
app.use('/examples',examplesRoutes)
app.use('/createList',listRoutes)


module.exports = app;
