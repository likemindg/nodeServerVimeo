# node 프로젝트 초기설정
npm init

    package name: (nodejs) nodeserver


# express node install

    npm install express --save
    참고사이트 : https://expressjs.com/en/starter/installing.html

    > app.js
    var express = require('express')
    app.use(express.static('public'))


# 소스변경 시 서버재기동
    npm install nodemon --save
    npm install nodemon -g


# node 실행
    node app.js
    nodemon app.js


# post parameter 사용
    npm install body-parser --save

    > app.js
    var bodyParser = require('body-parser')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true})) 


# ejs
    npm install ejs --save

    > app.js
    app.set('view engine', 'ejs')
    res.render('email.ejs', {'email' : obj.email, 'demo': obj})

# Mysql
    npm i mysql --save
    