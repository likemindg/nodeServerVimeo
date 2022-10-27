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
router.get('/', function(req, res) {
    console.log('get join url');
    res.sendFile(path.join(__dirname, '../../public/join.html'))
})

router.post('/', function(req, res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.password;

    var sql = {email : email, name : name, pw : passwd}
    var query = connection.query('insert into USER set ?', sql, function(err, rows) {
        if(err) throw err;

        console.log("ok db insert");
    })
})


module.exports = router;