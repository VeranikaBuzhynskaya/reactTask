import express from 'express';
import path from 'path';
import handleRender from './app/server/handleRander'

const PORT = 7700;
const PUBLIC_PATH = '.';

var app = express();

app.use(express.static(PUBLIC_PATH));

// app.all("*", function(req, res) {
//     res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
// });

// Serve requests with our handleRender function
app.get('*', handleRender);

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});


