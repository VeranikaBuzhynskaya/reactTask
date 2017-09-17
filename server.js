var express = require('express');
var path = require('path');
const PORT = 7700;
const PUBLIC_PATH = __dirname + '/public';

var app = express();

app.use(express.static(PUBLIC_PATH));

app.all("*", function(req, res) {
    res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});


app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});