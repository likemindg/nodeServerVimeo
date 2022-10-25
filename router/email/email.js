var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// DATABASE SETTING
var connection = mysql.createConnection({
    host: 'likemind.synology.me',
    port: 53306,
    user: 'melon',
    password: 'Jkson!9020',
    database: 'meta'
})
connection.connect();

// ROUTER
router.post('/form', function(req, res) {
    // res.send('post response')
    var obj = req.body;
    console.log(obj.email);
    // res.send(`<h1>wellcome ${obj.email}</h1>`)
    res.render('email.ejs', {'email' : obj.email, 'demo': obj})
})

router.post('/ajax', function(req, res) {

    var email = req.body.email;
    var responseData = {};

    console.log('email : ' + email);

    var query = connection.query('select name from USER where email="' + email + '"', function(err, rows) {
        if (err) throw err;

        if(rows[0]) {
            responseData.result = 'ok';
            responseData.name = rows[0].name;
        } else {
            responseData.result = 'none';
            responseData.name = '';
        }

        console.log(responseData);
        res.json(responseData);
    })
})

module.exports = router;