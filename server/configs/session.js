const session = require('express-session');
const MongoStore = require('connect-mongo');
//const mongoose = require('mongoose');

//const db = mongoose.connection;

module.exports = function(app) {
  app.use(session({
    name:'arcave',
    secret: 'what the hell is my secret',
    store: new MongoStore({ 
      mongoUrl: process.env.DATABASE_URI,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1, //1 hour
    }
  }));
}