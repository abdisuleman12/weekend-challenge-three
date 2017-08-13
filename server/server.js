var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var port = 5000;

var task = require('./routes/task');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/tasks', task)

app.listen(port, function() {
    console.log('listening on port', port);
});