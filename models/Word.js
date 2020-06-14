const express = require('express');
const router = express.Router();
const { database } = require('../config/db');


router.post('/words', (req, res) => {
    database.query("SELECT word, count(*) FROM associations GROUP BY word HAVING count(*) > 0 ORDER BY count(*)", function(err, data) {
        if(err) return console.log(err);
        res.send(data);
    });
});

module.exports = router;
