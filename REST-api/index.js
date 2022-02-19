const config = require('config');
const express = require('express');
const helmet = require('helmet');
const dbDebugger = require('debug')('app:db');
const startupDebugger = require('debug')('app:startup');
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const logger = require('./middleware/logger');
const auth = require('./auth');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

// To render html template
app.set('view engine', 'pug');
app.set('views', './views'); //default

// Middleware starts
app.use(express.json()); // To parse the body of requests with a JSON payload
app.use(express.urlencoded({ extended: true }));// Url encoded payload in the body of the request, this parses the body and populate req.body as json object.
app.use(express.static('public')) // To serve static files.
app.use(helmet()); // To add security header to the request and response.
app.use('/api/courses', courses); // Redirect if the request is /api/courses to courses.js.
app.use('/', home);  // Redirect if the request is / to home.js.

// Getting the configuration values.
console.log(`${process.env.NODE_ENV} Application Name: ${config.get('name')}`);
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);

// Based on environment
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Moragen enabled..');
}

// To log Db logs.
dbDebugger('Dbdebugger...');

app.use(logger);
app.use(auth);
// Middleware ends

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
