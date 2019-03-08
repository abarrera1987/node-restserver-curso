const express = require('express');
const app = express();
const mongoose = require('mongoose');
const colors = require('colors');
const bodyParser = require('body-parser');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/routes'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true })
    .then(console.log(colors.green('Base de datos ONLINE')))
    .catch(err => colors.red(err));

app.listen(process.env.PORT || 3000, () => {

    console.log("escuchando el puerto: ", process.env.PORT);

})