// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import Home from './app/client/components/home';
// import AppRouter from './app/client/routes';

var express = require('express');
var path = require('path');
const PORT = 7700;
const PUBLIC_PATH = __dirname + '/public';

// function handleRender(req, res) {
//     // Renders our Hello component into an HTML string
//     const html = ReactDOMServer.renderToString(<AppRouter />);
//
//     // Load contents of index.html
//     fs.readFile('./app/client/index.html', 'utf8', function (err, data) {
//         if (err) throw err;
//
//         // Inserts the rendered React HTML into our main div
//         const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
//
//         // Sends the response back to the client
//         res.send(document);
//     });
// }

var app = express();

app.use(express.static(PUBLIC_PATH));

app.all("*", function(req, res) {
    res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});

// Serve requests with our handleRender function
// app.get('*', handleRender);

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});

