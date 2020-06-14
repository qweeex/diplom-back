const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./router/Auth');
const passport = require('passport');
const Words = require('./models/Word');

// Cors
app.use(cors());
app.options('*', cors());
// parse app/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
require('./middleware/passport')(passport);
// Router
app.use('/api/auth', authRoutes);
app.use('/api', Words);

app.listen(port, function () {
    console.log('Ебашим');
});
