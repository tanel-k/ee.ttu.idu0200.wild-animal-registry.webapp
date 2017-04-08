var express = require('express');
var fallback = require('express-history-api-fallback');

var app = express();
var root = `${__dirname}/`;
app.use(express.static.root);
app.use(fallback('index.html', { root }));

var port = process.env.PORT || 8080;
app.listen(port);
console.log(`listening on port: ${port}`)