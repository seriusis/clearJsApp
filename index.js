const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
//const adminUsers = require('./db.json').adminUser;
const users = require('./db.json').users;

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

server.use(express.static(__dirname + '/public/attachments'));
server.use(fileUpload()); 

server.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    let myFile = req.files['myFile'];
    let path = '/attachments/';
    myFile.mv(__dirname + '/public'+ path + myFile.name, function(err) {
        if (err)
            return res.status(500).send(err);
        res.jsonp(path + myFile.name);
    });
});

server.use(middlewares);
server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
    let user = users.find(item => item.loginData.login === req.body.login && item.loginData.password === req.body.password);
    if (user) {
        res.jsonp({loginStatus:true, userId: user.userId})
    } else {
        res.jsonp({loginStatus:false})
    }
    
})




server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})




