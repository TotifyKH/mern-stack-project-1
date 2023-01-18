//IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const socket = require('./configs/socket');
const mongoSession = require('./configs/session');
const cookieParser = require('cookie-parser');

//Routes
const testRouter = require('./routes/test');
const usersRouter = require('./routes/users');
const flappyBirdRouter = require('./routes/games/flappyBird');
const pong2Router = require('./routes/games/pong2');


require('dotenv').config();

//APP
const app = express();

//DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database Connected!")
})
.catch(err => console.log('Database Connection Error', err));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(cors({
  origin: true, 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoSession(app);

//LISTENER
const server = http.createServer(app);
socket(server, app);

//ROUTES
app.use('/test', testRouter);
app.use('/users', usersRouter);
//game routes
app.use('/games/flappyBird', flappyBirdRouter);
app.use('/games/pong2', pong2Router);

//PORT
const port = process.env.PORT || 5000;


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})