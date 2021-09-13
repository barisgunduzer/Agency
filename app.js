const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const mainRouter = require('./routers/mainRouter');

const app = express();

//Connect DB
mongoose.connect(
    'mongodb://localhost/agency-db',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routers
app.use('/', mainRouter);

//Configs
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});