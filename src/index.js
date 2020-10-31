const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { extname } = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
const { allowedNodeEnvironmentFlags } = require('process');
const helpers = require('./lib/helpers');

// Initializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 8989);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middleware
app.use(session({
    secret: 'adiccionBurguerSession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use(async(req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.failure = req.flash('failure');
    app.locals.user = req.user;
    app.locals.Cargo = helpers.getCargo(req.user);
    next();
});

// Routes
app.use(require('./routes/admin'));
app.use(require('./routes/despachador'));
app.use(require('./routes/almacen'));
app.use(require('./routes/cocina'));
app.use(require('./routes/repartidor'));
app.use(require('./routes/authentication'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});