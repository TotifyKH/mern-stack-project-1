//IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
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

//ROUTES


//PORT
const port = process.env.PORT || 5000;

//LISTENER
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})