var express = require('express');
var app = express();

//app.use(express.static(__dirname + '/'));
/*
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
*/
app.use('*', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});
var port = process.env.PORT || 8080;
app.listen(port);
console.log(`listening on port: ${port}`)