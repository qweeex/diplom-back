const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./router/Auth');

// Cors
app.use(cors());
app.options('*', cors());
// parse app/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Router
app.use('/api/auth', authRoutes);


app.listen(port, function () {
    console.log('Ебашим');
});
