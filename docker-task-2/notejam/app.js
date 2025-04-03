var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var orm = require('orm');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var users = require('./routes/users');
var pads = require('./routes/pads');
var notes = require('./routes/notes');
var settings = require('./settings');
var async = require('async');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({cookie: { maxAge: 60000 }, secret: 'secret'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL DB configuration
var { Client } = require('pg');
var db = new Client(settings.db);

// db.connect(function(err) {
//   if (err) throw err;
//   console.log('Connected to PostgreSQL database');
// });
db.connect(function(err) {
  if (err) throw err;
  console.log('Connected to PostgreSQL database');

  // Create Tables
  createTables(function () {
    console.log('Database tables are ready');
  });
});

function createTables(next) {
  async.series({
    createUsers: function (callback) {
      db.query(
        `CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY NOT NULL,
          email VARCHAR(75) NOT NULL,
          password VARCHAR(128) NOT NULL
        );`,
        [],
        function () {
          callback(null);
        }
      );
    },
    createPads: function (callback) {
      db.query(
        `CREATE TABLE IF NOT EXISTS pads (
          id SERIAL PRIMARY KEY NOT NULL,
          name VARCHAR(100) NOT NULL,
          user_id INTEGER NOT NULL REFERENCES users(id)
        );`,
        [],
        function () {
          callback(null);
        }
      );
    },
    createNotes: function (callback) {
      db.query(
        `CREATE TABLE IF NOT EXISTS notes (
          id SERIAL PRIMARY KEY NOT NULL,
          pad_id INTEGER REFERENCES pads(id),
          user_id INTEGER NOT NULL REFERENCES users(id),
          name VARCHAR(100) NOT NULL,
          text TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );`,
        [],
        function () {
          callback(null);
        }
      );
    }
  }, function (err, results) {
    if (next) next();
  });
}

orm.settings.set("instance.returnAllErrors", true);
app.use(orm.express(settings.dsn, {
  define: function (db, models, next) {
    db.load("./models", function (err) {
      models.User = db.models.users;
      models.Pad = db.models.pads;
      models.Note = db.models.notes;
      next();
    });
  }
}));

// Flash Messages configuration
app.use(function(req, res, next){
  res.locals.flash_messages = {
    'success': req.flash('success'),
    'error': req.flash('error')
  };
  next();
});

// Inject request object and user pads in view scope
app.use(function(req, res, next){
  res.locals.req = req;

  if (req.isAuthenticated()) {
    req.user.getPads(function(i, pads) {
      res.locals.pads = pads;
      next();
    });
  } else {
    next();
  }
});

app.use('/', users);
app.use('/', pads);
app.use('/', notes);

/// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;




// var express = require('express');
// var session = require('express-session');
// var path = require('path');
// var favicon = require('static-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var flash = require('connect-flash');
// var bodyParser = require('body-parser');
// var orm = require('orm');
// var expressValidator = require('express-validator');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// var users = require('./routes/users');
// var pads = require('./routes/pads');
// var notes = require('./routes/notes');
// var settings = require('./settings')

// var app = express();


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(favicon());
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(expressValidator());
// app.use(cookieParser());
// app.use(session({cookie: { maxAge: 60000 }, secret: 'secret'}));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));

// // DB configuration
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(settings.db);

// orm.settings.set("instance.returnAllErrors", true);
// app.use(orm.express(settings.dsn, {
//   define: function (db, models, next) {
//     db.load("./models", function (err) {
//       models.User = db.models.users;
//       models.Pad = db.models.pads;
//       models.Note = db.models.notes;
//       next();
//     });
//   }
// }));

// // Flash Messages configuration
// app.use(function(req, res, next){
//   res.locals.flash_messages = {
//     'success': req.flash('success'),
//     'error': req.flash('error')
//   }
//   next();
// });

// // Inject request object and user pads in view scope
// app.use(function(req, res, next){
//   res.locals.req = req;

//   if (req.isAuthenticated()) {
//     req.user.getPads(function(i, pads) {
//       res.locals.pads = pads;
//       next();
//     });
//   } else {
//     next();
//   }
// });

// app.use('/', users);
// app.use('/', pads);
// app.use('/', notes);

// /// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// module.exports = app;
