var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash')



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
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;

    // console.log('get join url');
    // res.sendFile(path.join(__dirname, '../../public/join.html'))

    res.render('join.ejs', {'message' : msg})
})

//passport.serializeUser

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
    }, function(req, email, password, done) {
        
        var query = connection.query('select * from USER where email=?', [email], function(err, rows){

            if(err) throw done(err);

            console.log(rows);

            if(rows.length) {
                console.log('이미 가입된 회원.....')
                return done(null,false,{ message : '가입되었습니다' })
            } else {
                console.log('신규 가입회원!!!')
                var sql = {email : email, pw: password};
                var query = connection.query('insert into USER set ?', sql, function(err, rows){
                    if(err) throw err
                    return done(null, {'email' : email, 'pw': password});
                })
                
            }

            
        })
    }
))

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true })
)

// router.post('/', function(req, res){
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var passwd = body.password;

//     var sql = {email : email, name : name, pw : passwd}
//     var query = connection.query('insert into USER set ?', sql, function(err, rows) {
//         if(err) throw err;

//         console.log("ok db insert");
//         // console.log(rows);
//         res.render('welcome.ejs', {'name' : name})

//     })
// })


module.exports = router;